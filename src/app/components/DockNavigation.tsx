"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type MouseEvent as ReactMouseEvent,
  type CSSProperties,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  IconHome,
  IconLayoutGrid,
  IconMail,
  IconMapPin,
  IconMessageCircle,
  IconPhone,
  IconRocket,
  IconSparkles,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import { siteConfig } from "@/lib/seo";
import { useChatBot } from "./ChatBot";
import { DOCK_NAVIGATE_EVENT } from "./LazyMount";

type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string; stroke?: number }>;
  gradient: string;
  glow: string;
};

type DockVariant = "home" | "digital-marketing";

type DockConfig = {
  scrollSections: string[];
  topTargetId: string;
  items: DockItem[];
  mobileItemIds: string[];
};

const dockConfigs: Record<DockVariant, DockConfig> = {
  home: {
    scrollSections: [
      "about",
      "services",
      "latest-works",
      "testimonials",
      "contact",
      "faq",
    ],
    topTargetId: "home",
    mobileItemIds: ["home", "services", "work", "contact", "call"],
    items: [
      {
        id: "home",
        label: "Home",
        href: "#home",
        icon: IconHome,
        gradient: "from-slate-500/90 to-slate-700/90",
        glow: "rgba(148,163,184,0.45)",
      },
      {
        id: "about",
        label: "About",
        href: "#about",
        icon: IconUsers,
        gradient: "from-indigo-500/90 to-violet-700/90",
        glow: "rgba(129,140,248,0.5)",
      },
      {
        id: "services",
        label: "Services",
        href: "#services",
        icon: IconRocket,
        gradient: "from-cyan-500/90 to-blue-700/90",
        glow: "rgba(34,211,238,0.5)",
      },
      {
        id: "work",
        label: "Work",
        href: "#latest-works",
        icon: IconLayoutGrid,
        gradient: "from-violet-500/90 to-purple-700/90",
        glow: "rgba(139,92,246,0.5)",
      },
      {
        id: "testimonials",
        label: "Reviews",
        href: "#testimonials",
        icon: IconStar,
        gradient: "from-amber-500/90 to-orange-700/90",
        glow: "rgba(251,191,36,0.5)",
      },
      {
        id: "contact",
        label: "Contact",
        href: "#contact",
        icon: IconMail,
        gradient: "from-emerald-500/90 to-teal-700/90",
        glow: "rgba(52,211,153,0.5)",
      },
      {
        id: "call",
        label: "Call",
        href: `tel:${siteConfig.contact.phone}`,
        icon: IconPhone,
        gradient: "from-[#C79D6D]/95 to-[#a67c52]/95",
        glow: "rgba(199,157,109,0.65)",
      },
    ],
  },
  "digital-marketing": {
    scrollSections: ["work", "capabilities", "ethiopia", "faq"],
    topTargetId: "local-seo-heading",
    mobileItemIds: ["home", "work", "capabilities", "faq", "call"],
    items: [
      {
        id: "home",
        label: "Home",
        href: "/",
        icon: IconHome,
        gradient: "from-slate-500/90 to-slate-700/90",
        glow: "rgba(148,163,184,0.45)",
      },
      {
        id: "work",
        label: "Work",
        href: "#work",
        icon: IconLayoutGrid,
        gradient: "from-violet-500/90 to-purple-700/90",
        glow: "rgba(139,92,246,0.5)",
      },
      {
        id: "capabilities",
        label: "Services",
        href: "#capabilities",
        icon: IconRocket,
        gradient: "from-cyan-500/90 to-blue-700/90",
        glow: "rgba(34,211,238,0.5)",
      },
      {
        id: "ethiopia",
        label: "Ethiopia",
        href: "#ethiopia",
        icon: IconMapPin,
        gradient: "from-emerald-500/90 to-teal-700/90",
        glow: "rgba(52,211,153,0.5)",
      },
      {
        id: "faq",
        label: "FAQ",
        href: "#faq",
        icon: IconMessageCircle,
        gradient: "from-amber-500/90 to-orange-700/90",
        glow: "rgba(251,191,36,0.5)",
      },
      {
        id: "call",
        label: "Call",
        href: `tel:${siteConfig.contact.phone}`,
        icon: IconPhone,
        gradient: "from-[#C79D6D]/95 to-[#a67c52]/95",
        glow: "rgba(199,157,109,0.65)",
      },
    ],
  },
};

