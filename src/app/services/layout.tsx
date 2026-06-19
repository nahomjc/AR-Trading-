import type { Metadata } from "next";
import { seoKeywords, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "#1 Digital Marketing, Advertising & Business Services in Ethiopia",
  description: `Explore ${siteConfig.name}'s services in Addis Ababa and across Ethiopia: Digital Marketing, SEO, Advertising & Printing, Branding, Media Production, Web Development, Events, and Training.`,
  keywords: [
    "services Ethiopia",
    "digital marketing services Addis Ababa",
    ...seoKeywords.slice(0, 15),
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Services in Ethiopia | ${siteConfig.name}`,
    description: siteConfig.description,
    url: `${siteConfig.url}/services`,
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
