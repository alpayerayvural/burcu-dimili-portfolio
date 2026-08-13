"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { pageSliders } from "@/data/sliders";
import GalleryModal from "@/components/GalleryModal";
import { siteContent, ClientItem } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function CollaborationsPage() {
  const { lang } = useLanguage();
  const content = siteContent[lang].collaborations;
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
            <div className="lg:col-span-7 space-y-16">
              {/* DEVAM EDEN ÇALIŞMALAR */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                    {content.ongoingTitle}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-600 font-light italic border-l border-neutral-800 pl-4 py-0.5">
                    {content.ongoingDesc}
                  </p>
                </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 items-center pt-2 -ml-3 sm:-ml-11">
                  {(content.ongoingList as ClientItem[]).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-2 h-20 sm:h-24 transition-all duration-300"
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-14 sm:max-h-16 lg:max-h-20 w-auto max-w-[95%] object-contain filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                        />
                      ) : (
                        <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] text-center leading-snug tracking-wide opacity-90">
                          {item.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SEÇİLİ ÇALIŞMALAR */}
              <div className="space-y-6 pt-10 border-t border-neutral-300/70">
                <div className="space-y-3">
                  <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                    {content.selectedTitle}
                  </h2>
                  <p className="text-sm md:text-base text-neutral-600 font-light italic border-l border-neutral-800 pl-4 py-0.5">
                    {content.selectedDesc}
                  </p>
                </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 items-center pt-2 -ml-3 sm:-ml-4">
                  {(content.selectedList as ClientItem[]).map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center p-2 h-20 sm:h-24 transition-all duration-300"
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.name}
                          className="max-h-14 sm:max-h-16 lg:max-h-20 w-auto max-w-[95%] object-contain filter grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
                        />
                      ) : (
                        <span className="font-serif font-bold text-sm sm:text-base text-[#1A1A1A] text-center leading-snug tracking-wide opacity-90">
                          {item.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SAĞ TARAF: Slider */}
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
        images={pageSliders.collaborations}
        currentIndex={modalIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setModalIndex((prev) => (prev === 0 ? pageSliders.collaborations.length - 1 : prev - 1))
        }
        onNext={() =>
          setModalIndex((prev) => (prev + 1) % pageSliders.collaborations.length)
        }
      />
    </div>
  );
}