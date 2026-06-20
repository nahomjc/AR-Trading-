export type ThreeDProfile = {
  supported: boolean;
  isMobile: boolean;
  tier: "low" | "medium" | "high";
  dpr: number;
  antialias: boolean;
  maxAnisotropy: number;
};

export function isMobileUserAgent(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function detectWebGL(): boolean {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2", {
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
      }) ??
      canvas.getContext("webgl", {
        failIfMajorPerformanceCaveat: false,
        powerPreference: "default",
      });

    return !!context;
  } catch {
    return false;
  }
}

export function get3DProfile(): ThreeDProfile {
  const isMobile = isMobileUserAgent();
  const supported = detectWebGL();
  const deviceMemory = (
    navigator as Navigator & { deviceMemory?: number }
  ).deviceMemory;
  const lowMemory =
    deviceMemory !== undefined && deviceMemory > 0 && deviceMemory < 4;

  let tier: ThreeDProfile["tier"] = "high";
  if (!supported) tier = "low";
  else if (isMobile && lowMemory) tier = "low";
  else if (isMobile) tier = "medium";

  return {
    supported,
    isMobile,
    tier,
    dpr:
      tier === "high"
        ? Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)
        : 1,
    antialias: tier === "high",
    maxAnisotropy: tier === "high" ? 4 : 1,
  };
}

export function shouldPreloadHeavy3DAssets(): boolean {
  if (typeof window === "undefined") return false;
  const profile = get3DProfile();
  return profile.supported && profile.tier !== "low";
}
