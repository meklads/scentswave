import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "samples") {
    return {
      title: "مسافر وعينات",
      description: "عينات وديكانت وأحجام سفر لتجربة العطر على البشرة قبل اختيار الزجاجة الكاملة.",
    };
  }
  return {};
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
