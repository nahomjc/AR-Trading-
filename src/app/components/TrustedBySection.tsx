"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const TrustedBySection = () => {
  const clients = [
    {
      name: "Olfine",
      logo: "/img/client/Olfine-Logo-White.png",
      width: 140,
    },
    {
      name: "Happiness",
      logo: "/img/client/happiness_logo.png",
      width: 120,
    },
    {
      name: "Partner",
      logo: "/img/client/image-removebg-preview.png",
      width: 130,
    },
  ];

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
              key={index}
              className="relative group/logo"
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
            >
              {/* Client Logo Card */}
              <div className="relative h-28 w-48 sm:h-32 sm:w-56 flex items-center justify-center p-6 bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/10 group-hover/logo:border-[#C79D6D]/40 group-hover/logo:bg-white/10 transition-all duration-500 shadow-lg group-hover/logo:shadow-xl group-hover/logo:shadow-[#C79D6D]/20">
                <Image
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  width={client.width}
                  height={80}
                  className="object-contain max-h-16 sm:max-h-20 w-auto opacity-70 group-hover/logo:opacity-100 transition-opacity duration-300 filter brightness-0 invert group-hover/logo:brightness-100 group-hover/logo:invert-0"
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
    </section>
  );
};

export default TrustedBySection;

