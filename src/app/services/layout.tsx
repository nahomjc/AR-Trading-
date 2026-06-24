import type { Metadata } from "next";
import { seoKeywords, siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Digital Marketing in Ethiopia | #1 Agency | Addis Reality Services",
  description: `Digital marketing in Ethiopia, explore ${siteConfig.name}'s services in Addis Ababa and nationwide: SEO, social media, Google Ads, advertising, branding, web development, media production, events, and training.`,
  keywords: [
    "digital marketing in ethiopia",
    "digital marketing in Ethiopia",
    "services Ethiopia",
    "digital marketing services Addis Ababa",
    ...seoKeywords.slice(0, 15),
  ],
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Digital Marketing in Ethiopia | Services | ${siteConfig.name}`,
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
