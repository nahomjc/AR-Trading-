"use client";

import { useEffect, useState } from "react";
import { get3DProfile, type ThreeDProfile } from "../lib/webglCapabilities";

export function use3DProfile(): ThreeDProfile | null {
  const [profile, setProfile] = useState<ThreeDProfile | null>(null);

  useEffect(() => {
    setProfile(get3DProfile());
  }, []);

  return profile;
}
