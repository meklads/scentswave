"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo({
  height = 56,
  className = "",
  variant = "full",
}: {
  height?: number;
  className?: string;
  variant?: "full" | "mark";
}) {
  const src = variant === "mark" ? "/images/logo/sw-mark.png" : "/images/logo/sw-logo.png";
  const ratio = variant === "mark" ? 328 / 243 : 1;
  const width = Math.round(height * ratio);
  return (
    <Link href="/" className={`inline-flex ${className}`} aria-label="Scents Wave">
      <Image
        src={src}
        alt="Scents Wave — موجة عطر"
        width={width}
        height={height}
        priority
        className="h-auto w-auto object-contain"
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
