import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public", "img");

/** Max output size in bytes */
const TARGETS = {
  portfolio: 400 * 1024,
  hero: 800 * 1024,
  default: 500 * 1024,
};

const HERO_FILES = new Set(["hero-image-7.png", "hero-image.png"]);
const MAX_DIMENSION = {
  portfolio: 1200,
  hero: 1600,
  default: 1400,
};

function maxDimensionFor(filePath) {
  const name = path.basename(filePath);
  if (HERO_FILES.has(name)) return MAX_DIMENSION.hero;
  if (filePath.includes(`${path.sep}Pictures${path.sep}`)) return MAX_DIMENSION.portfolio;
  return MAX_DIMENSION.default;
}

function targetFor(filePath) {
  const name = path.basename(filePath);
  if (HERO_FILES.has(name)) return TARGETS.hero;
  if (filePath.includes(`${path.sep}Pictures${path.sep}`)) return TARGETS.portfolio;
  return TARGETS.default;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
      continue;
    }

    if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

async function compressImage(filePath) {
  const before = (await fs.stat(filePath)).size;
  const target = targetFor(filePath);
  if (before <= target) {
    return { filePath, before, after: before, skipped: true };
  }

  const ext = path.extname(filePath).toLowerCase();
  const tmp = `${filePath}.opt.tmp`;
  const maxDim = maxDimensionFor(filePath);

  let quality = ext === ".png" ? 82 : 84;
  let after = before;
  let buffer = null;

  while (quality >= 55) {
    let pipeline = sharp(filePath, { failOn: "none" });

    const meta = await sharp(filePath, { failOn: "none" }).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;
    const longest = Math.max(width, height);

    if (longest > maxDim) {
      pipeline = pipeline.resize({
        width: width >= height ? maxDim : undefined,
        height: height > width ? maxDim : undefined,
        fit: "inside",
        withoutEnlargement: true,
      });
    }

    if (ext === ".png") {
      buffer = await pipeline
        .png({ quality, compressionLevel: 9, effort: 10 })
        .toBuffer();
    } else {
      buffer = await pipeline
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();
    }

    after = buffer.length;
    if (after <= target || after >= before * 0.92) break;
    quality -= 6;
  }

  if (!buffer || after >= before) {
    return { filePath, before, after: before, skipped: true };
  }

  await fs.writeFile(tmp, buffer);
  await fs.rename(tmp, filePath);

  return { filePath, before, after, skipped: false, quality };
}

async function main() {
  const files = await walk(IMG_DIR);
  let saved = 0;
  let optimized = 0;

  console.log(`Optimizing ${files.length} images under public/img …\n`);

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    try {
      const result = await compressImage(file);
      if (result.skipped) {
        console.log(`  skip  ${rel} (${formatKb(result.before)})`);
        continue;
      }

      optimized += 1;
      saved += result.before - result.after;
      console.log(
        `  ok    ${rel}  ${formatKb(result.before)} → ${formatKb(result.after)} (q${result.quality})`,
      );
    } catch (error) {
      console.error(`  fail  ${rel}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(
    `\nDone: ${optimized} optimized, ${formatKb(saved)} saved total.`,
  );
}

function formatKb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
