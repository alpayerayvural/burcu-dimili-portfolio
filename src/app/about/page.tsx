"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteContent } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";

export default function AboutPage() {
  const { lang } = useLanguage();
  const content = siteContent[lang].about;

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col justify-between">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16">
          {/* Üst İnce Etiket */}
          <div className="mb-8 border-b border-neutral-300/60 pb-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
              {content.title}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          >
            {/* SOL TARAF: Portre Fotoğraf & İsim */}
            <div className="lg:col-span-4 space-y-6">
              <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-[#1A1A1A]">
                Burcu Dimili
              </h1>

              <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] bg-neutral-200 overflow-hidden shadow-sm">
                <img
                  src="/images/burcu.png"
                  alt="Burcu Dimili"
                  className="w-full h-full object-cover grayscale contrast-105 hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase pt-1 font-mono">
                PR & COMMUNICATIONS CONSULTANT
              </div>
            </div>

            {/* SAĞ TARAF: Hem Soldan Hem Sağdan Tam Hizalı (text-justify) İtalik Biyografi */}
            <div className="lg:col-span-8 space-y-6 lg:pt-12 text-base md:text-lg text-neutral-800 leading-relaxed font-normal">
              <div className="font-serif italic border-l border-neutral-800 pl-6 py-1 space-y-4 text-justify">
                <p>{content.p1}</p>
                <p>{content.p2}</p>
                <p>{content.p3}</p>
                <p>{content.p4}</p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <Footer />
      </footer>
    </div>
  );
}