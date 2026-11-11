import React, { useState } from 'react';
import { FileDown, ArrowUpDown, ShoppingBag } from 'lucide-react';
import { PRODUCTS, ProductSpec } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const ParametricComparisonMatrix: React.FC = () => {
  const { openConfigurator } = useOrderCart();
  const [onlyZeroOutgassing, setOnlyZeroOutgassing] = useState(false);
  const [onlySiliconeFree, setOnlySiliconeFree] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'k' | 'dielectric' | 'temp'>('default');

  const filtered: ProductSpec[] = PRODUCTS.filter((p) => {
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
    <div id="tds-downloads" className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 bg-[#F7F8FA] border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            Search by Properties
          </span>
          <h3 className="text-xl font-bold text-[#0F1115] mt-0.5">
            Parametric Material Comparison & Technical Data Sheets
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyZeroOutgassing}
              onChange={(e) => setOnlyZeroOutgassing(e.target.checked)}
              className="accent-[#DC2626]"
            />
            ASTM E595 Low-Outgassing
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlySiliconeFree}
              onChange={(e) => setOnlySiliconeFree(e.target.checked)}
              className="accent-[#DC2626]"
            />
            Silicone-Free Option
          </label>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            aria-label="Sort products"
            className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-[#0F1115]"
          >
            <option value="default">Sort: Portfolio Order</option>
            <option value="k">Sort: Thermal Conductivity (High → Low)</option>
            <option value="dielectric">Sort: Dielectric Breakdown (High → Low)</option>
            <option value="temp">Sort: Max Temperature (High → Low)</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#0F1115] text-gray-200 text-xs font-semibold">
              <th className="py-3.5 px-5">Material</th>
              <th className="py-3.5 px-4">
                <span className="inline-flex items-center gap-1">
                  Thermal Conductivity <ArrowUpDown className="w-3 h-3 text-gray-400" />
                </span>
              </th>
              <th className="py-3.5 px-4">Dielectric Strength</th>
              <th className="py-3.5 px-4">Operating Temp</th>
              <th className="py-3.5 px-4">Prototype Price</th>
              <th className="py-3.5 px-4">Volume Rate</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-[#F7F8FA] transition-colors">
                <td className="py-4 px-5">
                  <div className="font-bold text-[#0F1115]">{p.trademarkName}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{p.thicknessRange}</div>
                </td>
                <td className="py-4 px-4 font-semibold text-[#0F1115] text-xs sm:text-sm">
                  {p.thermalConductivity}
                </td>
                <td className="py-4 px-4 text-gray-700 text-xs sm:text-sm">
                  {p.dielectricStrength}
                </td>
                <td className="py-4 px-4 text-gray-700 text-xs sm:text-sm">{p.operatingTemp}</td>
                <td className="py-4 px-4 font-semibold text-[#0F1115] text-xs sm:text-sm tabular-nums">
                  {p.protoPriceLabel}
                </td>
                <td className="py-4 px-4 font-semibold text-[#DC2626] text-xs sm:text-sm tabular-nums">
                  {p.volumePriceLabel}
                </td>
                <td className="py-4 px-5 text-right">
                  <div className="inline-flex items-center gap-2">
                    <a
                      href={p.tdsUrl}
                      download
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:border-[#0F1115] text-xs font-semibold text-[#0F1115]"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#DC2626]" />
                      TDS
                    </a>
                    <button
                      type="button"
                      onClick={() => openConfigurator(p.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-xs font-bold text-white"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Buy
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
