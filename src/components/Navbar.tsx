import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ShoppingBag,
  Upload,
  FileDown,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { items, totalUnits, openConfigurator, openCheckout } = useOrderCart();

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Materials & Area Pricing', path: '/products' },
    { label: 'Manufacturing & FEA', path: '/about' },
    { label: 'CAD Desk & Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const jumpToProBench = () => {
    setMobileOpen(false);
    if (location.pathname !== '/products') {
      navigate('/products');
      setTimeout(() => {
        document.getElementById('pro-bench')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById('pro-bench')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E0D8]">
      {/* 3M / Henkel Inspired Multi-Division Chromatic Strip */}
      <div className="h-1.5 w-full brand-chromatic-bar" />

      {/* Top Engineering Utility Bar */}
      <div className="bg-[#14171A] text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            <span className="inline-flex items-center gap-1.5 font-mono text-slate-200">
              <Phone className="w-3.5 h-3.5 text-[#E04819]" />
              <span>{COMPANY_INFO.phoneMasked}</span>
            </span>
            <a
              href={`mailto:${COMPANY_INFO.officialEmail}`}
              className="inline-flex items-center gap-1.5 font-mono text-slate-200 hover:text-[#E04819] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#E04819]" />
              <span>{COMPANY_INFO.officialEmail}</span>
            </a>
            <a
              href={`mailto:${COMPANY_INFO.routingEmail}`}
              className="hidden xl:inline-flex items-center gap-1.5 font-mono text-slate-400 hover:text-white transition-colors"
            >
              <span>Direct Order Desk: {COMPANY_INFO.routingEmail}</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4 font-mono text-[11px]">
            <span className="inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#E04819]" />
              {COMPANY_INFO.shortAddress}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700/60">
              ₹0 Tooling NRE • Transparent ₹/cm² Pricing
            </span>
          </div>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-11 h-11 rounded bg-white p-1 border border-[#E2E0D8] shadow-sm flex items-center justify-center overflow-hidden group-hover:border-[#E04819] transition-colors">
              <img
                src="/assets/brand/logo.png"
                alt="InsulTherm Innovations Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-display font-bold tracking-tight text-[#14171A] leading-none">
                InsulTherm <span className="text-[#E04819]">Innovations</span>
              </div>
              <div className="text-[11px] font-serif italic text-slate-600 mt-0.5 tracking-normal">
                {COMPANY_INFO.brandMotto}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded text-sm font-semibold transition-all ${
                  isActive(item.path)
                    ? 'bg-[#14171A] text-white'
                    : 'text-slate-700 hover:text-[#14171A] hover:bg-[#F6F5F1]'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={jumpToProBench}
              className="px-3 py-2 rounded text-sm font-semibold text-emerald-800 hover:bg-emerald-50 transition-colors"
            >
              ThermaFix™ Bench
            </button>
          </nav>

          {/* Desktop Actions: Upload CAD + Direct Order Cart */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openConfigurator()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded border border-[#14171A] text-xs font-bold text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#E04819]" />
              Upload CAD & Price
            </button>
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-xs font-bold text-white shadow-sm transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Desk</span>
              <span className="px-1.5 py-0.5 rounded bg-[#14171A] text-white font-mono text-[11px]">
                {items.length > 0 ? `${items.length} (${totalUnits})` : '0'}
              </span>
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#E04819] text-white text-xs font-bold"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{items.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded border border-[#E2E0D8] text-[#14171A]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-[#E2E0D8] px-4 pt-3 pb-6 space-y-2 shadow-xl">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-3.5 py-2.5 rounded text-sm font-semibold ${
                isActive(item.path)
                  ? 'bg-[#14171A] text-white'
                  : 'text-slate-700 hover:bg-[#F6F5F1]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={jumpToProBench}
            className="w-full text-left px-3.5 py-2.5 rounded text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            ThermaFix™ Pro-Bench Direct Packs (₹499–₹1,199)
          </button>
          <div className="pt-3 border-t border-[#E2E0D8] grid grid-cols-1 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openConfigurator();
              }}
              className="w-full py-2.5 px-4 rounded border border-[#14171A] text-xs font-bold text-[#14171A] flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#E04819]" />
              Upload Custom CAD (.DXF / .STEP) & Instant Quote
            </button>
            <Link
              to="/products#tds-downloads"
              onClick={() => setMobileOpen(false)}
              className="w-full py-2.5 px-4 rounded bg-[#F6F5F1] text-xs font-semibold text-slate-700 flex items-center justify-center gap-2"
            >
              <FileDown className="w-4 h-4 text-[#E04819]" />
              Download All 5 Two-Page TDS PDFs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
