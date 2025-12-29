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
    "@id": "https://www.ar-solutions-plc.com/#webpage",
    name: "AR Solutions PLC - Digital Marketing & Trading Solutions | Ethiopia",
    description:
      "AR Solutions PLC offers comprehensive digital marketing, advertising, branding, web development, media production, event planning, and trading solutions. Leading provider of AR Solution Trading services in Ethiopia.",
    url: "https://www.ar-solutions-plc.com",
    inLanguage: ["en-US", "am-ET"],
    isPartOf: {
      "@id": "https://www.ar-solutions-plc.com/#website",
    },
    about: {
      "@id": "https://www.ar-solutions-plc.com/#organization",
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://www.ar-solutions-plc.com/img/White-with-background-removebg-preview.png",
      width: 1200,
      height: 630,
    },
    mainEntity: {
      "@id": "https://www.ar-solutions-plc.com/#organization",
    },
    breadcrumb: {
      "@id": "https://www.ar-solutions-plc.com/#breadcrumb",
    },
    datePublished: "2020-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2"],
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://www.ar-solutions-plc.com/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.ar-solutions-plc.com",
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Digital Marketing & Trading Solutions",
    provider: {
      "@id": "https://www.ar-solutions-plc.com/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AR Solutions PLC Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Digital Marketing",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Digital Marketing Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Advertising & Printing",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Advertising & Printing Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Branding & Design",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Branding & Design Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Web Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web Development Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Media Production",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Media Production Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Event Planning",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Event Planning Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Training & Development",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Training & Development Services",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Trading Solutions",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AR Solution Trading Services",
              },
            },
          ],
        },
      ],
    },
  };

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ cursor: isDesktop ? "none" : undefined }}
    >
      {/* SEO Structured Data - Enhanced for Top Rankings */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
