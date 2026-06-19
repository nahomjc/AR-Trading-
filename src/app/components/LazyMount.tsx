"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: string;
  fallback?: ReactNode;
};

export default function LazyMount({
  children,
  className = "",
  rootMargin = "250px 0px",
  minHeight,
  fallback = null,
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight ? { minHeight } : undefined}
    >
      {mounted ? children : fallback}
    </div>
  );
}
