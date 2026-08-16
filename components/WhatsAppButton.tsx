"use client";

import { WHATSAPP } from "@/lib/format";
import { useStore } from "@/components/store";

export function WhatsAppButton() {
  const { locale } = useStore();
  const text =
    locale === "ar"
      ? "مرحباً، أرغب بالاستفسار عن عطر من موجة عطر"
      : "Hello, I would like to ask about a fragrance from Scents Wave";
  const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 end-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-[var(--charcoal)] text-[var(--ivory)]"
      aria-label="WhatsApp"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 11.5A8.5 8.5 0 0 1 7.4 19.1L3.5 20.5l1.5-3.8A8.5 8.5 0 1 1 20 11.5zm-8.4 6.3c.5 0 1 0 1.4-.1A6.3 6.3 0 1 0 6.4 12c0 1.1.3 2.2.8 3.1l-.5 1.9 2-.5c.9.4 1.8.6 2.9.6zm3.5-4.6c-.2-.1-1.1-.5-1.3-.6s-.3-.1-.5.1-.5.6-.7.7-.3.2-.5.1a5.2 5.2 0 0 1-1.5-.9 5.7 5.7 0 0 1-1-1.3c-.1-.2 0-.3.1-.4l.3-.3.1-.2c0-.1 0-.3 0-.4s-.5-1.1-.6-1.5-.3-.3-.5-.3h-.4c-.2 0-.4.1-.6.3s-.7.7-.7 1.8.8 2.1.9 2.2a8.7 8.7 0 0 0 3.3 2.5c.5.2.8.3 1.1.2.3 0 1-.4 1.2-.8s.2-.7.2-.8 0-.2-.1-.2z" />
      </svg>
    </a>
  );
}
