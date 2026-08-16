"use client";

import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function HousePage() {
  const { locale } = useStore();
  const copy = t(locale);

  return (
    <div>
      <section className="shell py-28 text-center">
        <Logo height={120} className="justify-center" />
        <h1 className="serif mx-auto mt-14 max-w-3xl text-5xl md:text-7xl">{copy.philosophyTitle}</h1>
        <p className="mx-auto mt-8 max-w-xl font-light leading-9 text-[var(--muted)]">
          {copy.philosophyBody}
        </p>
      </section>
      <section className="relative min-h-[70vh] bg-[var(--cream)]">
        <Image
          src="/images/products/full-Chanel-Bleu-De-For.jpg"
          alt=""
          fill
          className="object-contain p-16"
        />
      </section>
      <section className="shell grid gap-20 py-28 md:grid-cols-3">
        {[copy.artTitle, copy.craftTitle, copy.packagingTitle].map((title, i) => (
          <div key={title}>
            <p className="caps">0{i + 1}</p>
            <h2 className="serif mt-4 text-3xl">{title}</h2>
            <p className="mt-5 font-light leading-8 text-[var(--muted)]">
              {[copy.artBody, copy.craftBody, copy.packagingBody][i]}
            </p>
          </div>
        ))}
      </section>
      <section className="bg-[var(--cream)] py-32 text-center">
        <p className="serif mx-auto max-w-2xl text-4xl italic md:text-5xl">{copy.brandStatement}</p>
        <Link href="/shop" className="cta cta-solid mt-12 inline-flex">
          {copy.finalCta}
        </Link>
      </section>
    </div>
  );
}
