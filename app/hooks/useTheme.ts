import { create } from "zustand";

interface Theme {
  dark: boolean;
  change: () => void;
}

export const useTheme = create<Theme>((set) => ({
  dark: false,
  change: () =>
    set((state) => {
      const newTheme = !state.dark;
      if (typeof document !== "undefined") {
        document.documentElement.classList.toggle("dark", newTheme);
      }
      return { dark: newTheme };
    }),
}));
