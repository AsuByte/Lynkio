"use client";

import { useState } from "react";
import { useI18n } from "@/app/hooks/useI18n";

interface ShortenedLinkProps {
  url: string;
  shortenUrl: string;
  onBack?: () => void;
}

const ShortenedLink = ({ url, shortenUrl, onBack }: ShortenedLinkProps) => {
  const { translate } = useI18n();
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopy = () => {
    if (!shortenUrl) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shortenUrl)
        .then(() => {
          setCopyMessage(translate("ShortenedLink.copy"));
          setTimeout(() => setCopyMessage(""), 3000);
        })
        .catch(() => {
          alert(translate("ShortenedLink.copyError"));
        });
    } else {
      const fallback = window.prompt(
        translate("ShortenedLink.copyFallback"),
        shortenUrl
      );
      if (fallback) {
        setCopyMessage(translate("ShortenedLink.copy"));
        setTimeout(() => setCopyMessage(""), 3000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4 sm:px-0">
      <p className="text-(--color-accent) font-bold text-center">
        {translate("ShortenedLink.subtitleOriginal")}
      </p>
      <p className="text-(--color-text-primary) text-center break-all font-medium max-w-full sm:max-w-md">
        {url}
      </p>

      <p className="text-(--color-accent) font-bold text-center">
        {translate("ShortenedLink.subtitleShortened")}
      </p>
      <p className="text-(--color-text-primary) font-medium text-center break-all max-w-full sm:max-w-md">
        {shortenUrl}
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
        <div className="flex-1 relative flex flex-col">
          <button
            onClick={handleCopy}
            className="w-full px-4 py-2 bg-(--color-primary) text-(--color-surface) 
                 rounded-lg hover:bg-(--color-highlight)
                 transition-colors duration-200 cursor-pointer select-none"
          >
            {translate("Buttons.copy")}
          </button>

          <div
            className={`w-full px-2 py-1 rounded-lg text-white text-xs text-center
                  bg-[#15662C] shadow-lg
                  transform transition-duration duration-300
                  origin-top
                  ${
                    copyMessage
                      ? "opacity-100 scale-100 mt-3"
                      : "opacity-0 scale-95 mt-0 pointer-events-none"
                  }`}
          >
            {copyMessage || " "}
          </div>
        </div>

        {shortenUrl && (
          <div className="flex-1">
            <button
              onClick={onBack}
              className="w-full px-4 py-2 bg-(--color-primary) text-(--color-surface) 
                   rounded-lg hover:bg-(--color-highlight)
                   transition-colors duration-200 cursor-pointer select-none"
            >
              {translate("Buttons.back")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShortenedLink;
