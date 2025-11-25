"use client";
import { Settings, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitChange: (unit: "metric" | "imperial") => void;
}

const Header = ({ unit, onUnitChange }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickSwitch = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    onUnitChange(newUnit);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 md:p-6 lg:p-8"
    >
      <div className="flex items-center">
        <img src={"/assets/images/logo.svg"} alt="Weather App Logo" className="h-8 md:h-10" />
      </div>
      <div className="relative">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-[var(--neutral-700)] hover:bg-[var(--neutral-600)] transition-colors px-3 py-2 rounded-md flex items-center gap-2 text-sm md:text-base"
        >
          <Settings className="w-4 h-4 md:w-5 md:h-5" />
          <span className="font-medium">Units</span>
          <ChevronDown
            className={`w-3 h-3 md:w-4 md:h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </motion.button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-56 bg-[var(--neutral-700)] rounded-lg shadow-lg overflow-hidden z-10 border border-[var(--neutral-600)]"
            >
              {/* Quick Switch */}
              <button
                onClick={handleQuickSwitch}
                className="w-full text-left px-4 py-3 hover:bg-[var(--neutral-600)] transition-colors border-b border-[var(--neutral-600)] font-medium"
              >
                Switch to {unit === "metric" ? "Imperial" : "Metric"}
              </button>

              {/* Temperature Section */}
              <div className="border-b border-[var(--neutral-600)]">
                <div className="px-4 pt-3 pb-2">
                  <p className="text-[var(--neutral-300)] text-xs font-semibold uppercase">
                    Temperature
                  </p>
                </div>
                <button
                  onClick={() => {
                    onUnitChange("metric");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between"
                >
                  <span>Celsius (°C)</span>
                  {unit === "metric" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
                <button
                  onClick={() => {
                    onUnitChange("imperial");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between"
                >
                  <span>Fahrenheit (°F)</span>
                  {unit === "imperial" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
              </div>

              {/* Wind Speed Section */}
              <div className="border-b border-[var(--neutral-600)]">
                <div className="px-4 pt-3 pb-2">
                  <p className="text-[var(--neutral-300)] text-xs font-semibold uppercase">
                    Wind Speed
                  </p>
                </div>
                <button
                  onClick={() => {
                    onUnitChange("metric");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between"
                >
                  <span>km/h</span>
                  {unit === "metric" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
                <button
                  onClick={() => {
                    onUnitChange("imperial");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between"
                >
                  <span>mph</span>
                  {unit === "imperial" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
              </div>

              {/* Precipitation Section */}
              <div>
                <div className="px-4 pt-3 pb-2">
                  <p className="text-[var(--neutral-300)] text-xs font-semibold uppercase">
                    Precipitation
                  </p>
                </div>
                <button
                  onClick={() => {
                    onUnitChange("metric");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between"
                >
                  <span>Millimeters (mm)</span>
                  {unit === "metric" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
                <button
                  onClick={() => {
                    onUnitChange("imperial");
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[var(--neutral-600)] transition-colors flex items-center justify-between pb-3"
                >
                  <span>Inches (in)</span>
                  {unit === "imperial" && <Check className="w-5 h-5 text-[var(--blue-500)]" />}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
export default Header;
