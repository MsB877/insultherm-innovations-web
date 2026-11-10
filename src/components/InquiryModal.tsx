import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle2, Mail, ShieldCheck, FileCheck2, ExternalLink } from 'lucide-react';
import { CONTACT_CONFIG, CORE_PRODUCTS, TURNKEY_BUNDLES } from '../data/companyData';

export interface InquiryPreset {
  productName?: string;
  variant?: string;
  pricingTier?: string;
  quantity?: string;
  dimensions?: string;
}

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset?: InquiryPreset;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, preset }) => {
  const [productName, setProductName] = useState('');
  const [selectedVariant, setSelectedVariant] = useState('');
  const [pricingTier, setPricingTier] = useState('');
  const [quantity, setQuantity] = useState('25 pcs');
  const [dimensionsCad, setDimensionsCad] = useState('100 × 100 mm (Custom .DXF)');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyOrg, setCompanyOrg] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [industrySector, setIndustrySector] = useState('Grid-Scale BESS & Stationary Storage');
  const [engineeringNotes, setEngineeringNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProductName(preset?.productName || CORE_PRODUCTS[0].name);
      setSelectedVariant(preset?.variant || CORE_PRODUCTS[0].variants[0].code);
      setPricingTier(preset?.pricingTier || CORE_PRODUCTS[0].primaryPriceHeadline);
      setQuantity(preset?.quantity || '25 pcs');
      setDimensionsCad(preset?.dimensions || 'Custom .DXF / .STEP Geometry');
      setSubmitted(false);
    }
  }, [isOpen, preset]);

  if (!isOpen) return null;

  const allProductOptions = [
    ...CORE_PRODUCTS.map((p) => ({
      label: `${p.name} — ${p.primaryPriceHeadline}`,
      name: p.name,
      defaultVariant: p.variants[0].code,
      defaultTier: `${p.primaryPriceHeadline} | ${p.volumePriceHeadline}`,
    })),
    ...TURNKEY_BUNDLES.map((b) => ({
      label: `[Turnkey Kit] ${b.title} — ${b.pricePrimary}`,
      name: b.title,
      defaultVariant: 'Turnkey Pre-Cut Lab Bundle',
      defaultTier: b.priceSecondary ? `${b.pricePrimary} / ${b.priceSecondary}` : b.pricePrimary,
    })),
  ];

  const handleProductSelect = (val: string) => {
    setProductName(val);
    const found = allProductOptions.find((o) => o.name === val);
    if (found) {
      setSelectedVariant(found.defaultVariant);
      setPricingTier(found.defaultTier);
    }
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(`[InsulTherm RFQ / Order] ${productName} (${selectedVariant}) — ${companyOrg || fullName}`);
    const body = encodeURIComponent(
      `INSULTHERM INNOVATIONS — ENGINEERING PURCHASE / RFQ DISPATCH\n` +
        `=============================================================\n` +
        `Product / Bundle: ${productName}\n` +
        `Variant / Grade: ${selectedVariant}\n` +
        `Selected Pricing Tier: ${pricingTier}\n` +
        `Target Quantity: ${quantity}\n` +
        `Dimensions / CAD File: ${dimensionsCad}\n` +
        `Industry Sector: ${industrySector}\n\n` +
        `CUSTOMER DETAILS\n` +
        `Name: ${fullName}\n` +
        `Work Email: ${workEmail}\n` +
        `Organization: ${companyOrg}\n` +
        `Phone: ${phoneNumber}\n\n` +
        `ENGINEERING / APPLICATION NOTES:\n${engineeringNotes || 'Standard 24-48h digital CNC evaluation requested.'}\n`
    );
    return `mailto:${CONTACT_CONFIG.emailOperations}?cc=${CONTACT_CONFIG.emailPrimary}&subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Record<string, string> = {
      'form-name': 'product-order-inquiry',
      routing_destination: CONTACT_CONFIG.emailOperations,
      product_name: productName,
      selected_variant: selectedVariant,
      pricing_tier: pricingTier,
      quantity,
      dimensions_cad: dimensionsCad,
      full_name: fullName,
      work_email: workEmail,
      company_organization: companyOrg,
      phone_number: phoneNumber,
      industry_sector: industrySector,
      engineering_notes: engineeringNotes,
    };

    try {
      // 1. Submit to Netlify Forms endpoint (active when hosted on Netlify)
      const encoded = new URLSearchParams(payload).toString();
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      }).catch(() => null);

      // 2. Simultaneous direct operational lead routing to manavsb9719@gmail.com via FormSubmit AJAX
      await fetch(`https://formsubmit.co/ajax/${CONTACT_CONFIG.emailOperations}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[InsulTherm Order/RFQ] ${productName} — ${companyOrg || fullName}`,
          _cc: CONTACT_CONFIG.emailPrimary,
          ...payload,
        }),
      }).catch(() => null);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl border-l border-slate-200 flex flex-col">
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 bg-[#0B192C] text-white px-6 py-5 border-b border-slate-800 flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-orange-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Direct Engineering Order &amp; CAD Desk</span>
            </div>
            <h2 className="text-lg font-extrabold tracking-tight">Request to Buy / Engineering Inquiry</h2>
            <p className="text-xs text-slate-300 mt-0.5 font-mono">
              Routed directly to <span className="text-emerald-400">{CONTACT_CONFIG.emailOperations}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Inquiry Modal"
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex-1">
          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Engineering RFQ Logged &amp; Routed
                  </h3>
                  <p className="text-sm text-slate-700 mt-1">
                    Your inquiry for <span className="font-semibold">{productName}</span> ({selectedVariant}) at{' '}
                    <span className="font-mono font-semibold">{pricingTier}</span> has been queued for{' '}
                    <span className="font-mono font-bold text-emerald-800">{CONTACT_CONFIG.emailOperations}</span>.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-emerald-200 p-4 text-xs font-mono space-y-1.5 text-slate-700">
                <div>
                  <strong>Product:</strong> {productName} ({selectedVariant})
                </div>
                <div>
                  <strong>Pricing Tier:</strong> {pricingTier}
                </div>
                <div>
                  <strong>Quantity &amp; Geometry:</strong> {quantity} | {dimensionsCad}
                </div>
                <div>
                  <strong>Lead Destination:</strong> {CONTACT_CONFIG.emailOperations} (CC: {CONTACT_CONFIG.emailPrimary})
                </div>
                <div>
                  <strong>SLA Target:</strong> Proforma Invoice / DFM Review within 4 Business Hours
                </div>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs text-slate-600">
                  Attaching a proprietary <code className="font-mono font-semibold">.DXF</code>,{' '}
                  <code className="font-mono font-semibold">.STEP</code>, or NDA drawing? Click below to launch your email client pre-addressed to{' '}
                  <span className="font-mono font-semibold">{CONTACT_CONFIG.emailOperations}</span> with this exact RFQ payload:
                </p>
                <a
                  href={buildMailtoHref()}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Direct Email Dispatch ({CONTACT_CONFIG.emailOperations})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                >
                  Return to Technical Catalog
                </button>
              </div>
            </div>
          ) : (
            <form
              name="product-order-inquiry"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="product-order-inquiry" />
              <input type="hidden" name="routing_destination" value={CONTACT_CONFIG.emailOperations} />

              {/* Pre-Populated Product & Tier Highlight Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                    Selected Material / Turnkey Bundle
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    <FileCheck2 className="w-3 h-3" /> ₹0 NRE Tooling
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    InsulTherm Product / Kit *
                  </label>
                  <select
                    name="product_name"
                    value={productName}
                    onChange={(e) => handleProductSelect(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 focus:border-orange-600 focus:outline-none"
                  >
                    {allProductOptions.map((opt) => (
                      <option key={opt.name} value={opt.name}>
                        {opt.label}
                      </option>
                    ))}
                    {!allProductOptions.some((o) => o.name === productName) && (
                      <option value={productName}>{productName}</option>
                    )}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Premix Variant / Grade
                    </label>
                    <input
                      type="text"
                      name="selected_variant"
                      value={selectedVariant}
                      onChange={(e) => setSelectedVariant(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Documented Pricing Tier
                    </label>
                    <input
                      type="text"
                      name="pricing_tier"
                      value={pricingTier}
                      onChange={(e) => setPricingTier(e.target.value)}
                      className="w-full rounded-lg border border-orange-300 bg-orange-50/60 px-3 py-2 text-xs font-mono font-bold text-orange-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Required Quantity *
                    </label>
                    <input
                      type="text"
                      name="quantity"
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g., 25 prototype pcs or 5,000/mo"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Dimensions / CAD Reference
                    </label>
                    <input
                      type="text"
                      name="dimensions_cad"
                      value={dimensionsCad}
                      onChange={(e) => setDimensionsCad(e.target.value)}
                      placeholder="e.g., 120×85×1.5mm or .DXF ready"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lead Engineer / Buyer Name *
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Dr. R. Sharma"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    name="work_email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="engineer@company.in"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Company / Lab / PSU Name *
                  </label>
                  <input
                    type="text"
                    name="company_organization"
                    required
                    value={companyOrg}
                    onChange={(e) => setCompanyOrg(e.target.value)}
                    placeholder="OEM / Integrator / Defense Lab"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+91 ..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Application Sector
                </label>
                <select
                  name="industry_sector"
                  value={industrySector}
                  onChange={(e) => setIndustrySector(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                >
                  <option>Grid-Scale BESS &amp; Stationary Storage (1,500V DC)</option>
                  <option>Rail Propulsion, Solar Inverters &amp; Industrial Drives</option>
                  <option>Defense Avionics, SpaceTech &amp; Optical Payloads</option>
                  <option>AI Data Center Liquid Cooling &amp; 800G Optics</option>
                  <option>EV Battery Homologation (ARAI AIS-156 Prepaid R&amp;D)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Operating Temp, Voltage, Clamping Pressure or Procurement Mode
                </label>
                <textarea
                  name="engineering_notes"
                  rows={3}
                  value={engineeringNotes}
                  onChange={(e) => setEngineeringNotes(e.target.value)}
                  placeholder="Specify target clamping pressure (psi), dielectric voltage (kV), petty-cash <₹15k invoice requirement, or .DXF bend radii..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-bold px-5 py-3.5 rounded-xl shadow-md transition-all"
              >
                <Send className="w-4 h-4" />
                <span>
                  {submitting
                    ? 'Dispatching Engineering Order...'
                    : `Submit Order / RFQ to ${CONTACT_CONFIG.emailOperations}`}
                </span>
              </button>

              <div className="text-[11px] text-slate-500 font-mono text-center space-y-0.5">
                <div>
                  Direct Operations Routing: <strong>{CONTACT_CONFIG.emailOperations}</strong> | Official:{' '}
                  <strong>{CONTACT_CONFIG.emailPrimary}</strong>
                </div>
                <div>Engineering Desk: {CONTACT_CONFIG.phoneMasked}</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
