import React, { useState } from 'react';
import {
  FileText,
  ShoppingCart,
  Search,
  Filter,
  Layers,
  CheckCircle2,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { CORE_PRODUCTS, TURNKEY_BUNDLES, ProductItem } from '../data/companyData';
import { ParametricComparisonMatrix } from '../components/ParametricComparisonMatrix';
import { InquiryPreset } from '../components/InquiryModal';

interface ProductsPageProps {
  onOpenInquiry: (preset?: InquiryPreset) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenInquiry }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, number>>({});
  const [activeTabByProd, setActiveTabByProd] = useState<Record<string, 'stack' | 'specs'>>({});

  const categories = [
    { id: 'all', label: 'All 5 Core Products' },
    { id: 'dielectric-origami', label: '3D Dielectric Origami' },
    { id: 'fire-containment', label: '1,100°C Runaway Firewalls' },
    { id: 'lateral-spreader', label: 'Pyrolytic Graphite Spreaders' },
    { id: 'vertical-tim', label: 'Vertical Conduction TIMs' },
  ];

  const filteredProducts = CORE_PRODUCTS.filter((p) => {
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.materialBaseShort.toLowerCase().includes(q) ||
      p.applications.some((a) => a.toLowerCase().includes(q)) ||
      p.variants.some((v) => v.code.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const getVariantIndex = (prodId: string) => selectedVariants[prodId] || 0;
  const getActiveTab = (prodId: string) => activeTabByProd[prodId] || 'stack';

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Page Hero */}
      <section className="bg-[#0B192C] text-white border-b border-slate-800 bg-dark-grid py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
            <Layers className="w-4 h-4" />
            <span>Products &amp; Technical Engineering Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            5 Core Proprietary Interface Materials &amp; Pricing
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Inspect full internal layer stacks, ASTM / UL / IEC test parameters, transparent prototype &amp; OEM pricing tiers, and standalone 2-page Technical Data Sheets (PDF) across our entire portfolio.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-slate-500 mr-1">
              <Filter className="w-3.5 h-3.5 text-orange-600" />
              Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                  categoryFilter === cat.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search k, UL 94, SiC, BESS, E595..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm focus:border-orange-600 focus:outline-none"
            />
          </div>
        </div>

        {/* Detailed 5-Product Technical Cards */}
        <div className="space-y-10">
          {filteredProducts.map((product: ProductItem) => {
            const vIdx = getVariantIndex(product.id);
            const activeVariant = product.variants[vIdx] || product.variants[0];
            const detailTab = getActiveTab(product.id);

            return (
              <article
                key={product.id}
                id={product.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left 5 Cols: Studio Macro Image, Badges & Pricing Schedule */}
                  <div className="lg:col-span-5 bg-slate-900 text-white p-6 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`${product.badgeColor} text-white text-[11px] font-mono font-bold uppercase px-2.5 py-1 rounded`}
                        >
                          {product.categoryLabel}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{product.tdsDocCode}</span>
                      </div>

                      <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                        <img
                          src={product.image}
                          alt={`${product.name} Macro Studio View`}
                          className="w-full h-56 sm:h-64 object-cover"
                        />
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {product.quickBadges.map((badge) => (
                          <span
                            key={badge}
                            className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-[11px] text-orange-300"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Explicit Documented Pricing Structure */}
                    <div className="bg-slate-800/90 border border-slate-700 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-bold">
                          Official Pricing Structure
                        </span>
                        <span className="text-[11px] font-mono text-emerald-400">₹0 Tooling NRE</span>
                      </div>

                      <div className="space-y-2 divide-y divide-slate-700/80">
                        {product.pricingTiers.map((tier) => (
                          <div key={tier.tierName} className="pt-2 first:pt-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <span className="text-xs text-slate-300 font-medium">
                                {tier.tierName}
                              </span>
                              <span className="font-mono text-sm font-extrabold text-white shrink-0">
                                {tier.priceDisplay}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">{tier.notes}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Primary Action Buttons: Download TDS (PDF) & Request to Buy */}
                    <div className="space-y-2.5">
                      <a
                        href={product.tdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-extrabold px-4 py-3 rounded-xl transition-colors"
                      >
                        <FileText className="w-4 h-4 text-orange-600 shrink-0" />
                        <span>View / Download Technical Data Sheet (PDF)</span>
                      </a>

                      <button
                        type="button"
                        onClick={() =>
                          onOpenInquiry({
                            productName: product.name,
                            variant: activeVariant.name,
                            pricingTier: `${activeVariant.protoPriceLabel} | ${activeVariant.volumePriceLabel}`,
                          })
                        }
                        className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-xl shadow-md transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4 shrink-0" />
                        <span>Request to Buy — {product.shortName}</span>
                      </button>
                    </div>
                  </div>

                  {/* Right 7 Cols: Chemistry, Premix Variant Selector, Layer Stack & Specs */}
                  <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                    <div>
                      <div className="text-xs font-mono text-orange-600 font-bold uppercase">
                        {product.revenueShare} • {product.targetSectors.join(' • ')}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                        {product.name}
                      </h2>
                      <p className="text-sm font-semibold text-slate-600 mt-1">{product.tagline}</p>
                      <p className="text-sm text-slate-700 leading-relaxed mt-3">
                        {product.chemistryDescription}
                      </p>
                    </div>

                    {/* Selectable Online Premix Variants */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
                      <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
                        Selectable Premix Grades &amp; Thicknesses
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {product.variants.map((v, idx) => (
                          <button
                            key={v.code}
                            type="button"
                            onClick={() =>
                              setSelectedVariants((prev) => ({ ...prev, [product.id]: idx }))
                            }
                            className={`text-left p-3 rounded-xl border transition-all ${
                              vIdx === idx
                                ? 'bg-white border-orange-600 ring-1 ring-orange-600 shadow-sm'
                                : 'bg-white/70 border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-extrabold text-slate-900">
                                {v.code}
                              </span>
                              <span className="text-[11px] font-mono text-orange-700 font-bold">
                                {v.protoPriceLabel.split('(')[0].trim()}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-slate-800 mt-1">
                              {v.name}
                            </div>
                            <div className="text-[11px] text-slate-600 mt-1 leading-snug">
                              {v.chemistrySummary}
                            </div>
                          </button>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[11px] font-mono text-slate-500 mr-1">
                          Available Thicknesses ({activeVariant.code}):
                        </span>
                        {activeVariant.thicknessOptions.map((th) => (
                          <span
                            key={th}
                            className="px-2 py-0.5 rounded bg-white border border-slate-300 font-mono text-[11px] font-semibold text-slate-800"
                          >
                            {th}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sub-Tabs: Layer Architecture vs Physical/Thermal/Electrical Specs */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-200">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveTabByProd((prev) => ({ ...prev, [product.id]: 'stack' }))
                          }
                          className={`px-4 py-2 text-xs font-mono uppercase font-bold border-b-2 transition-colors ${
                            detailTab === 'stack'
                              ? 'border-orange-600 text-orange-600'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          Internal Layer Architecture ({product.layers.length}-Layer)
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveTabByProd((prev) => ({ ...prev, [product.id]: 'specs' }))
                          }
                          className={`px-4 py-2 text-xs font-mono uppercase font-bold border-b-2 transition-colors ${
                            detailTab === 'specs'
                              ? 'border-orange-600 text-orange-600'
                              : 'border-transparent text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          ASTM / UL Technical Properties
                        </button>
                      </div>

                      {detailTab === 'stack' ? (
                        <div className="space-y-2">
                          {product.layers.map((layer) => (
                            <div
                              key={layer.index}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/60"
                            >
                              <span
                                className={`${layer.accentClass} px-2.5 py-1 rounded font-mono text-xs font-bold shrink-0 w-fit`}
                              >
                                {layer.index}
                              </span>
                              <div className="min-w-0">
                                <div className="text-xs font-bold text-slate-900">
                                  {layer.title}
                                </div>
                                <div className="text-xs text-slate-600">{layer.detail}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="bg-slate-900 text-white font-mono">
                                <th className="p-2.5">Property</th>
                                <th className="p-2.5">Typical Engineering Value</th>
                                <th className="p-2.5">Test Standard</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {product.specsTable.map((row) => (
                                <tr key={row.parameter} className="hover:bg-slate-50">
                                  <td className="p-2.5 font-semibold text-slate-900">
                                    {row.parameter}
                                  </td>
                                  <td className="p-2.5 font-mono font-bold text-slate-800">
                                    {row.value}
                                  </td>
                                  <td className="p-2.5 text-slate-500 font-mono">{row.method}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {/* Applications List */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-xs font-mono uppercase text-slate-500 font-bold mb-2">
                        Validated Hardware Use Cases
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {product.applications.map((app) => (
                          <div key={app} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Interactive Side-by-Side Parametric Comparison Matrix */}
        <section id="comparison-matrix" className="pt-4">
          <ParametricComparisonMatrix onOpenInquiry={onOpenInquiry} />
        </section>

        {/* Turnkey R&D Kits Section */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase text-orange-600 font-bold mb-1">
                <PackageCheck className="w-4 h-4" />
                <span>1-Click Turnkey R&amp;D Sampler Bundles (&lt;₹15,000 Petty-Cash Limit)</span>
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Pre-Packaged Multi-IP Engineering Kits
              </h3>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-mono font-bold text-amber-900">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Ships in 48 Hours • No 3-Quote Empanelment Delay
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TURNKEY_BUNDLES.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                      {b.badge}
                    </span>
                    <span className="font-mono text-sm font-extrabold text-slate-900">
                      {b.pricePrimary}
                    </span>
                  </div>
                  <h4 className="text-base font-extrabold text-slate-900">{b.title}</h4>
                  {b.priceSecondary && (
                    <div className="text-xs font-mono text-emerald-700 font-semibold">
                      Starter Tier: {b.priceSecondary}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed">{b.contents}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry({
                      productName: b.title,
                      variant: b.includedIPs.join(' + '),
                      pricingTier: b.priceSecondary
                        ? `${b.pricePrimary} | ${b.priceSecondary}`
                        : b.pricePrimary,
                      quantity: '1 Turnkey Kit',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Request to Buy Bundle</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
