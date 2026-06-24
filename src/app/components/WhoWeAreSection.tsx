"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconTarget,
  IconEye,
  IconBulb,
  IconAward,
  IconRocket,
  IconHeartHandshake,
  IconTrendingUp,
  IconArrowRight,
} from "@tabler/icons-react";
import AboutModel3D from "./AboutModel3D";

const ROTATE_MS = 6000;

const pillars = [
  {
    id: "mission",
    label: "Mission",
    title: "Our Mission",
    icon: IconTarget,
    text: "To lead Ethiopia's digital transformation by delivering creative, practical, and measurable marketing solutions for every business size, from startups to established brands.",
  },
  {
    id: "vision",
    label: "Vision",
    title: "Our Vision",
    icon: IconEye,
    text: "To be the most trusted creative and commercial partner in East Africa, setting the standard for innovation, quality, and results-driven brand experiences.",
  },
  {
    id: "purpose",
    label: "Purpose",
    title: "Our Purpose",
    icon: IconBulb,
    text: "We exist to elevate Ethiopian brands with strategy, creativity, and heart. Whether you're launching a new brand or refreshing your digital presence, we design solutions that align with your goals and exceed expectations.",
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
    abbr: "EXC",
    text: "Every deliverable meets the highest standard of craft, detail, and care, from concept to final delivery.",
    href: "#services",
    gradient: "from-[#C79D6D] via-[#b8894f] to-[#8b6914]",
    accent: "#C79D6D",
  },
  {
    icon: IconRocket,
    title: "Innovation",
    abbr: "INN",
    text: "We don't follow trends. We create bold experiences, fresh ideas, and digital solutions that stand out.",
    href: "#latest-works",
    gradient: "from-[#38bdf8] via-[#0ea5e9] to-[#0369a1]",
    accent: "#0ea5e9",
  },
  {
    icon: IconTrendingUp,
    title: "Results",
    abbr: "RES",
    text: "Strategy backed by data and creativity driven by measurable outcomes that grow your brand and revenue.",
    href: "#testimonials",
    gradient: "from-[#34d399] via-[#10b981] to-[#047857]",
    accent: "#10b981",
  },
  {
    icon: IconHeartHandshake,
    title: "Partnership",
    abbr: "PTR",
    text: "We grow alongside our clients as a true extension of their team, committed for the long haul.",
    href: "#contact",
    gradient: "from-[#a78bfa] via-[#8b5cf6] to-[#6d28d9]",
    accent: "#8b5cf6",
  },
] as const;

