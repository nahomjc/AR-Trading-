"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconCode,
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconPhone,
  IconCopy,
  IconBrandWhatsapp,
  IconMail,
  IconCheck,
  IconX,
} from "@tabler/icons-react";

// Services Section
const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const companyPhone = "+251 981668976";
  const companyEmail = "artradingplc@gmail.com";

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(companyPhone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy phone number:", err);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `Hello! I'm interested in your services. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/251981668976?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const services = [
    {
      title: "Advertising & Printing",
      description:
        "From banners to merchandise, we design and print with impact.",
      icon: IconPrinter,
      color: "from-orange-500/20 to-red-500/20",
      iconColor: "text-orange-400",
      features: [
        "Banner & Sticker Design",
        "Vehicle Branding",
        "Office Branding",
        "Merchandise & Promotional Items",
      ],
      subtitle: "Our Services:",
      buttonText: "Get a Quote",
    },
    {
      title: "Digital Marketing",
      description:
        "Connect with your audience through data-driven marketing that delivers measurable results.",
      icon: IconChartLine,
      color: "from-blue-500/20 to-purple-500/20",
      iconColor: "text-blue-400",
      features: [
        "Social Media Management",
        "Paid Advertising",
        "SEO Strategy",
        "Influencer Marketing",
      ],
      subtitle: "Our Services:",
      buttonText: "Get a Quote",
    },
    {
      title: "Branding & Design",
      description:
        "Creating unique brand identities with attractive logos, clear strategy, and visual content that set you apart.",
      icon: IconPalette,
      color: "from-pink-500/20 to-purple-500/20",
      iconColor: "text-pink-400",
      features: [
        "Logo Design",
        "Brand Identity & Strategy",
        "Visual Strategy",
        "Creative Contents",
      ],
      subtitle: "Our Services:",
      buttonText: "Start Your Brand Journey",
    },
    {
      title: "Media Production",
      description:
        "Bring your story to life through visuals that inspire action.",
      icon: IconVideo,
      color: "from-green-500/20 to-teal-500/20",
      iconColor: "text-green-400",
      features: [
        "Videography & Photography",
        "Promotional Contents & Videos",
        "Video Editing",
        "Post-Production",
      ],
      subtitle: "Our Services:",
      buttonText: "Work with Our Media Team",
    },
    {
      title: "Web Development",
      description:
        "Modern, responsive, and SEO-friendly websites built to perform.",
      icon: IconWorld,
      color: "from-cyan-500/20 to-blue-500/20",
      iconColor: "text-cyan-400",
      features: [
        "Website Design and Development",
        "Maintenance & Updates",
        "SEO Optimization",
      ],
      subtitle: "Our Services:",
      buttonText: "Build Your Website",
    },
    {
      title: "Event Planning",
      description:
        "We create unforgettable experiences for your brand and clients.",
      icon: IconCalendarEvent,
      color: "from-yellow-500/20 to-orange-500/20",
      iconColor: "text-yellow-400",
      features: [
        "Corporate Events",
        "Conferences",
        "Product Launches",
        "Exhibitions",
      ],
      subtitle: "Our Services:",
      buttonText: "Plan Your Event",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  // Scroll modal into view when it opens
  useEffect(() => {
    if (isModalOpen) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        const modal = document.querySelector("[data-modal-content]");
        if (modal) {
          modal.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  }, [isModalOpen]);

  return (
    <section
      id="services"
      className="py-20 sm:py-32 px-2 sm:px-4 lg:px-8 relative overflow-hidden"
      style={{ touchAction: "pan-y", contain: "layout style paint" }}
    >
      {/* Creative Background Elements - Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none will-change-contents">
        {/* Animated Gradient Orbs - Reduced blur and optimized */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/20 rounded-full blur-2xl will-change-transform"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(0)" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-2xl will-change-transform"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{ transform: "translateZ(0)" }}
        />

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, rgba(199,157,109,0.3) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
              linear-gradient(rgba(199,157,109,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(199,157,109,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
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
            Services & Offerings
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            What We Offer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our full range of creative and digital solutions — designed
            to grow your business and help your brand stand out.
          </p>
        </motion.div>

        {/* Enhanced Services Display with Slideshow */}
        <div className="relative">
          {/* Main Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className={`relative overflow-hidden rounded-2xl p-8 group transition-all duration-500 touch-pan-y ${
                  index === activeIndex
                    ? "bg-gradient-to-br from-[#C69c6c]/20 via-[#d4a574]/20 to-[#C69c6c]/20 border-2 border-[#C69c6c]/50 shadow-2xl shadow-[#C69c6c]/20"
                    : "bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 hover:border-[#C69c6c]/30"
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Creative Animated Background - Optimized */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none will-change-transform`}
                  style={{ transform: "translateZ(0)" }}
                  animate={{
                    scale: index === activeIndex ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat:
                      index === activeIndex ? Number.POSITIVE_INFINITY : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Animated Gradient Mesh - Optimized */}
                <motion.div
                  className="absolute inset-0 opacity-20 group-hover:opacity-30 pointer-events-none will-change-transform"
                  style={{
                    background: `radial-gradient(circle at ${
                      index % 2 === 0 ? "20%" : "80"
                    }% ${
                      index % 3 === 0 ? "30%" : "70%"
                    }, rgba(199,157,109,0.2), transparent 60%)`,
                    transform: "translateZ(0)",
                  }}
                  animate={{
                    x: [0, 20, 0],
                    y: [0, 15, 0],
                  }}
                  transition={{
                    duration: 8 + index,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Floating Particles Effect - Reduced for performance */}
                {index === activeIndex &&
                  [...Array(2)].map((particle, particleIdx) => (
                    <motion.div
                      key={`particle-${service.title}-${particleIdx}`}
                      className="absolute w-2 h-2 bg-[#C79D6D]/30 rounded-full blur-sm pointer-events-none will-change-transform"
                      style={{
                        left: `${20 + particleIdx * 30}%`,
                        top: `${30 + particleIdx * 20}%`,
                        transform: "translateZ(0)",
                      }}
                      animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 4 + particleIdx,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: particleIdx * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                {/* Geometric Shapes - Only animate on hover for performance */}
                <motion.div
                  className="absolute top-4 right-4 w-20 h-20 border-2 border-[#C79D6D]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform"
                  style={{ transform: "translateZ(0)" }}
                  animate={{
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-16 h-16 border-2 border-[#C79D6D]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none will-change-transform"
                  style={{ transform: "translateZ(0)" }}
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon Container */}
                <div className="relative mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center backdrop-blur-sm border border-white/20`}
                  >
                    {(() => {
                      const IconComponent = service.icon;
                      return (
                        <IconComponent
                          className={`w-8 h-8 ${service.iconColor}`}
                        />
                      );
                    })()}
                  </div>
                </div>

                {/* Content */}
                <div className="relative">
                  <h3 className="text-2xl font-bold font-outfit mb-4 text-white group-hover:text-[#C69c6c] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Subtitle */}
                  {service.subtitle && (
                    <p className="text-[#C69c6c] font-semibold mb-3">
                      {service.subtitle}
                    </p>
                  )}

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#C69c6c] rounded-full" />
                        <span className="text-sm text-gray-300 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Service Button */}
                  <button
                    type="button"
                    className="w-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#C79D6D]/25"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsModalOpen(true);
                    }}
                  >
                    {service.buttonText || "Get a Free Quote"}
                  </button>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#C69c6c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none touch-none"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setIsModalOpen(false)}
            style={{ scrollBehavior: "smooth" }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              data-modal-content
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] border border-[#C79D6D]/30 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden backdrop-blur-xl my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.05] to-transparent backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-[#C79D6D]/30 blur-md rounded-full" />
                      <div className="relative w-3 h-3 rounded-full bg-gradient-to-br from-[#C79D6D] to-[#d4a574] shadow-lg shadow-[#C79D6D]/50" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Get in Touch
                      </h3>
                      <p className="text-xs text-gray-400">
                        Contact us for more information
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
                    className="w-10 h-10 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:text-[#C79D6D] transition-all duration-300 border border-white/10 hover:border-[#C79D6D]/40"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconX className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-4">
                {/* Phone Number */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 rounded-full flex items-center justify-center">
                        <IconPhone className="w-5 h-5 text-[#C79D6D]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">Call Us</p>
                        <p className="text-[#C79D6D] font-mono text-lg">
                          {companyPhone}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      onClick={handleCopyPhone}
                      className="p-2 bg-[#C79D6D]/20 hover:bg-[#C79D6D]/30 rounded-lg transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconCopy className="w-4 h-4 text-[#C79D6D]" />
                    </motion.button>
                  </div>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 text-green-400 text-sm flex items-center"
                    >
                      <IconCheck className="w-4 h-4 mr-1" />
                      Phone number copied!
                    </motion.div>
                  )}
                </div>

                {/* Call Now Button */}
                <motion.a
                  href={`tel:${companyPhone.replace(/\s/g, "")}`}
                  className="w-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconPhone className="w-5 h-5" />
                  <span>Call Now</span>
                </motion.a>

                {/* WhatsApp */}
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconBrandWhatsapp className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </motion.button>

                {/* Email */}
                <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#C79D6D]/20 to-[#d4a574]/20 rounded-full flex items-center justify-center">
                      <IconMail className="w-5 h-5 text-[#C79D6D]" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Email Us</p>
                      <p className="text-[#C79D6D] text-sm">{companyEmail}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesSection;
