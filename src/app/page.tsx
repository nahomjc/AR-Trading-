"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollStars from "./components/ScrollStars";
import CPUAnimation from "./components/CPUAnimation";
import PoweredBySection from "./components/PoweredBySection";
import ChatBot from "./components/ChatBot";
import IntroLoader from "./components/IntroLoader";
import Image from "next/image";
import dynamic from "next/dynamic";

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
  const particles = Array.from({ length: 8 });
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

// Enhanced Hero Section
const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 970], [1, 0]);
  const [shine, setShine] = useState(false);
  useEffect(() => {
    setShine(true);
  }, []);
  // Spaceship animation state
  const [showShip, setShowShip] = useState(true);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative hero-pattern pt-32 sm:pt-40 pb-40 sm:pb-56"
    >
      {/* Galaxy/Nebula Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Spaceship Animation */}
        {!isMobile() && showShip && (
          <motion.div
            initial={{ x: "-20vw", y: "20vh", rotate: -15, opacity: 0 }}
            animate={{ x: "120vw", y: "-5vh", rotate: 10, opacity: 1 }}
            transition={{ duration: 12, ease: "easeInOut" }}
            onAnimationComplete={() => setShowShip(false)}
            className="absolute left-0 top-0 flex flex-col items-center w-[28rem] h-[28rem] z-20"
            style={{ pointerEvents: "none" }}
          >
            {/* Highly Realistic SVG Rocket with Animated Flame */}
            <svg
              viewBox="0 0 200 360"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Glow under ship */}
              <ellipse
                cx="100"
                cy="350"
                rx="60"
                ry="16"
                fill="#0ff6"
                opacity="0.4"
              />
              {/* Rocket body */}
              <g filter="url(#glow)">
                {/* Main body with metallic gradient and panel lines */}
                <rect
                  x="75"
                  y="70"
                  width="50"
                  height="160"
                  rx="25"
                  fill="url(#metallicBody)"
                  stroke="#e0e7ef"
                  strokeWidth="3"
                />
                {/* Panel lines */}
                <rect
                  x="97"
                  y="90"
                  width="6"
                  height="120"
                  rx="3"
                  fill="#e0e7ef"
                  fillOpacity="0.18"
                />
                <rect
                  x="75"
                  y="150"
                  width="50"
                  height="4"
                  rx="2"
                  fill="#e0e7ef"
                  fillOpacity="0.18"
                />
                {/* Nose cone with metallic shine */}
                <polygon
                  points="100,30 75,70 125,70"
                  fill="url(#noseconeMetal)"
                  stroke="#e0e7ef"
                  strokeWidth="3"
                />
                {/* Windows */}
                <ellipse
                  cx="100"
                  cy="110"
                  rx="13"
                  ry="13"
                  fill="url(#windowGlass)"
                  stroke="#fff"
                  strokeWidth="3"
                />
                <ellipse
                  cx="100"
                  cy="110"
                  rx="6"
                  ry="6"
                  fill="#fff"
                  fillOpacity="0.7"
                />
                <ellipse
                  cx="100"
                  cy="140"
                  rx="7"
                  ry="7"
                  fill="url(#windowGlass)"
                  stroke="#fff"
                  strokeWidth="2"
                />
                {/* Left fin */}
                <polygon
                  points="75,170 35,240 90,200"
                  fill="#38bdf8"
                  stroke="#e0e7ef"
                  strokeWidth="3"
                />
                {/* Right fin */}
                <polygon
                  points="125,170 165,240 110,200"
                  fill="#a78bfa"
                  stroke="#e0e7ef"
                  strokeWidth="3"
                />
                {/* Center fin */}
                <polygon
                  points="100,220 90,300 110,300"
                  fill="#fbbf24"
                  stroke="#e0e7ef"
                  strokeWidth="3"
                />
                {/* Animated Complex Flame */}
                <motion.ellipse
                  cx="100"
                  cy="320"
                  rx="28"
                  ry="18"
                  fill="url(#flameOuter)"
                  style={{
                    filter:
                      "drop-shadow(0 0 48px #fbbf24) drop-shadow(0 0 64px #f59e42) drop-shadow(0 0 80px #f87171)",
                  }}
                  animate={{
                    scaleX: [1, 1.15, 1],
                    scaleY: [1, 1.2, 1],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
                <motion.ellipse
                  cx="100"
                  cy="330"
                  rx="14"
                  ry="8"
                  fill="url(#flameInner)"
                  style={{ filter: "drop-shadow(0 0 32px #fff8)" }}
                  animate={{
                    scaleX: [1, 1.2, 1],
                    scaleY: [1, 1.3, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.5,
                    ease: "easeInOut",
                  }}
                />
              </g>
              <defs>
                <linearGradient
                  id="metallicBody"
                  x1="75"
                  y1="70"
                  x2="125"
                  y2="230"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#e0e7ef" />
                  <stop offset="0.2" stopColor="#bfc9d1" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="0.8" stopColor="#6366f1" />
                  <stop offset="1" stopColor="#bfc9d1" />
                </linearGradient>
                <linearGradient
                  id="noseconeMetal"
                  x1="100"
                  y1="30"
                  x2="100"
                  y2="70"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fff" stopOpacity="0.98" />
                  <stop offset="1" stopColor="#bae6fd" stopOpacity="0.7" />
                </linearGradient>
                <radialGradient
                  id="windowGlass"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="translate(100 110) scale(13 13)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#bae6fd" />
                  <stop offset="1" stopColor="#60a5fa" />
                </radialGradient>
                <radialGradient
                  id="flameOuter"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="translate(100 320) scale(28 18)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fbbf24" />
                  <stop offset="0.7" stopColor="#f59e42" />
                  <stop offset="1" stopColor="#f87171" stopOpacity="0.7" />
                </radialGradient>
                <radialGradient
                  id="flameInner"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientTransform="translate(100 330) scale(14 8)"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#fffbe8" />
                  <stop offset="0.5" stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#f59e42" stopOpacity="0.7" />
                </radialGradient>
                <filter
                  id="glow"
                  x="0"
                  y="0"
                  width="200"
                  height="360"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feGaussianBlur stdDeviation="16" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>
          </motion.div>
        )}
        {/* Existing Particles */}
        <HeroParticles />
        {/* Animated Galaxies/Nebulae */}
        {!isMobile() && (
          <motion.div
            className="absolute left-1/4 top-0 w-[320px] h-[220px] bg-cyan-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.08, 1],
              x: [0, 20, 0],
              y: [0, 10, 0],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"></div>

      {/* CPU Animation Background */}

      <motion.div
        className="max-w-7xl mx-auto text-center relative z-10"
        style={{ y }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Animated Gradient Shine Headline */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-bold font-poppins mb-8 leading-tight relative overflow-hidden"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span className="gradient-text relative inline-block">
            Let’s Build Something Great Together
            {/* Shine effect */}
            <motion.span
              className="absolute left-0 top-0 h-full w-full pointer-events-none"
              animate={shine ? { x: ["-100%", "120%"] } : {}}
              transition={{
                duration: 1.2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                background:
                  "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
                maskImage:
                  "linear-gradient(120deg, transparent 0%, white 50%, transparent 100%)",
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                zIndex: 2,
                mixBlendMode: "lighten",
              }}
            />
          </span>
          <br />
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-2 mt-4 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200">
              Tailored Solutions
            </span>
            <span className="hidden sm:inline text-gray-400 mx-2 text-xl">
              •
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200">
              Trusted Expertise
            </span>
            <span className="hidden sm:inline text-gray-400 mx-2 text-xl">
              •
            </span>
            <span className="text-base sm:text-lg md:text-xl font-semibold text-gray-200">
              Creative Excellence
            </span>
          </motion.div>
          <motion.span
            className="text-cyan-200 text-xl sm:text-2xl font-bold inline-block mt-2"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ willChange: "transform" }}
          >
            👉Start Your Journey With Us Today
          </motion.span>
        </motion.h1>
        {/* Badge moved below headline for clarity and spacing */}
        <motion.div
          className="mt-6 mb-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium">
            🚀 Leading Digital Marketing Solutions
          </span>
        </motion.div>

        <motion.p
          className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          AR Trading PLC delivers cutting-edge digital marketing solutions that
          drive exponential growth, enhance brand visibility, and create lasting
          customer relationships in today&apos;s competitive digital landscape.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.a
            href="#services"
            className="btn-primary hover-lift group"
            whileHover={{ scale: 1.08, y: -5, boxShadow: "0 0 24px #06b6d4" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore Our Services</span>
          </motion.a>
          <motion.a
            href="#contact"
            className="btn-secondary hover-lift"
            whileHover={{ scale: 1.08, y: -5, boxShadow: "0 0 24px #a78bfa" }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          {[
            { number: "500+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" },
            { number: "150+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="stats-card p-6 text-center hover-lift"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const services = [
    {
      title: "Advertising & Printing",
      description: "Banners, stickers, office & vehicle branding, merchandise ",
      icon: "🖨️",
    },
    {
      title: "Digital Marketing",
      description:
        "Social media management, paid ads, SEO, strategy, influencer marketing.",
      icon: "💻",
    },
    {
      title: "Branding & Design",
      description: "Logo, brand identity, strategy, visual content.",
      icon: "🎨",
    },
    {
      title: "Media Production",
      description: "Videography, photography, promotional content .",
      icon: "🎥",
    },
    {
      title: "Web Development",
      description:
        "Website design, development, maintenance, SEO optimization.",
      icon: "🌐",
    },
    {
      title: "Event Planning",
      description: "Corporate events, launches, conferences, exhibitions.",
      icon: "🎉",
    },
    {
      title: "Training",
      description:
        "Corporate, personal development, and media trainings (conducted in meeting rooms or offsite).",
      icon: "📚",
    },
  ];

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
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="mirror-card p-8 hover-lift group"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <motion.div
                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-2xl font-semibold font-poppins mb-4 text-white">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-2">
                {service.description}
              </p>
            </motion.div>
          ))}
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
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
            Who We Are
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-poppins mb-6 gradient-text">
            Innovators. Strategists. Partners.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="mirror-card p-8 lg:p-12"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-poppins mb-6 text-white">
              Who We Are
            </h3>
            <h4 className="text-xl font-semibold text-blue-200 mb-4">
              Bold Vision. Smart Execution. Real Impact.
            </h4>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              AR Trading PLC is a multi-service creative and commercial agency
              committed to delivering advertising, branding, printing, media
              production, and business solutions — all under one roof.
            </p>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              We combine innovative ideas with practical execution, helping our
              clients grow, connect, and stand out in today’s competitive world.
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
                quality with heart. Whether you’re a startup or an established
                business, we offer tailored services that align with your goals
                and exceed expectations.
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
            <div className="mirror-card p-8 h-96 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">👥</div>
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
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
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
                className="w-full btn-primary"
                whileHover={{ scale: 1.02, y: -2 }}
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
                  icon: "📧",
                  title: "Email",
                  info: "artradingplc@gmail.com",
                },
                { icon: "📞", title: "Phone", info: "0988175550" },
                {
                  icon: "📍",
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
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    {contact.icon}
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
                  {["📘", "🐦", "💼"].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                    >
                      {social}
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
                className="inline-block mt-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all backdrop-blur-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View on Google Maps
              </motion.a>
            </div>
            {/* Decorative Map Pin */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 shadow-xl border-4 border-white/30 text-white text-2xl animate-bounce">
                📍
              </span>
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

const tabIcons: Record<TabName, string> = {
  "Web Development": "💻",
  "Digital Marketing": "📈",
  Branding: "🎨",
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
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-sm border border-white/10 rounded-full text-blue-200 text-sm font-medium mb-6">
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
                  className={`relative flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xl sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap
                    ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "text-blue-200 hover:bg-blue-800/30"
                    }
                  `}
                  aria-selected={activeTab === tab}
                  aria-controls={`tab-panel-${tab}`}
                  tabIndex={activeTab === tab ? 0 : -1}
                  style={{ minWidth: "44px", scrollSnapAlign: "center" }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-2 right-2 bottom-1 h-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                      style={{ zIndex: 1 }}
                    />
                  )}
                  <span className="sm:hidden" title={tab}>
                    {tabIcons[tab]}
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
                  className="group relative rounded-2xl overflow-hidden mirror-card bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20 border border-blue-400/30 shadow-2xl hover:shadow-2xl transition-all duration-300 w-full max-w-full sm:max-w-xs mx-auto p-2 sm:p-4"
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

// Main Page Component
export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
    </div>
  );
}
