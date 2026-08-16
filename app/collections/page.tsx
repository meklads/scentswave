"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export default function CollectionsPage() {
  const { locale } = useStore();
  const copy = t(locale);
  const men = products.find((p) => p.gender === "men");
  const women = products.find((p) => p.gender === "women");
  const sign = products.find((p) => p.featured);

  const tiles = [
    { href: "/category/men", title: copy.men, img: men?.images[0] },
    { href: "/category/women", title: copy.women, img: women?.images[0] },
    { href: "/category/picks", title: copy.picks, img: sign?.images[0] },
    { href: "/shop", title: copy.fragrances, img: products[4]?.images[0] },
  ];

  return (
    <div>
      <section className="wrap py-10 md:py-14">
        <h1 className="serif text-4xl md:text-5xl">{copy.collections}</h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">{copy.collectionsBody}</p>
      </section>
      <div className="wrap grid grid-cols-2 gap-4 pb-16 md:grid-cols-4 md:gap-5">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group">
            <div className="relative aspect-[3/4] bg-[var(--paper)]">
              {tile.img && (
                <Image src={tile.img} alt={tile.title} fill className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.04]" />
              )}
            </div>
            <h2 className="serif mt-3 text-xl">{tile.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
