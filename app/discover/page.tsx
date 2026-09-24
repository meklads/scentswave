"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "@/components/ProductCard";
import { useStore } from "@/components/store";
import { products } from "@/lib/catalog";
import type { Family, Mood, Occasion } from "@/lib/fragrance";
import { labelFamily, labelMood, labelOccasion, profile } from "@/lib/fragrance";
import { t } from "@/lib/i18n";

const FAMILIES: Family[] = ["woody", "floral", "oriental", "fresh", "leather"];
const MOODS: Mood[] = ["intimate", "radiant", "nocturnal", "clean"];
const OCCASIONS: Occasion[] = ["day", "evening", "ceremony"];

type Edit = "all" | "signature" | "bestsellers";

export default function DiscoverPage() {
  const { locale } = useStore();
  const copy = t(locale);
  const [family, setFamily] = useState<Family | "all">("all");
  const [mood, setMood] = useState<Mood | "all">("all");
  const [occasion, setOccasion] = useState<Occasion | "all">("all");
  const [edit, setEdit] = useState<Edit>("all");

  const list = useMemo(() => {
    return products.filter((item) => {
      const p = profile(item);
      if (family !== "all" && p.family !== family) return false;
      if (mood !== "all" && p.mood !== mood) return false;
      if (occasion !== "all" && p.occasion !== occasion) return false;
      if (edit === "signature" && !item.featured) return false;
      return true;
    });
  }, [family, mood, occasion, edit]);

  const shown = edit === "bestsellers" ? list.slice(0, 12) : list.slice(0, 16);

  return (
    <div>
      <section className="wrap py-12 text-center md:py-16">
        <p className="kicker">{copy.houseOf}</p>
        <h1 className="serif mt-5">{copy.discovery}</h1>
        <div className="mt-8 space-y-4">
          <Row>
            <Chip active={edit === "all"} onClick={() => setEdit("all")}>{copy.allBrands}</Chip>
            <Chip active={edit === "signature"} onClick={() => setEdit("signature")}>{copy.picks}</Chip>
            <Chip active={edit === "bestsellers"} onClick={() => setEdit("bestsellers")}>{copy.trending}</Chip>
          </Row>
          <Row>
            {FAMILIES.map((item) => (
              <Chip key={item} active={family === item} onClick={() => setFamily(family === item ? "all" : item)}>
                {labelFamily(item, locale)}
              </Chip>
            ))}
          </Row>
          <Row>
            {MOODS.map((item) => (
              <Chip key={item} active={mood === item} onClick={() => setMood(mood === item ? "all" : item)}>
                {labelMood(item, locale)}
              </Chip>
            ))}
          </Row>
          <Row>
            {OCCASIONS.map((item) => (
              <Chip key={item} active={occasion === item} onClick={() => setOccasion(occasion === item ? "all" : item)}>
                {labelOccasion(item, locale)}
              </Chip>
            ))}
          </Row>
        </div>
      </section>
      <div className="wrap pb-16">
        <p className="mb-8 text-[13px] font-medium text-[var(--muted)]">
          {shown.length} {copy.results}
        </p>
        <ProductGrid products={shown} />
      </div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">{children}</div>;
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`caps ${active ? "border-b border-[var(--ink)] pb-1" : "text-[var(--muted)]"}`}
    >
      {children}
    </button>
  );
}
