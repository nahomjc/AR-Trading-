"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconCode,
  IconChartLine,
  IconPalette,
  IconVideo,
  IconWorld,
  IconTrendingUp,
  IconBulb,
  IconAward,
  IconGraph,
  IconPresentation,
  IconBriefcase,
  IconGlobe,
  IconDeviceLaptop,
} from "@tabler/icons-react";

// Utility to detect mobile devices
const isMobile = () =>
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Enhanced Hero Section
const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative pt-2 sm:pt-2"
      style={{ backgroundColor: "#08243A" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#08243A]/40 via-[#08243A]/30 to-[#08243A]/20"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Professional Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-5 md:opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(198, 156, 108, 0.3) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Professional Floating Elements */}
          <div className="absolute inset-0 pointer-events-none hidden sm:block">
            <motion.div
              className="absolute top-1/4 left-1/8 w-16 h-16 floating-element rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/6 w-12 h-12 floating-element rounded-full"
              animate={{
                y: [0, 15, 0],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />

            {/* Additional Floating Icons */}
            <motion.div
              className="absolute top-1/6 right-1/4 w-10 h-10 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, -15, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <IconAward className="w-5 h-5 text-[#C69c6c]" />
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Professional Content */}
          <motion.div
            className="text-left space-y-6 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Professional Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-outfit leading-tight hero-headline">
                <span className="block text-[#C79D6D] mb-4">
                  AR Solutions — Digital Innovation for Ethiopian Brands
                </span>
                <span className="block text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium">
                  Ethiopia Meets Modern Marketing — Let&apos;s Transform Your
                  Brand
                </span>
                <span className="block text-[#C79D6D] text-lg sm:text-xl lg:text-2xl font-medium mt-4">
                  With Strategy, Creativity, and Excellence
                </span>
              </h1>
            </motion.div>

            {/* Professional Stats - Compact */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { number: "50+", label: "Projects" },
                { number: "98%", label: "Satisfaction" },
                { number: "10+", label: "Clients" },
                { number: "3+", label: "Years" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-xl stats-card-professional"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-xl font-bold text-[#C79D6D] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[#C79D6D] text-xs font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Visual */}
          <motion.div
            className="flex flex-col items-start justify-center mb-8 lg:mb-0 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="relative w-full max-w-3xl">
              {/* Main Professional Container */}
              <motion.div
                className="relative"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Professional Image Container */}
                <div className="relative">
                  <Image
                    src="/img/hero-image-7.png"
                    alt="Professional Digital Marketing and Web Development Services"
                    width={1200}
                    height={1200}
                    className="w-full h-auto object-contain"
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 600px"
                    priority
                  />
                </div>

                {/* Professional Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 rounded-full blur-none md:blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <motion.div
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-none md:blur-xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.6, 0.3, 0.6],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />

                {/* Professional Floating Icons */}
                <motion.div
                  className="absolute bottom-1/4 right-1/4 w-12 h-12 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <IconTrendingUp className="w-6 h-6 text-[#C69c6c]" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/3 left-1/4 w-10 h-10 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, 12, 0],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                >
                  <IconBulb className="w-5 h-5 text-blue-400" />
                </motion.div>
              </motion.div>

              {/* Professional Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C69c6c]/10 via-transparent to-blue-500/10 blur-none md:blur-3xl -z-10"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
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
