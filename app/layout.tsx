import type { Metadata } from "next";
import { inter } from "@/app/fonts/fontsGoogle";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Lynkio",
  description:
    "Acortador de enlaces con visualizaciones de estadísticas básicas y creación de códigos QR.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className}
      bg-[var(--color-background-page)] flex-col min-h-screen`}>
        <Header />
        <main className="flex-grow flex justify-center items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
