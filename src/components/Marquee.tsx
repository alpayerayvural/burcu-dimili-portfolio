"use client";

import { PartnerItem } from "@/data/partners";

interface MarqueeRowProps {
  items: PartnerItem[];
  direction?: "left" | "right";
  speed?: number;
}

function MarqueeRow({ items, direction = "left", speed = 140 }: MarqueeRowProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee-row flex overflow-hidden select-none w-full py-4 cursor-pointer">
      <div
        className={`flex w-max items-center space-x-14 sm:space-x-20 shrink-0 ${
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
        }`}
        style={{
          animationDuration: `${speed}s`,
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        {duplicatedItems.map((partner, index) => (
          <div
            key={`${partner.id}-${index}`}
            className="flex items-center justify-center shrink-0 h-20 min-w-[120px] sm:min-w-[160px] px-3 opacity-85 hover:opacity-100 transition-opacity duration-300"
          >
            {partner.type === "image" ? (
              <img
                src={partner.logoUrl}
                alt={partner.name}
                loading="eager"
                /* Kocaman logolar: Yükseklik h-16/h-20, Genişlik 240px */
                className="max-h-16 sm:max-h-20 max-w-[200px] sm:max-w-[220px] w-auto h-auto object-contain filter grayscale contrast-200 brightness-90 hover:grayscale-0 transition-all duration-500"
                style={{
                  WebkitFilter: "grayscale(100%) contrast(220%)",
                  mixBlendMode: "multiply", // Beyaz kutuları kesin olarak yok eder
                  transform: "translateZ(0)",
                }}
              />
            ) : (
              <span className={`text-neutral-800 uppercase whitespace-nowrap text-center ${partner.style}`}>
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee({
  row1,
  row2,
}: {
  row1: PartnerItem[];
  row2: PartnerItem[];
}) {
  return (
    <div className="w-full overflow-hidden space-y-3 py-2">
      <MarqueeRow items={row1} direction="left" speed={140} />
      <MarqueeRow items={row2} direction="right" speed={160} />
    </div>
  );
}