"use client";

import { useI18n } from "@/app/hooks/useI18n";
import { flagES, flagUS } from "@/app/icons/IconsPage";

const Language = () => {
  const { locale, setLocale, translate } = useI18n();

  const options = [
    { code: "es", label: "ES", icon: flagES },
    { code: "en", label: "EN", icon: flagUS },
  ];

  const toggleLocale = () => {
    setLocale(locale === "es" ? "en" : "es");
  };

  return (
    <button
      onClick={toggleLocale}
      className="flex items-center gap-1 p-1 rounded bg-[var(--color-surface)] 
                 dark:bg-[var(--color-dark-secondary)] 
                 hover:bg-[var(--color-accent)] cursor-pointer"
      title={translate("Language.language")}
    >
      <span className="w-5 h-5">{locale === "es" ? flagES : flagUS}</span>
      <span className="text-sm font-medium text-[var(--color-text-primary)]">
        {locale.toUpperCase()}
      </span>
    </button>
  );
};

export default Language;
