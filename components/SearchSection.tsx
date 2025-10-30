"use client";
import { Search } from "lucide-react";
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
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold">How&apos;s the sky looking today?</h1>
      <form onSubmit={handleSubmit} className="flex items-center mt-10 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white" size={32} />
          <input
            className="bg-[var(--neutral-700)] rounded-lg pl-14 px-50 py-3.5 text-white text-4xl"
            type="text"
            placeholder="Search for a place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="bg-[var(--blue-500)] rounded-md px-6 py-3.5 text-white text-4xl disabled:opacity-50 hover:bg-[var(--blue-700)] transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </section>
  );
};
export default SearchSection;
