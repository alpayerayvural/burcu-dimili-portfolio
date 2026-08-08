"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LegalModalProps {
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export default function LegalModal({ type, onClose }: LegalModalProps) {
  const { lang } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [type]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!type || !mounted) return null;

  // Burcu Dimili Portfolyosuna Özel Rafine Hukuki Metinler
  const legalContent = {
    privacy: {
      title: lang === "TR" ? "GİZLİLİK POLİTİKASI & KVKK" : "PRIVACY POLICY",
      content:
        lang === "TR" ? (
          <div className="space-y-4 text-xs md:text-sm leading-relaxed text-neutral-700 font-normal">
            <p>
              Burcu Dimili PR & Communications ("Biz"), ziyaretçilerimizin kişisel verilerinin gizliliğine ve korunmasına önem vermektedir.
            </p>
            <p>
              Bu web sitesi, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla yalnızca temel çerezleri (cookies) kullanmaktadır. Sitemiz üzerinden doğrudan bir kişisel veri tabanı oluşturulmamakta, üçüncü taraflarla reklam veya pazarlama amacıyla veri paylaşımı yapılmamaktadır.
            </p>
            <p>
              E-posta veya iletişim kanalları üzerinden bizimle paylaştığınız kişisel bilgileriniz (ad, soyad, e-posta adresi), yalnızca taleplerinize yanıt vermek ve profesyonel iletişim yürütmek amacıyla KVKK ve ilgili mevzuata uygun olarak saklanır.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs md:text-sm leading-relaxed text-neutral-700 font-normal">
            <p>
              Burcu Dimili PR & Communications ("We") values the privacy and protection of our visitors' personal data.
            </p>
            <p>
              This website uses only essential cookies to enhance user experience and analyze website traffic. We do not maintain an active user database or share data with third parties for commercial or marketing purposes.
            </p>
            <p>
              Any personal information provided via email inquiries will be strictly used to respond to your requests and conduct professional communications in accordance with applicable privacy regulations.
            </p>
          </div>
        ),
    },
    terms: {
      title: lang === "TR" ? "KULLANIM ŞARTLARI & TELİF" : "TERMS OF USE",
      content:
        lang === "TR" ? (
          <div className="space-y-4 text-xs md:text-sm leading-relaxed text-neutral-700 font-normal">
            <p>
              Bu web sitesinde yer alan tüm görseller, metinler, projeler, logo ve editoryal içerikler Burcu Dimili ve iş birliği yapılan ilgili kurum/sanatçıların fikri mülkiyetindedir.
            </p>
            <p>
              Sitede sergilenen sanat eserlerine ve sergilere ait fotoğraflar yalnızca bilgilendirme ve portfolyo sunumu amacıyla yayınlanmaktadır. Written izin alınmaksızın bu içeriklerin kopyalanması, çoğaltılması veya ticari amaçlarla kullanılması yasaktır.
            </p>
            <p>
              Sitede yer alan üçüncü taraf web sitelerine ait dış bağlantıların içeriklerinden ve gizlilik politikalarından Burcu Dimili sorumlu tutulamaz.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs md:text-sm leading-relaxed text-neutral-700 font-normal">
            <p>
              All imagery, text, projects, logos, and editorial materials featured on this website are the intellectual property of Burcu Dimili and respective client organizations/artists.
            </p>
            <p>
              Photographs of artworks and exhibitions are displayed solely for informational and portfolio presentation purposes. Unauthorized reproduction, distribution, or commercial use of any content is strictly prohibited without prior written consent.
            </p>
          </div>
        ),
    },
  };

  const activeData = legalContent[type];

  return createPortal(
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-xl max-h-[80vh] bg-[#F4F3EF] border border-neutral-300 shadow-2xl p-6 md:p-10 flex flex-col justify-between overflow-hidden rounded-sm"
          >
            {/* Kapat Butonu */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-neutral-500 hover:text-black transition-colors"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Başlık */}
            <div className="mb-6 pb-4 border-b border-neutral-300/80">
              <span className="text-[10px] tracking-[0.25em] font-semibold text-neutral-400 uppercase block mb-1">
                LEGAL & COMPLIANCE
              </span>
              <h2 className="font-serif text-2xl text-[#1A1A1A]">
                {activeData.title}
              </h2>
            </div>

            {/* Scroll edilebilir Metin İçeriği */}
            <div className="overflow-y-auto pr-2 custom-scrollbar flex-1">
              {activeData.content}
            </div>

            {/* Alt Bilgi */}
            <div className="mt-8 pt-4 border-t border-neutral-300/60 flex justify-between items-center text-[10px] tracking-widest text-neutral-400 uppercase">
              <span>BURCU DİMİLİ</span>
              <span>{new Date().getFullYear()}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}