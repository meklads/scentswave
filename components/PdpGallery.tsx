"use client";

import Image from "next/image";
import { useState } from "react";

export function PdpGallery({ images, alt }: { images: string[]; alt: string }) {
  const list = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const current = list[active] || list[0];

  if (!current) return null;

  return (
    <div className={`pdp-visual${list.length > 1 ? " has-thumbs" : ""}`}>
      {list.length > 1 && (
        <div className="pdp-thumbs">
          {list.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              className={`pdp-thumb${index === active ? " is-on" : ""}`}
              onClick={() => setActive(index)}
              aria-label={`${index + 1}`}
            >
              <span className="product-shot relative block h-full w-full">
                <Image src={src} alt="" fill className="object-contain p-1.5" sizes="72px" />
              </span>
            </button>
          ))}
        </div>
      )}
      <div className="pdp-stage product-shot">
        <Image
          src={current}
          alt={alt}
          fill
          className="object-contain p-6 md:p-10"
          sizes="(max-width: 1024px) 100vw, 52vw"
          priority
        />
      </div>
    </div>
  );
}
