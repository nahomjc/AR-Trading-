import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// 'Growth' is self-hosted via globals.css @font-face under --font-growth

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ar-solutions-plc.com"),
  title: {
    default:
      "AR Solutions PLC - Leading Digital Marketing & Trading Solutions | Ethiopia",
    template: "%s | AR Solutions PLC",
  },
  description:
    "AR Solutions PLC - Ethiopia's premier provider of digital marketing, advertising, branding, web development, and trading solutions. Transform your business with AR Solution's innovative services including AR Solution Trading, media production, event planning, and professional training. Trusted by leading businesses across Ethiopia.",
  keywords: [
    "AR Solutions",
    "AR Solution",
    "AR Solution Trading",
    "AR Solution Printing",
    "AR Solution Branding",
    "AR Solution Media Production",
    "AR Solution Event Planning",
    "AR Solution Training",
    "AR Solution Web Development",
    "AR Solution Digital Marketing",
    "AR Solution Advertising",
    "AR Solution Branding",
    "AR Solution Training",
    "AR Solution Training PLC",
    "AR Solutions PLC",
    "digital marketing Ethiopia",
    "advertising services Ethiopia",
    "branding design Ethiopia",
    "web development Ethiopia",
    "media production Ethiopia",
    "event planning Ethiopia",
    "trading solutions Ethiopia",
    "business solutions Ethiopia",
    "marketing agency Ethiopia",
    "creative agency Ethiopia",
    "AR trading",
    "best digital marketing company Ethiopia",
    "top advertising agency Ethiopia",
    "professional branding services",
    "web design Ethiopia",
    "SEO services Ethiopia",
    "social media marketing Ethiopia",
    "content marketing Ethiopia",
    "graphic design Ethiopia",
    "video production Ethiopia",
    "corporate training Ethiopia",
  ],
  authors: [{ name: "AR Solutions PLC" }],
  creator: "AR Solutions PLC",
  publisher: "AR Solutions PLC",
  category: "Business Services",
  classification: "Digital Marketing, Advertising, Trading Solutions",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["am_ET"],
    url: "https://www.ar-solutions-plc.com",
    siteName: "AR Solutions PLC",
    title:
      "AR Solutions PLC - Leading Digital Marketing & Trading Solutions | Ethiopia",
    description:
      "Ethiopia's premier provider of digital marketing, advertising, branding, web development, and trading solutions. Transform your business with AR Solution's innovative services including AR Solution Trading, media production, event planning, and professional training.",
    images: [
      {
        url: "/img/White-with-background-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "AR Solutions PLC - Digital Marketing & Trading Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "AR Solutions PLC - Digital Marketing & Trading Solutions | Ethiopia",
    description:
      "Ethiopia's premier provider of digital marketing, advertising, branding, web development, and trading solutions. Transform your business today.",
    images: ["/img/White-with-background-removebg-preview.png"],
    creator: "@ARSolutionsPLC",
    site: "@ARSolutionsPLC",
  },
  alternates: {
    canonical: "https://www.ar-solutions-plc.com",
    languages: {
      "en-US": "https://www.ar-solutions-plc.com",
      "am-ET": "https://www.ar-solutions-plc.com",
    },
  },
  icons: {
    icon: [
      { url: "/img/White-with-background-removebg-preview.png", sizes: "any" },
    ],
    apple: [
      {
        url: "/img/White-with-background-removebg-preview.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/img/White-with-background-removebg-preview.png",
  },
  manifest: "/manifest.json",
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-verification-code",
    // yandex: "your-verification-code",
    // bing: "your-verification-code",
  },
  other: {
    "theme-color": "#0f172a",
    "color-scheme": "dark",
    "format-detection": "telephone=yes",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "geo.region": "ET",
    "geo.placename": "Ethiopia",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.ar-solutions-plc.com/#organization",
    name: "AR Solutions PLC",
    alternateName: ["AR Solution", "AR Solution Trading", "AR Solutions"],
    url: "https://www.ar-solutions-plc.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.ar-solutions-plc.com/img/White-with-background-removebg-preview.png",
      width: 1200,
      height: 630,
    },
    image:
      "https://www.ar-solutions-plc.com/img/White-with-background-removebg-preview.png",
    description:
      "AR Solutions PLC - Ethiopia's premier provider of digital marketing, advertising, branding, web development, media production, event planning, training, and trading solutions. Transforming businesses across Ethiopia with innovative digital solutions.",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
      addressRegion: "Ethiopia",
    },
    areaServed: {
      "@type": "Country",
      name: "Ethiopia",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+251-988-175-550",
        contactType: "Customer Service",
        email: "artradingplc@gmail.com",
        availableLanguage: ["English", "Amharic"],
        areaServed: "ET",
      },
      {
        "@type": "ContactPoint",
        telephone: "+251-988-175-550",
        contactType: "Sales",
        email: "artradingplc@gmail.com",
        availableLanguage: ["English", "Amharic"],
      },
    ],
    sameAs: [
      // Add your social media URLs here when available
      // "https://www.facebook.com/arsolutions",
      // "https://www.linkedin.com/company/ar-solutions",
      // "https://twitter.com/ARSolutionsPLC",
      // "https://www.instagram.com/arsolutions",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    knowsAbout: [
      "Digital Marketing",
      "Advertising",
      "Branding",
      "Web Development",
      "Media Production",
      "Event Planning",
      "Training",
      "Trading Solutions",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.ar-solutions-plc.com/#website",
    name: "AR Solutions PLC",
    alternateName: ["AR Solution Trading", "AR Solutions"],
    url: "https://www.ar-solutions-plc.com",
    description:
      "AR Solutions PLC - Ethiopia's leading digital marketing, advertising, branding, web development, and trading solutions provider.",
    inLanguage: ["en-US", "am-ET"],
    publisher: {
      "@id": "https://www.ar-solutions-plc.com/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate:
          "https://www.ar-solutions-plc.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased font-growth bg-slate-900 text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
