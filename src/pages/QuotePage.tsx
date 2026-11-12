import React from 'react';
import { Tag, CheckCircle2, ShoppingBag } from 'lucide-react';
import { CadQuoteEngine } from '../components/CadQuoteEngine';
import { CHECKOUT_COUPONS } from '../utils/couponEngine';
import { useOrderCart } from '../context/OrderCartContext';

export const QuotePage: React.FC = () => {
  const { openCheckout, items } = useOrderCart();

  return (
    <div className="bg-canvas-tonal pb-24">
      {/* Balanced Architectural Header */}
      <section className="relative bg-hero-architectural bg-subtle-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              Zero-Tooling Digital CNC Desk
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1115] tracking-tight">
              Instant Area-Based Pricing & Custom CAD Upload
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Calculate exact prototype or nested volume pricing by part area (cm²), upload your
              2D/3D CAD file, and apply B2B or prototyping offer coupons at checkout—with zero
              steel-die NRE fees.
            </p>
          </div>

          <button
            type="button"
            onClick={openCheckout}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-sm font-bold shrink-0 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Open Checkout & Offers ({items.length})
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Main Calculator */}
        <CadQuoteEngine />

        {/* Available Checkout Offers Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                <Tag className="w-3.5 h-3.5" />
                Active Checkout Promotions
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1115] mt-1">
                B2B & Prototyping Offer Coupons
              </h2>
            </div>
            <p className="text-sm text-gray-600 max-w-md">
              Standard catalog prices remain transparent and uninflated. Apply any eligible code
              inside the Order Cart drawer during checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {CHECKOUT_COUPONS.map((c) => (
              <div
                key={c.code}
                className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#0F1115] text-white">
                      {c.code}
                    </span>
                    <span className="text-xs font-semibold text-[#DC2626]">{c.audience}</span>
                  </div>
                  <div className="text-lg font-bold text-[#0F1115]">{c.badge}</div>
                  <p className="text-sm text-gray-600 leading-relaxed">{c.description}</p>
                  {c.perkLabel && (
                    <div className="flex items-start gap-1.5 text-xs text-gray-700 pt-1">
                      <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{c.perkLabel}</span>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 text-xs font-mono text-gray-500">
                  Min Order: ₹{c.minOrderInr.toLocaleString('en-IN')}
                  {c.minDistinctItems ? ` • ${c.minDistinctItems}+ Materials` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
