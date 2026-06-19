import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/seo/FaqSection";
import { getHomePageMetadata, getHomePageSchemas } from "@/lib/seo";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = getHomePageMetadata();

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
