export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");
  const unit = searchParams.get("unit") || "metric";

  console.log("API Route called with location:", location, "unit:", unit);

  // Validate location parameter
  if (!location) {
    return Response.json({ error: "Location parameter is required" }, { status: 400 });
  }

  // Get API key from environment variables
  const apiKey = process.env.OWM_API_key;

  if (!apiKey) {
    console.error("OWM_API_key is not defined in environment variables");
    console.error(
      "Available env vars:",
      Object.keys(process.env).filter((key) => key.includes("OWM")),
    );
    return Response.json({ error: "Weather API is not configured" }, { status: 500 });
  }

  try {
    // Call OpenWeatherMap API for current weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location,
    )}&appid=${apiKey}&units=${unit}`;

    console.log("Calling OpenWeatherMap API for:", location, "with units:", unit);

    const currentResponse = await fetch(currentWeatherUrl);

    console.log("OpenWeatherMap API response status:", currentResponse.status);

    if (!currentResponse.ok) {
      const errorData = await currentResponse.json();
      console.error("OpenWeatherMap API error:", errorData);

      if (currentResponse.status === 404) {
        return Response.json({ error: "Location not found" }, { status: 404 });
      }
      if (currentResponse.status === 401) {
        return Response.json({ error: "Invalid API key" }, { status: 500 });
      }
      throw new Error(`API responded with status: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();
    console.log("OpenWeatherMap current weather data:", currentData);

    // Get coordinates for forecast API
    const { lat, lon } = currentData.coord;

    // Call OpenWeatherMap Forecast API for hourly data
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

    console.log("Calling OpenWeatherMap Forecast API with units:", unit);

    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    console.log("OpenWeatherMap forecast data:", forecastData);

    // Group hourly forecast data by day
    const hourlyByDay = new Map<
      string,
      Array<{ dt: string; temperature: number; condition: string }>
    >();

    forecastData.list?.forEach(
      (item: { dt: number; main: { temp: number }; weather: Array<{ main: string }> }) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString("en-US", { weekday: "long" });

        const hourlyEntry = {
          dt: date.toISOString(),
          temperature: Math.round(item.main.temp),
          condition: item.weather[0].main,
        };

        if (!hourlyByDay.has(dayKey)) {
          hourlyByDay.set(dayKey, []);
        }
        hourlyByDay.get(dayKey)?.push(hourlyEntry);
      },
    );

    // Extract daily forecast data (7 days)
    const dailyForecastMap = new Map();

    forecastData.list?.forEach(
      (item: {
        dt: number;
        main: { temp: number; temp_max: number; temp_min: number };
        weather: Array<{ main: string }>;
      }) => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toLocaleDateString("en-US", { weekday: "long" });

        if (!dailyForecastMap.has(dayKey) || dailyForecastMap.size < 7) {
          if (!dailyForecastMap.has(dayKey)) {
            dailyForecastMap.set(dayKey, {
              dayName: dayKey,
              condition: item.weather[0].main,
              highTemp: Math.round(item.main.temp_max),
              lowTemp: Math.round(item.main.temp_min),
              temps: [item.main.temp],
            });
          } else {
            const existing = dailyForecastMap.get(dayKey);
            existing.highTemp = Math.max(existing.highTemp, Math.round(item.main.temp_max));
            existing.lowTemp = Math.min(existing.lowTemp, Math.round(item.main.temp_min));
            existing.temps.push(item.main.temp);
          }
        }
      },
    );

    const dailyForecast = Array.from(dailyForecastMap.values())
      .slice(0, 7)
      .map((day) => ({
        dayName: day.dayName,
        condition: day.condition,
        highTemp: day.highTemp,
        lowTemp: day.lowTemp,
      }));

    // Transform API response to match your UI format
    const weatherData = {
      temperature: Math.round(currentData.main.temp),
      condition: currentData.weather[0].main,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * (unit === "imperial" ? 1 : 3.6)), // mph for imperial, km/h for metric
      precipitation: currentData.rain?.["1h"] || 0,
      dt: new Date(currentData.dt * 1000).toISOString(),
      city: currentData.name,
      country: currentData.sys.country,
      hourlyByDay: Object.fromEntries(hourlyByDay),
      daily: dailyForecast,
      unit: unit,
    };

    console.log("Transformed weather data:", weatherData);

    return Response.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return Response.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
