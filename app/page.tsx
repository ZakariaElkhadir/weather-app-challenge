"use client";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import WeatherDataSection from "@/components/WeatherDataSection";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Footer from "@/components/Footer";

function HomeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const location = searchParams.get("location");

  const fetchWeatherData = useCallback(
    async (searchQuery: string) => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("Fetching weather for:", searchQuery, "in unit:", unit);
        const response = await fetch(`/api/weather?location=${searchQuery}&unit=${unit}`);
        console.log("Response status:", response.status);

        const data = await response.json();
        console.log("Received data:", data);

        if (data.error) {
          setError(data.error);
          setWeatherData(null);
        } else {
          setWeatherData(data);
          setError(null);
        }
      } catch (err) {
        setError(
          "We couldn't connect to the server (API error). Please try again in a few moments.",
        );
        console.error("Fetch error:", err);
        setWeatherData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [unit],
  );

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location, fetchWeatherData]);

  const handleSearch = (searchQuery: string) => {
    router.push(`?location=${encodeURIComponent(searchQuery)}`);
  };

  const handleRetry = () => {
    if (location) {
      fetchWeatherData(location);
    }
  };

  return (
    <>
      <Header unit={unit} onUnitChange={setUnit} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Hide search section when there's an error */}
        {!error && <SearchSection onSearch={handleSearch} isLoading={isLoading} />}
        {isLoading ? (
          <LoadingSkeleton unit={unit} />
        ) : (
          <WeatherDataSection
            data={weatherData}
            location={location}
            error={error}
            unit={unit}
            onRetry={handleRetry}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <>
          <Header unit="metric" onUnitChange={() => {}} />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="flex flex-col items-center justify-center px-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                How&apos;s the sky looking today?
              </h1>
              <p className="mt-6 text-xl text-gray-400">Loading...</p>
            </section>
          </main>
          <Footer />
        </>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
