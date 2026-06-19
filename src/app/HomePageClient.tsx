"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IntroLoader from "./components/IntroLoader";
import DockNavigation from "./components/DockNavigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import LazyMount from "./components/LazyMount";
import { ChatBotProvider } from "./components/ChatBot";

const ServicesSection = dynamic(() => import("./components/ServicesSection"), {
  ssr: false,
});
const WhoWeAreSection = dynamic(() => import("./components/WhoWeAreSection"), {
  ssr: false,
});
const LatestWorksSection = dynamic(
  () => import("./components/LatestWorksSection"),
  { ssr: false },
);
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});
const TrustedBySection = dynamic(
  () => import("./components/TrustedBySection"),
  { ssr: false },
);
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
});
const PhoneMarketingSection = dynamic(
  () => import("./components/PhoneMarketingSection"),
  { ssr: false },
);
const CustomCursor = dynamic(() => import("./components/CustomCursor"), {
  ssr: false,
});
const SocialMediaModal = dynamic(
  () => import("./components/SocialMediaModal"),
  { ssr: false },
);

function isMobileDevice() {
  if (typeof window === "undefined") return true;
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

function GalaxyBackground() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setShow(!isMobileDevice() && !reducedMotion);
  }, []);

  if (!show) return null;

  return (
    <>
      <div className="galaxy-bg" />
      <div className="stars">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>
    </>
  );
}

type HomePageClientProps = {
  children?: React.ReactNode;
};

export default function HomePageClient({ children }: HomePageClientProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024 && !isMobileDevice());
  }, []);

  return (
    <ChatBotProvider>
      <div
        className="relative min-h-screen overflow-x-hidden pb-28 sm:pb-32"
        style={{ cursor: isDesktop ? "none" : undefined }}
      >
        <IntroLoader />
        <GalaxyBackground />
        <main className="relative z-10">
          <HeroSection />
          <WhoWeAreSection />
          <LazyMount minHeight="500px">
            <ServicesSection />
          </LazyMount>
          <PhoneMarketingSection />
          <LazyMount minHeight="300px">
            <TrustedBySection />
          </LazyMount>
          <LazyMount minHeight="500px">
            <LatestWorksSection />
          </LazyMount>
          <LazyMount minHeight="400px">
            <TestimonialsSection />
          </LazyMount>
          {children}
          <LazyMount minHeight="400px">
            <ContactSection />
          </LazyMount>
        </main>
        <Footer />
        <SocialMediaModal />
        {isDesktop && <CustomCursor />}
      </div>
      <DockNavigation variant="home" />
    </ChatBotProvider>
  );
}
