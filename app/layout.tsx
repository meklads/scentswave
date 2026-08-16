import type { Metadata } from "next";
import { Cairo, Cormorant_Garamond } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "موجة عطر | Scents Wave",
    template: "%s | Scents Wave",
  },
  description:
    "متجر موجة عطر للعطور الأصلية — رجالي ونسائي من دور العطور العالمية، شحن داخل السعودية، مدى والدفع عند الاستلام.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--cream)] text-[var(--ink)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
