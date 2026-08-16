"use client";

import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCarousel } from "@/components/ProductCarousel";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const men = products.filter((item) => item.gender === "men");
  const women = products.filter((item) => item.gender === "women");
  const featured = products.filter((item) => item.featured);
  const trending = products.slice(0, 12);

  const categories = [
    { href: "/shop", title: copy.fragrances, img: men[1]?.images[0] },
    { href: "/category/men", title: copy.men, img: men[0]?.images[0] },
    { href: "/category/women", title: copy.women, img: women[0]?.images[0] },
    { href: "/category/picks", title: copy.picks, img: featured[0]?.images[0] },
  ];

  const tiles = [
    { title: copy.tile1Title, body: copy.tile1Body, cta: copy.tile1Cta, href: "/house", img: "/images/logo/bannet1.png" },
    { title: copy.tile2Title, body: copy.tile2Body, cta: copy.tile2Cta, href: "/shipping", img: "/images/logo/bannet2.png" },
    { title: copy.tile3Title, body: copy.tile3Body, cta: copy.tile3Cta, href: "/category/picks", img: "/images/logo/bannet3.png" },
  ];

  const collections = featured.slice(0, 3);

  return (
    <div>
      <Hero />

      <ProductCarousel
        bar
        tabs={[
          { id: "fragrances", label: copy.fragrances, products: trending },
          { id: "bath", label: copy.bath, products: featured.concat(women).slice(0, 12) },
          { id: "trending", label: copy.trending, products: men.slice(0, 12) },
        ]}
      />

      <section className="wrap py-10 md:py-14">
        <h2 className="serif text-3xl md:text-4xl">{copy.shopByCategory}</h2>
        <p className="mt-3 max-w-xl text-sm text-[var(--muted)]">{copy.shopByCategoryBody}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {categories.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-[3/4] bg-[var(--paper)]">
                {item.img && (
                  <Image src={item.img} alt={item.title} fill className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]" />
                )}
              </div>
              <p className="serif mt-3 text-lg">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <p className="divider-label wrap py-6 serif text-2xl">{copy.picks}</p>

      <ProductCarousel
        tabs={[{ id: "signature", label: copy.picks, products: featured.concat(trending).slice(0, 12) }]}
      />

      <section className="wrap grid gap-8 py-10 md:grid-cols-3 md:py-14">
        {tiles.map((tile) => (
          <article key={tile.title}>
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper)]">
              <Image src={tile.img} alt="" fill className="object-cover" />
            </div>
            <h3 className="serif mt-5 text-2xl">{tile.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{tile.body}</p>
            <Link href={tile.href} className="u-link mt-4">
              {tile.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="wrap grid items-start gap-10 border-t border-[var(--line)] py-12 md:grid-cols-[280px_1fr] md:py-16">
        <div>
          <h2 className="serif text-3xl md:text-4xl">{copy.collections}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{copy.collectionsBody}</p>
          <Link href="/collections" className="u-link mt-5">
            {copy.discoverAll}
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {collections.map((item) => (
            <Link key={item.slug} href={`/product/${item.slug}`} className="group">
              <div className="relative aspect-square bg-[var(--paper)]">
                <Image src={item.images[0]} alt="" fill className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]" />
              </div>
              <h3 className="serif mt-3 text-xl">{locale === "ar" ? item.shortAr : item.shortEn}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {locale === "ar" ? item.descriptionAr : item.descriptionEn}
              </p>
              <span className="u-link mt-3">{copy.discover}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative h-[48vh] min-h-[340px] overflow-hidden bg-black">
        <Image
          src="/images/logo/bannet2.png"
          alt=""
          fill
          className="object-cover"
        />
      </section>
    </div>
  );
}
