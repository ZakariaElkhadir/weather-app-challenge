import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ErrorState from "./ErrorState";
import LoadingSkeleton from "./LoadingSkeleton";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
  dt: string;
  city: string;
  country: string;
  hourlyByDay: {
    [key: string]: Array<{
      dt: string;
      temperature: number;
      condition: string;
    }>;
  };
  daily: Array<{
    dayName: string;
    condition: string;
    highTemp: number;
    lowTemp: number;
  }>;
}
interface WeatherDataSectionProps {
  data: WeatherData | null;
  location: string | null;
  error: string | null;
  unit: "metric" | "imperial";
  onRetry?: () => void;
}
const WeatherDataSection = ({ data, location, error, unit, onRetry }: WeatherDataSectionProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  if (data?.daily && data.daily.length > 0 && !selectedDay) {
    setSelectedDay(data.daily[0].dayName);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDaySelect = (dayName: string) => {
    setSelectedDay(dayName);
    setIsDropdownOpen(false);
  };

  const hourlyForecast =
    selectedDay && data?.hourlyByDay?.[selectedDay] ? data.hourlyByDay[selectedDay] : [];

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const windSpeedUnit = unit === "metric" ? "km/h" : "mph";
  const precipitationUnit = unit === "metric" ? "mm" : "in";

  if (!data && !error && !location) {
    return (
      <section className="text-center p-8">
        <p className="text-2xl text-(--neutral-300)">Search for a location to see weather data</p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <ErrorState
        message="Something went wrong"
        description={error}
        onRetry={onRetry || (() => window.location.reload())}
      />
    );
  }

  // Loading state (when location exists but no data yet)
  if (location && !data) {
    return <LoadingSkeleton unit={unit} />;
  }

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) {
      console.log("No date string provided");
      return "";
    }
    console.log("Formatting date:", dateString);
    const date = new Date(dateString);
    const formatted = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    console.log("Formatted date:", formatted);
    return formatted;
  };

  const formatTime = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getWeatherIcon = (condition: string | undefined) => {
    if (!condition) return "/assets/images/icon-sunny.webp";

    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes("rain")) return "/assets/images/icon-rain.webp";
    if (conditionLower.includes("drizzle")) return "/assets/images/icon-drizzle.webp";
    if (conditionLower.includes("snow")) return "/assets/images/icon-snow.webp";
    if (conditionLower.includes("storm") || conditionLower.includes("thunder"))
      return "/assets/images/icon-storm.webp";
    if (
      conditionLower.includes("fog") ||
      conditionLower.includes("mist") ||
      conditionLower.includes("haze")
    )
      return "/assets/images/icon-fog.webp";
    if (conditionLower.includes("cloud")) return "/assets/images/icon-partly-cloudy.webp";
    if (conditionLower.includes("overcast")) return "/assets/images/icon-overcast.webp";
    if (conditionLower.includes("clear") || conditionLower.includes("sunny"))
      return "/assets/images/icon-sunny.webp";

    return "/assets/images/icon-sunny.webp";
  };

  return (
    <section className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
      {/* Left side: Main weather card + 4 detail cards */}
      <div className="lg:col-span-2 space-y-4">
        {/* Main Weather Card */}
        <motion.div
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[url('/assets/images/bg-today-large.svg')] bg-cover bg-center bg-no-repeat p-6 md:p-8 rounded-lg shadow-lg"
        >
          {/* Mobile: Vertical Layout */}
          <div className="flex flex-col items-center text-center lg:hidden">
            <h3 className="text-2xl font-bold text-(--neutral-0) mb-1">
              {data?.city}, {data?.country}
            </h3>
            <p className="text-base text-(--neutral-0) opacity-90 mb-6">{formatDate(data?.dt)}</p>

            <div className="text-(--neutral-0) flex items-center gap-4">
              <Image
                src={getWeatherIcon(data?.condition)}
                alt={data?.condition || "weather icon"}
                width={80}
                height={80}
                className="w-20 h-20"
              />
              <p className="text-7xl font-bold">{data?.temperature}°</p>
            </div>
          </div>

          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:flex justify-between items-center h-64">
            <div className="mb-6">
              <h3 className="text-3xl font-bold text-(--neutral-0)">
                {data?.city}, {data?.country}
              </h3>
              <p className="text-xl text-(--neutral-0) opacity-90">{formatDate(data?.dt)}</p>
            </div>

            <div className="text-(--neutral-0) flex items-center gap-4">
              <Image
                src={getWeatherIcon(data?.condition)}
                alt={data?.condition || "weather icon"}
                width={96}
                height={96}
                className="w-24 h-24"
              />
              <p className="text-6xl font-bold">{data?.temperature}°</p>
            </div>
          </div>
        </motion.div>

        {/* 4 Weather Detail Cards */}
        <motion.div
          layout
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Feels Like Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-(--neutral-800) rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-(--neutral-300) text-sm mb-2">Feels Like</p>
            <p className="text-(--neutral-0) text-3xl font-bold">{data?.temperature}°</p>
          </motion.div>

          {/* Humidity Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-(--neutral-800) rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-(--neutral-300) text-sm mb-2">Humidity</p>
            <p className="text-(--neutral-0) text-3xl font-bold">{data?.humidity}%</p>
          </motion.div>

          {/* Wind Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-(--neutral-800) rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-(--neutral-300) text-sm mb-2">Wind</p>
            <p className="text-(--neutral-0) text-3xl font-bold">
              {data?.windSpeed} {windSpeedUnit}
            </p>
          </motion.div>

          {/* Precipitation Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-(--neutral-800) rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <p className="text-(--neutral-300) text-sm mb-2">Precipitation</p>
            <p className="text-(--neutral-0) text-3xl font-bold">
              {data?.precipitation} {precipitationUnit}
            </p>
          </motion.div>
        </motion.div>
        {/* Daily Forecast Section */}
        <div className="space-y-4 w-full">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold text-(--neutral-0)"
          >
            Daily forecast
          </motion.h3>

          {/* Mobile: Grid Layout */}
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="grid grid-cols-3 gap-3 md:hidden"
          >
            {data?.daily?.map((day, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="bg-(--neutral-800) rounded-lg p-3 flex flex-col items-center gap-2 shadow-sm"
              >
                {/* Day name */}
                <p className="text-(--neutral-300) text-xs font-medium">
                  {day.dayName.slice(0, 3)}
                </p>

                {/* Weather icon */}
                <Image
                  src={getWeatherIcon(day.condition)}
                  alt={day.condition || "weather icon"}
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />

                {/* Temperatures */}
                <div className="flex flex-col items-center gap-0 text-xs">
                  <span className="text-(--neutral-0) font-bold">{day.highTemp}°</span>
                  <span className="text-(--neutral-300)">{day.lowTemp}°</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: Horizontal Scroll */}
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            className="hidden md:flex overflow-x-auto gap-4 pb-4 scrollbar-hide w-full"
          >
            {data?.daily?.map((day, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, x: -20 },
                  visible: { opacity: 1, scale: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-(--neutral-800) rounded-lg p-4 min-w-[120px] flex flex-col items-center gap-3 shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Day name */}
                <p className="text-(--neutral-300) text-sm font-medium">{day.dayName}</p>

                {/* Weather icon */}
                <Image
                  src={getWeatherIcon(day.condition)}
                  alt={day.condition || "weather icon"}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />

                {/* Temperatures */}
                <div className="flex gap-2 text-sm">
                  <span className="text-(--neutral-0) font-bold">{day.highTemp}°</span>
                  <span className="text-(--neutral-300)">{day.lowTemp}°</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right side: Hourly Forecast */}
      <motion.div
        layout
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="lg:col-span-1 bg-(--neutral-800) rounded-lg p-4 shadow-lg"
      >
        {/* Day selector and Hourly forecast - Flex Header */}
        <div className="flex items-center justify-between mb-4 relative" ref={dropdownRef}>
          <h3 className="text-(--neutral-0) text-base font-bold">Hourly forecast</h3>

          {/* Custom Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-(--neutral-700) text-(--neutral-0) rounded-lg px-3 py-1.5 text-sm cursor-pointer hover:bg-(--neutral-600) transition-colors flex items-center gap-2"
          >
            <span>{selectedDay}</span>
            <ChevronDown
              size={16}
              className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu Popup */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full right-0 mt-2 bg-(--neutral-700) rounded-lg shadow-lg z-10 min-w-[140px] py-2 px-2"
              >
                {data?.daily?.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDaySelect(day.dayName)}
                    className={`w-[90%] mx-auto block text-left px-4 py-2 text-sm transition-colors rounded-lg ${selectedDay === day.dayName
                      ? "bg-(--neutral-600) text-(--neutral-0) font-medium"
                      : "text-(--neutral-300) hover:bg-(--neutral-600) hover:text-(--neutral-0)"
                      }`}
                  >
                    {day.dayName}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hourly forecast cards for selected day */}
        {hourlyForecast.length > 0 ? (
          <motion.div
            layout
            initial="hidden"
            animate="visible"
            key={selectedDay} // Force re-render animation on day change
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {hourlyForecast.map((hourlyData, index) => (
              <motion.div
                key={`${selectedDay}-${index}`}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="bg-(--neutral-700) rounded-lg flex justify-between items-center mb-2 px-3 py-2.5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={getWeatherIcon(hourlyData.condition)}
                    alt={hourlyData.condition || "weather icon"}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                  <p className="text-base font-medium text-(--neutral-0)">
                    {formatTime(hourlyData.dt)}
                  </p>
                </div>
                <p className="text-(--neutral-0) text-base font-medium">
                  {hourlyData.temperature}
                  {tempUnit}
                </p>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-(--neutral-300) text-center py-3 text-sm">No hourly data available</p>
        )}
      </motion.div>
    </section>
  );
};

export default WeatherDataSection;
