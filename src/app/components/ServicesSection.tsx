"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconPhone,
  IconCopy,
  IconBrandWhatsapp,
  IconMail,
  IconCheck,
  IconX,
  IconArrowRight,
} from "@tabler/icons-react";
import { siteConfig } from "@/lib/seo";

const ROTATE_MS = 5000;

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
  buttonText: string;
};

const services: Service[] = [
  {
    id: "printing",
    title: "Advertising & Printing",
    description:
      "From banners to merchandise, we design and print materials that capture attention and strengthen your brand presence.",
    icon: IconPrinter,
    features: [
      "Banner & Sticker Design",
      "Vehicle Branding",
      "Office Branding",
      "Merchandise & Promotional Items",
    ],
    buttonText: "Get a Quote",
  },
  {
    id: "digital",
    title: "Digital Marketing",
    description:
      "Connect with your audience through data-driven campaigns that deliver measurable growth and lasting engagement.",
    icon: IconChartLine,
    features: [
      "Social Media Management",
      "Paid Advertising",
      "SEO Strategy",
      "Influencer Marketing",
    ],
    buttonText: "Get a Quote",
  },
  {
    id: "branding",
    title: "Branding & Design",
    description:
      "Distinct brand identities with compelling logos, clear strategy, and visual systems that set you apart.",
    icon: IconPalette,
    features: [
      "Logo Design",
      "Brand Identity & Strategy",
      "Visual Strategy",
      "Creative Content",
    ],
    buttonText: "Start Your Brand Journey",
  },
  {
    id: "media",
    title: "Media Production",
    description:
      "Bring your story to life through professional visuals and video content that inspires action.",
    icon: IconVideo,
    features: [
      "Videography & Photography",
      "Promotional Content",
      "Video Editing",
      "Post-Production",
    ],
    buttonText: "Work with Our Media Team",
  },
  {
    id: "web",
    title: "Web Development",
    description:
      "Modern, responsive, and SEO-friendly websites engineered to perform and convert.",
    icon: IconWorld,
    features: [
      "Website Design & Development",
      "Maintenance & Updates",
      "SEO Optimization",
    ],
    buttonText: "Build Your Website",
  },
  {
    id: "events",
    title: "Event Planning",
    description:
      "Memorable brand experiences — from corporate gatherings to product launches and exhibitions.",
    icon: IconCalendarEvent,
    features: [
      "Corporate Events",
      "Conferences",
      "Product Launches",
      "Exhibitions",
    ],
    buttonText: "Plan Your Event",
  },
];

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [portalReady, setPortalReady] = useState(false);

  const companyPhone = siteConfig.contact.phoneDisplay;
  const companyEmail = siteConfig.contact.email;
  const active = services[activeIndex];

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + services.length) % services.length);
  }, []);

  useEffect(() => {
    setPortalReady(true);
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
      setActiveIndex((i) => (i + 1) % services.length);
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [isPaused, isMobile]);

  useEffect(() => {
    if (!isModalOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isModalOpen]);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(companyPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  const handleWhatsAppClick = () => {
    const message =
      "Hello! I'm interested in your services. Could you please provide more information?";
    window.open(
      `https://wa.me/${siteConfig.contact.phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const contactModal =
    portalReady &&
    createPortal(
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden rounded-3xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Get in Touch
                  </h3>
                  <p className="text-xs text-gray-400">
                    Contact us for more information
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-white transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D]"
                  aria-label="Close"
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4 p-6">
                <div className="rounded-xl border border-white/15 bg-white/[0.05] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C79D6D]/20">
                        <IconPhone className="h-5 w-5 text-[#C79D6D]" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">Call Us</p>
                        <p className="font-mono text-lg text-[#C79D6D]">
                          {companyPhone}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleCopyPhone}
                      className="rounded-lg bg-[#C79D6D]/20 p-2 transition-colors hover:bg-[#C79D6D]/30"
                      aria-label="Copy phone number"
                    >
                      <IconCopy className="h-4 w-4 text-[#C79D6D]" />
                    </button>
                  </div>
                  {copied && (
                    <p className="mt-2 flex items-center text-sm text-green-400">
                      <IconCheck className="mr-1 h-4 w-4" />
                      Phone number copied!
                    </p>
                  )}
                </div>

                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C79D6D] to-[#d4a574] py-3 font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <IconPhone className="h-5 w-5" />
                  Call Now
                </a>

                <button
                  type="button"
                  onClick={handleWhatsAppClick}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <IconBrandWhatsapp className="h-5 w-5" />
                  Chat on WhatsApp
                </button>

                <div className="rounded-xl border border-white/15 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C79D6D]/20">
                      <IconMail className="h-5 w-5 text-[#C79D6D]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Email Us</p>
                      <p className="text-sm text-[#C79D6D]">{companyEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

  const ActiveIcon = active.icon;

  return (
    <section
      id="services"
      className="relative overflow-hidden scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#C79D6D]/5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center sm:mb-16"
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
            Services &amp; Offerings
          </motion.span>

          <motion.h2
            className="mb-6 text-3xl font-bold sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              What We{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Offer
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto max-w-3xl text-base leading-relaxed text-gray-300 sm:text-lg lg:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Explore our full range of creative and digital solutions — designed
            to grow your business and help your brand stand out.
          </motion.p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.06] via-white/[0.08] to-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-md lg:rounded-3xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
        >
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent" />

          <div className="flex flex-col lg:grid lg:grid-cols-[minmax(280px,360px)_1fr]">
            {/* Desktop — vertical service list (left column) */}
            <div className="hidden border-white/10 p-6 sm:p-8 lg:block lg:border-r">
              <div className="mb-6 h-1 w-10 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574]" />
              <h3 className="mb-6 text-lg font-bold text-white sm:text-xl">
                Our Services
              </h3>

              <div className="space-y-1">
                {services.map((service, index) => {
                  const isActive = index === activeIndex;
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3.5 text-left transition-all duration-400 ${
                        isActive
                          ? "border border-[#C79D6D]/30 bg-white/[0.08] shadow-lg shadow-[#C79D6D]/10"
                          : "border border-transparent opacity-45 hover:opacity-70"
                      }`}
                    >
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          isActive
                            ? "bg-gradient-to-br from-[#C79D6D] to-[#d4a574] text-white shadow-md shadow-[#C79D6D]/25"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-sm font-semibold sm:text-base ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex gap-2">
                {services.map((service, i) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-8 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"
                        : "w-1.5 bg-white/20 hover:bg-white/35"
                    }`}
                    aria-label={`View ${service.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Mobile — horizontal service picker */}
            <div className="border-b border-white/10 p-4 sm:p-5 lg:hidden">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Browse services
              </p>
              <div
                className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-hide snap-x snap-mandatory"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {services.map((service, index) => {
                  const isActive = index === activeIndex;
                  const Icon = service.icon;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => goTo(index)}
                      className={`flex w-[108px] flex-shrink-0 snap-center flex-col items-center gap-2 rounded-2xl border px-3 py-3 transition-all duration-300 ${
                        isActive
                          ? "border-[#C79D6D]/40 bg-white/[0.1] shadow-md shadow-[#C79D6D]/15"
                          : "border-white/10 bg-white/[0.03] opacity-70"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                          isActive
                            ? "bg-gradient-to-br from-[#C79D6D] to-[#d4a574] text-white"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`line-clamp-2 text-center text-[11px] font-semibold leading-tight ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {service.title}
                      </span>
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex justify-center gap-1.5">
                {services.map((service, i) => (
                  <button
                    key={`m-dot-${service.id}`}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeIndex
                        ? "w-6 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"
                        : "w-1.5 bg-white/25"
                    }`}
                    aria-label={`View ${service.title}`}
                  />
                ))}
              </div>
            </div>

            {/* Featured service */}
            <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{
                    opacity: 0,
                    y: isMobile ? 12 : 0,
                    x: isMobile ? 0 : 20,
                  }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  exit={{
                    opacity: 0,
                    y: isMobile ? -8 : 0,
                    x: isMobile ? 0 : -16,
                  }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Mobile: icon + title inline */}
                  <div className="mb-4 flex items-center gap-4 lg:hidden">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/10">
                      <ActiveIcon className="h-7 w-7 text-[#C79D6D]" />
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-white">
                      {active.title}
                    </h3>
                  </div>

                  {/* Desktop: stacked icon + title */}
                  <div className="mb-6 hidden h-16 w-16 items-center justify-center rounded-2xl border border-[#C79D6D]/30 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/10 lg:flex">
                    <ActiveIcon className="h-8 w-8 text-[#C79D6D]" />
                  </div>
                  <h3 className="mb-4 hidden text-2xl font-bold text-white lg:block sm:text-3xl">
                    {active.title}
                  </h3>

                  <p className="mb-6 max-w-xl text-sm leading-relaxed text-gray-300 sm:mb-8 lg:text-base lg:leading-relaxed">
                    {active.description}
                  </p>

                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D] lg:mb-4">
                    Includes
                  </p>
                  <ul className="mb-6 grid gap-2.5 sm:mb-8 sm:grid-cols-2 sm:gap-3 lg:mb-8 lg:gap-3">
                    {active.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-gray-300 lg:items-center"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C79D6D]/20">
                          <IconCheck className="h-3 w-3 text-[#C79D6D]" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C79D6D]/20 transition-all hover:shadow-[#C79D6D]/35 lg:inline-flex lg:w-auto lg:px-8"
                  >
                    {active.buttonText}
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b border-l border-[#C79D6D]/20 sm:bottom-4 sm:left-4 sm:h-8 sm:w-8" />
          <div className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r border-[#C79D6D]/20 sm:bottom-4 sm:right-4 sm:h-8 sm:w-8" />
        </motion.div>
      </div>

      {contactModal}
    </section>
  );
};

export default ServicesSection;
