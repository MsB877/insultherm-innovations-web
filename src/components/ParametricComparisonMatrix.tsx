import React, { useMemo, useState } from 'react';
import { ArrowUpDown, Download, Filter, RotateCcw, ShoppingBag } from 'lucide-react';
import { PRODUCTS, ProductSpec } from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const ParametricComparisonMatrix: React.FC = () => {
  const { openConfigurator } = useOrderCart();

  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [onlyOutgassing, setOnlyOutgassing] = useState<boolean>(false);
  const [onlySiliconeFree, setOnlySiliconeFree] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'default' | 'k_desc' | 'diel_desc' | 'temp_desc'>(
    'default'
  );

  const filteredProducts = useMemo(() => {
    let list: ProductSpec[] = [...PRODUCTS];
    if (categoryFilter !== 'ALL') {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (onlyOutgassing) {
      list = list.filter((p) => p.outgassingCompliant);
    }
    if (onlySiliconeFree) {
      list = list.filter((p) => p.siliconeFreeAvailable);
    }
    if (sortBy === 'k_desc') {
      list.sort((a, b) => b.thermalConductivitySort - a.thermalConductivitySort);
    } else if (sortBy === 'diel_desc') {
      list.sort((a, b) => b.dielectricSort - a.dielectricSort);
    } else if (sortBy === 'temp_desc') {
      list.sort((a, b) => b.maxTempSort - a.maxTempSort);
    }
    return list;
  }, [categoryFilter, onlyOutgassing, onlySiliconeFree, sortBy]);

  const resetFilters = () => {
    setCategoryFilter('ALL');
    setOnlyOutgassing(false);
    setOnlySiliconeFree(false);
    setSortBy('default');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Filter Bar */}
      <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
            <Filter className="w-3.5 h-3.5 text-red-600" />
            Parametric Selector:
          </span>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800"
          >
            <option value="ALL">All 5 Material Families</option>
            <option value="Dielectric Origami">Dielectric Origami (Shield™)</option>
            <option value="Fire Barrier">Runaway Fire Barrier (Barrier™)</option>
            <option value="Anisotropic Spreader">Anisotropic Spreader (Graphite-Flex™)</option>
            <option value="Thermal Gap Pad">Thermal Gap Pad (Core™)</option>
            <option value="High-Flux Hybrid TIM">High-Flux Hybrid TIM (Ultra™)</option>
          </select>

          <label className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={onlyOutgassing}
              onChange={(e) => setOnlyOutgassing(e.target.checked)}
              className="accent-red-600"
            />
            Low-Outgassing / Space Ready
          </label>

          <label className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-300">
            <input
              type="checkbox"
              checked={onlySiliconeFree}
              onChange={(e) => setOnlySiliconeFree(e.target.checked)}
              className="accent-red-600"
            />
            Siloxane-Free Grade
          </label>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="inline-flex items-center gap-1.5 text-xs text-slate-600">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800"
            >
              <option value="default">Sort: Portfolio Order</option>
              <option value="k_desc">Thermal Conductivity (High → Low)</option>
              <option value="diel_desc">Dielectric Strength (High → Low)</option>
              <option value="temp_desc">Max Temperature (High → Low)</option>
            </select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            className="p-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-600"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
              <th className="py-3.5 px-4 font-bold">Material IP & Grades</th>
              <th className="py-3.5 px-4 font-bold">Thermal Conductivity</th>
              <th className="py-3.5 px-4 font-bold">Dielectric Breakdown</th>
              <th className="py-3.5 px-4 font-bold">Operating Temp</th>
              <th className="py-3.5 px-4 font-bold">Thickness Range</th>
              <th className="py-3.5 px-4 font-bold">3-Tier Price (Proto • Pilot • Blanket)</th>
              <th className="py-3.5 px-4 font-bold text-right">Datasheet & Order</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-xs">
            {filteredProducts.map((prod) => (
              <tr key={prod.id} className="hover:bg-slate-50/90 transition-colors">
                <td className="py-4 px-4">
                  <div className="font-extrabold text-sm text-slate-950">
                    {prod.trademarkName}
                  </div>
                  <div className="text-slate-500 mt-0.5">{prod.category}</div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {prod.keyGrades.map((g) => (
                      <span
                        key={g}
                        className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded"
                      >
                        {g.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="py-4 px-4 font-mono font-semibold text-slate-900">
                  {prod.thermalConductivity}
                  <div className="text-[11px] font-sans font-normal text-slate-500 mt-0.5">
                    {prod.thermalImpedance}
                  </div>
                </td>
                <td className="py-4 px-4 font-mono font-semibold text-slate-900">
                  {prod.dielectricStrength}
                </td>
                <td className="py-4 px-4 font-mono text-slate-800">
                  {prod.operatingTemp}
                  <div className="text-[11px] font-sans text-emerald-700 font-medium mt-0.5">
                    {prod.flammability.split('|')[0]}
                  </div>
                </td>
                <td className="py-4 px-4 font-mono text-slate-700">{prod.thicknessRange}</td>
                <td className="py-4 px-4">
                  <div className="font-mono font-bold text-slate-950">
                    Proto: {prod.protoPriceLabel}
                  </div>
                  <div className="text-[11px] font-mono text-blue-700 font-semibold mt-0.5">
                    Pilot (100+): {prod.pilotPriceLabel}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700 font-semibold mt-0.5">
                    Blanket (500+): {prod.volumePriceLabel}
                  </div>
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    <a
                      href={prod.tdsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold"
                      title="Download 2-Page Technical Data Sheet PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      TDS
                    </a>
                    <button
                      type="button"
                      onClick={() => openConfigurator(prod.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold"
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
