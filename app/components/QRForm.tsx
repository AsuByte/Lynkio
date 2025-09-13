import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { iconsQR } from "../icons/IconsPage";
import { motion, AnimatePresence } from "framer-motion";

interface QRProps {
  shortenUrl: string;
  onBack?: () => void;
}

const QRForm = ({ shortenUrl, onBack }: QRProps) => {
  const [qrColor, setQrColor] = useState("#000000");
  const [customize, setCustomize] = useState(false);
  const [icon, setIcon] = useState<string | null>(null);

  function utf8ToBase64(str: string) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    );
  }

  const handleSave = () => {
    const svg = document.querySelector("#qr-svg") as SVGSVGElement;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const size = 1024;
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = "qr.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    img.src = "data:image/svg+xml;base64," + utf8ToBase64(svgString);
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full mt-4">
      <p className="text-[var(--color-primary)] font-medium text-center">
        Enlace acortado:
      </p>
      <p className="text-[var(--color-text-primary)] font-medium text-center break-all">
        {shortenUrl}
      </p>

      <div className="flex justify-center items-center w-full mt-4">
        <QRCodeSVG
          id="qr-svg"
          value={shortenUrl}
          size={256}
          fgColor={qrColor}
          level="H"
          imageSettings={
            icon
              ? {
                  src: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"><text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-size="28">${icon}</text></svg>`,
                  height: 36,
                  width: 36,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-surface)] rounded-lg hover:bg-[var(--color-highlight)] cursor-pointer transition-colors duration-200"
          onClick={() => setCustomize(!customize)}
        >
          {customize ? "Ocultar" : "Personalizar"}
        </button>

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-surface)] rounded-lg hover:bg-[var(--color-highlight)] cursor-pointer transition-colors duration-200"
        >
          Guardar como
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-[var(--color-primary)] text-[var(--color-surface)] 
                     rounded-lg hover:bg-[var(--color-highlight)]
                     transition-colors duration-200 cursor-pointer"
          >
            Volver
          </button>
        )}
      </div>

      <AnimatePresence>
        {customize && (
          <motion.div
            key="customize"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col w-full gap-4 mt-4 items-start"
          >
            <div className="flex items-center gap-4">
              <label className="font-medium">Selecciona color:</label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-12 h-8 cursor-pointer rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="font-medium">Escoge un icono:</label>
              <select
                value={icon || ""}
                onChange={(e) => setIcon(e.target.value || null)}
                className="w-32 border border-gray-300 rounded px-2 py-1"
              >
                <option value="">Ninguno</option>
                {iconsQR.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QRForm;
