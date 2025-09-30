import { create } from "zustand";
import es from "@/app/locale/es.json";
import en from "@/app/locale/en.json";

type Locale = "es" | "en";

const messages = { es, en };

interface I18nState {
  locale: Locale;
  translate: (key: string) => string;
  setLocale: (locale: Locale) => void;
}

export const useI18n = create<I18nState>((set, get) => ({
  locale: "en",
  translate: (key: string) => {
    const { locale } = get();
    const result = key.split(".").reduce((acc: unknown, part) => {
      if (acc && typeof acc === "object" && part in acc) {
        return (acc as Record<string, unknown>)[part];
      }
      return undefined;
    }, messages[locale]);
    return typeof result === "string" ? result : key;
  },
  setLocale: (locale) => set({ locale }),
}));
