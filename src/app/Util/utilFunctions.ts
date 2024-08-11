export function calculateDiscountPercent(
  price: number,
  discountedPrice: number,
): number {
  return Math.round(((price - discountedPrice) / price) * 100);
}
const date = new Date(2024, 7, 2, 14, 41, 35);

export function formatDateTimeToDate(orderDate: string): string {
  const parts = orderDate.toString().split(',');

  // Return the part up to the 4th comma
  return parts.slice(0, 3).join('/');
}
