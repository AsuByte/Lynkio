import type { Metadata } from "next";
import { inter } from "@/app/fonts/fontsGoogle";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
  title: "Lynkio",
  description:
    "Link shortener with basic statistics visualizations and QR code creation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-(--color-background-page) flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center w-full px-4">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
