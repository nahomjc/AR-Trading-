import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { getBaseMetadata, getHomePageSchemas, siteConfig } from "@/lib/seo";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  ...getBaseMetadata(),
  title: {
    absolute: `${siteConfig.name} - #1 Digital Marketing Agency in Ethiopia | Addis Ababa`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={getHomePageSchemas()} />
      <HomePageClient>
        <FaqSection />
      </HomePageClient>
    </>
  );
}
