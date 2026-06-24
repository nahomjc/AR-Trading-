"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { IconMaximize, IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

type GalleryPhoto = {
  src: string;
  alt: string;
  category: string;
};

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: "/img/ar-image/photo_2026-06-20_16-39-41.jpg",
    alt: "Addis Reality office workspace",
    category: "workspace",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-07.jpg",
    alt: "Creative team collaboration space",
    category: "team",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-12.jpg",
    alt: "Modern office interior at Addis Reality",
    category: "studio",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-16.jpg",
    alt: "Addis Reality studio environment",
    category: "studio",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-21.jpg",
    alt: "Office meeting and strategy area",
    category: "meeting",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-28.jpg",
    alt: "Addis Reality production workspace",
    category: "workspace",
  },
  {
    src: "/img/ar-image/photo_2026-06-20_16-40-33.jpg",
    alt: "Addis Reality headquarters overview",
    category: "overview",
  },
];

const NAV_TABS = [
  { id: "workspace", label: "Workspace Gallery" },
  { id: "studio", label: "Studio Gallery" },
  { id: "team", label: "Team Gallery" },
  { id: "meeting", label: "Meeting Gallery" },
  { id: "overview", label: "Overview Gallery" },
  { id: "all", label: "All Spaces" },
] as const;

const INITIAL_SLIDE_INDEX = GALLERY_PHOTOS.findIndex(
  (photo) => photo.category === "workspace",
);

const smoothEase = [0.22, 1, 0.36, 1] as const;

/** Shear-angle 3D slots — center flat, sides tilted like reference */
const SHEAR_SLOTS: Record<
  number,
  { x: number; rotateY: number; scale: number; z: number; opacity: number; zIndex: number }
> = {
  0: { x: 0, rotateY: 0, scale: 1, z: 80, opacity: 1, zIndex: 50 },
  1: { x: 268, rotateY: -52, scale: 0.78, z: 20, opacity: 0.95, zIndex: 40 },
  2: { x: 468, rotateY: -62, scale: 0.66, z: -40, opacity: 0.75, zIndex: 30 },
  3: { x: 620, rotateY: -68, scale: 0.56, z: -90, opacity: 0.45, zIndex: 20 },
  4: { x: 740, rotateY: -72, scale: 0.48, z: -130, opacity: 0.2, zIndex: 10 },
};

