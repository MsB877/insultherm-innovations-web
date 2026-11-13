import React, { useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  ShoppingBag,
  Upload,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';
import { CadFileUploadBox } from '../components/CadFileUploadBox';
import {
  sanitizeGstinInput,
  sanitizeIndianMobile10,
  validateCadFile,
  validateEmailStrict,
  validateIndianGstin,
  validateIndianMobile10,
  validateOrganizationName,
  validatePersonName,
} from '../utils/validation';

export const ContactPage: React.FC = () => {
  const { openCheckout, openConfigurator, items } = useOrderCart();

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [mobile10, setMobile10] = useState('');
  const [gstin, setGstin] = useState('');
  const [sector, setSector] = useState('EV Battery / AIS-156 Pack');
  const [productInterest, setProductInterest] = useState('InsulTherm Barrier™');
  const [dimensionsQty, setDimensionsQty] = useState('');
  const [technicalBrief, setTechnicalBrief] = useState('');
  const [cadFile, setCadFile] = useState<File | null>(null);
  const [verifiedContact, setVerifiedContact] = useState(false);

  const [attempted, setAttempted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [formErr, setFormErr] = useState<string | null>(null);

  const nameCheck = validatePersonName(fullName);
  const orgCheck = validateOrganizationName(company, false);
  const emailCheck = validateEmailStrict(email);
  const emailsMatch =
    emailCheck.valid &&
    confirmEmail.trim().toLowerCase() === email.trim().toLowerCase();
  const mobileCheck = validateIndianMobile10(mobile10);
  const gstCheck = validateIndianGstin(gstin, false);
  const cadCheck = validateCadFile(cadFile);
  const briefValid = technicalBrief.trim().length >= 8;

  const isRfqValid =
    nameCheck.valid &&
    orgCheck.valid &&
    emailCheck.valid &&
    emailsMatch &&
    mobileCheck.valid &&
    gstCheck.valid &&
    cadCheck.valid &&
    briefValid &&
    verifiedContact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    setFormErr(null);

    if (!isRfqValid) {
      setFormErr(
        'Please resolve the highlighted validation checks above before dispatching your RFQ.'
      );
      return;
    }

    setSubmitting(true);
    const rfqId = `RFQ-${Date.now().toString().slice(-6)}`;
    const cleanEmail = email.trim().toLowerCase();
    const formattedPhone = `+91 ${mobile10.slice(0, 5)} ${mobile10.slice(5)}`;
    const cleanGstin = sanitizeGstinInput(gstin);

    const buildRfqFormData = () => {
      const fs = new FormData();
      fs.append(
        '_subject',
        `InsulTherm Engineering RFQ #${rfqId} — ${company.trim() || fullName.trim()} (${productInterest})`
      );
      fs.append('_template', 'box');
      fs.append('_captcha', 'false');
      fs.append('_cc', cleanEmail);
      fs.append(
        'InsulTherm_Engineering_Desk',
        `Technical Inquiry & Custom CAD Review • Ref #${rfqId}`
      );
      fs.append('RFQ_Reference_ID', rfqId);
      fs.append('Customer_Full_Name', fullName.trim());
      fs.append('Organization_Or_Lab', company.trim() || 'Individual / Prototyping');
      fs.append('email', cleanEmail);
      fs.append('Mobile_India_Verified', formattedPhone);
      fs.append(
        'Customer_GSTIN',
        cleanGstin ? `${cleanGstin} (${gstCheck.meta || 'Verified'})` : 'Not Provided / Optional'
      );
      fs.append('Application_Sector', sector);
      fs.append('Product_Architecture', productInterest);
      fs.append('Dimensions_And_Target_Qty', dimensionsQty.trim() || 'See notes / attached CAD');
      fs.append('Technical_Requirements', technicalBrief.trim());
      fs.append(
        'Attached_CAD_File',
        cadFile ? `${cadFile.name} (${(cadFile.size / 1024).toFixed(1)} KB)` : 'None'
      );
      fs.append('Official_Order_And_CAD_Desk', COMPANY_INFO.routingEmail);
      if (cadFile) {
        fs.append('attachment', cadFile, cadFile.name);
      }
      return fs;
    };

    try {
      const nf = new FormData();
      nf.append('form-name', 'insultherm-engineering-rfq');
      nf.append('full_name', fullName.trim());
      nf.append('company', company.trim());
      nf.append('email', cleanEmail);
      nf.append('phone', formattedPhone);
      nf.append('sector', sector);
      nf.append('product_interest', productInterest);
      nf.append('dimensions_qty', dimensionsQty.trim());
      nf.append('technical_brief', technicalBrief.trim());
      if (cadFile) {
        nf.append('cad_drawing_file', cadFile, cadFile.name);
      }
      await fetch('/', { method: 'POST', body: nf }).catch(() => null);

      const primaryRes = await fetch(COMPANY_INFO.formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: buildRfqFormData(),
      });
      const primaryJson = await primaryRes.json().catch(() => ({}));
      const okPrimary =
        primaryRes.ok &&
        (primaryJson.success === true || primaryJson.success === 'true');

      if (!okPrimary && COMPANY_INFO.formSubmitFallbackEndpoint) {
        await fetch(COMPANY_INFO.formSubmitFallbackEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: buildRfqFormData(),
        });
      }

      setSubmittedRef(rfqId);
      setAttempted(false);
    } catch {
      setFormErr(
        `Connection interrupted. Please email your CAD/specifications directly to ${COMPANY_INFO.routingEmail}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-canvas-tonal pb-24">
      {/* Balanced Architectural Header */}
      <section className="relative bg-hero-architectural bg-subtle-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              Contact, CAD Review & Direct RFQ
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] tracking-tight">
              Speak With Our Materials & Converting Team
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Submit custom CAD drawings for DFM review, request an NDA or OEM blanket schedule, or
              upload CAD directly in the order cart.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openConfigurator()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-white border border-gray-300 hover:border-[#0F1115] text-[#0F1115] text-sm font-bold transition-colors"
            >
              <Upload className="w-4 h-4 text-[#DC2626]" />
              Upload CAD & Price
            </button>
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Cart ({items.length})
            </button>
          </div>
        </div>

        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-7 sm:h-9"
            preserveAspectRatio="none"
          >
            <path d="M0 16C420 42 900 -4 1440 20V40H0V16Z" fill="#EEF1F6" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 5 Cols: Contact Info + Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-7 space-y-5 shadow-sm">
            <h2 className="text-xl font-bold text-[#0F1115]">Verified Direct Channels</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Engineering & Sales Line (India)</div>
                  <div className="font-mono font-bold text-[#0F1115] text-base mt-0.5">
                    {COMPANY_INFO.phoneMasked}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">
                    Official Orders, CAD & Engineering Email
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}`}
                    className="font-mono font-bold text-[#DC2626] hover:underline text-base mt-0.5 block"
                  >
                    {COMPANY_INFO.routingEmail}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    All online orders, CAD attachments, and Proforma requests route directly here
                    with an automatic confirmation copy to your verified email.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Manufacturing & CNC Converting Wing</div>
                  <div className="text-sm text-[#0F1115] font-medium leading-relaxed mt-1">
                    {COMPANY_INFO.addressLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <div className="text-xs font-mono text-gray-400 mt-1">
                    {COMPANY_INFO.coordinates}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="px-5 py-3 bg-[#0F1115] text-white text-xs font-semibold flex items-center justify-between">
              <span>Sanand GIDC Industrial Estate, Gujarat</span>
              <span className="text-gray-400">24–48h Pan-India Dispatch</span>
            </div>
            <iframe
              title="InsulTherm Innovations Sanand GIDC Facility Map"
              src={COMPANY_INFO.mapEmbedUrl}
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right 7 Cols: Strictly Validated Inquiry & CAD Upload Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-200 rounded-xl p-7 sm:p-9 shadow-sm">
            {submittedRef ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-gray-100 font-mono text-xs font-bold text-gray-800">
                  Reference #{submittedRef}
                </div>
                <h2 className="text-2xl font-bold text-[#0F1115]">
                  Inquiry & CAD Dispatched
                </h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Routed directly to{' '}
                  <strong className="font-mono text-[#0F1115]">
                    {COMPANY_INFO.routingEmail}
                  </strong>{' '}
                  with a copy CC’d to{' '}
                  <strong className="font-mono text-[#0F1115]">
                    {email.trim().toLowerCase()}
                  </strong>
                  . Our engineering team responds within 2–4 business hours.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}?subject=${encodeURIComponent(
                      `[${submittedRef}] ${company || fullName} — ${productInterest}`
                    )}`}
                    className="px-5 py-2.5 rounded-lg bg-[#DC2626] text-white text-xs font-bold"
                  >
                    Open Direct Email Thread
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                    Engineering RFQ & Custom CAD
                  </span>
                  <h2 className="text-2xl font-bold text-[#0F1115] mt-1">
                    Send Specifications or Attach Drawing
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      maxLength={80}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ananya Deshmukh"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm ${
                        (attempted || fullName.length > 0) && !nameCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-gray-300'
                      }`}
                    />
                    {(attempted || fullName.length > 0) && !nameCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{nameCheck.error}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Company / R&D Lab / Team
                    </label>
                    <input
                      type="text"
                      maxLength={120}
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Organization (or Individual)"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm ${
                        (attempted || company.length > 0) && !orgCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : 'border-gray-300'
                      }`}
                    />
                    {(attempted || company.length > 0) && !orgCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{orgCheck.error}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email / Gmail Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))}
                      placeholder="name@company.com or @gmail.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm ${
                        (attempted || email.length > 0) && !emailCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : emailCheck.valid
                          ? 'border-emerald-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {(attempted || email.length > 0) && !emailCheck.valid && (
                      <div className="mt-1 space-y-1">
                        <p className="text-[11px] text-red-600">{emailCheck.error}</p>
                        {emailCheck.suggestion && (
                          <button
                            type="button"
                            onClick={() => {
                              setEmail(emailCheck.suggestion!);
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
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Confirm Email (Cross-Check) *
                    </label>
                    <input
                      type="email"
                      value={confirmEmail}
                      onChange={(e) => setConfirmEmail(e.target.value.replace(/\s/g, ''))}
                      placeholder="Re-enter exact email address"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm ${
                        (attempted || confirmEmail.length > 0) && !emailsMatch
                          ? 'border-red-500 bg-red-50/30'
                          : emailsMatch
                          ? 'border-emerald-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {confirmEmail.length > 0 && emailsMatch && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ Emails match
                      </p>
                    )}
                    {(attempted || confirmEmail.length > 0) && !emailsMatch && (
                      <p className="text-[11px] text-red-600 mt-1">
                        Must match primary email exactly.
                      </p>
                    )}
                  </div>
                </div>

                {/* Locked +91 Mobile + Optional 15-Char GSTIN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        Indian Mobile / WhatsApp *
                      </label>
                      <span className="text-[11px] font-mono text-gray-500">
                        {mobile10.length}/10
                      </span>
                    </div>
                    <div
                      className={`flex items-stretch rounded-lg border overflow-hidden ${
                        (attempted || mobile10.length > 0) && !mobileCheck.valid
                          ? 'border-red-500 bg-red-50/20'
                          : mobileCheck.valid
                          ? 'border-emerald-500'
                          : 'border-gray-300'
                      }`}
                    >
                      <span className="px-3 py-2.5 bg-gray-100 border-r border-gray-300 font-mono text-sm font-bold text-gray-800 select-none flex items-center gap-1 shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={mobile10}
                        onChange={(e) => setMobile10(sanitizeIndianMobile10(e.target.value))}
                        placeholder="9876543210"
                        className="flex-1 px-3 py-2.5 bg-white text-sm font-mono font-semibold focus:outline-none"
                      />
                    </div>
                    {(attempted || mobile10.length > 0) && !mobileCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{mobileCheck.error}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-gray-700">
                        15-Char GSTIN (Optional)
                      </label>
                      <span className="text-[11px] font-mono text-gray-500">
                        {gstin.length}/15
                      </span>
                    </div>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstin}
                      onChange={(e) => setGstin(sanitizeGstinInput(e.target.value))}
                      placeholder="e.g. 24AABCU9603R1ZM"
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm font-mono font-bold uppercase ${
                        gstin.length > 0 && !gstCheck.valid
                          ? 'border-red-500 bg-red-50/30'
                          : gstin.length === 15 && gstCheck.valid
                          ? 'border-emerald-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {gstin.length > 0 && !gstCheck.valid && (
                      <p className="text-[11px] text-red-600 mt-1">{gstCheck.error}</p>
                    )}
                    {gstin.length === 15 && gstCheck.valid && gstCheck.meta && (
                      <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                        ✓ {gstCheck.meta}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Application Sector
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm"
                    >
                      <option>EV Battery / AIS-156 Pack</option>
                      <option>Grid-Scale BESS / Solar Inverter</option>
                      <option>Defense / UAV Drones / SpaceTech</option>
                      <option>AI Data Center / SiC Power Electronics</option>
                      <option>Prototyping / Student EV / Maker</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Product of Interest
                    </label>
                    <select
                      value={productInterest}
                      onChange={(e) => setProductInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.trademarkName}>
                          {p.trademarkName}
                        </option>
                      ))}
                      <option value="R&D Qualification / Starter Kit">
                        R&D Qualification / Starter Kit
                      </option>
                    </select>
                  </div>
                </div>

                <CadFileUploadBox
                  file={cadFile}
                  onFileChange={setCadFile}
                  label="Attach Custom CAD or Print (.DXF, .STEP, .IGES, .DWG, .PDF, .ZIP)"
                  helperText="Max 10 MB • NDA-safe transmission to manav.sb9719@gmail.com"
                />

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Dimensions & Target Quantity
                  </label>
                  <input
                    type="text"
                    maxLength={160}
                    value={dimensionsQty}
                    onChange={(e) => setDimensionsQty(e.target.value)}
                    placeholder="e.g. 148 × 95 × 1.50 mm — 40 pcs prototype + 2,000 pcs/month"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Technical Requirements (Min 8 characters) *
                  </label>
                  <textarea
                    rows={3}
                    maxLength={1200}
                    value={technicalBrief}
                    onChange={(e) => setTechnicalBrief(e.target.value)}
                    placeholder="Operating temperature, voltage isolation, clamping pressure, or NDA request..."
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm ${
                      (attempted || technicalBrief.length > 0) && !briefValid
                        ? 'border-red-500 bg-red-50/30'
                        : 'border-gray-300'
                    }`}
                  />
                  {(attempted || technicalBrief.length > 0) && !briefValid && (
                    <p className="text-[11px] text-red-600 mt-1">
                      Please include a brief description of your application or requirements (at
                      least 8 characters).
                    </p>
                  )}
                </div>

                <label
                  className={`flex items-start gap-2.5 p-3 rounded-xl border text-xs cursor-pointer ${
                    verifiedContact
                      ? 'border-emerald-500 bg-emerald-50/40 text-gray-900'
                      : attempted
                      ? 'border-red-400 bg-red-50/40 text-gray-800'
                      : 'border-gray-200 bg-gray-50 text-gray-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={verifiedContact}
                    onChange={(e) => setVerifiedContact(e.target.checked)}
                    className="mt-0.5 rounded border-gray-300 text-[#DC2626]"
                  />
                  <span>
                    I confirm my email and <strong>+91 10-digit mobile number</strong> are accurate
                    for DFM feedback and quotation delivery. *
                  </span>
                </label>

                {formErr && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{formErr}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Dispatching RFQ & CAD...' : 'Send Inquiry & CAD →'}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Routed directly to <strong className="font-mono">{COMPANY_INFO.routingEmail}</strong>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
