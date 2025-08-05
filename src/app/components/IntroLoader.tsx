"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-blue-950 via-cyan-950 to-purple-950"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Futuristic Spinner */}
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {/* Glowing Orbit */}
              <motion.div
                className="absolute w-24 h-24 rounded-full border-4 border-cyan-400/30 animate-spin-slow"
                style={{
                  boxShadow: "0 0 32px 8px #06b6d4aa, 0 0 64px 16px #7c3aed55",
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              />
              {/* Central Logo */}
              <motion.div
                className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 via-blue-600 to-purple-600 flex items-center justify-center shadow-2xl border-4 border-white/10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              >
                <span className="text-3xl font-bold text-white drop-shadow-lg">
                  A
                </span>
              </motion.div>
              {/* Orbiting Dot */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-lg"
                style={{ top: 0, left: "50%", marginLeft: "-8px" }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </motion.div>
            {/* Company Name & Welcome */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl font-extrabold font-outfit bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg mb-2">
                AR Trading PLC
              </h1>
              <p className="text-cyan-100 text-lg sm:text-xl font-medium tracking-wide animate-pulse">
                Welcome to Digital Excellence
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
