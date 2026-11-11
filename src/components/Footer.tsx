import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, FileDown, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, PRODUCTS } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const Footer: React.FC = () => {
  const { openCheckout } = useOrderCart();

  return (
    <footer className="bg-[#0F1115] text-gray-300">
      <div className="h-1 w-full insultherm-accent-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
                <img
                  src="/assets/brand/logo.png"
                  alt="InsulTherm Innovations"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xl font-extrabold tracking-tight text-white">
                <span>Insul</span>
                <span className="text-[#DC2626]">Therm</span>{' '}
                <span className="font-semibold text-gray-300 text-base">Innovations</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Precision thermal interface materials, 1,100°C runaway fire barriers, pyrolytic graphite spreaders, and 3D living-hinge dielectric shrouds—custom CNC-converted in 24–48 hours with zero tooling NRE.
            </p>
          </div>

          {/* Products & TDS */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Materials & Data Sheets
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2">
                  <Link
                    to={`/products#${p.id}`}
                    className="text-gray-400 hover:text-white transition-colors truncate"
                  >
                    {p.trademarkName}
                  </Link>
                  <a
                    href={p.tdsUrl}
                    download
                    className="inline-flex items-center gap-1 text-xs font-mono text-gray-300 hover:text-[#DC2626] shrink-0"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#DC2626]" />
                    TDS
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/products" className="hover:text-white transition-colors">
                  Product Catalog
                </Link>
              </li>
              <li>
                <Link to="/quote" className="hover:text-white transition-colors">
                  Instant Area Quote
                </Link>
              </li>
              <li>
                <Link to="/products#rnd-kits" className="hover:text-white transition-colors">
                  R&D & Starter Kits
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  FEA & CAD Validation
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCheckout}
                  className="text-[#DC2626] hover:text-red-400 font-semibold text-left"
                >
                  Checkout & Offers →
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Gujarat Facility */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Facility & Direct Desk
            </h3>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  {COMPANY_INFO.addressLines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2.5 font-mono text-gray-200 pt-1">
                <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                <span>{COMPANY_INFO.phoneMasked}</span>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.officialEmail}`}
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  {COMPANY_INFO.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 font-mono">
                <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <a
                  href={`mailto:${COMPANY_INFO.routingEmail}`}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Orders: {COMPANY_INFO.routingEmail}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </div>
          <div>Sanand GIDC, Ahmedabad, Gujarat • 100% Make-in-India Supply</div>
        </div>
      </div>
    </footer>
  );
};
