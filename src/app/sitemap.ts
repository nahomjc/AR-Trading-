import type { MetadataRoute } from "next";
import { services, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${url}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${url}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...serviceRoutes];
}
