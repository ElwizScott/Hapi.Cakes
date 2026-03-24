export default function formatPrice(
  value,
  currency = "USD",
  locale = "en-US",
) {
  const amount = Number.isFinite(value) ? value : 0;
  const isVnd = currency === "VND";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: isVnd ? 0 : 2,
  }).format(amount);
}

export function formatVND(value) {
  return formatPrice(value, "VND", "vi-VN");
}
