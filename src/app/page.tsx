"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import IntroLoader from "./components/IntroLoader";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

// Lazy load heavy components
const ScrollStars = dynamic(() => import("./components/ScrollStars"), {
  ssr: false,
});
const ChatBot = dynamic(() => import("./components/ChatBot"), {
  ssr: false,
});
const ServicesSection = dynamic(() => import("./components/ServicesSection"), {
  ssr: false,
});
const WhoWeAreSection = dynamic(() => import("./components/WhoWeAreSection"), {
  ssr: false,
});
const LatestWorksSection = dynamic(
  () => import("./components/LatestWorksSection"),
  {
    ssr: false,
  }
);
const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});
const TrustedBySection = dynamic(
  () => import("./components/TrustedBySection"),
  {
    ssr: false,
  }
);
const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("./components/CustomCursor"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("./components/ScrollToTop"), {
  ssr: false,
});
const SocialMediaModal = dynamic(
  () => import("./components/SocialMediaModal"),
  {
    ssr: false,
  }
);

// Utility to detect mobile devices
const isMobile = () =>
  typeof window !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

// Galaxy Background Component
const GalaxyBackground = () => {
  if (typeof window !== "undefined" && isMobile()) return null;
  return (
    <>
      <div className="galaxy-bg"></div>
      <ScrollStars />
      <div className="stars">
        {[...Array(18)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>
    </>
  );
};

// Main Page Component
export default function Home() {
  // Only show custom cursor on desktop
  const isDesktop =
    typeof window !== "undefined" &&
    window.innerWidth >= 1024 &&
    !/Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const [isMobileClient, setIsMobileClient] = useState(false);

  useEffect(() => {
    setIsMobileClient(isMobile());
  }, []);

  // SEO Structured Data for Home Page
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AR Solutions PLC - Digital Marketing & Trading Solutions",
    description:
      "AR Solutions PLC offers comprehensive digital marketing, advertising, branding, web development, media production, event planning, and trading solutions. Leading provider of AR Solution Trading services.",
    url: "https://www.ar-solutions-plc.com",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: "AR Solutions PLC",
      url: "https://www.ar-solutions-plc.com",
    },
    about: {
      "@type": "Thing",
      name: "AR Solutions PLC - Digital Marketing & Trading Solutions",
      description: "Professional trading solutions and business services",
    },
    mainEntity: {
      "@type": "Organization",
      name: "AR Solutions PLC",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ar-solutions-plc.com",
      },
    ],
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ cursor: isDesktop ? "none" : undefined }}
    >
      {/* SEO Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <IntroLoader />
      <GalaxyBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <WhoWeAreSection />
        <ServicesSection />
        <TrustedBySection />

        <LatestWorksSection />

        <TestimonialsSection />

        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
      <ScrollToTop />
      <SocialMediaModal />
      {isDesktop && <CustomCursor />}
    </div>
  );
}
