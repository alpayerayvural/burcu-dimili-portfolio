"use client";

import { useState } from "react";
import Link from "next/link";
import { siteContent } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Globe } from "lucide-react";

interface HeaderProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const content = siteContent[lang];

  const handleLanguageToggle = () => {
    const nextLang = lang === "TR" ? "EN" : "TR";
    setLang(nextLang);

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (nextLang === "EN") {
        url.searchParams.set("lang", "EN");
      } else {
        url.searchParams.delete("lang");
      }
      window.history.pushState(null, "", url.pathname + url.search);
    }
  };

  const handleTabClick = (id: string, e: React.MouseEvent) => {
    if (setActiveTab) {
      e.preventDefault();
      setActiveTab(id);

      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (id === "home") {
          url.searchParams.delete("tab");
        } else {
          url.searchParams.set("tab", id);
        }
        window.history.pushState(null, "", url.pathname + url.search);
      }

      setIsOpen(false);
    }
  };

  const getTargetHref = (itemId: string) => {
    const isPageLink = itemId === "about" || itemId === "contact";
    const langQuery = lang === "EN" ? "lang=EN" : "";

    if (isPageLink) {
      return langQuery ? `/${itemId}?${langQuery}` : `/${itemId}`;
    }

    if (itemId === "home") {
      return langQuery ? `/?${langQuery}` : "/";
    }

    return langQuery ? `/?tab=${itemId}&${langQuery}` : `/?tab=${itemId}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F4F3EF]/90 backdrop-blur-md border-b border-neutral-300/60 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-3.5 md:py-4 md:px-12 flex justify-between items-center">
        {/* Brand / Logo (Doğal Genişlik, Tok Siyah Kontrast) */}
        <Link 
          href={getTargetHref("home")}
          onClick={() => {
            if (setActiveTab) {
              setActiveTab("home");
              if (typeof window !== "undefined") {
                const url = new URL(window.location.href);
                url.searchParams.delete("tab");
                window.history.pushState(null, "", url.pathname + url.search);
              }
            }
          }}
          className="group"
        >
          {/* tracking-wider ile harf arası sıklaştırıldı, text-black ve font-medium ile belirginleştirildi */}
          <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-wider text-black group-hover:opacity-75 transition-opacity leading-none">
            BURCU DİMİLİ
          </h1>
          <p className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-600 font-medium uppercase mt-1">
            PR & COMMUNICATIONS
          </p>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs tracking-widest uppercase text-neutral-700 font-medium">
          {content.nav.map((item) => {
            const isPageLink = item.id === "about" || item.id === "contact";
            const isActive = activeTab === item.id;

            return (
              <Link
                key={item.id}
                href={getTargetHref(item.id)}
                onClick={(e) => !isPageLink && handleTabClick(item.id, e)}
                className={`transition-colors relative py-1 uppercase tracking-widest ${
                  isActive
                    ? "text-black font-semibold after:w-full"
                    : "hover:text-black after:w-0 hover:after:w-full"
                } after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-black after:transition-all`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Language Switcher */}
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-1.5 px-3 py-1 border border-neutral-400 rounded-full hover:bg-[#1A1A1A] hover:text-[#F4F3EF] transition-all text-[11px] font-semibold tracking-wider ml-4 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "TR" ? "EN" : "TR"}</span>
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={handleLanguageToggle}
            className="flex items-center space-x-1 px-2.5 py-1 border border-neutral-400 rounded-full text-[10px] font-semibold tracking-wider"
          >
            <Globe className="w-3 h-3" />
            <span>{lang === "TR" ? "EN" : "TR"}</span>
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1 text-neutral-800 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <nav className="lg:hidden bg-[#F4F3EF] border-b border-neutral-300 px-6 py-6 flex flex-col space-y-4 text-xs tracking-widest uppercase font-medium border-t border-neutral-200">
          {content.nav.map((item) => {
            const isPageLink = item.id === "about" || item.id === "contact";

            return (
              <Link
                key={item.id}
                href={getTargetHref(item.id)}
                onClick={(e) => {
                  if (!isPageLink) handleTabClick(item.id, e);
                  setIsOpen(false);
                }}
                className="hover:text-black transition-colors py-1 text-neutral-800 uppercase tracking-widest"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}