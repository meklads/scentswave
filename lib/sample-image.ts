import productsData from "@/data/products.json";

type Shot = { slug: string; images?: string[] };

const catalog = productsData as Shot[];

export function sampleShot(sourceSlug: string, fallback: string) {
  const product = catalog.find((item) => item.slug === sourceSlug);
  return product?.images?.[0] || fallback;
}

export function sampleGallery(sourceSlug: string, fallback: string) {
  const product = catalog.find((item) => item.slug === sourceSlug);
  const images = product?.images?.filter(Boolean) ?? [];
  return images.length > 0 ? images : [fallback];
}
