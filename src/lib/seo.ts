import type { Metadata } from "next";

export const siteConfig = {
  name: "Addis Reality",
  legalName: "Addis Reality PLC",
  alternateNames: [
    "AR Solutions",
    "AR Solutions PLC",
    "AR solution trading PLC",
    "Addis Reality Trading",
    "AR Trading PLC",
  ],
  tagline: "Ethiopia's #1 Digital Marketing, Advertising & Trading Solutions",
  url: "https://www.ar-solutions-plc.com",
  locale: "en_ET",
  languages: ["en-ET", "en-US", "am-ET"] as const,
  foundingDate: "2020",
  description:
    "Addis Reality (AR Solutions PLC) is Ethiopia's top-rated digital marketing agency in Addis Ababa — offering SEO, social media marketing, Google Ads, branding, web development, media production, printing, event planning, and trading solutions nationwide.",
  shortDescription:
    "Ethiopia's #1 digital marketing agency & trading solutions provider in Addis Ababa. SEO, branding, web design & advertising.",
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
  serviceAreas: [
    "Addis Ababa",
    "Bahir Dar",
    "Hawassa",
    "Mekelle",
    "Dire Dawa",
    "Adama",
    "Gondar",
    "Jimma",
  ],
  googleMapsUrl:
    "https://maps.google.com/?q=Kazadis+Building+Kazanchis+Addis+Ababa+Ethiopia",
} as const;

export const testimonials = [
  {
    author: "Mr. Melkamu Mekonnen",
    role: "Group CEO at Haile Hospitality Group",
    reviewBody:
      "Addis Reality consistently delivers exceptional results. Their professional approach and attention to detail exceed expectations.",
    rating: 5,
    datePublished: "2024-03-01",
  },
  {
    author: "Mr. Bikila Hurisa",
    role: "Public & International Relations Director at Prosperity Party",
    reviewBody:
      "Exemplary quality services in rebranding solutions. Outstanding reputation for excellence and reliability in the industry.",
    rating: 5,
    datePublished: "2024-01-01",
  },
  {
    author: "Mr. Fisseha Asress",
    role: "Senior Consultant & Advisor at Ethiopian Airlines",
    reviewBody:
      "Confidently recommend Addis Reality for brand strategy, website development, digital marketing, and tech services.",
    rating: 5,
    datePublished: "2023-11-01",
  },
] as const;

export const seoKeywords = [
  "Addis Reality",
  "AR Solutions PLC",
  "AR solution trading PLC",
  "digital marketing Ethiopia",
  "digital marketing agency Addis Ababa",
  "best digital marketing company Ethiopia",
  "top marketing agency Ethiopia",
  "#1 digital marketing agency Ethiopia",
  "advertising company Ethiopia",
  "advertising agency Addis Ababa",
  "branding agency Ethiopia",
  "logo design Addis Ababa",
  "web development Ethiopia",
  "website design Ethiopia",
  "SEO services Ethiopia",
  "SEO company Addis Ababa",
  "social media marketing Ethiopia",
  "social media agency Addis Ababa",
  "Google Ads Ethiopia",
  "Meta ads Ethiopia",
  "media production Ethiopia",
  "video production Addis Ababa",
  "event planning Addis Ababa",
  "corporate training Ethiopia",
  "trading solutions Ethiopia",
  "creative agency Addis Ababa",
  "graphic design Ethiopia",
  "printing services Addis Ababa",
  "banner printing Ethiopia",
  "Kazanchis marketing agency",
  "Bole digital marketing",
  "Ethiopian marketing company",
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
  {
    question: "What is the best digital marketing company in Addis Ababa?",
    answer:
      "Addis Reality (AR Solutions PLC) is widely regarded as one of the best digital marketing companies in Addis Ababa, Ethiopia. Based in Kazanchis, we deliver SEO, social media marketing, Google Ads, branding, and web development for businesses across the country.",
  },
  {
    question: "Does Addis Reality offer website design and SEO in Ethiopia?",
    answer:
      "Yes. Addis Reality builds fast, mobile-friendly websites with technical SEO, schema markup, and Google Search optimization — helping Ethiopian businesses rank higher on Google and attract more customers online.",
  },
  {
    question: "Which company provides social media marketing in Ethiopia?",
    answer:
      "Addis Reality manages social media for brands on Facebook, Instagram, TikTok, and LinkedIn. We create content, run paid campaigns, and grow audiences for companies in Addis Ababa and across Ethiopia.",
  },
  {
    question: "Does Addis Reality serve clients outside Addis Ababa?",
    answer:
      "Yes. While headquartered in Kazanchis, Addis Ababa, Addis Reality serves clients nationwide — including Bahir Dar, Hawassa, Mekelle, Dire Dawa, Adama, Gondar, and Jimma — with remote and on-site project delivery.",
  },
  {
    question: "Where can I get advertising and printing services in Ethiopia?",
    answer:
      "Addis Reality provides banner design, vehicle branding, office signage, merchandise printing, and outdoor advertising for businesses in Addis Ababa and throughout Ethiopia. Contact us at +251 981 668 976 for a quote.",
  },
  {
    question: "How do I hire a branding agency in Ethiopia?",
    answer:
      "Contact Addis Reality at artradingplc@gmail.com or visit ar-solutions-plc.com. We offer logo design, brand identity, visual strategy, and creative content tailored to the Ethiopian market.",
  },
] as const;

