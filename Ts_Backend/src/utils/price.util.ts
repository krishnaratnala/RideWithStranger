/**
 * Round price to nearest integer
 */
export const roundPrice = (price: number): number => {
  return Math.round(price);
};

/**
 * Ensure price does not go below minimum
 */
export const ensureMinFare = (price: number, minFare: number): number => {
  return price < minFare ? minFare : price;
};

/**
 * Clamp price between min and max
 */
export const clampPrice = (price: number, min: number, max: number): number => {
  if (price < min) return min;
  if (price > max) return max;
  return price;
};
