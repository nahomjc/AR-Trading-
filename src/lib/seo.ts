import type { Metadata } from "next";

export const siteConfig = {
  name: "Addis Reality",
  legalName: "Addis Reality PLC",
  alternateNames: [
    "AR Solutions",
    "Addis Reality Trading",
    "AR Trading PLC",
  ],
  tagline: "Digital Marketing, Advertising & Trading Solutions in Ethiopia",
  url: "https://www.ar-solutions-plc.com",
  locale: "en_US",
  languages: ["en-US", "am-ET"] as const,
  foundingDate: "2020",
  description:
    "Addis Reality is Ethiopia's leading digital marketing, advertising, branding, web development, media production, event planning, training, and trading solutions company based in Addis Ababa.",
  shortDescription:
    "Ethiopia's premier digital marketing agency and trading solutions provider in Addis Ababa.",
  ogImage: "/img/White-with-background-removebg-preview.png",
  siteIcon: "/img/White-with-background-removebg-preview.png",
  twitterHandle: "@addis_reality",
  contact: {
    email: "artradingplc@gmail.com",
    phone: "+251981668976",
    phoneDisplay: "+251 981 668 976",
    address: {
      street: "9th floor, Kazadis Bldg, Kazanchis",
      city: "Addis Ababa",
      region: "Addis Ababa",
      country: "Ethiopia",
      countryCode: "ET",
      postalCode: "1000",
    },
    fullAddress:
      "9th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia",
  },
  social: {
    facebook:
      "https://www.facebook.com/profile.php?id=61584982463040",
    instagram:
      "https://www.instagram.com/addis_reality?igsh=NXVqYXhzbm1xZ2M1",
    tiktok:
      "https://www.tiktok.com/@ar_solutions?_r=1&_t=ZM-91beinQ70uq",
  },
  geo: {
    latitude: 9.0192,
    longitude: 38.7525,
  },
} as const;

export const seoKeywords = [
  "Addis Reality",
  "digital marketing Ethiopia",
  "digital marketing agency Addis Ababa",
  "advertising company Ethiopia",
  "branding agency Ethiopia",
  "web development Ethiopia",
  "SEO services Ethiopia",
  "social media marketing Ethiopia",
  "media production Ethiopia",
  "event planning Addis Ababa",
  "corporate training Ethiopia",
  "trading solutions Ethiopia",
  "best marketing agency Ethiopia",
  "creative agency Addis Ababa",
  "graphic design Ethiopia",
  "video production Ethiopia",
] as const;

export const services = [
  {
    slug: "advertising-printing",
    title: "Advertising & Printing",
    description:
      "Banner design, vehicle branding, office signage, and merchandise printing for businesses across Ethiopia.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Social media management, paid advertising, SEO strategy, and influencer marketing to grow your brand online.",
  },
  {
    slug: "branding-design",
    title: "Branding & Design",
    description:
      "Logo design, brand identity, visual strategy, and creative content that builds memorable brands.",
  },
  {
    slug: "media-production",
    title: "Media Production",
    description:
      "Professional videography, photography, promotional content, and video editing for corporate and commercial use.",
  },
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Custom website design, development, maintenance, and technical SEO for high-performing business websites.",
  },
  {
    slug: "event-planning",
    title: "Event Planning",
    description:
      "Corporate events, conferences, product launches, and team-building experiences planned end to end.",
  },
  {
    slug: "training-development",
    title: "Training & Development",
    description:
      "Corporate training, personal development, media training, and workshops for teams and organizations.",
  },
] as const;

/** FAQ content optimized for Answer Engine Optimization (AEO) */
export const faqs = [
  {
    question: "What is Addis Reality?",
    answer:
      "Addis Reality is a full-service digital marketing, advertising, branding, web development, media production, event planning, training, and trading solutions company headquartered in Addis Ababa, Ethiopia. We help businesses grow through creative strategy and technology-driven marketing.",
  },
  {
    question: "What services does Addis Reality offer?",
    answer:
      "Addis Reality offers seven core services: Advertising & Printing, Digital Marketing, Branding & Design, Media Production, Web Development, Event Planning, and Training & Development. We also provide trading solutions for businesses operating in Ethiopia.",
  },
  {
    question: "Where is Addis Reality located?",
    answer:
      "Addis Reality is located at 9th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia. We serve clients across Ethiopia and internationally.",
  },
  {
    question: "How can I contact Addis Reality?",
    answer:
      "You can contact Addis Reality by email at artradingplc@gmail.com or by phone at +251 981 668 976. Visit our website at ar-solutions-plc.com to explore services or send a message through the contact form.",
  },
  {
    question: "Does Addis Reality provide SEO services in Ethiopia?",
    answer:
      "Yes. Addis Reality provides SEO strategy, technical SEO optimization, content marketing, and analytics as part of our Digital Marketing and Web Development services. We help Ethiopian businesses improve Google search rankings and organic traffic.",
  },
  {
    question: "Who is the best digital marketing agency in Ethiopia?",
    answer:
      "Addis Reality is recognized as one of Ethiopia's leading digital marketing agencies, trusted by government institutions, corporations, and growing businesses. We combine local market expertise with data-driven campaigns across social media, SEO, paid ads, and branding.",
  },
  {
    question: "Does Addis Reality work with small businesses and enterprises?",
    answer:
      "Yes. Addis Reality works with startups, small businesses, NGOs, government organizations, and large enterprises. Our services are tailored to each client's goals, budget, and industry.",
  },
  {
    question: "What industries does Addis Reality serve?",
    answer:
      "Addis Reality serves clients across technology, government, sports, energy, retail, hospitality, education, and trading sectors in Ethiopia. Our portfolio includes branding, digital campaigns, web platforms, and media production for diverse industries.",
  },
] as const;

