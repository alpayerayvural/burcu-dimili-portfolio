import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "BURCU DİMİLİ | PR & Communications",
  description: "Strategic communications for contemporary art, culture and institutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${cormorant.variable} ${inter.variable} overscroll-y-none`}>
      <body className="font-sans bg-[#F4F3EF] text-[#1A1A1A] antialiased selection:bg-[#1A1A1A] selection:text-[#F4F3EF] overscroll-y-contain">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}