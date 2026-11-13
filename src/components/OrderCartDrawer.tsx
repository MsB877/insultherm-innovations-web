import React, { useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  CreditCard,
  Download,
  Loader2,
  Lock,
  Mail,
  Minus,
  Plus,
  Printer,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS, RND_KITS } from '../data/companyData';
import {
  calculatePartPrice,
  PRICING_MODELS,
  ProductSlugId,
} from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';
import { CadFileUploadBox } from './CadFileUploadBox';
import {
  clampDimensionMm,
  clampQuantityPcs,
  sanitizeGstinInput,
  sanitizeIndianMobile10,
  sanitizePinCode,
  validateCadFile,
  validateCityAddress,
  validateEmailStrict,
  validateIndianGstin,
  validateIndianMobile10,
  validateIndianPinCode,
  validateOrganizationName,
  validatePersonName,
} from '../utils/validation';
import {
  buildBrandedOrderConfirmationHtml,
  ConfirmedOrderSnapshot,
  fetchLogoDataUri,
  numberToIndianRupeesWords,
  resolveGujaratTaxSplit,
} from '../utils/orderReceiptGenerator';

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

  // Checkout buyer details with strict Indian B2B/B2C constraints
  const [buyerType, setBuyerType] = useState<'b2b' | 'individual'>('b2b');
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [buyerMobile10, setBuyerMobile10] = useState('');
  const [gstin, setGstin] = useState('');
  const [noGstinB2b, setNoGstinB2b] = useState(false);
  const [cityAddress, setCityAddress] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [paymentMode, setPaymentMode] = useState(
    'Instant Proforma Invoice (UPI / NEFT / Corporate Card)'
  );
  const [notes, setNotes] = useState('');
  const [verifiedDetailsChecked, setVerifiedDetailsChecked] = useState(false);

  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confirmedSnapshot, setConfirmedSnapshot] =
    useState<ConfirmedOrderSnapshot | null>(null);
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

  const safeLen = clampDimensionMm(lenMm, 100);
  const safeWid = clampDimensionMm(widMm, 100);
  const safeQty = clampQuantityPcs(qty, 1);

  const quickModel = PRICING_MODELS[prodId];
  const quickProduct = PRODUCTS.find((p) => p.id === prodId) || PRODUCTS[0];
  const quickQuote = calculatePartPrice({
    productId: prodId,
    lengthMm: safeLen,
    widthMm: safeWid,
    quantity: safeQty,
    thicknessMm: thkMm,
    gradeSku: sku,
  });

  const handleQuickAdd = () => {
    setLenMm(safeLen);
    setWidMm(safeWid);
    setQty(safeQty);
    addItem(
      {
        sku,
        productId: prodId,
        title: `${quickProduct.trademarkName} — Custom Part`,
        itemType: 'custom-cad',
        dimensionsLabel: `${safeLen} × ${safeWid} × ${thkMm} mm (${quickQuote.areaCm2} cm²)`,
        lengthMm: safeLen,
        widthMm: safeWid,
        thicknessMm: thkMm,
        areaCm2: quickQuote.areaCm2,
        unitPriceInr: quickQuote.unitPriceInr,
        quantity: safeQty,
        formulaNote: quickQuote.formulaExplanation,
        cadFileName: attachedCadFile ? attachedCadFile.name : undefined,
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

  // Live field validations
  const nameCheck = validatePersonName(buyerName);
  const orgCheck = validateOrganizationName(companyName, buyerType === 'b2b');
  const emailCheck = validateEmailStrict(buyerEmail);
  const emailsMatch =
    emailCheck.valid &&
    confirmEmail.trim().toLowerCase() === buyerEmail.trim().toLowerCase();
  const mobileCheck = validateIndianMobile10(buyerMobile10);
  const gstRequired = buyerType === 'b2b' && !noGstinB2b;
  const gstCheck = validateIndianGstin(gstin, gstRequired);
  const cityCheck = validateCityAddress(cityAddress);
  const pinCheck = validateIndianPinCode(pinCode);
  const cadCheck = validateCadFile(attachedCadFile);

  const liveTaxSplit = resolveGujaratTaxSplit(gstin, pinCode, gstInr);

  const isFormCompletelyValid =
    nameCheck.valid &&
    orgCheck.valid &&
    emailCheck.valid &&
    emailsMatch &&
    mobileCheck.valid &&
    gstCheck.valid &&
    cityCheck.valid &&
    pinCheck.valid &&
    cadCheck.valid &&
    verifiedDetailsChecked;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttemptedSubmit(true);
    setSubmitErr(null);

    if (items.length === 0) return;

    if (!isFormCompletelyValid) {
      setSubmitErr(
        'Please resolve the highlighted validation fields above before placing your order.'
      );
      return;
    }

    setSubmitting(true);

    const now = new Date();
    const dateCode = `${String(now.getFullYear()).slice(-2)}${String(
      now.getMonth() + 1
    ).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    const refId = `IT-${dateCode}-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestampIst = now.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    }) + ' IST';

    const cleanEmail = buyerEmail.trim().toLowerCase();
    const formattedPhone = `+91 ${buyerMobile10.slice(0, 5)} ${buyerMobile10.slice(5)}`;
    const cleanGstin = noGstinB2b ? '' : sanitizeGstinInput(gstin);
    const amountWords = numberToIndianRupeesWords(grandTotalInr);
    const cadSizeLabel = attachedCadFile
      ? attachedCadFile.size >= 1024 * 1024
        ? `${(attachedCadFile.size / (1024 * 1024)).toFixed(2)} MB`
        : `${Math.max(1, Math.round(attachedCadFile.size / 1024))} KB`
      : null;

    const snapshot: ConfirmedOrderSnapshot = {
      orderRef: refId,
      timestampIst,
      buyerType,
      buyerName: buyerName.trim(),
      companyName: companyName.trim(),
      buyerEmail: cleanEmail,
      buyerMobileFormatted: formattedPhone,
      gstin: cleanGstin,
      gstStateLabel: liveTaxSplit.gstStateLabel,
      isIntraStateGujarat: liveTaxSplit.isIntraStateGujarat,
      cityAddress: cityAddress.trim(),
      pinCode: pinCode.trim(),
      paymentMode,
      notes: notes.trim(),
      cadFileName: attachedCadFile ? attachedCadFile.name : null,
      cadFileSizeLabel: cadSizeLabel,
      items: [...items],
      subtotalInr,
      appliedCouponCode: appliedCoupon ? appliedCoupon.code : null,
      couponDiscountInr,
      netTaxableInr,
      gstInr,
      cgstInr: liveTaxSplit.cgstInr,
      sgstInr: liveTaxSplit.sgstInr,
      igstInr: liveTaxSplit.igstInr,
      grandTotalInr,
      amountInWords: amountWords,
      orderDeskEmail: COMPANY_INFO.routingEmail,
    };

    const buildFormSubmitPayload = (includeCc: boolean) => {
      const fd = new FormData();
      fd.append(
        '_subject',
        `InsulTherm Innovations — Order Confirmation #${refId} (₹${grandTotalInr.toLocaleString(
          'en-IN'
        )} | ${snapshot.companyName || snapshot.buyerName})`
      );
      fd.append('_template', 'box');
      fd.append('_captcha', 'false');
      if (includeCc) {
        fd.append('_cc', cleanEmail);
      }

      fd.append(
        'InsulTherm_Innovations',
        'Official Order & Proforma Summary • Block C-14, Sanand GIDC, Ahmedabad – 382110'
      );
      fd.append('Order_Reference_ID', refId);
      fd.append('Order_Timestamp', timestampIst);
      fd.append(
        'Customer_Category',
        buyerType === 'b2b' ? 'B2B / OEM / Corporate R&D Lab' : 'Individual Prototyper / Researcher'
      );
      fd.append('Customer_Full_Name', snapshot.buyerName);
      fd.append(
        'Company_Or_Institution',
        snapshot.companyName || 'Individual / Direct Prototyping'
      );
      // Lowercase `email` sets FormSubmit Reply-To directly to customer
      fd.append('email', cleanEmail);
      fd.append('Mobile_India_Verified', formattedPhone);
      fd.append(
        'Customer_GSTIN',
        cleanGstin
          ? `${cleanGstin} (${liveTaxSplit.gstStateLabel})`
          : 'Unregistered / Petty-Cash / B2C'
      );
      fd.append(
        'Dispatch_City_And_PIN',
        `${snapshot.cityAddress} — PIN ${snapshot.pinCode}`
      );
      fd.append('Procurement_Payment_Mode', paymentMode);

      // Each line item gets its own dedicated structured row for effortless reading
      snapshot.items.forEach((it, idx) => {
        const lineSub = Math.round(it.unitPriceInr * it.quantity);
        const tierLabel =
          it.itemType === 'custom-cad'
            ? it.quantity >= 500
              ? 'Blanket (500+)'
              : it.quantity >= 100
              ? 'Pilot (100–499)'
              : 'Prototype (1–99)'
            : 'Turnkey Kit';
        fd.append(
          `Order_Item_${String(idx + 1).padStart(2, '0')}`,
          `[${it.sku}] ${it.title} | ${it.dimensionsLabel} | Tier: ${tierLabel} | Qty: ${
            it.quantity
          } pcs × ₹${it.unitPriceInr.toLocaleString('en-IN')} = ₹${lineSub.toLocaleString(
            'en-IN'
          )}`
        );
      });

      fd.append('Gross_Items_Subtotal', `₹${subtotalInr.toLocaleString('en-IN')}`);
      fd.append(
        'Applied_Offer_Coupon',
        appliedCoupon
          ? `${appliedCoupon.code} (-₹${couponDiscountInr.toLocaleString('en-IN')})`
          : 'None'
      );
      fd.append('Custom_Tooling_Die_NRE', '₹0 (100% Digital Oscillating-Knife CNC)');
      fd.append('Net_Taxable_Amount', `₹${netTaxableInr.toLocaleString('en-IN')}`);
      if (liveTaxSplit.isIntraStateGujarat) {
        fd.append(
          'GST_Breakdown_18_Percent',
          `CGST 9%: ₹${liveTaxSplit.cgstInr.toLocaleString(
            'en-IN'
          )} + SGST 9%: ₹${liveTaxSplit.sgstInr.toLocaleString(
            'en-IN'
          )} (Intra-State Gujarat)`
        );
      } else {
        fd.append(
          'GST_Breakdown_18_Percent',
          `IGST 18%: ₹${liveTaxSplit.igstInr.toLocaleString(
            'en-IN'
          )} (Inter-State Supply — HSN 3919 / 6814 / 8546)`
        );
      }
      fd.append(
        'Total_Payable_Estimate',
        `₹${grandTotalInr.toLocaleString('en-IN')} (${amountWords})`
      );
      fd.append(
        'Attached_CAD_Drawing',
        attachedCadFile
          ? `${attachedCadFile.name} (${cadSizeLabel})`
          : 'None (Standard Dimension Spec)'
      );
      fd.append(
        'Engineering_Notes',
        snapshot.notes || 'Standard 24–48h Ex-Works Sanand GIDC Dispatch'
      );
      fd.append('Official_Order_Desk', COMPANY_INFO.routingEmail);

      if (attachedCadFile) {
        fd.append('attachment', attachedCadFile, attachedCadFile.name);
      }
      return fd;
    };

    try {
      // 1. Netlify Multipart Form Backup
      const nf = new FormData();
      nf.append('form-name', 'insultherm-direct-order');
      nf.append('order_reference', refId);
      nf.append('route_to_email', COMPANY_INFO.routingEmail);
      nf.append('buyer_name', snapshot.buyerName);
      nf.append('company_name', snapshot.companyName || 'Individual');
      nf.append('work_email', cleanEmail);
      nf.append('phone', formattedPhone);
      nf.append('gstin', cleanGstin || 'Unregistered');
      nf.append('shipping_address', `${snapshot.cityAddress} - PIN ${snapshot.pinCode}`);
      nf.append('payment_method', paymentMode);
      nf.append('order_subtotal_inr', String(subtotalInr));
      nf.append('applied_coupon', appliedCoupon ? appliedCoupon.code : 'None');
      nf.append('coupon_discount_inr', String(couponDiscountInr));
      nf.append('order_gst_inr', String(gstInr));
      nf.append('order_total_inr', String(grandTotalInr));
      nf.append(
        'line_items_manifest',
        snapshot.items
          .map(
            (it, i) =>
              `${i + 1}. [${it.sku}] ${it.title} | ${it.dimensionsLabel} | Qty ${it.quantity} | ₹${Math.round(
                it.unitPriceInr * it.quantity
              )}`
          )
          .join('\n')
      );
      nf.append('engineering_notes', snapshot.notes);
      if (attachedCadFile) {
        nf.append('cad_attachment', attachedCadFile, attachedCadFile.name);
      }
      await fetch('/', { method: 'POST', body: nf }).catch(() => null);

      // 2. Primary FormSubmit Dispatch to manav.sb9719@gmail.com + Customer _cc Copy
      const primaryRes = await fetch(COMPANY_INFO.formSubmitEndpoint, {
        method: 'POST',
        body: buildFormSubmitPayload(true),
        headers: { Accept: 'application/json' },
      });

      const primaryJson = await primaryRes.json().catch(() => ({}));
      const primaryDelivered =
        primaryRes.ok &&
        (primaryJson.success === true || primaryJson.success === 'true');

      // If dotted alias endpoint is awaiting one-time activation click, silently deliver via activated Gmail alias (same Google inbox)
      if (!primaryDelivered && COMPANY_INFO.formSubmitFallbackEndpoint) {
        const fbRes = await fetch(COMPANY_INFO.formSubmitFallbackEndpoint, {
          method: 'POST',
          body: buildFormSubmitPayload(true),
          headers: { Accept: 'application/json' },
        });
        if (!fbRes.ok && !primaryRes.ok) {
          throw new Error('Gateway unreachable');
        }
      }

      setConfirmedSnapshot(snapshot);
      clearCart();
      setAttachedCadFile(null);
      setAttemptedSubmit(false);
    } catch {
      setSubmitErr(
        `Network connection interrupted while contacting gateway. Please click to email ${COMPANY_INFO.routingEmail} directly or retry.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrintOrSavePdf = async () => {
    if (!confirmedSnapshot) return;
    const logoUri = await fetchLogoDataUri();
    const html = buildBrandedOrderConfirmationHtml(confirmedSnapshot, logoUri);
    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(html);
      win.document.close();
      setTimeout(() => {
        win.focus();
        win.print();
      }, 300);
    } else {
      handleDownloadReceiptHtml();
    }
  };

  const handleDownloadReceiptHtml = async () => {
    if (!confirmedSnapshot) return;
    const logoUri = await fetchLogoDataUri();
    const html = buildBrandedOrderConfirmationHtml(confirmedSnapshot, logoUri);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `InsulTherm_Order_Confirmation_${confirmedSnapshot.orderRef}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header + Explicit Active Gmail Order Desk */}
        <div className="px-5 sm:px-6 py-4 bg-slate-950 text-white border-b border-slate-800 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <img
                  src="/assets/brand/logo.png"
                  alt="InsulTherm"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight">
                  Upload CAD, Configure & Direct Checkout
                </h2>
                <p className="text-[11px] text-slate-400">
                  ₹0 Tooling NRE • 3-Tier Volume Rates • 24–48h Dispatch
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

          <div className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
            <span className="text-slate-400 inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
              Active Order & CAD Desk:
            </span>
            <a
              href={`mailto:${COMPANY_INFO.routingEmail}`}
              className="font-mono font-bold text-red-400 hover:text-white transition-colors"
            >
              {COMPANY_INFO.routingEmail}
            </a>
          </div>
        </div>

        {/* Mode Switch Tabs */}
        <div className="grid grid-cols-2 bg-slate-100 p-1.5 gap-1.5 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setConfirmedSnapshot(null);
              setActiveTab('configure');
            }}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              activeTab === 'configure'
                ? 'bg-white text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5 text-red-600" />
            Upload CAD & Configure
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('checkout')}
            className={`py-2 px-2 rounded-lg text-xs font-bold transition-all inline-flex items-center justify-center gap-1.5 ${
              activeTab === 'checkout'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Order Cart & Checkout ({items.length})
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {confirmedSnapshot ? (
            /* BRANDED CUSTOMER ORDER CONFIRMATION VOUCHER WITH LOGO */
            <div className="space-y-5">
              <div className="rounded-2xl border-2 border-emerald-500/70 bg-emerald-50/50 p-4 flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <div className="text-sm font-extrabold text-slate-950">
                    Order Confirmed & Dispatched — #{confirmedSnapshot.orderRef}
                  </div>
                  <p className="mt-1">
                    Routed to{' '}
                    <strong className="font-mono text-slate-900">
                      {confirmedSnapshot.orderDeskEmail}
                    </strong>{' '}
                    with a formatted confirmation copy CC’d to{' '}
                    <strong className="font-mono text-slate-900">
                      {confirmedSnapshot.buyerEmail}
                    </strong>
                    . Save or print your official branded summary below.
                  </p>
                </div>
              </div>

              {/* Branded Mini Order Confirmation Sheet with InsulTherm Logo */}
              <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
                <div className="h-1.5 w-full insultherm-accent-bar" />
                <div className="bg-slate-950 text-white p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/brand/logo.png"
                        alt="InsulTherm Innovations Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold">
                        <span>Insul</span>
                        <span className="text-red-500">Therm</span>{' '}
                        <span className="text-slate-300 font-semibold">Innovations</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Sanand GIDC, Gujarat • Official Order Summary
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs font-extrabold text-red-400">
                      #{confirmedSnapshot.orderRef}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {confirmedSnapshot.timestampIst}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-[10px] font-bold uppercase text-red-600">
                      Billed & Dispatched To
                    </div>
                    <div className="font-bold text-slate-900 mt-0.5">
                      {confirmedSnapshot.buyerName}
                    </div>
                    <div className="text-slate-600">
                      {confirmedSnapshot.companyName || 'Individual / Direct'}
                    </div>
                    <div className="font-mono text-[11px] text-slate-700 mt-0.5">
                      {confirmedSnapshot.buyerEmail} • {confirmedSnapshot.buyerMobileFormatted}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {confirmedSnapshot.cityAddress} — PIN {confirmedSnapshot.pinCode}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase text-red-600">
                      Tax & CAD Status
                    </div>
                    <div className="text-[11px] text-slate-700 mt-0.5 space-y-0.5">
                      <div>
                        GSTIN:{' '}
                        <strong className="font-mono">
                          {confirmedSnapshot.gstin || 'Unregistered / B2C'}
                        </strong>
                      </div>
                      <div>Place: {confirmedSnapshot.gstStateLabel}</div>
                      <div>
                        CAD:{' '}
                        <strong>
                          {confirmedSnapshot.cadFileName || 'Dimension Spec Only'}
                        </strong>
                      </div>
                      <div>
                        Desk:{' '}
                        <strong className="font-mono text-red-600">
                          {confirmedSnapshot.orderDeskEmail}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Ordered Line Items ({confirmedSnapshot.items.length})
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {confirmedSnapshot.items.map((it) => (
                      <div
                        key={it.uid}
                        className="py-2 flex items-start justify-between gap-3"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{it.title}</div>
                          <div className="text-[11px] text-slate-500">
                            <span className="font-mono font-semibold text-red-600">
                              {it.sku}
                            </span>{' '}
                            • {it.dimensionsLabel} • Qty {it.quantity}
                          </div>
                        </div>
                        <div className="font-mono font-bold text-slate-900 shrink-0">
                          ₹{Math.round(it.unitPriceInr * it.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl bg-slate-950 text-white p-3.5 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Net Taxable Value</span>
                      <span className="font-mono">
                        ₹{confirmedSnapshot.netTaxableInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {confirmedSnapshot.isIntraStateGujarat ? (
                      <>
                        <div className="flex justify-between text-slate-300">
                          <span>CGST (9% Gujarat)</span>
                          <span className="font-mono">
                            ₹{confirmedSnapshot.cgstInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-300">
                          <span>SGST (9% Gujarat)</span>
                          <span className="font-mono">
                            ₹{confirmedSnapshot.sgstInr.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="flex justify-between text-slate-300">
                        <span>IGST (18% Inter-State)</span>
                        <span className="font-mono">
                          ₹{confirmedSnapshot.igstInr.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-extrabold pt-1.5 border-t border-slate-800">
                      <span>Total Order Estimate</span>
                      <span className="font-mono text-red-400">
                        ₹{confirmedSnapshot.grandTotalInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Branded Confirmation Download / Print Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handlePrintOrSavePdf}
                  className="py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save Official PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReceiptHtml}
                  className="py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-900 bg-white text-slate-900 text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4 text-red-600" />
                  Download Branded Receipt
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setConfirmedSnapshot(null);
                  closeDrawer();
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
              >
                Done & Return to Catalog
              </button>
            </div>
          ) : activeTab === 'configure' ? (
            <div className="space-y-6">
              {/* PROMINENT CAD UPLOAD BOX RIGHT AT TOP OF CONFIGURATOR TAB */}
              <div className="rounded-2xl border border-red-200/80 bg-red-50/30 p-4 space-y-2">
                <CadFileUploadBox
                  file={attachedCadFile}
                  onFileChange={setAttachedCadFile}
                  label="1. Upload Custom CAD Drawing (.DXF, .STEP, .IGES, .DWG, .PDF, .ZIP)"
                  helperText="Max 10 MB • Carries automatically into your Order Cart & routes to manav.sb9719@gmail.com"
                />
              </div>

              {/* Quick Custom Part Builder */}
              <div className="rounded-2xl border border-slate-200 p-4 space-y-4 bg-slate-50/60">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-slate-900">
                    2. Custom CNC Part Area Pricer
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
                        Length (10–1000 mm)
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={1000}
                        value={lenMm}
                        onChange={(e) => setLenMm(Number(e.target.value))}
                        onBlur={() => setLenMm(clampDimensionMm(lenMm, 100))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Width (10–1000 mm)
                      </label>
                      <input
                        type="number"
                        min={10}
                        max={1000}
                        value={widMm}
                        onChange={(e) => setWidMm(Number(e.target.value))}
                        onBlur={() => setWidMm(clampDimensionMm(widMm, 100))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-500 mb-1">
                        Qty (1–100k pcs)
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={100000}
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                        onBlur={() => setQty(clampQuantityPcs(qty, 1))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2">
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
                      className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shrink-0"
                    >
                      Add to Order →
                    </button>
                  </div>
                </div>
              </div>

              {/* Ready-to-Ship R&D Kits & Starter Packs */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  3. Or Add Turnkey R&D Kits & Prototyping Starter Packs
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
            <div className="py-8 space-y-5">
              <div className="text-center space-y-2.5">
                <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">Your Order Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Upload a CAD drawing below and configure bounding dimensions or add a turnkey R&D
                  kit to unlock checkout coupons.
                </p>
              </div>

              <CadFileUploadBox
                file={attachedCadFile}
                onFileChange={setAttachedCadFile}
                label="Upload Custom CAD Drawing (.DXF / .STEP / .PDF)"
              />

              <button
                type="button"
                onClick={() => setActiveTab('configure')}
                className="w-full py-3 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Configure Part Dimensions or Select R&D Kit →
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
                            max={100000}
                            value={item.quantity}
                            onChange={(e) => {
                              const v = Number(e.target.value);
                              if (Number.isFinite(v) && v >= 1) {
                                updateQuantity(item.uid, v);
                              }
                            }}
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

              {/* CAD UPLOAD ALSO ALWAYS ACCESSIBLE RIGHT IN CHECKOUT TAB */}
              <div className="rounded-2xl border border-slate-200 bg-white p-3.5">
                <CadFileUploadBox
                  file={attachedCadFile}
                  onFileChange={setAttachedCadFile}
                  label="Custom CAD Drawing / Engineering Print (Optional — Max 10 MB)"
                  helperText="Attach .DXF, .STEP, .IGES, .DWG, .PDF or .ZIP directly to this order"
                  compact={false}
                />
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

                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={20}
                    placeholder="Enter coupon code (e.g. PROTO10)"
                    value={couponInput}
                    onChange={(e) =>
                      setCouponInput(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))
                    }
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

              {/* Totals Box with Live Intra-State / Inter-State GST Calculation */}
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
                {liveTaxSplit.isIntraStateGujarat ? (
                  <>
                    <div className="flex justify-between text-slate-300">
                      <span>CGST @ 9% (Gujarat Intra-State)</span>
                      <span className="font-mono">
                        ₹{liveTaxSplit.cgstInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>SGST @ 9% (Gujarat Intra-State)</span>
                      <span className="font-mono">
                        ₹{liveTaxSplit.sgstInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between text-slate-300">
                    <span>IGST @ 18% (HSN 3919 / 6814 / 8546)</span>
                    <span className="font-mono">₹{gstInr.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold pt-2 border-t border-slate-800">
                  <span>Total Payable Estimate</span>
                  <span className="font-mono text-red-400">
                    ₹{grandTotalInr.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* STRICT VALIDATED CHECKOUT FORM */}
              <form onSubmit={handlePlaceOrder} noValidate className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-red-600" />
                    Verified Dispatch & GST Billing Details
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

                {/* Full Name + Organization */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      placeholder="e.g. Rajesh Sharma"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                        (attemptedSubmit || buyerName.length > 0) && !nameCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-slate-300'
                      }`}
                    />
                    {(attemptedSubmit || buyerName.length > 0) && !nameCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{nameCheck.error}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      {buyerType === 'b2b'
                        ? 'Company / R&D Lab Name *'
                        : 'University / Team (Optional)'}
                    </label>
                    <input
                      type="text"
                      maxLength={120}
                      placeholder={
                        buyerType === 'b2b' ? 'e.g. Apex EV Systems Pvt Ltd' : 'Optional'
                      }
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                        (attemptedSubmit || companyName.length > 0) && !orgCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-slate-300'
                      }`}
                    />
                    {(attemptedSubmit || companyName.length > 0) && !orgCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{orgCheck.error}</p>
                    )}
                  </div>
                </div>

                {/* Strict Email / Gmail + Confirm Cross-Check Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Email / Gmail Address *
                    </label>
                    <input
                      type="email"
                      autoComplete="email"
                      placeholder="name@company.com or @gmail.com"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value.replace(/\s/g, ''))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                        (attemptedSubmit || buyerEmail.length > 0) && !emailCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : emailCheck.valid
                          ? 'border-emerald-500'
                          : 'border-slate-300'
                      }`}
                    />
                    {(attemptedSubmit || buyerEmail.length > 0) && !emailCheck.valid && (
                      <div className="mt-1 space-y-1">
                        <p className="text-[11px] text-red-600">{emailCheck.error}</p>
                        {emailCheck.suggestion && (
                          <button
                            type="button"
                            onClick={() => {
                              setBuyerEmail(emailCheck.suggestion!);
                              if (confirmEmail) setConfirmEmail(emailCheck.suggestion!);
                            }}
                            className="text-[11px] font-bold text-red-700 underline"
                          >
                            Apply fix: {emailCheck.suggestion}
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Confirm Email (Cross-Check) *
                    </label>
                    <input
                      type="email"
                      placeholder="Re-enter exact email address"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value.replace(/\s/g, ''))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                        (attemptedSubmit || confirmEmail.length > 0) && !emailsMatch
                          ? 'border-red-500 bg-red-50/30'
                          : emailsMatch
                          ? 'border-emerald-500'
                          : 'border-slate-300'
                      }`}
                    />
                    {confirmEmail.length > 0 && emailsMatch && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ Email cross-check matched
                      </p>
                    )}
                    {(attemptedSubmit || confirmEmail.length > 0) && !emailsMatch && (
                      <p className="text-[11px] text-red-600 mt-1">
                        Confirmation email must match your primary email exactly.
                      </p>
                    )}
                  </div>
                </div>

                {/* Locked +91 Prefix + Exact 10-Digit Indian Mobile */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-semibold text-slate-600">
                      Indian Mobile / WhatsApp Number *
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">
                      {buyerMobile10.length}/10 digits
                    </span>
                  </div>
                  <div
                    className={`flex items-stretch rounded-xl border overflow-hidden ${
                      (attemptedSubmit || buyerMobile10.length > 0) && !mobileCheck.valid
                        ? 'border-red-500 bg-red-50/20'
                        : mobileCheck.valid
                        ? 'border-emerald-500'
                        : 'border-slate-300'
                    }`}
                  >
                    <span className="px-3.5 py-2.5 bg-slate-100 border-r border-slate-300 font-mono text-sm font-bold text-slate-800 select-none flex items-center gap-1.5 shrink-0">
                      <span>🇮🇳</span>
                      <span>+91</span>
                    </span>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="9876543210 (10-digit mobile)"
                      value={buyerMobile10}
                      onChange={(e) =>
                        setBuyerMobile10(sanitizeIndianMobile10(e.target.value))
                      }
                      className="flex-1 px-3.5 py-2.5 bg-white text-sm font-mono font-semibold text-slate-900 focus:outline-none"
                    />
                  </div>
                  {(attemptedSubmit || buyerMobile10.length > 0) && !mobileCheck.valid && (
                    <p className="text-[11px] text-red-600 mt-1">{mobileCheck.error}</p>
                  )}
                  {mobileCheck.valid && (
                    <p className="text-[11px] text-emerald-700 font-mono font-semibold mt-1">
                      ✓ Verified Mobile: {mobileCheck.meta}
                    </p>
                  )}
                </div>

                {/* Strict 15-Character Indian GSTIN Block */}
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="text-[11px] font-bold text-slate-700">
                      15-Character Indian GSTIN{' '}
                      {buyerType === 'b2b' && !noGstinB2b ? '*' : '(Optional)'}
                    </label>
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {gstin.length}/15 chars
                    </span>
                  </div>

                  {buyerType === 'b2b' && (
                    <label className="inline-flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={noGstinB2b}
                        onChange={(e) => {
                          setNoGstinB2b(e.target.checked);
                          if (e.target.checked) setGstin('');
                        }}
                        className="rounded border-slate-300 text-red-600 focus:ring-red-500"
                      />
                      <span>
                        Purchasing without GSTIN (Unregistered Lab / Incubator / Petty Cash)
                      </span>
                    </label>
                  )}

                  {(!noGstinB2b || buyerType === 'individual') && (
                    <>
                      <input
                        type="text"
                        maxLength={15}
                        placeholder="e.g. 24AABCU9603R1ZM (CAPS + exact digits)"
                        value={gstin}
                        onChange={(e) => setGstin(sanitizeGstinInput(e.target.value))}
                        className={`w-full px-3.5 py-2.5 rounded-xl border bg-white text-sm font-mono font-bold uppercase tracking-wider ${
                          (attemptedSubmit || gstin.length > 0) && !gstCheck.valid
                            ? 'border-red-500 bg-red-50/30'
                            : gstin.length === 15 && gstCheck.valid
                            ? 'border-emerald-500'
                            : 'border-slate-300'
                        }`}
                      />
                      <div className="text-[10px] text-slate-500 font-mono">
                        Structure: [01–38 State][5 CAPS PAN][4 Digits][1 CAP][1–9/A–Z][Z][Check]
                      </div>
                      {(attemptedSubmit || gstin.length > 0) && !gstCheck.valid && (
                        <p className="text-[11px] text-red-600 font-medium">{gstCheck.error}</p>
                      )}
                      {gstin.length === 15 && gstCheck.valid && gstCheck.meta && (
                        <p className="text-[11px] text-emerald-700 font-semibold">
                          ✓ {gstCheck.meta}
                        </p>
                      )}
                    </>
                  )}
                </div>

                {/* Delivery City + Strict 6-Digit PIN Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Delivery City, Area & State *
                    </label>
                    <input
                      type="text"
                      maxLength={120}
                      placeholder="e.g. Chakan MIDC, Pune, Maharashtra"
                      value={cityAddress}
                      onChange={(e) => setCityAddress(e.target.value)}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm ${
                        (attemptedSubmit || cityAddress.length > 0) && !cityCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-slate-300'
                      }`}
                    />
                    {(attemptedSubmit || cityAddress.length > 0) && !cityCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{cityCheck.error}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-[11px] font-semibold text-slate-600">
                        PIN Code *
                      </label>
                      <span className="text-[10px] font-mono text-slate-500">
                        {pinCode.length}/6
                      </span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="382110"
                      value={pinCode}
                      onChange={(e) => setPinCode(sanitizePinCode(e.target.value))}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-mono font-bold ${
                        (attemptedSubmit || pinCode.length > 0) && !pinCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : pinCheck.valid
                          ? 'border-emerald-500'
                          : 'border-slate-300'
                      }`}
                    />
                    {(attemptedSubmit || pinCode.length > 0) && !pinCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{pinCheck.error}</p>
                    )}
                  </div>
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

                <textarea
                  rows={2}
                  maxLength={600}
                  placeholder="Optional tolerances, kiss-cut carrier notes, or target delivery date..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                />

                {/* Cross-Check Confirmation Checkbox */}
                <label
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    verifiedDetailsChecked
                      ? 'border-emerald-500 bg-emerald-50/50 text-slate-900'
                      : attemptedSubmit
                      ? 'border-red-400 bg-red-50/40 text-slate-800'
                      : 'border-slate-200 bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={verifiedDetailsChecked}
                    onChange={(e) => setVerifiedDetailsChecked(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="leading-relaxed">
                    I have cross-checked my email{' '}
                    {emailCheck.valid ? (
                      <strong className="font-mono text-slate-950">
                        ({buyerEmail.trim().toLowerCase()})
                      </strong>
                    ) : null}
                    , <strong>+91 10-digit mobile number</strong>, and GST/PIN details so my
                    Order Confirmation & GST Proforma Invoice arrive without error. *
                  </span>
                </label>

                {submitErr && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{submitErr}</span>
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
                      Dispatching Order & Generating Confirmation...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Place Order & Generate Branded Confirmation
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Routed to <strong className="font-mono">{COMPANY_INFO.routingEmail}</strong> +
                  Customer Confirmation Copy
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
