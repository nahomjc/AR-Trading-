"use client";

import React, { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ScrollStars from "./components/ScrollStars";
import CPUAnimation from "./components/CPUAnimation";

import ChatBot from "./components/ChatBot";
import IntroLoader from "./components/IntroLoader";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import {
  IconRocket,
  IconTarget,
  IconCheck,
  IconCode,
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconDeviceMobile,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconBook,
  IconUsers,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconTrendingUp,
  IconBulb,
  IconAward,
  IconGraph,
  IconPresentation,
  IconBriefcase,
  IconGlobe,
  IconDeviceLaptop,
  IconBrandInstagram,
  IconBrandYoutube,
  IconSearch,
  IconBuilding,
  IconCurrencyDollar,
  IconShieldCheck,
  IconClock,
  IconStar,
  IconArrowRight,
} from "@tabler/icons-react";

// Utility to detect mobile devices
const isMobile = () =>
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Lazy load heavy sections
const TeamSection = dynamic(() => import("./TeamSection"), { ssr: false });
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
});

// Navigation Component
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  const navLinks = [
    "Home",
    "Services",
    "About",
    "Team",
    "Testimonials",
    "Contact",
  ];

  return (
    <motion.nav
      className="fixed top-0 w-full z-50 transition-all duration-300 glass backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href="#home" className="focus:outline-none">
              <Image
                src="/img/ars.png"
                alt="AR Solutions Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </a>
          </motion.div>
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                initial={false}
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                className="w-7 h-7 flex flex-col justify-center items-center"
              >
                <span
                  className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-white mb-1 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </motion.div>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Dropdown */}
      <motion.div
        initial={false}
        animate={
          menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="md:hidden overflow-hidden backdrop-blur-2xl shadow-2xl border border-white/20 relative"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          backgroundColor: "rgba(8, 36, 58, 0.3)",
          backgroundImage:
            "linear-gradient(135deg, rgba(8, 36, 58, 0.2), rgba(8, 36, 58, 0.1), rgba(8, 36, 58, 0.05))",
        }}
      >
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C69c6c] to-transparent opacity-60"></div>

        <div className="px-6 pt-4 pb-6 flex flex-col space-y-1">
          {navLinks.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{
                opacity: menuOpen ? 1 : 0,
                x: menuOpen ? 0 : -30,
                y: menuOpen ? 0 : 10,
              }}
              transition={{
                delay: index * 0.08 + 0.15,
                duration: 0.4,
                ease: "easeOut",
              }}
              whileHover={{
                scale: 1.02,
                x: 5,
              }}
              className="relative"
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="block text-gray-100 hover:text-white px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-white/15 backdrop-blur-sm border border-transparent hover:border-white/20 group relative overflow-hidden"
                onClick={() => {
                  handleNavClick();
                  // Smooth scroll to section with offset for fixed header
                  setTimeout(() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      const headerHeight = 64; // h-16 = 64px
                      const elementPosition = element.offsetTop - headerHeight;
                      window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                      });
                    }
                  }, 100);
                }}
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#C69c6c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Menu Item Content */}
                <div className="relative flex items-center justify-between">
                  <span className="relative z-10">{item}</span>
                  <motion.div
                    className="w-2 h-2 bg-[#C69c6c] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.2 }}
                  />
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-[#C69c6c]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C69c6c]/40 to-transparent opacity-40"></div>
      </motion.div>
    </motion.nav>
  );
};