const MAX_SCALE_DESKTOP = 1.9;
const INFLUENCE_RADIUS = 150;
const SCROLL_OFFSET = 32;
const SCROLL_RETRY_MS = 50;
const SCROLL_MAX_RETRIES = 40;

type DockMetrics = {
  baseSize: number;
  maxScale: number;
  isMobile: boolean;
  overflowTop: number;
};

function getDockMetrics(): DockMetrics {
  if (typeof window === "undefined") {
    return {
      baseSize: 46,
      maxScale: MAX_SCALE_DESKTOP,
      isMobile: false,
      overflowTop: 100,
    };
  }

  const w = window.innerWidth;
  const isMobile = w < 1024;
  const baseSize = isMobile
    ? w < 360
      ? 36
      : 38
    : 46;
  const maxScale = isMobile ? 1 : MAX_SCALE_DESKTOP;
  const overflowTop =
    baseSize * (maxScale - 1) + baseSize * 0.5 + (isMobile ? 20 : 36);

  return { baseSize, maxScale, isMobile, overflowTop };
}

function scaleForDistance(distance: number, maxScale: number): number {
  if (maxScale <= 1 || distance >= INFLUENCE_RADIUS) return 1;
  const t = 1 - distance / INFLUENCE_RADIUS;
  return 1 + (maxScale - 1) * t * t;
}

function itemStyle(scale: number, baseSize: number) {
  const size = baseSize * scale;
  const lift = size - baseSize;
  return {
    width: size,
    height: size,
    transform: lift > 0 ? `translateY(-${lift}px)` : undefined,
  };
}

function scrollToId(id: string, behavior: ScrollBehavior) {
  window.dispatchEvent(
    new CustomEvent(DOCK_NAVIGATE_EVENT, { detail: { id } }),
  );

  const scrollToElement = (el: HTMLElement) => {
    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, top), behavior });
  };

  const attempt = (tries: number) => {
    const target = document.getElementById(id);
    if (target) {
      scrollToElement(target);
      return;
    }

    if (tries === 0) {
      const placeholder = document.querySelector<HTMLElement>(
        `[data-dock-anchor="${id}"]`,
      );
      if (placeholder) {
        scrollToElement(placeholder);
      }
    }

    if (tries < SCROLL_MAX_RETRIES) {
      window.setTimeout(() => attempt(tries + 1), SCROLL_RETRY_MS);
    }
  };

  attempt(0);
}

type DockNavigationProps = {
  variant: DockVariant;
};

