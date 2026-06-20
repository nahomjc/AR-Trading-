import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const VIDEO_DIR = path.join(ROOT, "public", "video");

function hasFfmpeg() {
  const result = spawnSync("ffmpeg", ["-version"], { shell: false });
  return result.status === 0;
}

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const child = spawn("ffmpeg", args, {
      stdio: "inherit",
      shell: false,
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });
}

async function optimizeVideo(inputPath) {
  const before = (await fs.stat(inputPath)).size;
  const dir = path.dirname(inputPath);
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);
  const outputPath = path.join(dir, `${base}.optimized${ext}`);
  const backupPath = path.join(dir, `${base}${ext}.bak`);

  console.log(`Encoding ${path.relative(ROOT, inputPath)} (${formatMb(before)}) …`);

  await runFfmpeg([
    "-y",
    "-i",
    inputPath,
    "-vf",
    "scale=720:-2",
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-movflags",
    "+faststart",
    "-an",
    outputPath,
  ]);

  const after = (await fs.stat(outputPath)).size;

  if (after >= before) {
    console.log(`  skip  optimized file not smaller (${formatMb(after)})`);
    await fs.unlink(outputPath);
    return;
  }

  await fs.copyFile(inputPath, backupPath);
  await fs.rename(outputPath, inputPath);
  console.log(
    `  ok    ${formatMb(before)} → ${formatMb(after)} (backup: ${path.relative(ROOT, backupPath)})`,
  );
}

function formatMb(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  if (!hasFfmpeg()) {
    console.error(
      "ffmpeg not found. Install it first, then re-run:\n" +
        "  winget install Gyan.FFmpeg\n" +
        "  pnpm run optimize:videos",
    );
    process.exit(1);
  }

  const entries = await fs.readdir(VIDEO_DIR);
  const videos = entries
    .filter((name) => /\.mp4$/i.test(name) && !name.endsWith(".bak") && !name.includes(".optimized"))
    .map((name) => path.join(VIDEO_DIR, name));

  if (videos.length === 0) {
    console.log("No videos found in public/video");
    return;
  }

  for (const video of videos) {
    await optimizeVideo(video);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
