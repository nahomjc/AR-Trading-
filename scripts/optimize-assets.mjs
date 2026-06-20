import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

function run(scriptUrl) {
  const script = fileURLToPath(scriptUrl);
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [script], {
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

async function main() {
  const scriptsDir = new URL(".", import.meta.url);

  console.log("=== Images ===");
  await run(new URL("./optimize-images.mjs", scriptsDir));

  console.log("\n=== 3D models ===");
  await run(new URL("./optimize-glb.mjs", scriptsDir));

  console.log("\n=== Videos (optional — needs ffmpeg) ===");
  try {
    await run(new URL("./optimize-videos.mjs", scriptsDir));
  } catch {
    console.log("Video step skipped or failed — run `pnpm run optimize:videos` after installing ffmpeg.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
