interface WeatherData {
  temperature: number;
  humidity: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
}
interface WeatherDataSectionProps {
  data: WeatherData | null;
  location: string | null;
  error: string | null;
}
const WeatherDataSection = ({ data, location, error }: WeatherDataSectionProps) => {
  // No data yet - show placeholder message
  if (!data && !error && !location) {
    return (
      <section className="text-center p-8">
        <p className="text-2xl text-[var(--neutral-300)]">
          Search for a location to see weather data
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="text-center p-8">
        <p className="text-red-500 text-2xl">{error}</p>
        there is no data
      </section>
    );
  }

  // Loading state (when location exists but no data yet)
  if (location && !data) {
    return (
      <section className="text-center p-8">
        <p className="text-2xl">Loading weather data...</p>
      </section>
    );
  }

  // Success - show weather data
  return (
    <section className="p-8">
      <h2 className="text-3xl font-bold mb-4">Weather in {location}</h2>
      <div className="grid gap-4">
        <div className="stat">
          <p className="text-xl">Temperature: {data?.temperature}°C</p>
        </div>
        <div className="stat">
          <p className="text-xl">Condition: {data?.condition}</p>
        </div>
        {/* Add more weather data display here */}
      </div>
    </section>
  );
};

export default WeatherDataSection;
