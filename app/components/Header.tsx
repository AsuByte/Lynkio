"use client";

import Link from "next/link";
import { luckiest } from "@/app/fonts/fontsGoogle";
import DarkMode from "@/app/components/DarkMode";
import Language from "@/app/components/Language";

const Header = () => {
  return (
    <header className="h-16 bg-[var(--color-background)] flex items-center px-6">
      
      <div className="absolute left-1/2 -translate-x-1/2">
        <Link
          href="/"
          className={`${luckiest.className} text-[var(--color-primary)] text-4xl font-bold tracking-wide`}
          aria-label="Página de inicio"
        >
          Lynkio
        </Link>
      </div>

      <div className="flex-shrink-0 flex items-center space-x-2 ml-auto">
        <Language />
        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
