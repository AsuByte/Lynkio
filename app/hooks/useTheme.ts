import { create } from "zustand";
import { useEffect } from "react";

interface Theme {
  dark: boolean;
  change: () => void;
  setTheme: (dark: boolean) => void;
}

export const useTheme = create<Theme>((set) => ({
  dark: false,
  change: () =>
    set((state) => {
      const newTheme = !state.dark;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
      }
      return { dark: newTheme };
    }),
  setTheme: (dark) => set(() => ({ dark })),
}));

export const useInitTheme = () => {
  const setTheme = useTheme((s) => s.setTheme);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialDark = stored ? stored === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", initialDark);
    setTheme(initialDark);
  }, [setTheme]);
};
