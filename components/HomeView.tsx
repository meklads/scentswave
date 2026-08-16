"use client";

import Image from "next/image";
import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const signature = products.filter((item) => item.featured).slice(0, 3);
  const best = products.slice(0, 6);
  const men = products.find((item) => item.gender === "men");
  const women = products.find((item) => item.gender === "women");

  return (
    <div>
      <section className="grid min-h-[92vh] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex flex-col justify-end px-6 py-16 md:px-12 lg:px-16 lg:py-24">
          <p className="caps rise">{copy.heroEyebrow}</p>
          <h1 className="serif rise rise-2 mt-8 max-w-xl text-5xl md:text-7xl lg:text-[92px]">
            {copy.heroLine}
          </h1>
          <p className="rise rise-3 mt-8 max-w-sm font-light leading-8 text-[var(--muted)]">
            {copy.heroBody}
          </p>
          <div className="rise rise-3 mt-12 flex flex-wrap items-center gap-8">
            <Link href="/shop" className="cta cta-solid">
              {copy.heroCta}
            </Link>
            <Link href="/house" className="cta cta-ghost">
              {copy.heroCta2}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[70vh] overflow-hidden bg-[var(--cream)] lg:min-h-[92vh]">
          <Image
            src="/images/products/full-Dior-Sauvage-Eau-de-Parfum.jpg"
            alt="Scents Wave"
            fill
            priority
            className="object-contain p-[12%] md:p-[14%]"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </section>

      <section className="shell py-28 md:py-36">
        <p className="caps">{copy.signature}</p>
        <h2 className="serif mt-5 max-w-2xl text-4xl md:text-6xl">{copy.featured}</h2>
        <div className="mt-20">
          <ProductGrid products={signature} />
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--porcelain)]">
        <div className="shell grid gap-16 py-28 md:py-36 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="caps">{copy.house}</p>
            <h2 className="serif mt-6 max-w-xl text-4xl md:text-6xl">{copy.philosophyTitle}</h2>
          </div>
          <p className="max-w-lg text-[17px] font-light leading-9 text-[var(--muted)]">
            {copy.philosophyBody}
          </p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <Link href="/category/men" className="group relative min-h-[78vh] overflow-hidden bg-[var(--cream)]">
          {men && (
            <Image src={men.images[0]} alt={copy.men} fill className="img-ken object-contain p-16 md:p-24" />
          )}
          <div className="absolute inset-x-0 bottom-0 p-10 md:p-14">
            <p className="caps">{copy.artTitle}</p>
            <h3 className="serif mt-3 text-4xl md:text-5xl">{copy.men}</h3>
          </div>
        </Link>
        <Link href="/category/women" className="group relative min-h-[78vh] overflow-hidden bg-[var(--sand)]">
          {women && (
            <Image src={women.images[0]} alt={copy.women} fill className="img-ken object-contain p-16 md:p-24" />
          )}
          <div className="absolute inset-x-0 bottom-0 p-10 md:p-14">
            <p className="caps">{copy.artTitle}</p>
            <h3 className="serif mt-3 text-4xl md:text-5xl">{copy.women}</h3>
          </div>
        </Link>
      </section>

      <section className="shell py-28 md:py-36">
        <p className="caps">{copy.featured}</p>
        <h2 className="serif mt-5 text-4xl md:text-5xl">{copy.picks}</h2>
        <div className="mt-20">
          <ProductGrid products={best} />
        </div>
      </section>

      <section className="grid items-stretch lg:grid-cols-2">
        <div className="relative min-h-[70vh] bg-[var(--cream)]">
          <Image
            src="/images/products/full-Tom-Ford-Ombre-Leather.jpg"
            alt=""
            fill
            className="object-contain p-16 md:p-24"
          />
        </div>
        <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-20">
          <p className="caps">{copy.journal}</p>
          <h2 className="serif mt-6 max-w-md text-4xl md:text-5xl">{copy.artTitle}</h2>
          <p className="mt-7 max-w-md text-[17px] font-light leading-9 text-[var(--muted)]">
            {copy.artBody}
          </p>
          <Link href="/journal" className="cta cta-ghost mt-10 self-start">
            {copy.journal}
          </Link>
        </div>
      </section>

      <section className="border-y border-[var(--line)]">
        <div className="shell grid gap-16 py-28 md:grid-cols-3 md:py-36">
          {[
            [copy.craftTitle, copy.craftBody],
            [copy.authenticity, copy.philosophyBody],
            [copy.packagingTitle, copy.packagingBody],
          ].map(([title, body]) => (
            <div key={title}>
              <h3 className="serif text-3xl md:text-4xl">{title}</h3>
              <p className="mt-6 text-[15px] font-light leading-8 text-[var(--muted)]">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-28 md:py-36">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="caps">{copy.shop}</p>
            <h2 className="serif mt-5 text-4xl md:text-5xl">{copy.viewAll}</h2>
          </div>
          <Link href="/shop" className="cta cta-ghost hidden sm:inline-flex">
            {copy.viewAll}
          </Link>
        </div>
        <div className="mt-20">
          <ProductGrid products={products.slice(8, 14)} />
        </div>
      </section>

      <section className="bg-[var(--cream)]">
        <div className="shell grid items-center gap-16 py-28 lg:grid-cols-2 lg:py-36">
          <div className="relative min-h-[52vh] bg-[var(--sand)]">
            <Image
              src="/images/products/full-La-vie-est-belle-LANCOME.jpg"
              alt=""
              fill
              className="object-contain p-16"
            />
          </div>
          <div className="max-w-md">
            <p className="caps">{copy.packagingTitle}</p>
            <h2 className="serif mt-6 text-4xl md:text-5xl">{copy.packagingBody}</h2>
          </div>
        </div>
      </section>

      <section className="py-32 text-center md:py-40">
        <p className="serif mx-auto max-w-3xl px-6 text-4xl italic md:text-6xl">
          {copy.brandStatement}
        </p>
      </section>

      <section className="shell flex flex-col items-center pb-32 text-center">
        <h2 className="serif text-4xl md:text-5xl">{copy.heroLine}</h2>
        <Link href="/shop" className="cta cta-solid mt-12">
          {copy.finalCta}
        </Link>
      </section>
    </div>
  );
}
