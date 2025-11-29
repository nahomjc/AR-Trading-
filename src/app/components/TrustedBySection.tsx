"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconX } from "@tabler/icons-react";

const TrustedBySection = () => {
  const [selectedClient, setSelectedClient] = useState<
    (typeof clients)[0] | null
  >(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        typeof window !== "undefined" &&
          /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const clients = [
    {
      name: "Olfine",
      logo: "/img/client/Olfine-Logo-White.png",
      width: 180,
    },
    {
      name: "Happiness",
      logo: "/img/client/happiness_logo.png",
      width: 160,
    },
    {
      name: "Partner",
      logo: "/img/client/image-removebg-preview.png",
      width: 170,
    },
  ];

  const handleCardClick = (
    client: (typeof clients)[0],
    event: React.MouseEvent
  ) => {
    setSelectedClient(client);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
    setShowConfetti(false);
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#C79D6D]/20 via-[#d4a574]/20 to-[#C79D6D]/20 backdrop-blur-sm border border-[#C79D6D]/30 rounded-full text-[#C79D6D] text-sm font-semibold mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-2 h-2 bg-[#C79D6D] rounded-full mr-3 animate-pulse"></div>
            Trusted Partners
            <div className="w-2 h-2 bg-[#C79D6D] rounded-full ml-3 animate-pulse"></div>
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Trusted By{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            We're proud to work with leading brands and organizations that trust
            us to deliver exceptional results.
          </motion.p>
        </motion.div>

        {/* Client Logos Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 lg:gap-16">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="relative group/logo cursor-pointer"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleCardClick(client, e)}
            >
              {/* Client Logo Card */}
              <div className="relative h-36 w-56 sm:h-40 sm:w-64 lg:h-44 lg:w-72 flex items-center justify-center p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 group-hover/logo:border-[#C79D6D]/40 group-hover/logo:bg-white/10 transition-all duration-500 shadow-lg group-hover/logo:shadow-xl group-hover/logo:shadow-[#C79D6D]/20">
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={client.width}
                  height={100}
                  className="object-contain max-h-24 sm:max-h-28 lg:max-h-32 w-auto opacity-70 group-hover/logo:opacity-100 transition-opacity duration-300 filter brightness-0 invert group-hover/logo:brightness-100 group-hover/logo:invert-0"
                />

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/20 via-[#d4a574]/20 to-[#C79D6D]/20 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 rounded-2xl transform -skew-x-12 group-hover/logo:animate-shine"></div>

                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#C79D6D]/30 rounded-tl-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#C79D6D]/30 rounded-tr-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#C79D6D]/30 rounded-bl-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#C79D6D]/30 rounded-br-lg opacity-0 group-hover/logo:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Pulse Ring Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-[#C79D6D]/20 rounded-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative w-32 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/50 to-transparent">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#C79D6D] rounded-full"></div>
          </div>
        </motion.div>
      </div>

      {/* Confetti Component */}
      {showConfetti && <ConfettiExplosion isMobile={isMobile} />}

      {/* Partner Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 overflow-y-auto"
            onClick={handleCloseModal}
            style={{ scrollBehavior: "smooth" }}
          >
            {/* Backdrop - Reduced blur on mobile */}
            <div
              className={`absolute inset-0 bg-black/80 ${
                isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
              }`}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{
                type: isMobile ? "tween" : "spring",
                damping: isMobile ? 30 : 25,
                stiffness: isMobile ? 200 : 300,
                duration: isMobile ? 0.3 : undefined,
              }}
              className="relative bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] border border-[#C79D6D]/30 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden backdrop-blur-xl my-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ willChange: "transform" }}
            >
              {/* Animated Background Particles - Reduced on mobile */}
              {!isMobile && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={`particle-${i}`}
                      className="absolute w-1 h-1 bg-[#C79D6D] rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Animated Border Glow - Simplified on mobile */}
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(45deg, #C79D6D, #d4a574, #C79D6D)",
                    backgroundSize: "200% 200%",
                    opacity: 0.3,
                    filter: "blur(20px)",
                    zIndex: -1,
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              )}

              {/* Close Button */}
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseModal();
                }}
                className="absolute top-4 right-4 w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:text-[#C79D6D] transition-all duration-300 border border-white/10 hover:border-[#C79D6D]/40 z-50 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                style={{ pointerEvents: "auto" }}
              >
                <IconX className="w-5 h-5 pointer-events-none" />
              </motion.button>

              {/* Modal Content */}
              <div className="p-8 sm:p-12 text-center space-y-8 relative z-0">
                {/* Proud Message with Celebration Icon */}
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <motion.div
                    className="text-5xl mb-4"
                    animate={{
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 0.5,
                      delay: 0.4,
                    }}
                  >
                    🎉
                  </motion.div>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-outfit">
                    Proud to Work With
                  </h3>
                  <motion.div
                    className="w-32 h-1 bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "8rem" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </motion.div>

                {/* Company Logo with Enhanced Effects */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.3,
                    rotate: isMobile ? 0 : -180,
                  }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    delay: 0.4,
                    type: "spring",
                    stiffness: isMobile ? 100 : 200,
                    damping: isMobile ? 20 : 15,
                  }}
                  className="flex justify-center"
                >
                  <div className="relative p-10 bg-gradient-to-br from-white/15 via-white/8 to-white/15 rounded-3xl border-2 border-[#C79D6D]/30 backdrop-blur-sm shadow-2xl">
                    {/* Rotating Ring - Disabled on mobile */}
                    {!isMobile && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-2 border-[#C79D6D]/20"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 20,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    )}
                    <Image
                      src={selectedClient.logo}
                      alt={`${selectedClient.name} Logo`}
                      width={selectedClient.width * 1.8}
                      height={180}
                      className="object-contain max-h-40 sm:max-h-48 w-auto relative z-10"
                    />
                    {/* Enhanced Glow Effect - Static on mobile */}
                    {isMobile ? (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/30 via-[#d4a574]/30 to-[#C79D6D]/30 blur-3xl opacity-50 -z-10 rounded-3xl" />
                    ) : (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/30 via-[#d4a574]/30 to-[#C79D6D]/30 blur-3xl opacity-60 -z-10 rounded-3xl"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Company Name with Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {isMobile ? (
                    <h4 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#C79D6D] via-[#FFD700] to-[#d4a574] bg-clip-text text-transparent font-outfit">
                      {selectedClient.name}
                    </h4>
                  ) : (
                    <motion.h4
                      className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[#C79D6D] via-[#FFD700] to-[#d4a574] bg-clip-text text-transparent font-outfit"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                      style={{
                        backgroundSize: "200% 200%",
                      }}
                    >
                      {selectedClient.name}
                    </motion.h4>
                  )}
                </motion.div>

                {/* Enhanced Decorative Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7, type: "spring" }}
                  className="flex justify-center gap-3 items-center"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={`star-${i}`}
                      className="text-2xl"
                      initial={{ scale: 0, rotate: 0 }}
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    >
                      ⭐
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Confetti Explosion Component
const ConfettiExplosion = ({ isMobile }: { isMobile: boolean }) => {
  const [windowHeight, setWindowHeight] = useState(1000);
  const [windowWidth, setWindowWidth] = useState(1000);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    }
  }, []);

  const colors = [
    "#C79D6D",
    "#d4a574",
    "#FFD700",
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#FF9FF3",
    "#54A0FF",
    "#5F27CD",
  ];

  // Create multiple types of confetti pieces - Reduced on mobile
  const createConfetti = () => {
    const pieces = [];
    const centerX = windowWidth / 2;
    const centerY = windowHeight / 2;

    // Reduced particle count on mobile
    const burstCount = isMobile ? 20 : 100;
    const fallCount = isMobile ? 15 : 80;

    // Burst from center
    for (let i = 0; i < burstCount; i++) {
      const angle = (Math.PI * 2 * i) / burstCount;
      const velocity = 300 + Math.random() * 200;
      const distance = velocity * (1.5 + Math.random());

      pieces.push({
        id: `burst-${i}`,
        type: Math.random() > 0.5 ? "circle" : "rect",
        color: colors[Math.floor(Math.random() * colors.length)],
        size: isMobile ? 4 + Math.random() * 4 : 6 + Math.random() * 8,
        startX: centerX,
        startY: centerY,
        endX: centerX + Math.cos(angle) * distance,
        endY: centerY + Math.sin(angle) * distance + Math.random() * 200,
        rotation:
          Math.random() * (isMobile ? 180 : 720) - (isMobile ? 90 : 360),
        delay: Math.random() * 0.2,
        duration: isMobile ? 1 + Math.random() * 0.5 : 1.5 + Math.random() * 1,
      });
    }

    // Falling confetti from top
    for (let i = 0; i < fallCount; i++) {
      pieces.push({
        id: `fall-${i}`,
        type: Math.random() > 0.6 ? "circle" : "rect",
        color: colors[Math.floor(Math.random() * colors.length)],
        size: isMobile ? 3 + Math.random() * 3 : 5 + Math.random() * 6,
        startX: Math.random() * windowWidth,
        startY: -20,
        endX: (Math.random() - 0.5) * (isMobile ? 150 : 300),
        endY: windowHeight + 100,
        rotation:
          Math.random() * (isMobile ? 180 : 720) - (isMobile ? 90 : 360),
        delay: 0.3 + Math.random() * 0.5,
        duration: isMobile ? 1.5 + Math.random() * 1 : 2 + Math.random() * 1.5,
      });
    }

    return pieces;
  };

  const confettiPieces = createConfetti();

  return (
    <div className="fixed inset-0 pointer-events-none z-[10001] overflow-hidden">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.startX}px`,
            top: `${piece.startY}px`,
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height:
              piece.type === "circle"
                ? `${piece.size}px`
                : `${piece.size * 0.6}px`,
            borderRadius: piece.type === "circle" ? "50%" : "2px",
            boxShadow: isMobile ? "none" : `0 0 ${piece.size}px ${piece.color}`,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            opacity: 1,
            scale: 1,
          }}
          animate={{
            x: piece.endX,
            y: piece.endY,
            rotate: piece.rotation,
            opacity: [1, 1, 0.8, 0],
            scale: [1, 1.2, 0.8, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      ))}

      {/* Sparkle effects - Reduced on mobile */}
      {!isMobile &&
        [...Array(20)].map((_, i) => (
          <motion.div
            key={`sparkle-${i}`}
            className="absolute w-2 h-2"
            style={{
              left: `${50 + (Math.random() - 0.5) * 20}%`,
              top: `${50 + (Math.random() - 0.5) * 20}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: 2,
              ease: "easeOut",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-[#C79D6D] to-[#FFD700] rounded-full blur-sm"></div>
          </motion.div>
        ))}
    </div>
  );
};

export default TrustedBySection;
