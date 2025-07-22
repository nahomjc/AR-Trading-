"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CPUAnimation = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Define connection points around the CPU
  const connectionPoints = [
    { x: 50, y: 50, startX: 20, startY: 20 }, // Top-left
    { x: 250, y: 50, startX: 280, startY: 20 }, // Top-right
    { x: 50, y: 250, startX: 20, startY: 280 }, // Bottom-left
    { x: 250, y: 250, startX: 280, startY: 280 }, // Bottom-right
    { x: 150, y: 30, startX: 150, startY: 0 }, // Top-center
    { x: 150, y: 270, startX: 150, startY: 300 }, // Bottom-center
    { x: 30, y: 150, startX: 0, startY: 150 }, // Left-center
    { x: 270, y: 150, startX: 300, startY: 150 }, // Right-center
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative">
        {/* "Powering" Text */}
        <motion.div
          className="absolute -top-20 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <h2 className="text-4xl font-bold gradient-text font-poppins tracking-wider">
            POWERING
          </h2>
        </motion.div>

        {/* SVG Container for Lines and CPU */}
        <svg
          width="300"
          height="300"
          viewBox="0 0 300 300"
          className="relative z-10"
        >
          {/* Define gradients for animated lines */}
          <defs>
            <linearGradient
              id="flowGradient1"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 1)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0)" />
            </linearGradient>
            <linearGradient
              id="flowGradient2"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0)" />
              <stop offset="50%" stopColor="rgba(16, 185, 129, 1)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
            </linearGradient>
            <linearGradient
              id="flowGradient3"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(147, 51, 234, 0)" />
              <stop offset="50%" stopColor="rgba(147, 51, 234, 1)" />
              <stop offset="100%" stopColor="rgba(236, 72, 153, 0)" />
            </linearGradient>

            {/* Animated gradient that moves along the line */}
            <linearGradient id="animatedGradient">
              <motion.stop
                offset="0%"
                stopColor="rgba(59, 130, 246, 0)"
                animate={{
                  stopColor: [
                    "rgba(59, 130, 246, 0)",
                    "rgba(59, 130, 246, 1)",
                    "rgba(147, 51, 234, 1)",
                    "rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.stop
                offset="50%"
                stopColor="rgba(59, 130, 246, 1)"
                animate={{
                  stopColor: [
                    "rgba(59, 130, 246, 1)",
                    "rgba(147, 51, 234, 1)",
                    "rgba(236, 72, 153, 1)",
                    "rgba(59, 130, 246, 1)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.5,
                }}
              />
              <motion.stop
                offset="100%"
                stopColor="rgba(147, 51, 234, 0)"
                animate={{
                  stopColor: [
                    "rgba(147, 51, 234, 0)",
                    "rgba(236, 72, 153, 1)",
                    "rgba(16, 185, 129, 1)",
                    "rgba(147, 51, 234, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 1,
                }}
              />
            </linearGradient>
          </defs>

          {/* Base connection lines */}
          {connectionPoints.map((point, index) => (
            <motion.line
              key={`base-${index}`}
              x1={point.startX}
              y1={point.startY}
              x2={point.x}
              y2={point.y}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 1.5,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Animated gradient lines */}
          {connectionPoints.map((point, index) => (
            <motion.line
              key={`animated-${index}`}
              x1={point.startX}
              y1={point.startY}
              x2={point.x}
              y2={point.y}
              stroke="url(#animatedGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: index * 0.2 + 1,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* CPU Chip in the center */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {/* CPU Main Body */}
            <rect
              x="120"
              y="120"
              width="60"
              height="60"
              rx="8"
              fill="url(#cpuGradient)"
              stroke="rgba(59, 130, 246, 0.8)"
              strokeWidth="2"
            />

            {/* CPU Grid Pattern */}
            {[...Array(4)].map((_, row) =>
              [...Array(4)].map((_, col) => (
                <motion.circle
                  key={`${row}-${col}`}
                  cx={130 + col * 10}
                  cy={130 + row * 10}
                  r="1.5"
                  fill="rgba(59, 130, 246, 0.8)"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 2.5 + (row * 4 + col) * 0.05,
                  }}
                />
              ))
            )}

            {/* CPU Pins */}
            {[...Array(8)].map((_, i) => (
              <motion.rect
                key={`pin-top-${i}`}
                x={125 + i * 6}
                y="115"
                width="2"
                height="5"
                fill="rgba(156, 163, 175, 0.8)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2, delay: 2.2 + i * 0.05 }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.rect
                key={`pin-bottom-${i}`}
                x={125 + i * 6}
                y="180"
                width="2"
                height="5"
                fill="rgba(156, 163, 175, 0.8)"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.2, delay: 2.3 + i * 0.05 }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.rect
                key={`pin-left-${i}`}
                x="115"
                y={125 + i * 6}
                width="5"
                height="2"
                fill="rgba(156, 163, 175, 0.8)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, delay: 2.4 + i * 0.05 }}
              />
            ))}
            {[...Array(8)].map((_, i) => (
              <motion.rect
                key={`pin-right-${i}`}
                x="180"
                y={125 + i * 6}
                width="5"
                height="2"
                fill="rgba(156, 163, 175, 0.8)"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.2, delay: 2.5 + i * 0.05 }}
              />
            ))}
          </motion.g>

          {/* Additional gradient definitions */}
          <defs>
            <linearGradient
              id="cpuGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(17, 24, 39, 0.9)" />
              <stop offset="50%" stopColor="rgba(31, 41, 55, 0.9)" />
              <stop offset="100%" stopColor="rgba(17, 24, 39, 0.9)" />
            </linearGradient>
          </defs>

          {/* Pulsing rings around CPU */}
          {[1, 2, 3].map((ring) => (
            <motion.circle
              key={ring}
              cx="150"
              cy="150"
              r={40 + ring * 15}
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.2, 1],
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: ring * 0.5 + 3,
                ease: "easeOut",
              }}
            />
          ))}
        </svg>

        {/* Data Flow Particles */}
        {connectionPoints.map((point, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            style={{
              left: point.startX - 4,
              top: point.startY - 4,
            }}
            animate={{
              x: point.x - point.startX,
              y: point.y - point.startY,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3 + 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CPUAnimation;
