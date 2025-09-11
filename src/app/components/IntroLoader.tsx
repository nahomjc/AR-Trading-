"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3500);
    return () => clearTimeout(timer);
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
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "#08243A" }}
        >
          {/* Background with Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#08243A]/40 via-[#08243A]/30 to-[#08243A]/20"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#08243A]/30 via-[#08243A]/20 to-[#08243A]/10 rounded-full blur-3xl"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#08243A]/20 via-[#08243A]/15 to-[#08243A]/10 rounded-full blur-3xl"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with Elegant Animation */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 1,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#08243A]/30 to-[#08243A]/20 rounded-2xl blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <Image
                  src="/img/ars.png"
                  alt="AR Solutions Logo"
                  width={280}
                  height={112}
                  className="drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Company Name */}
            <motion.div
              className="text-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2 px-4"
                style={{ color: "#C79D6D" }}
              >
                AR Solutions
              </h1>
              <p
                className="text-lg sm:text-xl font-light tracking-wider px-4"
                style={{ color: "#C79D6D" }}
              >
                MARKETING EXCELLENCE
              </p>
            </motion.div>

            {/* Elegant Loading Bar */}
            <motion.div
              className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 1.2,
                }}
              />
            </motion.div>

            {/* Status Text */}
            <motion.p
              className="text-sm mt-4 font-medium tracking-wide"
              style={{ color: "#C79D6D" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              Loading your experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