export default function DockNavigation({ variant }: DockNavigationProps) {
  const config = dockConfigs[variant];
  const { items: allItems, scrollSections, topTargetId, mobileItemIds } = config;
  const { open, minimized, openChat } = useChatBot();
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [metrics, setMetrics] = useState<DockMetrics>(() => getDockMetrics());
  const magnifyRefs = useRef<(HTMLElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const mouseXRef = useRef<number | null>(null);

  const { baseSize, maxScale, isMobile, overflowTop } = metrics;

  const visibleItems = useMemo(() => {
    if (!isMobile) return allItems;
    return allItems.filter((item) => mobileItemIds.includes(item.id));
  }, [allItems, isMobile, mobileItemIds]);

  const showLogo = !isMobile;
  const magnifyCount = visibleItems.length + (showLogo ? 1 : 0) + 1;

  const [scales, setScales] = useState<number[]>(() =>
    Array.from({ length: magnifyCount }, () => 1),
  );
  const [activeId, setActiveId] = useState(
    variant === "home" ? "home" : "work",
  );

  useEffect(() => {
    setScales(Array.from({ length: magnifyCount }, () => 1));
  }, [magnifyCount]);

  const itemRefIndex = useCallback(
    (itemIndex: number) => (showLogo ? 1 : 0) + itemIndex,
    [showLogo],
  );
  const chatRefIndex = visibleItems.length + (showLogo ? 1 : 0);

  const applyScales = useCallback(() => {
    const mouseX = mouseXRef.current;
    if (mouseX === null || reducedMotion || maxScale <= 1) {
      setScales(Array.from({ length: magnifyCount }, () => 1));
      return;
    }

    const next = magnifyRefs.current.map((el) => {
      if (!el) return 1;
      const rect = el.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      return scaleForDistance(Math.abs(mouseX - center), maxScale);
    });
    setScales(next);
  }, [magnifyCount, maxScale, reducedMotion]);

  useEffect(() => {
    const update = () => setMetrics(getDockMetrics());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reducedMotion || maxScale <= 1) return;
    mouseXRef.current = e.clientX;
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      applyScales();
    });
  };

  const handleMouseLeave = () => {
    mouseXRef.current = null;
    setScales(Array.from({ length: magnifyCount }, () => 1));
  };

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY + window.innerHeight * 0.35;
        let current = scrollSections[0] ?? "home";

        if (window.scrollY < 120) {
          current = "home";
        } else {
          for (let i = scrollSections.length - 1; i >= 0; i--) {
            const sectionId = scrollSections[i];
            const el = document.getElementById(sectionId);
            if (el && y >= el.offsetTop) {
              current = sectionId === "latest-works" ? "work" : sectionId;
              break;
            }
          }
        }

        setActiveId(current);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollSections]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    },
    [],
  );

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string,
  ) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setActiveId(id);
    scrollToId(href.slice(1), reducedMotion ? "auto" : "smooth");
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;
    e.preventDefault();
    setActiveId("home");
    scrollToId("home", reducedMotion ? "auto" : "smooth");
  };

  const logoScale = scales[0] ?? 1;
  const chatScale = scales[chatRefIndex] ?? 1;
  const chatActive = open && !minimized;
  const chatStyle = itemStyle(chatScale, baseSize);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex items-end justify-center overflow-visible px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] sm:px-4 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))]"
      style={{ paddingTop: maxScale > 1 ? overflowTop : undefined }}
    >
      <motion.nav
        initial={{ y: 120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22, delay: 0.35 }}
        aria-label="Page navigation"
        className="dm-dock pointer-events-auto"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ "--dock-icon-size": `${baseSize}px` } as CSSProperties}
      >
        <div className="dm-dock-glass" aria-hidden>
          <div className="dm-dock-shimmer absolute inset-0 rounded-[22px]" />
        </div>

        <div className="dm-dock-track">
          {showLogo && (
            <>
              <Link
                ref={(el) => {
                  magnifyRefs.current[0] = el;
                }}
                href="/"
                onClick={handleLogoClick}
                className="dm-dock-logo group relative z-20 flex shrink-0 flex-col items-center overflow-visible"
                aria-label="Addis Reality home"
                style={itemStyle(logoScale, baseSize)}
              >
                <span className="dm-dock-icon relative flex h-full w-full items-center justify-center overflow-hidden rounded-[14px] border border-white/30 bg-[#08243A] shadow-lg">
                  <Image
                    src="/img/White-with-background-removebg-preview.png"
                    alt=""
                    width={32}
                    height={32}
                    className="h-[70%] w-auto object-contain"
                  />
                  <span className="dm-dock-reflection" aria-hidden />
                </span>
                <span className="dm-dock-tooltip">Addis Reality</span>
              </Link>

              <div className="dm-dock-divider z-10 shrink-0" aria-hidden />
            </>
          )}

          <div className="dm-dock-scroll">
            <ul className="relative z-20 flex items-end gap-1 lg:gap-1.5">
              {visibleItems.map((item, index) => {
                const Icon = item.icon;
                const refIndex = itemRefIndex(index);
                const scale = scales[refIndex] ?? 1;
                const isActive = activeId === item.id;
                const style = itemStyle(scale, baseSize);

                return (
                  <li key={item.id} className="list-none shrink-0 overflow-visible">
                    <Link
                      ref={(el) => {
                        magnifyRefs.current[refIndex] = el;
                      }}
                      href={item.href}
                      onClick={(e) => handleItemClick(e, item.href, item.id)}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      className="dm-dock-item group relative z-20 flex flex-col items-center overflow-visible"
                      style={{ width: style.width, transform: style.transform }}
                      title={item.label}
                    >
                    <span
                      className={`dm-dock-icon relative flex items-center justify-center overflow-hidden rounded-[14px] border bg-gradient-to-br shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-shadow duration-200 group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] ${item.gradient} ${
                        isActive
                          ? "border-white/50 ring-2 ring-white/40 lg:border-white/25 lg:ring-0"
                          : "border-white/25"
                      }`}
                      style={{
                        width: style.width,
                        height: style.height,
                        boxShadow: isActive
                          ? `0 0 28px ${item.glow}, 0 8px 24px rgba(0,0,0,0.35)`
                          : undefined,
                      }}
                    >
                      <Icon
                        className="h-[52%] w-[52%] text-white drop-shadow-sm"
                        stroke={1.75}
                      />
                      <span className="dm-dock-reflection" aria-hidden />
                    </span>

                    <span
                      className={`dm-dock-dot mt-1 hidden rounded-full transition-all duration-300 lg:mt-1.5 lg:block lg:h-1 lg:w-1 ${
                        isActive
                          ? "scale-100 bg-white opacity-100"
                          : "scale-0 opacity-0"
                      }`}
                    />

                    <span className="dm-dock-tooltip">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            </ul>
          </div>

          <button
            type="button"
            ref={(el) => {
              magnifyRefs.current[chatRefIndex] = el;
            }}
            onClick={openChat}
            aria-label="Open chat assistant"
            aria-pressed={chatActive}
            className="dm-dock-chat group relative z-20 flex shrink-0 flex-col items-center overflow-visible"
            style={{
              width: chatStyle.width,
              transform: chatStyle.transform,
            }}
          >
            <span
              className="dm-dock-icon relative flex items-center justify-center overflow-hidden rounded-[14px] border border-white/25 bg-[#08243A] shadow-[0_8px_24px_rgba(0,0,0,0.35)] ring-1 ring-fuchsia-400/30"
              style={{
                width: chatStyle.width,
                height: chatStyle.height,
                boxShadow: chatActive
                  ? "0 0 28px rgba(236,72,153,0.55), 0 8px 24px rgba(0,0,0,0.35)"
                  : undefined,
              }}
            >
              <Image
                src="/img/Ai-icon.png"
                alt=""
                width={64}
                height={64}
                className="h-full w-full scale-[1.35] object-contain lg:scale-[1.42]"
              />
              <span className="dm-dock-reflection" aria-hidden />
            </span>
            <span
              className={`dm-dock-dot mt-1 hidden rounded-full transition-all duration-300 lg:mt-1.5 lg:block lg:h-1 lg:w-1 ${
                chatActive ? "scale-100 bg-white opacity-100" : "scale-0 opacity-0"
              }`}
            />
            <span className="dm-dock-tooltip">Chat</span>
          </button>

          <div className="dm-dock-divider z-10 hidden lg:block" aria-hidden />

          <button
            type="button"
            onClick={() => {
              setActiveId("home");
              scrollToId(topTargetId, reducedMotion ? "auto" : "smooth");
            }}
            className="dm-dock-cta group relative z-10 hidden shrink-0 lg:flex"
            aria-label="Back to top"
          >
            <span className="flex items-center gap-1.5 rounded-full border border-[#C79D6D]/40 bg-[#C79D6D]/15 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#e8c9a8] backdrop-blur-sm transition-all group-hover:border-[#C79D6D]/60 group-hover:bg-[#C79D6D]/25 sm:px-4 sm:text-xs">
              <IconSparkles className="h-3.5 w-3.5" />
              Top
            </span>
          </button>
        </div>
      </motion.nav>
    </div>
  );
}
