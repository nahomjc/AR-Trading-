"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconSearch,
  IconX,
  IconArrowUp,
  IconCheck,
  IconBuilding,
  IconWorld,
  IconPhone,
} from "@tabler/icons-react";

// Search Component
interface SearchItem {
  type: string;
  title: string;
  description: string;
  url?: string;
}

const SearchComponent = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  // Search data - all content from the website
  const searchData = [
    // Services
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

    // Features
    {
      type: "feature",
      title: "Banner Design",
      description:
        "Custom banners for events, promotions, and outdoor advertising",
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

    // Company Info
    {
      type: "company",
      title: "AR Solutions",
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

    // Contact Info
    { type: "contact", title: "Phone", description: "0988175550" },
    { type: "contact", title: "Email", description: "artradingplc@gmail.com" },
    {
      type: "contact",
      title: "Address",
      description: "8th floor, Kazadis Bldg, Kazanchis, Addis Ababa, Ethiopia",
    },
  ];

  // Search suggestions based on common queries
  const commonQueries = [
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
  ];

  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setSuggestions([]);
      return;
    }

    const lowercaseQuery = query.toLowerCase();

    // Find exact matches first
    const exactMatches = searchData.filter(
      (item) =>
        item.title.toLowerCase().includes(lowercaseQuery) ||
        item.description.toLowerCase().includes(lowercaseQuery) ||
        // Special case for "testimony" to match "testimonials"
        (lowercaseQuery === "testimony" &&
          item.title.toLowerCase().includes("testimonial"))
    );

    // Find partial matches
    const partialMatches = searchData.filter(
      (item) =>
        item.title
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(lowercaseQuery)) ||
        item.description
          .toLowerCase()
          .split(" ")
          .some((word) => word.startsWith(lowercaseQuery))
    );

    // Combine and deduplicate
    const allMatches = [...new Set([...exactMatches, ...partialMatches])];
    setSearchResults(allMatches.slice(0, 8));

    // Generate suggestions based on common queries
    const querySuggestions = commonQueries.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(lowercaseQuery) &&
        suggestion.toLowerCase() !== lowercaseQuery
    );
    setSuggestions(querySuggestions.slice(0, 5));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length + suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < searchResults.length) {
        const result = searchResults[selectedIndex];
        if (result.url) {
          window.location.href = result.url;
        }
      } else if (selectedIndex >= searchResults.length) {
        const suggestion = suggestions[selectedIndex - searchResults.length];
        setSearchQuery(suggestion);
        performSearch(suggestion);
      }
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  const handleResultClick = (result: SearchItem) => {
    if (result.url) {
      window.location.href = result.url;
    } else {
      // Scroll to section based on result type and title
      const sectionMap: { [key: string]: string } = {
        Contact: "contact",
        "About Us": "about",
        Team: "team",
        Testimonials: "testimonials",
        "Latest Works": "latest-works",
        "AR Solutions": "home",
        Phone: "contact",
        Email: "contact",
        Address: "contact",
      };

      const sectionId = sectionMap[result.title] || result.type;

      // Close search modal first
      setIsSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
      setSuggestions([]);

      // Scroll to section after a short delay
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = 64; // Account for fixed header
          const elementPosition = element.offsetTop - headerHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  };

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Desktop Search Button */}
      <motion.button
        onClick={() => setIsSearchOpen(true)}
        className="hidden md:flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconSearch className="w-4 h-4" />
        <span className="text-sm">Search</span>
        <kbd className="hidden lg:inline-block px-2 py-1 bg-white/20 rounded text-xs">
          ⌘K
        </kbd>
      </motion.button>

      {/* Mobile Search Button */}
      <motion.button
        onClick={() => setIsSearchOpen(true)}
        className="md:hidden flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Search"
      >
        <IconSearch className="w-5 h-5" />
      </motion.button>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-start justify-center pt-16 sm:pt-20 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl mx-3 sm:mx-4 bg-gradient-to-br from-[#08243A] via-[#0a2a42] to-[#08243A] border border-[#C79D6D]/30 rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Input */}
              <div className="relative p-4 sm:p-6 border-b border-white/10">
                <div className="relative">
                  <IconSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Search services, features, or anything..."
                    className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C79D6D] focus:border-transparent text-sm sm:text-base"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close search"
                  >
                    <IconX className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              <div className="max-h-80 sm:max-h-96 overflow-y-auto">
                {searchQuery && (
                  <>
                    {/* Search Results */}
                    {searchResults.length > 0 && (
                      <div className="p-3 sm:p-4">
                        <h3 className="text-xs sm:text-sm font-semibold text-[#C79D6D] mb-3 uppercase tracking-wide">
                          Results
                        </h3>
                        <div className="space-y-2">
                          {searchResults.map((result, index) => (
                            <motion.div
                              key={`${result.type}-${result.title}`}
                              className={`p-2 sm:p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                index === selectedIndex
                                  ? "bg-[#C79D6D]/20 border border-[#C79D6D]/30"
                                  : "bg-white/5 hover:bg-white/10 border border-transparent"
                              }`}
                              onClick={() => handleResultClick(result)}
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex items-start space-x-2 sm:space-x-3">
                                <div
                                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    result.type === "service"
                                      ? "bg-blue-500/20"
                                      : result.type === "feature"
                                      ? "bg-green-500/20"
                                      : result.type === "company"
                                      ? "bg-purple-500/20"
                                      : "bg-orange-500/20"
                                  }`}
                                >
                                  {result.type === "service" && (
                                    <IconWorld className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                                  )}
                                  {result.type === "feature" && (
                                    <IconCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                                  )}
                                  {result.type === "company" && (
                                    <IconBuilding className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                                  )}
                                  {result.type === "contact" && (
                                    <IconPhone className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                                    {result.title}
                                  </h4>
                                  <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">
                                    {result.description}
                                  </p>
                                  {result.url && (
                                    <span className="text-[#C79D6D] text-xs">
                                      View Details →
                                    </span>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div className="p-3 sm:p-4 border-t border-white/10">
                        <h3 className="text-xs sm:text-sm font-semibold text-[#C79D6D] mb-3 uppercase tracking-wide">
                          Suggestions
                        </h3>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {suggestions.map((suggestion, index) => (
                            <motion.button
                              key={suggestion}
                              className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm transition-all duration-200 ${
                                index + searchResults.length === selectedIndex
                                  ? "bg-[#C79D6D] text-white"
                                  : "bg-white/10 text-gray-300 hover:bg-white/20"
                              }`}
                              onClick={() => handleSuggestionClick(suggestion)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {suggestion}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No Results */}
                    {searchResults.length === 0 && suggestions.length === 0 && (
                      <div className="p-6 sm:p-8 text-center">
                        <IconSearch className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                        <p className="text-gray-400 text-sm sm:text-base">
                          No results found for &ldquo;{searchQuery}&rdquo;
                        </p>
                        <p className="text-gray-500 text-xs sm:text-sm mt-2">
                          Try different keywords or check spelling
                        </p>
                      </div>
                    )}
                  </>
                )}

                {/* Default State */}
                {!searchQuery && (
                  <div className="p-6 sm:p-8 text-center">
                    <IconSearch className="w-8 h-8 sm:w-12 sm:h-12 text-[#C79D6D] mx-auto mb-3 sm:mb-4" />
                    <p className="text-white font-semibold mb-2 text-sm sm:text-base">
                      Search AR Solutions
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      Find services, features, and information
                    </p>
                    <p className="text-gray-500 text-xs mt-2 hidden sm:block">
                      Press ⌘K or Ctrl+K to search
                    </p>
                    <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1 sm:gap-2">
                      {[
                        "Digital Marketing",
                        "Web Development",
                        "Branding",
                        "Contact",
                      ].map((term) => (
                        <button
                          key={term}
                          onClick={() =>
                            handleSuggestionClick(term.toLowerCase())
                          }
                          className="px-2 sm:px-3 py-1 bg-white/10 text-gray-300 rounded-full text-xs sm:text-sm hover:bg-white/20 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchComponent;
