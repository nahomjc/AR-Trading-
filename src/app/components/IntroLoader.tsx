"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const LOADER_DURATION_MS = 2400;
const NAV_OFFSET = 80;
const RING_SIZE = 320;
const RING_R = 138;
const PROGRESS_R = RING_R + 8;
const PROGRESS_C = 2 * Math.PI * PROGRESS_R;

const STARS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const radius = 38 + (i % 4) * 5;
  return {
    id: `star-${i}`,
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius}%`,
    delay: (i % 7) * 0.18,
  };
});

export default function IntroLoader() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const wasVisibleRef = useRef(false);

  const strokeOffset = useMemo(
    () => PROGRESS_C - (progress / 100) * PROGRESS_C,
    [progress]
  );

  useEffect(() => {
    const skipIntro = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (skipIntro) {
      window.dispatchEvent(new CustomEvent("introComplete"));
      return;
    }

    setShow(true);

    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + 5));
    }, LOADER_DURATION_MS / 20);

    const timer = setTimeout(() => {
      setShow(false);
      clearInterval(progressInterval);
    }, LOADER_DURATION_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (show) {
      wasVisibleRef.current = true;
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
      return () => {
        document.body.style.overflow = "";
      };
    }

    if (!wasVisibleRef.current) return;

    wasVisibleRef.current = false;
    document.body.style.overflow = "";
    window.dispatchEvent(new CustomEvent("introComplete"));

    const scrollToHero = () => {
      const hero = document.getElementById("home");
      if (!hero) return;

      const top = Math.max(0, hero.offsetTop - NAV_OFFSET);
      window.scrollTo({ top, behavior: "smooth" });
    };

    const frame = requestAnimationFrame(scrollToHero);
    return () => cancelAnimationFrame(frame);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
          }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"
        >
          {/* Aurora atmosphere — matches site hero / section glows */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="intro-aurora-blob-1 absolute -left-[10%] top-[10%] h-[55vh] w-[55vh] rounded-full bg-[#C79D6D]/10 blur-[100px]" />
            <div className="intro-aurora-blob-2 absolute -right-[5%] bottom-[5%] h-[50vh] w-[50vh] rounded-full bg-blue-500/10 blur-[90px]" />
            <div className="intro-aurora-blob-3 absolute left-[30%] top-[40%] h-[40vh] w-[40vh] rounded-full bg-[#d4a574]/10 blur-[80px]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(8,36,58,0.55) 65%, #08243A 100%)",
              }}
            />
          </div>

          {/* Constellation ring */}
          <div className="pointer-events-none absolute h-[min(88vw,380px)] w-[min(88vw,380px)]">
            {STARS.map((star) => (
              <span
                key={star.id}
                className="intro-star absolute h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4a574]"
                style={{
                  left: star.left,
                  top: star.top,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Light sweep */}
          <div
            className="intro-light-sweep pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden="true"
          >
            <div className="absolute left-1/2 top-0 h-full w-32 -translate-x-1/2 bg-gradient-to-b from-transparent via-[#C79D6D]/20 to-transparent" />
          </div>

          {/* Orbital rings */}
          <div
            className="intro-orbit-ring pointer-events-none absolute flex items-center justify-center"
            style={{ width: RING_SIZE, height: RING_SIZE }}
          >
            <svg width={RING_SIZE} height={RING_SIZE} viewBox="0 0 300 300" aria-hidden="true">
              <defs>
                <linearGradient id="introRingGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C79D6D" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#d4a574" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#C79D6D" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <circle
                cx="150"
                cy="150"
                r={RING_R}
                fill="none"
                stroke="url(#introRingGold)"
                strokeWidth="1"
                strokeDasharray="4 14"
                opacity="0.55"
              />
            </svg>
          </div>

          <div
            className="intro-orbit-ring-reverse pointer-events-none absolute flex items-center justify-center"
            style={{ width: RING_SIZE - 48, height: RING_SIZE - 48 }}
          >
            <svg width={RING_SIZE - 48} height={RING_SIZE - 48} viewBox="0 0 300 300" aria-hidden="true">
              <circle
                cx="150"
                cy="150"
                r="118"
                fill="none"
                stroke="rgba(199,157,109,0.25)"
                strokeWidth="0.5"
              />
            </svg>
          </div>

          {/* Progress arc */}
          <svg
            className="pointer-events-none absolute"
            width={RING_SIZE + 24}
            height={RING_SIZE + 24}
            viewBox="0 0 300 300"
            aria-hidden="true"
          >
            <circle
              cx="150"
              cy="150"
              r={PROGRESS_R}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2"
            />
            <motion.circle
              cx="150"
              cy="150"
              r={PROGRESS_R}
              fill="none"
              stroke="url(#introRingGold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={PROGRESS_C}
              animate={{ strokeDashoffset: strokeOffset }}
              transform="rotate(-90 150 150)"
              style={{
                filter: "drop-shadow(0 0 8px rgba(199,157,109,0.6))",
              }}
            />
          </svg>

          {/* Center reveal */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.4, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{
                duration: 1.2,
                delay: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mb-8 sm:mb-10"
            >
              <motion.div
                className="pointer-events-none absolute -inset-10 rounded-full"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.8, 0.5], scale: [0.5, 1.2, 1] }}
                transition={{ duration: 1.6, delay: 0.5 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(199,157,109,0.35) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }}
              />
              <Image
                src="/img/White-with-background-removebg-preview.png"
                alt="Addis Reality"
                width={260}
                height={104}
                className="relative h-auto w-[190px] sm:w-[240px]"
                style={{
                  filter:
                    "drop-shadow(0 0 30px rgba(199,157,109,0.45)) drop-shadow(0 0 60px rgba(255,250,240,0.15))",
                }}
                priority
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.9 } },
              }}
              className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            >
              {["ADDIS", "REALITY"].map((word, i) => (
                <motion.span
                  key={word}
                  variants={{
                    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  className={`text-2xl font-light tracking-[0.32em] sm:text-4xl sm:tracking-[0.38em] ${
                    i === 0
                      ? "bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                      : "bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            <div className="mt-5 overflow-hidden">
              <motion.p
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
                className="text-[10px] font-light uppercase tracking-[0.32em] text-gray-400 sm:text-[11px]"
              >
                Digital Marketing &amp; Trading Solutions
              </motion.p>
            </div>
          </div>

          {/* Bottom status */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="absolute bottom-10 left-0 right-0 text-center sm:bottom-12"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
              Loading experience
              <span className="ml-3 tabular-nums text-[#C79D6D]">
                {progress}%
              </span>
            </p>
          </motion.div>

          {/* Orbiting light bead */}
          <div
            className="intro-orbit-ring pointer-events-none absolute"
            style={{ width: RING_SIZE + 24, height: RING_SIZE + 24 }}
          >
            <div className="relative h-full w-full">
              <div
                className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4a574]"
                style={{
                  boxShadow:
                    "0 0 12px #C79D6D, 0 0 24px rgba(212,165,116,0.45)",
                }}
              />
            </div>
          </div>

          {/* Corner accents — site pattern */}
          <div className="pointer-events-none absolute left-5 top-5 h-10 w-10 border-l border-t border-[#C79D6D]/25 sm:left-8 sm:top-8" />
          <div className="pointer-events-none absolute right-5 top-5 h-10 w-10 border-r border-t border-[#C79D6D]/25 sm:right-8 sm:top-8" />
          <div className="pointer-events-none absolute bottom-5 left-5 h-10 w-10 border-b border-l border-[#C79D6D]/20 sm:bottom-8 sm:left-8" />
          <div className="pointer-events-none absolute bottom-5 right-5 h-10 w-10 border-b border-r border-[#C79D6D]/20 sm:bottom-8 sm:right-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
