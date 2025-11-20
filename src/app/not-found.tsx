"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconHome, IconArrowLeft, IconSearch, IconWorld } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./components/Navigation"), {
  ssr: false,
});
const Footer = dynamic(() => import("./components/Footer"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("./components/CustomCursor"), {
  ssr: false,
});

export default function NotFound() {
  const isDesktop =
    typeof window !== "undefined" &&
    window.innerWidth >= 1024 &&
    !/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ cursor: isDesktop ? "none" : undefined }}
    >
      {/* Galaxy Background */}
      <div className="galaxy-bg"></div>
      <div className="stars">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <Navigation />

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-5xl mx-auto w-full">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>

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

          <div className="relative z-10 text-center">
            {/* 404 Number */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-[100px] sm:text-[150px] md:text-[180px] font-bold font-outfit text-[#C79D6D] leading-none">
                404
              </h1>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium font-growth">
                Page Not Found
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-6"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-outfit text-white mb-4">
                Lost in the Digital Space
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-growth">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track.
              </p>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { number: "404", label: "Error" },
                { number: "0", label: "Results" },
                { number: "∞", label: "Possibilities" },
                { number: "1", label: "Solution" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stats-card-professional text-center p-4 rounded-xl"
                  whileHover={{ scale: 1.05, y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 300
                  }}
                >
                  <div className="text-2xl font-bold text-[#C79D6D] mb-1 font-outfit">
                    {stat.number}
                  </div>
                  <div className="text-[#C69c6c] text-xs font-medium font-growth">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Link href="/">
                <motion.button
                  className="btn-professional-primary px-8 py-4 text-white font-semibold rounded-xl font-growth flex items-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconHome className="w-5 h-5" />
                  <span>Go Home</span>
                </motion.button>
              </Link>

              <motion.button
                onClick={() => window.history.back()}
                className="btn-professional-secondary px-8 py-4 text-white font-semibold rounded-xl font-growth flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <IconArrowLeft className="w-5 h-5" />
                <span>Go Back</span>
              </motion.button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p className="text-gray-400 mb-4 font-growth">Or explore our site:</p>
              <div className="flex flex-wrap justify-center gap-4">
                {[
                  { href: "/#home", label: "Home" },
                  { href: "/#services", label: "Services" },
                  { href: "/#about", label: "About" },
                  { href: "/#contact", label: "Contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 glass-dark rounded-lg text-gray-300 hover:text-[#C69c6c] transition-colors duration-300 font-growth text-sm"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
            <motion.div
              className="absolute top-1/4 left-1/8 w-16 h-16 floating-element rounded-full flex items-center justify-center"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconWorld className="w-5 h-5 text-[#C69c6c]" />
            </motion.div>
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
          </div>
        </div>
      </main>

      <Footer />
      {isDesktop && <CustomCursor />}
    </div>
  );
}

