"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
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
  /** Seconds for one loop across half the duplicated track */
  marqueeDuration?: number;
  /** Minimum items in one half of the infinite loop */
  minLoopItems?: number;
  /** Continuous auto-scroll (default on) */
  autoScroll?: boolean;
};

function markScrollCards(children: ReactNode): ReactNode[] {
  return Children.toArray(children).map((child, index) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<{ "data-scroll-card"?: boolean }>, {
        "data-scroll-card": true,
        key: child.key ?? `scroll-card-${index}`,
      });
    }
    return child;
  });
}

function buildLoopTrack(
  children: ReactNode,
  minLoopItems: number,
): ReactNode[] {
  const items = markScrollCards(children);
  if (items.length === 0) return [];

  const repeat = Math.max(2, Math.ceil(minLoopItems / items.length));
  const half = Array.from({ length: repeat }, (_, round) =>
    items.map((item, index) => {
      if (isValidElement(item)) {
        return cloneElement(
          item as ReactElement<{ key?: string }>,
          { key: `${String(item.key ?? index)}-loop-${round}` },
        );
      }
      return item;
    }),
  ).flat();

  return [...half, ...half];
}

export default function HorizontalScrollRow({
  children,
  className = "",
  trackClassName = "",
  ariaLabel = "Scrollable row",
  fullBleed = false,
  marqueeDuration = 36,
  minLoopItems = 10,
  autoScroll = true,
}: HorizontalScrollRowProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const loopItems = useMemo(
    () => buildLoopTrack(children, minLoopItems),
    [children, minLoopItems],
  );

  const pause = useCallback((temporaryMs?: number) => {
    pausedRef.current = true;
    setIsPaused(true);
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }
    if (temporaryMs !== undefined) {
      resumeTimerRef.current = window.setTimeout(() => {
        pausedRef.current = false;
        setIsPaused(false);
        resumeTimerRef.current = null;
      }, temporaryMs);
    }
  }, []);

  const resume = useCallback(() => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    pausedRef.current = false;
    setIsPaused(false);
  }, []);

  useEffect(
    () => () => {
      if (resumeTimerRef.current) window.clearTimeout(resumeTimerRef.current);
    },
    [],
  );

  const normalizeLoop = useCallback(() => {
    const scroller = scrollerRef.current;
    const track = trackRef.current;
    if (!scroller || !track) return;

    const half = track.scrollWidth / 2;
    if (half <= 0) return;

    if (scroller.scrollLeft >= half) {
      scroller.scrollLeft -= half;
    } else if (scroller.scrollLeft < 0) {
      scroller.scrollLeft += half;
    }
  }, []);

  useEffect(() => {
    if (!autoScroll) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const scroller = scrollerRef.current;
      const track = trackRef.current;

      if (scroller && track && !pausedRef.current) {
        const half = track.scrollWidth / 2;
        if (half > 0) {
          const pxPerSecond = half / marqueeDuration;
          const delta = now - lastTime;
          scroller.scrollLeft += (pxPerSecond * delta) / 1000;

          if (scroller.scrollLeft >= half) {
            scroller.scrollLeft -= half;
          }
        }
      }

      lastTime = now;
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [autoScroll, marqueeDuration, loopItems.length]);

  const scrollByStep = (direction: "left" | "right") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    pause(4500);

    const firstCard = scroller.querySelector<HTMLElement>("[data-scroll-card]");
    const trackStyles = trackRef.current
      ? getComputedStyle(trackRef.current)
      : null;
    const gap =
      Number.parseFloat(trackStyles?.columnGap || trackStyles?.gap || "24") ||
      24;
    const step = firstCard
      ? firstCard.offsetWidth + gap
      : Math.max(240, scroller.clientWidth * 0.82);

    scroller.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });

    window.setTimeout(normalizeLoop, 420);
  };

  const arrowClass =
    "pointer-events-auto absolute top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-[#08243A]/95 text-white shadow-lg backdrop-blur-md transition-all hover:border-[#C79D6D]/55 hover:bg-[#0a2a42] hover:text-[#C79D6D] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79D6D] active:scale-95 sm:h-11 sm:w-11";

  const bleedClass = fullBleed
    ? "w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2"
    : "w-full";

  return (
    <div
      className={`relative isolate ${bleedClass} ${className}`}
      aria-label={ariaLabel}
      onMouseEnter={() => pause()}
      onMouseLeave={() => resume()}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-10 bg-gradient-to-r from-[#08243A] via-[#08243A]/80 to-transparent sm:w-16" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-10 bg-gradient-to-l from-[#08243A] via-[#08243A]/80 to-transparent sm:w-16" />

      <div className="relative z-10 overflow-hidden px-11 sm:px-14">
        <div
          ref={scrollerRef}
          className={`horizontal-scroll-row w-full max-w-full ${isPaused ? "horizontal-scroll-row--paused" : ""}`}
          onTouchStart={() => pause()}
          onTouchEnd={() => pause(2500)}
          onScroll={normalizeLoop}
        >
          <div
            ref={trackRef}
            className={`flex w-max max-w-none items-center gap-6 py-6 sm:gap-8 sm:py-8 lg:gap-10 ${trackClassName}`}
          >
            {loopItems}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollByStep("left")}
        className={`${arrowClass} left-1 sm:left-3`}
        aria-label="Scroll left"
      >
        <IconChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
      </button>

      <button
        type="button"
        onClick={() => scrollByStep("right")}
        className={`${arrowClass} right-1 sm:right-3`}
        aria-label="Scroll right"
      >
        <IconChevronRight className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
      </button>
    </div>
  );
}
