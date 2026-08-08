"use client";

import Marquee from "@/components/Marquee";
import { row1Partners, row2Partners } from "@/data/partners";

interface TrustedByProps {
  lang: "TR" | "EN";
}

export default function TrustedBy({ lang }: TrustedByProps) {
  return (
    <section id="trusted-by" className="w-full border-t border-neutral-300/60 pt-6 mt-4">
      {/* 1. Tam Ortalanmış Editoryal Başlık */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6 text-center">
        <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-neutral-500 uppercase inline-block">
          {lang === "TR" ? "İŞ BİRLİKLERİ" : "COLLABORATIONS"}
        </span>
      </div>

      {/* Daraltılmış Minimalist Fade Katmanları */}
      <div className="relative w-full overflow-hidden">
        {/* Sol Duvar Minimal Fade (Genişlik: w-8 sm:w-12 md:w-20) */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-r from-[#F4F3EF] to-transparent z-10 pointer-events-none" />

        {/* Sağ Duvar Minimal Fade (Genişlik: w-8 sm:w-12 md:w-20) */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-20 bg-gradient-to-l from-[#F4F3EF] to-transparent z-10 pointer-events-none" />

        {/* Logo Bandı */}
        <Marquee row1={row1Partners} row2={row2Partners} />
      </div>
    </section>
  );
}