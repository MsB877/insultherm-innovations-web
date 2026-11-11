import React, { createContext, useContext, useEffect, useState } from 'react';
import { ProductSlugId } from '../utils/pricingEngine';

export interface CartItem {
  uid: string;
  sku: string;
  productId?: ProductSlugId;
  title: string;
  itemType: 'custom-cad' | 'kit-bundle' | 'pro-bench';
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
  subtotalInr: number;
  gstInr: number;
  grandTotalInr: number;
  totalUnits: number;
}

const STORAGE_KEY = 'insultherm_order_cart_v2';

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

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'configure' | 'checkout'>('checkout');
  const [preselectedProductId, setPreselectedProductId] = useState<ProductSlugId>('insultherm-graphite-flex');
  const [attachedCadFile, setAttachedCadFile] = useState<File | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage quota errors
    }
  }, [items]);

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
  };

  const subtotalInr = items.reduce((sum, it) => sum + Math.round(it.unitPriceInr * it.quantity), 0);
  const gstInr = Math.round(subtotalInr * 0.18);
  const grandTotalInr = subtotalInr + gstInr;
  const totalUnits = items.reduce((sum, it) => sum + it.quantity, 0);

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
        subtotalInr,
        gstInr,
        grandTotalInr,
        totalUnits,
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
