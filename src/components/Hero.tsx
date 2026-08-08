"use client";

import { Language, siteContent } from "@/data/content";
import ImageSlider from "@/components/ImageSlider";

interface HeroProps {
  lang: Language;
  onImageClick?: (index: number) => void;
}

export default function Hero({ lang, onImageClick }: HeroProps) {
  const content = siteContent[lang].hero;

  return (
    <section className="py-8 md:py-16 border-b border-neutral-300/70">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* SOL TARAF: Slogan & Açıklama */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-2">
          <div className="space-y-6">
            <div className="w-12 h-[1px] bg-neutral-800"></div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#1A1A1A] leading-[1.15]">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 max-w-xl font-normal leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="hidden lg:flex items-center space-x-4 pt-12">
            <a
              href="#trusted-by"
              className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
            >
              <span className="text-lg group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: Dinamik Sayfa Slider'ı */}
        <div className="lg:col-span-6">
          <ImageSlider onImageClick={onImageClick} />
        </div>

      </div>
    </section>
  );
}