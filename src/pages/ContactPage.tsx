import React, { useRef, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Upload,
  Send,
  CheckCircle2,
  ShoppingBag,
  FileCode2,
  ShieldCheck,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const ContactPage: React.FC = () => {
  const { openCheckout, items } = useOrderCart();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('EV Battery / AIS-156 Pack');
  const [productInterest, setProductInterest] = useState('InsulTherm Barrier™');
  const [dimensionsQty, setDimensionsQty] = useState('');
  const [technicalBrief, setTechnicalBrief] = useState('');
  const [cadFile, setCadFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const nf = new FormData();
      nf.append('form-name', 'insultherm-engineering-rfq');
      nf.append('full_name', fullName);
      nf.append('company', company);
      nf.append('email', email);
      nf.append('phone', phone);
      nf.append('sector', sector);
      nf.append('product_interest', productInterest);
      nf.append('dimensions_qty', dimensionsQty);
      nf.append('technical_brief', technicalBrief);
      if (cadFile) {
        nf.append('cad_drawing_file', cadFile);
      }
      await fetch('/', { method: 'POST', body: nf }).catch(() => null);

      const fs = new FormData();
      fs.append('_subject', `[InsulTherm Inquiry] ${company || fullName} — ${productInterest}`);
      fs.append('_template', 'table');
      fs.append('_captcha', 'false');
      fs.append('Name', fullName);
      fs.append('Company', company || 'Individual / Prototyping');
      fs.append('Email', email);
      fs.append('Phone', phone);
      fs.append('Sector', sector);
      fs.append('Product_Interest', productInterest);
      fs.append('Dimensions_And_Qty', dimensionsQty || 'See notes / CAD');
      fs.append('Technical_Brief', technicalBrief);
      fs.append(
        'CAD_File',
        cadFile ? `${cadFile.name} (${(cadFile.size / 1024).toFixed(1)} KB)` : 'None'
      );
      if (cadFile) {
        fs.append('attachment', cadFile);
      }

      await fetch(COMPANY_INFO.formSubmitEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: fs,
      }).catch(() => null);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
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
              Contact & Technical Support
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] tracking-tight">
              Speak With Our Materials & Converting Team
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Submit custom CAD drawings for DFM review, request an NDA or blanket OEM schedule, or
              place direct orders online.
            </p>
          </div>

          <button
            type="button"
            onClick={openCheckout}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold shrink-0 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Open Order Cart ({items.length})
          </button>
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
            <h2 className="text-xl font-bold text-[#0F1115]">Direct Contact Channels</h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Engineering & Sales Line</div>
                  <div className="font-mono font-bold text-[#0F1115] text-base mt-0.5">
                    {COMPANY_INFO.phoneMasked}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Primary Official Email</div>
                  <a
                    href={`mailto:${COMPANY_INFO.officialEmail}`}
                    className="font-mono font-bold text-[#0F1115] hover:text-[#DC2626] text-base mt-0.5 block"
                  >
                    {COMPANY_INFO.officialEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#0F1115] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Active Order & RFQ Routing Desk</div>
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}`}
                    className="font-mono font-bold text-[#DC2626] hover:underline text-base mt-0.5 block"
                  >
                    {COMPANY_INFO.routingEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                <MapPin className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-gray-500">Manufacturing Facility</div>
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

        {/* Right 7 Cols: Clean Inquiry & CAD Upload Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-gray-200 rounded-xl p-7 sm:p-9 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-[#DC2626]" />
                </div>
                <h2 className="text-2xl font-bold text-[#0F1115]">Inquiry & CAD Received</h2>
                <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                  Routed directly to <strong className="font-mono">{COMPANY_INFO.routingEmail}</strong>. Our engineering team responds within 2–4 business hours.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}?cc=${COMPANY_INFO.officialEmail}&subject=${encodeURIComponent(
                      `[CAD/RFQ] ${company || fullName} — ${productInterest}`
                    )}`}
                    className="px-5 py-2.5 rounded-lg bg-[#DC2626] text-white text-xs font-bold"
                  >
                    Open Direct Email Thread
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Company / Lab / Team
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Organization (or Individual)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                    />
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
                      <option>Defense / Avionics / SpaceTech</option>
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

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Attach Custom CAD or Print (.DXF, .STEP, .IGES, .PDF, .ZIP)
                  </label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-[#DC2626] bg-[#F7F8FA] rounded-xl p-5 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg"
                      onChange={(e) => setCadFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {cadFile ? (
                      <div className="flex items-center justify-center gap-2 text-sm font-semibold text-[#0F1115]">
                        <FileCode2 className="w-5 h-5 text-[#DC2626]" />
                        <span>
                          {cadFile.name} ({(cadFile.size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-5 h-5 text-[#DC2626] mx-auto" />
                        <div className="text-sm font-semibold text-[#0F1115]">
                          Click to Upload CAD File or Drawing
                        </div>
                        <div className="text-xs text-gray-500">
                          Optional — supports .DXF, .STEP, .IGES, .PDF, .ZIP
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Dimensions & Target Quantity
                  </label>
                  <input
                    type="text"
                    value={dimensionsQty}
                    onChange={(e) => setDimensionsQty(e.target.value)}
                    placeholder="e.g. 148 × 95 × 1.50 mm — 40 pcs prototype + 2,000 pcs/month"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Technical Requirements *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={technicalBrief}
                    onChange={(e) => setTechnicalBrief(e.target.value)}
                    placeholder="Operating temperature, voltage isolation, clamping pressure, or NDA request..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting ? 'Submitting...' : 'Send Inquiry & CAD →'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
