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
      <section className="band band-stone">
        <div className="wrap py-16 text-center md:py-24">
          <p className="kicker">{copy.houseOf}</p>
          <Logo variant="full" height={120} className="mx-auto mt-8 justify-center" />
          <h1 className="serif mx-auto mt-10 max-w-3xl">{copy.philosophyTitle}</h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-8 text-[var(--muted)]">{copy.philosophyBody}</p>
        </div>
      </section>
      <section className="relative h-[56vh] min-h-[380px] bg-[var(--sand)]">
        <Image src="/images/logo/bannet1.png" alt="" fill className="object-cover" />
      </section>
      <section className="band band-olive">
        <div className="wrap grid gap-5 py-16 md:grid-cols-3 md:gap-6 md:py-24">
          {[copy.artTitle, copy.craftTitle, copy.packagingTitle].map((title, i) => (
            <div key={title} className="promise-card text-center">
              <h2 className="product-name">{title}</h2>
              <p className="mt-5 text-[14px] leading-8 text-[var(--muted)]">
                {[copy.artBody, copy.craftBody, copy.packagingBody][i]}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="band band-ink">
        <div className="wrap py-20 text-center md:py-24">
          <p className="kicker kicker-light">{copy.precious}</p>
          <p className="serif mx-auto mt-6 max-w-3xl">{copy.brandStatement}</p>
          <Link href="/shop" className="u-link u-link-light mt-10 inline-block">
            {copy.discoverCollection}
          </Link>
        </div>
      </section>
    </div>
  );
}
