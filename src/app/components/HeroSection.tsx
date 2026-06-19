"use client";

import { memo, useCallback, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import {
  IconArrowRight,
  IconSparkles,
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconWorld,
  IconSpeakerphone,
  IconTrendingUp,
} from "@tabler/icons-react";

const INTRO_SEEN_KEY = "ar-intro-seen";

const NAV_OFFSET = 80;

const trustItems = [
  { value: "50+", label: "Projects" },
  { value: "10+", label: "Clients" },
  { value: "98%", label: "Satisfaction" },
];

const spring = { type: "spring", stiffness: 90, damping: 22 } as const;

const floatingIcons = [
  {
    icon: IconChartLine,
    label: "Digital Marketing",
    className: "left-[0%] top-[6%]",
    delay: 0.45,
    duration: 5,
    offset: -10,
  },
  {
    icon: IconPalette,
    label: "Branding & Design",
    className: "right-[-2%] top-[20%]",
    delay: 0.55,
    duration: 5.5,
    offset: 9,
  },
  {
    icon: IconSpeakerphone,
    label: "Advertising",
    className: "left-[4%] bottom-[24%] hidden sm:flex",
    delay: 0.6,
    duration: 4.8,
    offset: -8,
  },
  {
    icon: IconVideo,
    label: "Media Production",
    className: "right-[2%] bottom-[34%] hidden sm:flex",
    delay: 0.65,
    duration: 5.2,
    offset: 10,
  },
  {
    icon: IconPrinter,
    label: "Printing",
    className: "left-[14%] top-[44%] hidden md:flex",
    delay: 0.7,
    duration: 4.6,
    offset: -7,
  },
  {
    icon: IconWorld,
    label: "Web Development",
    className: "right-[10%] bottom-[10%]",
    delay: 0.75,
    duration: 5.8,
    offset: 8,
  },
  {
    icon: IconTrendingUp,
    label: "Growth Strategy",
    className: "right-[18%] top-[8%] hidden xl:flex",
    delay: 0.8,
    duration: 5.4,
    offset: -9,
  },
] as const;

const staticHeadlineLines = [
  { text: "Visions Designed.", variant: "white" as const },
  { text: "Stories Told.", variant: "white" as const },
] as const;

const BRAND_PREFIX = "Brands ";
const ROTATING_WORDS = [
  "Transformed.",
  "Elevated.",
  "Amplified.",
  "Reimagined.",
  "Empowered.",
] as const;
const ROTATE_MS = 2500;
const LINE3_TYPED = `${BRAND_PREFIX}${ROTATING_WORDS[0]}`;
const LINE3_MEASURE = `${BRAND_PREFIX}${ROTATING_WORDS.reduce((a, b) =>
  a.length > b.length ? a : b,
)}`;

const CHAR_MS = 48;
const LINE_PAUSE_MS = 450;
const START_DELAY_MS = 300;

function charDelay(char: string) {
  if (char === " ") return 28;
  if (char === "." || char === ",") return 220;
  return CHAR_MS;
}

type TypewriterHeadlineProps = {
  ready: boolean;
  reducedMotion: boolean | null;
  onComplete?: () => void;
};

function lineClass(variant: "white" | "gold") {
  return variant === "gold"
    ? "bg-gradient-to-r from-[#C79D6D] via-[#e8c9a8] to-[#d4a574] bg-clip-text text-transparent"
    : "text-white";
}

function lineText(lineIndex: number) {
  if (lineIndex < staticHeadlineLines.length) {
    return staticHeadlineLines[lineIndex].text;
  }
  return LINE3_TYPED;
}

function RotatingBrandWord({
  active,
  wordIndex,
}: {
  active: boolean;
  wordIndex: number;
}) {
  const longest = ROTATING_WORDS.reduce((a, b) =>
    a.length > b.length ? a : b,
  );

  return (
    <span className="relative ml-1 inline-flex align-bottom">
      <span
        className="invisible whitespace-nowrap px-2.5 py-0.5 sm:px-3"
        aria-hidden
      >
        {longest}
      </span>

      <span className="absolute inset-0 overflow-hidden rounded-lg border border-[#C79D6D]/25 bg-gradient-to-br from-[#C79D6D]/14 via-white/[0.04] to-[#d4a574]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-gradient-to-b from-[#C79D6D] to-[#d4a574]" />

        <span className="relative flex h-full items-center px-2.5 py-0.5 sm:px-3">
          <AnimatePresence mode="wait">
            {active && (
              <motion.span
                key={ROTATING_WORDS[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap bg-gradient-to-r from-[#e8c9a8] via-white to-[#d4a574] bg-clip-text text-transparent"
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        <motion.span
          key={`accent-${wordIndex}`}
          aria-hidden
          className="absolute bottom-0 left-2 right-2 h-px origin-center bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </span>
    </span>
  );
}

function TypewriterHeadline({
  ready,
  reducedMotion,
  onComplete,
}: TypewriterHeadlineProps) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const totalLines = staticHeadlineLines.length + 1;

  useEffect(() => {
    if (!ready) return;

    if (reducedMotion) {
      setFinished(true);
      onComplete?.();
      return;
    }

    const startTimer = window.setTimeout(
      () => setStarted(true),
      START_DELAY_MS,
    );
    return () => window.clearTimeout(startTimer);
  }, [ready, reducedMotion, onComplete]);

  useEffect(() => {
    if (!started || reducedMotion || finished) return;

    const currentText = lineText(lineIndex);

    if (charIndex < currentText.length) {
      const nextChar = currentText[charIndex];
      const timer = window.setTimeout(
        () => setCharIndex((c) => c + 1),
        charDelay(nextChar ?? ""),
      );
      return () => window.clearTimeout(timer);
    }

    if (lineIndex < totalLines - 1) {
      const timer = window.setTimeout(() => {
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }, LINE_PAUSE_MS);
      return () => window.clearTimeout(timer);
    }

    setFinished(true);
    onComplete?.();
  }, [
    started,
    lineIndex,
    charIndex,
    reducedMotion,
    finished,
    onComplete,
    totalLines,
  ]);

  useEffect(() => {
    if (!finished || reducedMotion) return;

    const timer = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, ROTATE_MS);

    return () => window.clearInterval(timer);
  }, [finished, reducedMotion]);

  if (reducedMotion) {
    return (
      <h1 className="hero-headline font-outfit text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
        {staticHeadlineLines.map((line) => (
          <span key={line.text} className="block">
            <span className={lineClass(line.variant)}>{line.text}</span>
          </span>
        ))}
        <span className="block">
          <span className={lineClass("gold")}>
            {BRAND_PREFIX}
            {ROTATING_WORDS[0]}
          </span>
        </span>
      </h1>
    );
  }

  const renderStaticLine = (
    line: (typeof staticHeadlineLines)[number],
    li: number,
  ) => {
    const isPast = li < lineIndex;
    const isCurrent = li === lineIndex && started;
    const visible = isPast
      ? line.text
      : isCurrent
        ? line.text.slice(0, charIndex)
        : "";
    const showCursor = isCurrent && !finished;
    const progress = isCurrent ? charIndex / line.text.length : isPast ? 1 : 0;

    return (
      <span key={line.text} className="relative block">
        <span className="invisible block select-none" aria-hidden>
          {line.text}
        </span>
        <span className={`absolute left-0 top-0 ${lineClass(line.variant)}`}>
          {visible}
          {showCursor && (
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] bg-[#C79D6D] align-middle shadow-[0_0_8px_rgba(199,157,109,0.6)]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.9,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.45, 0.45, 1],
                ease: "linear",
              }}
            />
          )}
        </span>
        {isCurrent && progress > 0 && !finished && (
          <motion.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#C79D6D]/70 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        )}
      </span>
    );
  };

  const line3Index = staticHeadlineLines.length;
  const isLine3Current = line3Index === lineIndex && started;
  const line3Visible = isLine3Current
    ? LINE3_TYPED.slice(0, charIndex)
    : line3Index < lineIndex
      ? LINE3_TYPED
      : "";
  const line3PrefixDone =
    line3Index < lineIndex ||
    (isLine3Current && charIndex >= BRAND_PREFIX.length);
  const showLine3Cursor = isLine3Current && !finished;
  const line3Progress = isLine3Current
    ? charIndex / LINE3_TYPED.length
    : line3Index < lineIndex
      ? 1
      : 0;

  return (
    <h1 className="hero-headline font-outfit text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight">
      {staticHeadlineLines.map((line, li) => renderStaticLine(line, li))}

      <span className="relative block">
        <span className="invisible block select-none" aria-hidden>
          {LINE3_MEASURE}
        </span>
        <span className="absolute left-0 top-0">
          {!line3PrefixDone ? (
            <span className={lineClass("gold")}>{line3Visible}</span>
          ) : (
            <span className={lineClass("gold")}>
              {BRAND_PREFIX}
              {finished ? (
                <RotatingBrandWord active wordIndex={wordIndex} />
              ) : (
                line3Visible.slice(BRAND_PREFIX.length)
              )}
            </span>
          )}
          {showLine3Cursor && (
            <motion.span
              aria-hidden
              className="ml-0.5 inline-block h-[0.85em] w-[2px] translate-y-[0.05em] bg-[#C79D6D] align-middle shadow-[0_0_8px_rgba(199,157,109,0.6)]"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{
                duration: 0.9,
                repeat: Number.POSITIVE_INFINITY,
                times: [0, 0.45, 0.45, 1],
                ease: "linear",
              }}
            />
          )}
        </span>
        {isLine3Current && line3Progress > 0 && !finished && (
          <motion.span
            aria-hidden
            className="absolute -bottom-1 left-0 h-px bg-gradient-to-r from-[#C79D6D]/70 to-transparent"
            initial={{ width: 0 }}
            animate={{ width: `${line3Progress * 100}%` }}
            transition={{ duration: 0.08, ease: "linear" }}
          />
        )}
      </span>
    </h1>
  );
}

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const [headlineDone, setHeadlineDone] = useState(false);
  const { scrollY } = useScroll();
  const imageY = useTransform(
    scrollY,
    [0, 500],
    [0, prefersReducedMotion ? 0 : 48],
  );

  useEffect(() => {
    const onIntro = () => setReady(true);
    window.addEventListener("introComplete", onIntro);

    if (sessionStorage.getItem(INTRO_SEEN_KEY) === "1") {
      onIntro();
    }

    const fallback = window.setTimeout(() => setReady(true), 2800);
    return () => {
      window.removeEventListener("introComplete", onIntro);
      window.clearTimeout(fallback);
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
      top: Math.max(0, el.offsetTop - NAV_OFFSET),
      behavior: "smooth",
    });
  }, []);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: spring,
    },
  };

  const stagger: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.09,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#08243A] px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-24 lg:pt-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-[#C79D6D]/10 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-blue-600/10 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(199,157,109,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(199,157,109,0.5) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08243A]/40 to-[#08243A]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          {/* Copy — classic left column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={ready ? "show" : "hidden"}
            className="order-2 text-left lg:order-1"
          >
            <motion.div
              variants={fadeUp}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 backdrop-blur-sm"
            >
              <IconSparkles className="h-4 w-4 text-[#C79D6D]" />
              <span>Creative agency based in Ethiopia</span>
            </motion.div>

            <TypewriterHeadline
              ready={ready}
              reducedMotion={prefersReducedMotion}
              onComplete={() => setHeadlineDone(true)}
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                headlineDone || prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="hero-subtitle mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              Full-service advertising, branding, digital marketing, and media
              production ,built to help your business stand out and grow.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.button
                type="button"
                onClick={() => scrollTo("contact")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C79D6D]/25 sm:text-base"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                Start a Project
                <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.button
                type="button"
                onClick={() => scrollTo("latest-works")}
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D] sm:text-base"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
              >
                View Our Work
              </motion.button>
            </motion.div>

            {/* Inline social proof — cleaner than stat cards */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/10 pt-8"
            >
              {trustItems.map((item) => (
                <div key={item.label}>
                  <p className="text-xl font-bold text-[#C79D6D] sm:text-2xl">
                    {item.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual — classic right column */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{
              opacity: 0,
              y: prefersReducedMotion ? 0 : 40,
              scale: 0.96,
            }}
            animate={
              ready
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 40, scale: 0.96 }
            }
            transition={{ ...spring, delay: prefersReducedMotion ? 0 : 0.2 }}
          >
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Spotlight */}
              <div className="pointer-events-none absolute inset-0 scale-110 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(199,157,109,0.22),transparent_65%)]" />

              {/* Floating marketing icons */}
              {floatingIcons.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    className={`pointer-events-none absolute z-20 flex ${item.className}`}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={
                      ready
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.75 }
                    }
                    transition={{
                      ...spring,
                      delay: prefersReducedMotion ? 0 : item.delay,
                    }}
                    aria-hidden
                  >
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#08243A]/75 shadow-lg shadow-black/25 backdrop-blur-md sm:h-11 sm:w-11"
                      animate={
                        prefersReducedMotion || !ready
                          ? undefined
                          : { y: [0, item.offset, 0] }
                      }
                      transition={{
                        duration: item.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: item.delay * 0.5,
                      }}
                    >
                      <Icon
                        className="h-[18px] w-[18px] text-[#C79D6D] sm:h-5 sm:w-5"
                        stroke={1.5}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}

              <motion.div style={{ y: imageY }} className="relative">
                <Image
                  src="/img/hero-image-7.png"
                  alt="Addis Reality creative and digital marketing"
                  width={1200}
                  height={1200}
                  className="relative z-10 w-full object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  priority
                />
              </motion.div>

              {/* Subtle accent ring */}
              <motion.div
                className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C79D6D]/15"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.03, 1], opacity: [0.35, 0.55, 0.35] }
                }
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default memo(HeroSection);
