import type { Metadata } from "next";
import { Cormorant_Garamond, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const sans = IBM_Plex_Sans_Arabic({
  variable: "--font-sans",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--ink)]">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
