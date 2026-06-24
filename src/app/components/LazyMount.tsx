"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyMountProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  minHeight?: string;
  fallback?: ReactNode;
  /** When set, mount immediately if the dock navigates to this section id */
  anchorId?: string;
};

export const DOCK_NAVIGATE_EVENT = "dock:navigate";

const SCROLL_RETRY_MS = 50;
const SCROLL_MAX_RETRIES = 40;

export function scrollToSectionId(
  id: string,
  behavior: ScrollBehavior = "smooth",
  offset = 80,
) {
  window.dispatchEvent(
    new CustomEvent(DOCK_NAVIGATE_EVENT, { detail: { id } }),
  );

  const scrollToElement = (el: HTMLElement) => {
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const attempt = (tries: number) => {
    const target = document.getElementById(id);
    if (target) {
      scrollToElement(target);
      return;
    }

    if (tries === 0) {
      const placeholder = document.querySelector<HTMLElement>(
        `[data-dock-anchor="${id}"]`,
      );
      if (placeholder) {
        scrollToElement(placeholder);
      }
    }

    if (tries < SCROLL_MAX_RETRIES) {
      window.setTimeout(() => attempt(tries + 1), SCROLL_RETRY_MS);
    }
  };

  attempt(0);
}

export default function LazyMount({
  children,
  className = "",
  rootMargin = "250px 0px",
  minHeight,
  fallback = null,
  anchorId,
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

  useEffect(() => {
    if (!anchorId) return;

    const onDockNavigate = (event: Event) => {
      const { id } = (event as CustomEvent<{ id: string }>).detail;
      if (id === anchorId) setMounted(true);
    };

    window.addEventListener(DOCK_NAVIGATE_EVENT, onDockNavigate);
    return () => window.removeEventListener(DOCK_NAVIGATE_EVENT, onDockNavigate);
  }, [anchorId]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight ? { minHeight } : undefined}
      {...(anchorId ? { "data-dock-anchor": anchorId } : {})}
    >
      {mounted ? children : fallback}
    </div>
  );
}
