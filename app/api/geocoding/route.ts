export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query) {
        return Response.json({ error: "Query parameter 'q' is required" }, { status: 400 });
    }

    const apiKey = process.env.OWM_API_key;

    if (!apiKey) {
        return Response.json({ error: "Weather API is not configured" }, { status: 500 });
    }

    try {
        const limit = 5;
        const geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            query
        )}&limit=${limit}&appid=${apiKey}`;

        const response = await fetch(geocodingUrl);

        if (!response.ok) {
            throw new Error(`Geocoding API responded with status: ${response.status}`);
        }

        const data = await response.json();
        return Response.json(data);
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return Response.json({ error: "Failed to fetch location suggestions" }, { status: 500 });
    }
}
