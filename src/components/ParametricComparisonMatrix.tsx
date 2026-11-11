import React, { useState } from 'react';
import { FileDown, ArrowUpDown, ShoppingBag, Check, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS, ProductSpec } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const ParametricComparisonMatrix: React.FC = () => {
  const { openConfigurator } = useOrderCart();
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [onlyZeroOutgassing, setOnlyZeroOutgassing] = useState(false);
  const [onlySiliconeFree, setOnlySiliconeFree] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'k' | 'dielectric' | 'temp'>('default');

  const categories = ['ALL', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  const filtered: ProductSpec[] = PRODUCTS.filter((p) => {
    if (categoryFilter !== 'ALL' && p.category !== categoryFilter) return false;
    if (onlyZeroOutgassing && !p.outgassingCompliant) return false;
    if (onlySiliconeFree && !p.siliconeFreeAvailable) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'k') return b.thermalConductivitySort - a.thermalConductivitySort;
    if (sortBy === 'dielectric') return b.dielectricSort - a.dielectricSort;
    if (sortBy === 'temp') return b.maxTempSort - a.maxTempSort;
    return 0;
  });

  return (
    <div id="tds-downloads" className="bg-white border border-[#E2E0D8] rounded-md shadow-sm overflow-hidden">
      {/* Header & Filter Controls */}
      <div className="p-6 bg-[#F6F5F1] border-b border-[#E2E0D8] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold mb-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Interactive Parametric Selector & Area-Rate Reference
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-[#14171A]">
              Side-by-Side Material Engineering Matrix & 2-Page TDS Downloads
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-[#E2E0D8] text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlyZeroOutgassing}
                onChange={(e) => setOnlyZeroOutgassing(e.target.checked)}
                className="accent-[#E04819]"
              />
              ASTM E595 Low-Outgassing
            </label>
            <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white border border-[#E2E0D8] text-xs font-semibold text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={onlySiliconeFree}
                onChange={(e) => setOnlySiliconeFree(e.target.checked)}
                className="accent-[#E04819]"
              />
              Silicone-Free Available
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded text-xs font-semibold border transition-colors ${
                  categoryFilter === cat
                    ? 'bg-[#14171A] text-white border-[#14171A]'
                    : 'bg-white text-slate-700 border-[#E2E0D8] hover:border-slate-400'
                }`}
              >
                {cat === 'ALL' ? 'All 5 Platforms' : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-slate-500">Sort by:</span>
            {[
              { id: 'default', label: 'Portfolio Mix' },
              { id: 'k', label: 'Thermal k (W/m·K)' },
              { id: 'dielectric', label: 'Dielectric (kV/mm)' },
              { id: 'temp', label: 'Max Temp (°C)' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSortBy(s.id as typeof sortBy)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-mono text-[11px] border ${
                  sortBy === s.id
                    ? 'bg-[#E04819] text-white border-[#E04819]'
                    : 'bg-white text-slate-600 border-[#E2E0D8]'
                }`}
              >
                <ArrowUpDown className="w-3 h-3" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#14171A] text-slate-200 text-[11px] font-mono uppercase tracking-wider">
              <th className="py-3.5 px-4">Sub-Brand & Platform</th>
              <th className="py-3.5 px-4">Thermal Conductivity</th>
              <th className="py-3.5 px-4">Dielectric Breakdown</th>
              <th className="py-3.5 px-4">Operating Temp</th>
              <th className="py-3.5 px-4">Prototype Area Price (₹0 NRE)</th>
              <th className="py-3.5 px-4">Volume Nested Area Rate</th>
              <th className="py-3.5 px-4 text-right">TDS PDF & Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E0D8] text-xs sm:text-sm">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#FBFBF9] transition-colors">
                <td className="py-4 px-4">
                  <div className="text-[10px] font-mono font-bold text-[#E04819]">
                    {p.subBrandCode}
                  </div>
                  <div className="font-display font-bold text-[#14171A]">{p.trademarkName}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{p.thicknessRange}</div>
                </td>
                <td className="py-4 px-4 font-mono text-xs font-semibold text-[#14171A]">
                  {p.thermalConductivity}
                </td>
                <td className="py-4 px-4 font-mono text-xs text-slate-700">
                  {p.dielectricStrength}
                </td>
                <td className="py-4 px-4 font-mono text-xs text-slate-700">
                  <div>{p.operatingTemp}</div>
                  {p.siliconeFreeAvailable && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold mt-0.5">
                      <Check className="w-3 h-3" /> Silicone-Free Grade
                    </span>
                  )}
                </td>
                <td className="py-4 px-4 font-mono text-xs font-semibold text-[#14171A]">
                  {p.protoPriceLabel}
                </td>
                <td className="py-4 px-4 font-mono text-xs font-bold text-emerald-800">
                  {p.volumePriceLabel}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <a
                      href={p.tdsUrl}
                      download
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-[#E2E0D8] bg-[#F6F5F1] hover:border-[#14171A] text-xs font-mono font-semibold text-[#14171A]"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#E04819]" />
                      TDS
                    </a>
                    <button
                      type="button"
                      onClick={() => openConfigurator(p.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-xs font-bold text-white"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Order
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
