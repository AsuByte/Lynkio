"use client";

import Link from "next/link";
import { luckiest } from "@/app/fonts/fontsGoogle";
import DarkMode from "@/app/components/DarkMode";
import Language from "@/app/components/Language";

const Header = () => {
  return (
    <header className="w-full bg-[var(--color-background)] px-4 sm:px-6 py-4 flex items-center justify-between">
      <div className="flex-1"></div>

      <div className="flex justify-center flex-1 min-w-0 items-center">
        <Link
          href="/"
          className={`${luckiest.className} text-[var(--color-accent)] text-3xl sm:text-3xl md:text-4xl 
          font-bold tracking-wide truncate leading-tight sm:leading-normal mt-2 sm:mt-0`}
          aria-label="Home page"
        >
          Lynkio
        </Link>
      </div>

      <div className="flex items-center justify-end space-x-2 sm:space-x-2 flex-1">
        <Language />
        <DarkMode />
      </div>
    </header>
  );
};

export default Header;
