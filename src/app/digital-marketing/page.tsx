import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocalSeoSection } from "@/components/seo/LocalSeoSection";
import {
  getDigitalMarketingPageMetadata,
  getDigitalMarketingPageSchemas,
} from "@/lib/seo";
import DigitalMarketingPageClient from "./DigitalMarketingPageClient";

export const metadata: Metadata = getDigitalMarketingPageMetadata();

export default function DigitalMarketingPage() {
  return (
    <>
      <JsonLd data={getDigitalMarketingPageSchemas()} />
      <DigitalMarketingPageClient>
        <LocalSeoSection />
      </DigitalMarketingPageClient>
    </>
  );
}
