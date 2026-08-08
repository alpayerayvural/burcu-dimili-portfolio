"use client";

import Marquee from "@/components/Marquee";
import { row1Partners, row2Partners } from "@/data/partners";

interface TrustedByProps {
  lang: "TR" | "EN";
}

export default function TrustedBy({ lang }: TrustedByProps) {
  return (
    <section id="trusted-by" className="w-full mt-4 pt-2 border-t border-neutral-300/50">
      {/* 1. Tam Ortalanmış Editoryal Başlık */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-3 text-center">
        <span className="text-[10px] md:text-xs tracking-[0.3em] font-medium text-neutral-500 uppercase inline-block">
          {lang === "TR" ? "İŞ BİRLİKLERİ" : "COLLABORATIONS"}
        </span>
      </div>

      {/* 2. Çerçevesiz, Yumuşacık Dikey Degrade (Krem -> Beyaz -> Krem) */}
      <div className="relative w-full bg-gradient-to-b from-[#F4F3EF] via-white to-[#F4F3EF] py-1">
        {/* Sol Duvar Minimal Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-r from-[#F4F3EF] via-[#F4F3EF]/80 to-transparent z-10 pointer-events-none" />

        {/* Sağ Duvar Minimal Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 bg-gradient-to-l from-[#F4F3EF] via-[#F4F3EF]/80 to-transparent z-10 pointer-events-none" />

        {/* Logo Bandı */}
        <Marquee row1={row1Partners} row2={row2Partners} />
      </div>
    </section>
  );
}