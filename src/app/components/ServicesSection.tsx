"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IconCode,
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconWorld,
  IconCalendarEvent,
  IconBook,
} from "@tabler/icons-react";

// Services Section
const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

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
      backgroundImage:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80", // Printing press and paper textures
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
      backgroundImage:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80", // Digital marketing analytics and social media
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
      backgroundImage:
        "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1200&q=80", // Brand design and creative workspace with design tools
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
      backgroundImage:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80", // Camera and video production equipment
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
      backgroundImage:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", // Developer coding and team collaboration
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
      backgroundImage:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80", // Event planning with people networking and stage lighting
    },
    {
      title: "Training & Development",
      description: "Empower your team with skills that drive success.",
      icon: IconBook,
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400",
      features: [
        "Corporate & Media Trainings",
        "Personal Development",
        "Media Training",
        "Workshops",
      ],
      subtitle: "Our Services:",
      buttonText: "Book a Training",
      backgroundImage:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80", // Training workshop with people learning and collaborating
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [services.length]);

  return (
    <section
      id="services"
      className="py-20 sm:py-32 px-2 sm:px-4 lg:px-8 relative"
    >
      <div className="max-w-7xl mx-auto">
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
                key={index}
                className={`relative overflow-hidden rounded-2xl p-8 group transition-all duration-500 ${
                  index === activeIndex
                    ? "bg-gradient-to-br from-[#C69c6c]/20 via-[#d4a574]/20 to-[#C69c6c]/20 border-2 border-[#C69c6c]/50 shadow-2xl shadow-[#C69c6c]/20"
                    : "bg-gradient-to-br from-white/5 via-white/10 to-white/5 border border-white/20 hover:border-[#C69c6c]/30"
                }`}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -15,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                {/* Background Image Overlay */}
                {service.backgroundImage && (
                  <div
                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${service.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}

                {/* Animated Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  animate={{
                    scale: index === activeIndex ? [1, 1.1, 1] : 1,
                  }}
                  transition={{
                    duration: 3,
                    repeat: index === activeIndex ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative mb-6 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
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
                </motion.div>

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
                        key={featureIndex}
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: featureIndex * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-[#C69c6c] rounded-full"></div>
                        <span className="text-sm text-gray-300 font-medium">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Service Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-[#C79D6D] to-[#d4a574] hover:from-[#d4a574] hover:to-[#C79D6D] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#C79D6D]/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Navigate to service detail page
                      const slug = service.title
                        .toLowerCase()
                        .replace(/[&\s]+/g, "-")
                        .replace(/[^a-z0-9-]/g, "");
                      try {
                        router.push(`/services/${slug}`);
                      } catch (error) {
                        console.error("Router push failed:", error);
                        // Fallback to window.location
                        window.location.href = `/services/${slug}`;
                      }
                    }}
                  >
                    {service.buttonText || "Get a Free Quote"}
                  </motion.button>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#C69c6c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  initial={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