export function getBaseMetadata(): Metadata {
  const { name, url, description, ogImage, twitterHandle } = siteConfig;

  return {
    metadataBase: new URL(url),
    title: {
      default: `${name} - Leading Digital Marketing & Trading Solutions | Ethiopia`,
      template: `%s | ${name}`,
    },
    description,
    keywords: [...seoKeywords],
    authors: [{ name }],
    creator: name,
    publisher: name,
    category: "Business Services",
    classification: "Digital Marketing, Advertising, Trading Solutions",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      alternateLocale: [...siteConfig.languages],
      url,
      siteName: name,
      title: `${name} - Leading Digital Marketing & Trading Solutions | Ethiopia`,
      description: siteConfig.shortDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${name} - Digital Marketing & Trading Solutions`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} - Digital Marketing & Trading Solutions | Ethiopia`,
      description: siteConfig.shortDescription,
      images: [ogImage],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: url,
      languages: {
        "en-US": url,
        "am-ET": url,
      },
    },
    icons: {
      icon: [{ url: siteConfig.siteIcon, sizes: "any", type: "image/png" }],
      apple: [
        { url: siteConfig.siteIcon, sizes: "180x180", type: "image/png" },
      ],
      shortcut: siteConfig.siteIcon,
    },
    manifest: "/manifest.json",
    verification: {
      ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }),
    },
    other: {
      "theme-color": "#0f172a",
      "color-scheme": "dark",
      "format-detection": "telephone=yes",
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "geo.region": siteConfig.contact.address.countryCode,
      "geo.placename": siteConfig.contact.address.city,
      "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
      ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
        "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
      }),
    },
  };
}

export function getOrganizationSchema() {
  const { name, url, description, foundingDate, contact, social, alternateNames } =
    siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "MarketingAgency"],
    "@id": `${url}/#organization`,
    name,
    legalName: siteConfig.legalName,
    alternateName: [...alternateNames],
    url,
    logo: {
      "@type": "ImageObject",
      url: `${url}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
    },
    image: `${url}${siteConfig.ogImage}`,
    description,
    foundingDate,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      postalCode: contact.address.postalCode,
      addressCountry: contact.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: [
      { "@type": "Country", name: "Ethiopia" },
      { "@type": "City", name: "Addis Ababa" },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer service",
        email: contact.email,
        availableLanguage: ["English", "Amharic"],
        areaServed: "ET",
      },
    ],
    sameAs: [social.facebook, social.instagram, social.tiktok],
    knowsAbout: [
      "Digital Marketing",
      "Search Engine Optimization",
      "Advertising",
      "Branding",
      "Web Development",
      "Media Production",
      "Event Planning",
      "Corporate Training",
      "Trading Solutions",
    ],
  };
}

export function getLocalBusinessSchema() {
  const org = getOrganizationSchema();

  return {
    ...org,
    "@type": ["LocalBusiness", "MarketingAgency", "ProfessionalService"],
    "@id": `${siteConfig.url}/#localbusiness`,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:30",
        closes: "17:30",
      },
    ],
  };
}

export function getWebsiteSchema() {
  const { name, url, description } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name,
    alternateName: [...siteConfig.alternateNames],
    url,
    description,
    inLanguage: [...siteConfig.languages],
    publisher: { "@id": `${url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getFaqPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getWebPageSchema(path = "") {
  const url = `${siteConfig.url}${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    url,
    inLanguage: [...siteConfig.languages],
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.ogImage}`,
      width: 1200,
      height: 630,
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#faq", "h1", "h2", ".faq-answer"],
    },
    datePublished: "2020-01-01",
    dateModified: new Date().toISOString().split("T")[0],
  };
}

export function getBreadcrumbSchema(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function getServiceCatalogSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#services`,
    serviceType: "Digital Marketing & Business Solutions",
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "Ethiopia" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${siteConfig.name} Services`,
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${siteConfig.url}/services/${service.slug}`,
        },
      })),
    },
  };
}

export function getHomePageSchemas() {
  return [
    getWebPageSchema(),
    getBreadcrumbSchema([{ name: "Home", path: "" }]),
    getServiceCatalogSchema(),
    getFaqPageSchema(),
  ];
}

export function getServicePageMetadata(slug: string): Metadata | null {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  const title = `${service.title} Services in Ethiopia`;
  const description = `${service.description} Hire ${siteConfig.name} for professional ${service.title.toLowerCase()} in Addis Ababa and across Ethiopia.`;
  const url = `${siteConfig.url}/services/${slug}`;

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.title} Ethiopia`,
      `${service.title} Addis Ababa`,
      siteConfig.name,
      ...seoKeywords.slice(0, 8),
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
    },
    alternates: { canonical: url },
  };
}

export function getServicePageSchemas(slug: string) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return [];

  const url = `${siteConfig.url}/services/${slug}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      url,
      provider: { "@id": `${siteConfig.url}/#organization` },
      areaServed: { "@type": "Country", name: "Ethiopia" },
      serviceType: service.title,
    },
    getBreadcrumbSchema([
      { name: "Home", path: "" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${slug}` },
    ]),
  ];
}
