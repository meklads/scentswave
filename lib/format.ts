export function formatMoney(value: number, locale: "ar" | "en" = "ar") {
  return new Intl.NumberFormat(locale === "ar" ? "ar-SA" : "en-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

export const WHATSAPP = "966502786513";
export const PHONE_DISPLAY = "050 278 6513";
export const EMAIL = "info@scentswave.com";
export const FREE_SHIPPING_FROM = 131.25;
export const SHIPPING_FEE = 26.06;
export const COD_FEE = 15;
export const GIFT_WRAP_FEE = 35;

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

export const COUPONS = {
  WAVE20: { percent: 20, labelAr: "خصم ٢٠٪", labelEn: "20% off" },
} as const;

export type CouponCode = keyof typeof COUPONS;

export function normalizeCoupon(code: string) {
  const key = code.trim().toUpperCase();
  return key in COUPONS ? (key as CouponCode) : null;
}

export function discountFor(subtotal: number, code: string | null) {
  if (!code) return 0;
  const coupon = COUPONS[code as CouponCode];
  if (!coupon) return 0;
  return Math.round(subtotal * (coupon.percent / 100) * 100) / 100;
}

export function remainingForFreeShip(subtotal: number) {
  return Math.max(0, Math.round((FREE_SHIPPING_FROM - subtotal) * 100) / 100);
}
