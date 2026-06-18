"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  IconVideo,
  IconEye,
  IconX,
  IconPlayerPlay,
  IconFileText,
  IconDownload,
} from "@tabler/icons-react";

// Latest Works Section with Tabs
type WorkItem = {
  title: string;
  desc: string;
  image: string;
  video?: string;
  pdf?: string;
  client: string;
};

const tabNames = [
  "Digital Marketing",
  "Media Production",
  "Branding",
  "Advertising & Printing",
] as const;

type TabName = (typeof tabNames)[number];

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
      title: "Olfine Brand Guidelines",
      desc: "Complete brand identity guidelines and design system",
      image: "/img/client/Olfine-Logo-White.png",
      pdf: "/pdf/Olfine Brand guideline final.pdf",
      client: "Olfine",
    },
  ],
  "Media Production": [
    {
      title: "Advertising Video",
      desc: "Creative advertising video showcasing our marketing expertise",
      image: "https://img.youtube.com/vi/kYnRISjDx1M/maxresdefault.jpg",
      video: "https://www.youtube.com/shorts/kYnRISjDx1M?si=Ubw7Yf1908_-HYnK",
      client: "Addis Reality",
    },
    {
      title: "Professional Video Production",
      desc: "High-quality video production showcasing our creative excellence",
      image: "/video/1111(1).mp4",
      video: "/video/1111(1).mp4",
      client: "Addis Reality",
    },
    {
      title: "Creative Media Content",
      desc: "Engaging visual content that captures your brand story",
      image: "/video/1110(3).mp4",
      video: "/video/1110(3).mp4",
      client: "Addis Reality",
    },
    {
      title: "Professional Videography",
      desc: "Cinematic video production with professional quality",
      image: "/video/1119 (1).mp4",
      video: "/video/1119 (1).mp4",
      client: "Addis Reality",
    },
  ],
  "Advertising & Printing": [
    {
      title: "Roll-up Banner Design",
      desc: "Professional roll-up banner design for effective marketing",
      image: "/img/advert/Free_Roll-up_Mockup_1.jpg",
      client: "Addis Reality",
    },
    {
      title: "Advertising & Printing Services",
      desc: "High-quality advertising and printing solutions",
      image: "/img/advert/banner1.jpg",
      client: "Addis Reality",
    },
    {
      title: "Digital Billboard Design",
      desc: "Eye-catching digital billboard design for outdoor advertising",
      image: "/img/advert/Mockup-01.jpg",
      client: "Addis Reality",
    },
    {
      title: "Professional Banner Design",
      desc: "Premium banner design for impactful brand promotion",
      image: "/img/advert/Mockup-002.jpg",
      client: "Addis Reality",
    },
  ],
};

const buildMarqueeTrack = (works: WorkItem[]) => {
  const minPerHalf = 5;
  const repeat = Math.max(1, Math.ceil(minPerHalf / works.length));
  const half = Array.from({ length: repeat }, () => works).flat();
  return [...half, ...half];
};

type WorkScreenCardProps = {
  work: WorkItem;
  idx: number;
  activeTab: TabName;
  preloadedImages: Set<string>;
  onOpen: (image: string, video?: string) => void;
  onPreload: (image: string) => void;
  onDownloadPDF: (pdf: string | undefined, e: React.MouseEvent) => void;
  onViewPDF: (pdf: string | undefined, e: React.MouseEvent) => void;
  isYouTubeUrl: (url: string) => boolean;
};

