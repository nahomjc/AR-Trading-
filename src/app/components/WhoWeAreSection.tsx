"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";

// const TeamSection = dynamic(() => import("../TeamSection"), { ssr: false });

// Who We Are Section
const WhoWeAreSection = () => {
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Handle about section highlighting from search
  useEffect(() => {
    // Check if there's a highlighted about from search
    const storedAbout = sessionStorage.getItem("highlightAbout");
    if (storedAbout) {
      setIsHighlighted(true);
      // Clear the stored value after a delay
      setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightAbout");
      }, 3000); // Highlight for 3 seconds
    }

    // Listen for highlight events from search
    const handleHighlightAbout = () => {
      setIsHighlighted(true);
      // Clear highlight after 3 seconds
      setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
    };

    window.addEventListener("highlightAbout", handleHighlightAbout);

    return () => {
      window.removeEventListener("highlightAbout", handleHighlightAbout);
    };
  }, []);

  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
          alt="About section background"
          fill
          className="object-cover opacity-15"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08243A]/98 via-[#0a2a42]/95 to-[#08243A]/98"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-sm font-medium mb-6">
            About Our Company
          </span>
          <h2 className="text-4xl sm:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Excellence. Innovation. Results.
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Founded in 2016, AR Solutions is a premier digital marketing and
            creative agency transforming Ethiopian businesses through strategic
            innovation and exceptional execution. We don't just follow trends —
            we create trends, build digital experiences that connect
            emotionally, perform technically, and deliver measurable results. We
            are a full-service agency trusted to help brands stand out and
            succeed online and offline.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className={`mirror-card p-8 lg:p-12 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border transition-all duration-500 ${
              isHighlighted
                ? "border-[#C69c6c] shadow-lg shadow-[#C69c6c]/30 animate-pulse"
                : "border-[#C69c6c]/30"
            }`}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold font-outfit mb-6 text-white">
              Our Mission & Vision
            </h3>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              To lead Ethiopia's digital transformation by delivering creative,
              practical, and measurable marketing solutions for every business
              size — from startups to established brands.
            </p>
            <div className="mb-8">
              <span className="inline-block text-2xl mr-2 align-middle">
                💡
              </span>
              <span className="font-bold text-white text-lg align-middle">
                Our Purpose
              </span>
              <p className="text-lg text-gray-300 mt-2 leading-relaxed">
                We exist to elevate Ethiopian brands with strategy, creativity,
                and heart. Whether you're launching a new brand or refreshing
                your digital presence, we design solutions that align with your
                goals — and exceed expectations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">50+</div>
                <div className="text-gray-300 text-sm">Projects</div>
              </motion.div>
              <motion.div
                className="text-center p-4 glass-dark rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-3xl font-bold gradient-text mb-2">10+</div>
                <div className="text-gray-300 text-sm">Clients</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Professional Image Container */}
              <div className="mirror-card p-4 bg-gradient-to-br from-[#C69c6c]/10 via-[#d4a574]/10 to-[#C69c6c]/10 border border-[#C69c6c]/30 rounded-2xl overflow-hidden">
                <Image
                  src="/img/about-us-11.png"
                  alt="Professional team collaboration and digital excellence"
                  width={600}
                  height={600}
                  className="w-full h-auto object-contain rounded-xl"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 500px"
                />
              </div>

              {/* Floating Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#C69c6c]/20 to-[#d4a574]/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.6, 0.3, 0.6],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />

              {/* Professional Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-gradient-to-r from-[#C69c6c] to-[#d4a574] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Professional Excellence
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mt-20">{/* <TeamSection /> */}</div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
