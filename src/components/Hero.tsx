"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Language, siteContent } from "@/data/content";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface HeroProps {
  lang: Language;
  onImageClick?: (index: number) => void;
}

const heroImages = [
  { url: "/images/hero/Autoban, Akbank.jpg", title: "AUTOBAN", subtitle: "Akbank" },
  { url: "/images/hero/Barbare Studio, Yer Duygusu.jpg", title: "BARBARE STUDIO", subtitle: "Yer Duygusu" },
  { url: "/images/hero/Bihter Yasemin Adalı, Haz ile Göklenir Dünya.jpg", title: "BİHTER YASEMİN ADALI", subtitle: "Haz ile Göklenir Dünya" },
  { url: "/images/hero/Bor Sanat, Zihnin Sınırlarında Bir Rota Fikret Muallâ.png", title: "BOR SANAT", subtitle: "Zihnin Sınırlarında Bir Rota Fikret Muallâ" },
  { url: "/images/hero/Hara, Canavarların Vaatleri.jpg", title: "HARA", subtitle: "Canavarların Vaatleri" },
  { url: "/images/hero/İMALAT-HANE, Antonio Cosentino.jpg", title: "İMALAT-HANE", subtitle: "Antonio Cosentino" },
  { url: "/images/hero/Melek Zeynep Bulut, Duo.jpg", title: "MELEK ZEYNEP BULUT", subtitle: "Duo" },
  { url: "/images/hero/Melek Zeynep Bulut, OpenMonuments.JPG", title: "MELEK ZEYNEP BULUT", subtitle: "OpenMonuments" },
  { url: "/images/hero/Pavilion of the Moment, Waugh Thistleton Architects+Photo_ Mark Cocksedge.JPG 9.JPG", title: "PAVILION OF THE MOMENT", subtitle: "Waugh Thistleton Architects" },
  { url: "/images/hero/The Red Room, designed by NUN Architecture and People Places Ideas_Photo_ Mark Cocksedge (1).JPEG", title: "THE RED ROOM", subtitle: "NUN Architecture" },
  { url: "/images/hero/Vuslat, Emanet.JPG", title: "VUSLAT", subtitle: "Emanet" },
  { url: "/images/hero/Wall_Tribune_Gate_Ali Derya Dostoğlu & Uğur Özer_Photo_ Mark Cocksedge (1).JPEG", title: "WALL, TRIBUNE, GATE", subtitle: "Ali Derya Dostoğlu & Uğur Özer" },
  { url: "/images/hero/YUNT, VarYok.jpg", title: "YUNT", subtitle: "VarYok" },
];

export default function Hero({ lang, onImageClick }: HeroProps) {
  const content = siteContent[lang].hero;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 7 saniyede bir akan ve mouse üstündeyken duran akış
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  };

  return (
    <section className="py-12 md:py-20 border-b border-neutral-300/70">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* SOL TARAF: Slogan & Açıklama */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full pt-4">
          <div className="space-y-6">
            <div className="w-12 h-[1px] bg-neutral-800"></div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#1A1A1A] leading-[1.15]">
              {content.title}
            </h2>
            <p className="text-sm md:text-base text-neutral-600 max-w-xl font-normal leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="hidden lg:flex items-center space-x-4 pt-16">
            <a
              href="#trusted-by"
              className="w-11 h-11 rounded-full border border-neutral-400 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 group cursor-pointer"
            >
              <span className="text-lg group-hover:translate-y-0.5 transition-transform">↓</span>
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: Otomatik Slider & Şık Gezinme Okları */}
        <div className="lg:col-span-6 flex flex-col group">
          <div 
            onClick={() => onImageClick && onImageClick(currentIndex)}
            onMouseEnter={() => setIsPaused(true)}  /* Fare girince dur */
            onMouseLeave={() => setIsPaused(false)} /* Fare çıkınca devam et */
            className="relative aspect-[4/3] w-full bg-neutral-200 overflow-hidden shadow-sm cursor-pointer"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={heroImages[currentIndex].url}
                alt={heroImages[currentIndex].title}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Sol / Sağ Şeffaf Gezinme Okları */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all pointer-events-auto cursor-pointer"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/60 transition-all pointer-events-auto cursor-pointer"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Görsel Altı Künye Bilgisi */}
          <div className="mt-3 flex justify-between items-baseline text-[11px] tracking-wider uppercase text-neutral-500 font-light">
            <span className="text-neutral-500 font-light">
              {heroImages[currentIndex].title}
            </span>
            <span>
              {heroImages[currentIndex].subtitle}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}