function WorkScreenCard({
  work,
  idx,
  activeTab,
  preloadedImages,
  onOpen,
  onPreload,
  onDownloadPDF,
  onViewPDF,
  isYouTubeUrl,
}: WorkScreenCardProps) {
  const isPdf = Boolean(work.pdf);
  const isLocalVideo = Boolean(work.video && !isYouTubeUrl(work.video));

  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] lg:w-[260px]">
      <p
        className="text-center text-sm font-medium text-gray-300 mb-4 px-1 truncate"
        title={work.title}
      >
        {work.title}
      </p>

      <div
        className={`group relative ${isPdf ? "" : "cursor-pointer"}`}
        onClick={
          isPdf ? undefined : () => onOpen(work.image, work.video)
        }
        onMouseEnter={() => {
          if (!work.video && !work.pdf && !preloadedImages.has(work.image)) {
            onPreload(work.image);
          }
        }}
      >
        <div className="relative aspect-[9/16] rounded-[1.75rem] overflow-hidden border border-white/15 bg-gradient-to-b from-white/[0.1] to-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] transition-all duration-300 group-hover:border-[#C79D6D]/45 group-hover:shadow-[0_16px_48px_rgba(199,157,109,0.18)] group-hover:-translate-y-1">
          {isPdf ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
              <div className="relative w-24 h-24">
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  className="object-contain"
                  loading="eager"
                  priority
                />
              </div>
              <div className="flex items-center gap-2 text-white">
                <IconFileText className="w-6 h-6 text-[#C79D6D]" />
                <span className="text-xs font-semibold">PDF Document</span>
              </div>
            </div>
          ) : isLocalVideo ? (
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
                  e.currentTarget.currentTime = 0;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08243A]/50 to-transparent opacity-60" />
            </>
          ) : (
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
              loading={
                activeTab === "Advertising & Printing" || idx < 4
                  ? "eager"
                  : "lazy"
              }
              priority={activeTab === "Advertising & Printing" || idx < 4}
              sizes="260px"
              quality={90}
            />
          )}

          {!isPdf && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <div className="bg-gradient-to-br from-[#C79D6D] to-[#d4a574] rounded-full p-3 shadow-lg border border-white/30">
                {work.video ? (
                  <IconPlayerPlay
                    className="w-6 h-6 text-white ml-0.5"
                    fill="currentColor"
                  />
                ) : (
                  <IconEye className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
          )}

          {work.video && (
            <div className="absolute top-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full border border-white/20">
              <IconVideo className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
      </div>

      {isPdf ? (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={(e) => onDownloadPDF(work.pdf, e)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#C79D6D] to-[#d4a574] text-white rounded-full text-xs font-semibold hover:shadow-lg hover:shadow-[#C79D6D]/25 transition-all"
          >
            <IconDownload className="w-3.5 h-3.5" />
            Download
          </button>
          <button
            type="button"
            onClick={(e) => onViewPDF(work.pdf, e)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 text-white rounded-full text-xs font-semibold border border-white/15 transition-all"
          >
            <IconEye className="w-3.5 h-3.5" />
            View
          </button>
        </div>
      ) : (
        <p className="text-center text-xs text-gray-500 mt-3 truncate px-1">
          {work.client}
        </p>
      )}
    </div>
  );
}

const LatestWorksSection = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Digital Marketing");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isMarqueePaused, setIsMarqueePaused] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(
    new Set()
  );
  const [portalReady, setPortalReady] = useState(false);

  useEffect(() => {
    setPortalReady(true);
  }, []);

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
      setIsModalOpen(true);
    } else {
      // If image is already preloaded, open immediately
      if (preloadedImages.has(imageSrc)) {
        setSelectedImage(imageSrc);
        setSelectedVideo(null);
        setIsModalOpen(true);
      } else {
        // Preload image before opening modal
        const img = document.createElement("img");
        img.src = imageSrc;
        img.onload = () => {
          setPreloadedImages((prev) => new Set(prev).add(imageSrc));
          setSelectedImage(imageSrc);
          setSelectedVideo(null);
          setIsModalOpen(true);
        };
        img.onerror = () => {
          // If preload fails, still open modal
          setSelectedImage(imageSrc);
          setSelectedVideo(null);
          setIsModalOpen(true);
        };
        // Check if image is already cached
        if (img.complete && img.naturalWidth > 0) {
          setPreloadedImages((prev) => new Set(prev).add(imageSrc));
          setSelectedImage(imageSrc);
          setSelectedVideo(null);
          setIsModalOpen(true);
        }
      }
    }
  };

  const handleDownloadPDF = (
    pdfPath: string | undefined,
    e: React.MouseEvent
  ) => {
    if (!pdfPath) return;
    e.stopPropagation();
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop() || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewPDF = (pdfPath: string | undefined, e: React.MouseEvent) => {
    if (!pdfPath) return;
    e.stopPropagation();
    window.open(pdfPath, "_blank");
  };

  const closeImagePreview = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  // Preload images when tab changes (especially for Advertising & Printing)
  useEffect(() => {
    const currentWorks = latestWorks[activeTab];
    const imagesToPreload = currentWorks
      .filter((work) => !work.video && !work.pdf)
      .map((work) => work.image);

    for (const imageSrc of imagesToPreload) {
      if (!preloadedImages.has(imageSrc)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = imageSrc;
        document.head.appendChild(link);

        // Also preload using Image object for better browser support
        const img = document.createElement("img");
        img.src = imageSrc;
        img.onload = () => {
          setPreloadedImages((prev) => new Set(prev).add(imageSrc));
        };
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  useEffect(() => {
    setIsMarqueePaused(false);
  }, [activeTab]);

  const handlePreloadImage = (imageSrc: string) => {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.onload = () => {
      setPreloadedImages((prev) => new Set(prev).add(imageSrc));
    };
  };

  const activeWorks = latestWorks[activeTab];
  const marqueeItems = buildMarqueeTrack(activeWorks);
  const marqueeDuration = Math.max(24, Math.ceil(marqueeItems.length / 2) * 5);

  const previewModal =
    portalReady &&
    createPortal(
      <AnimatePresence>
        {isModalOpen && (selectedImage || selectedVideo) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100000] flex h-[100dvh] w-[100dvw] items-center justify-center bg-black"
            onClick={closeImagePreview}
            role="dialog"
            aria-modal="true"
            aria-label="Work preview"
          >
            <motion.button
              type="button"
              onClick={closeImagePreview}
              className="fixed top-4 right-4 z-[100001] flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:border-[#C79D6D]/50 hover:bg-white/20 hover:text-[#C79D6D] sm:top-6 sm:right-6 sm:h-12 sm:w-12"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Close preview"
            >
              <IconX className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="flex h-full w-full items-center justify-center p-4 sm:p-6"
            >
              {selectedVideo ? (
                <div
                  className="flex h-full w-full items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  {isYouTubeUrl(selectedVideo) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(selectedVideo) || selectedVideo}
                      title="Video preview"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="aspect-video h-full w-full max-h-[100dvh] max-w-[100dvw]"
                      style={{ border: 0 }}
                    />
                  ) : (
                    <video
                      src={selectedVideo}
                      controls
                      autoPlay
                      className="h-full w-full max-h-[100dvh] max-w-[100dvw] object-contain"
                      playsInline
                      preload="auto"
                    />
                  )}
                </div>
              ) : selectedImage ? (
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Image
                    src={selectedImage}
                    alt="Work preview"
                    width={2400}
                    height={2400}
                    className="h-auto w-auto max-h-[100dvh] max-w-[100dvw] object-contain"
                    priority
                    quality={95}
                  />
                </div>
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );

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
    <>
    <section
      id="latest-works"
      className="relative py-20 sm:py-32 overflow-hidden bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A]"
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

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
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

        {/* Category Filter Pills */}
        <div className="flex justify-center mb-10 sm:mb-14">
          <div
            className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/15 max-w-full overflow-x-auto scrollbar-hide"
            style={{ WebkitOverflowScrolling: "touch" }}
            role="tablist"
          >
            {tabNames.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C79D6D] ${
                    isActive
                      ? "bg-white/15 text-white shadow-sm border border-white/20"
                      : "text-gray-400 hover:text-gray-200 border border-transparent"
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-width auto-scrolling marquee */}
      <div
        className="relative z-10 w-full overflow-hidden mt-2"
        onMouseEnter={() => setIsMarqueePaused(true)}
        onMouseLeave={() => setIsMarqueePaused(false)}
        onFocus={() => setIsMarqueePaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsMarqueePaused(false);
          }
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={`latest-works-marquee flex gap-6 sm:gap-8 lg:gap-10 py-6 ${isMarqueePaused ? "paused" : ""}`}
              style={
                {
                  "--marquee-duration": `${marqueeDuration}s`,
                } as React.CSSProperties
              }
            >
              {marqueeItems.map((work, idx) => (
                <WorkScreenCard
                  key={`${work.title}-${idx}`}
                  work={work}
                  idx={idx % activeWorks.length}
                  activeTab={activeTab}
                  preloadedImages={preloadedImages}
                  onOpen={openImagePreview}
                  onPreload={handlePreloadImage}
                  onDownloadPDF={handleDownloadPDF}
                  onViewPDF={handleViewPDF}
                  isYouTubeUrl={isYouTubeUrl}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

    </section>
    {previewModal}
    </>
  );
};

export default LatestWorksSection;
