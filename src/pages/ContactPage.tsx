import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { CONTACT_CONFIG, CORE_PRODUCTS } from '../data/companyData';

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyOrg, setCompanyOrg] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inquiryType, setInquiryType] = useState('24–48 Hr Custom CAD Prototype Quote');
  const [productInterest, setProductInterest] = useState('InsulTherm Shield™ (3D Dielectric Origami)');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buildDirectMailto = () => {
    const subject = encodeURIComponent(
      `[InsulTherm Technical Support / RFQ] ${inquiryType} — ${companyOrg || fullName}`
    );
    const body = encodeURIComponent(
      `INSULTHERM INNOVATIONS — CONTACT & TECHNICAL SUPPORT SUBMISSION\n` +
        `================================================================\n` +
        `Inquiry Category: ${inquiryType}\n` +
        `Primary Material Interest: ${productInterest}\n\n` +
        `Name: ${fullName}\n` +
        `Work Email: ${workEmail}\n` +
        `Organization: ${companyOrg}\n` +
        `Phone: ${phoneNumber}\n\n` +
        `TECHNICAL SPECIFICATIONS / MESSAGE:\n${message}\n`
    );
    return `mailto:${CONTACT_CONFIG.emailOperations}?cc=${CONTACT_CONFIG.emailPrimary}&subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload: Record<string, string> = {
      'form-name': 'contact-engineering',
      routing_destination: CONTACT_CONFIG.emailOperations,
      full_name: fullName,
      work_email: workEmail,
      company_organization: companyOrg,
      phone_number: phoneNumber,
      inquiry_type: inquiryType,
      product_interest: productInterest,
      message,
    };

    try {
      // 1. Netlify Forms POST
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      }).catch(() => null);

      // 2. Direct operational email routing to manavsb9719@gmail.com
      await fetch(`https://formsubmit.co/ajax/${CONTACT_CONFIG.emailOperations}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `[InsulTherm Contact Hub] ${inquiryType} — ${companyOrg || fullName}`,
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
    <div className="bg-slate-50 pb-20">
      {/* Header */}
      <section className="bg-[#0B192C] text-white border-b border-slate-800 bg-dark-grid py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Contact &amp; Technical Support Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Direct Application Engineering &amp; CAD Desk
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Connect directly with our thermal and dielectric conversion engineers in Gujarat for 24–48 hour prototype turnarounds, &lt;₹15,000 lab sampler bundles, or OEM blanket supply schedules.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Cols: Hardcoded Verified Contact & Gujarat Facility Details */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
              <h2 className="text-xl font-extrabold text-slate-900">
                Official Engineering &amp; Operations Channels
              </h2>

              {/* Phone (STRICT PRIVACY MASK) */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Engineering Helpline (Privacy Protected)
                  </div>
                  <div className="text-base font-mono font-extrabold text-slate-900 mt-0.5">
                    {CONTACT_CONFIG.phoneMasked}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Direct phone callback issued upon RFQ / NDA verification
                  </div>
                </div>
              </div>

              {/* Primary Official Display Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Primary Official Display Email
                  </div>
                  <a
                    href={`mailto:${CONTACT_CONFIG.emailPrimary}`}
                    className="text-base font-mono font-bold text-orange-600 hover:text-orange-700 underline underline-offset-2 mt-0.5 inline-block"
                  >
                    {CONTACT_CONFIG.emailPrimary}
                  </a>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Executive correspondence, OEM nominations &amp; compliance audits
                  </div>
                </div>
              </div>

              {/* Active Operations & Lead-Routing Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-emerald-800 font-bold">
                    Active Operations &amp; Order/RFQ Routing Desk
                  </div>
                  <a
                    href={`mailto:${CONTACT_CONFIG.emailOperations}`}
                    className="text-base font-mono font-extrabold text-emerald-800 hover:text-emerald-900 underline underline-offset-2 mt-0.5 inline-block"
                  >
                    {CONTACT_CONFIG.emailOperations}
                  </a>
                  <div className="text-[11px] text-emerald-900/80 mt-0.5">
                    All live website orders, .DXF/.STEP CAD files &amp; sampler kit dispatches route here
                  </div>
                </div>
              </div>

              {/* Gujarat Manufacturing Wing */}
              <div className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 font-semibold">
                    Gujarat Manufacturing &amp; Digital Converting Wing
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed mt-1">
                    {CONTACT_CONFIG.addressFull}
                  </p>
                </div>
              </div>

              {/* SLA Box */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0B192C] text-white text-xs font-mono">
                <Clock className="w-4 h-4 text-orange-400 shrink-0" />
                <span>
                  CAD DFM Review: &lt;4 Hrs | Prototype Dispatch: 24–48 Hrs (Mon–Sat)
                </span>
              </div>
            </div>

            {/* Quick TDS Reference Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <div className="text-xs font-mono uppercase text-slate-500 font-bold">
                Instant Product TDS Downloads (PDF)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CORE_PRODUCTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <span>{p.name}</span>
                    <FileText className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Netlify Forms + Direct Lead Routing Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <div className="text-xs font-mono uppercase text-orange-600 font-bold">
                Netlify Forms + Live Lead Routing ({CONTACT_CONFIG.emailOperations})
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Submit Engineering Inquiry or Request Proforma Invoice
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Every submission is delivered directly to{' '}
                <span className="font-mono font-semibold text-slate-900">
                  {CONTACT_CONFIG.emailOperations}
                </span>{' '}
                for immediate engineering review.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">
                      Technical Support &amp; RFQ Payload Transmitted
                    </h3>
                    <p className="text-sm text-slate-700 mt-1">
                      Thank you, <strong>{fullName}</strong>. Your inquiry regarding{' '}
                      <strong>{productInterest}</strong> has been routed to{' '}
                      <span className="font-mono font-bold text-emerald-800">
                        {CONTACT_CONFIG.emailOperations}
                      </span>
                      .
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-200 text-xs font-mono text-slate-700 space-y-1">
                  <div>
                    <strong>Destination:</strong> {CONTACT_CONFIG.emailOperations} (CC:{' '}
                    {CONTACT_CONFIG.emailPrimary})
                  </div>
                  <div>
                    <strong>Inquiry Type:</strong> {inquiryType}
                  </div>
                  <div>
                    <strong>Product Focus:</strong> {productInterest}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={buildDirectMailto()}
                    className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send CAD Attachment via Email Client ({CONTACT_CONFIG.emailOperations})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form
                name="contact-engineering"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <input type="hidden" name="form-name" value="contact-engineering" />
                <input
                  type="hidden"
                  name="routing_destination"
                  value={CONTACT_CONFIG.emailOperations}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Lead Engineer / Procurement Manager"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
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
                      placeholder="name@organization.in"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Company / PSU / R&amp;D Lab *
                    </label>
                    <input
                      type="text"
                      name="company_organization"
                      required
                      value={companyOrg}
                      onChange={(e) => setCompanyOrg(e.target.value)}
                      placeholder="Company or Research Institution"
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+91 ..."
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiry_type"
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                    >
                      <option>24–48 Hr Custom CAD Prototype Quote</option>
                      <option>&lt;₹15,000 Petty-Cash Turnkey R&amp;D Kit Order</option>
                      <option>BESS / Rail / Defense Volume Supply RFQ</option>
                      <option>ASTM D5470 / E595 / DVA Qualification Dossier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Material IP Interest
                    </label>
                    <select
                      name="product_interest"
                      value={productInterest}
                      onChange={(e) => setProductInterest(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                    >
                      {CORE_PRODUCTS.map((p) => (
                        <option key={p.id} value={`${p.name} (${p.categoryLabel})`}>
                          {p.name} ({p.primaryPriceHeadline})
                        </option>
                      ))}
                      <option value="Multi-IP Turnkey Homologation / Sampler Bundle">
                        Multi-IP Turnkey Homologation / Sampler Bundle
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Application Parameters, Dimensions &amp; Quantity *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share part dimensions (mm), thickness, operating temperature (°C), dielectric breakdown target (kV), quantity, and target delivery timeline..."
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 focus:border-orange-600 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'Transmitting Inquiry...'
                      : `Route Inquiry to ${CONTACT_CONFIG.emailOperations}`}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Embedded Interactive Gujarat Manufacturing Map */}
        <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs font-mono uppercase text-orange-600 font-bold">
                Gujarat Industrial Manufacturing Ecosystem
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Sanand GIDC Industrial Estate / iCreate Corridor, Ahmedabad, Gujarat
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">{CONTACT_CONFIG.addressFull}</p>
            </div>
            <a
              href={`https://www.openstreetmap.org/?mlat=${CONTACT_CONFIG.mapCoordinates.lat}&mlon=${CONTACT_CONFIG.mapCoordinates.lng}#map=13/${CONTACT_CONFIG.mapCoordinates.lat}/${CONTACT_CONFIG.mapCoordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 hover:border-slate-900 text-xs font-bold text-slate-800 shrink-0"
            >
              <span>Open Full Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="w-full h-80 sm:h-96 bg-slate-100">
            <iframe
              title="InsulTherm Innovations Gujarat Manufacturing Zone Map"
              src={CONTACT_CONFIG.mapCoordinates.embedUrl}
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
