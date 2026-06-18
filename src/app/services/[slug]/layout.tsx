import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getServicePageMetadata,
  getServicePageSchemas,
  services,
} from "@/lib/seo";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getServicePageMetadata(slug) ?? {};
}

export default async function ServiceSlugLayout({
  children,
  params,
}: LayoutProps) {
  const { slug } = await params;
  const schemas = getServicePageSchemas(slug);

  return (
    <>
      {schemas.length > 0 && <JsonLd data={schemas} />}
      {children}
    </>
  );
}
