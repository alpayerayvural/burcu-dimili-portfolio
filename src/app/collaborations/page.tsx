"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { pageSliders } from "@/data/sliders";
import GalleryModal from "@/components/GalleryModal";
import { siteContent } from "@/data/content";
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
              <div className="space-y-8">
                <div className="space-y-3">
                  <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                    {content.ongoingTitle}
                  </h1>
                  <p className="text-sm md:text-base text-neutral-600 font-light italic border-l border-neutral-800 pl-4 py-0.5">
                    {content.ongoingDesc}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 pt-2">
                  {content.ongoingList.map((item, index) => (
                    <div key={index} className="font-serif text-base text-[#1A1A1A] font-normal tracking-wide border-b border-neutral-300/40 pb-2">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 pt-6 border-t border-neutral-300/70">
                <div className="space-y-3">
                  <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A]">
                    {content.selectedTitle}
                  </h2>
                  <p className="text-sm md:text-base text-neutral-600 font-light italic border-l border-neutral-800 pl-4 py-0.5">
                    {content.selectedDesc}
                  </p>
                </div>

                <div className="bg-[#E8E4DF]/60 p-6 md:p-8 border border-neutral-300/60">
                  <div className="flex flex-wrap gap-y-3 gap-x-2 text-xs md:text-sm text-neutral-800 font-serif leading-relaxed">
                    {content.selectedList.map((item, index) => (
                      <span key={index} className="inline-flex items-center">
                        <span className="hover:italic text-neutral-800 font-normal cursor-default">
                          {item}
                        </span>
                        {index < content.selectedList.length - 1 && (
                          <span className="text-neutral-400 mx-2 font-sans text-xs font-light">
                            /
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
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