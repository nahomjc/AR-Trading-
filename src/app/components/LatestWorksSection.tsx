"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { IconCode, IconChartLine, IconPalette, IconPrinter, IconVideo, IconCalendarEvent, IconBook } from "@tabler/icons-react";
import dynamic from "next/dynamic";

const TestimonialsSection = dynamic(() => import("../TestimonialsSection"), { ssr: false });

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
  "Training"
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

const latestWorks: Record<TabName, WorkItem[]> = {
  "Digital Marketing": [
    {
      title: "Social Media Campaign Design",
      desc: "",
      image: "/img/social-media-post-designs/1.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Instagram Story Collection",
      desc: "",
      image: "/img/social-media-post-designs/2.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Facebook Post Series",
      desc: "",
      image: "/img/social-media-post-designs/3.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "LinkedIn Professional Posts",
      desc: "",
      image: "/img/social-media-post-designs/4.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Twitter Campaign Graphics",
      desc: "",
      image: "/img/social-media-post-designs/5.jpg",
      client: "EthioLearn Platform",
    },
    {
      title: "Social Media Brand Kit",
      desc: "",
      image: "/img/social-media-post-designs/6.jpg",
      client: "EthioLearn Platform",
    },
  ],
  "Web Development": [
    {
      title: "Websites & Portfolios",
      desc: "Modern, responsive websites built to perform.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Corporations",
    },
    {
      title: "E-commerce Platforms",
      desc: "Advanced e-commerce solutions for online businesses.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Businesses",
    },
    {
      title: "Web Applications",
      desc: "Custom web applications for business operations.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Business Organizations",
    },
  ],
  Branding: [
    {
      title: "Logo Design",
      desc: "Distinctive logos that represent your brand identity.",
      image:
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Brand Identity Systems",
      desc: "Complete brand identity packages for businesses.",
      image:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Businesses",
    },
    {
      title: "Rebranding Projects",
      desc: "Comprehensive rebranding for established brands.",
      image:
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
      client: "Ethiopian Organizations",
    },
  ],
  "Media Production": [
    {
      title: "Photography",
      desc: "Professional photography services.",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Videography",
      desc: "High-quality video production.",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "TV & Social Ads",
      desc: "Creative advertising content.",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  "Advertising & Printing": [
    {
      title: "Billboards & Banners",
      desc: "Large format printing and design.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Flyers & Posters",
      desc: "Print marketing materials.",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  "Event Planning": [
    {
      title: "Organized Events",
      desc: "Professional event organization.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Corporate Events",
      desc: "Corporate event planning and execution.",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
  ],
  Training: [
    {
      title: "Delivered Workshops",
      desc: "Professional training workshops.",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      client: "Various Clients",
    },
    {
      title: "Skill Training Programs",
      desc: "Comprehensive skill development programs.",
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

  // Handle latest works section highlighting from search
  useEffect(() => {
    // Check if there's a highlighted latest works from search
    const storedLatestWorks = sessionStorage.getItem("highlightLatestWorks");
    if (storedLatestWorks) {
      setIsHighlighted(true);
      // Clear the stored value after a delay
      setTimeout(() => {
        setIsHighlighted(false);
        sessionStorage.removeItem("highlightLatestWorks");
      }, 3000); // Highlight for 3 seconds
    }

    // Listen for highlight events from search
    const handleHighlightLatestWorks = () => {
      setIsHighlighted(true);
      // Clear highlight after 3 seconds
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

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeImagePreview();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  return (
    <section
      id="latest-works"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative bg-gradient-to-br from-[#08243A]/20 via-transparent to-[#08243A]/10"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className={`text-center mb-16 p-6 rounded-xl transition-all duration-500 ${
            isHighlighted
              ? "bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 border border-[#C69c6c]/50 shadow-lg shadow-[#C69c6c]/20 animate-pulse"
              : ""
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-6 py-3 bg-[#C69c6c]/20 backdrop-blur-sm border border-[#C69c6c]/30 rounded-full text-[#C69c6c] text-lg font-bold mb-8">
            Latest Works
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-outfit mb-6 text-[#C79D6D]">
            Our Latest Works
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Showcasing our creative excellence in digital marketing, web
            development, and branding solutions. From social media campaigns to
            enterprise applications, we deliver results that exceed
            expectations.
          </p>
        </motion.div>
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="relative max-w-full">
            <div
              className="inline-flex rounded-full bg-[#08243A]/60 p-1 shadow-xl max-w-full overflow-x-auto scrollbar-hide gap-2 px-1 snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: "touch" }}
              role="tablist"
            >
              {tabNames.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative flex-shrink-0 px-2 py-1 sm:px-4 sm:py-2 rounded-full font-semibold text-xl sm:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C69c6c] whitespace-nowrap
                    ${
                      activeTab === tab
                        ? "btn-secondary text-white shadow-lg"
                        : "btn-secondary text-[#C69c6c] hover:bg-[#C69c6c]/20"
                    }
                  `}
                  aria-controls={`tab-panel-${tab}`}
                  tabIndex={activeTab === tab ? 0 : -1}
                  style={{ minWidth: "44px", scrollSnapAlign: "center" }}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute left-2 right-2 bottom-1 h-1 rounded-full bg-gradient-to-r from-[#C69c6c] to-[#d4a574]"
                      style={{ zIndex: 1 }}
                    />
                  )}
                  <span className="sm:hidden" title={tab}>
                    {(() => {
                      const IconComponent = tabIcons[tab];
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                  </span>
                  <span className="hidden sm:inline">{tab}</span>
                </button>
              ))}
            </div>
            {/* Right-edge fade indicator for scrollable tabs on mobile/tablet */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-blue-900/80 via-blue-900/40 to-transparent rounded-r-full block" />
          </div>
        </div>
        {/* Tab Panels - render only the active tab's panel, no absolute positioning */}
        <div className="relative w-full">
          <motion.div
            key={activeTab}
            id={`tab-panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {latestWorks[activeTab].map((work: WorkItem, idx: number) => (
                <motion.div
                  key={work.title}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Optimized Card Design */}
                  <div
                    className="relative bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 overflow-hidden group cursor-pointer"
                    onClick={() => openImagePreview(work.image)}
                  >
                    {/* Simple Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#C69c6c] rounded-t-2xl"></div>

                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />

                      {/* Simple Overlay */}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 bg-[#C69c6c] text-white text-xs font-bold px-3 py-1 rounded-full">
                        {activeTab}
                      </div>

                      {/* Preview Icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C69c6c] transition-colors duration-300">
                        {work.title}
                      </h3>
                      <div className="text-[#C69c6c] font-medium text-xs">
                        {work.client}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-20">
          <TestimonialsSection />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-t from-blue-950/80 to-transparent pointer-events-none" />

      {/* Image Preview Modal */}
      <AnimatePresence>
        {isModalOpen && selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={closeImagePreview}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative max-w-[90vw] max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeImagePreview}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300 border border-white/20"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image */}
              <Image
                src={selectedImage}
                alt="Preview"
                width={1200}
                height={800}
                className="w-full h-auto max-h-[90vh] object-contain"
                priority
              />

              {/* Download Button */}
              <div className="absolute bottom-4 left-4 z-10">
                <a
                  href={selectedImage}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#C69c6c] text-white rounded-full hover:bg-[#d4a574] transition-colors duration-300 shadow-lg"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestWorksSection;
