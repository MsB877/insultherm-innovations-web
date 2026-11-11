import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  Upload,
  FileCode2,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CheckCircle2,
  Send,
  Printer,
  Mail,
  ShieldCheck,
  Sliders,
  Tag,
  Check,
} from 'lucide-react';
import { useOrderCart } from '../context/OrderCartContext';
import { COMPANY_INFO, PRODUCTS, RND_KITS } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS, ProductSlugId } from '../utils/pricingEngine';

const FINISH_OPTIONS = [
  'Through-Cut Individual Parts (±0.15 mm)',
  'Kiss-Cut on Release Liner Sheet (Fast Peel)',
  '50%-Depth Living-Hinge Score (Shield™ 3D Fold)',
  '1.5 mm Kapton® Edge-Seal Overhang (Graphite-Flex™)',
];

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

  // Configurator Tab State
  const [selectedProdId, setSelectedProdId] = useState<ProductSlugId>(preselectedProductId);
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(100);
  const [qty, setQty] = useState<number>(10);
  const [thicknessMm, setThicknessMm] = useState<number>(1.5);
  const [gradeSku, setGradeSku] = useState<string>('Core-300');
  const [finishOption, setFinishOption] = useState<string>(FINISH_OPTIONS[0]);
  const [geometrySource, setGeometrySource] = useState<'cad' | 'rect'>('cad');

  // Coupon Input State
  const [promoInput, setPromoInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  // Checkout Form State
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(
    'UPI / Purchase Card Link (Express <₹15,000 Dispatch)'
  );
  const [engineeringNotes, setEngineeringNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrderRef, setSubmittedOrderRef] = useState<string | null>(null);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    itemsManifest: string;
    subtotal: number;
    couponCode: string;
    discount: number;
    gst: number;
    total: number;
    cadName: string;
  } | null>(null);

  const fileInputConfigRef = useRef<HTMLInputElement | null>(null);
  const fileInputCheckoutRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedProdId(preselectedProductId);
    const prod = PRODUCTS.find((p) => p.id === preselectedProductId);
    const model = PRICING_MODELS[preselectedProductId];
    if (prod && model) {
      setLengthMm(prod.defaultLengthMm);
      setWidthMm(prod.defaultWidthMm);
      setThicknessMm(prod.defaultThicknessMm);
      setGradeSku(model.gradeOptions[0].sku);
      if (preselectedProductId === 'insultherm-shield') {
        setFinishOption(FINISH_OPTIONS[2]);
      } else if (preselectedProductId === 'insultherm-graphite-flex') {
        setFinishOption(FINISH_OPTIONS[3]);
      } else {
        setFinishOption(FINISH_OPTIONS[0]);
      }
    }
  }, [preselectedProductId]);

  if (!isOpen) return null;

  const activeModel = PRICING_MODELS[selectedProdId];
  const activeProduct = PRODUCTS.find((p) => p.id === selectedProdId) || PRODUCTS[0];

  const liveCalc = calculatePartPrice({
    productId: selectedProdId,
    lengthMm,
    widthMm,
    quantity: qty,
    thicknessMm,
    gradeSku,
  });

  // Next unlockable coupon hint for dynamic spend bar
  const nextUnlockEval =
    couponEvaluations
      .filter((ev) => !ev.isEligible && ev.shortfallInr > 0)
      .sort((a, b) => a.shortfallInr - b.shortfallInr)[0] || null;

  // Best eligible coupon suggestion if none applied yet
  const bestEligibleEval =
    couponEvaluations
      .filter((ev) => ev.isEligible)
      .sort((a, b) => b.discountInr - a.discountInr)[0] || null;

  const handleProductSwitch = (newId: ProductSlugId) => {
    setSelectedProdId(newId);
    const prod = PRODUCTS.find((p) => p.id === newId);
    const model = PRICING_MODELS[newId];
    if (prod && model) {
      setLengthMm(prod.defaultLengthMm);
      setWidthMm(prod.defaultWidthMm);
      setThicknessMm(prod.defaultThicknessMm);
      setGradeSku(model.gradeOptions[0].sku);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setAttachedCadFile(f);
      setGeometrySource('cad');
    }
  };

  const handleAddConfiguredPart = () => {
    addItem(
      {
        sku: gradeSku,
        productId: selectedProdId,
        title: `${activeProduct.trademarkName} (${gradeSku})`,
        itemType: 'custom-cad',
        dimensionsLabel: `${lengthMm} × ${widthMm} × ${thicknessMm} mm (${liveCalc.areaCm2} cm²)`,
        areaCm2: liveCalc.areaCm2,
        unitPriceInr: liveCalc.unitPriceInr,
        quantity: qty,
        formulaNote: liveCalc.formulaExplanation,
        finishOption,
        cadFileName:
          geometrySource === 'cad'
            ? attachedCadFile?.name || 'Custom CAD Profile'
            : 'Rectangular Cut',
      },
      true
    );
  };

  const handleManualPromoSubmit = () => {
    const res = applyCouponCode(promoInput);
    setCouponFeedback({ ok: res.ok, text: res.message });
    if (res.ok) setPromoInput('');
  };

  const buildManifestString = () =>
    items
      .map(
        (it, idx) =>
          `${idx + 1}. [${it.sku}] ${it.title} | ${it.dimensionsLabel} | Qty: ${it.quantity} × ₹${it.unitPriceInr.toLocaleString('en-IN')} = ₹${Math.round(
            it.unitPriceInr * it.quantity
          ).toLocaleString('en-IN')}${it.cadFileName ? ` | CAD: ${it.cadFileName}` : ''}`
      )
      .join('\n');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    const orderRef = `ORD-IT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const manifest = buildManifestString();
    const cadName = attachedCadFile
      ? `${attachedCadFile.name} (${(attachedCadFile.size / 1024).toFixed(1)} KB)`
      : 'None (Standard Dimensions / Kit SKU)';
    const couponLabel = appliedCoupon
      ? `${appliedCoupon.code} (-₹${couponDiscountInr.toLocaleString('en-IN')})`
      : 'None Applied';

    try {
      // 1. Netlify Multipart Submission
      const netlifyData = new FormData();
      netlifyData.append('form-name', 'insultherm-direct-order');
      netlifyData.append('order_reference', orderRef);
      netlifyData.append('route_to_email', COMPANY_INFO.routingEmail);
      netlifyData.append('buyer_name', buyerName);
      netlifyData.append('company_name', companyName || 'Individual / Prototyping');
      netlifyData.append('work_email', workEmail);
      netlifyData.append('phone', phone);
      netlifyData.append('gstin', gstin || 'Not Provided');
      netlifyData.append('shipping_address', shippingAddress);
      netlifyData.append('payment_method', paymentMethod);
      netlifyData.append('order_subtotal_inr', `₹${subtotalInr.toLocaleString('en-IN')}`);
      netlifyData.append('applied_coupon', couponLabel);
      netlifyData.append('coupon_discount_inr', `₹${couponDiscountInr.toLocaleString('en-IN')}`);
      netlifyData.append('order_gst_inr', `₹${gstInr.toLocaleString('en-IN')}`);
      netlifyData.append('order_total_inr', `₹${grandTotalInr.toLocaleString('en-IN')}`);
      netlifyData.append('line_items_manifest', manifest);
      netlifyData.append('engineering_notes', engineeringNotes || 'Standard 24–48h dispatch');
      if (attachedCadFile) {
        netlifyData.append('cad_attachment', attachedCadFile);
      }

      await fetch('/', { method: 'POST', body: netlifyData }).catch(() => null);

      // 2. Direct Delivery to manavsb9719@gmail.com via FormSubmit
      const fsData = new FormData();
      fsData.append(
        '_subject',
        `[InsulTherm Order ${orderRef}] ₹${grandTotalInr.toLocaleString('en-IN')} — ${companyName || buyerName}`
      );
      fsData.append('_template', 'table');
      fsData.append('_captcha', 'false');
      fsData.append('Order_Reference', orderRef);
      fsData.append('Buyer_Name', buyerName);
      fsData.append('Company_Or_Lab', companyName || 'Individual / Maker');
      fsData.append('Email', workEmail);
      fsData.append('Phone', phone);
      fsData.append('GSTIN', gstin || 'Unregistered / Prototyping');
      fsData.append('Shipping_Address', shippingAddress);
      fsData.append('Payment_Mode', paymentMethod);
      fsData.append('Base_Subtotal_INR', `Rs. ${subtotalInr.toLocaleString('en-IN')}`);
      fsData.append('Applied_Offer_Coupon', couponLabel);
      fsData.append('Net_Taxable_INR', `Rs. ${netTaxableInr.toLocaleString('en-IN')}`);
      fsData.append('GST_18_Percent', `Rs. ${gstInr.toLocaleString('en-IN')}`);
      fsData.append('Grand_Total_INR', `Rs. ${grandTotalInr.toLocaleString('en-IN')}`);
      fsData.append('Attached_CAD_File', cadName);
      fsData.append('Line_Items', manifest);
      fsData.append('Engineering_Notes', engineeringNotes || 'None');
      if (attachedCadFile) {
        fsData.append('attachment', attachedCadFile);
      }

      await fetch(COMPANY_INFO.formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fsData,
      }).catch(() => null);
    } finally {
      setSubmittedSnapshot({
        itemsManifest: manifest,
        subtotal: subtotalInr,
        couponCode: appliedCoupon ? appliedCoupon.code : 'None',
        discount: couponDiscountInr,
        gst: gstInr,
        total: grandTotalInr,
        cadName,
      });
      setSubmittedOrderRef(orderRef);
      setSubmitting(false);
      clearCart();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl border-l border-gray-200 flex flex-col overflow-hidden">
        {/* Signature Black & Red Top Rule */}
        <div className="h-1.5 w-full insultherm-accent-bar shrink-0" />

        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-gray-200 flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#DC2626]">
              Direct Purchase & Custom CAD Checkout
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#0F1115]">
              Insul<span className="text-[#DC2626]">Therm</span> Order Desk
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmittedOrderRef(null);
              closeDrawer();
            }}
            aria-label="Close Order Desk"
            className="p-2 rounded-lg border border-gray-200 hover:bg-[#0F1115] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {!submittedOrderRef && (
          <div className="grid grid-cols-2 bg-[#F7F8FA] border-b border-gray-200 p-1.5 gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('configure')}
              className={`py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'configure'
                  ? 'bg-[#0F1115] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#DC2626]" />
              1. Configure Custom Part
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'checkout'
                  ? 'bg-[#DC2626] text-white shadow-sm'
                  : 'text-gray-700 hover:bg-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              2. Checkout & Offers ({items.length})
            </button>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {submittedOrderRef && submittedSnapshot ? (
            /* ORDER CONFIRMATION */
            <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-full bg-red-50 border border-red-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#DC2626]" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#DC2626]">
                    Order Logged & Routed
                  </span>
                  <h3 className="text-2xl font-bold text-[#0F1115] mt-0.5 tabular-nums">
                    {submittedOrderRef}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    Sent to <strong className="font-mono text-[#0F1115]">{COMPANY_INFO.routingEmail}</strong>. Our Sanand team confirms CAD tolerances and dispatches your GST Proforma / UPI payment link within 2–4 business hours.
                  </p>
                </div>
              </div>

              <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="font-semibold text-[#0F1115] border-b border-gray-200 pb-1.5">
                  ORDER SUMMARY
                </div>
                <pre className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                  {submittedSnapshot.itemsManifest}
                </pre>
                <div className="border-t border-gray-200 pt-2 space-y-1 text-gray-800 tabular-nums">
                  <div className="flex justify-between">
                    <span>Base Subtotal (₹0 NRE):</span>
                    <span>₹{submittedSnapshot.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {submittedSnapshot.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Offer Applied ({submittedSnapshot.couponCode}):</span>
                      <span>- ₹{submittedSnapshot.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{submittedSnapshot.gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#DC2626] pt-1">
                    <span>Total Payable:</span>
                    <span>₹{submittedSnapshot.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="py-2.5 px-4 rounded-lg border border-[#0F1115] text-[#0F1115] hover:bg-[#0F1115] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save Order PDF
                </button>
                <a
                  href={`mailto:${COMPANY_INFO.routingEmail}?cc=${COMPANY_INFO.officialEmail}&subject=${encodeURIComponent(
                    `[${submittedOrderRef}] InsulTherm Order — ${companyName || buyerName}`
                  )}&body=${encodeURIComponent(
                    `Order Ref: ${submittedOrderRef}\nBuyer: ${buyerName} (${companyName})\nPhone: ${phone}\nCoupon: ${submittedSnapshot.couponCode} (-Rs. ${submittedSnapshot.discount})\nTotal (incl. GST): Rs. ${submittedSnapshot.total.toLocaleString('en-IN')}\nCAD File: ${submittedSnapshot.cadName}\n\nItems:\n${submittedSnapshot.itemsManifest}`
                  )}`}
                  className="py-2.5 px-4 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Direct Email Copy
                </a>
              </div>
            </div>
          ) : activeTab === 'configure' ? (
            /* TAB 1: CUSTOM PART CONFIGURATOR */
            <div className="space-y-5">
              <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4 space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                  1. Select Material
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductSwitch(p.id)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        selectedProdId === p.id
                          ? 'border-[#DC2626] bg-white shadow-sm ring-1 ring-[#DC2626]'
                          : 'border-gray-200 bg-white/70 hover:border-gray-400'
                      }`}
                    >
                      <div className="text-sm font-bold text-[#0F1115]">{p.trademarkName}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{p.protoPriceLabel}</div>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Grade</label>
                    <select
                      value={gradeSku}
                      onChange={(e) => setGradeSku(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-medium text-[#0F1115]"
                    >
                      {activeModel.gradeOptions.map((g) => (
                        <option key={g.sku} value={g.sku}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Thickness
                    </label>
                    <select
                      value={thicknessMm}
                      onChange={(e) => setThicknessMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-medium text-[#0F1115]"
                    >
                      {activeModel.thicknessOptions.map((t) => (
                        <option key={t.mm} value={t.mm}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Dimensions + CAD Upload */}
              <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    2. Part Size & Custom CAD
                  </label>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setGeometrySource('cad')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        geometrySource === 'cad'
                          ? 'bg-[#0F1115] text-white'
                          : 'bg-white text-gray-600 border border-gray-200'
                      }`}
                    >
                      Custom CAD
                    </button>
                    <button
                      type="button"
                      onClick={() => setGeometrySource('rect')}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        geometrySource === 'rect'
                          ? 'bg-[#0F1115] text-white'
                          : 'bg-white text-gray-600 border border-gray-200'
                      }`}
                    >
                      Rectangle
                    </button>
                  </div>
                </div>

                {geometrySource === 'cad' && (
                  <div
                    onClick={() => fileInputConfigRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#DC2626] bg-white rounded-lg p-4 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={fileInputConfigRef}
                      type="file"
                      accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    {attachedCadFile ? (
                      <div className="flex items-center justify-between gap-3 text-left">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileCode2 className="w-5 h-5 text-[#DC2626] shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#0F1115] truncate">
                              {attachedCadFile.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {(attachedCadFile.size / 1024).toFixed(1)} KB attached
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#DC2626] shrink-0">Change</span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-5 h-5 text-[#DC2626] mx-auto" />
                        <div className="text-xs font-semibold text-[#0F1115]">
                          Upload .DXF, .STEP, .IGES, or .PDF Drawing
                        </div>
                        <div className="text-xs text-gray-500">
                          Enter part Length × Width below for instant area price
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Length (mm)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={lengthMm}
                      onChange={(e) => setLengthMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Width (mm)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={widthMm}
                      onChange={(e) => setWidthMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-sm font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      max={100000}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-sm font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Cut / Scoring Option
                  </label>
                  <select
                    value={finishOption}
                    onChange={(e) => setFinishOption(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-medium"
                  >
                    {FINISH_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Live Price Box */}
              <div className="bg-[#0F1115] text-white rounded-lg p-5 space-y-3 tabular-nums">
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>{liveCalc.tierName}</span>
                  <span className="font-mono text-white">Area: {liveCalc.areaCm2} cm²</span>
                </div>
                <div className="grid grid-cols-3 gap-3 border-y border-gray-800 py-3">
                  <div>
                    <div className="text-xs text-gray-400">Unit Price</div>
                    <div className="text-xl font-bold text-white">
                      ₹{liveCalc.unitPriceInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Area Rate</div>
                    <div className="text-base font-semibold text-gray-200">
                      ₹{liveCalc.effectiveRatePerCm2}/cm²
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Line Total</div>
                    <div className="text-xl font-bold text-[#DC2626]">
                      ₹{liveCalc.lineSubtotalInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-400">{liveCalc.formulaExplanation}</div>
                <button
                  type="button"
                  onClick={handleAddConfiguredPart}
                  className="w-full py-3 px-4 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add to Order & View Checkout Offers
                </button>
              </div>
            </div>
          ) : (
            /* TAB 2: CHECKOUT + B2B / PROTOTYPING COUPON ENGINE */
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-6 text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
                  <div>
                    <h3 className="text-base font-bold text-[#0F1115]">Your Order Cart is Empty</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Configure a custom CAD part or add a ready-to-ship R&D / Starter Kit below:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('configure')}
                    className="py-2.5 px-5 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs font-semibold transition-colors"
                  >
                    + Configure Custom Part
                  </button>

                  <div className="pt-4 border-t border-gray-200 text-left space-y-2.5">
                    <div className="text-xs font-semibold text-gray-500">
                      Quick-Add Kits & Starter Packs:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {RND_KITS.slice(0, 2).map((kit) => (
                        <button
                          key={kit.id}
                          type="button"
                          onClick={() =>
                            addItem({
                              sku: kit.sku,
                              title: kit.name,
                              itemType: 'kit-bundle',
                              dimensionsLabel: 'Turnkey R&D Kit',
                              unitPriceInr: kit.priceInr,
                              quantity: 1,
                              formulaNote: kit.leadTime,
                            })
                          }
                          className="p-3 rounded-lg border border-gray-200 hover:border-[#DC2626] bg-white text-left"
                        >
                          <div className="text-xs font-bold text-[#0F1115] line-clamp-1">
                            {kit.name}
                          </div>
                          <div className="text-xs font-semibold text-[#DC2626] mt-1">
                            + Add Full Kit ({kit.priceLabel})
                          </div>
                        </button>
                      ))}
                      {RND_KITS.filter((k) => k.starterPriceInr).slice(0, 2).map((kit) => (
                        <button
                          key={`${kit.id}-starter`}
                          type="button"
                          onClick={() =>
                            addItem({
                              sku: kit.starterSku || `${kit.sku}-MINI`,
                              title: `${kit.name} — Starter`,
                              itemType: 'kit-bundle',
                              dimensionsLabel: kit.starterLabel || 'Starter Pack',
                              unitPriceInr: kit.starterPriceInr!,
                              quantity: 1,
                              formulaNote: 'Prototyping Starter Pack',
                            })
                          }
                          className="p-3 rounded-lg border border-gray-200 hover:border-[#0F1115] bg-white text-left"
                        >
                          <div className="text-xs font-bold text-[#0F1115] line-clamp-1">
                            {kit.starterLabel}
                          </div>
                          <div className="text-xs font-semibold text-gray-600 mt-1">
                            + Add Starter Pack
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Dynamic Spend-Unlock Progress Banner */}
                  <div className="bg-[#0F1115] text-white rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <Tag className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <div className="text-xs leading-relaxed">
                        {appliedCoupon ? (
                          <span>
                            Offer <strong className="font-mono text-[#DC2626]">{appliedCoupon.code}</strong> active — saving{' '}
                            <strong className="text-emerald-400">
                              ₹{couponDiscountInr.toLocaleString('en-IN')}
                            </strong>
                            !
                            {nextUnlockEval && (
                              <span className="text-gray-400">
                                {' '}
                                (Add ₹{nextUnlockEval.shortfallInr.toLocaleString('en-IN')} more to unlock{' '}
                                {nextUnlockEval.coupon.code})
                              </span>
                            )}
                          </span>
                        ) : bestEligibleEval ? (
                          <span>
                            You unlocked{' '}
                            <strong className="font-mono text-white">
                              {bestEligibleEval.coupon.code}
                            </strong>{' '}
                            — save{' '}
                            <strong className="text-emerald-400">
                              ₹{bestEligibleEval.discountInr.toLocaleString('en-IN')}
                            </strong>{' '}
                            right now!
                          </span>
                        ) : nextUnlockEval ? (
                          <span>
                            Add{' '}
                            <strong className="text-white">
                              ₹{nextUnlockEval.shortfallInr.toLocaleString('en-IN')}
                            </strong>{' '}
                            more to unlock{' '}
                            <strong className="font-mono text-[#DC2626]">
                              {nextUnlockEval.coupon.code}
                            </strong>{' '}
                            ({nextUnlockEval.coupon.badge}).
                          </span>
                        ) : null}
                      </div>
                    </div>
                    {!appliedCoupon && bestEligibleEval && (
                      <button
                        type="button"
                        onClick={() => {
                          const res = applyCouponCode(bestEligibleEval.coupon.code);
                          setCouponFeedback({ ok: res.ok, text: res.message });
                        }}
                        className="px-3 py-1.5 rounded bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold shrink-0"
                      >
                        Apply Best Offer
                      </button>
                    )}
                  </div>

                  {/* Cart Line Items */}
                  <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
                    <div className="px-4 py-3 bg-[#F7F8FA] flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-700">
                        Order Items ({items.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('configure')}
                        className="text-xs font-semibold text-[#DC2626] hover:underline"
                      >
                        + Add Another Item
                      </button>
                    </div>

                    {items.map((item) => (
                      <div
                        key={item.uid}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="text-sm font-bold text-[#0F1115]">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.dimensionsLabel}</div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 tabular-nums">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-[#F7F8FA]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.uid, item.quantity - 1)}
                              className="p-1.5 hover:bg-gray-200 text-gray-700"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.uid, Math.max(1, Number(e.target.value) || 1))
                              }
                              className="w-12 text-center text-xs font-mono font-bold bg-transparent focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.uid, item.quantity + 1)}
                              className="p-1.5 hover:bg-gray-200 text-gray-700"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right min-w-[84px]">
                            <div className="text-sm font-bold text-[#0F1115]">
                              ₹{Math.round(item.unitPriceInr * item.quantity).toLocaleString('en-IN')}
                            </div>
                            <div className="text-xs text-gray-500">₹{item.unitPriceInr}/pc</div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.uid)}
                            aria-label="Remove item"
                            className="p-1.5 text-gray-400 hover:text-[#DC2626]"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* EXCITING B2B & PROTOTYPING CHECKOUT OFFERS SECTION */}
                  <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0F1115]">
                        <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
                        B2B & Prototyping Offers (Select or Enter Code)
                      </div>
                      {appliedCoupon && (
                        <button
                          type="button"
                          onClick={() => {
                            removeCoupon();
                            setCouponFeedback(null);
                          }}
                          className="text-xs font-semibold text-[#DC2626] hover:underline"
                        >
                          Remove {appliedCoupon.code}
                        </button>
                      )}
                    </div>

                    {/* Manual Code Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        placeholder="Enter coupon code (e.g. PROTO10, RNDKIT1000)"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-mono uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleManualPromoSubmit}
                        className="px-4 py-2 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>

                    {couponFeedback && (
                      <div
                        className={`text-xs font-medium px-3 py-2 rounded-lg ${
                          couponFeedback.ok
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        {couponFeedback.text}
                      </div>
                    )}

                    {/* 4 Interactive Coupon Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {couponEvaluations.map(({ coupon, isEligible, reasonText }) => {
                        const isApplied = appliedCoupon?.code === coupon.code;
                        return (
                          <div
                            key={coupon.code}
                            className={`rounded-lg border p-3 bg-white flex flex-col justify-between transition-all ${
                              isApplied
                                ? 'border-[#DC2626] ring-1 ring-[#DC2626]'
                                : isEligible
                                ? 'border-gray-300 hover:border-[#0F1115]'
                                : 'border-gray-200 opacity-75'
                            }`}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0F1115] text-white">
                                  {coupon.code}
                                </span>
                                <span className="text-[11px] font-semibold text-[#DC2626]">
                                  {coupon.badge}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-[#0F1115] pt-0.5">
                                {coupon.title}
                              </div>
                              <p className="text-[11px] text-gray-500 leading-snug">
                                {coupon.description}
                              </p>
                            </div>

                            <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex items-center justify-between gap-2">
                              <span
                                className={`text-[11px] font-medium ${
                                  isEligible ? 'text-emerald-700' : 'text-gray-500'
                                }`}
                              >
                                {reasonText}
                              </span>
                              {isApplied ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626] shrink-0">
                                  <Check className="w-3.5 h-3.5" /> Applied
                                </span>
                              ) : (
                                <button
                                  type="button"
                                  disabled={!isEligible}
                                  onClick={() => {
                                    const res = applyCouponCode(coupon.code);
                                    setCouponFeedback({ ok: res.ok, text: res.message });
                                  }}
                                  className={`px-2.5 py-1 rounded text-xs font-bold shrink-0 ${
                                    isEligible
                                      ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
                                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  }`}
                                >
                                  Apply
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Optional CAD Attachment in Checkout */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-700">
                        Custom CAD / Drawing Attachment (Optional for Kits & Std Sizes)
                      </span>
                      {attachedCadFile && (
                        <button
                          type="button"
                          onClick={() => setAttachedCadFile(null)}
                          className="text-xs text-[#DC2626] hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div
                      onClick={() => fileInputCheckoutRef.current?.click()}
                      className="border border-dashed border-gray-300 hover:border-[#DC2626] rounded-lg p-3 bg-[#F7F8FA] cursor-pointer flex items-center justify-between gap-3"
                    >
                      <input
                        ref={fileInputCheckoutRef}
                        type="file"
                        accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Upload className="w-4 h-4 text-[#DC2626] shrink-0" />
                        <span className="text-xs text-gray-700 truncate font-medium">
                          {attachedCadFile
                            ? `${attachedCadFile.name} (${(attachedCadFile.size / 1024).toFixed(1)} KB)`
                            : 'Attach .DXF, .STEP, .PDF drawing or .ZIP package'}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#DC2626] shrink-0">Browse</span>
                    </div>
                  </div>

                  {/* Clean Pricing & Tax Summary */}
                  <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4 space-y-2 text-sm tabular-nums">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Merchandise Subtotal:</span>
                      <span className="font-semibold text-[#0F1115]">
                        ₹{subtotalInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Steel-Die / Mold Tooling NRE:</span>
                      <span className="font-semibold text-emerald-700">₹0 (Waived)</span>
                    </div>
                    {appliedCoupon && couponDiscountInr > 0 && (
                      <div className="flex justify-between text-emerald-700 font-semibold">
                        <span>Coupon Discount ({appliedCoupon.code}):</span>
                        <span>- ₹{couponDiscountInr.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-600">
                      <span>GST (18%):</span>
                      <span>₹{gstInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-2.5 flex justify-between text-base font-bold text-[#0F1115]">
                      <span>Total Payable:</span>
                      <span className="text-[#DC2626]">
                        ₹{grandTotalInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Buyer Details Form */}
                  <form
                    onSubmit={handlePlaceOrder}
                    className="bg-white border border-gray-200 rounded-lg p-5 space-y-4"
                  >
                    <h3 className="text-sm font-bold text-[#0F1115]">
                      Delivery & Billing Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Your Name"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Company / Lab (Optional for B2C)
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="Company, Startup, or Individual"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="name@domain.com"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Buyer GSTIN (Optional for B2B Input Credit)
                        </label>
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                          placeholder="24AAAAA0000A1Z5"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Payment / PO Mode *
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm"
                        >
                          <option value="UPI / Purchase Card Link (Express <₹15,000 Dispatch)">
                            UPI / Card Link (&lt;₹15k Express)
                          </option>
                          <option value="GST Proforma Invoice — NEFT / RTGS">
                            GST Proforma Invoice — NEFT / RTGS
                          </option>
                          <option value="Corporate / PSU Formal Purchase Order">
                            Corporate / PSU Purchase Order
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Shipping Address & PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Street, Industrial Area / Campus, City, State – PIN"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Special Converting / Order Notes
                      </label>
                      <textarea
                        rows={2}
                        value={engineeringNotes}
                        onChange={(e) => setEngineeringNotes(e.target.value)}
                        placeholder="Optional tolerance, adhesive, or delivery notes..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {submitting
                        ? 'Submitting Order...'
                        : `Place Order — ₹${grandTotalInr.toLocaleString('en-IN')} →`}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                      <ShieldCheck className="w-4 h-4 text-[#0F1115] shrink-0" />
                      <span>Routes directly to {COMPANY_INFO.routingEmail} • 24–48h Dispatch</span>
                    </div>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
