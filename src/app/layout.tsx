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
    default: "AR Solutions PLC - Leading Digital Marketing & Trading Solutions",
    template: "%s | AR Solutions PLC",
  },
  description:
    "AR Solutions PLC - Premier provider of digital marketing, advertising, branding, web development, and trading solutions. Transform your business with AR Solution's innovative services including AR Solution Trading, media production, and event planning.",
  keywords: [
    "AR Solutions",
    "AR Solution",
    "AR Solution Trading",
    "AR Solutions PLC",
    "digital marketing Ethiopia",
    "advertising services",
    "branding design",
    "web development",
    "media production",
    "event planning",
    "trading solutions",
    "business solutions Ethiopia",
    "marketing agency",
    "creative agency",
    "AR trading",
  ],
  authors: [{ name: "AR Solutions PLC" }],
  creator: "AR Solutions PLC",
  publisher: "AR Solutions PLC",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ar-solutions-plc.com",
    siteName: "AR Solutions PLC",
    title: "AR Solutions PLC - Leading Digital Marketing & Trading Solutions",
    description:
      "Premier provider of digital marketing, advertising, branding, web development, and trading solutions. Transform your business with AR Solution's innovative services.",
    images: [
      {
        url: "/img/White-with-background-removebg-preview.png",
        width: 1200,
        height: 630,
        alt: "AR Solutions PLC",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AR Solutions PLC - Digital Marketing & Trading Solutions",
    description:
      "Premier provider of digital marketing, advertising, branding, web development, and trading solutions.",
    images: ["/img/White-with-background-removebg-preview.png"],
  },
  alternates: {
    canonical: "https://www.ar-solutions-plc.com",
  },
  icons: {
    icon: "/img/White-with-background-removebg-preview.png",
    apple: "/img/White-with-background-removebg-preview.png",
  },
  verification: {
    // Add your Google Search Console verification code here when available
    // google: "your-verification-code",
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
    name: "AR Solutions PLC",
    alternateName: "AR Solution",
    url: "https://www.ar-solutions-plc.com",
    logo: "https://www.ar-solutions-plc.com/img/White-with-background-removebg-preview.png",
    description:
      "AR Solutions PLC - Premier provider of digital marketing, advertising, branding, web development, and trading solutions.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+251-988-175-550",
      contactType: "Customer Service",
      email: "artradingplc@gmail.com",
    },
    sameAs: [
      // Add your social media URLs here when available
      // "https://www.facebook.com/arsolutions",
      // "https://www.linkedin.com/company/ar-solutions",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AR Solutions PLC",
    alternateName: "AR Solution Trading",
    url: "https://www.ar-solutions-plc.com",
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
