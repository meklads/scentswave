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

      <section className="wrap py-16 md:py-24">
        <p className="kicker">{copy.maison}</p>
        <h2 className="serif mt-3">{copy.shopByCategory}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-8 text-[var(--muted)]">{copy.shopByCategoryBody}</p>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
          {categories.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-[var(--paper)]">
                {item.img && (
                  <Image src={item.img} alt={item.title} fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                )}
              </div>
              <p className="mt-4 text-[16px] font-medium">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>

      <p className="divider-label wrap py-4 serif">{copy.picks}</p>

      <ProductCarousel
        tabs={[{ id: "signature", label: copy.picks, products: featured.concat(trending).slice(0, 12) }]}
      />

      <section className="wrap grid gap-10 py-16 md:grid-cols-3 md:py-24">
        {tiles.map((tile) => (
          <article key={tile.title} className="group">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper)]">
              <Image src={tile.img} alt="" fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
            </div>
            <h3 className="mt-6 text-[20px] font-medium leading-snug">{tile.title}</h3>
            <p className="mt-3 text-[15px] leading-8 text-[var(--muted)]">{tile.body}</p>
            <Link href={tile.href} className="u-link mt-5">
              {tile.cta}
            </Link>
          </article>
        ))}
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="wrap grid items-start gap-12 py-16 md:grid-cols-[320px_1fr] md:py-24">
          <div>
            <p className="kicker">{copy.maison}</p>
            <h2 className="serif mt-3">{copy.collections}</h2>
            <p className="mt-5 text-[15px] leading-8 text-[var(--muted)]">{copy.collectionsBody}</p>
            <Link href="/collections" className="u-link mt-6">
              {copy.discoverAll}
            </Link>
          </div>
          <div className="grid gap-7 sm:grid-cols-3">
            {collections.map((item) => (
              <Link key={item.slug} href={`/product/${item.slug}`} className="group">
                <div className="relative aspect-square overflow-hidden bg-[var(--paper)]">
                  <Image src={item.images[0]} alt="" fill className="object-contain p-10 transition-transform duration-700 group-hover:scale-[1.05]" />
                </div>
                <h3 className="mt-4 text-[16px] font-medium">{locale === "ar" ? item.shortAr : item.shortEn}</h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-7 text-[var(--muted)]">
                  {locale === "ar" ? item.descriptionAr : item.descriptionEn}
                </p>
                <span className="u-link mt-4">{copy.discover}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[58vh] min-h-[420px] overflow-hidden bg-black">
        <Image
          src="/images/logo/bannet2.png"
          alt=""
          fill
          className="object-cover"
          quality={100}
        />
      </section>
    </div>
  );
}
