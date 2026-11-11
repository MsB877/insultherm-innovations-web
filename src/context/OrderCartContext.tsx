import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductSlugId } from '../utils/pricingEngine';
import {
  CHECKOUT_COUPONS,
  CouponEvaluation,
  evaluateAllCoupons,
  OfferCoupon,
} from '../utils/couponEngine';

export interface CartItem {
  uid: string;
  sku: string;
  productId?: ProductSlugId;
  title: string;
  itemType: 'custom-cad' | 'kit-bundle';
  dimensionsLabel: string;
  areaCm2?: number;
  unitPriceInr: number;
  quantity: number;
  formulaNote: string;
  finishOption?: string;
  cadFileName?: string;
}

interface OrderCartContextValue {
  items: CartItem[];
  isOpen: boolean;
  activeTab: 'configure' | 'checkout';
  preselectedProductId: ProductSlugId;
  attachedCadFile: File | null;
  setAttachedCadFile: (file: File | null) => void;
  openConfigurator: (productId?: ProductSlugId) => void;
  openCheckout: () => void;
  closeDrawer: () => void;
  setActiveTab: (tab: 'configure' | 'checkout') => void;
  addItem: (item: Omit<CartItem, 'uid'>, openAfter?: boolean) => void;
  updateQuantity: (uid: string, quantity: number) => void;
  removeItem: (uid: string) => void;
  clearCart: () => void;
  // Coupon & Totals
  couponEvaluations: CouponEvaluation[];
  appliedCoupon: OfferCoupon | null;
  couponDiscountInr: number;
  applyCouponCode: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  subtotalInr: number;
  netTaxableInr: number;
  gstInr: number;
  grandTotalInr: number;
  totalUnits: number;
  distinctItemCount: number;
}

const STORAGE_KEY = 'insultherm_order_cart_v3';
const COUPON_STORAGE_KEY = 'insultherm_applied_coupon_v3';

const OrderCartContext = createContext<OrderCartContextValue | undefined>(undefined);

export const OrderCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCode, setAppliedCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'configure' | 'checkout'>('checkout');
  const [preselectedProductId, setPreselectedProductId] =
    useState<ProductSlugId>('insultherm-core');
  const [attachedCadFile, setAttachedCadFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedCode) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCode);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [appliedCode]);

  const subtotalInr = items.reduce(
    (sum, it) => sum + Math.round(it.unitPriceInr * it.quantity),
    0
  );
  const distinctSkus = new Set(items.map((it) => it.productId || it.sku));
  const distinctItemCount = distinctSkus.size;

  const couponEvaluations = evaluateAllCoupons(subtotalInr, distinctItemCount);

  const activeEval = appliedCode
    ? couponEvaluations.find(
        (ev) => ev.coupon.code.toUpperCase() === appliedCode.toUpperCase() && ev.isEligible
      ) || null
    : null;

  const appliedCoupon = activeEval ? activeEval.coupon : null;
  const couponDiscountInr = activeEval ? activeEval.discountInr : 0;

  const netTaxableInr = Math.max(0, subtotalInr - couponDiscountInr);
  const gstInr = Math.round(netTaxableInr * 0.18);
  const grandTotalInr = netTaxableInr + gstInr;
  const totalUnits = items.reduce((sum, it) => sum + it.quantity, 0);

  const applyCouponCode = (rawCode: string): { ok: boolean; message: string } => {
    const clean = rawCode.trim().toUpperCase();
    if (!clean) {
      return { ok: false, message: 'Enter a valid offer code.' };
    }
    const found = CHECKOUT_COUPONS.find((c) => c.code.toUpperCase() === clean);
    if (!found) {
      return {
        ok: false,
        message: `Invalid code "${clean}". Available codes: PROTO10, MULTISTACK8, RNDKIT1000, PILOT12.`,
      };
    }
    const ev = couponEvaluations.find((e) => e.coupon.code === found.code);
    if (!ev || !ev.isEligible) {
      return {
        ok: false,
        message: ev ? ev.reasonText : 'Order does not yet meet this coupon threshold.',
      };
    }
    setAppliedCode(found.code);
    return {
      ok: true,
      message: `Applied ${found.code} — ₹${ev.discountInr.toLocaleString('en-IN')} saved!`,
    };
  };

  const removeCoupon = () => setAppliedCode(null);

  const openConfigurator = (productId?: ProductSlugId) => {
    if (productId) setPreselectedProductId(productId);
    setActiveTab('configure');
    setIsOpen(true);
  };

  const openCheckout = () => {
    setActiveTab(items.length > 0 ? 'checkout' : 'configure');
    setIsOpen(true);
  };

  const closeDrawer = () => setIsOpen(false);

  const addItem = (item: Omit<CartItem, 'uid'>, openAfter = true) => {
    const uid = `${item.sku}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setItems((prev) => [...prev, { ...item, uid }]);
    if (openAfter) {
      setActiveTab('checkout');
      setIsOpen(true);
    }
  };

  const updateQuantity = (uid: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(uid);
      return;
    }
    setItems((prev) => prev.map((it) => (it.uid === uid ? { ...it, quantity } : it)));
  };

  const removeItem = (uid: string) => {
    setItems((prev) => prev.filter((it) => it.uid !== uid));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCode(null);
  };

  return (
    <OrderCartContext.Provider
      value={{
        items,
        isOpen,
        activeTab,
        preselectedProductId,
        attachedCadFile,
        setAttachedCadFile,
        openConfigurator,
        openCheckout,
        closeDrawer,
        setActiveTab,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        couponEvaluations,
        appliedCoupon,
        couponDiscountInr,
        applyCouponCode,
        removeCoupon,
        subtotalInr,
        netTaxableInr,
        gstInr,
        grandTotalInr,
        totalUnits,
        distinctItemCount,
      }}
    >
      {children}
    </OrderCartContext.Provider>
  );
};

export const useOrderCart = (): OrderCartContextValue => {
  const ctx = useContext(OrderCartContext);
  if (!ctx) throw new Error('useOrderCart must be used within OrderCartProvider');
  return ctx;
};
