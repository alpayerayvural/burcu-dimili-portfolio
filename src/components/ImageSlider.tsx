"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const heroImages = [
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
  { url: "/images/hero/Vuslat, Emanet, Tophane-i Amire.jpg", title: "Vuslat", subtitle: "Emanet, Tophane-i Amire" },
];

interface ImageSliderProps {
  onImageClick?: (index: number) => void;
}

export default function ImageSlider({ onImageClick }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

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
    <div className="flex flex-col group sticky top-28">
      {/* Boyut çok hafif aşağıya doğru genişletildi (aspect-[5/4]) */}
      <div
        onClick={() => onImageClick && onImageClick(currentIndex)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative aspect-[5/4] w-full bg-neutral-200 overflow-hidden shadow-sm cursor-pointer"
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

        {/* Sol / Sağ Şeffaf Oklar */}
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

      {/* Künye */}
      <div className="mt-3 flex justify-between items-baseline text-[11px] tracking-wider uppercase text-neutral-500 font-light">
        <span className="text-neutral-500 font-light">
          {heroImages[currentIndex].title}
        </span>
        <span>{heroImages[currentIndex].subtitle}</span>
      </div>
    </div>
  );
}