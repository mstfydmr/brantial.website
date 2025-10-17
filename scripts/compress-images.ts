import { mkdir, readdir, stat } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicImagesDir = join(projectRoot, 'public', 'images');
const originalDir = join(publicImagesDir, '_original');

const SUPPORTED_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.avif', '.heic', '.heif']);
const COPY_EXTENSIONS = new Set(['.svg', '.gif']);

interface CompressResult {
  file: string;
  status: 'compressed' | 'skipped' | 'copied';
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
    })
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

  if (COPY_EXTENSIONS.has(ext)) {
    await Bun.file(absPath).stream().pipeTo(createWriteStream(outPath));
    return { file: rel, status: 'copied' };
  }

  if (!SUPPORTED_EXTENSIONS.has(ext)) {
    return { file: rel, status: 'skipped', reason: `unsupported extension ${ext}` };
  }

  const image = sharp(absPath);

  switch (ext) {
    case '.jpg':
    case '.jpeg':
      await image.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toFile(outPath);
      break;
    case '.png':
      await image.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toFile(outPath);
      break;
    case '.webp':
      await image.webp({ quality: 80, effort: 5 }).toFile(outPath);
      break;
    case '.avif':
      await image.avif({ quality: 45, effort: 4 }).toFile(outPath);
      break;
    case '.heic':
    case '.heif':
      await image.heif({ quality: 55, effort: 4, compression: 'hevc' }).toFile(outPath);
      break;
    default:
      return { file: rel, status: 'skipped', reason: `no handler for ${ext}` };
  }

  return { file: rel, status: 'compressed' };
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

  const maxConcurrency = Math.max(1, Math.min(8, Bun.cpuCores()));
  const limit = createLimiter(maxConcurrency);
  const results = await Promise.all(allFiles.map((file) => limit(() => compressFile(file))));

  const compressed = results.filter((r) => r.status === 'compressed').length;
  const copied = results.filter((r) => r.status === 'copied').length;
  const skipped = results.filter((r) => r.status === 'skipped');

  console.log(`Compressed: ${compressed}`);
  if (copied > 0) {
    console.log(`Copied (no compression needed): ${copied}`);
  }
  if (skipped.length > 0) {
    console.log(`Skipped: ${skipped.length}`);
    skipped.forEach((s) => console.log(` - ${s.file}: ${s.reason}`));
  }
}

await main();
