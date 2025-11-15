"use client";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface searchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchSection = ({ onSearch, isLoading }: searchSectionProps) => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight">
        How&apos;s the sky looking today?
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center mt-6 sm:mt-10 gap-3 w-full max-w-3xl mb-14"
      >
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={20} />
          <input
            className="bg-[var(--neutral-700)] rounded-lg pl-12 pr-4 py-3 text-white text-base w-full placeholder:text-[var(--neutral-400)]"
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />

          {/* Search in progress indicator */}
          {isLoading && (
            <div className="absolute -bottom-12 left-0 right-0 bg-[var(--neutral-700)] rounded-lg px-4 py-3 flex items-center gap-2 text-[var(--neutral-300)]">
              <Loader2 className="animate-spin" size={18} />
              <span className="text-sm sm:text-base">Search in progress</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-[var(--blue-500)] rounded-lg px-6 py-3 text-white text-base font-medium disabled:opacity-50 hover:bg-[var(--blue-700)] transition-colors w-full"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </section>
  );
};
export default SearchSection;
