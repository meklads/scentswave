"use client";

import Image from "next/image";
import Link from "next/link";

export function Logo({
  height = 56,
  className = "",
}: {
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * (938 / 499));
  return (
    <Link href="/" className={`inline-flex ${className}`} aria-label="Scents Wave">
      <Image
        src="/images/logo/sw-logo.png"
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
