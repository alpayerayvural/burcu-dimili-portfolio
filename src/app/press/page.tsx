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

export default function PressPage() {
  const { lang } = useLanguage();
  const content = siteContent[lang].press;
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
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <h1 className="font-serif text-3xl md:text-4xl text-[#1A1A1A]">
                  {content.title}
                </h1>
                <p className="text-sm md:text-base text-neutral-600 font-light italic border-l border-neutral-800 pl-4 py-0.5">
                  {content.description}
                </p>
              </div>

              <div className="border-t border-neutral-300/80 pt-2">
                {content.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col space-y-1 py-5 border-b border-neutral-300/50 hover:bg-[#E8E4DF]/40 -mx-3 px-3 transition-all rounded"
                  >
                    <span className="text-[10px] tracking-[0.15em] font-semibold text-neutral-500 uppercase">
                      {item.client}
                    </span>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-base md:text-lg text-[#1A1A1A] group-hover:italic transition-all">
                        {item.title}
                      </h3>
                      <span className="text-xs uppercase font-medium text-neutral-700 ml-3 shrink-0">
                        {item.publication} ↗
                      </span>
                    </div>
                  </a>
                ))}
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
        images={pageSliders.press}
        currentIndex={modalIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setModalIndex((prev) => (prev === 0 ? pageSliders.press.length - 1 : prev - 1))
        }
        onNext={() =>
          setModalIndex((prev) => (prev + 1) % pageSliders.press.length)
        }
      />
    </div>
  );
}