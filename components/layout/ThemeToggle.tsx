"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme") as Theme | null;
      if (savedTheme && ["light", "dark", "system"].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    } catch (error) {
      console.warn("Failed to read theme from localStorage:", error);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        applyTheme(e.matches);
      }
    };

    let isDark = false;
    switch (theme) {
      case "dark":
        isDark = true;
        break;
      case "light":
        isDark = false;
        break;
      case "system":
      default:
        isDark = mediaQuery.matches;
        break;
    }

    applyTheme(isDark);

    try {
      localStorage.setItem("theme", theme);
    } catch (error) {
      console.warn("Failed to save theme to localStorage:", error);
    }

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
  }, [theme, mounted]);

  const cycleTheme = () => {
    const themes: Theme[] = ["light", "dark", "system"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800"
        aria-label="Toggle theme"
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  const getIcon = () => {
    switch (theme) {
      case "dark":
        return <Moon className="h-5 w-5" />;
      case "light":
        return <Sun className="h-5 w-5" />;
      case "system":
        return (
          <>
            <Sun className="h-5 w-5 absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
            <Moon className="h-5 w-5 absolute -rotate-90 scale-0 transition-transform dark:-rotate-90 dark:scale-0" />
          </>
        );
    }
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      aria-label={`Current theme: ${theme}. Click to switch theme.`}
    >
      {getIcon()}
    </button>
  );
}
