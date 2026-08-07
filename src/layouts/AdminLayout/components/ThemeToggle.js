"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import NavIcon from "@/components/icons/NavIcon";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "system", label: "System", icon: "system" },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="h-10 w-[8.5rem] rounded-xl border border-border bg-surface"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-surface p-1"
      role="group"
      aria-label="Theme"
    >
      {THEME_OPTIONS.map((option) => {
        const isActive = theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={`${option.label} theme`}
            aria-pressed={isActive}
            onClick={() => setTheme(option.value)}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted hover:bg-primary-soft hover:text-foreground"
            }`}
          >
            <NavIcon name={option.icon} className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
