"use client";

import { github, linkedin } from "@/app/icons/IconsPage";
import { useI18n } from "@/app/hooks/useI18n";

const Footer = () => {
  const { translate } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center py-8 bg-[var(--color-background)] mt-12">
      <div className="text-center mb-4">
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">
          {translate("Footer.title")}
        </p>

        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          <span className="text-[var(--color-text-primary)] font-medium">
            Christian Asuero Carrellán
          </span>{" "}
          · {currentYear}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com/AsuByte"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors duration-200"
          aria-label="Visitar perfil de Github"
          >
          {github}
        </a>

        <a
          href="https://www.linkedin.com/in/christian-asuero-carrell%C3%A1n-6592662aa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-primary)] 
          hover:text-[var(--color-accent)] 
          transition-colors duration-200"
          aria-label="Visitar perfil de LinkedIn"
        >
          {linkedin}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
