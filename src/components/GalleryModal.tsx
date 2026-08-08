"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageItem {
  url: string;
  title: string;
  subtitle: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  images: ImageItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryModal({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryModalProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Client-side render kontrolü
  useEffect(() => {
    setMounted(true);
  }, []);

  // Görsellerin Arka Planda Akıllıca İndirilmesi (Preload Mechanism)
  useEffect(() => {
    if (!isOpen || !images || images.length === 0) return;

    const nextIndex = (currentIndex + 1) % images.length;
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    if (images[nextIndex]?.url) {
      const imgNext = new Image();
      imgNext.src = images[nextIndex].url;
    }

    if (images[prevIndex]?.url) {
      const imgPrev = new Image();
      imgPrev.src = images[prevIndex].url;
    }
  }, [currentIndex, isOpen, images]);

  // Arka plan scroll kilitleme
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // 5 Saniyelik Otomatik Akış (Manual geçişlerde currentIndex değişince sayaç baştan sıfırlanır)
  useEffect(() => {
    if (!isOpen || isPaused) return;
    const timer = setInterval(() => {
      onNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isOpen, isPaused, currentIndex, onNext]);

  // ESC ve Ok Tuşları Kontrolü
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !mounted) return null;

  const currentImage = images[currentIndex];

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          /* 100dvh ile mobil adres çubuğu taşmaları tamamen engellendi */
          className="fixed inset-0 z-[9999] w-screen h-[100dvh] overflow-hidden bg-black select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
            className="w-full h-full relative flex items-center justify-center p-4 md:p-12"
          >
            {/* Fotoğraf (Kadraj kesilmesin diye her ekranda ve yatay modda object-contain) */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImage.url}
                alt={currentImage.title}
                initial={{ opacity: 0, scale: 0.99 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="max-w-full max-h-full object-contain pointer-events-none"
              />
            </AnimatePresence>

            {/* MOBİL İÇİN GÖRÜNMEZ SAĞ/SOL DOKUNMATİK ALANLAR (Tap Zones) */}
            <div className="absolute inset-0 z-30 flex md:hidden pointer-events-auto">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="w-1/2 h-full cursor-pointer"
                aria-label="Previous Image Area"
              />
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="w-1/2 h-full cursor-pointer"
                aria-label="Next Image Area"
              />
            </div>

            {/* Sağ Üst Kapat Butonu */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-3 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* MASAÜSTÜ İÇİN YÜZEN OKLAR (Mobilde Gizli) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="hidden md:flex absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="hidden md:flex absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Alt Künye (Mobilde adres çubuğunun üstünde kalması için bottom-20 pb-safe eklendi) */}
            <div className="absolute bottom-20 md:bottom-10 left-6 right-6 md:left-12 md:right-12 z-40 flex justify-between items-baseline text-xs md:text-sm tracking-widest uppercase font-light text-white/80 drop-shadow-md pointer-events-none">
              <span className="font-light tracking-wider">
                {currentImage.title}
              </span>
              <span className="text-white/80">
                {currentImage.subtitle}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}