import { create } from "zustand";

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
