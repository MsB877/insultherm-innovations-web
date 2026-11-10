import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Phone,
  Mail,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  FileText,
  ChevronDown,
} from 'lucide-react';
import { CONTACT_CONFIG, CORE_PRODUCTS } from '../data/companyData';

interface NavbarProps {
  onOpenInquiry: (preset?: {
    productName?: string;
    variant?: string;
    pricingTier?: string;
    quantity?: string;
    dimensions?: string;
  }) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tdsMenuOpen, setTdsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products & Catalog', path: '/products' },
    { label: 'About & Manufacturing', path: '/about' },
    { label: 'Contact & Support', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full shadow-sm">
      {/* Top Sovereign Compliance & Direct Engineering Contact Strip */}
      <div className="bg-[#0B192C] text-slate-200 border-b border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 font-medium text-orange-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>100% India DVA (PM E-DRIVE, SECI BESS &amp; &lt;₹200Cr GTE Compliant)</span>
            </span>
            <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-300 font-mono text-[11px]">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              24–48 Hr CAD-to-Part | ₹0 Hard-Tooling NRE
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-slate-200" title="Privacy-Protected Engineering Desk">
              <Phone className="w-3 h-3 text-orange-400 shrink-0" />
              <span>{CONTACT_CONFIG.phoneMasked}</span>
            </span>
            <a
              href={`mailto:${CONTACT_CONFIG.emailPrimary}`}
              className="inline-flex items-center gap-1 text-slate-200 hover:text-orange-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-orange-400 shrink-0" />
              <span>{CONTACT_CONFIG.emailPrimary}</span>
            </a>
            <a
              href={`mailto:${CONTACT_CONFIG.emailOperations}`}
              className="hidden sm:inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              title="Direct Operations & RFQ Routing"
            >
              <span>RFQ: {CONTACT_CONFIG.emailOperations}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-white border border-slate-200 p-1.5 shadow-sm group-hover:border-orange-500 transition-colors flex items-center justify-center">
              <img
                src="/assets/brand/logo.png"
                alt="InsulTherm Innovations Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="leading-tight">
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                INSULTHERM <span className="text-orange-600">INNOVATIONS</span>
              </div>
              <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500">
                Advanced Interface Materials
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-md text-sm font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:text-orange-600 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Quick TDS Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTdsMenuOpen(true)}
              onMouseLeave={() => setTdsMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setTdsMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-md text-sm font-semibold text-slate-700 hover:text-orange-600 hover:bg-slate-100 transition-colors"
              >
                <FileText className="w-4 h-4 text-orange-600" />
                <span>TDS Data Sheets</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {tdsMenuOpen && (
                <div className="absolute right-0 mt-0 w-72 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2">
                    <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      Official 2-Page PDF Data Sheets
                    </div>
                    {CORE_PRODUCTS.map((p) => (
                      <a
                        key={p.id}
                        href={p.tdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-xs font-medium text-slate-800 group"
                      >
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-orange-600">
                            {p.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-500">{p.tdsDocCode}</div>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-orange-600" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                onOpenInquiry({
                  productName: 'InsulTherm Multi-IP Engineering Evaluation',
                  pricingTier: 'Custom CAD Prototype / Volume RFQ',
                })
              }
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg shadow-sm transition-all"
            >
              <span>Request Engineering Quote</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-slate-700 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-semibold ${
                    isActive(item.path)
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 px-1">
                Instant Technical Data Sheets (PDF)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CORE_PRODUCTS.map((p) => (
                  <a
                    key={p.id}
                    href={p.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <span>{p.name} TDS</span>
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onOpenInquiry({
                    productName: 'InsulTherm Multi-IP Engineering Evaluation',
                    pricingTier: 'Custom CAD Prototype / Volume RFQ',
                  });
                }}
                className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-3 rounded-lg"
              >
                <span>Request Engineering Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <div className="flex flex-col gap-1 text-xs font-mono text-slate-600 px-1 pt-1">
                <span>Tel: {CONTACT_CONFIG.phoneMasked}</span>
                <a href={`mailto:${CONTACT_CONFIG.emailPrimary}`} className="text-orange-600">
                  {CONTACT_CONFIG.emailPrimary}
                </a>
                <a href={`mailto:${CONTACT_CONFIG.emailOperations}`} className="text-emerald-700">
                  {CONTACT_CONFIG.emailOperations}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
