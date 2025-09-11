type Lang = "es" | "en";

const translations = {
  es: {
    heroTitle: "Acorta tus enlaces de forma rápida",
    heroSubtitle: "Introduce tu enlace aquí:",
    buttonShorten: "Obtener enlace",
    linkOriginal: "Enlace original",
    linkShortened: "Enlace acortado",
    copy: "Copiar",
    generateQR: "Generar QR",
  },

  en: {
    heroTitle: "Shorten your links quickly",
    heroSubtitle: "Enter your link here:",
    buttonShorten: "Get link",
    linkOriginal: "Original link",
    linkShortened: "Shortened link",
    copy: "Copy",
    generateQR: "Generate QR",

  },
};

export function translate(key: keyof typeof translations.es, lang: Lang) {
  return translations[lang][key];
}
