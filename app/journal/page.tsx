"use client";

import Image from "next/image";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function JournalPage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <article>
      <section className="shell py-24">
        <p className="caps">{copy.journal}</p>
        <h1 className="serif mt-5 max-w-3xl text-5xl md:text-7xl">{copy.artTitle}</h1>
      </section>
      <div className="relative min-h-[70vh] bg-[var(--cream)]">
        <Image
          src="/images/products/full-La-vie-est-belle-LANCOME.jpg"
          alt=""
          fill
          className="object-contain p-16"
        />
      </div>
      <div className="shell max-w-2xl py-24">
        <p className="font-light leading-9 text-[17px] text-[var(--muted)]">{copy.philosophyBody}</p>
        <p className="mt-8 font-light leading-9 text-[17px] text-[var(--muted)]">{copy.artBody}</p>
        <p className="serif mt-16 text-3xl italic">{copy.brandStatement}</p>
      </div>
    </article>
  );
}
