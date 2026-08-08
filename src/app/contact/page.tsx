"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryModal from "@/components/GalleryModal";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const contactImages = [
  {
    url: "/images/contact/1 Burcu Dimili, YUNT.png",
    title: "BURCU DİMİLİ",
    subtitle: "YUNT",
    position: "object-center",
  },
  {
    url: "/images/contact/2 Burcu Dimili, Contemporary İstanbul Talks.png",
    title: "BURCU DİMİLİ",
    subtitle: "Contemporary İstanbul Talks",
    position: "object-center",
  },
  {
    url: "/images/contact/3 Burcu Dimili .png",
    title: "BURCU DİMİLİ",
    subtitle: "PR & Communications",
    position: "object-center",
  },
];

export default function ContactPage() {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 5 Saniyelik hızlı otomatik akış
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % contactImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? contactImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % contactImages.length);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col justify-between select-none">
      <div>
        <Header />

        <main className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
          <div className="mb-12 border-b border-neutral-300/60 pb-4">
            <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-500 uppercase">
              {lang === "TR" ? "İLETİŞİM" : "CONTACT"}
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* SOL TARAF: Üstte Açıklama, Altta Kibarlaştırılmış E-posta ve Canlı Linkler */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                {/* 1. Üstte Şık Editoryal Cümle */}
                <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-neutral-800 leading-relaxed border-l-2 border-neutral-800 pl-4">
                  {lang === "TR"
                    ? "Stratejik iletişim, PR & basın ilişkileri ve editoryal projeler için."
                    : "For strategic communication, PR & press relations, and editorial projects."}
                </p>

                {/* 2. Altta Kibarlaştırılmış E-posta */}
                <a
                  href="mailto:burcu@burcudimili.com"
                  className="font-serif text-xl sm:text-2xl md:text-3xl text-[#1A1A1A] hover:italic transition-all duration-300 block leading-tight pt-2"
                >
                  burcu@burcudimili.com
                </a>
              </div>

              {/* 3. Gerçek Profil Linkleri */}
              <div className="pt-6 border-t border-neutral-300/60">
                <div className="flex flex-wrap gap-8 text-xs md:text-sm tracking-widest uppercase font-medium text-neutral-800">
                  <a
                    href="https://instagram.com/burcudimili"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 hover:text-black group"
                  >
                    <span className="group-hover:underline underline-offset-4">INSTAGRAM</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/burcu-dimili-594a505b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 hover:text-black group"
                  >
                    <span className="group-hover:underline underline-offset-4">LINKEDIN</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-black transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* SAĞ TARAF: Büyütülmüş İletişim Slider'ı */}
            <div className="lg:col-span-7 flex flex-col items-center lg:items-end">
              <div className="w-full max-w-xl lg:max-w-2xl group">
                <div
                  onClick={() => setIsModalOpen(true)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  className="relative aspect-[3/2] w-full bg-neutral-200 overflow-hidden shadow-sm cursor-pointer"
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={currentIndex}
                      src={contactImages[currentIndex].url}
                      alt={contactImages[currentIndex].title}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={handleDragEnd}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className={`absolute inset-0 w-full h-full object-cover touch-pan-y ${contactImages[currentIndex].position}`}
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
                    {contactImages[currentIndex].title}
                  </span>
                  <span>{contactImages[currentIndex].subtitle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      <footer className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <Footer />
      </footer>

      <GalleryModal
        isOpen={isModalOpen}
        images={contactImages}
        currentIndex={currentIndex}
        onClose={() => setIsModalOpen(false)}
        onPrev={() =>
          setCurrentIndex((prev) => (prev === 0 ? contactImages.length - 1 : prev - 1))
        }
        onNext={() =>
          setCurrentIndex((prev) => (prev + 1) % contactImages.length)
        }
      />
    </div>
  );
}