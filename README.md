# Weather App - Frontend Mentor Challenge

![Weather App Preview](./preview.jpg)

A modern, responsive weather application built with Next.js 15, TypeScript, and the Open-Meteo API. This project is a solution to the [Frontend Mentor Weather App Challenge](https://www.frontendmentor.io).

## 🌟 Features

### Core Functionality
- 🔍 **Location Search** - Search for weather information by city name
- 🌡️ **Current Weather** - View real-time temperature, conditions, and location details
- 📊 **Weather Metrics** - Display feels-like temperature, humidity, wind speed, and precipitation
- 📅 **7-Day Forecast** - Browse daily forecasts with high/low temperatures and weather icons
- ⏰ **Hourly Forecast** - View hourly temperature changes throughout the day
- 📆 **Day Selector** - Switch between different days to see specific hourly forecasts
- 🔄 **Unit Toggle** - Switch between Imperial (°F, mph, in) and Metric (°C, km/h, mm) units
- 📱 **Fully Responsive** - Optimized layouts for mobile, tablet, and desktop devices
- ⚡ **Loading States** - Elegant loading skeleton with animated indicators
- ❌ **Error Handling** - User-friendly error messages with retry functionality

### User Experience
- ✨ Smooth animations and transitions
- 🎯 Interactive hover and focus states
- 🎨 Modern, clean UI design
- 🌙 Dark theme with carefully chosen color palette
- 🖱️ Custom dropdown menus with outside-click detection
- 🔔 "Search in progress" indicator during API calls

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **API:** [Open-Meteo Weather API](https://open-meteo.com/)
- **Geocoding:** [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm installed
- Git for version control

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/weather-app-challenge.git
cd weather-app-challenge
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

No API key is required! Open-Meteo is free and open-source.

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
weather-app-challenge/
├── app/
│   ├── api/
│   │   └── weather/
│   │       ├── route.ts          # Weather API endpoint
│   │       └── test/
│   │           └── route.ts      # Test API endpoint
│   ├── globals.css               # Global styles & CSS variables
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ErrorState.tsx            # Error UI component
│   ├── Footer.tsx                # Footer with attribution
│   ├── Header.tsx                # Header with unit selector
│   ├── LoadingSkeleton.tsx       # Loading skeleton UI
│   ├── SearchSection.tsx         # Search input and button
│   └── WeatherDataSection.tsx    # Main weather display
├── public/
│   └── assets/
│       └── images/               # Weather icons & backgrounds
├── .env.example                  # Environment variables template
└── README.md                     # This file
```

## 🎨 Design Features

### Responsive Breakpoints
- **Mobile:** < 768px (single column, grid layouts)
- **Tablet:** 768px - 1024px (optimized spacing)
- **Desktop:** > 1024px (multi-column layout)

### Color Palette
```css
/* Primary Colors */
--neutral-900: #1A202C
--neutral-800: #2D3748
--neutral-700: #4A5568
--neutral-600: #718096
--neutral-300: #CBD5E0
--neutral-0: #FFFFFF

/* Accent Colors */
--blue-500: #4299E1
--blue-700: #2B6CB0
--orange-500: #ED8936
```

### Typography
- **Font Family:** Inter (sans-serif)
- **Font Weights:** 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)

## 🌐 API Integration

This project uses two Open-Meteo API endpoints:

### 1. Geocoding API
Converts city names to coordinates:
```
https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1
```

### 2. Weather Forecast API
Fetches weather data using coordinates:
```
https://api.open-meteo.com/v1/forecast?
  latitude={lat}&longitude={lon}&
  current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,precipitation&
  hourly=temperature_2m,weather_code&
  daily=weather_code,temperature_2m_max,temperature_2m_min&
  temperature_unit={celsius|fahrenheit}&
  wind_speed_unit={kmh|mph}&
  precipitation_unit={mm|inch}
```

## 🔧 Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Deploy with one click!

### Other Deployment Options
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)
- [Railway](https://railway.app/)

## ✨ Key Features Implementation

### Custom Dropdown Component
- Built from scratch without native `<select>`
- Click-outside detection to close
- Smooth rotation animation on chevron icon
- 90% width items with rounded corners for better visual spacing

### Loading States
- Animated bouncing dots indicator
- Skeleton screens matching actual content layout
- Responsive grid/horizontal layouts

### Error Handling
- Network error detection
- User-friendly error messages
- Retry functionality
- Graceful fallbacks

### Responsive Design
- Mobile-first approach
- Vertical card layout on mobile
- Grid layout for daily forecast on mobile (3 columns)
- Horizontal scrolling daily forecast on desktop
- Flexible hourly forecast with custom dropdown

## 🎯 Challenges & Solutions

### Challenge 1: Responsive Daily Forecast
**Problem:** Need different layouts for mobile (grid) vs desktop (horizontal scroll)

**Solution:** Use Tailwind's responsive utilities with `hidden` and `grid`/`flex` combinations:
```tsx
{/* Mobile: Grid */}
<div className="grid grid-cols-3 gap-3 md:hidden">

{/* Desktop: Horizontal Scroll */}
<div className="hidden md:flex overflow-x-auto gap-4">
```

### Challenge 2: Custom Dropdown with Outside Click
**Problem:** Native `<select>` doesn't match design requirements

**Solution:** Built custom dropdown with `useRef` and `useEffect` for outside-click detection:
```tsx
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
```

### Challenge 3: Weather Icon Mapping
**Problem:** Open-Meteo uses weather codes (0-99) but we have specific icon files

**Solution:** Created `getWeatherIcon()` function with condition string matching logic

## 📝 What I Learned

- Advanced Next.js 15 App Router patterns
- TypeScript type safety for API responses
- Responsive design with mobile-first approach
- Custom component development (dropdowns, skeletons)
- API integration and error handling
- CSS variable management for theming
- Click-outside detection patterns
- Tailwind CSS utility-first approach

## 🔮 Future Enhancements

- [ ] Add geolocation support (auto-detect user location)
- [ ] Implement weather alerts/warnings
- [ ] Add multiple location favorites
- [ ] Dark/light theme toggle
- [ ] PWA support with offline caching
- [ ] Animation for weather condition changes
- [ ] More detailed weather metrics (UV index, visibility, air quality)
- [ ] Weather charts and graphs
- [ ] Unit tests with Jest/React Testing Library
- [ ] E2E tests with Playwright

## 👤 Author

**Zakaria Elkhadir**

- GitHub: [@yourusername](https://github.com/yourusername)
- Frontend Mentor: [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

## 🙏 Acknowledgments

- Challenge by [Frontend Mentor](https://www.frontendmentor.io)
- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Challenge completed!** ✅ Feel free to explore the code, provide feedback, or use it as a reference for your own projects.

**Have fun building!** 🚀