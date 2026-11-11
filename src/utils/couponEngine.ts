export interface OfferCoupon {
  code: string;
  title: string;
  badge: string;
  audience: 'Prototyping & B2C' | 'B2B R&D Labs' | 'B2B Multi-Material' | 'B2B Pilot Volume';
  description: string;
  perkLabel?: string;
  minOrderInr: number;
  minDistinctItems?: number;
  discountType: 'percentage' | 'flat';
  discountValue: number; // % or flat INR
  maxDiscountInr: number;
}

export interface CouponEvaluation {
  coupon: OfferCoupon;
  isEligible: boolean;
  discountInr: number;
  shortfallInr: number;
  missingItemsCount: number;
  reasonText: string;
}

export const CHECKOUT_COUPONS: OfferCoupon[] = [
  {
    code: 'PROTO10',
    title: '10% Off Prototyping & Starter Orders',
    badge: '10% OFF (Up to ₹1,200)',
    audience: 'Prototyping & B2C',
    description:
      'Designed for first-time custom CAD prototypes, student EV teams, and compact starter packs.',
    minOrderInr: 999,
    discountType: 'percentage',
    discountValue: 10,
    maxDiscountInr: 1200,
  },
  {
    code: 'MULTISTACK8',
    title: '8% Off Multi-Material System Builds',
    badge: '8% OFF + Free Fit Coupon',
    audience: 'B2B Multi-Material',
    description:
      'Combine 2 or more distinct InsulTherm materials or kits (e.g., Core™ + Barrier™ + Shield™) in one order.',
    perkLabel: 'Includes complimentary CNC tolerance verification strip',
    minOrderInr: 5000,
    minDistinctItems: 2,
    discountType: 'percentage',
    discountValue: 8,
    maxDiscountInr: 3500,
  },
  {
    code: 'RNDKIT1000',
    title: 'Flat ₹1,000 Off R&D Qualification Orders',
    badge: 'FLAT ₹1,000 OFF',
    audience: 'B2B R&D Labs',
    description:
      'Helps engineering leads keep <₹15,000 turnkey qualification kits comfortably inside petty-cash limits.',
    perkLabel: 'Priority 24–48h express dispatch slot',
    minOrderInr: 9500,
    discountType: 'flat',
    discountValue: 1000,
    maxDiscountInr: 1000,
  },
  {
    code: 'PILOT12',
    title: '12% Off B2B Pilot & Pre-Production Runs',
    badge: '12% OFF (Up to ₹10,000)',
    audience: 'B2B Pilot Volume',
    description:
      'Commercial rebate for OEM and integrator teams ordering pilot batches or multi-kit lab schedules.',
    perkLabel: 'Dedicated CAM nesting & DFM signoff report',
    minOrderInr: 25000,
    discountType: 'percentage',
    discountValue: 12,
    maxDiscountInr: 10000,
  },
];

export function evaluateCoupon(
  coupon: OfferCoupon,
  subtotalInr: number,
  distinctItemCount: number
): CouponEvaluation {
  const shortfallInr = Math.max(0, coupon.minOrderInr - subtotalInr);
  const requiredDistinct = coupon.minDistinctItems || 1;
  const missingItemsCount = Math.max(0, requiredDistinct - distinctItemCount);

  const isEligible = shortfallInr === 0 && missingItemsCount === 0 && subtotalInr > 0;

  let discountInr = 0;
  if (isEligible) {
    if (coupon.discountType === 'flat') {
      discountInr = Math.min(coupon.discountValue, subtotalInr);
    } else {
      discountInr = Math.min(
        coupon.maxDiscountInr,
        Math.round((subtotalInr * coupon.discountValue) / 100)
      );
    }
  }

  let reasonText = '';
  if (isEligible) {
    reasonText = `Saves ₹${discountInr.toLocaleString('en-IN')} on this order`;
  } else if (shortfallInr > 0 && missingItemsCount > 0) {
    reasonText = `Add ₹${shortfallInr.toLocaleString('en-IN')} & ${missingItemsCount} more material SKU to unlock`;
  } else if (shortfallInr > 0) {
    reasonText = `Add ₹${shortfallInr.toLocaleString('en-IN')} more to unlock`;
  } else if (missingItemsCount > 0) {
    reasonText = `Add ${missingItemsCount} more distinct item to unlock multi-material rebate`;
  } else {
    reasonText = `Minimum order ₹${coupon.minOrderInr.toLocaleString('en-IN')}`;
  }

  return {
    coupon,
    isEligible,
    discountInr,
    shortfallInr,
    missingItemsCount,
    reasonText,
  };
}

export function evaluateAllCoupons(
  subtotalInr: number,
  distinctItemCount: number
): CouponEvaluation[] {
  return CHECKOUT_COUPONS.map((c) => evaluateCoupon(c, subtotalInr, distinctItemCount));
}
