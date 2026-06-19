"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { IconStar } from "@tabler/icons-react";

const ROTATE_MS = 5000;

const testimonials = [
  {
    id: "melkamu",
    name: "Mr. Melkamu Mekonnen",
    role: "Group CEO at Haile Hospitality Group",
    content:
      "Addis Reality consistently delivers exceptional results. Their professional approach and attention to detail exceed expectations.",
    rating: 5,
    date: "Mar 2024",
    initials: "MM",
  },
  {
    id: "bikila",
    name: "Mr. Bikila Hurisa",
    role: "Public & International Relations Director at Prosperity Party",
    content:
      "Exemplary quality services in rebranding solutions. Outstanding reputation for excellence and reliability in the industry.",
    rating: 5,
    date: "Jan 2024",
    initials: "BH",
  },
  {
    id: "fisseha",
    name: "Mr. Fisseha Asress",
    role: "Senior Consultant & Advisor at Ethiopian Airlines",
    content:
      "Confidently recommend Addis Reality for brand strategy, website development, digital marketing, and tech services. Exceptional project management with professionalism and expertise.",
    rating: 5,
    date: "Nov 2023",
    initials: "FA",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);

  const active = testimonials[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("highlightTestimonials");
    if (stored) {
      setIsHighlighted(true);
      const t = setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightTestimonials");
      }, 3000);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const onHighlight = () => {
      setIsHighlighted(true);
      setTimeout(() => setIsHighlighted(false), 3000);
    };
    window.addEventListener("highlightTestimonials", onHighlight);
    return () =>
      window.removeEventListener("highlightTestimonials", onHighlight);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-br from-[#08243A]/50 via-transparent to-[#08243A]/50 px-4 py-20 sm:px-6 sm:py-32 lg:px-8"
    >
      {/* Background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 h-96 w-96 rounded-full bg-[#C79D6D]/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          className={`mb-14 text-center transition-all duration-500 sm:mb-16 ${
            isHighlighted
              ? "rounded-3xl border border-[#C79D6D]/50 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 p-8 shadow-lg shadow-[#C79D6D]/20"
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
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Testimonials
          </motion.span>

          <motion.h2
            className="mb-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              What Our{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Clients Say
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Don&apos;t just take our word for it. Here&apos;s what industry
            leaders say about our work.
          </motion.p>
        </motion.div>

        {/* Main card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.08] to-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gold top accent */}
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent" />

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -left-20 top-0 h-full w-56 rounded-r-full bg-[#C79D6D]/[0.04]" />

          <div className="grid min-h-[460px] md:grid-cols-[minmax(280px,340px)_1fr]">
            {/* Left — reviewer rail */}
            <div className="relative border-b border-white/10 p-8 md:border-b-0 md:border-r md:py-10 md:pl-10 md:pr-6">
              <div className="mb-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574]" />
              <h3 className="mb-8 text-xl font-bold tracking-tight text-white sm:text-2xl">
                Client Reviews
              </h3>

              <svg
                className="pointer-events-none absolute bottom-8 left-[3.25rem] top-36 hidden w-16 md:block"
                viewBox="0 0 64 400"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M32 0 C 52 80, 12 160, 32 240 C 52 320, 12 360, 32 400"
                  stroke="rgba(199,157,109,0.25)"
                  strokeWidth="1.5"
                  fill="none"
                />
              </svg>

              <div className="relative space-y-1">
                {testimonials.map((item, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`relative flex w-full items-center gap-4 rounded-2xl px-3 py-3.5 text-left transition-all duration-500 ${
                        isActive
                          ? "border border-[#C79D6D]/30 bg-white/[0.08] opacity-100 shadow-lg shadow-[#C79D6D]/10"
                          : "border border-transparent opacity-40 hover:opacity-65"
                      }`}
                    >
                      <div
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-all duration-500 ${
                          isActive
                            ? "bg-gradient-to-br from-[#C79D6D] to-[#d4a574] text-white shadow-md shadow-[#C79D6D]/30"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {item.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-bold transition-colors duration-300 ${
                            isActive ? "text-white" : "text-gray-400"
                          }`}
                        >
                          {item.name}
                        </p>
                        <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                          <span className="flex items-center gap-0.5 text-[#C79D6D]">
                            <IconStar className="h-3 w-3 fill-current" />
                            {item.rating}.0
                          </span>
                          <span className="text-white/20">·</span>
                          <span>{item.date}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-2">
                {testimonials.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"
                        : "w-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                    aria-label={`View testimonial from ${item.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — featured quote */}
            <div className="relative flex flex-col justify-center p-8 md:py-12 md:pl-10 md:pr-12 lg:pl-14 lg:pr-16">
              <span
                className="pointer-events-none absolute left-6 top-8 select-none font-serif text-[7rem] leading-none text-[#C79D6D]/[0.08] md:left-10 md:top-10 md:text-[9rem]"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <p className="font-serif text-xl italic leading-relaxed text-gray-300 sm:text-2xl sm:leading-relaxed lg:text-[1.65rem] lg:leading-[1.75]">
                    <span className="float-left mr-3 mt-1 font-serif text-6xl not-italic leading-[0.85] text-[#C79D6D]/60 sm:text-7xl">
                      {active.content.charAt(0)}
                    </span>
                    {active.content.slice(1)}
                  </p>

                  <div className="mt-10 border-t border-white/10 pt-6">
                    <p className="text-base font-bold text-white">
                      {active.name}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[#C79D6D]">
                      {active.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Corner accents */}
          <div className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t border-[#C79D6D]/25 sm:left-4 sm:top-4 sm:h-8 sm:w-8" />
          <div className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r border-t border-[#C79D6D]/25 sm:right-4 sm:top-4 sm:h-8 sm:w-8" />
          <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-[#C79D6D]/20 sm:bottom-4 sm:left-4 sm:h-8 sm:w-8" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#C79D6D]/20 sm:bottom-4 sm:right-4 sm:h-8 sm:w-8" />
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
