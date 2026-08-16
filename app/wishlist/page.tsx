"use client";

import Link from "next/link";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import { t } from "@/lib/i18n";

export default function WishlistPage() {
  const { locale, wishlist } = useStore();
  const copy = t(locale);
  const list = products.filter((item) => wishlist.includes(item.slug));

  return (
    <div className="wrap py-12 md:py-16">
      <p className="caps">{copy.maison}</p>
      <h1 className="serif mt-5 mb-16 text-5xl md:text-6xl">{copy.wishlist}</h1>
      {list.length === 0 ? (
        <div className="py-16">
          <p className="text-[var(--muted)]">{copy.emptyWishlist}</p>
          <Link href="/shop" className="cta cta-ghost mt-8 inline-flex">
            {copy.continueShopping}
          </Link>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
