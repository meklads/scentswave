"use client";

import Image from "next/image";
import { PointerEvent, useCallback, useEffect, useRef, useState } from "react";
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

const DURATION = 6000;

export function Hero() {
  const { locale } = useStore();
  const copy = t(locale);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setIndex((n) => (n + dir + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), DURATION);
    return () => window.clearInterval(id);
  }, [go, paused, index]);

  function onPointerDown(event: PointerEvent<HTMLElement>) {
    startX.current = event.clientX;
  }
  function onPointerUp(event: PointerEvent<HTMLElement>) {
    if (startX.current == null) return;
    const delta = event.clientX - startX.current;
    startX.current = null;
    if (Math.abs(delta) < 50) return;
    go(delta < 0 ? 1 : -1);
  }

  return (
    <section
      dir="ltr"
      className="mfk-hero group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div
        className="mfk-hero-track"
        style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
      >
        {SLIDES.map((item, i) => (
          <div key={item.src} className="mfk-hero-slide">
            <Image
              src={item.src}
              alt={locale === "ar" ? item.titleAr : item.titleEn}
              fill
              priority={i === 0}
              draggable={false}
              quality={100}
              className="object-cover object-center select-none"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        className="hero-arrow left-3 md:left-6"
        onClick={() => go(-1)}
        aria-label={copy.prev}
      >
        <Chevron dir="left" />
      </button>
      <button
        type="button"
        className="hero-arrow right-3 md:right-6"
        onClick={() => go(1)}
        aria-label={copy.next}
      >
        <Chevron dir="right" />
      </button>

      <div className="hero-progress">
        <span
          key={index}
          className={paused ? "is-paused" : ""}
          style={{ animationDuration: `${DURATION}ms` }}
        />
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="36" viewBox="0 0 20 36" fill="none" stroke="currentColor" strokeWidth="1.2">
      {dir === "left" ? <path d="M14 2 4 18l10 16" /> : <path d="M6 2l10 16L6 34" />}
    </svg>
  );
}
