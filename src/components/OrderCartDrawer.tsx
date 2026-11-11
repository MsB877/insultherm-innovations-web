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
  Sparkles,
} from 'lucide-react';
import { useOrderCart } from '../context/OrderCartContext';
import { COMPANY_INFO, PRODUCTS, RND_KITS, PRO_BENCH_PACKS } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS, ProductSlugId } from '../utils/pricingEngine';

const FINISH_OPTIONS = [
  'Through-Cut Individual Parts (Std ±0.15 mm)',
  'Kiss-Cut on Release Liner Roll/Sheet (Fast Line Peel)',
  '50%-Depth Living-Hinge Origami Score (Shield™ 3D Fold)',
  '1.5 mm Kapton® Edge-Seal Overhang (Graphite-Flex™ HV)',
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
    subtotalInr,
    gstInr,
    grandTotalInr,
  } = useOrderCart();

  // Configurator Tab State
  const [selectedProdId, setSelectedProdId] = useState<ProductSlugId>(preselectedProductId);
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(100);
  const [qty, setQty] = useState<number>(10);
  const [thicknessMm, setThicknessMm] = useState<number>(0.24);
  const [gradeSku, setGradeSku] = useState<string>('GFlex-1000');
  const [finishOption, setFinishOption] = useState<string>(FINISH_OPTIONS[0]);
  const [geometrySource, setGeometrySource] = useState<'cad' | 'rect'>('cad');

  // Checkout Form State
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gstin, setGstin] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(
    'Instant UPI / Lab Purchase Card Link (Express <₹15,000 Dispatch)'
  );
  const [engineeringNotes, setEngineeringNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedOrderRef, setSubmittedOrderRef] = useState<string | null>(null);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    itemsManifest: string;
    total: number;
    subtotal: number;
    gst: number;
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
        cadFileName: geometrySource === 'cad' ? attachedCadFile?.name || 'CAD to follow / attached' : 'Standard Rectangular Cut',
      },
      true
    );
  };

  const buildManifestString = () =>
    items
      .map(
        (it, idx) =>
          `${idx + 1}. [${it.sku}] ${it.title} | ${it.dimensionsLabel} | Qty: ${it.quantity} × ₹${it.unitPriceInr.toLocaleString('en-IN')} = ₹${Math.round(
            it.unitPriceInr * it.quantity
          ).toLocaleString('en-IN')} (${it.formulaNote})${
            it.cadFileName ? ` | CAD: ${it.cadFileName}` : ''
          }`
      )
      .join('\n');

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    const orderRef = `ORD-IT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const manifest = buildManifestString();
    const cadName = attachedCadFile ? `${attachedCadFile.name} (${(attachedCadFile.size / 1024).toFixed(1)} KB)` : 'None (Standard Dimensions / SKU)';

    try {
      // 1. Netlify Multipart Submission (captures actual binary CAD file on insultherminnovations.netlify.app)
      const netlifyData = new FormData();
      netlifyData.append('form-name', 'insultherm-direct-order');
      netlifyData.append('order_reference', orderRef);
      netlifyData.append('route_to_email', COMPANY_INFO.routingEmail);
      netlifyData.append('buyer_name', buyerName);
      netlifyData.append('company_name', companyName);
      netlifyData.append('work_email', workEmail);
      netlifyData.append('phone', phone);
      netlifyData.append('gstin', gstin || 'Not Provided');
      netlifyData.append('shipping_address', shippingAddress);
      netlifyData.append('payment_method', paymentMethod);
      netlifyData.append('order_subtotal_inr', `₹${subtotalInr.toLocaleString('en-IN')}`);
      netlifyData.append('order_gst_inr', `₹${gstInr.toLocaleString('en-IN')}`);
      netlifyData.append('order_total_inr', `₹${grandTotalInr.toLocaleString('en-IN')}`);
      netlifyData.append('line_items_manifest', manifest);
      netlifyData.append('engineering_notes', engineeringNotes || 'Standard 24–48h CNC dispatch requested.');
      if (attachedCadFile) {
        netlifyData.append('cad_attachment', attachedCadFile);
      }

      await fetch('/', {
        method: 'POST',
        body: netlifyData,
      }).catch(() => null);

      // 2. Direct Multipart / AJAX Delivery to manavsb9719@gmail.com via FormSubmit
      const fsData = new FormData();
      fsData.append('_subject', `[InsulTherm Direct Order ${orderRef}] ₹${grandTotalInr.toLocaleString('en-IN')} — ${companyName}`);
      fsData.append('_template', 'table');
      fsData.append('_captcha', 'false');
      fsData.append('Order_Reference', orderRef);
      fsData.append('Buyer_Name', buyerName);
      fsData.append('Company_Organization', companyName);
      fsData.append('Buyer_Email', workEmail);
      fsData.append('Phone', phone);
      fsData.append('GSTIN', gstin || 'B2B Unregistered / R&D Petty Cash');
      fsData.append('Shipping_Address', shippingAddress);
      fsData.append('Payment_Mode', paymentMethod);
      fsData.append('Subtotal_INR', `Rs. ${subtotalInr.toLocaleString('en-IN')}`);
      fsData.append('GST_18_Percent', `Rs. ${gstInr.toLocaleString('en-IN')}`);
      fsData.append('Grand_Total_INR', `Rs. ${grandTotalInr.toLocaleString('en-IN')}`);
      fsData.append('Attached_CAD_File_Summary', cadName);
      fsData.append('Order_Line_Items', manifest);
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
        total: grandTotalInr,
        subtotal: subtotalInr,
        gst: gstInr,
        cadName,
      });
      setSubmittedOrderRef(orderRef);
      setSubmitting(false);
      clearCart();
    }
  };

  const handlePrintOrder = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-[#14171A]/75 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#FBFBF9] h-full shadow-2xl border-l border-[#E2E0D8] flex flex-col overflow-hidden">
        {/* Chromatic Top Accent */}
        <div className="h-1.5 w-full brand-chromatic-bar shrink-0" />

        {/* Drawer Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E2E0D8] flex items-center justify-between gap-3 shrink-0">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#E04819] font-semibold">
              Zero-Tooling Direct Purchase & Custom CAD Desk
            </div>
            <h2 className="text-lg sm:text-xl font-display font-bold text-[#14171A]">
              InsulTherm® Engineering Order & CAD Upload
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setSubmittedOrderRef(null);
              closeDrawer();
            }}
            aria-label="Close Order Desk"
            className="p-2 rounded border border-[#E2E0D8] hover:bg-[#14171A] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher Tabs */}
        {!submittedOrderRef && (
          <div className="grid grid-cols-2 bg-[#F6F5F1] border-b border-[#E2E0D8] p-1.5 gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab('configure')}
              className={`py-2.5 px-3 rounded text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'configure'
                  ? 'bg-[#14171A] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              <Sliders className="w-4 h-4 text-[#E04819]" />
              1. Configure Custom Part / CAD
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('checkout')}
              className={`py-2.5 px-3 rounded text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'checkout'
                  ? 'bg-[#E04819] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              2. Review & Place Order ({items.length})
            </button>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {submittedOrderRef && submittedSnapshot ? (
            /* ORDER SUCCESS RECEIPT */
            <div className="bg-white border border-[#E2E0D8] rounded-md p-6 space-y-5">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                    Order Logged & Routed to Sanand CNC Desk
                  </span>
                  <h3 className="text-2xl font-display font-bold text-[#14171A] mt-0.5">
                    Order Reference: {submittedOrderRef}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Dispatched to <strong className="font-mono text-[#14171A]">{COMPANY_INFO.routingEmail}</strong> (cc:{' '}
                    <span className="font-mono">{COMPANY_INFO.officialEmail}</span>). Our CAM team verifies CAD tolerances and issues your GST Proforma / UPI payment link within 2–4 business hours.
                  </p>
                </div>
              </div>

              <div className="bg-[#F6F5F1] border border-[#E2E0D8] rounded p-4 font-mono text-xs space-y-2">
                <div className="font-bold text-[#14171A] border-b border-[#E2E0D8] pb-1.5">
                  ITEMIZED MANUFACTURING MANIFEST
                </div>
                <pre className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {submittedSnapshot.itemsManifest}
                </pre>
                <div className="border-t border-[#E2E0D8] pt-2 flex flex-col gap-1 text-slate-800">
                  <div className="flex justify-between">
                    <span>Merchandise & CNC Subtotal (₹0 NRE):</span>
                    <span>₹{submittedSnapshot.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{submittedSnapshot.gst.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm text-[#E04819]">
                    <span>Total Order Value:</span>
                    <span>₹{submittedSnapshot.total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 pt-1">
                    CAD Attachment: {submittedSnapshot.cadName}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handlePrintOrder}
                  className="py-2.5 px-4 rounded border border-[#14171A] text-[#14171A] hover:bg-[#14171A] hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save Requisition PDF
                </button>
                <a
                  href={`mailto:${COMPANY_INFO.routingEmail}?cc=${COMPANY_INFO.officialEmail}&subject=${encodeURIComponent(
                    `[${submittedOrderRef}] Direct Order Confirmation — ${companyName}`
                  )}&body=${encodeURIComponent(
                    `Order Ref: ${submittedOrderRef}\nBuyer: ${buyerName} (${companyName})\nPhone: ${phone}\nPayment Mode: ${paymentMethod}\nTotal (incl. GST): Rs. ${submittedSnapshot.total.toLocaleString('en-IN')}\nCAD File: ${submittedSnapshot.cadName}\n\nManifest:\n${submittedSnapshot.itemsManifest}`
                  )}`}
                  className="py-2.5 px-4 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Instant Email Copy + Attach CAD
                </a>
              </div>
            </div>
          ) : activeTab === 'configure' ? (
            /* TAB 1: CUSTOM PART AREA CALCULATOR + CAD UPLOADER */
            <div className="space-y-5">
              {/* Material Selector */}
              <div className="bg-white border border-[#E2E0D8] rounded-md p-4 space-y-3">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Step 1 — Select InsulTherm® Material Platform
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleProductSwitch(p.id)}
                      className={`text-left p-2.5 rounded border transition-all ${
                        selectedProdId === p.id
                          ? 'border-[#E04819] bg-[#FFF3EE]'
                          : 'border-[#E2E0D8] bg-[#FBFBF9] hover:border-slate-400'
                      }`}
                    >
                      <div className="text-[10px] font-mono uppercase text-[#E04819] font-bold">
                        {p.subBrandCode}
                      </div>
                      <div className="text-xs font-bold text-[#14171A]">{p.trademarkName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{p.protoPriceLabel}</div>
                    </button>
                  ))}
                </div>

                {/* Grade & Thickness */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Grade / SKU</label>
                    <select
                      value={gradeSku}
                      onChange={(e) => setGradeSku(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-[#E2E0D8] bg-white text-xs font-medium text-[#14171A]"
                    >
                      {activeModel.gradeOptions.map((g) => (
                        <option key={g.sku} value={g.sku}>
                          {g.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Thickness</label>
                    <select
                      value={thicknessMm}
                      onChange={(e) => setThicknessMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-[#E2E0D8] bg-white text-xs font-medium text-[#14171A]"
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

              {/* Step 2: Upload Custom CAD File OR Standard Rectangle */}
              <div className="bg-white border border-[#E2E0D8] rounded-md p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Step 2 — Custom CAD File Upload (.DXF / .STEP / .PDF)
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setGeometrySource('cad')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                        geometrySource === 'cad'
                          ? 'bg-[#14171A] text-white'
                          : 'bg-[#F6F5F1] text-slate-600'
                      }`}
                    >
                      Custom CAD Cut
                    </button>
                    <button
                      type="button"
                      onClick={() => setGeometrySource('rect')}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                        geometrySource === 'rect'
                          ? 'bg-[#14171A] text-white'
                          : 'bg-[#F6F5F1] text-slate-600'
                      }`}
                    >
                      Simple L×W Rectangle
                    </button>
                  </div>
                </div>

                {geometrySource === 'cad' && (
                  <div
                    onClick={() => fileInputConfigRef.current?.click()}
                    className="border-2 border-dashed border-[#E04819]/50 hover:border-[#E04819] bg-[#FFF3EE]/50 rounded-md p-4 text-center cursor-pointer transition-colors"
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
                          <FileCode2 className="w-6 h-6 text-[#E04819] shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-[#14171A] truncate">
                              {attachedCadFile.name}
                            </div>
                            <div className="text-[11px] font-mono text-emerald-700">
                              {(attachedCadFile.size / 1024).toFixed(1)} KB • Attached for CNC Nesting
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-semibold text-[#E04819] shrink-0 underline">
                          Replace File
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-[#E04819] mx-auto" />
                        <div className="text-xs font-bold text-[#14171A]">
                          Click to Upload Custom .DXF, .STEP, .IGES, .DWG, .PDF or .ZIP
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Enter bounding-box Length × Width below for instant area pricing (₹0 Tooling NRE)
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bounding Box Dimensions + Quantity */}
                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">
                      Length (mm)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={lengthMm}
                      onChange={(e) => setLengthMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">
                      Width (mm)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={widthMm}
                      onChange={(e) => setWidthMm(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-600 mb-1">
                      Quantity (pcs)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100000}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-600 mb-1">
                    CNC Converting / Liner Finish
                  </label>
                  <select
                    value={finishOption}
                    onChange={(e) => setFinishOption(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-[#E2E0D8] bg-white text-xs font-medium text-[#14171A]"
                  >
                    {FINISH_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Transparent Area Price Breakdown Box */}
              <div className="bg-[#14171A] text-white rounded-md p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>{liveCalc.tierName}</span>
                  <span>Part Area: {liveCalc.areaCm2} cm²</span>
                </div>
                <div className="grid grid-cols-3 gap-3 border-y border-slate-800 py-3">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Unit Price</div>
                    <div className="text-xl font-mono font-bold text-white">
                      ₹{liveCalc.unitPriceInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">Effective Rate</div>
                    <div className="text-base font-mono font-bold text-emerald-400">
                      ₹{liveCalc.effectiveRatePerCm2}/cm²
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-400">
                      Line Subtotal ({qty} pcs)
                    </div>
                    <div className="text-xl font-mono font-bold text-[#E04819]">
                      ₹{liveCalc.lineSubtotalInr.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-300 leading-relaxed">
                  Formula: {liveCalc.formulaExplanation} • Steel-Die NRE: ₹0 (Saves ₹40,000)
                </div>
                <button
                  type="button"
                  onClick={handleAddConfiguredPart}
                  className="w-full py-3 px-4 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Custom Part to Order & Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            /* TAB 2: REVIEW ORDER CART + ATTACH CAD + DIRECT PURCHASE FORM */
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="bg-white border border-[#E2E0D8] rounded-md p-6 text-center space-y-4">
                  <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                  <div>
                    <h3 className="text-base font-display font-bold text-[#14171A]">
                      Your Engineering Order Cart is Empty
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Configure a custom area-priced CAD part or add a ready-to-ship R&D Kit / Pro-Bench Pack below:
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('configure')}
                    className="py-2.5 px-4 rounded bg-[#14171A] hover:bg-[#E04819] text-white text-xs font-semibold transition-colors"
                  >
                    + Configure Custom CAD Part (Any L × W mm)
                  </button>

                  <div className="pt-3 border-t border-[#E2E0D8] text-left space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                      1-Click Quick-Add Express SKUs:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {RND_KITS.slice(0, 2).map((kit) => (
                        <button
                          key={kit.id}
                          type="button"
                          onClick={() =>
                            addItem({
                              sku: kit.sku,
                              title: kit.name,
                              itemType: 'kit-bundle',
                              dimensionsLabel: 'Turnkey R&D Kit (<₹15k Petty-Cash)',
                              unitPriceInr: kit.priceInr,
                              quantity: 1,
                              formulaNote: `${kit.leadTime} • Includes CoC`,
                            })
                          }
                          className="p-2.5 rounded border border-[#E2E0D8] hover:border-[#E04819] bg-[#FBFBF9] text-left"
                        >
                          <div className="text-xs font-bold text-[#14171A] line-clamp-1">{kit.name}</div>
                          <div className="text-xs font-mono text-[#E04819] font-semibold mt-0.5">
                            + Add @ {kit.priceLabel}
                          </div>
                        </button>
                      ))}
                      {PRO_BENCH_PACKS.slice(0, 2).map((pack) => (
                        <button
                          key={pack.id}
                          type="button"
                          onClick={() =>
                            addItem({
                              sku: pack.sku,
                              title: pack.name,
                              itemType: 'pro-bench',
                              dimensionsLabel: pack.packCountLabel,
                              unitPriceInr: pack.priceInr,
                              quantity: 1,
                              formulaNote: `${pack.brandLine} • Off-the-Shelf`,
                            })
                          }
                          className="p-2.5 rounded border border-[#E2E0D8] hover:border-emerald-600 bg-[#FBFBF9] text-left"
                        >
                          <div className="text-xs font-bold text-[#14171A] line-clamp-1">{pack.name}</div>
                          <div className="text-xs font-mono text-emerald-700 font-semibold mt-0.5">
                            + Add @ ₹{pack.priceInr}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Line Items */}
                  <div className="bg-white border border-[#E2E0D8] rounded-md divide-y divide-[#E2E0D8]">
                    <div className="px-4 py-2.5 bg-[#F6F5F1] flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider font-semibold text-slate-600">
                        Order Line Items ({items.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('configure')}
                        className="text-xs font-semibold text-[#E04819] hover:underline"
                      >
                        + Add Another Custom Part
                      </button>
                    </div>

                    {items.map((item) => (
                      <div key={item.uid} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#14171A] text-white font-semibold">
                              {item.sku}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-[#14171A]">
                              {item.title}
                            </span>
                          </div>
                          <div className="text-xs font-mono text-slate-600">{item.dimensionsLabel}</div>
                          <div className="text-[11px] text-slate-500">{item.formulaNote}</div>
                          {item.finishOption && (
                            <div className="text-[11px] text-[#E04819] font-medium">
                              Finish: {item.finishOption}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <div className="flex items-center border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.uid, item.quantity - 1)}
                              className="p-1.5 hover:bg-slate-200 text-slate-700"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              min={1}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(item.uid, Math.max(1, Number(e.target.value) || 1))
                              }
                              className="w-14 text-center text-xs font-mono font-bold bg-transparent focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.uid, item.quantity + 1)}
                              className="p-1.5 hover:bg-slate-200 text-slate-700"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-right min-w-[82px]">
                            <div className="text-sm font-mono font-bold text-[#14171A]">
                              ₹{Math.round(item.unitPriceInr * item.quantity).toLocaleString('en-IN')}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">
                              ₹{item.unitPriceInr}/pc
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.uid)}
                            aria-label="Remove item"
                            className="p-1.5 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Master CAD Upload Box in Checkout */}
                  <div className="bg-white border border-[#E2E0D8] rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold">
                        Attach Custom CAD / Drawing Package (Optional for Std SKUs)
                      </span>
                      {attachedCadFile && (
                        <button
                          type="button"
                          onClick={() => setAttachedCadFile(null)}
                          className="text-[11px] text-red-600 hover:underline"
                        >
                          Remove File
                        </button>
                      )}
                    </div>
                    <div
                      onClick={() => fileInputCheckoutRef.current?.click()}
                      className="border border-dashed border-slate-300 hover:border-[#E04819] rounded p-3 bg-[#FBFBF9] cursor-pointer flex items-center justify-between gap-3"
                    >
                      <input
                        ref={fileInputCheckoutRef}
                        type="file"
                        accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Upload className="w-4 h-4 text-[#E04819] shrink-0" />
                        <span className="text-xs text-slate-700 truncate font-medium">
                          {attachedCadFile
                            ? `${attachedCadFile.name} (${(attachedCadFile.size / 1024).toFixed(1)} KB)`
                            : 'Upload .DXF, .STEP, .IGES, .PDF drawing or .ZIP bundle'}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#E04819] shrink-0">Browse</span>
                    </div>
                  </div>

                  {/* GST & Totals Summary */}
                  <div className="bg-[#F6F5F1] border border-[#E2E0D8] rounded-md p-4 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal (Parts & Digital CNC Nesting):</span>
                      <span>₹{subtotalInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Custom Steel-Die / Mold NRE Fee:</span>
                      <span>₹0 (Waived)</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST @ 18% (B2B Input Credit Eligible):</span>
                      <span>₹{gstInr.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="border-t border-[#E2E0D8] pt-2 flex justify-between text-base font-bold text-[#14171A]">
                      <span>Total Order Value:</span>
                      <span className="text-[#E04819]">₹{grandTotalInr.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {/* Buyer & Dispatch Form */}
                  <form onSubmit={handlePlaceOrder} className="bg-white border border-[#E2E0D8] rounded-md p-5 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#14171A] font-bold">
                      <Sparkles className="w-4 h-4 text-[#E04819]" />
                      Dispatch & Payment Details (Routes to {COMPANY_INFO.routingEmail})
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Buyer / Engineer Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="e.g. Rohan Kulkarni"
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Company / Lab / Team *
                        </label>
                        <input
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. VoltGrid Energy Pvt Ltd"
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Official Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="rohan@company.in"
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Direct Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Buyer GSTIN (Optional for B2B Tax Credit)
                        </label>
                        <input
                          type="text"
                          value={gstin}
                          onChange={(e) => setGstin(e.target.value.toUpperCase())}
                          placeholder="24AAAAA0000A1Z5"
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Preferred Payment / PO Mode *
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 rounded border border-[#E2E0D8] bg-white text-xs font-medium"
                        >
                          <option value="Instant UPI / Lab Purchase Card Link (Express <₹15,000 Dispatch)">
                            Instant UPI / Card Payment Link (&lt;₹15k Express)
                          </option>
                          <option value="GST Proforma Invoice — 100% Advance NEFT / RTGS">
                            GST Proforma Invoice — NEFT / RTGS
                          </option>
                          <option value="Corporate / Defense PSU Formal Purchase Order (PO)">
                            Corporate / PSU Formal Purchase Order
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Delivery Address & PIN Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Plot / Lab Wing, Industrial Area, City, State – PIN"
                        className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tolerance / Adhesive / Special Converting Notes
                      </label>
                      <textarea
                        rows={2}
                        value={engineeringNotes}
                        onChange={(e) => setEngineeringNotes(e.target.value)}
                        placeholder="e.g. Maintain 1.5 mm Kapton overhang on outer perimeter; ship in ESD pouch."
                        className="w-full px-3 py-2 rounded border border-[#E2E0D8] text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-5 rounded bg-[#E04819] hover:bg-[#BF360C] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      {submitting
                        ? 'Transmitting Order & CAD Package...'
                        : `Submit Official Order (₹${grandTotalInr.toLocaleString('en-IN')}) →`}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        NDA-Protected CAD Handling • 24–48h Sanand GIDC Dispatch • Zero Tooling NRE
                      </span>
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
