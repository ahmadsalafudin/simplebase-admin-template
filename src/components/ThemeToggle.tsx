"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      onClick={toggleTheme}
      className="relative h-32 w-32 rounded-button border border-slate flex items-center justify-center hover:border-graphite transition-colors"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      {isLight ? (
        <Sun size={14} className="text-silver-mist" />
      ) : (
        <Moon size={14} className="text-silver-mist" />
      )}
    </button>
  );
}
