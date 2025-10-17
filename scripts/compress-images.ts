import { mkdir, readdir, stat } from 'node:fs/promises';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';
import sharp from 'sharp';
import type { OutputInfo } from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicImagesDir = join(projectRoot, 'public', 'images');
const originalDir = join(publicImagesDir, '_original');
const MAX_WIDTH = 1300;

const SUPPORTED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.avif',
  '.heic',
  '.heif',
]);
const COPY_EXTENSIONS = new Set(['.svg', '.gif']);

interface CompressResult {
  file: string;
  status: 'compressed' | 'skipped' | 'copied';
  originalBytes?: number;
  compressedBytes?: number;
  reason?: string;
}

async function walk(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];
  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await walk(fullPath)));
      } else if (entry.isFile()) {
        files.push(fullPath);
      }
    }),
  );
  return files;
}

function createLimiter(concurrency: number) {
  let activeCount = 0;
  const queue: (() => void)[] = [];

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      const run = queue.shift();
      if (run) run();
    }
  };

  return async function limit<T>(fn: () => Promise<T>): Promise<T> {
    if (activeCount >= concurrency) {
      await new Promise<void>((resolve) => queue.push(resolve));
    }
    activeCount++;
    try {
      return await fn();
    } finally {
      next();
    }
  };
}

async function ensureDir(path: string) {
  await mkdir(path, { recursive: true });
}

async function compressFile(absPath: string): Promise<CompressResult> {
  const rel = relative(originalDir, absPath);
  const outPath = join(publicImagesDir, rel);
  const outDir = dirname(outPath);
  await ensureDir(outDir);

  const ext = extname(absPath).toLowerCase();
  const { size: originalBytes } = await stat(absPath);

  if (COPY_EXTENSIONS.has(ext)) {
    await Bun.write(outPath, Bun.file(absPath));
    return {
      file: rel,
      status: 'copied',
      originalBytes,
      compressedBytes: originalBytes,
    };
  }

  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return {
      file: rel,
      status: 'skipped',
      originalBytes,
      reason: `unsupported extension ${ext}`,
    };
  }

  const metadata = await sharp(absPath).metadata();
  const shouldResize = (metadata.width ?? 0) > MAX_WIDTH;
  let pipeline = sharp(absPath);
  if (shouldResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH });
  }
  let outputInfo: OutputInfo | undefined;

  switch (ext) {
    case '.jpg':
    case '.jpeg':
      outputInfo = await pipeline
        .jpeg({ quality: 70, progressive: true, mozjpeg: true })
        .toFile(outPath);
      break;
    case '.png':
      outputInfo = await pipeline
        .png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
        .toFile(outPath);
      break;
    case '.webp':
      outputInfo = await pipeline
        .webp({ quality: 80, effort: 5 })
        .toFile(outPath);
      break;
    case '.avif':
      outputInfo = await pipeline
        .avif({ quality: 45, effort: 4 })
        .toFile(outPath);
      break;
    case '.heic':
    case '.heif':
      outputInfo = await pipeline
        .heif({ quality: 55, effort: 4, compression: 'hevc' })
        .toFile(outPath);
      break;
    default:
      return {
        file: rel,
        status: 'skipped',
        originalBytes,
        reason: `no handler for ${ext}`,
      };
  }

  const compressedBytes = outputInfo?.size ?? originalBytes;

  return {
    file: rel,
    status: 'compressed',
    originalBytes,
    compressedBytes,
  };
}

function formatBytes(bytes?: number): string {
  if (bytes === undefined) {
    return '0 B';
  }
  if (bytes === 0) {
    return '0 B';
  }
  const units = ['B', 'KB', 'MB', 'GB'];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  return `${value.toFixed(exponent === 0 ? 0 : 2)} ${units[exponent]}`;
}

function formatDelta(original?: number, compressed?: number): string {
  if (!original || !compressed) {
    return '0%';
  }
  const delta = ((compressed - original) / original) * 100;
  const sign = delta > 0 ? '+' : '';
  return `${sign}${delta.toFixed(2)}%`;
}

async function main() {
  const exists = await stat(originalDir).catch(() => null);
  if (!exists || !exists.isDirectory()) {
    console.error(`Original directory not found: ${originalDir}`);
    process.exit(1);
  }

  const allFiles = await walk(originalDir);
  if (allFiles.length === 0) {
    console.log('No originals to compress.');
    return;
  }

  const cpuCount = cpus().length || 1;
  const maxConcurrency = Math.max(1, Math.min(8, cpuCount));
  console.log(
    `Compressing ${allFiles.length} file(s) with concurrency ${maxConcurrency}...`,
  );
  const limit = createLimiter(maxConcurrency);
  const results = await Promise.all(
    allFiles.map((file) => limit(() => compressFile(file))),
  );

  const compressed = results.filter((r) => r.status === 'compressed').length;
  const copied = results.filter((r) => r.status === 'copied').length;
  const skipped = results.filter((r) => r.status === 'skipped');
  const totalOriginal = results.reduce(
    (sum, r) => sum + (r.originalBytes ?? 0),
    0,
  );
  const totalCompressed = results.reduce(
    (sum, r) => sum + (r.compressedBytes ?? 0),
    0,
  );

  results.forEach((result) => {
    if (result.status === 'compressed') {
      console.log(
        `Compressed ${result.file}: ${formatBytes(result.originalBytes)} -> ${formatBytes(result.compressedBytes)} (${formatDelta(result.originalBytes, result.compressedBytes)})`,
      );
    } else if (result.status === 'copied') {
      console.log(
        `Copied ${result.file}: ${formatBytes(result.originalBytes)} (no compression applied)`,
      );
    } else {
      console.log(
        `Skipped ${result.file}: ${result.reason ?? 'no reason provided'}`,
      );
    }
  });

  console.log(`Compressed: ${compressed}`);
  if (copied > 0) {
    console.log(`Copied (no compression needed): ${copied}`);
  }
  if (skipped.length > 0) {
    console.log(`Skipped: ${skipped.length}`);
    skipped.forEach((s) => console.log(` - ${s.file}: ${s.reason}`));
  }
  if (totalOriginal > 0) {
    console.log(
      `Total: ${formatBytes(totalOriginal)} -> ${formatBytes(totalCompressed)} (${formatDelta(totalOriginal, totalCompressed)})`,
    );
  }
}

await main();
