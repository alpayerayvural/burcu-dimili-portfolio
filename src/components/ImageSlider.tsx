"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageSliders, PageSliderType } from "@/data/sliders";

interface ImageSliderProps {
  activeTab?: string;
  onImageClick?: (index: number) => void;
}

export default function ImageSlider({ activeTab = "home", onImageClick }: ImageSliderProps) {
  // Aktif sekmenin geçerli bir slider kategorisi olup olmadığını kontrol et
  const activePage = (activeTab in pageSliders ? activeTab : "home") as PageSliderType;
  const images = pageSliders[activePage];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Sekme (activeTab) değiştiğinde slider resmini baştan (0) başlat
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  // 5 Saniyelik otomatik akış
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  return (
    <div className="flex flex-col group sticky top-28 select-none">
      <div
        onClick={() => onImageClick && onImageClick(currentIndex)}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative aspect-[4/3] sm:aspect-[5/4] w-full bg-neutral-200 overflow-hidden shadow-sm cursor-pointer"
      >
        <AnimatePresence initial={false}>
          <motion.img
            key={`${activePage}-${currentIndex}`}
            src={images[currentIndex].url}
            alt={images[currentIndex].title}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover touch-pan-y"
          />
        </AnimatePresence>

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

      <div className="mt-3 flex justify-between items-baseline text-[11px] tracking-wider uppercase text-neutral-500 font-light">
        <span className="text-neutral-500 font-light">
          {images[currentIndex].title}
        </span>
        <span>{images[currentIndex].subtitle}</span>
      </div>
    </div>
  );
}