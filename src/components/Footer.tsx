import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import { CONTACT_CONFIG, CORE_PRODUCTS } from '../data/companyData';

interface FooterProps {
  onOpenInquiry: (preset?: {
    productName?: string;
    variant?: string;
    pricingTier?: string;
  }) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry }) => {
  return (
    <footer className="bg-[#0B192C] text-slate-300 border-t border-slate-800">
      {/* Open Engineering Data-Room Banner */}
      <div className="border-b border-slate-800 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 mb-1">
              <Layers className="w-4 h-4" />
              <span>Open Engineering Data-Room &amp; Lot Traceability</span>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              Batch-wise ASTM D5470-17 thermal impedance curves (10–50 psi), 1,000-hour 50°C–150°C anti-bleed stability logs, and HSN 39199090 / 85479090 Make-in-India DVA declarations available for Tier-1 quality audits.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onOpenInquiry({
                productName: 'Engineering Data-Room & Qualification Dossier Request',
                pricingTier: 'ASTM D5470 / UL 94 / DVA Compliance Pack',
              })
            }
            className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shrink-0"
          >
            <span>Request Qualification Dossier</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Col 1: Brand & Mission */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1.5 flex items-center justify-center shrink-0">
              <img
                src="/assets/brand/logo.png"
                alt="InsulTherm Innovations"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-base font-extrabold text-white tracking-tight">
                INSULTHERM <span className="text-orange-500">INNOVATIONS</span>
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                CAD-TO-PART THERMAL &amp; DIELECTRIC SYSTEMS
              </div>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-400">
            India&apos;s rapid-turn, tool-free digital converter and specialty compounder of thermal interface materials, 1,100°C nanoporous aerogel-mica fire barriers, 3D dielectric busbar origami, and ASTM E595 pyrolytic graphite spreaders—delivered in 24–48 hours with ₹0 tooling NRE.
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {['ASTM D5470-17', 'UL 94 V-0', 'ARAI AIS-156', 'ASTM E595', '100% India DVA'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800/90 border border-slate-700 text-[11px] font-mono text-slate-200"
              >
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2: Technical Data Sheets (Direct 2-Page PDFs) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            5 Core Proprietary IPs &amp; TDS (PDF)
          </h3>
          <ul className="space-y-2">
            {CORE_PRODUCTS.map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-2 text-xs border-b border-slate-800/70 pb-2">
                <Link to="/products" className="text-slate-300 hover:text-white font-medium">
                  {p.name}{' '}
                  <span className="text-[11px] font-mono text-slate-400">({p.categoryLabel})</span>
                </Link>
                <a
                  href={p.tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-orange-400 hover:text-orange-300 shrink-0"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>TDS PDF</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Hardcoded Contact, Privacy & Gujarat SEZ Location */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Manufacturing Wing &amp; Engineering Desk
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
              <span className="text-slate-300 leading-relaxed">{CONTACT_CONFIG.addressFull}</span>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <Phone className="w-4 h-4 text-orange-500 shrink-0" />
              <span className="text-white font-semibold">{CONTACT_CONFIG.phoneMasked}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                Privacy Masked
              </span>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <Mail className="w-4 h-4 text-orange-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Primary Official Desk</div>
                <a
                  href={`mailto:${CONTACT_CONFIG.emailPrimary}`}
                  className="text-white hover:text-orange-400 underline underline-offset-2"
                >
                  {CONTACT_CONFIG.emailPrimary}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase">Active Operations &amp; Lead Routing</div>
                <a
                  href={`mailto:${CONTACT_CONFIG.emailOperations}`}
                  className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2"
                >
                  {CONTACT_CONFIG.emailOperations}
                </a>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-3 text-xs font-semibold">
            <Link to="/" className="text-slate-400 hover:text-white">
              Home
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/products" className="text-slate-400 hover:text-white">
              Products &amp; Pricing
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/about" className="text-slate-400 hover:text-white">
              About &amp; R&amp;D
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/contact" className="text-slate-400 hover:text-white">
              Contact Hub
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800 bg-[#081220]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} InsulTherm Innovations. All Rights Reserved. Engineered in Gujarat, India.
          </div>
          <div className="font-mono">
            Tel: {CONTACT_CONFIG.phoneMasked} | {CONTACT_CONFIG.emailPrimary} | {CONTACT_CONFIG.emailOperations}
          </div>
        </div>
      </div>
    </footer>
  );
};
