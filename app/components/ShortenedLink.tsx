"use client";

import { useI18n } from "../hooks/useI18n";

interface ShortenedLinkProps {
  url: string;
  shortenUrl: string;
  onBack?: () => void;
}

const ShortenedLink = ({ url, shortenUrl, onBack }: ShortenedLinkProps) => {
  const { translate } = useI18n();

  const handleCopy = () => {
    if (!shortenUrl) return;
    navigator.clipboard.writeText(shortenUrl);
    alert("Enlace copiado");
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <p className="text-[var(--color-primary)] font-medium text-center">
        {translate("ShortenedLink.subtitleOriginal")}
      </p>
      <p className="text-black text-center break-all">{url}</p>

      <p className="text-[var(--color-primary)] font-medium text-center">
        {translate("ShortenedLink.subtitleShortened")}
      </p>
      <p className="text-black font-medium text-center break-all">
        {shortenUrl}
      </p>

      <div className="flex justify-center gap-4 w-full">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-surface)] 
                     rounded-lg hover:bg-[var(--color-highlight)]
                     transition-colors duration-200 cursor-pointer"
        >
          {translate("Buttons.copy")}
        </button>

        {shortenUrl && (
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-surface)] 
                     rounded-lg hover:bg-[var(--color-highlight)]
                     transition-colors duration-200 cursor-pointer"
          >
            {translate("Buttons.back")}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShortenedLink;
