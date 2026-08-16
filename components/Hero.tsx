"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

const SLIDES = [
  {
    src: "/images/logo/baner1.png",
    titleAr: "فخامة وعطر لا يقاوم",
    titleEn: "An irresistible scent",
  },
  {
    src: "/images/logo/baner2.png",
    titleAr: "قريبا بالاسواق",
    titleEn: "Coming soon",
  },
  {
    src: "/images/logo/baner3.png",
    titleAr: "عطر يلامس أنوثتك",
    titleEn: "A scent that moves with you",
  },
];

export function Hero() {
  const { locale } = useStore();
  const copy = t(locale);
  const [index, setIndex] = useState(0);

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
    <section className="relative h-[72vh] min-h-[480px] max-h-[820px] overflow-hidden bg-black text-white">
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

      <button
        type="button"
        className="hero-arrow absolute start-2 top-1/2 z-10 -translate-y-1/2 md:start-5"
        onClick={() => go(-1)}
        aria-label={copy.prev}
      >
        <Chevron dir={locale === "ar" ? "right" : "left"} />
      </button>
      <button
        type="button"
        className="hero-arrow absolute end-2 top-1/2 z-10 -translate-y-1/2 md:end-5"
        onClick={() => go(1)}
        aria-label={copy.next}
      >
        <Chevron dir={locale === "ar" ? "left" : "right"} />
      </button>

      <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-4">
        <Link href="/house" className="u-link text-white">
          {copy.discoverCollection}
        </Link>
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
