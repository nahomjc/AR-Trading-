import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const MODELS = [
  path.join(ROOT, "public", "3D", "textured.glb"),
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} exited with code ${code}`));
    });
  });
}

async function optimizeModel(inputPath) {
  const before = (await fs.stat(inputPath)).size;
  const dir = path.dirname(inputPath);
  const base = path.basename(inputPath, ".glb");
  const outputPath = path.join(dir, `${base}.optimized.glb`);
  const backupPath = path.join(dir, `${base}.glb.bak`);

  console.log(`Optimizing ${path.relative(ROOT, inputPath)} (${formatMb(before)}) …`);

  await run("npx", [
    "--yes",
    "@gltf-transform/cli",
    "optimize",
    inputPath,
    outputPath,
    "--texture-compress",
    "webp",
    "--texture-size",
    "2048",
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
  for (const model of MODELS) {
    try {
      await fs.access(model);
      await optimizeModel(model);
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
        console.log(`skip  missing ${path.relative(ROOT, model)}`);
        continue;
      }
      throw error;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
