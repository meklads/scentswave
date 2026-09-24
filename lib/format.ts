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
