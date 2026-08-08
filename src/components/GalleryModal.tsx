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

  // Client-side render kontrolü (Portal için şart)
  useEffect(() => {
    setMounted(true);
  }, []);

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

  // 7 Saniyelik Otomatik Akış
  useEffect(() => {
    if (!isOpen || isPaused) return;
    const timer = setInterval(() => {
      onNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [isOpen, isPaused, onNext]);

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

  // React Portal ile bileşeni doğrudan document.body'ye ışınlıyoruz
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-black select-none"
          style={{ top: 0, left: 0, right: 0, bottom: 0 }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImage.url}
                alt={currentImage.title}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Sağ Üst Kapat Butonu */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-50 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Close Modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Sol / Sağ Yüzen Oklar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPrev();
              }}
              className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-black/30 hover:bg-black/60 text-white/80 hover:text-white backdrop-blur-md transition-all cursor-pointer border border-white/10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-7 h-7" />
            </button>

            {/* Alt Künye */}
            <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-12 md:right-12 z-50 flex justify-between items-baseline text-xs md:text-sm tracking-widest uppercase font-light text-white/70 drop-shadow-md">
              <span className="font-light tracking-wider">
                {currentImage.title}
              </span>
              <span className="text-white/70">
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