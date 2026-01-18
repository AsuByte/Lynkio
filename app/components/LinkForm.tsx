"use client";

import { useState } from "react";
import { Loading } from "@/app/icons/IconsPage";
import { useI18n } from "@/app/hooks/useI18n";
import { useTheme } from "@/app/hooks/useTheme";
import { validateUrl } from "@/app/helpers/validations";
import { useMessages } from "@/app/hooks/useMessages";
import ShortenedLink from "@/app/components/ShortenedLink";
import QRForm from "@/app/components/QRForm";
import Button from "@/app/components/Button";

const LinkForm = () => {
  const { dark } = useTheme();
  const { translate } = useI18n();
  const messages = useMessages();
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");
  const [loadingLink, setLoadingLink] = useState(false);
  const [loadingQR, setLoadingQR] = useState(false);

  const handleReset = () => {
    setUrl("");
    setShortenUrl("");
    setError("");
    setShowQR(false);
    setLoadingLink(false);
    setLoadingQR(false);
  };

  const handleLink = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    setError("");

    const { valid: normalizedUrl, error: validationError } = validateUrl(
      url,
      messages
    );

    if (!normalizedUrl) {
      setError(validationError);
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoadingLink(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: normalizedUrl, userId: null }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || translate("Validations.shortenErrorUrl"));
        setShortenUrl("");
        setTimeout(() => setError(""), 3000);
        return;
      }

      setShortenUrl(data.shorten);
      setUrl(normalizedUrl);
    } catch {
      setError(translate("Validations.internalError"));
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleGenerateQR = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    setError("");

    const { valid: normalizedUrl, error: validationError } = validateUrl(
      url,
      messages
    );

    if (!normalizedUrl) {
      setError(validationError);
      setTimeout(() => setError(""), 3000);
      return;
    }

    setLoadingQR(true);

    try {
      let short = shortenUrl;
      if (!shortenUrl) {
        const res = await fetch("/api/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url, userId: null }),
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || translate("Validations.shortenErrorUrl"));
          setTimeout(() => setError(""), 3000);
          return;
        }

        short = data.shorten;
        setShortenUrl(short);
      }

      setShowQR(true);
    } catch {
      setError(translate("Validations.shortenErrorUrl"));
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <section className="w-full flex justify-center py-4 px-4">
       <div className="w-full max-w-3xl sm:max-w-4xl lg:max-w-5xl p-6 sm:p-8 rounded-3xl
                      bg-(--color-surface) border border-(--color-secondary)
                      shadow-md transition-all duration-300">
        {!shortenUrl && (
          <div className="flex flex-col items-center gap-4 sm:gap-6 w-full">
            <p className="font-medium text-sm sm:text-lg text-(--color-primary) text-center tracking-wide">
              {translate("LinkForm.titleForm")}
            </p>

            <div className="flex w-full flex-col items-center">
              <input
                type="text"
                placeholder={translate("LinkForm.placeholder")}
                className={`w-full max-w-md px-4 py-2 rounded-lg border 
                focus:outline-none focus:ring-2 
                text-(--color-text-primary) text-base sm:text-lg transition duration-300
                ${
                  error
                    ? dark
                      ? "border-(--color-errors) focus:ring-(--color-errors)"
                      : "border-(--color-errors) focus:ring-(--color-errors)"
                    : "border-(--color-secondary) focus:ring-(--color-primary) focus:border-(--color-primary)"
                }
                bg-(--color-surface) hover:bg-(--color-background-hover)`}
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <p
                className={`text-sm max-w-96 wrap-break-word font-medium text-center
                transition-opacity duration-300 mt-2
                ${error ? "opacity-100" : "opacity-0"}
                ${
                  dark
                    ? "text-(--color-errors)"
                    : "text-(--color-errors)"
                }`}
              >
                {error || " "}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full items-stretch">
              <Button onClick={handleLink} width>
                {loadingLink && <Loading />}
                {translate("Buttons.shorten")}
              </Button>

              <Button onClick={handleGenerateQR} width>
                {loadingQR && <Loading />}
                {translate("Buttons.qr")}
              </Button>
            </div>
          </div>
        )}

        {shortenUrl && !showQR && (
          <ShortenedLink
            url={url}
            shortenUrl={shortenUrl}
            onBack={handleReset}
          />
        )}

        {showQR && <QRForm shortenUrl={shortenUrl} onBack={handleReset} />}
      </div>
    </section>
  );
};

export default LinkForm;
