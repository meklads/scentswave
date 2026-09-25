"use client";

import Image from "next/image";
import Link from "next/link";

const VARIANTS = {
  original: { src: "/images/logo/sw-logo-original.png", nativeW: 1024, nativeH: 512 },
  full: { src: "/images/logo/sw-logo.png", nativeW: 1024, nativeH: 1024 },
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
    return (
      <Link href="/" className={`header-brand ${className}`.trim()} aria-label="Scents Wave">
        <Image
          src={src}
          alt="Scents Wave — موجة عطر — Luxury Solid Perfume"
          width={nativeW}
          height={nativeH}
          priority
          quality={100}
          unoptimized
          sizes="(max-width: 767px) 360px, 720px"
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
