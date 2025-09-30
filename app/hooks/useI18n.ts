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
    return (
      key
        .split(".")
        .reduce((acc: any, part) => acc?.[part], messages[locale]) ?? key
    );
  },
  setLocale: (locale) => set({ locale }),
}));