function getOffset(index: number, active: number, total: number) {
  let diff = index - active;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

function getShearStyle(offset: number, layoutScale = 1) {
  const abs = Math.abs(offset);
  const slot = SHEAR_SLOTS[abs] ?? {
    x: 820,
    rotateY: offset < 0 ? 75 : -75,
    scale: 0.4,
    z: -160,
    opacity: 0,
    zIndex: 0,
  };

  const scaledX = slot.x * layoutScale;

  return {
    x: offset < 0 ? -scaledX : scaledX,
    rotateY: offset < 0 ? -slot.rotateY : slot.rotateY,
    scale: slot.scale,
    z: slot.z,
    opacity: slot.opacity,
    zIndex: slot.zIndex,
  };
}

type SlideProps = {
  photo: GalleryPhoto;
  offset: number;
  isCenter: boolean;
  reducedMotion: boolean | null;
  layoutScale: number;
  onSelect: () => void;
  priority?: boolean;
};

function ShearSlide({
  photo,
  offset,
  isCenter,
  reducedMotion,
  layoutScale,
  onSelect,
  priority,
}: SlideProps) {
  const style = getShearStyle(offset, layoutScale);

  return (
    <motion.figure
      className={`shear-gallery-slide absolute left-1/2 top-0 ${
        isCenter ? "pointer-events-none" : "pointer-events-auto cursor-pointer"
      }`}
      style={{ zIndex: style.zIndex, transformStyle: "preserve-3d" }}
      initial={false}
      animate={{
        x: `calc(-50% + ${style.x}px)`,
        rotateY: style.rotateY,
        scale: style.scale,
        z: style.z,
        opacity: style.opacity,
      }}
      transition={{
        duration: reducedMotion ? 0.2 : 0.65,
        ease: smoothEase,
      }}
      onClick={() => {
        if (!isCenter) onSelect();
      }}
    >
      <div className="shear-gallery-slide-inner">
        <div className="shear-gallery-image-wrap">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={520}
            height={680}
            className="shear-gallery-img object-cover"
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 400px"
            priority={priority}
            quality={80}
          />
        </div>
        <div className="shear-gallery-reflection" aria-hidden>
          <Image
            src={photo.src}
            alt=""
            width={520}
            height={680}
            className="shear-gallery-img shear-gallery-img--reflection object-cover"
            loading="lazy"
            quality={50}
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 42vw, 400px"
          />
        </div>
      </div>
    </motion.figure>
  );
}

export default function OfficeGallerySection() {
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState(INITIAL_SLIDE_INDEX);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [layoutScale, setLayoutScale] = useState(1);

  const filteredPhotos = useMemo(() => {
    if (activeFilter === "all") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((photo) => photo.category === activeFilter);
  }, [activeFilter]);

  const activePhoto = filteredPhotos[activeIndex];

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateScale = () => {
      const width = el.clientWidth;
      setLayoutScale(Math.min(1, Math.max(0.48, width / 760)));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setActiveIndex(activeFilter === "all" ? INITIAL_SLIDE_INDEX : 0);
    setUserPaused(false);
  }, [activeFilter]);

  const goTo = useCallback((index: number) => {
    setUserPaused(true);
    setActiveIndex(index);
  }, []);

  const goPrev = useCallback(() => {
    setUserPaused(true);
    setActiveIndex((prev) =>
      prev === 0 ? filteredPhotos.length - 1 : prev - 1,
    );
  }, [filteredPhotos.length]);

  const goNext = useCallback(() => {
    setUserPaused(true);
    setActiveIndex((prev) =>
      prev === filteredPhotos.length - 1 ? 0 : prev + 1,
    );
  }, [filteredPhotos.length]);

  useEffect(() => {
    if (reducedMotion || filteredPhotos.length <= 1 || userPaused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((prev) =>
        prev === filteredPhotos.length - 1 ? 0 : prev + 1,
      );
    }, 5500);
    return () => window.clearInterval(timer);
  }, [reducedMotion, filteredPhotos.length, activeFilter, userPaused]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const dx = event.changedTouches[0].clientX - touchStartX.current;
    const dy = event.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  return (
    <section
      id="office-gallery"
      className="shear-gallery-section relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#08243A] via-[#061a2c] to-[#08243A]" />
        <div className="absolute left-1/2 top-[30%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C79D6D]/10 blur-[120px]" />
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />
        <div className="absolute -right-20 bottom-8 h-72 w-72 rounded-full bg-[#C79D6D]/8 blur-[100px]" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-[1400px]"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.6, ease: smoothEase }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C79D6D] sm:text-xs">
            Gallery
          </p>
          <h2 className="shear-gallery-title text-2xl font-bold sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Our Visual{" "}
            </span>
            <span className="bg-gradient-to-r from-[#C79D6D] to-[#d4a574] bg-clip-text text-transparent">
              Diary
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-gray-400 sm:text-base">
            Step inside Addis Reality, the workspace, studio, and creative
            energy behind every campaign we deliver.
          </p>
        </div>

        <nav
          className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-2.5"
          aria-label="Gallery categories"
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`shear-gallery-nav-pill px-4 py-2.5 text-[12px] font-medium transition-all duration-200 sm:px-5 sm:text-[13px] ${
                  isActive
                    ? "border border-[#C79D6D]/50 bg-[#C79D6D] text-[#08243A] shadow-[0_8px_24px_rgba(199,157,109,0.35)]"
                    : "border border-white/15 bg-white/[0.04] text-gray-300 hover:border-[#C79D6D]/30 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* 3D stage */}
        <div
          ref={stageRef}
          className="shear-gallery-stage relative mx-auto mt-10 w-full touch-pan-y sm:mt-12"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {filteredPhotos.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photo"
                className="shear-gallery-nav-arrow absolute left-1 top-1/2 z-[70] -translate-y-1/2 sm:left-3"
              >
                <IconChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photo"
                className="shear-gallery-nav-arrow absolute right-1 top-1/2 z-[70] -translate-y-1/2 sm:right-3"
              >
                <IconChevronRight className="h-5 w-5 sm:h-6 sm:w-6" stroke={2} />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={() => activePhoto && setIsFullscreen(true)}
            aria-label="View fullscreen"
            className="absolute right-0 top-0 z-[60] flex h-10 w-10 items-center justify-center text-gray-400 transition-colors hover:text-[#C79D6D] sm:right-2"
          >
            <IconMaximize className="h-5 w-5" stroke={1.5} />
          </button>

          {filteredPhotos.length === 0 ? (
            <p className="flex h-[480px] items-center justify-center text-gray-500">
              No photos in this category.
            </p>
          ) : (
            filteredPhotos.map((photo, index) => {
              const offset = getOffset(
                index,
                activeIndex,
                filteredPhotos.length,
              );

              if (Math.abs(offset) > 4) return null;

              return (
                <ShearSlide
                  key={photo.src}
                  photo={photo}
                  offset={offset}
                  isCenter={offset === 0}
                  reducedMotion={reducedMotion}
                  layoutScale={layoutScale}
                  onSelect={() => goTo(index)}
                  priority={offset === 0 && index === activeIndex}
                />
              );
            })
          )}
        </div>

        {/* Pagination dots — reference style */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12">
          {filteredPhotos.map((photo, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={photo.src}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => goTo(index)}
                className={`shear-gallery-dot transition-all duration-300 ${
                  isActive ? "shear-gallery-dot--active" : ""
                }`}
              />
            );
          })}
        </div>
      </motion.div>

      {/* Fullscreen */}
      <AnimatePresence>
        {isFullscreen && activePhoto && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#08243A]/95 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              type="button"
              aria-label="Close fullscreen"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#C79D6D]/30 text-[#C79D6D] hover:bg-[#C79D6D]/10"
              onClick={() => setIsFullscreen(false)}
            >
              <IconX className="h-5 w-5" stroke={1.75} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="relative max-h-[90vh] max-w-[min(92vw,900px)] overflow-hidden rounded-2xl ring-1 ring-[#C79D6D]/25"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                width={1200}
                height={1600}
                className="max-h-[90vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
