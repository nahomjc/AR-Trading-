import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { siteConfig } from "@/lib/seo";

export type SearchItem = {
  type: string;
  title: string;
  description: string;
  url?: string;
};

export const SITE_SEARCH_DATA: SearchItem[] = [
  {
    type: "service",
    title: "Advertising & Printing",
    description: "Banners, stickers, office & vehicle branding, merchandise",
    url: "/services/advertising-printing",
  },
  {
    type: "service",
    title: "Digital Marketing",
    description:
      "Social media management, paid ads, SEO, strategy, influencer marketing",
    url: "/services/digital-marketing",
  },
  {
    type: "service",
    title: "Branding & Design",
    description: "Logo, brand identity, strategy, visual content",
    url: "/services/branding-design",
  },
  {
    type: "service",
    title: "Media Production",
    description: "Videography, photography, promotional content",
    url: "/services/media-production",
  },
  {
    type: "service",
    title: "Web Development",
    description: "Website design, development, maintenance, SEO optimization",
    url: "/services/web-development",
  },
  {
    type: "service",
    title: "Event Planning",
    description: "Corporate events, launches, conferences, exhibitions",
    url: "/services/event-planning",
  },
  {
    type: "service",
    title: "Training",
    description: "Corporate, personal development, and media trainings",
    url: "/services/training",
  },
  {
    type: "feature",
    title: "Banner Design",
    description: "Custom banners for events, promotions, and outdoor advertising",
  },
  {
    type: "feature",
    title: "Vehicle Branding",
    description: "Complete vehicle wrap and decal solutions",
  },
  {
    type: "feature",
    title: "Social Media Management",
    description: "Complete social media strategy and content management",
  },
  {
    type: "feature",
    title: "SEO Strategy",
    description: "Search engine optimization for better visibility",
  },
  {
    type: "feature",
    title: "Logo Design",
    description: "Professional logo design with multiple concepts",
  },
  {
    type: "feature",
    title: "Videography",
    description: "Professional video production for various purposes",
  },
  {
    type: "feature",
    title: "Website Design",
    description: "Custom website design tailored to your brand",
  },
  {
    type: "feature",
    title: "Corporate Events",
    description: "Professional corporate event planning and management",
  },
  {
    type: "company",
    title: "Addis Reality",
    description: "Premier digital marketing and creative agency",
  },
  {
    type: "company",
    title: "Contact",
    description: "Get in touch with our team of experts",
  },
  {
    type: "company",
    title: "About Us",
    description: "Excellence. Innovation. Results.",
  },
  {
    type: "company",
    title: "Team",
    description: "Meet our professional team",
  },
  {
    type: "company",
    title: "Testimonials",
    description: "What our clients say about us",
  },
  {
    type: "company",
    title: "Latest Works",
    description: "Our portfolio and recent projects",
  },
  {
    type: "contact",
    title: "Phone",
    description: siteConfig.contact.phoneDisplay,
  },
  {
    type: "contact",
    title: "Email",
    description: siteConfig.contact.email,
  },
  {
    type: "contact",
    title: "Address",
    description: siteConfig.contact.fullAddress,
  },
  {
    type: "employee",
    title: "Robson Habtamu",
    description:
      "General Manager and Co-founder - Strategic leader managing operations and business direction",
  },
  {
    type: "employee",
    title: "Abenezer Samuel",
    description:
      "CEO and co-founder - Strategic leader managing operations and business direction",
  },
  {
    type: "employee",
    title: "Keneni Melkamu",
    description:
      "Digital Marketer - Digital marketing expert specializing in campaigns and SEO",
  },
  {
    type: "employee",
    title: "Nahom Tesfaye",
    description:
      "Senior Software Engineer - Full-stack developer with modern web technology expertise",
  },
];

export const COMMON_SEARCH_QUERIES = [
  "advertising",
  "printing",
  "banners",
  "vehicle branding",
  "digital marketing",
  "social media",
  "SEO",
  "paid ads",
  "branding",
  "logo design",
  "brand identity",
  "video production",
  "photography",
  "media production",
  "website design",
  "web development",
  "e-commerce",
  "event planning",
  "corporate events",
  "conferences",
  "training",
  "corporate training",
  "media training",
  "contact",
  "phone",
  "email",
  "address",
  "about",
  "team",
  "testimonials",
  "testimony",
  "portfolio",
  "latest works",
  "works",
  "projects",
  "employees",
  "staff",
  "robson",
  "abenezer",
  "keneni",
  "nahom",
  "ceo",
  "manager",
  "engineer",
  "marketer",
  "founder",
] as const;

export function runSiteSearch(query: string): {
  results: SearchItem[];
  suggestions: string[];
} {
  if (!query.trim()) {
    return { results: [], suggestions: [] };
  }

  const lowercaseQuery = query.toLowerCase();

  const exactMatches = SITE_SEARCH_DATA.filter(
    (item) =>
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      (lowercaseQuery === "testimony" &&
        item.title.toLowerCase().includes("testimonial")),
  );

  const partialMatches = SITE_SEARCH_DATA.filter(
    (item) =>
      item.title
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(lowercaseQuery)) ||
      item.description
        .toLowerCase()
        .split(" ")
        .some((word) => word.startsWith(lowercaseQuery)),
  );

  const allMatches = [...new Set([...exactMatches, ...partialMatches])];
  const suggestions = COMMON_SEARCH_QUERIES.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(lowercaseQuery) &&
      suggestion.toLowerCase() !== lowercaseQuery,
  ).slice(0, 5);

  return { results: allMatches.slice(0, 8), suggestions };
}

const SECTION_MAP: Record<string, string> = {
  Contact: "contact",
  "About Us": "about",
  Team: "team",
  Testimonials: "testimonials",
  "Latest Works": "latest-works",
  "Addis Reality": "home",
  Phone: "contact",
  Email: "contact",
  Address: "contact",
  "Robson Habtamu": "team",
  "Abenezer Samuel": "team",
  "Keneni Melkamu": "team",
  "Nahom Tesfaye": "team",
};

export function navigateToSearchResult(
  result: SearchItem,
  router: AppRouterInstance,
): void {
  if (result.url) {
    router.push(result.url);
    return;
  }

  const sectionId = SECTION_MAP[result.title] ?? result.type;

  setTimeout(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const headerHeight = 64;
    window.scrollTo({
      top: element.offsetTop - headerHeight,
      behavior: "smooth",
    });

    if (result.type === "employee") {
      sessionStorage.setItem("highlightEmployee", result.title);
      window.dispatchEvent(
        new CustomEvent("highlightEmployee", {
          detail: { employeeName: result.title },
        }),
      );
    }

    if (result.type === "contact") {
      sessionStorage.setItem("highlightContact", result.title.toLowerCase());
      window.dispatchEvent(
        new CustomEvent("highlightContact", {
          detail: { contactType: result.title.toLowerCase() },
        }),
      );
    }

    if (result.title === "About Us") {
      sessionStorage.setItem("highlightAbout", "true");
      window.dispatchEvent(new CustomEvent("highlightAbout"));
    }

    if (result.title === "Testimonials") {
      sessionStorage.setItem("highlightTestimonials", "true");
      window.dispatchEvent(new CustomEvent("highlightTestimonials"));
    }

    if (result.title === "Latest Works") {
      sessionStorage.setItem("highlightLatestWorks", "true");
      window.dispatchEvent(new CustomEvent("highlightLatestWorks"));
    }
  }, 100);
}
