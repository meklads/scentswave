"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/store";
import { t } from "@/lib/i18n";

export default function CollectionsPage() {
  const { locale } = useStore();
  const copy = t(locale);

  const tiles = [
    { href: "/category/men", title: copy.men, img: "/images/logo/bannet1.png" },
    { href: "/category/women", title: copy.women, img: "/images/logo/bannet2.png" },
    { href: "/category/picks", title: copy.picks, img: "/images/logo/bannet3.png" },
    { href: "/shop", title: copy.fragrances, img: "/images/logo/bannet1.png" },
  ];

  return (
    <div>
      <section className="wrap py-14 text-center md:py-20">
        <p className="kicker">{copy.houseOf}</p>
        <h1 className="serif mt-5">{copy.collections}</h1>
        <p className="mx-auto mt-5 max-w-xl text-[14px] leading-8 text-[var(--muted)]">{copy.collectionsBody}</p>
      </section>
      <div className="wrap grid grid-cols-2 gap-5 pb-20 md:grid-cols-4 md:gap-6">
        {tiles.map((tile) => (
          <Link key={tile.href} href={tile.href} className="group">
            <div className="relative aspect-[3/4] overflow-hidden bg-[var(--sand)]">
              <Image
                src={tile.img}
                alt={tile.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <h2 className="product-name mt-4 text-center">{tile.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
