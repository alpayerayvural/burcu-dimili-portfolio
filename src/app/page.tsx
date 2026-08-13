"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageSlider from "@/components/ImageSlider";
import { pageSliders, allSliderImages } from "@/data/sliders";
import GalleryModal from "@/components/GalleryModal";
import TrustedBy from "@/components/TrustedBy";
import { siteContent, ClientItem } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";

function MainContent() {
  const { lang, setLang } = useLanguage();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const content = siteContent[lang];

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }

    const langParam = searchParams.get("lang")?.toUpperCase();
    if (langParam === "EN" || langParam === "TR") {
      setLang(langParam as "EN" | "TR");
    }
  }, [searchParams, setLang]);

  const handleOpenModal = (clickedIndexInTab: number) => {
    const currentTabImages =
      pageSliders[activeTab as keyof typeof pageSliders] || pageSliders.home;
    const clickedImage = currentTabImages[clickedIndexInTab];

    const globalIndex = allSliderImages.findIndex(
      (img) => img.url === clickedImage?.url
    );

    setModalIndex(globalIndex !== -1 ? globalIndex : 0);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col justify-between">
      <div>
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-2 md:py-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* SOL TARAF: Değişen İçerik */}
            <div className="lg:col-span-7">
              {/* onExitComplete eklendi: Eski içerik tamamen karardıktan SONRA çaktırmadan en üste kayar */}
              <AnimatePresence
                mode="wait"
                onExitComplete={() => window.scrollTo({ top: 0, behavior: "instant" })}
              >
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
                >
                  {/* TAB 1: HERO */}
                  {activeTab === "home" && (
                    <div className="space-y-6 pt-28">
                      <h2 className="font-serif text-2xl sm:text-3xl md:text-3xl lg:text-[2.6rem] tracking-tight text-[#1A1A1A] leading-[1.2]">
                        {content.hero.title}
                      </h2>
                      <p className="text-xs sm:text-sm md:text-base text-neutral-600 max-w-xl font-normal leading-relaxed">
                        {content.hero.description}
                      </p>
                    </div>
                  )}

                  {/* TAB 2: YAKLAŞIM */}
                  {activeTab === "approach" && (
                    <div className="space-y-10">
                      <div className="border-b border-neutral-300/60 pb-5">
                        <span className="inline-block translate-y-2 text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
                          {content.approach.title}
                        </span>
                      </div>
                      <h1 className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] leading-relaxed font-normal italic">
                        "{content.approach.subtitle}"
                      </h1>
                      <div className="border-t border-neutral-300/80 pt-2">
                        {content.approach.items.map((item, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 border-b border-neutral-300/50 py-5 items-baseline group"
                          >
                            <div className="md:col-span-5">
                              <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:italic transition-all">
                                {item.title}
                              </h3>
                            </div>
                            <div className="md:col-span-7">
                              <p className="text-xs md:text-sm text-neutral-600 font-normal leading-relaxed text-justify">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 3: MÜŞTERİLER */}
                  {(activeTab === "collaborations" || activeTab === "clients") && (
                    <div className="space-y-12">
                      <div className="border-b border-neutral-300/60 pb-5">
                        <span className="inline-block translate-y-2 text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
                          {content.collaborations.title}
                        </span>
                      </div>

                      {/* DEVAM EDEN ÇALIŞMALAR */}
                      <div className="space-y-6">
                        <h1 className="font-serif text-2xl md:text-3xl text-[#1A1A1A]">
                          {content.collaborations.ongoingTitle}
                        </h1>
                        <p className="text-sm text-neutral-600 italic border-l border-neutral-800 pl-4">
                          {content.collaborations.ongoingDesc}
                        </p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 items-center pt-2 -ml-3 sm:-ml-4">
                          {(content.collaborations.ongoingList as ClientItem[]).map((item, index) => (
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
                                <span className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A] text-center leading-snug tracking-wide opacity-95">
                                  {item.name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SEÇİLİ ÇALIŞMALAR */}
                      <div className="space-y-6 pt-10 border-t border-neutral-300/70">
                        <h2 className="font-serif text-3xl md:text-3xl text-[#1A1A1A]">
                          {content.collaborations.selectedTitle}
                        </h2>
                        <p className="text-sm text-neutral-600 italic border-l border-neutral-800 pl-4">
                          {content.collaborations.selectedDesc}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10 items-center pt-2 -ml-3 sm:-ml-4">
                          {(content.collaborations.selectedList as ClientItem[]).map((item, index) => (
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
                                <span className="font-serif font-bold text-base sm:text-lg text-[#1A1A1A] text-center leading-snug tracking-wide opacity-95">
                                  {item.name}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: BASIN */}
                  {activeTab === "press" && (
                    <div className="space-y-6">
                      <div className="border-b border-neutral-300/60 pb-5">
                        <span className="inline-block translate-y-2 text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
                          {content.press.title}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 italic border-l border-neutral-800 pl-4 py-0.5">
                        {content.press.description}
                      </p>
                      <div className="border-t border-neutral-300/80 pt-2">
                        {content.press.items.map((item, index) => (
                          <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col space-y-1 py-4 border-b border-neutral-300/50 hover:bg-[#E8E4DF]/40 -mx-3 px-3 transition-all rounded"
                          >
                            <span className="text-[10px] tracking-[0.15em] font-semibold text-neutral-500 uppercase">
                              {item.client}
                            </span>
                            <div className="flex items-baseline justify-between">
                              <h3 className="font-serif text-base text-[#1A1A1A] group-hover:italic transition-all">
                                {item.title}
                              </h3>
                              <span className="text-xs uppercase font-medium text-neutral-700 ml-3 shrink-0 inline-flex items-center space-x-1">
                                <span>{item.publication}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* TAB 5: EDİTORYAL */}
                  {activeTab === "editorial" && (
                    <div className="space-y-6">
                      <div className="border-b border-neutral-300/60 pb-5">
                        <span className="inline-block translate-y-2 text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
                          {content.editorial.title}
                        </span>
                      </div>
                      <p className="text-sm text-neutral-600 italic border-l border-neutral-800 pl-4 py-0.5">
                        {content.editorial.description}
                      </p>
                      <div className="border-t border-neutral-300/80 pt-2">
                        {content.editorial.items.map((item, index) => (
                          <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col space-y-1 py-4 border-b border-neutral-300/50 hover:bg-[#E8E4DF]/40 -mx-3 px-3 transition-all rounded"
                          >
                            <span className="text-xs font-semibold text-neutral-800 uppercase">
                              {item.publication}
                            </span>
                            <div className="flex items-baseline justify-between">
                              <h3 className="font-serif text-base text-[#1A1A1A] group-hover:italic transition-all">
                                {item.title}
                              </h3>
                              <span className="text-xs font-mono text-neutral-400 group-hover:text-black ml-3 shrink-0 inline-flex items-center">
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* SAĞ TARAF: Slider */}
            <div className="lg:col-span-5">
              <ImageSlider activeTab={activeTab} onImageClick={handleOpenModal} />
            </div>

          </div>

          {/* Sadece Ana Sekmedeyken Çalışılan Kurumlar Bandı */}
          {activeTab === "home" && (
            <div className="mt-5 lg:mt-6">
              <TrustedBy lang={lang} />
            </div>
          )}
        </main>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <Footer />
      </footer>

      {/* HD Galeri Modal */}
      <GalleryModal
        isOpen={isModalOpen}
        images={allSliderImages}
        currentIndex={modalIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setModalIndex((prev) =>
            prev === 0 ? allSliderImages.length - 1 : prev - 1
          )
        }
        onNext={() =>
          setModalIndex((prev) => (prev + 1) % allSliderImages.length)
        }
      />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F4F3EF]" />}>
      <MainContent />
    </Suspense>
  );
}