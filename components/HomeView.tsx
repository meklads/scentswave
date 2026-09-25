"use client";

import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProductCarousel } from "@/components/ProductCarousel";
import { SectionHead } from "@/components/SectionHead";
import { useStore } from "@/components/store";
import { giftProducts, products, saleProducts, travelProducts } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export function HomeView() {
  const { locale } = useStore();
  const copy = t(locale);
  const men = products.filter((item) => item.gender === "men");
  const women = products.filter((item) => item.gender === "women");
  const featured = products.filter((item) => item.featured);
  const newest = [...products].slice(-12).reverse();
  const trending = products.slice(0, 12);
  const offers = saleProducts(12);
  const samples = travelProducts(12);
  const gifts = giftProducts(12);

  const categories = [
    { href: "/shop", title: copy.fragrances, img: men[1]?.images[0] },
    { href: "/category/men", title: copy.men, img: men[0]?.images[0] },
    { href: "/category/women", title: copy.women, img: women[0]?.images[0] },
    { href: "/category/picks", title: copy.gifts, img: featured[0]?.images[0] },
  ];

  return (
    <div>
      <Hero />

      <ProductCarousel
        tone="blush"
        title={copy.offers}
        href="/category/offers"
        tabs={[{ id: "offers", label: copy.offers, products: offers }]}
      />

      <ProductCarousel
        tone="paper"
        title={copy.newLaunches}
        href="/shop"
        tabs={[{ id: "new", label: copy.newLaunches, products: newest }]}
      />

      <ProductCarousel
        bar
        tone="mist"
        href="/shop"
        tabs={[
          { id: "fragrances", label: copy.fragrances, products: trending },
          { id: "men", label: copy.menEdit, products: men.slice(0, 12) },
          { id: "women", label: copy.womenEdit, products: women.slice(0, 12) },
        ]}
      />

      <ProductCarousel
        tone="sand"
        title={copy.samples}
        href="/category/samples"
        tabs={[{ id: "samples", label: copy.samples, products: samples }]}
      />

      <ProductCarousel
        tone="dusk"
        title={copy.gifts}
        href="/category/picks"
        tabs={[{ id: "gifts", label: copy.gifts, products: gifts }]}
      />

      <section className="band band-stone">
        <div className="wrap py-16 md:py-20">
          <SectionHead kicker={copy.houseOf} title={copy.shopByCategory} href="/shop" action={copy.shopNow} />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-7">
            {categories.map((item) => (
              <Link key={item.href} href={item.href} className="group category-tile text-center">
                <div className="product-shot relative aspect-square">
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  )}
                </div>
                <p className="product-name mt-4">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ProductCarousel
        tone="cream"
        title={copy.bestSellers}
        href="/category/picks"
        tabs={[{ id: "best", label: copy.bestSellers, products: featured.concat(trending).slice(0, 12) }]}
      />

      <section className="band band-ink">
        <div className="wrap py-20 text-center md:py-28">
          <p className="kicker kicker-light">{copy.houseOf}</p>
          <h2 className="serif mx-auto mt-5 max-w-3xl">{copy.precious}</h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-8 text-[var(--on-black-soft)]">{copy.founding}</p>
          <Link href="/house" className="u-link u-link-light mt-8 inline-block">
            {copy.discover}
          </Link>
        </div>
      </section>

      <section className="band band-olive">
        <div className="wrap grid gap-5 py-14 md:grid-cols-3 md:gap-6 md:py-20">
          {[
            { title: copy.tile1Title, body: copy.tile1Body, cta: copy.tile1Cta, href: "/house" },
            { title: copy.tile2Title, body: copy.tile2Body, cta: copy.tile2Cta, href: "/shipping" },
            { title: copy.tile3Title, body: copy.tile3Body, cta: copy.tile3Cta, href: "/category/picks" },
          ].map((tile) => (
            <article key={tile.title} className="promise-card">
              <h3 className="product-name">{tile.title}</h3>
              <p className="mt-4 text-[14px] leading-8 text-[var(--muted)]">{tile.body}</p>
              <Link href={tile.href} className="u-link mt-5 inline-block">
                {tile.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
