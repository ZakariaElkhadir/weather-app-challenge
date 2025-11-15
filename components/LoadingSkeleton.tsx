"use client";

interface LoadingSkeletonProps {
  unit?: "metric" | "imperial";
}

const LoadingSkeleton = ({ unit = "metric" }: LoadingSkeletonProps) => {
  return (
    <section className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:items-start">
      {/* Left side: Main weather card + 4 detail cards + Daily forecast */}
      <div className="lg:col-span-2 space-y-4">
        {/* Main Weather Card Skeleton */}
        <div className="bg-[var(--neutral-800)] rounded-lg p-6 md:p-8 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Animated loading dots */}
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 bg-[var(--neutral-600)] rounded-full animate-bounce"></span>
            <span
              className="w-3 h-3 bg-[var(--neutral-600)] rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-3 h-3 bg-[var(--neutral-600)] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
          <p className="text-[var(--neutral-300)] text-lg">Loading...</p>
        </div>

        {/* 4 Weather Detail Cards Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feels Like Card */}
          <div className="bg-[var(--neutral-800)] rounded-lg p-6">
            <p className="text-[var(--neutral-300)] text-sm mb-2">Feels Like</p>
            <div className="h-9 w-16 bg-[var(--neutral-700)] rounded animate-pulse"></div>
          </div>

          {/* Humidity Card */}
          <div className="bg-[var(--neutral-800)] rounded-lg p-6">
            <p className="text-[var(--neutral-300)] text-sm mb-2">Humidity</p>
            <div className="h-9 w-16 bg-[var(--neutral-700)] rounded animate-pulse"></div>
          </div>

          {/* Wind Card */}
          <div className="bg-[var(--neutral-800)] rounded-lg p-6">
            <p className="text-[var(--neutral-300)] text-sm mb-2">Wind</p>
            <div className="h-9 w-16 bg-[var(--neutral-700)] rounded animate-pulse"></div>
          </div>

          {/* Precipitation Card */}
          <div className="bg-[var(--neutral-800)] rounded-lg p-6">
            <p className="text-[var(--neutral-300)] text-sm mb-2">Precipitation</p>
            <div className="h-9 w-16 bg-[var(--neutral-700)] rounded animate-pulse"></div>
          </div>
        </div>

        {/* Daily Forecast Section Skeleton */}
        {/* Daily Forecast Section */}
        <div className="space-y-4 w-full">
          <h3 className="text-xl font-semibold text-[var(--neutral-0)]">Daily forecast</h3>

          {/* Mobile: Grid Layout */}
          <div className="grid grid-cols-3 gap-3 md:hidden">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="bg-[var(--neutral-800)] rounded-lg p-3 flex flex-col items-center gap-2"
              >
                {/* Day name skeleton */}
                <div className="h-3 w-8 bg-[var(--neutral-700)] rounded animate-pulse"></div>

                {/* Weather icon skeleton */}
                <div className="w-10 h-10 bg-[var(--neutral-700)] rounded-full animate-pulse"></div>

                {/* Temperatures skeleton */}
                <div className="flex flex-col items-center gap-1">
                  <div className="h-3 w-6 bg-[var(--neutral-700)] rounded animate-pulse"></div>
                  <div className="h-3 w-6 bg-[var(--neutral-700)] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Horizontal Scroll */}
          <div className="hidden md:flex overflow-x-auto gap-4 pb-4 scrollbar-hide w-full">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="bg-[var(--neutral-800)] rounded-lg p-4 min-w-[120px] flex flex-col items-center gap-3"
              >
                {/* Day name skeleton */}
                <div className="h-4 w-16 bg-[var(--neutral-700)] rounded animate-pulse"></div>

                {/* Weather icon skeleton */}
                <div className="w-12 h-12 bg-[var(--neutral-700)] rounded-full animate-pulse"></div>

                {/* Temperatures skeleton */}
                <div className="flex gap-2">
                  <div className="h-4 w-8 bg-[var(--neutral-700)] rounded animate-pulse"></div>
                  <div className="h-4 w-8 bg-[var(--neutral-700)] rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Hourly Forecast Skeleton */}
      <div className="lg:col-span-1 bg-[var(--neutral-800)] rounded-lg p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[var(--neutral-0)] text-base font-bold">Hourly forecast</h3>
          <div className="bg-[var(--neutral-700)] rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="h-4 w-16 bg-[var(--neutral-600)] rounded animate-pulse"></div>
            <div className="w-4 h-4 bg-[var(--neutral-600)] rounded animate-pulse"></div>
          </div>
        </div>

        {/* Hourly forecast cards skeleton */}
        <div className="space-y-2">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-[var(--neutral-700)] rounded-lg h-16 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoadingSkeleton;
