"use client";

import { useState } from "react";
import QR from "./QRForm";
import { copy } from "../icons/IconsPage";

const LinkForm = () => {
  const [url, setUrl] = useState("");
  const [shortenUrl, setShortenUrl] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!url) return;

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
        return;
      }

      setShortenUrl(data.shorten);
    } catch (error) {
      setError("Error al obtener el enlace.");
    }
  };

  const handleCopy = () => {
    if (!shortenUrl) return;
    navigator.clipboard.writeText(shortenUrl);
    alert("Enlace copiado");
  };

  const handleGenerateQR = async () => {
    if (!url) return;
    setError("");

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
    <section className="w-full flex justify-center py-8 px-4">
      <div
        className="w-full max-w-5xl p-8 rounded-3xl
             bg-[var(--color-surface)]
             border border-[var(--color-secondary)]
             shadow-sm"
      >
        {!shortenUrl && (
          <div className="flex flex-col items-center gap-6 w-full">
            <p className="font-medium text-[16px] text-[var(--color-primary)] text-center tracking-wide">
              Introduce tu enlace aquí:
            </p>

            <div className="flex w-full gap-4">
              <input
                type="text"
                placeholder="https://tuenlace.com/ejemplo"
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
              <button
                onClick={handleSubmit}
                className="w-1/2 px-4 py-3 bg-[var(--color-primary)] text-[var(--color-surface)] 
                     font-medium rounded-lg hover:bg-[var(--color-highlight)]
                     transition-colors duration-300 cursor-pointer"
              >
                Obtener enlace
              </button>

              <button
                onClick={handleGenerateQR}
                className="w-1/2 px-4 py-3 bg-[var(--color-primary)] text-[var(--color-surface)]
         font-medium rounded-lg hover:bg-[var(--color-highlight)]
         transition-colors duration-300 cursor-pointer"
              >
                Generar QR
              </button>
            </div>
          </div>
        )}

        {shortenUrl && !showQR && (
          <div className="flex flex-col items-center gap-6 w-full">
            <p className="text-[var(--color-primary)] font-medium text-center">
              Enlace original:
            </p>
            <p className="text-black text-center break-all">{url}</p>

            <p className="text-[var(--color-primary)] font-medium text-center">
              Enlace acortado:
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
                Copiar
              </button>
            </div>
          </div>
        )}

        {showQR && <QR shortenUrl={shortenUrl} />}
      </div>
    </section>
  );
};

export default LinkForm;
