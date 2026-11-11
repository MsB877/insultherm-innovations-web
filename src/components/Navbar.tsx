import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ShoppingBag,
  Upload,
  Tag,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { items, totalUnits, openConfigurator, openCheckout } = useOrderCart();

  const navLinks = [
    { label: 'Overview', path: '/' },
    { label: 'Products & Specs', path: '/products' },
    { label: 'Instant CAD Quote', path: '/quote' },
    { label: 'Validation & About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Signature Black & Red Accent Rule */}
      <div className="h-1 w-full insultherm-accent-bar" />

      {/* Clean Top Utility Bar */}
      <div className="bg-[#0F1115] text-gray-300 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5">
            <span className="inline-flex items-center gap-1.5 font-mono text-gray-200">
              <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>{COMPANY_INFO.phoneMasked}</span>
            </span>
            <a
              href={`mailto:${COMPANY_INFO.officialEmail}`}
              className="inline-flex items-center gap-1.5 font-mono text-gray-200 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>{COMPANY_INFO.officialEmail}</span>
            </a>
            <span className="hidden xl:inline-flex items-center gap-1.5 text-gray-400">
              <MapPin className="w-3.5 h-3.5 text-[#DC2626]" />
              {COMPANY_INFO.shortAddress}
            </span>
          </div>

          <button
            type="button"
            onClick={openCheckout}
            className="hidden sm:inline-flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors"
          >
            <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
            <span>
              Checkout Offers: <strong className="font-mono text-white">PROTO10</strong> •{' '}
              <strong className="font-mono text-white">RNDKIT1000</strong> •{' '}
              <strong className="font-mono text-white">PILOT12</strong>
            </span>
          </button>
        </div>
      </div>

      {/* Spacious Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Wordmark: Insul (Black) + Therm (Red) */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-white p-1 border border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-[#DC2626] transition-colors">
              <img
                src="/assets/brand/logo.png"
                alt="InsulTherm Innovations Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight leading-none">
                <span className="text-[#0F1115]">Insul</span>
                <span className="text-[#DC2626]">Therm</span>{' '}
                <span className="font-semibold text-gray-700 text-base sm:text-lg">
                  Innovations
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1 hidden sm:block">
                Thermal, Fire-Barrier & Dielectric Materials
              </div>
            </div>
          </Link>

          {/* Clean Desktop Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(item.path)
                    ? 'text-[#DC2626] bg-red-50/70'
                    : 'text-gray-700 hover:text-[#0F1115] hover:bg-gray-100/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => openConfigurator()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-gray-300 hover:border-[#0F1115] text-xs font-bold text-[#0F1115] transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-[#DC2626]" />
              Upload CAD
            </button>
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-bold text-white shadow-sm transition-colors tabular-nums"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Cart</span>
              {items.length > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-[#0F1115] text-white font-mono text-[11px]">
                  {items.length} ({totalUnits})
                </span>
              )}
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openCheckout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#DC2626] text-white text-xs font-bold tabular-nums"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{items.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-lg border border-gray-200 text-[#0F1115]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-semibold ${
                isActive(item.path)
                  ? 'bg-red-50 text-[#DC2626]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openConfigurator();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0F1115] text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-[#DC2626]" />
              Upload Custom CAD & Price by Area
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
