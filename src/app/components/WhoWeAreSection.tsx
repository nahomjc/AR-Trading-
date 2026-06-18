"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconTarget,
  IconEye,
  IconBulb,
  IconAward,
  IconRocket,
  IconHeartHandshake,
  IconTrendingUp,
} from "@tabler/icons-react";

const AboutModel3D = dynamic(() => import("./AboutModel3D"), {
  ssr: false,
  loading: () => (
    <div className="flex aspect-square min-h-[280px] w-full items-center justify-center sm:min-h-[360px] lg:min-h-[400px]">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#C79D6D] border-t-transparent" />
    </div>
  ),
});

const ROTATE_MS = 6000;

const pillars = [
  {
    id: "mission",
    label: "Mission",
    title: "Our Mission",
    icon: IconTarget,
    text: "To lead Ethiopia's digital transformation by delivering creative, practical, and measurable marketing solutions for every business size — from startups to established brands.",
  },
  {
    id: "vision",
    label: "Vision",
    title: "Our Vision",
    icon: IconEye,
    text: "To be the most trusted creative and commercial partner in East Africa — setting the standard for innovation, quality, and results-driven brand experiences.",
  },
  {
    id: "purpose",
    label: "Purpose",
    title: "Our Purpose",
    icon: IconBulb,
    text: "We exist to elevate Ethiopian brands with strategy, creativity, and heart. Whether you're launching a new brand or refreshing your digital presence, we design solutions that align with your goals — and exceed expectations.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "10+", label: "Trusted Clients" },
  { value: "2016", label: "Founded" },
  { value: "8+", label: "Years of Impact" },
];

const values = [
  {
    icon: IconAward,
    title: "Excellence",
    text: "Every deliverable meets the highest standard of craft and care.",
  },
  {
    icon: IconRocket,
    title: "Innovation",
    text: "We don't follow trends — we create experiences that stand out.",
  },
  {
    icon: IconTrendingUp,
    title: "Results",
    text: "Strategy backed by data, creativity driven by measurable outcomes.",
  },
  {
    icon: IconHeartHandshake,
    title: "Partnership",
    text: "We grow alongside our clients as a true extension of their team.",
  },
];

const WhoWeAreSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const active = pillars[activeIndex];
  const ActiveIcon = active.icon;

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + pillars.length) % pillars.length);
  }, []);

  useEffect(() => {
    const storedAbout = sessionStorage.getItem("highlightAbout");
    if (storedAbout) {
      setIsHighlighted(true);
      const t = setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightAbout");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const onHighlight = () => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 3000);
    };
    window.addEventListener("highlightAbout", onHighlight);
    return () => window.removeEventListener("highlightAbout", onHighlight);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isPaused || isMobile) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % pillars.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused, isMobile]);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] px-4 py-16 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[28rem] w-[28rem] rounded-full bg-[#C79D6D]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full bg-blue-500/5 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(199,157,109,0.8) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          className={`mb-12 text-center transition-all duration-500 sm:mb-16 ${
            isHighlighted
              ? "rounded-3xl border border-[#C79D6D]/50 bg-gradient-to-r from-[#C79D6D]/15 to-[#d4a574]/15 p-6 shadow-lg shadow-[#C79D6D]/20 sm:p-8"
              : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="mb-6 inline-block rounded-full border border-[#C79D6D]/30 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#C79D6D] backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            About Our Company
          </motion.span>

          <motion.h2
            className="mb-6 text-3xl font-bold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Building Brands{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              That Matter
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Founded in 2016, Addis Reality is a premier creative and commercial
            agency transforming Ethiopian businesses through strategic innovation
            and exceptional execution — online and offline.
          </motion.p>
        </motion.div>

        {/* Main panel */}
        <motion.div
          className="relative mb-10 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.08] to-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-md sm:mb-12 sm:rounded-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          onMouseEnter={() => !isMobile && setIsPaused(true)}
          onMouseLeave={() => !isMobile && setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent" />

          <div className="grid lg:grid-cols-2">
            {/* 3D model column */}
            <div className="relative border-b border-white/10 p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div className="relative overflow-hidden rounded-2xl border border-[#C79D6D]/20 bg-gradient-to-br from-[#C79D6D]/10 via-transparent to-[#d4a574]/5">
                <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#08243A]/50 via-transparent to-transparent" />
                <AboutModel3D />

                <motion.div
                  className="absolute left-4 top-4 z-10 rounded-full border border-white/20 bg-[#08243A]/80 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Est. 2016
                </motion.div>

                <motion.div
                  className="absolute bottom-4 right-4 z-10 rounded-2xl border border-[#C79D6D]/30 bg-[#08243A]/85 px-4 py-3 backdrop-blur-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-2xl font-bold bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
                    50+
                  </p>
                  <p className="text-xs text-gray-400">Projects delivered</p>
                </motion.div>
              </div>

              {/* Stats strip — desktop inline under image area on lg, hidden on mobile (shown below) */}
              <div className="mt-5 hidden gap-3 lg:grid lg:grid-cols-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-lg font-bold text-[#C79D6D] sm:text-xl">
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-gray-500 sm:text-xs">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Content column */}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
              {/* Mobile pillar tabs */}
              <div className="mb-5 lg:hidden">
                <div
                  className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {pillars.map((pillar, index) => {
                    const isActive = index === activeIndex;
                    const Icon = pillar.icon;
                    return (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => goTo(index)}
                        className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 transition-all duration-300 ${
                          isActive
                            ? "border-[#C79D6D]/40 bg-[#C79D6D]/15 text-white"
                            : "border-white/10 bg-white/[0.04] text-gray-400"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          {pillar.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop pillar tabs */}
              <div className="mb-8 hidden gap-2 lg:flex">
                {pillars.map((pillar, index) => {
                  const isActive = index === activeIndex;
                  const Icon = pillar.icon;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        isActive
                          ? "border-[#C79D6D]/40 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/15 text-white shadow-md shadow-[#C79D6D]/10"
                          : "border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {pillar.label}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: isMobile ? 10 : 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: isMobile ? -8 : -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/10">
                      <ActiveIcon className="h-7 w-7 text-[#C79D6D]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white sm:text-3xl">
                      {active.title}
                    </h3>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-gray-300 sm:text-base sm:leading-relaxed">
                    {active.text}
                  </p>

                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574]" />
                </motion.div>
              </AnimatePresence>

              {/* Progress dots */}
              <div className="mt-8 flex gap-2">
                {pillars.map((pillar, i) => (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"
                        : "w-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                    aria-label={`View ${pillar.title}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-[#C79D6D]/20 sm:bottom-4 sm:left-4 sm:h-8 sm:w-8" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#C79D6D]/20 sm:bottom-4 sm:right-4 sm:h-8 sm:w-8" />
        </motion.div>

        {/* Mobile stats */}
        <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              <p className="text-xl font-bold text-[#C79D6D]">{stat.value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-500 sm:text-xs">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Core values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#C79D6D]">
            What drives us
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-5 backdrop-blur-sm transition-colors hover:border-[#C79D6D]/25 sm:p-6"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#C79D6D]/15 text-[#C79D6D] transition-colors group-hover:bg-[#C79D6D]/25">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="mb-2 font-bold text-white">{value.title}</h4>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {value.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
