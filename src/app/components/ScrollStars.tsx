"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
  twinkleSpeed: number;
  layer: number; // Different layers for depth
}

const ScrollStars = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Generate many stars for a galaxy effect
    const generateStars = () => {
      const newStars: Star[] = [];
      const starColors = [
        "#ffffff", // White
        "#b3d9ff", // Light blue
        "#ffd9b3", // Light orange
        "#ffb3b3", // Light red
        "#e6b3ff", // Light purple
        "#b3ffb3", // Light green
        "#ffffb3", // Light yellow
        "#ffccff", // Pink
        "#ccffff", // Cyan
      ];

      // Generate 60 stars for a lighter galaxy effect
      for (let i = 0; i < 60; i++) {
        const size = Math.random() * 4 + 0.5;
        const layer = Math.floor(Math.random() * 5) + 1;
        newStars.push({
          id: i,
          x: Math.random() * (window.innerWidth + 400) - 200,
          y: Math.random() * (window.innerHeight * 6),
          size: size,
          opacity: Math.random() * 0.8 + 0.2,
          speed: (Math.random() * 0.8 + 0.1) * layer,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 2 + 1,
          layer: layer,
        });
      }
      // Add some larger "nebula" stars (reduce to 5)
      for (let i = 60; i < 65; i++) {
        newStars.push({
          id: i,
          x: Math.random() * (window.innerWidth + 600) - 300,
          y: Math.random() * (window.innerHeight * 6),
          size: Math.random() * 12 + 3,
          opacity: Math.random() * 0.3 + 0.05,
          speed: Math.random() * 0.2 + 0.02,
          color: "#b3d9ff",
          twinkleSpeed: Math.random() * 0.5 + 0.2,
          layer: 1,
        });
      }

      setStars(newStars);
    };

    generateStars();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Create transform values for different star layers
  const starLayer1Y = useTransform(scrollY, [0, 1000], [0, -200]);
  const starLayer2Y = useTransform(scrollY, [0, 1000], [0, -400]);
  const starLayer3Y = useTransform(scrollY, [0, 1000], [0, -600]);
  const starLayer4Y = useTransform(scrollY, [0, 1000], [0, -800]);
  const starLayer5Y = useTransform(scrollY, [0, 1000], [0, -1000]);

  const starLayer1X = useTransform(scrollY, [0, 1000], [0, -100]);
  const starLayer2X = useTransform(scrollY, [0, 1000], [0, -150]);
  const starLayer3X = useTransform(scrollY, [0, 1000], [0, -200]);
  const starLayer4X = useTransform(scrollY, [0, 1000], [0, -250]);
  const starLayer5X = useTransform(scrollY, [0, 1000], [0, -300]);

  // Galaxy spiral rotation
  const galaxyRotation = useTransform(scrollY, [0, 2000], [0, 360]);
  const galaxyY = useTransform(scrollY, [0, 1000], [0, -500]);

  const getLayerTransforms = (layer: number) => {
    switch (layer) {
      case 1:
        return { x: starLayer1X, y: starLayer1Y };
      case 2:
        return { x: starLayer2X, y: starLayer2Y };
      case 3:
        return { x: starLayer3X, y: starLayer3Y };
      case 4:
        return { x: starLayer4X, y: starLayer4Y };
      case 5:
        return { x: starLayer5X, y: starLayer5Y };
      default:
        return { x: starLayer3X, y: starLayer3Y };
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Animated Galaxy Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          y: galaxyY,
          rotate: galaxyRotation,
        }}
      >
        <div
          className="absolute w-full h-full opacity-20"
          style={{
            background: `
              radial-gradient(ellipse 1200px 600px at 30% 40%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 800px 400px at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
              radial-gradient(ellipse 1000px 200px at 50% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 600px 300px at 20% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)
            `,
          }}
        />
      </motion.div>

      {/* Animated Stars with Parallax */}
      {stars.map((star) => {
        const { x: layerX, y: layerY } = getLayerTransforms(star.layer);

        return (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              left: star.x,
              top: star.y,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              opacity: star.opacity,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
              x: layerX,
              y: layerY,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [star.opacity * 0.7, star.opacity, star.opacity * 0.7],
            }}
            transition={{
              duration: 3 / star.twinkleSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: star.id * 0.1,
            }}
            whileInView={{
              scale: [1, 1.1, 1],
            }}
          />
        );
      })}

      {/* Enhanced Shooting Stars */}
      <div className="absolute inset-0">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${10 + i * 40}%`,
              top: `${5 + i * 40}%`,
              background: `linear-gradient(45deg, white, ${
                ["#b3d9ff", "#ffd9b3"][i]
              })`,
            }}
            animate={{
              x: [0, 200, 400],
              y: [0, 200, 400],
              opacity: [0, 1, 1, 0],
              scale: [0.5, 1, 1.5, 0],
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              delay: i * 4,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Floating Cosmic Dust */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: useTransform(scrollY, [0, 1000], [0, -150]) }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`dust-${i}`}
            className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ScrollStars;
