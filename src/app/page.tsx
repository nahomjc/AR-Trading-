"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollStars from "./components/ScrollStars";
import CPUAnimation from "./components/CPUAnimation";
import PoweredBySection from "./components/PoweredBySection";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass backdrop-blur-md" : "bg-transparent"
      }`}
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
              <h1 className="text-2xl font-bold font-poppins gradient-text">
                AR Trading PLC
              </h1>
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
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gradient-to-br from-blue-900/80 via-purple-900/80 to-cyan-900/80 backdrop-blur-md shadow-lg"
        style={{ pointerEvents: menuOpen ? "auto" : "none" }}
      >
        <div className="px-4 pt-2 pb-4 flex flex-col space-y-2">
          {navLinks.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: menuOpen ? 1 : 0, x: menuOpen ? 0 : -20 }}
              transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <a
                href={`#${item.toLowerCase()}`}
                className="block text-gray-200 hover:text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setTimeout(() => handleNavClick(), 120)}
              >
                {item}
              </a>
            </motion.div>
          ))}
        </div>
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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative hero-pattern pt-20 sm:pt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Professional Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(198, 156, 108, 0.3) 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            ></div>
          </div>

          {/* Professional Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Professional Content */}
          <motion.div
            className="text-left space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Professional Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-6 py-3 professional-badge rounded-full">
                <div className="w-2 h-2 bg-[#C69c6c] rounded-full mr-3 animate-pulse"></div>
                <span className="text-[#C69c6c] text-sm font-semibold tracking-wide">
                  LEADING DIGITAL MARKETING AGENCY
                </span>
                <span className="ml-3 text-[#C69c6c] text-sm">🇪🇹</span>
              </div>
            </motion.div>

            {/* Professional Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-poppins leading-tight hero-headline">
                <span className="block gradient-text mb-4">
                  Let&apos;s Build Something Great Together
                </span>
                <span className="block text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium">
                  With Strategic Excellence
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl hero-subtitle">
                We deliver cutting-edge digital marketing solutions that drive
                exponential growth, enhance brand visibility, and create lasting
                customer relationships.
              </p>
            </motion.div>

            {/* Professional Stats - Compact */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 pb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              {[
                { number: "500+", label: "Projects" },
                { number: "98%", label: "Satisfaction" },
                { number: "150+", label: "Clients" },
                { number: "5+", label: "Years" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-3 rounded-xl stats-card-professional"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-xl font-bold gradient-text mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-xs font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Visual */}
          <motion.div
            className="flex flex-col items-start justify-center mb-8 lg:mb-0 pt-8 lg:pt-0"
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
                <div className="relative rounded-3xl overflow-hidden shadow-2xl professional-image-container p-8">
                  <Image
                    src="/img/image-2.png"
                    alt="Professional Digital Marketing and Web Development Services"
                    width={1200}
                    height={1200}
                    className="w-full h-auto object-contain"
                    priority
                  />

                  {/* Professional Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>

                {/* Professional Decorative Elements */}
                <motion.div
                  className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 rounded-full blur-xl"
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
                  className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
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
                  className="absolute top-1/4 right-1/4 w-12 h-12 floating-element rounded-full flex items-center justify-center"
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
                  className="absolute top-1/3 right-1/3 w-8 h-8 floating-element rounded-full flex items-center justify-center"
                  animate={{
                    y: [0, -16, 0],
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
                className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C69c6c]/10 via-transparent to-blue-500/10 blur-3xl -z-10"
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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

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
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold font-poppins mb-6 gradient-text">
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
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
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
                  <h3 className="text-2xl font-bold font-poppins mb-4 text-white group-hover:text-[#C69c6c] transition-colors duration-300">
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

          {/* Slideshow Controls */}
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={() => {
                setActiveIndex(
                  (prev) => (prev - 1 + services.length) % services.length
                );
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 border border-[#C69c6c]/30 flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-r hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex space-x-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 10000);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-[#C69c6c] scale-125"
                      : "bg-gray-400 hover:bg-[#C69c6c]/60"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setActiveIndex((prev) => (prev + 1) % services.length);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 border border-[#C69c6c]/30 flex items-center justify-center text-[#C69c6c] hover:bg-gradient-to-r hover:from-[#C69c6c]/30 hover:to-[#d4a574]/30 transition-all duration-300"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                isAutoPlaying
                  ? "bg-[#C69c6c]/20 text-[#C69c6c] border border-[#C69c6c]/30"
                  : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
              }`}
            >
              {isAutoPlaying ? "⏸️ Pause Slideshow" : "▶️ Play Slideshow"}
            </button>
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
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
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
            <h3 className="text-3xl font-bold font-poppins mb-6 text-white">
              Our Mission & Vision
            </h3>
            <h4 className="text-xl font-semibold text-[#C69c6c] mb-4">
              Strategic Excellence. Creative Innovation. Measurable Results.
            </h4>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              AR Trading PLC stands as a leading multi-service creative and
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
            <div className="mirror-card p-8 h-96 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30 flex items-center justify-center">
              <div className="text-center">
                <IconUsers className="w-20 h-20 text-[#C69c6c] mb-4" />
                <h4 className="text-2xl font-bold text-white mb-2">
                  Our Team at Work
                </h4>
                <p className="text-gray-300">
                  Dedicated professionals crafting digital excellence
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Contact Section with Google Map
const ContactSection = () => {
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
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
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
            <h3 className="text-2xl font-semibold font-poppins mb-6 text-white">
              Get In Touch
            </h3>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  placeholder="Your Name"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <motion.input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                  placeholder="your@email.com"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Message
                </label>
                <motion.textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 neomorph-inset bg-transparent text-white border-none outline-none focus:ring-2 focus:ring-blue-500 resize-none rounded-lg"
                  placeholder="Tell us about your project..."
                  whileFocus={{ scale: 1.02 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full btn-secondary"
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 0 16px #C69c6c",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            className="mirror-card p-8"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold font-poppins mb-6 text-white">
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
                  info: "3rd floor, Bass Addis Bldg. Bole\nAddis Ababa, Ethiopia",
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
              title="AR Trading PLC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3954.669393698736!2d38.7725403!3d9.0122241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b851aa37d610d%3A0x53b55e8e74640bdf!2sBetopia%20site!5e0!3m2!1sen!2set!4v1715612345678!5m2!1sen!2set"
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
                3rd floor, Bass Addis Bldg. Bole, Addis Ababa, Ethiopia
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
            <motion.h3
              className="text-2xl font-bold font-poppins gradient-text mb-4"
              whileHover={{ scale: 1.05 }}
            >
              AR Trading PLC
            </motion.h3>
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
            © 2024 AR Trading PLC. All rights reserved. Built with innovation
            and passion.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

// Galaxy Background Component
const GalaxyBackground = () => {
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

const tabNames = ["Web Development", "Digital Marketing", "Branding"] as const;

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
      title: "Viral Social Campaign",
      desc: "Multi-platform campaign that increased engagement by 300%.",
      image:
        "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
      client: "Retail Brand",
    },
    {
      title: "SEO Overhaul",
      desc: "Boosted organic traffic for a logistics company.",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Logistics Co.",
    },
    {
      title: "Influencer Partnership",
      desc: "Brand awareness campaign with top influencers.",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
      client: "Consumer Goods",
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
  const isMobileDevice = typeof window !== "undefined" && isMobile();
  return (
    <section
      id="latest-works"
      className="py-10 sm:py-20 px-2 sm:px-4 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/30 to-[#d4a574]/30 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            Latest Works
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold font-poppins mb-4 gradient-text">
            Our Latest Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our customer base ranges from small startups to big governmental
            firms.
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="relative max-w-full">
            <div
              className="inline-flex rounded-full bg-gradient-to-r from-blue-900/60 to-purple-900/60 p-1 shadow-xl max-w-full overflow-x-auto scrollbar-hide gap-2 px-1 snap-x snap-mandatory"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {(isMobileDevice
                ? latestWorks[activeTab].slice(0, 1)
                : latestWorks[activeTab]
              ).map((work: WorkItem, idx: number) => (
                <motion.div
                  key={work.title}
                  className="group relative rounded-2xl overflow-hidden mirror-card bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30 shadow-2xl hover:shadow-2xl transition-all duration-300 w-full max-w-full sm:max-w-xs mx-auto p-2 sm:p-4"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -5 }}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={
                        isMobileDevice ? work.image + "&w=300&q=50" : work.image
                      }
                      alt={work.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold font-poppins mb-1 text-white group-hover:text-blue-300 transition-colors">
                      {work.title}
                    </h3>
                    <div className="text-blue-400 font-medium mb-1 text-sm">
                      {work.client}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-0">
                      {work.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-blue-950/80 to-transparent pointer-events-none" />
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
  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ cursor: "none" }}
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
        <PoweredBySection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
      {isDesktop && <CustomCursor />}
    </div>
  );
}
