"use client";
import { Ban, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message?: string;
  description?: string;
  onRetry: () => void;
}

const ErrorState = ({
  message = "Something went wrong",
  description = "We couldn't connect to the server (API error). Please try again in a few moments.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-12">
      {/* Error Icon - Circle with slash */}
      <div className="mb-8 relative">
        <div className="w-16 h-16 rounded-full border-4 border-white/30 flex items-center justify-center">
          <Ban size={40} className="text-white/60" strokeWidth={2} />
        </div>
      </div>

      {/* Error Message */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-4 max-w-2xl">
        {message}
      </h2>

      {/* Error Description */}
      <p className="text-base md:text-lg text-[var(--neutral-300)] text-center max-w-lg mb-10 leading-relaxed">
        {description}
      </p>

      {/* Retry Button */}
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)] active:bg-[var(--neutral-800)] transition-colors rounded-lg px-8 py-3.5 text-white font-medium text-base shadow-lg"
      >
        <RotateCcw size={18} strokeWidth={2} />
        Retry
      </button>
    </section>
  );
};

export default ErrorState;
