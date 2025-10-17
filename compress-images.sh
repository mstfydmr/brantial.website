#!/usr/bin/env bash
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PUBLIC_IMAGES="$DIR/public/images"
ORIGINAL_DIR="$PUBLIC_IMAGES/_original"

mkdir -p "$ORIGINAL_DIR"

# step 1: copy missing originals
find "$PUBLIC_IMAGES" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.webp' -o -iname '*.avif' -o -iname '*.heic' -o -iname '*.gif' \) ! -path "$ORIGINAL_DIR/*" | while read -r filepath; do
  rel_path="${filepath#$PUBLIC_IMAGES/}"
  dest="$ORIGINAL_DIR/$rel_path"
  dest_dir="$(dirname "$dest")"
  if [ ! -f "$dest" ]; then
    mkdir -p "$dest_dir"
    cp "$filepath" "$dest"
  fi
done

# step 2: recompress originals back into public/images
bun run scripts/compress-images.ts
