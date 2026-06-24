"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  IconSearch,
  IconX,
  IconCheck,
  IconBuilding,
  IconWorld,
  IconPhone,
  IconUser,
} from "@tabler/icons-react";
import {
  navigateToSearchResult,
  runSiteSearch,
  type SearchItem,
} from "@/app/lib/siteSearch";

type SearchComponentProps = {
  /** When false, only registers the global opener + modal (no nav buttons). */
  showNavTrigger?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const SITE_SEARCH_OPEN_EVENT = "site-search-open";

export function openSiteSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(SITE_SEARCH_OPEN_EVENT));
  }
}

const SearchComponent = ({
  showNavTrigger = true,
  open: openProp,
  onOpenChange,
}: SearchComponentProps) => {
  const router = useRouter();
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = openProp !== undefined;
  const isSearchOpen = isControlled ? openProp : internalOpen;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const setSearchOpen = useCallback(
    (open: boolean) => {
      if (isControlled) {
        onOpenChange?.(open);
      } else {
        setInternalOpen(open);
      }
    },
    [isControlled, onOpenChange],
  );

  const performSearch = (query: string) => {
    const { results, suggestions: nextSuggestions } = runSiteSearch(query);
    setSearchResults(results);
    setSuggestions(nextSuggestions);
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
        handleResultClick(searchResults[selectedIndex]);
      } else if (selectedIndex >= searchResults.length) {
        const suggestion = suggestions[selectedIndex - searchResults.length];
        setSearchQuery(suggestion);
        performSearch(suggestion);
      }
    } else if (e.key === "Escape") {
      closeSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    performSearch(suggestion);
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setSuggestions([]);
    setSelectedIndex(-1);
  };

  const handleResultClick = (result: SearchItem) => {
    closeSearch();
    navigateToSearchResult(result, router);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const open = () => setSearchOpen(true);
    window.addEventListener(SITE_SEARCH_OPEN_EVENT, open);
    return () => window.removeEventListener(SITE_SEARCH_OPEN_EVENT, open);
  }, [setSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        e.stopPropagation();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [setSearchOpen]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      // Small delay to ensure the input is rendered
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      {showNavTrigger && (
        <>
          {/* Desktop Search Button */}
          <motion.button
            onClick={() => setSearchOpen(true)}
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
            onClick={() => setSearchOpen(true)}
            className="md:hidden flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Search"
          >
            <IconSearch className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Search Modal — portaled to body so it isn't clipped by the dock */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-auto fixed inset-0 z-[100000] flex items-center justify-center bg-[#041018]/75 px-4 backdrop-blur-md"
                onClick={closeSearch}
              >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 12 }}
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#08243A]/95 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(199,157,109,0.12)] backdrop-blur-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Site search"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C79D6D]/60 to-transparent"
                aria-hidden
              />
              <button
                type="button"
                onClick={closeSearch}
                className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white sm:right-5 sm:top-5"
                aria-label="Close search"
              >
                <IconX className="h-4 w-4" />
              </button>
              <div className="relative border-b border-white/10 p-5 sm:p-6">
                <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#C79D6D]/90">
                  Search Addis Reality
                </p>
                <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 shadow-inner transition-all focus-within:border-[#C79D6D]/35 focus-within:bg-white/[0.06] sm:px-5 sm:py-3.5">
                  <IconSearch className="h-5 w-5 shrink-0 text-[#C79D6D]" stroke={1.75} />
                  <input
                    ref={inputRef}
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Services, team, contact, and more…"
                    className="min-w-0 flex-1 border-0 bg-transparent text-sm text-white placeholder-gray-500 outline-none sm:text-base"
                    autoComplete="off"
                    aria-label="Search the site"
                  />
                  {searchQuery ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        setSearchResults([]);
                        setSuggestions([]);
                        setSelectedIndex(-1);
                      }}
                      className="shrink-0 text-gray-400 transition-colors hover:text-white"
                      aria-label="Clear search"
                    >
                      <IconX className="h-4 w-4" />
                    </button>
                  ) : (
                    <kbd className="hidden shrink-0 rounded-md border border-white/15 bg-white/10 px-2 py-1 font-sans text-xs text-gray-400 sm:inline-block">
                      Esc
                    </kbd>
                  )}
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
                                      : result.type === "employee"
                                      ? "bg-cyan-500/20"
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
                                  {result.type === "employee" && (
                                    <IconUser className="w-3 h-3 sm:w-4 sm:h-4 text-cyan-400" />
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
                  <div className="px-5 py-5 sm:px-6 sm:py-6">
                    <p className="mb-4 text-center text-sm text-gray-400">
                      Try a service, team member, or contact topic
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {[
                        "Digital Marketing",
                        "Web Development",
                        "Branding",
                        "Contact",
                      ].map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() =>
                            handleSuggestionClick(term.toLowerCase())
                          }
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-[#C79D6D]/30 hover:bg-[#C79D6D]/10 sm:text-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-center text-xs text-gray-500">
                      <kbd className="rounded border border-white/15 bg-white/10 px-1.5 py-0.5 font-sans">
                        ⌘K
                      </kbd>{" "}
                      anytime
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default SearchComponent;
