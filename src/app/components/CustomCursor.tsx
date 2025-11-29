"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Custom Creative Cursor Component
const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const rafId = useRef<number | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let throttleTimeout: NodeJS.Timeout | null = null;
    const throttleDelay = 16; // ~60fps

    const updateCursor = () => {
      const { x, y } = lastPosRef.current;
      if (cursorRef.current && ringRef.current) {
        cursorRef.current.style.transform = `translate3d(${x - 8}px, ${
          y - 8
        }px, 0)`;
        ringRef.current.style.transform = `translate3d(${x - 16}px, ${
          y - 16
        }px, 0)`;
      }
      rafId.current = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(updateCursor);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      // Throttle hover detection to reduce re-renders
      if (throttleTimeout) return;
      
      throttleTimeout = setTimeout(() => {
        const target = e.target as HTMLElement;
        setIsHovering(
          target.tagName === "A" ||
            target.tagName === "BUTTON" ||
            !!target.closest("a, button, .hover-lift, .mirror-card")
        );
        throttleTimeout = null;
      }, throttleDelay);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
    };
  }, []);

  return (
    <>
      {/* Main cursor dot - optimized with direct CSS transforms */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full shadow-lg"
          style={{
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)
            `,
          }}
        />
      </motion.div>

      {/* Outer ring - simplified animation */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9998] will-change-transform"
        animate={{
          scale: isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full border-2"
          style={{
            borderColor: "rgba(59, 130, 246, 0.5)",
            background: `
              radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Ethiopian star cursor for special elements - only animate when hovering */}
      {isHovering && (
        <motion.div
          className="fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9996] will-change-transform"
          style={{
            x: lastPosRef.current.x - 12,
            y: lastPosRef.current.y - 12,
          }}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1.3, rotate: 360 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <radialGradient id="starGradient" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="50%" stopColor="rgba(139, 92, 246, 0.8)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0.9)" />
              </radialGradient>
            </defs>
            <path
              d="M12 2L14.09 8.26L22 9L16 14.14L17.18 22.02L12 18.77L6.82 22.02L8 14.14L2 9L9.91 8.26L12 2Z"
              fill="url(#starGradient)"
              stroke="rgba(59, 130, 246, 0.6)"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
