"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LegalModal from "@/components/LegalModal";

export default function Footer() {
  const { lang } = useLanguage();
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  return (
    <>
      <footer className="py-8 border-t border-neutral-300/60 mt-16 text-[10px] md:text-[11px] tracking-widest text-neutral-500 uppercase">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {/* Sol Taraf: Telif Bilgisi */}
          <div>
            © {new Date().getFullYear()} BURCU DİMİLİ. {lang === "TR" ? "TÜM HAKLARI SAKLIDIR." : "ALL RIGHTS RESERVED."}
          </div>

          {/* Sağ Taraf: Yüzen Modalları Tetikleyen Linkler */}
          <div className="flex items-center space-x-3 text-neutral-600 font-medium">
            <Link href="/contact" className="hover:text-black transition-colors">
              {lang === "TR" ? "İLETİŞİM" : "CONTACT"}
            </Link>
            <span className="text-neutral-300">/</span>
            <button
              onClick={() => setModalType("privacy")}
              className="hover:text-black transition-colors cursor-pointer uppercase"
            >
              {lang === "TR" ? "GİZLİLİK POLİTİKASI" : "PRIVACY POLICY"}
            </button>
            <span className="text-neutral-300">/</span>
            <button
              onClick={() => setModalType("terms")}
              className="hover:text-black transition-colors cursor-pointer uppercase"
            >
              {lang === "TR" ? "KULLANIM ŞARTLARI" : "TERMS OF USE"}
            </button>
          </div>
        </div>
      </footer>

      {/* Yüzen Şeffaf Hukuk Modali */}
      <LegalModal type={modalType} onClose={() => setModalType(null)} />
    </>
  );
}