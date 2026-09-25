import type { Metadata } from "next";
import { SetsView } from "@/components/SetsView";

export const metadata: Metadata = {
  title: "مجموعات الاكتشاف",
  description: "مجموعات عينات مختارة من موجة عطر لتجربة العطر قبل الزجاجة الكاملة.",
};

export default function SetsPage() {
  return <SetsView />;
}
