"use client";
import { Search, Loader2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface searchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchSection = ({ onSearch, isLoading }: searchSectionProps) => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isSelectionRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (isSelectionRef.current) {
        isSelectionRef.current = false;
        return;
      }

      if (searchQuery.trim().length >= 3) {
        setIsSearchingLocation(true);
        try {
          const response = await fetch(`/api/geocoding?q=${encodeURIComponent(searchQuery)}`);
          const data = await response.json();
          if (Array.isArray(data)) {
            setSuggestions(data);
            setShowSuggestions(true);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsSearchingLocation(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: any) => {
    const query = `${city.name}, ${city.country}`;
    isSelectionRef.current = true;
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center px-4"
    >
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
        How&apos;s the sky looking today?
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center mt-6 sm:mt-10 gap-3 w-full max-w-3xl mb-14 relative"
      >
        <div className="relative w-full md:flex-1" ref={wrapperRef}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
          <input
            className="bg-[var(--neutral-700)] rounded-lg pl-12 pr-4 py-3 text-white text-base w-full placeholder:text-[var(--neutral-400)] transition-all focus:ring-2 focus:ring-[var(--blue-500)] focus:outline-none"
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            disabled={isLoading}
          />

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-[var(--neutral-800)]/80 backdrop-blur-md border border-[var(--neutral-700)]/50 rounded-lg shadow-xl z-50 overflow-hidden max-h-60 overflow-y-auto"
              >
                {suggestions.map((city, index) => (
                  <button
                    key={`${city.lat}-${city.lon}-${index}`}
                    type="button"
                    className="w-full text-left px-4 py-3 hover:bg-[var(--neutral-700)] transition-colors flex items-center justify-between group"
                    onClick={() => handleSuggestionClick(city)}
                  >
                    <div className="flex flex-col">
                      <span className="text-white font-medium">
                        {city.name}
                      </span>
                      <span className="text-[var(--neutral-400)] text-sm">
                        {city.state ? `${city.state}, ` : ""}{city.country}
                      </span>
                    </div>
                    <Search size={16} className="text-[var(--neutral-500)] group-hover:text-white transition-colors" />
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search in progress indicator */}
          {(isLoading || isSearchingLocation) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-0 right-0 bg-[var(--neutral-700)] rounded-lg px-4 py-3 flex items-center gap-2 text-[var(--neutral-300)]"
            >
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm sm:text-base">
                {isLoading ? "Fetching weather..." : "Finding cities..."}
              </span>
            </motion.div>
          )}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-[var(--blue-500)] rounded-lg px-6 py-3 text-white text-base font-medium disabled:opacity-50 hover:bg-[var(--blue-700)] transition-colors w-full md:w-auto"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </motion.button>
      </form>
    </motion.section>
  );
};
export default SearchSection;
