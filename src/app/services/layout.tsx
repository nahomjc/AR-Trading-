import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Digital Marketing, Advertising & Trading Solutions",
  description:
    "Explore AR Solutions PLC's comprehensive services: Digital Marketing, Advertising & Printing, Branding & Design, Media Production, Web Development, Event Planning, and Training. AR Solution Trading services available.",
  keywords: [
    "AR Solutions services",
    "AR Solution Trading",
    "digital marketing services",
    "advertising services Ethiopia",
    "branding design",
    "web development services",
    "media production",
    "event planning",
    "training services",
    "AR Solutions PLC services",
  ],
  openGraph: {
    title: "Services - AR Solutions PLC",
    description:
      "Comprehensive digital marketing, advertising, branding, web development, and trading solutions.",
    url: "https://www.ar-solutions-plc.com/services",
  },
  alternates: {
    canonical: "https://www.ar-solutions-plc.com/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

