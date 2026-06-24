"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { siteConfig } from "@/lib/seo";

const TEAM_IMAGE = "/img/ar-image/DSC03209.jpg";
const CARTOON_IMAGE =
  "/img/ar-image/c5030357-8d99-4e91-bfa0-b9c31fbc0aac.jpg";

const AMBIENT_INTERVAL_MS = 2400;

type Circle = {
  r: number;
  cx: number;
  cy: number;
};

type TeamHotspot = {
  id: number;
  name: string;
  circle: Circle;
};

function circleClipPath({ r, cx, cy }: Circle): string {
  return `circle(${r}% at ${cx}% ${cy}%)`;
}

const TEAM_HOTSPOTS: TeamHotspot[] = [
  { id: 7, name: "Team member", circle: { r: 16, cx: 11, cy: 68 } },
  { id: 8, name: "Team member", circle: { r: 16, cx: 28, cy: 68 } },
  { id: 9, name: "Magenta shirt", circle: { r: 19, cx: 48, cy: 66 } },
  { id: 10, name: "Team member", circle: { r: 20, cx: 72, cy: 68 } },
  { id: 1, name: "Robson", circle: { r: 14, cx: 8, cy: 25 } },
  { id: 2, name: "Abenezer", circle: { r: 14, cx: 18, cy: 24 } },
  { id: 3, name: "Keneni", circle: { r: 14, cx: 29, cy: 23 } },
  { id: 4, name: "Nahom", circle: { r: 14, cx: 40, cy: 22 } },
  { id: 5, name: "Team member", circle: { r: 15, cx: 52, cy: 21 } },
  { id: 6, name: "Team member", circle: { r: 20, cx: 80, cy: 20 } },
];

function findHotspotAtPoint(px: number, py: number): number | null {
  let bestId: number | null = null;
  let bestDist = Number.POSITIVE_INFINITY;

  for (const spot of TEAM_HOTSPOTS) {
    const { cx, cy, r } = spot.circle;
    const dist = Math.hypot(px - cx, py - cy);
    if (dist <= r * 1.25 && dist < bestDist) {
      bestDist = dist;
      bestId = spot.id;
    }
  }

  return bestId;
}

function pickRandomHotspotId(excludeId?: number | null): number {
  const pool =
    excludeId != null
      ? TEAM_HOTSPOTS.filter((s) => s.id !== excludeId)
      : TEAM_HOTSPOTS;
  const spot = pool[Math.floor(Math.random() * pool.length)] ?? TEAM_HOTSPOTS[0];
  return spot.id;
}

export function TeamPhotoSection() {
  const containerRef = useRef<HTMLButtonElement>(null);
  const [userHoverId, setUserHoverId] = useState<number | null>(null);
  const [ambientId, setAmbientId] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setAmbientId(null);
      return;
    }

    setAmbientId(pickRandomHotspotId());

    const interval = window.setInterval(() => {
      setAmbientId((current) => pickRandomHotspotId(current));
    }, AMBIENT_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  const activeHotspot = useMemo(() => {
    const id = userHoverId ?? ambientId;
    return id != null
      ? (TEAM_HOTSPOTS.find((spot) => spot.id === id) ?? null)
      : null;
  }, [userHoverId, ambientId]);

  const updateHoverFromEvent = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = ((clientX - rect.left) / rect.width) * 100;
      const py = ((clientY - rect.top) / rect.height) * 100;
      setUserHoverId(findHotspotAtPoint(px, py));
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updateHoverFromEvent(e.clientX, e.clientY);
    },
    [updateHoverFromEvent]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateHoverFromEvent(touch.clientX, touch.clientY);
    },
    [updateHoverFromEvent]
  );

  const handlePhotoLeave = useCallback(() => {
    setUserHoverId(null);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 100;
      const py = ((e.clientY - rect.top) / rect.height) * 100;
      const id = findHotspotAtPoint(px, py);
      setUserHoverId((current) => (current === id ? null : id));
    },
    []
  );

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="relative border-t border-white/[0.06] px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <span className="mb-6 inline-block rounded-full border border-[#C69c6c]/30 bg-gradient-to-r from-[#C69c6c]/20 to-[#d4a574]/20 px-4 py-2 text-sm font-medium text-[#C69c6c] backdrop-blur-sm">
            Our Team
          </span>
          <h2
            id="team-heading"
            className="font-outfit text-3xl font-bold text-[#C79D6D] sm:text-4xl"
          >
            Meet the {siteConfig.name} Team
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            The people behind your campaigns, working together from our Addis
            Ababa office. Watch illustrated portraits appear, or hover a team
            member to focus on them.
          </p>
        </div>

        <figure className="group">
          <div className="relative rounded-2xl bg-[#0a2a42]/40 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-shadow duration-500 group-hover:shadow-[0_24px_70px_rgba(199,157,109,0.12)]">
            <button
              ref={containerRef}
              type="button"
              className="relative block w-full cursor-pointer touch-manipulation border-0 bg-transparent p-0 focus-visible:outline-none"
              aria-label="Interactive team photo: illustrated portraits appear randomly; hover a person to focus on them"
              onMouseMove={handleMouseMove}
              onMouseLeave={handlePhotoLeave}
              onTouchStart={handleTouchStart}
              onClick={handleClick}
            >
              <Image
                src={TEAM_IMAGE}
                alt={`${siteConfig.name} team at the Addis Ababa office`}
                width={1600}
                height={1200}
                className="block h-auto w-full rounded-2xl"
                sizes="(max-width: 896px) 100vw, 896px"
                quality={90}
                priority
              />

              <Image
                src={CARTOON_IMAGE}
                alt=""
                width={1600}
                height={1200}
                className="pointer-events-none absolute inset-0 h-auto w-full opacity-0"
                sizes="(max-width: 896px) 100vw, 896px"
                quality={90}
                aria-hidden
                priority
              />

              {activeHotspot && (
                <div
                  key={activeHotspot.id}
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-[50] transition-opacity duration-500 ease-in-out motion-reduce:transition-none"
                  style={{ clipPath: circleClipPath(activeHotspot.circle) }}
                >
                  <Image
                    src={CARTOON_IMAGE}
                    alt=""
                    width={1600}
                    height={1200}
                    className="block h-auto w-full"
                    sizes="(max-width: 896px) 100vw, 896px"
                    quality={90}
                  />
                </div>
              )}
            </button>
          </div>
          <figcaption className="mt-5 text-center text-sm text-gray-500">
            {siteConfig.name} · Addis Ababa, Ethiopia
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
