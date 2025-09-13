"use client";

import { useState } from "react";
import ShortenedLink from "@/app/components/ShortenedLink";
import QRForm from "@/app/components/QRForm";
import Button from "@/app/components/Button";
import { Loading } from "@/app/icons/IconsPage";
import { useI18n } from "../hooks/useI18n";

const LinkForm = () => {
  const { translate } = useI18n();
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");
  const [loadingLink, setLoadingLink] = useState(false);
  const [loadingQR, setLoadingQR] = useState(false);

  const handleReset = () => {
    setUrl("");
    setShortenUrl("");
    setShowQR(false);
    setError("");
    setLoadingLink(false);
    setLoadingQR(false);
  };

  const handleLink = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    setError("");
    if (!url) return;

    setLoadingLink(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, userId: null }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al obtener el enlace.");
        setShortenUrl("");
        setLoadingLink(false);
        return;
      }

      setShortenUrl(data.shorten);
    } catch (error) {
      setError("Error al obtener el enlace.");
    }
  };

  const handleGenerateQR = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault();
    if (!url) return;
    setError("");
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
          setError(data.error || "Error al acortar el enlace.");
          return;
        }

        short = data.shorten;
        setShortenUrl(short);
      }

      setShowQR(true);
    } catch (err) {
      setError("Error al acortar el enlace.");
    }
  };

  return (
    <section className="w-full flex justify-center py-4 px-4">
      <div
        className="w-full max-w-5xl p-8 rounded-3xl
             bg-[var(--color-surface)]
             border border-[var(--color-secondary)]
             shadow-sm"
      >
        {!shortenUrl && (
          <div className="flex flex-col items-center gap-6 w-full">
            <p className="font-medium text-[16px] text-[var(--color-primary)] text-center tracking-wide">
              {translate("LinkForm.titleForm")}
            </p>

            <div className="flex w-full gap-4">
              <input
                type="text"
                placeholder={translate("LinkForm.placeholder")}
                className="flex-1 px-4 py-2 rounded-lg 
                     border border-[var(--color-secondary)]
                     focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                     focus:border-[var(--color-primary)]
                     bg-[var(--color-background-page)] dark:bg-[var(--color-surface)]
                     hover:bg-[var(--color-background)]
                     text-[var(--color-text-primary)]
                     text-base lg:text-lg transition duration-300"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div className="flex gap-4 w-full items-stretch">
              <Button onClick={handleLink} width>
                {translate("Buttons.shorten")}
                {loadingLink && <Loading />}
              </Button>

              <Button onClick={handleGenerateQR} width>
                {translate("Buttons.qr")}
                {loadingQR && <Loading />}
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
