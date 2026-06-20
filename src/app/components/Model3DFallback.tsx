"use client";

import Image from "next/image";

type Model3DFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  label?: string;
};

export function Model3DFallback({
  src,
  alt,
  className = "",
  label = "3D preview",
}: Model3DFallbackProps) {
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-[#C79D6D]/20 bg-gradient-to-br from-[#0a2a42]/80 to-[#08243A]/90 ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-6 sm:p-8"
        sizes="(max-width: 640px) 90vw, 420px"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function Model3DSpinner({ label = "Loading 3D…" }: { label?: string }) {
  return (
    <div
      className="flex h-full min-h-[280px] w-full items-center justify-center"
      role="status"
      aria-label={label}
    >
      <div className="text-center">
        <div className="mx-auto mb-2 h-10 w-10 animate-spin rounded-full border-2 border-[#C79D6D] border-t-transparent" />
        <p className="text-xs font-medium text-[#C79D6D]">{label}</p>
      </div>
    </div>
  );
}
