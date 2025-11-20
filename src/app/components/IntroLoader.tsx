"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing");

  const loadingMessages = [
    "Initializing",
    "Loading Assets",
    "Preparing Experience",
    "Almost Ready",
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        const newProgress = prev + 2;

        // Update loading text based on progress
        if (newProgress < 25) {
          setLoadingText(loadingMessages[0]);
        } else if (newProgress < 50) {
          setLoadingText(loadingMessages[1]);
        } else if (newProgress < 75) {
          setLoadingText(loadingMessages[2]);
        } else {
          setLoadingText(loadingMessages[3]);
        }

        return newProgress;
      });
    }, 70);

    const timer = setTimeout(() => {
      setShow(false);
      clearInterval(progressInterval);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#08243A" }}
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Base Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"></div>

            {/* Animated Lines Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-10">
              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#C79D6D" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#C79D6D" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#C79D6D" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              {[...Array(20)].map((_, i) => (
                <motion.line
                  key={i}
                  x1="0"
                  y1={i * 5 + "%"}
                  x2="100%"
                  y2={i * 5 + "%"}
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </svg>

            {/* Rotating Geometric Shapes */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 border border-[#C79D6D]/20 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-blue-500/20 rounded-full"
              animate={{ rotate: -360, scale: [1, 1.2, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute top-1/2 right-1/3 w-32 h-32 border border-[#C79D6D]/15 rotate-45"
              animate={{ rotate: [45, 405] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto px-4">
            {/* Logo with Minimalist Design */}
            <motion.div
              className="relative mb-12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative">
                {/* Subtle Border Glow */}
                <motion.div
                  className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#C79D6D]/30 via-[#d4a574]/30 to-[#C79D6D]/30 blur-sm"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <Image
                    src="/img/White-with-background-removebg-preview.png"
                    alt="AR Solutions Logo"
                    width={280}
                    height={112}
                    className="drop-shadow-lg"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Company Name - Minimalist Style */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-3"
                initial={{ letterSpacing: "0.1em" }}
                animate={{ letterSpacing: "0.05em" }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <span className="text-white">AR</span>
                <span className="text-[#C79D6D] ml-3">Solutions</span>
              </motion.h1>
              <motion.div
                className="h-px w-32 bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent mx-auto"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ delay: 1, duration: 0.8 }}
              />
              <motion.p
                className="text-sm sm:text-base font-light tracking-[0.3em] mt-4 text-gray-400 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                Marketing Excellence
              </motion.p>
            </motion.div>

            {/* Modern Progress Indicator */}
            <motion.div
              className="w-full max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              {/* Progress Bar Container */}
              <div className="relative h-1 bg-[#08243A]/50 rounded-full overflow-hidden border border-white/5">
                {/* Progress Fill with Gradient */}
                <motion.div
                  className="relative h-full rounded-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C79D6D] to-[#d4a574]"></div>
                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {/* Progress Info */}
              <div className="flex justify-between items-center mt-4">
                <motion.span
                  className="text-[#C79D6D] font-semibold text-sm tracking-wider"
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {loadingText}
                </motion.span>
                <span className="text-gray-500 font-mono text-sm">
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Animated Dots */}
            <motion.div
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-[#C79D6D] rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-[#C79D6D]/20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 border-t border-r border-[#C79D6D]/20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b border-l border-[#C79D6D]/20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-[#C79D6D]/20"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
