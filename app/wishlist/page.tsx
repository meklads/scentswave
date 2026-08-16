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
    <div className="lux py-16 md:py-20">
      <p className="eyebrow mb-4">{copy.maison}</p>
      <h1 className="display mb-12 text-5xl">
        {copy.wishlist}
      </h1>
      {list.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-[var(--muted)]">{copy.emptyWishlist}</p>
          <Link href="/shop" className="mt-6 inline-block text-[var(--gold-dark)]">
            {copy.continueShopping}
          </Link>
        </div>
      ) : (
        <ProductGrid products={list} />
      )}
    </div>
  );
}
