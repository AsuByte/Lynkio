"use client";

import { github, linkedin } from "@/app/icons/IconsPage";
import { useI18n } from "@/app/hooks/useI18n";

const Footer = () => {
  const { translate } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center py-4 sm:py-6 bg-(--color-background) px-4">
      <div className="text-center mb-3 sm:mb-4 max-w-md">
        <p className="text-sm sm:text-base text-(--color-text-secondary) font-medium">
          {translate("Footer.title")}
        </p>

        <p className="text-sm sm:text-base text-(--color-text-secondary) mt-1 sm:mt-2">
          <span className="text-(--color-text-primary) font-medium">
            Christian Asuero Carrellán
          </span>{" "}
          · {currentYear}
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
        <a
          href="https://github.com/AsuByte"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--color-text-primary) hover:text-(--color-accent) transition-colors duration-200"
          aria-label="Visit Github profile"
        >
          {github}
        </a>

        <a
          href="https://www.linkedin.com/in/christian-asuero"
          target="_blank"
          rel="noopener noreferrer"
          className="text-(--color-text-primary) hover:text-(--color-accent) transition-colors duration-200"
          aria-label="Visit LinkedIn profile"
        >
          {linkedin}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