export function getBaseMetadata(): Metadata {
  const { name, url, description, ogImage, twitterHandle } = siteConfig;

  return {
    metadataBase: new URL(url),
    title: {
      default: `${name} | #1 Digital Marketing Agency in Ethiopia`,
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
      title: `${name} | #1 Digital Marketing Agency in Ethiopia`,
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
      title: `${name} | #1 Digital Marketing Agency in Ethiopia`,
      description: siteConfig.shortDescription,
      images: [ogImage],
      creator: twitterHandle,
      site: twitterHandle,
    },
    alternates: {
      canonical: url,
      languages: {
        "en-ET": url,
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
      ...siteConfig.serviceAreas.map((city) => ({
        "@type": "City" as const,
        name: city,
      })),
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
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "sales",
        email: contact.email,
        availableLanguage: ["English", "Amharic"],
        areaServed: "ET",
      },
    ],
    sameAs: [social.facebook, social.instagram, social.tiktok],
    slogan: siteConfig.tagline,
    review: testimonials.map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.author, jobTitle: t.role },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
      },
      reviewBody: t.reviewBody,
      datePublished: t.datePublished,
    })),
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
    hasMap: siteConfig.googleMapsUrl,
    isAccessibleForFree: false,
    currenciesAccepted: "ETB, USD",
    paymentAccepted: "Cash, Bank Transfer",
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
    getItemListSchema(),
  ];
}

export function getItemListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${siteConfig.url}/#service-list`,
    name: "Addis Reality Services in Ethiopia",
    description:
      "Full-service digital marketing, advertising, and business solutions offered across Ethiopia",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${service.title} in Ethiopia`,
      url: `${siteConfig.url}/services/${service.slug}`,
    })),
  };
}

export function getHomePageMetadata(): Metadata {
  return {
    ...getBaseMetadata(),
    title: {
      absolute: `${siteConfig.name} | #1 Digital Marketing Agency in Ethiopia | Addis Ababa`,
    },
    description: siteConfig.description,
    keywords: [...seoKeywords],
    alternates: {
      canonical: siteConfig.url,
    },
    openGraph: {
      title: `${siteConfig.name} | #1 Digital Marketing Agency in Ethiopia`,
      description: siteConfig.description,
      url: siteConfig.url,
      type: "website",
    },
  };
}

export function getDigitalMarketingPageMetadata(): Metadata {
  const title =
    "Digital Marketing Ethiopia | #1 Agency in Addis Ababa | Addis Reality";
  const description =
    "Addis Reality (AR Solutions PLC) is Addis Ababa's leading full-service agency for digital marketing, branding, web development, advertising & printing, and media production. Serving Addis Ababa, Bahir Dar, Hawassa, Mekelle, and nationwide.";
  const url = `${siteConfig.url}/digital-marketing`;

  return {
    ...getBaseMetadata(),
    title: { absolute: title },
    description,
    keywords: [
      "digital marketing Ethiopia",
      "digital marketing agency Addis Ababa",
      "best digital marketing company Ethiopia",
      ...seoKeywords.slice(0, 15),
    ],
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: siteConfig.locale,
    },
    alternates: { canonical: url },
  };
}

export function getDigitalMarketingPageSchemas() {
  const digitalMarketing = services.find((s) => s.slug === "digital-marketing");

  return [
    getWebPageSchema("/digital-marketing"),
    getBreadcrumbSchema([
      { name: "Home", path: "" },
      { name: "Digital Marketing", path: "/digital-marketing" },
    ]),
    ...(digitalMarketing
      ? [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: digitalMarketing.title,
            description: digitalMarketing.description,
            url: `${siteConfig.url}/digital-marketing`,
            provider: { "@id": `${siteConfig.url}/#organization` },
            areaServed: siteConfig.serviceAreas.map((city) => ({
              "@type": "City",
              name: city,
            })),
            serviceType: digitalMarketing.title,
          },
        ]
      : []),
  ];
}

export function getServicePageMetadata(slug: string): Metadata | null {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;

  const title = `#1 ${service.title} in Ethiopia | Addis Ababa`;
  const description = `${service.description} Hire ${siteConfig.name} — Ethiopia's trusted ${service.title.toLowerCase()} provider in Addis Ababa and nationwide. Call ${siteConfig.contact.phoneDisplay}.`;
  const url = `${siteConfig.url}/services/${slug}`;

  return {
    title,
    description,
    keywords: [
      service.title,
      `${service.title} Ethiopia`,
      `${service.title} Addis Ababa`,
      `best ${service.title.toLowerCase()} Ethiopia`,
      siteConfig.name,
      ...seoKeywords.slice(0, 12),
    ],
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      type: "website",
      locale: siteConfig.locale,
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
