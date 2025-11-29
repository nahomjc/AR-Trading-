"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SearchComponent from "./SearchComponent";

// Navigation Component
const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position and active section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "about", "services", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on navigation
  const handleNavClick = () => setMenuOpen(false);

  const navLinks = ["Home", "About", "Services", "Testimonials", "Contact"];

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#08243A]/95 backdrop-blur-xl shadow-lg border-b border-[#C69c6c]/10"
          : "bg-[#08243A]/80 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a
              href="/"
              className="focus:outline-none focus:ring-2 focus:ring-[#C69c6c] focus:ring-offset-2 focus:ring-offset-[#08243A] rounded-lg"
            >
              <Image
                src="/img/White-with-background-removebg-preview.png"
                alt="AR Solutions Logo"
                width={120}
                height={70}
                className="w-auto h-24 object-contain"
                priority
              />
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((item, index) => {
              const isActive = activeSection === item.toLowerCase();
              return (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className={`relative px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 font-growth ${
                    isActive
                      ? "text-[#C69c6c]"
                      : "text-gray-300 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#C69c6c]/10 to-[#d4a574]/10 rounded-lg border border-[#C69c6c]/20"
                      layoutId="activeNav"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover background */}
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ opacity: 1 }}
                  />

                  <span className="relative z-10">{item}</span>

                  {/* Active underline */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#C69c6c] to-transparent"
                      layoutId="activeUnderline"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Desktop Search Component */}
          <div className="hidden md:block">
            <SearchComponent />
          </div>

          {/* Mobile Search and Hamburger */}
          <div className="md:hidden flex items-center space-x-3">
            <SearchComponent />
            <motion.button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className={`flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69c6c] focus:ring-offset-2 focus:ring-offset-[#08243A] ${
                menuOpen
                  ? "bg-[#C69c6c]/20 border border-[#C69c6c]/30"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open main menu</span>
              <motion.div
                initial={false}
                animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                className="w-6 h-6 flex flex-col justify-center items-center"
              >
                <span
                  className={`block h-0.5 w-5 bg-white mb-1.5 transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-white mb-1.5 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block h-0.5 w-5 bg-white transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <motion.div
        initial={false}
        animate={
          menuOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden backdrop-blur-xl shadow-2xl border-t border-[#C69c6c]/20 relative"
        style={{
          pointerEvents: menuOpen ? "auto" : "none",
          backgroundColor: "rgba(8, 36, 58, 0.95)",
        }}
      >
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C69c6c]/60 to-transparent"></div>

        <div className="px-4 pt-3 pb-5 flex flex-col space-y-1">
          {navLinks.map((item, index) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: menuOpen ? 1 : 0,
                  x: menuOpen ? 0 : -20,
                }}
                transition={{
                  delay: index * 0.05 + 0.1,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-300 group relative overflow-hidden font-growth ${
                    isActive
                      ? "text-[#C69c6c] bg-[#C69c6c]/10 border border-[#C69c6c]/20"
                      : "text-gray-200 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10"
                  }`}
                  onClick={() => {
                    handleNavClick();
                    setTimeout(() => {
                      const element = document.getElementById(
                        item.toLowerCase()
                      );
                      if (element) {
                        const headerHeight = 80;
                        const elementPosition =
                          element.offsetTop - headerHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: "smooth",
                        });
                      }
                    }, 100);
                  }}
                >
                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#C69c6c]/10 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: isActive ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Menu Item Content */}
                  <div className="relative flex items-center justify-between">
                    <span className="relative z-10">{item}</span>
                    {isActive && (
                      <motion.div
                        className="w-2 h-2 bg-[#C69c6c] rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500 }}
                      />
                    )}
                  </div>

                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C69c6c] to-[#d4a574] rounded-l-xl"
                      layoutId="mobileActive"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Decorative Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C69c6c]/40 to-transparent"></div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
