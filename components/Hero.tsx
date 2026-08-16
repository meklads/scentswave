"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

const SLIDES = [
  {
    src: "/images/campaign/hero-stone.jpg",
    titleAr: "كبسولة الحجر",
    titleEn: "Stone Capsule",
  },
  {
    src: "/images/campaign/hero-leather.jpg",
    titleAr: "كبسولة الجلد",
    titleEn: "Leather Capsule",
  },
  {
    src: "/images/campaign/stone-capsule-board.png",
    titleAr: "عطر يتحرك معك",
    titleEn: "A scent that moves with you",
  },
];

export function Hero() {
  const { locale } = useStore();
  const copy = t(locale);
  const [index, setIndex] = useState(0);
  const current = SLIDES[index] ?? SLIDES[0];
  const comingSoon = locale === "ar" ? "قريبا بالاسواق" : copy.comingSoon;

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((n) => (n + 1) % SLIDES.length);
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  function go(dir: number) {
    setIndex((n) => (n + dir + SLIDES.length) % SLIDES.length);
  }

  return (
    <section className="relative h-[70vh] min-h-[460px] max-h-[760px] overflow-hidden bg-black text-white">
      {SLIDES.map((item, i) => (
        <Image
          key={item.src}
          src={item.src}
          alt={locale === "ar" ? item.titleAr : item.titleEn}
          fill
          priority={i === 0}
          className={`object-cover object-center transition-opacity duration-700 ${i === index ? "opacity-100" : "opacity-0"}`}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/35" />

      <button type="button" className="hero-arrow absolute start-2 top-1/2 z-10 -translate-y-1/2 md:start-4" onClick={() => go(-1)} aria-label={copy.prev}>
        <Chevron dir={locale === "ar" ? "right" : "left"} />
      </button>
      <button type="button" className="hero-arrow absolute end-2 top-1/2 z-10 -translate-y-1/2 md:end-4" onClick={() => go(1)} aria-label={copy.next}>
        <Chevron dir={locale === "ar" ? "left" : "right"} />
      </button>

      <div className="relative flex h-full flex-col justify-between px-6 py-8 md:px-12 md:py-10">
        <div>
          <p className="serif text-[22px] leading-tight md:text-[28px]">Scents Wave</p>
          <p className="serif mt-1 text-[18px] md:text-[22px]">موجة عطر</p>
        </div>
        <div className="self-end text-end">
          <p className="text-[12px] tracking-[0.28em] uppercase text-[#e4d2a8]">{comingSoon}</p>
          <h1 className="serif mt-3 text-4xl italic md:text-6xl">
            {locale === "ar" ? current.titleAr : current.titleEn}
          </h1>
          <p className="mt-2 text-sm text-white/80">{copy.heroMove}</p>
          <Link href="/house" className="u-link mt-5 text-white">
            {copy.discoverCollection}
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <div className="hero-progress">
          <span style={{ width: `${((index + 1) / SLIDES.length) * 100}%` }} />
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
      {dir === "left" ? <path d="M15 5 8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
    </svg>
  );
}
