import { shouldPreloadHeavy3DAssets } from "./webglCapabilities";

export const ABOUT_MODEL_PATH = "/3D/textured.glb";

let preloadStarted = false;

/** Warm network cache + JS chunk before the About section paints */
export function preloadAboutModelAssets() {
  if (typeof window === "undefined" || preloadStarted) return;
  preloadStarted = true;

  if (shouldPreloadHeavy3DAssets()) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "fetch";
    link.href = ABOUT_MODEL_PATH;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }

  void import("../components/AboutModel3D");
}
