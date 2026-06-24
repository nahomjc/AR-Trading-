"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  IconAd,
  IconArrowRight,
  IconBrandInstagram,
  IconChartBar,
  IconChevronDown,
  IconMapPin,
  IconMail,
  IconPhone,
  IconSearch,
  IconSparkles,
  IconTarget,
  IconTrendingUp,
  IconVideo,
} from "@tabler/icons-react";
import HorizontalScrollRow from "../components/HorizontalScrollRow";
import { PhoneCallModal } from "../components/PhoneCallModal";
import { faqs, services, siteConfig } from "@/lib/seo";

const PhoneModel3D = dynamic(
  () => import("../components/PhoneModel3D").then((m) => m.PhoneModel3D),
  { ssr: false, loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-white/5" /> },
);

const { name, contact, serviceAreas } = siteConfig;

const ROTATING_WORDS = [
  "Ranked.",
  "Growing.",
  "Converting.",
  "Scaling.",
  "Dominating.",
] as const;

const stats = [
  { value: "50+", label: "Projects" },
  { value: "10+", label: "Clients" },
  { value: "98%", label: "Satisfaction" },
  { value: "8+", label: "Years" },
] as const;

const capabilities = [
  {
    icon: IconSearch,
    title: "SEO & Google",
    desc: "Technical audits, content strategy, and local search dominance across Ethiopia.",
  },
  {
    icon: IconBrandInstagram,
    title: "Social Media",
    desc: "Instagram, TikTok, Facebook & LinkedIn: content that stops the scroll.",
  },
  {
    icon: IconAd,
    title: "Paid Media",
    desc: "Google & Meta campaigns engineered for reach, clicks, and ROI.",
  },
  {
    icon: IconChartBar,
    title: "Analytics",
    desc: "Dashboards and conversion tracking that turn data into decisions.",
  },
  {
    icon: IconTarget,
    title: "Brand Strategy",
    desc: "Positioning and identity systems that make your brand unforgettable.",
  },
  {
    icon: IconVideo,
    title: "Content Production",
    desc: "Photo, video, and motion assets crafted for every platform.",
  },
] as const;

const marketingFeatures = [
  {
    id: "seo",
    icon: IconSearch,
    label: "SEO Ranking",
    desc: "Climb Google results in Addis Ababa and beyond.",
  },
  {
    id: "social",
    icon: IconBrandInstagram,
    label: "Social Growth",
    desc: "Build loyal audiences across every major platform.",
  },
  {
    id: "ads",
    icon: IconAd,
    label: "Paid Campaigns",
    desc: "Performance ads with measurable return on spend.",
  },
  {
    id: "analytics",
    icon: IconChartBar,
    label: "Live Analytics",
    desc: "Real-time insights into what's working right now.",
  },
] as const;

const portfolioImages = [
  { src: "/img/social-media-post-designs/1.jpg", alt: "Social media campaign design" },
  { src: "/img/social-media-post-designs/2.jpg", alt: "Digital ad creative" },
  { src: "/img/social-media-post-designs/3.jpg", alt: "Multi-platform content series" },
  { src: "/img/social-media-post-designs/4.jpg", alt: "Brand storytelling posts" },
  { src: "/img/social-media-post-designs/5.jpg", alt: "Instagram story collection" },
  { src: "/img/social-media-post-designs/6.jpg", alt: "Social media brand kit" },
] as const;

const steps = [
  { n: "01", title: "Discover", desc: "Audit your brand, competitors, and digital footprint." },
  { n: "02", title: "Design", desc: "Build a channel strategy tailored to Ethiopia's market." },
  { n: "03", title: "Deploy", desc: "Launch across search, social, and paid media." },
  { n: "04", title: "Dominate", desc: "Optimize, scale, and report on measurable growth." },
] as const;

const dmFaqs = faqs
  .filter((f) =>
    /digital|SEO|social media|marketing|Google|website/i.test(
      `${f.question} ${f.answer}`,
    ),
  )
  .slice(0, 6);

const spring = { type: "spring" as const, stiffness: 100, damping: 24 };
const NOTIFICATION_MS = 5500;

function RotatingWord({ active, index }: { active: boolean; index: number }) {
  const longest = ROTATING_WORDS.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className="relative ml-1 inline-flex align-bottom">
      <span className="invisible whitespace-nowrap px-2 py-0.5 sm:px-2.5" aria-hidden>
        {longest}
      </span>
      <span className="absolute inset-0 overflow-hidden rounded-lg border border-[#C79D6D]/25 bg-gradient-to-br from-[#C79D6D]/14 via-white/[0.04] to-[#d4a574]/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
        <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-gradient-to-b from-[#C79D6D] to-[#d4a574]" />
        <span className="relative flex h-full items-center px-2 py-0.5 sm:px-2.5">
          <AnimatePresence mode="wait">
            {active && (
              <motion.span
                key={ROTATING_WORDS[index]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-nowrap bg-gradient-to-r from-[#e8c9a8] via-white to-[#d4a574] bg-clip-text text-transparent"
              >
                {ROTATING_WORDS[index]}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </span>
    </span>
  );
}

function IOSNotification({
  feature,
  muted = false,
}: {
  feature: (typeof marketingFeatures)[number];
  muted?: boolean;
}) {
  const Icon = feature.icon;

  return (
    <div
      className={`rounded-[20px] border px-3.5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150 ${
        muted ? "border-white/25 bg-white/55" : "border-white/50 bg-white/[0.78]"
      }`}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] bg-[#34C759] shadow-sm">
          <Icon className="h-3.5 w-3.5 text-white" stroke={2.2} />
        </div>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500">
          Marketing
        </span>
        <span className="shrink-0 text-[11px] font-medium text-gray-400">now</span>
      </div>
      <p className={`text-[14px] leading-snug sm:text-[15px] ${muted ? "text-gray-600" : "text-gray-900"}`}>
        <span className="font-semibold">{feature.label}</span>
        <span className="font-normal">: {feature.desc}</span>
      </p>
    </div>
  );
}

function NotificationStack({ activeIndex }: { activeIndex: number }) {
  const stackIndices = [activeIndex - 2, activeIndex - 1, activeIndex].filter(
    (i) => i >= 0,
  );

  return (
    <div className="relative h-[148px] w-full sm:h-[156px]">
      <AnimatePresence mode="popLayout">
        {stackIndices.map((featureIndex, stackPos) => {
          const feature = marketingFeatures[featureIndex];
          const isActive = featureIndex === activeIndex;
          const depth = stackIndices.length - 1 - stackPos;

          return (
            <motion.div
              key={feature.id}
              layout
              className="absolute inset-x-0"
              style={{ zIndex: stackPos + 1 }}
              initial={
                isActive
                  ? { opacity: 0, y: 56, scale: 0.9 }
                  : { opacity: 0, y: 20, scale: 0.95 }
              }
              animate={{
                opacity: isActive ? 1 : Math.max(0.35, 0.7 - depth * 0.2),
                y: -depth * 14,
                scale: 1 - depth * 0.045,
              }}
              exit={
                isActive
                  ? { opacity: 0, y: -28, scale: 0.94 }
                  : { opacity: 0, scale: 0.9 }
              }
              transition={{ type: "spring", stiffness: 280, damping: 32, mass: 1 }}
            >
              <IOSNotification feature={feature} muted={!isActive} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

export default function DigitalMarketingPageContent() {
  const reducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [activeFaq, setActiveFaq] = useState(-1);
  const [notifIndex, setNotifIndex] = useState(0);
  const [notifPaused, setNotifPaused] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, reducedMotion ? 0 : 60]);
  const heroOpacity = useTransform(scrollY, [0, 350], [1, 0.25]);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (notifPaused || reducedMotion) return;
    const timer = window.setInterval(() => {
      setNotifIndex((i) => (i + 1) % marketingFeatures.length);
    }, NOTIFICATION_MS);
    return () => window.clearInterval(timer);
  }, [notifPaused, reducedMotion]);

  const openCall = useCallback(() => setCallOpen(true), []);

  return (
    <div className="relative overflow-hidden">
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-16 lg:px-8">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="phone-marketing-grid absolute inset-0 opacity-20" />
          <div className="absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-[#C79D6D]/10 blur-[140px]" />
          <div className="absolute -right-32 bottom-1/4 h-[480px] w-[480px] rounded-full bg-cyan-600/8 blur-[120px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.95fr] lg:gap-12 xl:gap-16"
        >
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C79D6D]/25 bg-[#C79D6D]/10 px-4 py-2 text-sm text-[#C79D6D]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C79D6D]" />
              <IconSparkles className="h-4 w-4" />
              <span>Nationwide · Kazanchis HQ</span>
            </motion.div>

            <motion.h1
              id="local-seo-heading"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.15 }}
              className="font-outfit text-[clamp(2.35rem,5.5vw,4rem)] font-bold leading-[1.06] tracking-tight"
            >
              <span className="block text-white">Ethiopia&apos;s #1</span>
              <span className="mt-1 block bg-gradient-to-r from-[#C79D6D] via-[#e8c9a8] to-[#d4a574] bg-clip-text text-transparent">
                Digital Marketing
              </span>
              <span className="mt-2 flex flex-wrap items-baseline text-white/90">
                Agency, brands
                {reducedMotion ? (
                  <span className="ml-1 text-[#C79D6D]">{ROTATING_WORDS[0]}</span>
                ) : (
                  <RotatingWord active index={wordIndex} />
                )}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.25 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              {name} (AR Solutions PLC) is Addis Ababa&apos;s leading full-service
              agency for{" "}
              <span className="text-gray-300">digital marketing</span>, branding,
              web development, advertising &amp; printing, and media production.
              From Kazanchis we help Ethiopian businesses rank on Google, grow on
              social media, and build brands that convert.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.35 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C79D6D]/25 transition-transform hover:scale-[1.03]"
              >
                <IconPhone className="h-4 w-4" />
                {contact.phoneDisplay}
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D]"
              >
                Start a Project
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-[#C79D6D] sm:text-2xl">{s.value}</p>
                  <p className="text-xs uppercase tracking-wider text-gray-500">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D phone — same experience as homepage marketing section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...spring, delay: 0.2 }}
            className="order-1 mx-auto w-full max-w-[380px] lg:order-2 lg:max-w-none"
            onMouseEnter={() => setNotifPaused(true)}
            onMouseLeave={() => setNotifPaused(false)}
          >
            <div className="relative z-40 mb-[-20px] px-1 sm:mb-[-24px] sm:px-2">
              <NotificationStack activeIndex={notifIndex} />
            </div>

            <div className="relative mx-auto h-[440px] w-full overflow-visible pb-12 pt-2 sm:h-[500px] sm:pb-14 lg:h-[560px] xl:h-[600px]">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="phone-orbit-ring h-[88%] w-[62%] rounded-[2.5rem] border border-[#C79D6D]/20" />
                <div className="phone-orbit-ring phone-orbit-ring--reverse absolute h-[96%] w-[70%] rounded-[2.75rem] border border-white/10" />
                <div className="absolute bottom-[6%] h-8 w-[45%] rounded-full bg-cyan-500/20 blur-xl" />
              </div>
              <PhoneModel3D
                className="relative z-10 h-full w-full"
                onPhoneClick={openCall}
              />
            </div>

            <p className="mt-1 text-center text-xs text-gray-500">Tap the phone to call us</p>

            <div className="mt-4 flex items-center justify-center gap-2">
              {marketingFeatures.map((feature, index) => (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => setNotifIndex(index)}
                  aria-label={`Show ${feature.label}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    notifIndex === index ? "w-8 bg-[#C79D6D]" : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600"
        >
          <IconChevronDown className="h-5 w-5 animate-bounce" />
        </motion.div>
      </section>

      <PhoneCallModal isOpen={callOpen} onClose={() => setCallOpen(false)} />

      {/* ═══════════ PORTFOLIO MARQUEE ═══════════ */}
      <section id="work" className="relative border-t border-white/5 py-4 scroll-mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C79D6D]">
                Recent work
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                Campaigns that{" "}
                <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
                  perform
                </span>
              </h2>
            </div>
            <Link
              href="/#works"
              className="inline-flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-[#C79D6D]"
            >
              View all work
              <IconArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <HorizontalScrollRow ariaLabel="Digital marketing portfolio" fullBleed marqueeDuration={36}>
          {portfolioImages.map((img) => (
            <div
              key={img.src}
              className="carousel-card group relative h-[220px] w-[180px] shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:h-[260px] sm:w-[210px]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="210px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/80 via-transparent to-transparent opacity-60" />
            </div>
          ))}
        </HorizontalScrollRow>
      </section>

      {/* ═══════════ CAPABILITIES ═══════════ */}
      <section id="capabilities" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8 scroll-mt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-2xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C79D6D]">
              What we deploy
            </p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Full-stack growth{" "}
              <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
                systems
              </span>
            </h2>
            <p className="mt-4 text-gray-400">
              Every channel your brand needs: strategy, content, ads, and analytics
              in one integrated engine.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.article
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...spring, delay: i * 0.04 }}
                  whileHover={reducedMotion ? undefined : { y: -3 }}
                  className="dm-bento-card group rounded-2xl border border-white/10 p-6 sm:p-7"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C79D6D]/25 bg-[#C79D6D]/10">
                    <Icon className="h-5 w-5 text-[#C79D6D]" stroke={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-400">{cap.desc}</p>
                  <div className="mt-4 h-px w-0 bg-gradient-to-r from-[#C79D6D] to-transparent transition-all duration-300 group-hover:w-10" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section id="process" className="relative border-y border-white/5 px-4 py-20 sm:px-6 lg:px-8 scroll-mt-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-14 text-center text-2xl font-bold text-white sm:text-3xl">
            How we <span className="text-[#C79D6D]">scale</span> your brand
          </h2>
          <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-transparent via-[#C79D6D]/35 to-transparent lg:block" />
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative text-center lg:text-left"
              >
                <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#C79D6D]/40 bg-[#08243A] text-xs font-bold text-[#C79D6D] shadow-[0_0_24px_rgba(199,157,109,0.12)]">
                  {step.n}
                </span>
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ETHIOPIA + SEO + CONTACT ═══════════ */}
      <section id="ethiopia" className="relative px-4 py-24 sm:px-6 sm:py-32 lg:px-8 scroll-mt-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#C79D6D]/30 bg-[#C79D6D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D]">
              Serving All of Ethiopia
            </span>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">
              Built in Addis,{" "}
              <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
                scaling nationwide
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-400 sm:text-lg">
              Headquartered in Kazanchis, we deliver{" "}
              <Link href="/services/digital-marketing" className="text-[#C79D6D] hover:underline">
                digital marketing
              </Link>
              ,{" "}
              <Link href="/services/branding-design" className="text-[#C79D6D] hover:underline">
                branding
              </Link>
              ,{" "}
              <Link href="/services/web-development" className="text-[#C79D6D] hover:underline">
                web development
              </Link>
              ,{" "}
              <Link href="/services/advertising-printing" className="text-[#C79D6D] hover:underline">
                advertising &amp; printing
              </Link>
              , and{" "}
              <Link href="/services/media-production" className="text-[#C79D6D] hover:underline">
                media production
              </Link>{" "}
              with remote and on-site support across Ethiopia.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="dm-bento-card rounded-3xl border border-white/10 p-8 lg:col-span-3"
            >
              <h3 className="mb-2 text-xl font-semibold text-white">Cities We Serve</h3>
              <p className="mb-6 text-sm text-gray-400">
                Local expertise with national reach, from Addis Ababa to every major
                market in Ethiopia.
              </p>
              <ul className="flex flex-wrap gap-2">
                {serviceAreas.map((city) => (
                  <li
                    key={city}
                    className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                      city === "Addis Ababa"
                        ? "border-[#C79D6D]/50 bg-[#C79D6D]/15 text-[#C79D6D]"
                        : "border-white/10 bg-white/[0.03] text-gray-300"
                    }`}
                  >
                    {city}
                  </li>
                ))}
              </ul>

              <nav
                aria-label="Services in Ethiopia"
                className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-8"
              >
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-gray-400 transition-colors hover:border-[#C79D6D]/40 hover:text-[#C79D6D] sm:text-sm"
                  >
                    {service.title} Ethiopia
                  </Link>
                ))}
              </nav>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="dm-bento-card flex flex-col rounded-3xl border border-[#C79D6D]/20 p-8 lg:col-span-2"
            >
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D]">
                Get in touch
              </p>
              <h3 className="mb-8 text-2xl font-bold text-white">Contact {name}</h3>

              <div className="flex flex-1 flex-col gap-3">
                <div className="flex gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <IconMapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#C79D6D]" />
                  <p className="text-sm leading-relaxed text-gray-300">{contact.fullAddress}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-[#C79D6D]/30 hover:bg-[#C79D6D]/5"
                >
                  <IconPhone className="h-5 w-5 shrink-0 text-[#C79D6D]" />
                  <span className="font-medium text-white">{contact.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors hover:border-[#C79D6D]/30 hover:bg-[#C79D6D]/5"
                >
                  <IconMail className="h-5 w-5 shrink-0 text-[#C79D6D]" />
                  <span className="text-sm text-white">{contact.email}</span>
                </a>
              </div>

              <Link
                href="/#contact"
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#C79D6D]/20 transition-transform hover:scale-[1.02]"
              >
                Send a Message
                <IconArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section
        id="faq"
        aria-labelledby="dm-faq-heading"
        className="border-t border-white/5 px-4 py-24 sm:px-6 sm:py-32 lg:px-8 scroll-mt-8"
      >
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C79D6D]">
              FAQ
            </p>
            <h2 id="dm-faq-heading" className="text-3xl font-bold text-white sm:text-4xl">
              Digital marketing{" "}
              <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
                answered
              </span>
            </h2>
            <p className="mt-4 text-gray-400">
              Common questions about SEO, social media, and growth in Ethiopia.
            </p>
          </div>

          <div className="space-y-2">
            {dmFaqs.map((faq, i) => {
              const open = activeFaq === i;
              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border transition-colors ${
                    open
                      ? "border-[#C79D6D]/30 bg-[#C79D6D]/[0.04]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(open ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-white transition-colors hover:text-[#C79D6D]"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`shrink-0 text-xl leading-none text-[#C79D6D] transition-transform ${open ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="faq-answer border-t border-white/5 px-6 pb-5 pt-4 text-sm leading-relaxed text-gray-400">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA ═══════════ */}
      <section className="px-4 pb-28 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-[#C79D6D]/25 p-12 text-center sm:p-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#C79D6D]/20 via-[#061a2c] to-[#08243A]" />
          <div className="pointer-events-none absolute inset-0 dm-hero-grid opacity-30" />
          <div className="relative">
            <IconTrendingUp className="mx-auto mb-5 h-10 w-10 text-[#C79D6D]" />
            <h2 className="text-2xl font-bold text-white sm:text-4xl">
              Ready to grow in Ethiopia?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-gray-400">
              Let {name} build your SEO, social, and paid media engine, starting
              with a free strategy call.
            </p>
            <a
              href={`tel:${contact.phone}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-[#C79D6D]/25 transition-transform hover:scale-[1.03]"
            >
              <IconPhone className="h-4 w-4" />
              Book Free Consultation
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
