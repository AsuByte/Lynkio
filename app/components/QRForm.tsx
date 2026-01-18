import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";
import { iconsQR } from "@/app/icons/IconsPage";
import { useTheme } from "@/app/hooks/useTheme";
import { useI18n } from "@/app/hooks/useI18n";

interface QRProps {
  shortenUrl: string;
  onBack?: () => void;
}

const QRForm = ({ shortenUrl, onBack }: QRProps) => {
  const { dark } = useTheme();
  const { translate } = useI18n();
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

  const safeQrColor =
    qrColor.toLowerCase() === "#ffffff"
      ? dark
        ? "#ff8a9d"
        : "#000000"
      : qrColor;

  const handleColorChange = (value: string) => {
    if (value.toLowerCase() === "#ffffff") {
      if (dark) {
        setQrColor("#ff8a9d");
      } else {
        setQrColor("#000000");
      }
    } else {
      setQrColor(value);
    }
  };

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
    <div className="flex flex-col items-center w-full gap-6 px-4 sm:px-0">
      <p className="text-(--color-accent) font-bold text-center">
        {translate("ShortenedLink.subtitleShortened")}
      </p>
      <p className="text-(--color-text-primary) font-medium text-center break-all max-w-full sm:max-w-md">
        {shortenUrl}
      </p>

      <div className="flex justify-center items-center w-full mt-4">
        <QRCodeSVG
          id="qr-svg"
          value={shortenUrl}
          size={256}
          fgColor={safeQrColor}
          level="H"
          imageSettings={
            icon
              ? {
                  src: `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                  <text x="50%" y="50%" dy="0.35em" text-anchor="middle" font-size="28">${icon}</text></svg>`,
                  height: 36,
                  width: 36,
                  excavate: true,
                }
              : undefined
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mt-4">
        <button
          className="flex-1 px-4 py-2 bg-(--color-primary) text-(--color-surface)
                     rounded-lg hover:bg-(--color-highlight) cursor-pointer transition-colors duration-200"
          onClick={() => setCustomize(!customize)}
        >
          {customize
            ? translate("Buttons.hide")
            : translate("Buttons.customize")}
        </button>

        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 bg-(--color-primary) text-(--color-surface)
                     rounded-lg hover:bg-(--color-highlight) cursor-pointer transition-colors duration-200"
        >
          {translate("Buttons.save")}
        </button>

        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 px-4 py-2 bg-(--color-primary) text-(--color-surface)
                       rounded-lg hover:bg-(--color-highlight) cursor-pointer transition-colors duration-200"
          >
            {translate("Buttons.back")}
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
            className="flex flex-col w-full gap-4 mt-4 items-start sm:max-w-md"
          >
            <div className="flex items-center gap-4 w-full">
              <label className="text-(--color-accent) font-bold">
                {translate("CustomizeOptions.color")}
              </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => handleColorChange(e.target.value)}
                className="w-12 h-8 cursor-pointer rounded border border-gray-300"
              />
            </div>

            <div className="flex items-center gap-4 w-full">
              <label className="text-(--color-accent) font-bold">
                {translate("CustomizeOptions.icon")}
              </label>
              <select
                value={icon || ""}
                onChange={(e) => setIcon(e.target.value || null)}
                className="flex-1 border border-gray-300 rounded px-2 py-1 bg-(--color-surface)"
              >
                <option value="">{translate("CustomizeOptions.option")}</option>
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
