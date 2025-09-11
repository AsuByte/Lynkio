import { github, linkedin } from "@/app/icons/IconsPage";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center py-6 bg-[var(--color-background)] mt-8">
      <div className="text-center mb-2">
        <p className="text-sm text-[var(--color-text-secondary)] font-medium">
          Proyecto Personal
        </p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          <span className="text-[var(--color-text-primary)] font-medium">Christian Asuero Carrellán</span> ·{" "}
          {new Date().getFullYear()}
        </p>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://github.com/AsuByte"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-primary)] hover:text-[var(--color-hover-secondary)] transition-colors duration-200"
        >
          {github}
        </a>

        <a
          href="https://www.linkedin.com/in/christian-asuero-carrell%C3%A1n-6592662aa/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-text-primary)] hover:text-[var(--color-hover-secondary)] transition-colors duration-200"
        >
          {linkedin}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
