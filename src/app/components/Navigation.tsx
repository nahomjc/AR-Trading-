"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SearchComponent from "./SearchComponent";

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
        <div className="flex justify-between items-center h-20">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <a href="/" className="focus:outline-none">
              <Image
                src="/img/White-with-background-removebg-preview.png"
                alt="AR Solutions Logo"
                width={120}
                height={70}
                className=" w-auto"
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

          {/* Desktop Search Component */}
          <div className="hidden md:block">
            <SearchComponent />
          </div>

          {/* Mobile Search and Hamburger */}
          <div className="md:hidden flex items-center space-x-2">
            <SearchComponent />
            <motion.button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C79D6D]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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

export default Navigation;