// Animated Particle Background for Hero
const HeroParticles = () => {
  if (typeof window !== "undefined" && isMobile()) return null;
  const particles = Array.from({ length: 4 });
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-cyan-400/20 shadow-lg"
          style={{
            width: `${Math.random() * 3 + 2}px`,
            height: `${Math.random() * 3 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(0.5px)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, Math.random() * 16 - 8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Optimized Floating 3D Object ---
const Floating3DTriangle = () => {
  if (typeof window !== "undefined" && isMobile()) return null;
  return (
    <motion.div
      className="absolute left-1/2 top-1/4 -translate-x-1/2 z-0 pointer-events-none"
      initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
      animate={{ rotate: 360, scale: 1, opacity: 0.7 }}
      transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      style={{ filter: "drop-shadow(0 0 32px #38bdf8)" }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#glow3d)">
          <polygon points="60,10 110,110 10,110" fill="url(#grad3d)" />
        </g>
        <defs>
          <linearGradient
            id="grad3d"
            x1="10"
            y1="110"
            x2="110"
            y2="10"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38bdf8" />
            <stop offset="0.5" stopColor="#a78bfa" />
            <stop offset="1" stopColor="#fbbf24" />
          </linearGradient>
          <filter
            id="glow3d"
            x="-20"
            y="-20"
            width="160"
            height="160"
            filterUnits="userSpaceOnUse"
          >
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </motion.div>
  );
};

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

            <motion.div
              className="absolute bottom-1/6 left-1/3 w-8 h-8 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, 12, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              <IconGraph className="w-4 h-4 text-blue-400" />
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-1/8 w-9 h-9 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, -18, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
            >
              <IconPresentation className="w-4 h-4 text-purple-400" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/3 right-1/3 w-7 h-7 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, 10, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5,
              }}
            >
              <IconBriefcase className="w-3 h-3 text-[#C69c6c]" />
            </motion.div>

            <motion.div
              className="absolute top-3/4 left-1/6 w-6 h-6 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, -14, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 7.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.8,
              }}
            >
              <IconGlobe className="w-3 h-3 text-green-400" />
            </motion.div>

            <motion.div
              className="absolute bottom-1/8 left-1/5 w-8 h-8 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, 16, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 8.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3.2,
              }}
            >
              <IconDeviceLaptop className="w-4 h-4 text-pink-400" />
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
                  Let&apos;s Build Something Great Together
                </span>
                <span className="block text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium">
                  With Strategic Excellence
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

                {/* Additional Image Floating Icons */}
                <motion.div
                  className="absolute top-1/6 left-1/6 w-8 h-8 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -12, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                >
                  <IconCode className="w-4 h-4 text-cyan-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/6 right-1/6 w-9 h-9 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, 14, 0],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 6.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2.2,
                  }}
                >
                  <IconChartLine className="w-4 h-4 text-[#C69c6c]" />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/8 w-7 h-7 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2,
                  }}
                >
                  <IconPalette className="w-3 h-3 text-purple-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-1/8 w-6 h-6 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, 8, 0],
                    rotate: [0, -360],
                  }}
                  transition={{
                    duration: 7.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3.5,
                  }}
                >
                  <IconVideo className="w-3 h-3 text-green-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-1/3 w-8 h-8 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, 16, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                >
                  <IconWorld className="w-4 h-4 text-blue-400" />
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

// Services Section
const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "Advertising & Printing",
      description: "Banners, stickers, office & vehicle branding, merchandise ",
      icon: IconPrinter,
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
      features: [
        "Banner Design",
        "Vehicle Branding",
        "Office Branding",
        "Merchandise",
      ],
    },
    {
      title: "Digital Marketing",
      description:
        "Social media management, paid ads, SEO, strategy, influencer marketing.",
      icon: IconChartLine,
      color: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400",
      features: [
        "Social Media",
        "Paid Advertising",
        "SEO Strategy",
        "Influencer Marketing",
      ],
    },
    {
      title: "Branding & Design",
      description: "Logo, brand identity, strategy, visual content.",
      icon: IconPalette,
      color: "from-pink-500/20 to-purple-500/20",
      iconColor: "text-pink-400",
      features: [
        "Logo Design",
        "Brand Identity",
        "Visual Strategy",
        "Creative Content",
      ],
    },
    {
      title: "Media Production",
      description: "Videography, photography, promotional content .",
      icon: IconVideo,
      color: "from-green-500/20 to-teal-500/20",
      iconColor: "text-green-400",
      features: [
        "Videography",
        "Photography",
        "Promotional Content",
        "Video Editing",
      ],
    },
    {
      title: "Web Development",
      description:
        "Website design, development, maintenance, SEO optimization.",
      icon: IconWorld,
      color: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
      features: [
        "Website Design",
        "Development",
        "Maintenance",
        "SEO Optimization",
      ],
    },
    {
      title: "Event Planning",
      description: "Corporate events, launches, conferences, exhibitions.",
      icon: IconCalendarEvent,
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      features: [
        "Corporate Events",
        "Product Launches",
        "Conferences",
        "Exhibitions",
      ],
    },
    {
      title: "Training",
      description:
        "Corporate, personal development, and media trainings (conducted in meeting rooms or offsite).",
      icon: IconBook,
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400",
      features: [
        "Corporate Training",
        "Personal Development",
        "Media Training",
        "Workshops",
      ],
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section
      id="services"
      className="py-20 sm:py-32 px-2 sm:px-4 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            Services & Offerings
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            What We Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of services designed to elevate your
            brand and drive results.
          </p>
        </motion.div>

        {/* Enhanced Services Display with Slideshow */}
        <div className="relative">
          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-2xl p-8 group cursor-pointer transition-all duration-500 ${
                  index === activeIndex
                    ? "bg-gradient-to-br from-[#C69c6c]/20 via-[#d4a574]/20 to-[#C69c6c]/20 border-2 border-[#C69c6c]/50 shadow-2xl shadow-[#C69c6c]/20"
                    : "bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 hover:border-[#C69c6c]/30"
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -15,
                  transition: { type: "spring", stiffness: 300 },
                }}
                onClick={() => {
                  setActiveIndex(index);
                }}
              >
                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: index === activeIndex ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: index === activeIndex ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center backdrop-blur-sm border border-white/20`}
                  >
                    {(() => {
                      const IconComponent = service.icon;
                      return (
                        <IconComponent
                          className={`w-8 h-8 ${service.iconColor}`}
                        />
                      );
                    })()}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold font-outfit mb-4 text-white group-hover:text-[#C69c6c] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#C69c6c] rounded-full"></div>
                        <span className="text-sm text-gray-300 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#C69c6c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Who We Are Section
const WhoWeAreSection = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative team-bg">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            About Our Company
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Excellence. Innovation. Results.
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a premier digital marketing and creative agency dedicated to
            transforming businesses through strategic innovation and exceptional
            execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="mirror-card p-8 lg:p-12 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-outfit mb-6 text-white">
              Our Mission & Vision
            </h3>
            <h4 className="text-xl font-semibold text-[#C69c6c] mb-4">
              Strategic Excellence. Creative Innovation. Measurable Results.
            </h4>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              AR Solutions stands as a leading multi-service creative and
              commercial agency, delivering comprehensive advertising, branding,
              printing, media production, and business solutions with unwavering
              commitment to excellence.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We combine innovative ideas with practical execution, helping our
              clients grow, connect, and stand out in today&apos;s competitive
              world.
            </p>
            <div className="mb-8">
              <span className="inline-block text-2xl mr-2 align-middle">
                💡
              </span>
              <span className="font-bold text-white text-lg align-middle">
                Our Purpose
              </span>
              <p className="text-lg text-gray-300 mt-2 leading-relaxed">
                We exist to elevate brands, simplify solutions, and deliver
                quality with heart. Whether you&apos;re a startup or an
                established business, we offer tailored services that align with
                your goals and exceed expectations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  500+
                </div>
                <div className="text-gray-300 text-sm">Projects Delivered</div>
              </motion.div>
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">
                  150+
                </div>
                <div className="text-gray-300 text-sm">Happy Clients</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Professional Image Container */}
              <div className="mirror-card p-4 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30 rounded-2xl overflow-hidden">
                <Image
                  src="/img/about-us-11.png"
                  alt="Professional team collaboration and digital excellence"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 rounded-full blur-xl"
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
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
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

              {/* Professional Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-gradient-to-r from-[#C69c6c] to-[#d4a574] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Professional Excellence
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section with Google Map
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Send form data to Getform
      const response = await fetch(
        "https://getform.io/f/3541f08d-6ce4-4e35-bc6a-ee35ea66c98e",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Contact from ${formData.name} - AR Solutions Website`,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            Contact Us
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Let&apos;s Start Your Digital Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your digital presence? Get in touch with our team
            of experts and discover how we can accelerate your business growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-outfit mb-6 text-white">
              Get In Touch
            </h3>

            {/* Success/Error Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-300"
              >
                ✅ Message sent successfully! We'll get back to you soon.
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg text-red-300"
              >
                ❌ Something went wrong. Please try again or contact us directly
                at asl.solutions@gmail.com
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name *
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                  placeholder="Your Name"
                  whileFocus={{ scale: 1.02 }}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email *
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] rounded-lg placeholder-gray-400"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message *
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-[#C69c6c] resize-none rounded-lg placeholder-gray-400"
                  placeholder="Tell us about your project, requirements, or any questions you have..."
                  whileFocus={{ scale: 1.02 }}
                  disabled={isSubmitting}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message
                }
                className={`w-full btn-secondary transition-all duration-300 ${
                  isSubmitting ||
                  !formData.name ||
                  !formData.email ||
                  !formData.message
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:scale-105"
                }`}
                whileHover={
                  !isSubmitting &&
                  formData.name &&
                  formData.email &&
                  formData.message
                    ? {
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 0 16px #C69c6c",
                      }
                    : {}
                }
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>

              <p className="text-xs text-gray-400 text-center">
                * Your message will be sent directly to our team
              </p>
            </form>
          </motion.div>

          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-outfit mb-6 text-white">
              Contact Information
            </h3>
            <div className="space-y-6">
              {[
                {
                  icon: IconMail,
                  title: "Email",
                  info: "artradingplc@gmail.com",
                },
                { icon: IconPhone, title: "Phone", info: "0988175550" },
                {
                  icon: IconMapPin,
                  title: "Address",
                  info: "8th floor, Kazadis Bldg, Kazanchis\nAddis Ababa, Ethiopia",
                },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 10 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/40 rounded-full flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-br hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300">
                    <contact.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">
                      {contact.title}
                    </h4>
                    <p className="text-gray-300 whitespace-pre-line">
                      {contact.info}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div className="pt-6">
                <h4 className="font-semibold text-white mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: IconBrandFacebook, href: "#" },
                    { icon: IconBrandTwitter, href: "#" },
                    { icon: IconBrandLinkedin, href: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/40 rounded-full flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-br hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Map Section */}
        <motion.div
          className="mirror-card p-2 rounded-2xl"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 flex items-center justify-center shadow-2xl">
            {/* Embedded Google Map */}
            <iframe
              title="AR Solutions Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4248.424677904093!2d38.77295590000001!3d9.011854399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b852ce1410c23%3A0xe500072b801f3134!2sAR%20Solutions%20Trading%20PLC!5e1!3m2!1sen!2set!4v1754757264346!5m2!1sen!2set"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-none"
            ></iframe>
            {/* Overlay with address and button */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-950/80 via-blue-900/60 to-transparent p-6 flex flex-col items-center z-10">
              <h4 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Our Location
              </h4>
              <p className="text-cyan-100 text-base font-medium mb-3 drop-shadow">
                8th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia
              </p>
              <motion.a
                href="https://www.google.com/maps/place/Betopia+site/@9.0122241,38.7725403,119m/data=!3m1!1e3!4m6!3m5!1s0x164b851aa37d610d:0x53b55e8e74640bdf!8m2!3d9.0122241!4d38.7731438!16s%2Fg%2F11sckb3__w?entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-6 py-2 btn-secondary"
                whileHover={{ scale: 1.05, boxShadow: "0 0 16px #C69c6c" }}
                whileTap={{ scale: 0.95 }}
              >
                View on Google Maps
              </motion.a>
            </div>
            {/* Decorative Map Pin */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-xl border-4 border-white/30 text-white animate-bounce">
                <IconMapPin className="w-6 h-6" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <motion.footer
      className="py-12 px-4 sm:px-6 lg:px-8 glass"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <motion.div className="mb-4" whileHover={{ scale: 1.05 }}>
              <Image
                src="/img/ars.png"
                alt="AR Solutions Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </motion.div>
            <p className="text-gray-300 mb-4 max-w-md">
              Transforming businesses through innovative digital marketing
              solutions. Your success is our mission.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                "Home",
                "Services",
                "About",
                "Team",
                "Testimonials",
                "Contact",
              ].map((link, index) => (
                <motion.li key={link} whileHover={{ x: 5 }}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Digital Strategy",
                "Brand Development",
                "SEO & Analytics",
                "Social Media",
                "Content Marketing",
                "E-commerce",
              ].map((service, index) => (
                <motion.li key={service} whileHover={{ x: 5 }}>
                  <span className="text-gray-300">{service}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider"></div>
        <div className="text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} AR Solutions. All rights reserved.
            Built with innovation and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Galaxy Background Component
const GalaxyBackground = () => {
  if (typeof window !== "undefined" && isMobile()) return null;
  return (
    <>
      <div className="galaxy-bg"></div>
      <ScrollStars />
      <div className="stars">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>
    </>
  );
};

// Latest Works Section with Tabs
import { Fragment } from "react";

type WorkItem = {
  title: string;
  desc: string;
  image: string;
  client: string;
};

const tabNames = ["Digital Marketing", "Web Development", "Branding"] as const;

type TabName = (typeof tabNames)[number];

const tabIcons: Record<TabName, React.ComponentType<{ className?: string }>> = {
  "Web Development": IconCode,
  "Digital Marketing": IconChartLine,
  Branding: IconPalette,
};

const latestWorks: Record<TabName, WorkItem[]> = {
  "Web Development": [
    {
      title: "Enterprise Resource Planning (ERP)",
      desc: "Comprehensive business management system for resource planning and operations.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      client: "Corporate Clients",
    },
    {
      title: "Learning Management System (LMS)",
      desc: "Advanced educational platform for online learning and course management.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      client: "Educational Institutions",
    },
    {
      title: "Customer Relationship Management (CRM)",
      desc: "Integrated system for managing customer interactions and business relationships.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      client: "Business Organizations",
    },
  ],
  "Digital Marketing": [
    {
      title: "Social Media Campaign Design",
      desc: "",
      image: "/img/social-media-post-designs/1.jpg",
      client: "Muyalogy LMS Platform",
    },
    {
      title: "Instagram Story Collection",
      desc: "",
      image: "/img/social-media-post-designs/2.jpg",
      client: "Muyalogy LMS Platform",
    },
    {
      title: "Facebook Post Series",
      desc: "",
      image: "/img/social-media-post-designs/3.jpg",
      client: "Muyalogy LMS Platform",
    },
    {
      title: "LinkedIn Professional Posts",
      desc: "",
      image: "/img/social-media-post-designs/4.jpg",
      client: "Muyalogy LMS Platform",
    },
    {
      title: "Twitter Campaign Graphics",
      desc: "",
      image: "/img/social-media-post-designs/5.jpg",
      client: "Muyalogy LMS Platform",
    },
    {
      title: "Social Media Brand Kit",
      desc: "",
      image: "/img/social-media-post-designs/6.jpg",
      client: "Muyalogy LMS Platform",
    },
  ],
  Branding: [
    {
      title: "Rebranding for Haile Hospitality Group",
      desc: "Complete brand refresh for a leading hospitality group.",
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      client: "Haile Hospitality Group",
    },
    {
      title: "Logo & Identity Suite",
      desc: "Distinctive visual identity for a tech startup.",
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      client: "Tech Startup",
    },
    {
      title: "Government Brand Guidelines",
      desc: "Comprehensive branding for a government initiative.",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Gov. Initiative",
    },
  ],
};

const LatestWorksSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>(tabNames[0]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openImagePreview = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeImagePreview = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeImagePreview();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section
      id="latest-works"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-[#08243A]/20 via-transparent to-[#08243A]/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-6 py-3 bg-[#C69c6c]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-lg font-bold mb-8">
            Latest Works
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Our Latest Works
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing our creative excellence in digital marketing, web
            development, and branding solutions. From social media campaigns to
            enterprise applications, we deliver results that exceed
            expectations.
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="relative max-w-full">
            <div
              className="inline-flex rounded-full bg-[#08243A]/60 p-1 shadow-xl max-w-full overflow-x-auto scrollbar-hide gap-2 px-1 snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="tablist"
            >
              {tabNames.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xl sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69c6c] whitespace-nowrap
                    ${
                      activeTab === tab
                        ? "btn-secondary text-white shadow-lg"
                        : "btn-secondary text-[#C69c6c] hover:bg-[#C69c6c]/20"
                    }
                  `}
                  aria-controls={`tab-panel-${tab}`}
                  tabIndex={activeTab === tab ? 0 : -1}
                  style={{ minWidth: "44px", scrollSnapAlign: "center" }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-2 right-2 bottom-1 h-1 rounded-full bg-gradient-to-r from-[#C69c6c] to-[#d4a574]"
                      style={{ zIndex: 1 }}
                    />
                  )}
                  <span className="sm:hidden" title={tab}>
                    {(() => {
                      const IconComponent = tabIcons[tab];
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </span>
                  <span className="hidden sm:inline">{tab}</span>
                </button>
              ))}
            </div>
            {/* Right-edge fade indicator for scrollable tabs on mobile/tablet */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-blue-900/80 via-blue-900/40 to-transparent rounded-r-full block" />
          </div>
        </div>
        {/* Tab Panels - render only the active tab's panel, no absolute positioning */}
        <div className="relative w-full">
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {latestWorks[activeTab].map((work: WorkItem, idx: number) => (
                <motion.div
                  key={work.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Optimized Card Design */}
                  <div
                    className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => openImagePreview(work.image)}
                  >
                    {/* Simple Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C69c6c] rounded-t-2xl"></div>

                    {/* Image Container */}
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Simple Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-[#C69c6c] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {activeTab}
                      </div>

                      {/* Preview Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C69c6c] transition-colors duration-300">
                        {work.title}
                      </h3>
                      <div className="text-[#C69c6c] font-medium text-sm">
                        {work.client}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-blue-950/80 to-transparent pointer-events-none" />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeImagePreview}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeImagePreview}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300 border border-white/20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <Image
                src={selectedImage}
                alt="Preview"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[90vh] object-contain"
                priority
              />

              {/* Download Button */}
              <div className="absolute bottom-4 left-4 z-10">
                <a
                  href={selectedImage}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C69c6c] text-white rounded-full hover:bg-[#d4a574] transition-colors duration-300 shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Custom Creative Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add hover detection for interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .hover-lift, .mirror-card"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div
          className="w-full h-full rounded-full shadow-lg"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)
            `,
          }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998]"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isHovering ? 1.2 : 1,
          rotate: isHovering ? 180 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: "rgba(59, 130, 246, 0.5)",
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9997]"
        style={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(139, 92, 246, 0.7) 100%)
            `,
          }}
        />
      </motion.div>

      {/* Ethiopian star cursor for special elements */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9996]"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.3 : 0,
          rotate: isHovering ? 360 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="starGradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
              <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
              <stop offset="100%" stopColor="rgba(15, 23, 42, 0.9)" />
            </radialGradient>
          </defs>
          <path
            d="M12 2L14.09 8.26L22 9L16 14.14L17.18 22.02L12 18.77L6.82 22.02L8 14.14L2 9L9.91 8.26L12 2Z"
            fill="url(#starGradient)"
            stroke="rgba(59, 130, 246, 0.6)"
            strokeWidth="0.5"
          />
        </svg>
      </motion.div>
    </>
  );
};

// Main Page Component
export default function Home() {
  // Only show custom cursor on desktop
  const isDesktop =
    typeof window !== "undefined" &&
    window.innerWidth >= 1024 &&
    !/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const [isMobileClient, setIsMobileClient] = useState(false);
  useEffect(() => {
    setIsMobileClient(isMobile());
  }, []);
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ cursor: isDesktop ? "none" : undefined }}
    >
      <IntroLoader />
      <GalaxyBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <WhoWeAreSection />
        <LatestWorksSection />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
      {isDesktop && <CustomCursor />}
    </div>
  );
}
