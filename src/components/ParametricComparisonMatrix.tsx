import React, { useState } from 'react';
import { FileText, CheckCircle2, SlidersHorizontal, ShoppingCart, RotateCcw } from 'lucide-react';
import { CORE_PRODUCTS, ProductItem } from '../data/companyData';
import { InquiryPreset } from './InquiryModal';

interface ParametricComparisonMatrixProps {
  onOpenInquiry: (preset: InquiryPreset) => void;
}

export const ParametricComparisonMatrix: React.FC<ParametricComparisonMatrixProps> = ({
  onOpenInquiry,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(CORE_PRODUCTS.map((p) => p.id));
  const [highlightMode, setHighlightMode] = useState<string>('all');

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const applyPresetFilter = (mode: string) => {
    setHighlightMode(mode);
    if (mode === 'all') {
      setSelectedIds(CORE_PRODUCTS.map((p) => p.id));
    } else if (mode === 'silicone-free') {
      setSelectedIds(CORE_PRODUCTS.filter((p) => p.siliconeFreeAvailable).map((p) => p.id));
    } else if (mode === 'high-hv') {
      setSelectedIds(['shield', 'barrier', 'core']);
    } else if (mode === 'high-flux') {
      setSelectedIds(['graphite-flex', 'ultra', 'core']);
    }
  };

  const visibleProducts: ProductItem[] = CORE_PRODUCTS.filter((p) => selectedIds.includes(p.id));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Parametric Controls */}
      <div className="p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
              <SlidersHorizontal className="w-4 h-4" />
              <span>Interactive Parametric Comparison Matrix</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Side-by-Side Material Engineering Selector
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'All 5 Core IPs' },
              { id: 'silicone-free', label: 'Silicone-Free / Low-Outgassing' },
              { id: 'high-hv', label: 'HV Dielectric & Fire (>14 kV/mm)' },
              { id: 'high-flux', label: 'Active Heat Transfer (3–1,500 W/m·K)' },
            ].map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPresetFilter(preset.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  highlightMode === preset.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-orange-500'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Individual Product Toggle Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-mono text-slate-500 mr-1">Compare SKUs:</span>
          {CORE_PRODUCTS.map((p) => {
            const active = selectedIds.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => toggleProduct(p.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-orange-50 text-orange-800 border-orange-300 shadow-sm'
                    : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <CheckCircle2
                  className={`w-3.5 h-3.5 ${active ? 'text-orange-600' : 'text-slate-300'}`}
                />
                <span>{p.name}</span>
              </button>
            );
          })}
          {selectedIds.length < CORE_PRODUCTS.length && (
            <button
              type="button"
              onClick={() => applyPresetFilter('all')}
              className="inline-flex items-center gap-1 text-xs font-mono text-slate-600 hover:text-orange-600 ml-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Responsive Comparison Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[820px] border-collapse text-left">
          <thead>
            <tr className="bg-[#0B192C] text-white">
              <th className="p-4 text-xs font-mono uppercase tracking-wider text-slate-300 w-52 border-r border-slate-800">
                Engineering Parameter
              </th>
              {visibleProducts.map((p) => (
                <th key={p.id} className="p-4 align-top border-r border-slate-800 last:border-r-0 min-w-[185px]">
                  <div className="text-[10px] font-mono uppercase text-orange-400 mb-0.5">
                    {p.categoryLabel}
                  </div>
                  <div className="text-sm font-extrabold text-white">{p.name}</div>
                  <div className="text-[11px] font-mono text-slate-300 mt-1">
                    {p.variants.map((v) => v.code).join(' / ')}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200 text-xs">
            <tr className="bg-white">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Material Base &amp; Stack
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
                  {p.materialBaseShort}
                </td>
              ))}
            </tr>

            <tr className="bg-slate-50/50">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Thermal Conductivity (k)
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono font-bold text-slate-900 border-r border-slate-100 last:border-r-0">
                  {p.keyMetrics.thermalConductivity}
                </td>
              ))}
            </tr>

            <tr className="bg-white">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Impedance / Flame / Outgassing
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono text-slate-800 border-r border-slate-100 last:border-r-0">
                  {p.keyMetrics.impedanceOrFlame}
                </td>
              ))}
            </tr>

            <tr className="bg-slate-50/50">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Dielectric Breakdown
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono font-semibold text-slate-900 border-r border-slate-100 last:border-r-0">
                  {p.keyMetrics.dielectricStrength}
                </td>
              ))}
            </tr>

            <tr className="bg-white">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Operating Temperature
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono text-slate-700 border-r border-slate-100 last:border-r-0">
                  {p.keyMetrics.operatingTemp}
                </td>
              ))}
            </tr>

            <tr className="bg-slate-50/50">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Thickness &amp; Hardness
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono text-slate-700 border-r border-slate-100 last:border-r-0">
                  {p.keyMetrics.thicknessRange}
                </td>
              ))}
            </tr>

            <tr className="bg-white">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Silicone-Free Option
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 border-r border-slate-100 last:border-r-0">
                  {p.siliconeFreeAvailable ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-mono text-[11px] font-semibold">
                      Yes (Zero Siloxane)
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                      Silane-Passivated Anti-Bleed
                    </span>
                  )}
                </td>
              ))}
            </tr>

            <tr className="bg-slate-50/50">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Target Applications
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
                  {p.applications[0]}; {p.applications[1]}
                </td>
              ))}
            </tr>

            <tr className="bg-orange-50/60">
              <td className="p-3.5 font-bold text-slate-900 bg-orange-100/70 border-r border-orange-200">
                Prototype Price (₹0 NRE)
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono font-extrabold text-orange-900 border-r border-orange-100 last:border-r-0">
                  {p.primaryPriceHeadline}
                </td>
              ))}
            </tr>

            <tr className="bg-emerald-50/50">
              <td className="p-3.5 font-bold text-slate-900 bg-emerald-100/60 border-r border-emerald-200">
                Volume / OEM Tier
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 font-mono font-bold text-emerald-900 border-r border-emerald-100 last:border-r-0">
                  {p.volumePriceHeadline}
                </td>
              ))}
            </tr>

            <tr className="bg-white">
              <td className="p-3.5 font-bold text-slate-900 bg-slate-50 border-r border-slate-200">
                Data Sheet &amp; Order
              </td>
              {visibleProducts.map((p) => (
                <td key={p.id} className="p-3.5 border-r border-slate-100 last:border-r-0 space-y-2">
                  <a
                    href={p.tdsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 hover:border-slate-900 bg-white text-slate-800 font-semibold text-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-orange-600" />
                    <span>Download TDS (PDF)</span>
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenInquiry({
                        productName: p.name,
                        variant: p.variants[0].code,
                        pricingTier: `${p.primaryPriceHeadline} | ${p.volumePriceHeadline}`,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs transition-colors"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Request to Buy</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
