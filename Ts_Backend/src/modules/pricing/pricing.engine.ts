import { PRICING_RULES } from './pricing.rules';

export interface PricingResult {
  basePrice: number;
  minPrice: number;
  maxPrice: number;
}

/**
 * Calculate base price & minimum allowed price
 */
export const calculateRidePricing = (distanceKm: number): PricingResult => {
  const basePrice = distanceKm * PRICING_RULES.BASE_FARE_PER_KM;

  const minByKm = distanceKm * PRICING_RULES.MIN_FARE_PER_KM;
  const minByPercent =
    basePrice -
    (basePrice * PRICING_RULES.MAX_BARGAIN_PERCENT) / 100;

  const minPrice = Math.max(
    minByKm,
    minByPercent,
    PRICING_RULES.PLATFORM_MIN_FARE
  );

  return {
    basePrice: Math.round(basePrice),
    minPrice: Math.round(minPrice),
    maxPrice: Math.round(basePrice),
  };
};

/**
 * Validate bargained price
 */
export const validateBargainPrice = (
  proposedPrice: number,
  pricing: PricingResult
): boolean => {
  return (
    proposedPrice >= pricing.minPrice &&
    proposedPrice <= pricing.maxPrice
  );
};

/**
 * Normalize bargained price (safety net)
 */
export const normalizePrice = (
  proposedPrice: number,
  pricing: PricingResult
): number => {
  if (proposedPrice < pricing.minPrice) return pricing.minPrice;
  if (proposedPrice > pricing.maxPrice) return pricing.maxPrice;
  return proposedPrice;
};
