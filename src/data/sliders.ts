export interface SliderItem {
    url: string;
    title: string;
    subtitle: string;
  }
  
  export type PageSliderType = "home" | "approach" | "collaborations" | "press" | "editorial";
  
  export const pageSliders: Record<PageSliderType, SliderItem[]> = {
    // 1. ANASAYFA (4'lü)
    home: [
      {
        url: "/images/hero/Anasayfa1 - Vuslat, Emanet, Tophane-i Amire.jpg",
        title: "VUSLAT",
        subtitle: "Emanet, Tophane-i Amire",
      },
      {
        url: "/images/hero/Anasayfa2 - Barbare Studio, Yer Duygusu.jpg",
        title: "BARBARE STUDIO",
        subtitle: "Yer Duygusu",
      },
      {
        url: "/images/hero/Anasayfa3 - Melek Zeynep Bulut, Duo.jpg",
        title: "MELEK ZEYNEP BULUT",
        subtitle: "Duo",
      },
      {
        url: "/images/hero/Anasayfa4 - Pavilion of the Moment, Waugh Thistleton Architects, Photo Mark Cocksedge.JPG",
        title: "PAVILION OF THE MOMENT",
        subtitle: "Waugh Thistleton Architects",
      },
    ],
  
    // 2. YAKLAŞIM SAYFASI (4'lü)
    approach: [
      {
        url: "/images/hero/Yaklaşım1 - Wall_Tribune_Gate_Ali Derya Dostoğlu & Uğur Özer_Photo, Mark Cocksedge.JPEG",
        title: "WALL, TRIBUNE, GATE",
        subtitle: "Ali Derya Dostoğlu & Uğur Özer",
      },
      {
        url: "/images/hero/Yaklaşım2 - Melek Zeynep Bulut, OpenMonuments.JPG",
        title: "MELEK ZEYNEP BULUT",
        subtitle: "OpenMonuments",
      },
      {
        url: "/images/hero/Yaklaşım3 - Bihter Yasemin Adalı, Haz ile Göklenir Dünya.jpg",
        title: "BİHTER YASEMİN ADALI",
        subtitle: "Haz ile Göklenir Dünya",
      },
      {
        url: "/images/hero/Yaklaşım4 - Hara, Canavarların Vaatleri.jpg",
        title: "HARA",
        subtitle: "Canavarların Vaatleri",
      },
    ],
  
    // 3. İŞ BİRLİKLERİ SAYFASI (4'lü)
    collaborations: [
      {
        url: "/images/hero/İş Birlikleri1 - The Red Room, designed by NUN Architecture and People Places Ideas_Photo_ Mark Cocksedge.JPEG",
        title: "THE RED ROOM",
        subtitle: "NUN Architecture",
      },
      {
        url: "/images/hero/İş Birlikleri2 - İMALAT-HANE, Antonio Cosentino.jpg",
        title: "İMALAT-HANE",
        subtitle: "Antonio Cosentino",
      },
      {
        url: "/images/hero/İş Birlikleri3 - All Things Become Islands Before My Senses, Perasma.jpg",
        title: "PERASMA",
        subtitle: "All Things Become Islands Before My Senses",
      },
      {
        url: "/images/hero/İş Birlikleri4 - YUNT, VarYok.jpg",
        title: "YUNT",
        subtitle: "VarYok",
      },
    ],
  
    // 4. BASIN SAYFASI (4'lü)
    press: [
      {
        url: "/images/hero/Basın1 - Mercado, Original By Nature.jpg",
        title: "MERCADO",
        subtitle: "Original By Nature",
      },
      {
        url: "/images/hero/Basın2 - Aslı Çavuşoğlu, TunState.jpg",
        title: "ASLI ÇAVUŞOĞLU",
        subtitle: "TunState",
      },
      {
        url: "/images/hero/Basın3 - Vuslat, Emanet.JPG",
        title: "VUSLAT",
        subtitle: "Emanet",
      },
      {
        url: "/images/hero/Basın4 - Autoban, Akbank.jpg",
        title: "AUTOBAN",
        subtitle: "Akbank",
      },
    ],
  
    // 5. EDİTORYAL SAYFASI (4'lü)
    editorial: [
      {
        url: "/images/hero/Editorial1 - Maya, Bor Sanat.jpg",
        title: "BOR SANAT",
        subtitle: "Maya",
      },
      {
        url: "/images/hero/Editorial2 - Kerim Suner, bomontiada.jpeg",
        title: "KERİM SUNER",
        subtitle: "bomontiada",
      },
      {
        url: "/images/hero/Editorial3 - Against Transparency, Shiva Zahed Gallery.jpg",
        title: "SHIVA ZAHED GALLERY",
        subtitle: "Against Transparency",
      },
      {
        url: "/images/hero/Editorial4 - Selçuk Artut, Terakki Sanat Galerisi.jpg",
        title: "TERAKKİ SANAT GALERİSİ",
        subtitle: "Selçuk Artut",
      },
    ],
  };
  // Tüm sekmelerdeki fotoğrafları tek bir büyük sergi listesinde birleştiriyoruz
export const allSliderImages = [
    ...pageSliders.home,
    ...pageSliders.approach,
    ...pageSliders.collaborations,
    ...pageSliders.press,
    ...pageSliders.editorial,
  ];