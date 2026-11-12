import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  CreditCard,
  FileCode2,
  Loader2,
  Lock,
  Minus,
  Plus,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS, RND_KITS } from '../data/companyData';
import {
  calculatePartPrice,
  PRICING_MODELS,
  ProductSlugId,
} from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';

export const OrderCartDrawer: React.FC = () => {
  const {
    items,
    isOpen,
    activeTab,
    preselectedProductId,
    attachedCadFile,
    setAttachedCadFile,
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
  } = useOrderCart();

  // Quick configurator state inside drawer
  const [prodId, setProdId] = useState<ProductSlugId>(preselectedProductId);
  const [lenMm, setLenMm] = useState(100);
  const [widMm, setWidMm] = useState(100);
  const [thkMm, setThkMm] = useState(0.43);
  const [sku, setSku] = useState('Shield-FGK-043');
  const [qty, setQty] = useState(25);

  // Coupon code input state
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    ok: boolean;
    msg: string;
  } | null>(null);

  // Checkout buyer details
  const [buyerType, setBuyerType] = useState<'b2b' | 'individual'>('b2b');
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [paymentMode, setPaymentMode] = useState(
    'Instant Proforma Invoice (UPI / NEFT / Corporate Card)'
  );
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [orderCompleteRef, setOrderCompleteRef] = useState<string | null>(null);
  const [submitErr, setSubmitErr] = useState<string | null>(null);

  useEffect(() => {
    setProdId(preselectedProductId);
  }, [preselectedProductId]);

  useEffect(() => {
    const prod = PRODUCTS.find((p) => p.id === prodId);
    const mod = PRICING_MODELS[prodId];
    if (prod && mod) {
      setLenMm(prod.defaultLengthMm);
      setWidMm(prod.defaultWidthMm);
      setThkMm(prod.defaultThicknessMm);
      setSku(mod.gradeOptions[0].sku);
    }
  }, [prodId]);

  useEffect(() => {
    if (sku === 'Core-BMS-50x50') {
      setLenMm(50);
      setWidMm(50);
    }
  }, [sku]);

  if (!isOpen) return null;

  const quickModel = PRICING_MODELS[prodId];
  const quickProduct = PRODUCTS.find((p) => p.id === prodId) || PRODUCTS[0];
  const quickQuote = calculatePartPrice({
    productId: prodId,
    lengthMm: lenMm,
    widthMm: widMm,
    quantity: qty,
    thicknessMm: thkMm,
    gradeSku: sku,
  });

  const handleQuickAdd = () => {
    addItem(
      {
        sku,
        productId: prodId,
        title: `${quickProduct.trademarkName} — Custom Part`,
        itemType: 'custom-cad',
        dimensionsLabel: `${lenMm} × ${widMm} × ${thkMm} mm (${quickQuote.areaCm2} cm²)`,
        lengthMm: lenMm,
        widthMm: widMm,
        thicknessMm: thkMm,
        areaCm2: quickQuote.areaCm2,
        unitPriceInr: quickQuote.unitPriceInr,
        quantity: qty,
        formulaNote: quickQuote.formulaExplanation,
      },
      true
    );
  };

  const handleApplyCouponSubmit = (codeToApply?: string) => {
    const target = codeToApply ?? couponInput;
    const res = applyCouponCode(target);
    setCouponFeedback({ ok: res.ok, msg: res.message });
    if (res.ok) {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    setSubmitErr(null);
    const refId = `IT-${Date.now().toString().slice(-6)}`;

    const lineManifest = items
      .map(
        (it, i) =>
          `${i + 1}. [${it.sku}] ${it.title} | ${it.dimensionsLabel} | Qty: ${
            it.quantity
          } | Unit: ₹${it.unitPriceInr} | Subtotal: ₹${Math.round(
            it.unitPriceInr * it.quantity
          ).toLocaleString('en-IN')}`
      )
      .join('\n');

    try {
      const formData = new FormData();
      formData.append(
        '_subject',
        `[InsulTherm Order ${refId}] ₹${grandTotalInr.toLocaleString('en-IN')} — ${
          companyName || buyerName
        }`
      );
      formData.append('_template', 'table');
      formData.append('_captcha', 'false');
      formData.append('Order_Reference', refId);
      formData.append(
        'Customer_Type',
        buyerType === 'b2b' ? 'B2B / OEM / R&D Lab' : 'Individual Prototyper / Researcher'
      );
      formData.append('Buyer_Name', buyerName);
      formData.append('Organization', companyName || 'Individual / Direct');
      formData.append('Work_Email', buyerEmail);
      formData.append('Phone', buyerPhone);
      formData.append('GSTIN', gstin || 'Not Provided / B2C');
      formData.append('Delivery_City_PIN', shippingCity);
      formData.append('Payment_Procurement_Mode', paymentMode);
      formData.append('Gross_Subtotal_INR', `₹${subtotalInr.toLocaleString('en-IN')}`);
      formData.append(
        'Applied_Coupon',
        appliedCoupon
          ? `${appliedCoupon.code} (-₹${couponDiscountInr.toLocaleString('en-IN')})`
          : 'None'
      );
      formData.append('Net_Taxable_INR', `₹${netTaxableInr.toLocaleString('en-IN')}`);
      formData.append('GST_18_Percent_INR', `₹${gstInr.toLocaleString('en-IN')}`);
      formData.append('Grand_Total_INR', `₹${grandTotalInr.toLocaleString('en-IN')}`);
      formData.append('Line_Items', lineManifest);
      formData.append('Engineering_Notes', notes || 'Standard 24–48h dispatch');
      if (attachedCadFile) {
        formData.append('CAD_Attachment', attachedCadFile, attachedCadFile.name);
      }

      const res = await fetch(COMPANY_INFO.formSubmitEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Submission gateway returned an error.');
      }

      setOrderCompleteRef(refId);
      clearCart();
      setAttachedCadFile(null);
    } catch {
      setSubmitErr(
        `Direct connection interrupted. Please email ${COMPANY_INFO.officialEmail} with your items and we will issue your Proforma Invoice immediately.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-red-500" />
            <div>
              <h2 className="text-base font-extrabold tracking-tight">
                Order & Custom Quote Checkout
              </h2>
              <p className="text-[11px] text-slate-400">
                ₹0 Tooling NRE • Live 3-Tier Volume Rates • 24–48h Dispatch
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeDrawer}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Order Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 bg-slate-100 p-1.5 gap-1.5 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setOrderCompleteRef(null);
              setActiveTab('configure');
            }}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'configure'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            + Quick-Configure Part / Kit
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checkout')}
            className={`py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'checkout'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Order Cart & Coupons ({items.length})
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {orderCompleteRef ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 font-mono text-xs font-bold text-slate-800">
                Order Reference: {orderCompleteRef}
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">
                Order & Proforma Request Dispatched
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Your item manifest, applied discount, and specifications have been routed to our
                Sanand converting desk (<strong>{COMPANY_INFO.officialEmail}</strong>). You will
                receive your GST Proforma Invoice / payment link and DFM confirmation shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderCompleteRef(null);
                  closeDrawer();
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Done
              </button>
            </div>
          ) : activeTab === 'configure' ? (
            <div className="space-y-6">
              {/* Quick Custom Part Builder */}
              <div className="rounded-2xl border border-slate-200 p-4 space-y-4 bg-slate-50/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Custom CNC Part Quick-Builder
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    ₹0 Tooling NRE
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Product Architecture
                    </label>
                    <select
                      value={prodId}
                      onChange={(e) => setProdId(e.target.value as ProductSlugId)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-semibold text-slate-900"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.trademarkName} — {p.protoPriceLabel}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Grade / SKU
                      </label>
                      <select
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900"
                      >
                        {quickModel.gradeOptions.map((g) => (
                          <option key={g.sku} value={g.sku}>
                            {g.sku}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Thickness
                      </label>
                      <select
                        value={thkMm}
                        onChange={(e) => setThkMm(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-900"
                      >
                        {quickModel.thicknessOptions.map((t) => (
                          <option key={t.mm} value={t.mm}>
                            {t.mm} mm
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Length (mm)
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={1000}
                        value={lenMm}
                        onChange={(e) => setLenMm(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Width (mm)
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={1000}
                        value={widMm}
                        onChange={(e) => setWidMm(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Qty (pcs)
                      </label>
                      <input
                        type="number"
                        min={1}
                        value={qty}
                        onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-slate-500">
                        {quickQuote.areaCm2} cm² • ₹{quickQuote.unitPriceInr}/pc
                      </div>
                      <div className="text-base font-extrabold font-mono text-slate-950">
                        Subtotal: ₹{quickQuote.lineSubtotalInr.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickAdd}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>

              {/* Ready-to-Ship R&D Kits & Starter Packs */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Or Add Turnkey R&D Kits & Prototyping Starter Packs
                </h3>
                <div className="space-y-2.5">
                  {RND_KITS.map((kit) => (
                    <div
                      key={kit.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-slate-900">{kit.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {kit.leadTime} • Full Engineering Kit
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            addItem(
                              {
                                sku: kit.sku,
                                title: kit.name,
                                itemType: 'kit-bundle',
                                dimensionsLabel: 'Turnkey Multi-Part Engineering Kit',
                                unitPriceInr: kit.priceInr,
                                quantity: 1,
                                formulaNote: 'Fixed <₹15k R&D Evaluation Bundle',
                              },
                              true
                            )
                          }
                          className="shrink-0 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors"
                        >
                          + {kit.priceLabel}
                        </button>
                      </div>

                      {kit.starterSku && kit.starterPriceInr && (
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div className="text-[11px] text-slate-600">
                            <span className="font-semibold text-emerald-700">
                              Individual / Starter Option:
                            </span>{' '}
                            {kit.starterSummary}
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              addItem(
                                {
                                  sku: kit.starterSku!,
                                  title: `${kit.name} (Starter Pack)`,
                                  itemType: 'kit-bundle',
                                  dimensionsLabel: 'Compact Prototyping Starter Pack',
                                  unitPriceInr: kit.starterPriceInr!,
                                  quantity: 1,
                                  formulaNote: 'Prototyping / Individual Starter Pack',
                                },
                                true
                              )
                            }
                            className="shrink-0 px-2.5 py-1 rounded-lg border border-slate-300 hover:border-red-600 text-slate-800 text-[11px] font-bold transition-colors"
                          >
                            + ₹{kit.starterPriceInr.toLocaleString('en-IN')}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Your Order Cart is Empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Configure custom CNC parts by exact dimensions or add a turnkey R&D kit / starter
                pack to unlock checkout coupons.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('configure')}
                className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Configure a Part or Kit
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Line Items */}
              <div className="space-y-3">
                {items.map((item) => {
                  const tierBadge =
                    item.itemType === 'custom-cad'
                      ? item.quantity >= 500
                        ? 'OEM Blanket Tier (500+)'
                        : item.quantity >= 100
                        ? 'Pilot Tier (100–499)'
                        : 'Prototype Tier (1–99)'
                      : null;

                  return (
                    <div
                      key={item.uid}
                      className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[11px] font-mono font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                              {item.sku}
                            </span>
                            {tierBadge && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                {tierBadge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">{item.title}</h4>
                          <p className="text-xs text-slate-600">{item.dimensionsLabel}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.uid)}
                          className="text-slate-400 hover:text-red-600 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.uid, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <input
                            type="number"
                            min={1}
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.uid, Math.max(1, Number(e.target.value)))
                            }
                            className="w-16 text-center py-1 rounded-lg border border-slate-300 bg-white text-xs font-mono font-bold"
                          />
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.uid, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg border border-slate-300 bg-white flex items-center justify-center hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] text-slate-500">
                            ₹{item.unitPriceInr.toLocaleString('en-IN')} / unit
                          </div>
                          <div className="text-sm font-extrabold font-mono text-slate-950">
                            ₹{Math.round(item.unitPriceInr * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* OFFER COUPONS ENGINE */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/90 p-4 space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-900">
                    <Tag className="w-3.5 h-3.5 text-red-600" />
                    Offer Coupons (B2B & Prototyping)
                  </div>
                  <span className="text-[11px] text-slate-500">1 coupon per order</span>
                </div>

                {/* Manual Code Bar */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code (e.g. PROTO10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold uppercase focus:outline-none focus:border-red-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleApplyCouponSubmit()}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {couponFeedback && (
                  <div
                    className={`text-xs font-medium px-3 py-2 rounded-lg ${
                      couponFeedback.ok
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-900 border border-amber-200'
                    }`}
                  >
                    {couponFeedback.msg}
                  </div>
                )}

                {/* 4 Interactive Coupon Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {couponEvaluations.map((ev) => {
                    const isApplied = appliedCoupon?.code === ev.coupon.code;
                    return (
                      <div
                        key={ev.coupon.code}
                        className={`rounded-xl p-3 border transition-all flex flex-col justify-between ${
                          isApplied
                            ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                            : ev.isEligible
                            ? 'border-slate-300 bg-white hover:border-red-400'
                            : 'border-slate-200 bg-slate-100/70 opacity-80'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1.5 mb-1">
                            <span className="font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-slate-900 text-white">
                              {ev.coupon.code}
                            </span>
                            <span className="text-[10px] font-semibold text-slate-500">
                              {ev.coupon.audience}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-slate-900">
                            {ev.coupon.badge}
                          </div>
                          <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                            {ev.coupon.description}
                          </p>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-semibold ${
                              ev.isEligible ? 'text-emerald-700' : 'text-slate-500'
                            }`}
                          >
                            {isApplied
                              ? `Applied (-₹${ev.discountInr.toLocaleString('en-IN')})`
                              : ev.reasonText}
                          </span>

                          {isApplied ? (
                            <button
                              type="button"
                              onClick={() => {
                                removeCoupon();
                                setCouponFeedback(null);
                              }}
                              className="text-[11px] font-bold text-red-600 hover:underline shrink-0"
                            >
                              Remove
                            </button>
                          ) : ev.isEligible ? (
                            <button
                              type="button"
                              onClick={() => handleApplyCouponSubmit(ev.coupon.code)}
                              className="text-[11px] font-bold text-red-600 hover:text-red-700 shrink-0 flex items-center gap-0.5"
                            >
                              <Sparkles className="w-3 h-3" />
                              Apply
                            </button>
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totals Box */}
              <div className="rounded-2xl bg-slate-950 text-white p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Items Gross Subtotal</span>
                  <span className="font-mono">₹{subtotalInr.toLocaleString('en-IN')}</span>
                </div>
                {appliedCoupon && couponDiscountInr > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount ({appliedCoupon.code})</span>
                    <span className="font-mono">
                      - ₹{couponDiscountInr.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-slate-300">
                  <span>Custom Tooling / Steel-Die NRE</span>
                  <span className="font-mono text-emerald-400 font-bold">₹0</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Estimated GST (18% HSN 3919 / 6814 / 8546)</span>
                  <span className="font-mono">₹{gstInr.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold pt-2 border-t border-slate-800">
                  <span>Total Payable Estimate</span>
                  <span className="font-mono text-red-400">
                    ₹{grandTotalInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Form (B2B + Individual Toggle) */}
              <form onSubmit={handlePlaceOrder} className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-red-600" />
                    Dispatch & Billing Details
                  </h4>
                  <div className="inline-flex rounded-lg bg-slate-100 p-0.5 border border-slate-200 text-[11px] font-semibold">
                    <button
                      type="button"
                      onClick={() => setBuyerType('b2b')}
                      className={`px-2.5 py-1 rounded-md ${
                        buyerType === 'b2b' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      B2B / Company
                    </button>
                    <button
                      type="button"
                      onClick={() => setBuyerType('individual')}
                      className={`px-2.5 py-1 rounded-md ${
                        buyerType === 'individual'
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500'
                      }`}
                    >
                      Individual / Lab
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="text"
                    required={buyerType === 'b2b'}
                    placeholder={
                      buyerType === 'b2b'
                        ? 'Company / Lab Name *'
                        : 'Project / University (Optional)'
                    }
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Phone / WhatsApp *"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                  {buyerType === 'b2b' && (
                    <input
                      type="text"
                      placeholder="GSTIN (Optional — for 18% Input Credit)"
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono sm:col-span-2"
                    />
                  )}
                  <input
                    type="text"
                    required
                    placeholder="Delivery City & PIN Code *"
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm sm:col-span-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Preferred Payment / Procurement Method
                  </label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium"
                  >
                    <option value="Instant Proforma Invoice (UPI / NEFT / Corporate Card)">
                      Instant Proforma Invoice (UPI / NEFT / Card — Petty Cash Friendly)
                    </option>
                    <option value="Standard Corporate Purchase Order (PO) Against GST Invoice">
                      Corporate Purchase Order (PO) Against Tax Invoice
                    </option>
                    <option value="Defense / PSU GeM / <₹200 Cr Domestic DVA Quotation">
                      Defense / PSU Domestic DVA Quotation
                    </option>
                  </select>
                </div>

                {attachedCadFile && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                    <FileCode2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="truncate font-medium">
                      Attached CAD: {attachedCadFile.name}
                    </span>
                  </div>
                )}

                <textarea
                  rows={2}
                  placeholder="Optional tolerances, kiss-cut carrier notes, or target delivery date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />

                {submitErr && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800">
                    {submitErr}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Order & Routing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Place Order & Request Instant Proforma Invoice
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Direct Sanand GIDC Dispatch • NDA-Safe CAD Handling
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
