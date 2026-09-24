"use client";

import Image from "next/image";
import Link from "next/link";

const VARIANTS = {
  original: { src: "/images/logo/sw-logo-original.png", ratio: 1024 / 512 },
  full: { src: "/images/logo/sw-logo.png", ratio: 1 },
  mark: { src: "/images/logo/sw-mark.png", ratio: 328 / 243 },
} as const;

export function Logo({
  height = 56,
  className = "",
  variant = "original",
}: {
  height?: number;
  className?: string;
  variant?: keyof typeof VARIANTS;
}) {
  const { src, ratio } = VARIANTS[variant];
  const width = Math.round(height * ratio);
  return (
    <Link href="/" className={`inline-flex shrink-0 ${className}`.trim()} aria-label="Scents Wave">
      <Image
        src={src}
        alt="Scents Wave — موجة عطر — Luxury Solid Perfume"
        width={width}
        height={height}
        priority
        quality={100}
        className="h-auto w-auto object-contain object-left"
        style={{ height, width: "auto", maxWidth: "none" }}
      />
    </Link>
  );
}
