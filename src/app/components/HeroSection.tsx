"use client";

import { memo, useCallback, useEffect, useState } from "react";
import {
  motion,
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
    className: "left-[4%] bottom-[24%]",
    delay: 0.6,
    duration: 4.8,
    offset: -8,
  },
  {
    icon: IconVideo,
    label: "Media Production",
    className: "right-[2%] bottom-[34%]",
    delay: 0.65,
    duration: 5.2,
    offset: 10,
  },
  {
    icon: IconPrinter,
    label: "Printing",
    className: "left-[14%] top-[44%]",
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
    className: "right-[18%] top-[8%] hidden lg:flex",
    delay: 0.8,
    duration: 5.4,
    offset: -9,
  },
] as const;

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const [ready, setReady] = useState(false);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, prefersReducedMotion ? 0 : 48]);

  useEffect(() => {
    const onIntro = () => setReady(true);
    window.addEventListener("introComplete", onIntro);
    const fallback = window.setTimeout(() => setReady(true), 5200);
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

            <motion.h1
              variants={fadeUp}
              className="hero-headline font-outfit text-[clamp(2.4rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white"
            >
              Visions Designed.
              <br />
              Stories Told.
              <br />
              <span className="bg-gradient-to-r from-[#C79D6D] via-[#e8c9a8] to-[#d4a574] bg-clip-text text-transparent">
                Brands Transformed.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="hero-subtitle mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              Full-service advertising, branding, digital marketing, and media
              production — built to help your business stand out and grow.
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
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40, scale: 0.96 }}
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
