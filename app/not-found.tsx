"use client";

import Link from "next/link";
import { useI18n } from "@/app/hooks/useI18n";

const NotFound = () => {
  const { translate } = useI18n();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-[var(--color-text-primary)] px-4 text-center text-balance">
      <h1
        className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text
    bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-highlight)] drop-shadow-lg mb-6"
      >
        {translate("NotFound.message")}
      </h1>
      
      <p className="text-base md:text-lg font-medium mb-8 opacity-80 max-w-md">
        {translate("NotFound.description")}
      </p>

      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-primary)] text-[var(--color-surface)] 
        font-medium hover:bg-[var(--color-highlight)] transition-colors duration-300"
      >
        {translate("NotFound.backHome")}
      </Link>
    </div>
  );
};

export default NotFound;
