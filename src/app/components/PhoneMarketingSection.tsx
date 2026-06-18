"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconAd,
  IconBrandInstagram,
  IconChartBar,
  IconRocket,
  IconTarget,
  IconVideo,
} from "@tabler/icons-react";
import { PhoneCallModal } from "./PhoneCallModal";
import { PhoneModel3D } from "./PhoneModel3D";

const marketingFeatures = [
  {
    id: "brand",
    icon: IconTarget,
    label: "Brand Strategy",
    desc: "Clear positioning and identity systems that make your brand unforgettable.",
  },
  {
    id: "ads",
    icon: IconAd,
    label: "Digital Ads",
    desc: "Performance campaigns engineered for reach, clicks, and measurable ROI.",
  },
  {
    id: "analytics",
    icon: IconChartBar,
    label: "Analytics",
    desc: "Real-time insights that turn data into smarter marketing decisions.",
  },
  {
    id: "social",
    icon: IconBrandInstagram,
    label: "Social Media",
    desc: "Scroll-stopping content and community strategies that build loyalty.",
  },
  {
    id: "content",
    icon: IconVideo,
    label: "Media Production",
    desc: "Premium photo, video, and motion assets crafted for every platform.",
  },
  {
    id: "growth",
    icon: IconRocket,
    label: "Growth Marketing",
    desc: "Full-funnel strategies designed to scale your business sustainably.",
  },
];

const NOTIFICATION_INTERVAL_MS = 6000;

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
        muted
          ? "border-white/25 bg-white/55"
          : "border-white/50 bg-white/[0.78]"
      }`}
    >
      <div className="mb-1.5 flex items-center gap-2">
        <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] bg-[#34C759] shadow-sm">
          <Icon className="h-3.5 w-3.5 text-white" stroke={2.2} />
        </div>
        <span className="min-w-0 flex-1 truncate text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500">
          Marketing
        </span>
        <span className="shrink-0 text-[11px] font-medium text-gray-400">
          now
        </span>
      </div>
      <p
        className={`text-[14px] leading-snug sm:text-[15px] ${
          muted ? "text-gray-600" : "text-gray-900"
        }`}
      >
        <span className="font-semibold">{feature.label}</span>
        <span className="font-normal"> — {feature.desc}</span>
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
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 32,
                mass: 1,
              }}
            >
              <IOSNotification feature={feature} muted={!isActive} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function PhoneStage() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="phone-orbit-ring h-[88%] w-[62%] rounded-[2.5rem] border border-[#C79D6D]/20" />
      <div className="phone-orbit-ring phone-orbit-ring--reverse absolute h-[96%] w-[70%] rounded-[2.75rem] border border-white/10" />
      <div className="absolute bottom-[6%] h-8 w-[45%] rounded-full bg-cyan-500/25 blur-xl" />
    </div>
  );
}

export default function PhoneMarketingSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % marketingFeatures.length);
    }, NOTIFICATION_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="marketing-experience"
      className="relative overflow-x-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08243A] via-[#061a2c] to-[#08243A]" />
        <div className="phone-marketing-grid absolute inset-0 opacity-25" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79D6D]/8 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-12 text-center sm:mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C79D6D]/30 bg-[#C79D6D]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C79D6D]" />
            Digital Marketing Hub
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Marketing Power{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              In Your Hands
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
            Everything your brand needs to grow — strategy, content, ads, and
            analytics in one powerful experience.
          </p>
        </motion.div>

        {/* Phone + iOS notifications */}
        <div
          className="relative mx-auto w-full max-w-[380px] overflow-visible sm:max-w-[420px] lg:max-w-[480px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Notifications float above the phone screen */}
          <div className="relative z-40 mb-[-24px] px-1 sm:mb-[-28px] sm:px-2">
            <NotificationStack activeIndex={activeIndex} />
          </div>

          <div className="relative mx-auto h-[480px] w-full overflow-visible pt-4 pb-10 sm:h-[540px] sm:pt-5 sm:pb-12 lg:h-[600px] xl:h-[640px]">
            <PhoneStage />
            <PhoneModel3D
              className="relative z-10 h-full w-full"
              onPhoneClick={() => setIsCallModalOpen(true)}
            />
          </div>
          <p className="mt-2 text-center text-xs text-gray-500">
            Tap the phone to call us
          </p>
        </div>

        <PhoneCallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
        />

        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {marketingFeatures.map((feature, index) => (
            <button
              key={feature.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${feature.label}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-[#C79D6D]"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
