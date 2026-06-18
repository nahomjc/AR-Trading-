import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services - Digital Marketing, Advertising & Business Solutions",
  description: `Explore ${siteConfig.name}'s services: Digital Marketing, Advertising & Printing, Branding & Design, Media Production, Web Development, Event Planning, and Training across Ethiopia.`,
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
  openGraph: {
    title: `Services | ${siteConfig.name}`,
    description: siteConfig.shortDescription,
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
