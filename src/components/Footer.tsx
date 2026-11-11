import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, FileDown, ShieldCheck, ArrowUpRight, Upload } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const Footer: React.FC = () => {
  const { openConfigurator, openCheckout } = useOrderCart();

  return (
    <footer className="bg-[#14171A] text-slate-300 border-t border-slate-800">
      <div className="h-1.5 w-full brand-chromatic-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded bg-white p-1 flex items-center justify-center">
                <img
                  src="/assets/brand/logo.png"
                  alt="InsulTherm Innovations"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-lg font-display font-bold text-white">
                  InsulTherm <span className="text-[#E04819]">Innovations</span>
                </div>
                <div className="text-xs font-serif italic text-slate-400">
                  {COMPANY_INFO.brandMotto}
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Multi-platform thermal management, cell-to-cell fire containment, and 3D living-hinge dielectric materials—combining custom digital CNC converting (₹0 tooling NRE) with off-the-shelf R&D and Pro-Bench packs.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                UL 94 V-0
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                AIS-156 / UL 9540A
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                ASTM E595
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-[#E04819]">
                100% India DVA
              </span>
            </div>
          </div>

          {/* 5 Material Sub-Brands + TDS PDFs */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Material Sub-Brands & TDS PDFs
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 group">
                  <Link
                    to="/products"
                    className="text-slate-400 hover:text-white transition-colors truncate"
                  >
                    <span className="text-[10px] font-mono text-[#E04819] mr-1.5">
                      {p.subBrandCode.split(' ')[0]}
                    </span>
                    {p.trademarkName}
                  </Link>
                  <a
                    href={p.tdsUrl}
                    download
                    title={`Download ${p.trademarkName} 2-Page TDS PDF`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 hover:text-amber-300 shrink-0"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    TDS
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brand Ecosystem & Direct Purchase */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Direct Ordering
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Overview & Selector
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  ₹/cm² Area Pricing Guide
                </Link>
              </li>
              <li>
                <Link to="/products#pro-bench" className="hover:text-white transition-colors">
                  ThermaFix™ Pro-Bench Packs
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  4-Quadrant FEA & CAD Lab
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openConfigurator()}
                  className="inline-flex items-center gap-1 text-[#E04819] hover:text-orange-300 font-semibold text-left"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Upload CAD & Buy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCheckout}
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold text-left"
                >
                  Open Order Cart <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Gujarat Manufacturing & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
              Manufacturing & Direct Desk
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E04819] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  {COMPANY_INFO.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-slate-200 pt-1">
                <Phone className="w-4 h-4 text-[#E04819] shrink-0" />
                <span>{COMPANY_INFO.phoneMasked}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-[#E04819] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.officialEmail}`}
                  className="text-slate-200 hover:text-[#E04819] transition-colors"
                >
                  {COMPANY_INFO.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.routingEmail}`}
                  className="text-slate-300 hover:text-emerald-300 transition-colors"
                >
                  Orders/RFQ: {COMPANY_INFO.routingEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Leadership: Manav, Nikhil & Sukhmeet.
          </div>
          <div className="font-mono text-[11px] text-slate-500">
            Shield™ • Barrier™ • Graphite-Flex™ • Core™ • Ultra™ • ThermaFix™
          </div>
        </div>
      </div>
    </footer>
  );
};
