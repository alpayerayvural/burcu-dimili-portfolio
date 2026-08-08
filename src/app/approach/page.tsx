"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider, { heroImages } from "@/components/ImageSlider";
import GalleryModal from "@/components/GalleryModal";
import { siteContent } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function ApproachPage() {
  const { lang } = useLanguage();
  const content = siteContent[lang].approach;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="mb-8 border-b border-neutral-300/60 pb-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
              {content.title}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* SOL TARAF: İçerik */}
            <div className="lg:col-span-7 space-y-12">
              <div className="max-w-3xl">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] leading-relaxed font-normal italic">
                  "{content.subtitle}"
                </h1>
              </div>

              <div className="border-t border-neutral-300/80 pt-4">
                {content.items.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-b border-neutral-300/50 py-6 items-baseline group"
                  >
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-lg md:text-xl text-[#1A1A1A] group-hover:italic transition-all">
                        {item.title}
                      </h3>
                    </div>
                    <div className="md:col-span-7">
                      <p className="text-xs md:text-sm text-neutral-600 font-normal leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ TARAF: Sabit Slider */}
            <div className="lg:col-span-5">
              <ImageSlider
                onImageClick={(index) => {
                  setModalIndex(index);
                  setIsModalOpen(true);
                }}
              />
            </div>
          </motion.div>
        </main>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <Footer />
      </footer>

      <GalleryModal
        isOpen={isModalOpen}
        images={heroImages}
        currentIndex={modalIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setModalIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))
        }
        onNext={() =>
          setModalIndex((prev) => (prev + 1) % heroImages.length)
        }
      />
    </div>
  );
}