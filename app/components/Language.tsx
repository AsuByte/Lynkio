"use client";

import { useI18n } from "@/app/hooks/useI18n";
import { flagES, flagUS } from "@/app/icons/IconsPage";

const Language = () => {
  const { locale, setLocale, translate } = useI18n();

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-2 sm:gap-1 p-2 rounded-md cursor-pointer
      text-[var(--color-text-primary)] hover:text-[var(--color-accent)]
      transition-colors duration-200"
      title={translate("Language.language")}
      aria-label={translate("Language.language")}
    >
      <span className="w-4 h-4 sm:w-5 sm:h-5">{locale === "es" ? flagES : flagUS}</span>
      <span className="text-sm sm:text-base mt-1 sm:mt-0 font-medium">{locale.toUpperCase()}</span>
    </button>
  );
};

export default Language;
