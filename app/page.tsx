"use client";
import Header from "@/components/Header";
import SearchSection from "@/components/SearchSection";
import WeatherDataSection from "@/components/WeatherDataSection";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const location = searchParams.get("location");

  useEffect(() => {
    if (location) {
      fetchWeatherData(location);
    }
  }, [location]);

  const fetchWeatherData = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching weather for:", searchQuery);
      const response = await fetch(`/api/weather?location=${searchQuery}`);
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
      setError("Failed to fetch weather data");
      console.error("Fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (searchQuery: string) => {
    router.push(`?location=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <>
      <Header />
      <SearchSection onSearch={handleSearch} isLoading={isLoading} />
      <WeatherDataSection data={weatherData} location={location} error={error} />
    </>
  );
}
