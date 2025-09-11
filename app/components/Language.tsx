"use client";

import { useState } from "react";
import { flagES, flagUS, arrow } from "@/app/icons/IconsPage";

const Language = () => {
  const [lang, setLang] = useState("es");
  const [open, setOpen] = useState(false);

  const options = [
    { code: "es", label: "ES", icon: flagES },
    { code: "en", label: "EN", icon: flagUS },
  ];

  const current = options.find((o) => o.code === lang)!;
  const otherOptions = options.filter((o) => o.code !== lang);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-[4px] p-1 rounded bg-[var(--color-surface)] 
                   dark:bg-[var(--color-dark-secondary)] 
                   hover:bg-[var(--color-accent)] cursor-pointer"
        title={lang ? "Cambiar idioma" : "Change language"}
      >
        <span className="w-5 h-5">{current.icon}</span>
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          {current.label}
        </span>
        <span>{arrow}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-0" onClick={() => setOpen(false)} />
          <div
            className="absolute left-0 mt-0 bg-[var(--color-surface)] 
            dark:bg-[var(--color-dark-secondary)] 
            rounded-lg overflow-hidden z-10"
          >
            {otherOptions.map((opt) => (
              <button
                key={opt.code}
                onClick={() => {
                  setLang(opt.code as "es" | "en");
                  setOpen(false);
                }}
                className="flex items-center gap-1 w-full 
              px-3 py-2 text-left hover:bg-[var(--color-accent)] cursor-pointer"
              >
                <span className="w-5 h-5">{opt.icon}</span>
                <span className="text-sm text-[var(--color-text-primary)] font-medium">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Language;
