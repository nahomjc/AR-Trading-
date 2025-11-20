"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
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
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#08243A" }}
        >
          {/* Animated Background with Gradient Mesh */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"></div>

            {/* Animated Gradient Orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#C79D6D]/20 via-[#C79D6D]/10 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.3, 1.1, 1],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/20 via-blue-500/10 to-transparent rounded-full blur-3xl"
              animate={{
                x: [0, -80, 60, 0],
                y: [0, 80, -40, 0],
                scale: [1, 1.2, 1.05, 1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-transparent rounded-full blur-3xl"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          {/* Subtle Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(199, 157, 109, 0.5) 1px, transparent 0)`,
              backgroundSize: "50px 50px",
            }}
          ></div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with Premium Animation */}
            <motion.div
              className="relative mb-10"
              initial={{ scale: 0, rotate: -180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                duration: 1.2,
              }}
            >
              {/* Glowing Ring Effect */}
              <motion.div
                className="absolute -inset-4 rounded-3xl"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(199, 157, 109, 0.4)",
                    "0 0 40px 20px rgba(199, 157, 109, 0.2)",
                    "0 0 0 0 rgba(199, 157, 109, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Logo Container with Glass Effect */}
              <div className="relative bg-gradient-to-br from-white/20 via-white/15 to-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/30 shadow-2xl">
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />

                <div className="relative">
                  <Image
                    src="/img/White-with-background-removebg-preview.png"
                    alt="AR Solutions Logo"
                    width={300}
                    height={120}
                    className="drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            {/* Company Name with Gradient Text */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-3 px-4"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-[#C79D6D] via-[#d4a574] to-[#C79D6D] bg-clip-text text-transparent animate-gradient">
                  AR Solutions
                </span>
              </motion.h1>
              <motion.p
                className="text-xl sm:text-2xl font-light tracking-[0.2em] px-4 uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <span className="bg-gradient-to-r from-[#C79D6D]/90 via-white/80 to-[#C79D6D]/90 bg-clip-text text-transparent">
                  Marketing Excellence
                </span>
              </motion.p>
            </motion.div>

            {/* Premium Loading Bar */}
            <motion.div
              className="w-80 sm:w-96 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <div className="relative h-2 bg-gradient-to-r from-[#08243A]/50 via-[#0a2a42]/50 to-[#08243A]/50 rounded-full overflow-hidden border border-white/10 backdrop-blur-sm">
                {/* Animated Background Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Progress Fill */}
                <motion.div
                  className="relative h-full rounded-full overflow-hidden"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#C79D6D] via-[#d4a574] to-[#C79D6D]"></div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

              {/* Progress Percentage */}
              <motion.div
                className="text-center mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
              >
                <span className="text-[#C79D6D] font-semibold text-lg">
                  {progress}%
                </span>
              </motion.div>
            </motion.div>

            {/* Status Text with Animation */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <motion.p
                className="text-sm sm:text-base font-medium tracking-wider"
                style={{ color: "#C79D6D" }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Crafting your experience...
              </motion.p>
            </motion.div>
          </div>

          {/* Floating Particles */}
          {[
            { x: "10%", y: "20%" },
            { x: "80%", y: "30%" },
            { x: "20%", y: "70%" },
            { x: "90%", y: "60%" },
            { x: "50%", y: "10%" },
            { x: "40%", y: "80%" },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#C79D6D]/30 rounded-full"
              style={{ left: pos.x, top: pos.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 0.6, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
