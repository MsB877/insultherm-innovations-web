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
  Clock,
} from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const ContactPage: React.FC = () => {
  const { openConfigurator, openCheckout, items } = useOrderCart();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [sector, setSector] = useState('EV Battery / AIS-156 Pack');
  const [productInterest, setProductInterest] = useState('InsulTherm Graphite-Flex™ (Area Quote)');
  const [dimensionsQty, setDimensionsQty] = useState('');
  const [technicalBrief, setTechnicalBrief] = useState('');
  const [cadFile, setCadFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // 1. Netlify Multipart Form Capture (with binary CAD file)
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

      // 2. Direct Delivery to manavsb9719@gmail.com via FormSubmit
      const fs = new FormData();
      fs.append('_subject', `[InsulTherm CAD/RFQ] ${company} — ${productInterest}`);
      fs.append('_template', 'table');
      fs.append('_captcha', 'false');
      fs.append('Engineer_Buyer_Name', fullName);
      fs.append('Company_Lab', company);
      fs.append('Official_Email', email);
      fs.append('Phone', phone);
      fs.append('Industry_Sector', sector);
      fs.append('Material_Platform', productInterest);
      fs.append('Dimensions_And_Qty', dimensionsQty || 'See attached CAD / notes');
      fs.append('Technical_Brief', technicalBrief);
      fs.append('CAD_File_Attached', cadFile ? `${cadFile.name} (${(cadFile.size / 1024).toFixed(1)} KB)` : 'None');
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
    <div className="bg-[#FBFBF9] pb-20">
      {/* Header */}
      <section className="bg-white bg-architectural-grid border-b border-[#E2E0D8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
              Direct Engineering Desk • Custom CAD Upload • Sanand GIDC Manufacturing
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#14171A] leading-tight">
              Upload Custom CAD, Request DFM Review, or Place a Direct Order
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              All custom CAD uploads, direct purchases, and OEM blanket RFQs route immediately to our active operations desk (<strong className="font-mono text-[#14171A]">{COMPANY_INFO.routingEmail}</strong>) with 2–4 hour engineering turnaround.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openConfigurator()}
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#14171A] hover:bg-slate-800 text-white text-xs font-bold"
            >
              <Upload className="w-4 h-4 text-[#E04819]" />
              Instant Area Calculator
            </button>
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-bold shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Open Direct Order Cart ({items.length})
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 5 Cols: Official Contact Channels + Gujarat Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E2E0D8] rounded-md p-6 space-y-5 shadow-sm">
            <h2 className="text-xl font-display font-bold text-[#14171A]">
              Official Corporate & Operations Channels
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#E04819] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">
                    Engineering & Sales Desk (Privacy-Protected Line)
                  </div>
                  <div className="font-mono font-bold text-[#14171A] text-base mt-0.5">
                    {COMPANY_INFO.phoneMasked}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#E04819] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">
                    Primary Official Executive Email
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.officialEmail}`}
                    className="font-mono font-bold text-[#14171A] hover:text-[#E04819] text-base mt-0.5 block"
                  >
                    {COMPANY_INFO.officialEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">
                    Active Direct Order & CAD Routing Inbox
                  </div>
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}`}
                    className="font-mono font-bold text-emerald-800 hover:underline text-base mt-0.5 block"
                  >
                    {COMPANY_INFO.routingEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-[#E2E0D8]">
                <MapPin className="w-5 h-5 text-[#E04819] shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500">
                    Manufacturing & Digital CNC Converting Facility
                  </div>
                  <div className="text-xs sm:text-sm text-[#14171A] font-medium leading-relaxed mt-1">
                    {COMPANY_INFO.addressLines.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                  <div className="text-[11px] font-mono text-slate-500 mt-1">
                    GPS: {COMPANY_INFO.coordinates}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Sanand GIDC Map */}
          <div className="bg-white border border-[#E2E0D8] rounded-md overflow-hidden shadow-sm">
            <div className="px-4 py-2.5 bg-[#14171A] text-white text-xs font-mono flex items-center justify-between">
              <span>Sanand GIDC Industrial Corridor, Gujarat</span>
              <span className="text-amber-300">24–48h Pan-India Air/Surface</span>
            </div>
            <iframe
              title="InsulTherm Innovations Sanand GIDC Gujarat Facility Map"
              src={COMPANY_INFO.mapEmbedUrl}
              className="w-full h-64 border-0"
              loading="lazy"
            />
          </div>
        </div>

        {/* Right 7 Cols: Custom CAD Upload & Technical RFQ Form */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-[#E2E0D8] rounded-md p-6 sm:p-8 shadow-sm">
            {submitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                </div>
                <h2 className="text-2xl font-display font-bold text-[#14171A]">
                  Engineering Brief & CAD Logged
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Routed directly to <strong className="font-mono">{COMPANY_INFO.routingEmail}</strong>. Our Sanand CAM & thermal engineering team will respond within 2–4 business hours with nested area pricing and DFM notes.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`mailto:${COMPANY_INFO.routingEmail}?cc=${COMPANY_INFO.officialEmail}&subject=${encodeURIComponent(
                      `[CAD/RFQ Follow-Up] ${company} — ${productInterest}`
                    )}`}
                    className="px-4 py-2.5 rounded bg-[#E04819] text-white text-xs font-bold"
                  >
                    Open Direct Email Thread
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 rounded border border-[#E2E0D8] text-xs font-semibold text-slate-700"
                  >
                    Submit Another Drawing
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E2E0D8] pb-4">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-[#E04819] font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    Multipart CAD Submission • NDA Protected
                  </div>
                  <h2 className="text-2xl font-display font-bold text-[#14171A] mt-1">
                    Send Custom CAD (.DXF / .STEP / .PDF) or Volume Schedule
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lead Thermal / Mechanical Engineer"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / Lab / University *
                    </label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Organization Name"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@company.in"
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm"
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
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Application Sector
                    </label>
                    <select
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] bg-white text-sm"
                    >
                      <option>EV Battery / AIS-156 Pack</option>
                      <option>Grid-Scale BESS / Utility Solar</option>
                      <option>Defense PSU / UAV / SpaceTech</option>
                      <option>AI Data Center / SiC Power Electronics</option>
                      <option>ThermaFix™ Pro-Bench / Distributor</option>
                      <option>University Formula EV / Robotics Team</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Material Platform
                    </label>
                    <select
                      value={productInterest}
                      onChange={(e) => setProductInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] bg-white text-sm"
                    >
                      {PRODUCTS.map((p) => (
                        <option key={p.id} value={p.trademarkName}>
                          {p.trademarkName} ({p.subBrandCode})
                        </option>
                      ))}
                      <option value="Turnkey <₹15k R&D Homologation Kit">
                        Turnkey &lt;₹15k R&D Homologation Kit
                      </option>
                      <option value="Rapid-Cut™ Custom Toll Converting">
                        Rapid-Cut™ Custom Toll Converting
                      </option>
                    </select>
                  </div>
                </div>

                {/* Custom CAD File Dropzone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Attach Custom CAD File or Drawing (.DXF, .STEP, .IGES, .DWG, .PDF, .ZIP)
                  </label>
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-[#E04819]/50 hover:border-[#E04819] bg-[#FFF3EE]/40 rounded-md p-5 text-center cursor-pointer transition-colors"
                  >
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg"
                      onChange={(e) => setCadFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    {cadFile ? (
                      <div className="flex items-center justify-center gap-2.5 text-sm font-mono font-bold text-emerald-800">
                        <FileCode2 className="w-5 h-5 text-[#E04819]" />
                        <span>
                          {cadFile.name} ({(cadFile.size / 1024).toFixed(1)} KB) — Ready to Transmit
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-6 h-6 text-[#E04819] mx-auto" />
                        <div className="text-xs sm:text-sm font-bold text-[#14171A]">
                          Click to Browse & Attach Custom CAD / Engineering Print
                        </div>
                        <div className="text-xs text-slate-500">
                          Supports 2D .DXF flat patterns, 3D .STEP assemblies, and dimensioned .PDF drawings
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Bounding-Box Dimensions (L × W × Thickness mm) & Target Quantity
                  </label>
                  <input
                    type="text"
                    value={dimensionsQty}
                    onChange={(e) => setDimensionsQty(e.target.value)}
                    placeholder="e.g. 148 × 95 × 1.50 mm — 40 pcs Prototype + 2,500 pcs/month Volume"
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Thermal / Dielectric Operating Conditions & Special Notes *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={technicalBrief}
                    onChange={(e) => setTechnicalBrief(e.target.value)}
                    placeholder="Share max operating temp, voltage isolation (kV), clamping pressure, PSA preference, or NDA request..."
                    className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-6 rounded bg-[#E04819] hover:bg-[#BF360C] disabled:opacity-60 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {submitting
                    ? 'Transmitting CAD & Engineering RFQ...'
                    : `Transmit CAD & Request Quote (${COMPANY_INFO.routingEmail}) →`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
