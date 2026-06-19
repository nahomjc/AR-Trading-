"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type HorizontalScrollRowProps = {
  children: ReactNode;
  className?: string;
  trackClassName?: string;
  ariaLabel?: string;
  fullBleed?: boolean;
  /** Seconds for one half-loop when using CSS auto-scroll */
  marqueeDuration?: number;
  /** Minimum items in one half of the infinite loop */
  minLoopItems?: number;
};

function buildInfiniteTrack(
  children: ReactNode,
  minLoopItems: number,
): ReactNode[] {
  const items = Children.toArray(children);
  if (items.length === 0) return [];

  const repeat = Math.max(2, Math.ceil(minLoopItems / items.length));
  const half = Array.from({ length: repeat }, () => items).flat();
  return [...half, ...half];
}

function withLoopKey(node: ReactNode, key: string): ReactNode {
  if (isValidElement(node)) {
    return cloneElement(node as ReactElement<{ key?: string }>, { key });
  }
  return node;
}

export default function HorizontalScrollRow({
  children,
  className = "",
  trackClassName = "",
  ariaLabel = "Scrollable row",
  fullBleed = false,
  marqueeDuration,
  minLoopItems = 10,
}: HorizontalScrollRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [reverse, setReverse] = useState(false);

  const loopItems = useMemo(
    () => buildInfiniteTrack(children, minLoopItems),
    [children, minLoopItems],
  );

  const halfCount = loopItems.length / 2;
  const duration =
    marqueeDuration ?? Math.max(28, Math.ceil(halfCount) * 3.5);

  useEffect(() => {
    setFinePointer(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    );
  }, []);

  const nudge = (direction: "left" | "right") => {
    setReverse(direction === "left");
    setIsPaused(false);
    window.setTimeout(() => {
      setIsPaused(true);
      window.setTimeout(() => {
        setIsPaused(false);
        setReverse(false);
      }, 400);
    }, 900);
  };

  const arrowClass =
    "absolute top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#08243A]/92 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#C79D6D]/50 hover:bg-[#0a2a42] hover:text-[#C79D6D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79D6D] sm:h-11 sm:w-11";

  const bleedClass = fullBleed
    ? "w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2"
    : "w-full";

  const trackStyle: CSSProperties = {
    "--marquee-duration": `${duration}s`,
  } as CSSProperties;

  return (
    <div
      className={`relative overflow-x-hidden overflow-y-visible ${bleedClass} ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={() => {
        if (finePointer) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (finePointer) setIsPaused(false);
      }}
    >
      <button
        type="button"
        onClick={() => nudge("left")}
        className={`${arrowClass} left-2 sm:left-4`}
        aria-label="Scroll left"
      >
        <IconChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
      </button>

      <button
        type="button"
        onClick={() => nudge("right")}
        className={`${arrowClass} right-2 sm:right-4`}
        aria-label="Scroll right"
      >
        <IconChevronRight className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
      </button>

      <div className="overflow-x-hidden overflow-y-visible px-12 sm:px-16">
        <div
          ref={trackRef}
          className={`carousel-focus-row infinite-marquee-track flex w-max items-center gap-6 py-8 sm:gap-8 sm:py-10 lg:gap-10 ${isPaused ? "paused" : ""} ${reverse ? "reverse" : ""} ${trackClassName}`}
          style={trackStyle}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          onTouchCancel={() => setIsPaused(false)}
        >
          {loopItems.map((item, index) =>
            withLoopKey(item, `loop-item-${index}`),
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#08243A] via-[#08243A]/80 to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#08243A] via-[#08243A]/80 to-transparent sm:w-20" />
    </div>
  );
}
