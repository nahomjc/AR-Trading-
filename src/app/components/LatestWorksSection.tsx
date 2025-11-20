"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconCode,
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconCalendarEvent,
  IconBook,
  IconEye,
  IconX,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(() => import("../TestimonialsSection"), {
  ssr: false,
});

// Latest Works Section with Tabs
type WorkItem = {
  title: string;
  desc: string;
  image: string;
  client: string;
};

const tabNames = [
  "Digital Marketing",
  "Web Development",
  "Branding",
  "Media Production",
  "Advertising & Printing",
  "Event Planning",
  "Training",
] as const;

type TabName = (typeof tabNames)[number];

const tabIcons: Record<TabName, React.ComponentType<{ className?: string }>> = {
  "Web Development": IconCode,
  "Digital Marketing": IconChartLine,
  Branding: IconPalette,
  "Media Production": IconVideo,
  "Advertising & Printing": IconPrinter,
  "Event Planning": IconCalendarEvent,
  Training: IconBook,
};

const tabColors: Record<TabName, string> = {
  "Digital Marketing": "from-blue-500/20 via-purple-500/20 to-blue-500/20",
  "Web Development": "from-cyan-500/20 via-blue-500/20 to-cyan-500/20",
  Branding: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
  "Media Production": "from-green-500/20 via-teal-500/20 to-green-500/20",
  "Advertising & Printing":
    "from-orange-500/20 via-red-500/20 to-orange-500/20",
  "Event Planning": "from-purple-500/20 via-pink-500/20 to-purple-500/20",
  Training: "from-indigo-500/20 via-purple-500/20 to-indigo-500/20",
};

