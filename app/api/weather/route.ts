export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location");

  console.log("API Route called with location:", location);

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
    // Call OpenWeatherMap API
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location,
    )}&appid=${apiKey}&units=metric`;

    console.log("Calling OpenWeatherMap API for:", location);

    const response = await fetch(apiUrl);

    console.log("OpenWeatherMap API response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenWeatherMap API error:", errorData);

      if (response.status === 404) {
        return Response.json({ error: "Location not found" }, { status: 404 });
      }
      if (response.status === 401) {
        return Response.json({ error: "Invalid API key" }, { status: 500 });
      }
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log("OpenWeatherMap raw data:", data);

    // Transform API response to match your UI format
    const weatherData = {
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      precipitation: data.rain?.["1h"] || 0,
    };

    console.log("Transformed weather data:", weatherData);

    return Response.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return Response.json({ error: "Failed to fetch weather data" }, { status: 500 });
  }
}