function ValueFanCard({
  value,
  index,
  total,
  focusedIndex,
  onFocus,
  onBlur,
}: {
  value: (typeof values)[number];
  index: number;
  total: number;
  focusedIndex: number | null;
  onFocus: (index: number) => void;
  onBlur: () => void;
}) {
  const Icon = value.icon;
  const isFocused = focusedIndex === index;
  const isAnyFocused = focusedIndex !== null;
  const center = (total - 1) / 2;
  const offset = index - center;
  const baseRotate = offset * 5.5;
  const baseX = offset * 52;
  const stackZ = 10 + index;

  return (
    <motion.a
      href={value.href}
      className="group relative block w-[11.5rem] shrink-0 cursor-pointer sm:w-[12.5rem] lg:w-[13.5rem]"
      style={{
        zIndex: isFocused ? 40 : stackZ,
        marginLeft: index === 0 ? 0 : "-3.25rem",
      }}
      initial={{ opacity: 0, y: 40, rotate: baseRotate }}
      whileInView={{ opacity: 1, y: 0, rotate: baseRotate }}
      viewport={{ once: true, margin: "-40px" }}
      animate={{
        opacity: 1,
        x: isFocused ? baseX : baseX * 0.85,
        y: isFocused ? -44 : isAnyFocused ? 8 : 0,
        rotate: isFocused ? 0 : baseRotate,
        scale: isFocused ? 1.2 : isAnyFocused ? 0.92 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 26,
        delay: index * 0.08,
      }}
      onMouseEnter={() => onFocus(index)}
      onMouseLeave={onBlur}
      onFocus={() => onFocus(index)}
      onBlur={onBlur}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition-shadow duration-300 ${
          isFocused
            ? "border-[#C79D6D]/40 shadow-[0_36px_80px_rgba(0,0,0,0.55)] ring-1 ring-[#C79D6D]/25"
            : ""
        }`}
      >
        {/* Colored top — fan card header */}
        <div
          className={`relative h-36 bg-gradient-to-br ${value.gradient} px-4 pb-4 pt-3 sm:h-40`}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/85">
            Addis Reality
          </p>
          <p className="mt-0.5 text-xs font-bold text-white">{value.title}</p>
          <Icon
            className="pointer-events-none absolute bottom-2 right-2 h-20 w-20 text-white/20 sm:h-24 sm:w-24"
            stroke={1.25}
          />
        </div>

        {/* Dark glass bottom — consistent with site UI */}
        <div className="flex min-h-[9.5rem] flex-col justify-between border-t border-white/10 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] px-4 py-4 backdrop-blur-md">
          <p className="line-clamp-4 text-[11px] leading-relaxed text-gray-400 sm:text-xs">
            {value.text}
          </p>
          <div className="mt-3 flex items-end justify-between">
            <span
              className="bg-gradient-to-r bg-clip-text text-2xl font-black tracking-tight text-transparent sm:text-3xl"
              style={{
                backgroundImage: `linear-gradient(to right, ${value.accent}, #e8c9a8)`,
              }}
            >
              {value.abbr}
            </span>
            <IconArrowRight
              className={`h-4 w-4 text-[#C79D6D] transition-all duration-300 ${
                isFocused ? "translate-x-0.5 opacity-100" : "opacity-50"
              }`}
            />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function ValueMobileCard({
  value,
  index,
}: {
  value: (typeof values)[number];
  index: number;
}) {
  const Icon = value.icon;

  return (
    <motion.a
      href={value.href}
      className="group flex overflow-hidden rounded-2xl border border-white/15 shadow-lg shadow-black/20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.03 }}
    >
      <div
        className={`flex w-24 shrink-0 flex-col items-center justify-center bg-gradient-to-br ${value.gradient} px-3 py-5 sm:w-28`}
      >
        <Icon className="mb-2 h-8 w-8 text-white/90" stroke={1.5} />
        <span className="text-center text-lg font-black text-white/95">
          {value.abbr}
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between border-l border-white/10 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] p-4 backdrop-blur-md">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C79D6D]/70">
            Addis Reality
          </p>
          <h4 className="mt-1 font-bold text-white">{value.title}</h4>
          <p className="mt-2 text-xs leading-relaxed text-gray-400">
            {value.text}
          </p>
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#C79D6D]">
          Learn more
          <IconArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.a>
  );
}

function WhatDrivesUsSection() {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mb-10 text-center sm:mb-12">
        <motion.span
          className="mb-5 inline-block rounded-full border border-[#C79D6D]/30 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#C79D6D] backdrop-blur-sm sm:px-6 sm:py-3 sm:text-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What drives us
        </motion.span>
        <h3 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            The principles behind{" "}
          </span>
          <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
            every project
          </span>
        </h3>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
          Hover a card to bring it forward: excellence, innovation, results, and
          partnership at the core of everything we build.
        </p>
      </div>

      {/* Desktop — overlapping 3D fan stack */}
      <div
        className="relative mx-auto hidden min-h-[22rem] max-w-5xl items-center justify-center py-6 lg:flex"
        style={{ perspective: "1400px" }}
      >
        <div
          className="flex items-end justify-center"
          style={{ transform: "rotateX(10deg) rotateZ(-1deg)" }}
        >
          {values.map((value, i) => (
            <ValueFanCard
              key={value.title}
              value={value}
              index={i}
              total={values.length}
              focusedIndex={focusedIndex}
              onFocus={setFocusedIndex}
              onBlur={() => setFocusedIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* Mobile / tablet — stacked cards */}
      <div className="flex flex-col gap-4 lg:hidden">
        {values.map((value, i) => (
          <ValueMobileCard key={value.title} value={value} index={i} />
        ))}
      </div>
    </motion.div>
  );
}

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
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] px-4 py-16 sm:px-6 sm:py-32 lg:px-8"
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
            and exceptional execution, online and offline.
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

        <WhatDrivesUsSection />
      </div>
    </section>
  );
};

export default WhoWeAreSection;
