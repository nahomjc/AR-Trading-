import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Digital Marketing, Advertising & Trading Solutions",
  description:
    "Explore Addis Reality's comprehensive services: Digital Marketing, Advertising & Printing, Branding & Design, Media Production, Web Development, Event Planning, and Training. Addis Reality Trading services available.",
  keywords: [
    "Addis Reality services",
    "Addis Reality Trading",
    "Addis Reality Printing",
    "Addis Reality Branding",
    "Addis Reality Media Production",
    "Addis Reality Event Planning",
    "Addis Reality Training",
    "Addis Reality Web Development",
    "Addis Reality Digital Marketing",
    "Addis Reality Advertising",
    "Addis Reality Branding",
    "Addis Reality Training",
    "Addis Reality Training",
    "digital marketing services",
    "advertising services Ethiopia",
    "branding design",
    "web development services",
    "media production",
    "event planning",
    "training services",
    "Addis Reality services",
  ],
  openGraph: {
    title: "Services - Addis Reality",
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
