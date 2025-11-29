"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconChartLine,
  IconPalette,
  IconPrinter,
  IconVideo,
  IconEye,
  IconX,
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconPlayerPlay,
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
  video?: string;
  client: string;
};

const tabNames = [
  "Digital Marketing",
  "Media Production",
  "Branding",
  "Advertising & Printing",
] as const;

type TabName = (typeof tabNames)[number];

const tabIcons: Record<TabName, React.ComponentType<{ className?: string }>> = {
  "Digital Marketing": IconChartLine,
  Branding: IconPalette,
  "Media Production": IconVideo,
  "Advertising & Printing": IconPrinter,
};

const tabColors: Record<TabName, string> = {
  "Digital Marketing": "from-blue-500/20 via-purple-500/20 to-blue-500/20",
  Branding: "from-pink-500/20 via-purple-500/20 to-pink-500/20",
  "Media Production": "from-green-500/20 via-teal-500/20 to-green-500/20",
  "Advertising & Printing":
    "from-orange-500/20 via-red-500/20 to-orange-500/20",
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
  Branding: [
    {
      title: "Logo Design",
      desc: "Distinctive logos that represent your brand identity",
      image: "/img/ars.png",
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
      title: "Advertising Video",
      desc: "Creative advertising video showcasing our marketing expertise",
      image: "https://img.youtube.com/vi/kYnRISjDx1M/maxresdefault.jpg",
      video: "https://www.youtube.com/shorts/kYnRISjDx1M?si=Ubw7Yf1908_-HYnK",
      client: "AR Solutions",
    },
    {
      title: "Professional Video Production",
      desc: "High-quality video production showcasing our creative excellence",
      image: "/video/1111(1).mp4",
      video: "/video/1111(1).mp4",
      client: "AR Solutions",
    },
    {
      title: "Creative Media Content",
      desc: "Engaging visual content that captures your brand story",
      image: "/video/1110(3).mp4",
      video: "/video/1110(3).mp4",
      client: "AR Solutions",
    },
    {
      title: "Professional Videography",
      desc: "Cinematic video production with professional quality",
      image: "/video/1119 (1).mp4",
      video: "/video/1119 (1).mp4",
      client: "AR Solutions",
    },
  ],
  "Advertising & Printing": [
    {
      title: "Roll-up Banner Design",
      desc: "Professional roll-up banner design for effective marketing",
      image: "/img/advert/Free_Roll-up_Mockup_1.png",
      client: "AR Solutions",
    },
    {
      title: "Advertising & Printing Services",
      desc: "High-quality advertising and printing solutions",
      image: "/img/advert/photo_2025-11-28_16-12-28.jpg",
      client: "AR Solutions",
    },
  ],
};

const LatestWorksSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Digital Marketing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [carouselRef, setCarouselRef] = useState<HTMLDivElement | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<string | null>(null);

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

  // Helper function to check if URL is YouTube and convert to embed format
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // Match YouTube URLs (including shorts)
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);

    if (match?.[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }

    return null;
  };

  const isYouTubeUrl = (url: string): boolean => {
    return /youtube\.com|youtu\.be/.test(url);
  };

  const openImagePreview = (imageSrc: string, videoSrc?: string) => {
    if (videoSrc) {
      setSelectedVideo(videoSrc);
      setSelectedImage(null);
    } else {
      setSelectedImage(imageSrc);
      setSelectedVideo(null);
    }
    setIsModalOpen(true);
  };

  const closeImagePreview = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedVideo(null);
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
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=1920&q=80"
          alt="Latest Works background"
          fill
          className="object-cover opacity-20"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08243A]/95 via-[#0a2a42]/90 to-[#08243A]/95"></div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#C79D6D]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        {/* Decorative overlay */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#C79D6D]/10 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
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
                        className="relative bg-gradient-to-br from-white/[0.06] via-white/[0.08] to-white/[0.04] backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden hover:border-[#C79D6D]/60 hover:shadow-[0_20px_40px_-12px_rgba(199,157,109,0.3)] transition-all duration-500 cursor-pointer h-full flex flex-col group/card"
                        onClick={() => openImagePreview(work.image, work.video)}
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/0 via-[#C79D6D]/0 to-[#C79D6D]/0 group-hover/card:via-[#C79D6D]/5 group-hover/card:to-[#C79D6D]/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>

                        {/* Media Container */}
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50">
                          {work.video && !isYouTubeUrl(work.video) ? (
                            <>
                              <video
                                src={work.video}
                                className="w-full h-full object-cover"
                                muted
                                loop
                                playsInline
                                preload="auto"
                                poster={work.image}
                                onLoadedData={(e) => {
                                  const video = e.currentTarget;
                                  video.currentTime = 0;
                                }}
                              />
                              {/* Video Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/60 via-[#08243A]/20 to-transparent"></div>
                            </>
                          ) : (
                            <Image
                              src={work.image}
                              alt={work.title}
                              fill
                              className="object-contain group-hover/card:scale-110 transition-transform duration-700 ease-out p-2"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/95 via-[#08243A]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                          {/* Active Tab Color Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${tabColors[activeTab]} opacity-0 group-hover/card:opacity-40 transition-opacity duration-500`}
                          ></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 + 0.3 }}
                              className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30 shadow-lg"
                            >
                              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                {activeTab}
                              </span>
                            </motion.div>
                          </div>

                          {/* Play/View Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover/card:opacity-100 transition-opacity duration-300 z-10">
                            <motion.div
                              className="bg-gradient-to-br from-[#C79D6D] to-[#d4a574] backdrop-blur-sm rounded-2xl p-3 sm:p-4 border-2 border-white/40 shadow-2xl"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                            >
                              {work.video ? (
                                <IconPlayerPlay
                                  className="w-7 h-7 sm:w-8 sm:h-8 text-white ml-1"
                                  fill="currentColor"
                                />
                              ) : (
                                <IconEye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              )}
                            </motion.div>
                          </div>

                          {/* Video Badge */}
                          {work.video && (
                            <div className="absolute top-4 right-4 z-10">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 + 0.3 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-green-500/80 to-teal-500/80 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30 shadow-lg flex items-center gap-1.5"
                              >
                                <IconVideo className="w-3.5 h-3.5" />
                                <span>Video</span>
                              </motion.div>
                            </div>
                          )}

                          {/* Top Accent Line */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="relative p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/[0.02]">
                          <h3 className="text-xl font-bold text-white mb-2.5 group-hover/card:text-[#C79D6D] transition-colors duration-300 line-clamp-1 tracking-tight">
                            {work.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
                            {work.desc}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover/card:border-[#C79D6D]/30 transition-colors duration-300">
                            <span className="text-[#C79D6D] font-semibold text-sm tracking-wide">
                              {work.client}
                            </span>
                            <motion.div
                              className="text-[#C79D6D] group-hover/card:text-[#d4a574] transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <IconArrowRight className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -top-40 left-0 w-full h-40 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-shine transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
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
                        className="relative bg-gradient-to-br from-white/[0.06] via-white/[0.08] to-white/[0.04] backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden hover:border-[#C79D6D]/60 hover:shadow-[0_20px_40px_-12px_rgba(199,157,109,0.3)] transition-all duration-500 cursor-pointer h-full flex flex-col group/card"
                        onClick={() => openImagePreview(work.image, work.video)}
                      >
                        {/* Card Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/0 via-[#C79D6D]/0 to-[#C79D6D]/0 group-hover/card:via-[#C79D6D]/5 group-hover/card:to-[#C79D6D]/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>

                        {/* Media Container */}
                        <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-t-3xl">
                          {work.video && !isYouTubeUrl(work.video) ? (
                            <>
                              <video
                                src={work.video}
                                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 ease-out"
                                muted
                                loop
                                playsInline
                                preload="auto"
                                poster={work.image}
                                onLoadedData={(e) => {
                                  const video = e.currentTarget;
                                  video.currentTime = 0;
                                }}
                                onCanPlay={(e) => {
                                  const video = e.currentTarget;
                                  // Ensure video is ready to play
                                  if (video.readyState >= 3) {
                                    video.currentTime = 0;
                                  }
                                }}
                                onMouseEnter={(e) => {
                                  const video = e.currentTarget;
                                  if (video.paused && video.readyState >= 3) {
                                    video.play().catch(() => {});
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  const video = e.currentTarget;
                                  video.pause();
                                  video.currentTime = 0;
                                }}
                              />
                              {/* Professional Video Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/80 via-[#08243A]/30 to-transparent"></div>
                              {/* Video Shimmer Effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-teal-500/0 to-green-500/0 group-hover/card:via-teal-500/10 group-hover/card:to-green-500/5 transition-all duration-500"></div>
                            </>
                          ) : (
                            <Image
                              src={work.image}
                              alt={work.title}
                              fill
                              className="object-contain group-hover/card:scale-110 transition-transform duration-700 ease-out p-2"
                              loading="lazy"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          )}

                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/95 via-[#08243A]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>

                          {/* Active Tab Color Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${tabColors[activeTab]} opacity-0 group-hover/card:opacity-40 transition-opacity duration-500`}
                          ></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.1 + 0.3 }}
                              className="px-3.5 py-1.5 bg-black/70 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30 shadow-lg"
                            >
                              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                {activeTab}
                              </span>
                            </motion.div>
                          </div>

                          {/* Professional Play Button - Always Visible for Videos */}
                          {work.video && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <motion.div
                                className="relative group/play"
                                initial={{ opacity: 0.9 }}
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.3 }}
                              >
                                {/* Outer Glow Ring */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/30 to-[#d4a574]/30 rounded-full blur-xl group-hover/play:blur-2xl transition-all duration-300"></div>
                                {/* Play Button */}
                                <div className="relative bg-gradient-to-br from-[#C79D6D] to-[#d4a574] backdrop-blur-sm rounded-full p-5 border-2 border-white/40 shadow-2xl shadow-[#C79D6D]/30">
                                  <IconPlayerPlay
                                    className="w-8 h-8 text-white ml-1"
                                    fill="currentColor"
                                  />
                                </div>
                                {/* Pulse Animation */}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-br from-[#C79D6D] to-[#d4a574] rounded-full"
                                  animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 0, 0.5],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                  }}
                                />
                              </motion.div>
                            </div>
                          )}

                          {/* View Icon for Images */}
                          {!work.video && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10">
                              <motion.div
                                className="bg-gradient-to-br from-[#C79D6D] to-[#d4a574] backdrop-blur-sm rounded-2xl p-4 border-2 border-white/40 shadow-2xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ duration: 0.3 }}
                              >
                                <IconEye className="w-6 h-6 text-white" />
                              </motion.div>
                            </div>
                          )}

                          {/* Professional Video Badge */}
                          {work.video && (
                            <div className="absolute top-4 right-4 z-10">
                              <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 + 0.3 }}
                                className="px-3 py-1.5 bg-gradient-to-r from-green-500/90 via-teal-500/90 to-green-500/90 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/40 shadow-lg flex items-center gap-1.5 font-growth"
                              >
                                <IconVideo className="w-3.5 h-3.5" />
                                <span>Video</span>
                              </motion.div>
                            </div>
                          )}

                          {/* Top Accent Line */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C79D6D] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        {/* Content */}
                        <div className="relative p-6 flex-1 flex flex-col bg-gradient-to-b from-transparent to-white/[0.02]">
                          <h3 className="text-xl font-bold text-white mb-2.5 group-hover/card:text-[#C79D6D] transition-colors duration-300 line-clamp-1 tracking-tight">
                            {work.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-5 line-clamp-2 flex-1 leading-relaxed">
                            {work.desc}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10 group-hover/card:border-[#C79D6D]/30 transition-colors duration-300">
                            <span className="text-[#C79D6D] font-semibold text-sm tracking-wide">
                              {work.client}
                            </span>
                            <motion.div
                              className="text-[#C79D6D] group-hover/card:text-[#d4a574] transition-colors duration-300"
                              whileHover={{ x: 5 }}
                            >
                              <IconArrowRight className="w-5 h-5" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Shine Effect */}
                        <div className="absolute inset-0 -top-40 left-0 w-full h-40 bg-gradient-to-b from-white/10 via-white/5 to-transparent opacity-0 group-hover/card:opacity-100 group-hover/card:animate-shine transition-opacity duration-500 pointer-events-none rounded-3xl"></div>
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

      {/* Image/Video Preview Modal */}
      <AnimatePresence>
        {isModalOpen && (selectedImage || selectedVideo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center"
            onClick={closeImagePreview}
            style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            {/* Enhanced Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#08243A]/95 to-black/95 backdrop-blur-2xl"
              style={{ zIndex: 1 }}
            />
            {/* Backdrop Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ zIndex: 1 }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(199,157,109,0.1),transparent_50%)]"></div>
            </div>

            {/* Professional Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 35,
                duration: 0.35,
              }}
              className="relative w-full max-w-6xl max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-6rem)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border border-white/20 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] backdrop-blur-3xl flex flex-col mx-2 sm:mx-4 lg:mx-8"
              onClick={(e) => e.stopPropagation()}
              style={{ zIndex: 2, position: "relative", marginTop: "1rem" }}
            >
              {/* Elegant Header Bar */}
              <div className="relative flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.05] to-transparent backdrop-blur-sm">
                {/* Left Section */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <div className="relative hidden sm:block">
                    <div className="absolute inset-0 bg-[#C79D6D]/30 blur-md rounded-full"></div>
                    <div className="relative w-3 h-3 rounded-full bg-gradient-to-br from-[#C79D6D] to-[#d4a574] shadow-lg shadow-[#C79D6D]/50"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base lg:text-lg font-semibold text-white tracking-tight">
                      {selectedVideo ? "Video Preview" : "Image Preview"}
                    </span>
                    <span className="text-xs text-gray-400 font-medium hidden sm:block">
                      {activeTab}
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <motion.button
                  onClick={closeImagePreview}
                  className="relative group w-9 h-9 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-md rounded-lg sm:rounded-xl flex items-center justify-center text-white hover:text-[#C79D6D] transition-all duration-300 border border-white/10 hover:border-[#C79D6D]/40 shadow-lg hover:shadow-[#C79D6D]/20 flex-shrink-0"
                  whileHover={{ scale: 1.08, rotate: 90 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label="Close modal"
                >
                  <IconX className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C79D6D]/20 to-transparent opacity-0 group-hover:opacity-100 rounded-lg sm:rounded-xl transition-opacity duration-300"></div>
                </motion.button>
              </div>

              {/* Premium Media Container */}
              <div className="relative flex-1 flex items-center justify-center p-3 sm:p-4 lg:p-8 xl:p-12 overflow-auto bg-gradient-to-br from-black/30 via-[#08243A]/40 to-black/30">
                {/* Decorative Corner Accents - Hidden on mobile */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-t-2 border-l-2 border-[#C79D6D]/20 rounded-tl-xl sm:rounded-tl-2xl opacity-50 sm:opacity-100"></div>
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-t-2 border-r-2 border-[#C79D6D]/20 rounded-tr-xl sm:rounded-tr-2xl opacity-50 sm:opacity-100"></div>
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-b-2 border-l-2 border-[#C79D6D]/20 rounded-bl-xl sm:rounded-bl-2xl opacity-50 sm:opacity-100"></div>
                <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-16 sm:h-16 lg:w-20 lg:h-20 border-b-2 border-r-2 border-[#C79D6D]/20 rounded-br-xl sm:rounded-br-2xl opacity-50 sm:opacity-100"></div>

                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                    className="relative max-w-full max-h-full w-full flex items-center justify-center"
                  >
                    {selectedVideo ? (
                      /* Professional Video Player */
                      <div className="relative w-full p-2 sm:p-3 bg-gradient-to-br from-white/10 via-white/5 to-white/[0.02] rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl backdrop-blur-sm">
                        <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-black/90 aspect-video">
                          {isYouTubeUrl(selectedVideo) ? (
                            /* YouTube Embed */
                            <iframe
                              src={
                                getYouTubeEmbedUrl(selectedVideo) ||
                                selectedVideo
                              }
                              title="YouTube video player"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              className="w-full h-full"
                              style={{ border: 0 }}
                            />
                          ) : (
                            /* Regular Video Player */
                            <video
                              src={selectedVideo}
                              controls
                              autoPlay
                              className="w-full h-full object-contain"
                              playsInline
                              preload="auto"
                              style={{
                                filter: "brightness(1.05) contrast(1.05)",
                              }}
                            />
                          )}
                          {/* Professional Video Border Glow */}
                          <div className="absolute inset-0 border-2 border-[#C79D6D]/30 rounded-lg sm:rounded-xl pointer-events-none"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#C79D6D]/20 via-[#d4a574]/20 to-[#C79D6D]/20 rounded-lg sm:rounded-xl pointer-events-none opacity-50"></div>
                          {/* Corner Accents - Smaller on mobile */}
                          <div className="absolute top-1 left-1 sm:top-2 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#C79D6D]/40 rounded-tl-md sm:rounded-tl-lg opacity-60 sm:opacity-100"></div>
                          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#C79D6D]/40 rounded-tr-md sm:rounded-tr-lg opacity-60 sm:opacity-100"></div>
                          <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#C79D6D]/40 rounded-bl-md sm:rounded-bl-lg opacity-60 sm:opacity-100"></div>
                          <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#C79D6D]/40 rounded-br-md sm:rounded-br-lg opacity-60 sm:opacity-100"></div>
                        </div>
                        {/* Video Player Glow Effect */}
                        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-500/10 via-teal-500/10 to-green-500/10 blur-xl sm:blur-2xl rounded-xl sm:rounded-2xl -z-10"></div>
                      </div>
                    ) : (
                      /* Image Frame */
                      <div className="relative p-2 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 shadow-2xl mx-auto">
                        <div className="relative overflow-hidden rounded-xl flex items-center justify-center">
                          <Image
                            src={selectedImage!}
                            alt="Preview"
                            width={1600}
                            height={1200}
                            className="w-auto h-auto max-w-full max-h-[70vh] object-contain mx-auto"
                            priority
                            quality={100}
                          />
                          {/* Subtle Image Border Glow */}
                          <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none"></div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Glow Effect */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#C79D6D]/15 via-[#d4a574]/10 to-[#C79D6D]/15 blur-3xl opacity-60"></div>
                  </motion.div>
                </div>
              </div>

              {/* Elegant Bottom Border */}
              <div className="relative h-px bg-gradient-to-r from-transparent via-[#C79D6D]/40 to-transparent">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestWorksSection;
