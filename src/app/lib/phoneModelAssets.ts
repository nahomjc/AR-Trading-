export const PHONE_MODEL_PATH = "/3D/white_mesh%20(1).obj";
export const PHONE_SCREEN_IMAGE = "/img/advert/images__2_-removebg-preview.png";

let preloadStarted = false;

/** Warm network cache + JS chunk before the section scrolls into view */
export function preloadPhoneModelAssets() {
  if (typeof window === "undefined" || preloadStarted) return;
  preloadStarted = true;

  for (const href of [PHONE_MODEL_PATH, PHONE_SCREEN_IMAGE]) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = href.endsWith(".obj") ? "fetch" : "image";
    link.href = href;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  }

  void import("../components/PhoneModel3D");
}
