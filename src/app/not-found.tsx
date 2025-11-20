"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconHome, IconArrowLeft, IconSearch } from "@tabler/icons-react";
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

      <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl mx-auto w-full text-center">
          {/* 404 Number with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-[120px] sm:text-[180px] md:text-[220px] font-bold font-growth bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#C69c6c] bg-clip-text text-transparent leading-none">
              404
            </h1>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 font-growth">
              Page Not Found
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-growth">
              Oops! The page you're looking for seems to have drifted into the
              digital void. Let's get you back on track.
            </p>
          </motion.div>

          {/* Animated Elements */}
          <motion.div
            className="flex justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/">
              <motion.button
                className="group relative px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-semibold rounded-lg overflow-hidden font-growth shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <IconHome className="relative z-10 w-5 h-5" />
                <span className="relative z-10">Go Home</span>
              </motion.button>
            </Link>

            <motion.button
              onClick={() => window.history.back()}
              className="group px-8 py-4 bg-[#08243A]/80 backdrop-blur-md border border-[#C69c6c]/30 text-white font-semibold rounded-lg font-growth hover:border-[#C69c6c]/60 hover:bg-[#08243A]/90 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconArrowLeft className="w-5 h-5" />
              <span>Go Back</span>
            </motion.button>
          </motion.div>

          {/* Additional Help Text */}
          <motion.div
            className="mt-12 text-gray-400 text-sm sm:text-base font-growth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="mb-4">Or try searching for what you need:</p>
            <Link
              href="/#home"
              className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#8b5cf6] transition-colors duration-300"
            >
              <IconSearch className="w-4 h-4" />
              <span>Search our site</span>
            </Link>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/8 w-32 h-32 bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-24 h-24 bg-gradient-to-r from-[#C69c6c]/20 to-[#8b5cf6]/20 rounded-full blur-2xl"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
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
      </main>

      <Footer />
      {isDesktop && <CustomCursor />}
    </div>
  );
}