const latestWorks: Record<TabName, WorkItem[]> = {
  "Digital Marketing": [
    {
      title: "Social Media Campaigns",
      desc: "Engaging campaigns that drive results",
      image: "/img/social-media-post-designs/1.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Digital Ads",
      desc: "High-converting ad creatives",
      image: "/img/social-media-post-designs/2.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Diverse Content Series",
      desc: "Multi-platform content strategies",
      image: "/img/social-media-post-designs/3.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Posts and Story Series",
      desc: "Consistent brand storytelling",
      image: "/img/social-media-post-designs/4.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Instagram Story Collection",
      desc: "Engaging visual narratives",
      image: "/img/social-media-post-designs/5.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Social Media Brand Kit",
      desc: "Unified brand presence",
      image: "/img/social-media-post-designs/6.jpg",
      client: "EthioLearn Platform",
    },
  ],
  "Web Development": [
    {
      title: "Websites & Portfolios",
      desc: "Modern, responsive websites built to perform",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Corporations",
    },
    {
      title: "E-commerce Platforms",
      desc: "Advanced e-commerce solutions for online businesses",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Businesses",
    },
    {
      title: "Web Applications",
      desc: "Custom web applications for business operations",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Business Organizations",
    },
  ],
  Branding: [
    {
      title: "Logo Design",
      desc: "Distinctive logos that represent your brand identity",
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Brand Identity Systems",
      desc: "Complete brand identity packages for businesses",
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Businesses",
    },
    {
      title: "Rebranding Projects",
      desc: "Comprehensive rebranding for established brands",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Organizations",
    },
  ],
  "Media Production": [
    {
      title: "Photography",
      desc: "Professional photography services",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Videography",
      desc: "High-quality video production",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "TV & Social Ads",
      desc: "Creative advertising content",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Animation & Motion Graphics",
      desc: "Dynamic visual storytelling",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Studio Projects",
      desc: "Professional studio productions",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  "Advertising & Printing": [
    {
      title: "Billboards & Banners",
      desc: "Large format printing and design",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Flyers & Posters",
      desc: "Print marketing materials",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Vehicle Branding",
      desc: "Mobile advertising solutions",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Shop Signs",
      desc: "Custom signage solutions",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Outdoor Campaigns",
      desc: "Comprehensive outdoor marketing",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  "Event Planning": [
    {
      title: "Organized Events",
      desc: "Professional event organization",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Coordinated Logistics",
      desc: "Seamless event coordination",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Executed Setups",
      desc: "Flawless event execution",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  Training: [
    {
      title: "Delivered Workshops",
      desc: "Professional training workshops",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Provided Skill Training",
      desc: "Comprehensive skill development programs",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Empowered Teams",
      desc: "Team-building and empowerment programs",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
};

const LatestWorksSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Digital Marketing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [carouselRef, setCarouselRef] = useState<HTMLDivElement | null>(null);

  // Handle latest works section highlighting from search
  useEffect(() => {
    const storedLatestWorks = sessionStorage.getItem("highlightLatestWorks");
    if (storedLatestWorks) {
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightLatestWorks");
      }, 3000);
    }

    const handleHighlightLatestWorks = () => {
      setIsHighlighted(true);
      setTimeout(() => {
        setIsHighlighted(false);
      }, 3000);
    };

    window.addEventListener("highlightLatestWorks", handleHighlightLatestWorks);

    return () => {
      window.removeEventListener(
        "highlightLatestWorks",
        handleHighlightLatestWorks
      );
    };
  }, []);

  const openImagePreview = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeImagePreview = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  // Reset carousel scroll when tab changes
  useEffect(() => {
    if (carouselRef) {
      carouselRef.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [activeTab, carouselRef]);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeImagePreview();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section
      id="latest-works"
      className="relative py-20 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          className={`text-center mb-16 p-8 rounded-3xl transition-all duration-500 ${
            isHighlighted
              ? "bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 border border-[#C79D6D]/50 shadow-lg shadow-[#C79D6D]/20"
              : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 rounded-full text-[#C79D6D] text-sm font-semibold mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Portfolio
          </motion.span>

          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Our Latest{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Showcasing our creative excellence in digital marketing, web
            development, and branding solutions. From social media campaigns to
            enterprise applications, we deliver results that exceed
            expectations.
          </motion.p>
        </motion.div>

        {/* Professional Tabs */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-full">
            <div
              className="inline-flex rounded-2xl bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 p-2 shadow-xl max-w-full overflow-x-auto scrollbar-hide gap-2 snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="tablist"
            >
              {tabNames.map((tab) => {
                const IconComponent = tabIcons[tab];
                const isActive = activeTab === tab;
                return (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C79D6D] whitespace-nowrap ${
                      isActive
                        ? "bg-gradient-to-r from-[#C79D6D] to-[#d4a574] text-white shadow-lg shadow-[#C79D6D]/25"
                        : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-controls={`tab-panel-${tab}`}
                    tabIndex={isActive ? 0 : -1}
                    style={{ scrollSnapAlign: "center" }}
                  >
                    <IconComponent
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        isActive ? "text-white" : "text-[#C79D6D]"
                      }`}
                    />
                    <span className="hidden sm:inline">{tab}</span>
                    <span className="sm:hidden" title={tab}>
                      {tab.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`tab-panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full"
            >
              {/* Mobile Carousel / Desktop Grid */}
              <div className="relative">
                {/* Mobile Carousel Container */}
                <div
                  ref={setCarouselRef}
                  className="sm:hidden flex overflow-x-auto scrollbar-hide gap-4 pb-4 snap-x snap-mandatory scroll-smooth"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  {latestWorks[activeTab].map((work: WorkItem, idx: number) => (
                    <motion.div
                      key={work.title}
                      className="group relative flex-shrink-0 w-[85vw] max-w-sm"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      style={{ scrollSnapAlign: "start" }}
                    >
                      {/* Professional Portfolio Card */}
                      <div
                        className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:border-[#C79D6D]/50 hover:shadow-2xl hover:shadow-[#C79D6D]/20 transition-all duration-500 cursor-pointer h-full flex flex-col"
                        onClick={() => openImagePreview(work.image)}
                      >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/90 via-[#08243A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Active Tab Color Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${tabColors[activeTab]} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                          ></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                              {activeTab}
                            </span>
                          </div>

                          {/* View Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <motion.div
                              className="bg-[#C79D6D]/90 backdrop-blur-sm rounded-full p-4 border-2 border-white/30 shadow-xl"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconEye className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Top Accent Line */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C79D6D] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C79D6D] transition-colors duration-300 line-clamp-1">
                            {work.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                            {work.desc}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-[#C79D6D] font-semibold text-sm">
                              {work.client}
                            </span>
                            <motion.div
                              className="text-[#C79D6D] group-hover:text-[#d4a574] transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <IconArrowRight className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -top-32 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Carousel Navigation */}
                <div className="sm:hidden flex justify-center items-center gap-4 mt-6">
                  <motion.button
                    onClick={() => {
                      if (carouselRef) {
                        carouselRef.scrollBy({
                          left: -300,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 text-[#C79D6D] flex items-center justify-center hover:from-[#C79D6D] hover:to-[#d4a574] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconChevronLeft className="w-6 h-6" />
                  </motion.button>
                  <motion.button
                    onClick={() => {
                      if (carouselRef) {
                        carouselRef.scrollBy({ left: 300, behavior: "smooth" });
                      }
                    }}
                    className="w-12 h-12 rounded-full bg-gradient-to-r from-[#C79D6D]/20 to-[#d4a574]/20 backdrop-blur-sm border border-[#C79D6D]/30 text-[#C79D6D] flex items-center justify-center hover:from-[#C79D6D] hover:to-[#d4a574] hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <IconChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Desktop Grid */}
                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {latestWorks[activeTab].map((work: WorkItem, idx: number) => (
                    <motion.div
                      key={work.title}
                      className="group relative"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      whileHover={{ y: -10 }}
                    >
                      {/* Professional Portfolio Card */}
                      <div
                        className="relative bg-gradient-to-br from-white/5 via-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden hover:border-[#C79D6D]/50 hover:shadow-2xl hover:shadow-[#C79D6D]/20 transition-all duration-500 cursor-pointer h-full flex flex-col"
                        onClick={() => openImagePreview(work.image)}
                      >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden">
                          <Image
                            src={work.image}
                            alt={work.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/90 via-[#08243A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Active Tab Color Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${tabColors[activeTab]} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
                          ></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                              {activeTab}
                            </span>
                          </div>

                          {/* View Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <motion.div
                              className="bg-[#C79D6D]/90 backdrop-blur-sm rounded-full p-4 border-2 border-white/30 shadow-xl"
                              whileHover={{ scale: 1.1, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <IconEye className="w-6 h-6 text-white" />
                            </motion.div>
                          </div>

                          {/* Top Accent Line */}
                          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C79D6D] to-[#d4a574] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#C79D6D] transition-colors duration-300 line-clamp-1">
                            {work.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                            {work.desc}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <span className="text-[#C79D6D] font-semibold text-sm">
                              {work.client}
                            </span>
                            <motion.div
                              className="text-[#C79D6D] group-hover:text-[#d4a574] transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <IconArrowRight className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -top-32 left-0 w-full h-32 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500 pointer-events-none"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <TestimonialsSection />
        </div>
      </div>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md"
            onClick={closeImagePreview}
            style={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              paddingTop: "80px",
              paddingBottom: "20px",
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full max-w-[95vw] max-h-[calc(100vh-100px)] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-[#08243A] to-[#0a2a42] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={closeImagePreview}
                className="absolute top-4 right-4 z-[10000] w-12 h-12 bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#C79D6D] transition-all duration-300 border border-white/20 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconX className="w-6 h-6" />
              </motion.button>

              {/* Image Container */}
              <div className="relative w-full h-full flex items-center justify-center p-4 overflow-auto">
                <Image
                  src={selectedImage}
                  alt="Preview"
                  width={1200}
                  height={800}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-2xl"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestWorksSection;
