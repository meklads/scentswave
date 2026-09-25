"use client";

import Image from "next/image";
import Link from "next/link";

const VARIANTS = {
  original: { src: "/images/logo/sw-logo-original.png", nativeW: 1024, nativeH: 512 },
  full: { src: "/images/logo/sw-logo.png", nativeW: 1024, nativeH: 1024 },
  header: { src: "/images/logo/sw-logo-header.png", nativeW: 1600, nativeH: 879 },
  mark: { src: "/images/logo/sw-mark.png", nativeW: 328, nativeH: 243 },
} as const;

export function Logo({
  height = 56,
  className = "",
  variant = "original",
  crop = false,
}: {
  height?: number;
  className?: string;
  variant?: keyof typeof VARIANTS;
  crop?: boolean;
}) {
  const { src, nativeW, nativeH } = VARIANTS[variant];
  const width = Math.round(height * (nativeW / nativeH));

  if (crop) {
    const lockup = VARIANTS.original;
    return (
      <Link href="/" className={`header-brand ${className}`.trim()} aria-label="Scents Wave">
        <Image
          src={lockup.src}
          alt="Scents Wave — موجة عطر — Luxury Solid Perfume"
          width={lockup.nativeW}
          height={lockup.nativeH}
          priority
          quality={100}
          unoptimized
          sizes="220px"
          className="header-brand-img"
        />
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex shrink-0 ${className}`.trim()} aria-label="Scents Wave">
      <Image
        src={src}
        alt="Scents Wave — موجة عطر — Luxury Solid Perfume"
        width={width}
        height={height}
        priority
        quality={100}
        unoptimized
        className={`h-auto w-auto object-contain object-center ${variant === "full" ? "[mix-blend-mode:multiply]" : ""}`}
        style={{ height, width: "auto", maxWidth: "none" }}
      />
    </Link>
  );
}
