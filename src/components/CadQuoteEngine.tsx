import React, { useRef, useState } from 'react';
import { Upload, ShoppingBag, FileCode2 } from 'lucide-react';
import { PRODUCTS } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS, ProductSlugId } from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';

const SIZE_PRESETS = [
  { label: '25 × 80 mm (20 cm²)', l: 80, w: 25 },
  { label: '50 × 50 mm (25 cm² BMS)', l: 50, w: 50 },
  { label: '100 × 100 mm (100 cm² Ref)', l: 100, w: 100 },
  { label: '174 × 204 mm (280Ah Cell)', l: 204, w: 174 },
  { label: '200 × 150 mm (300 cm²)', l: 200, w: 150 },
];

export const CadQuoteEngine: React.FC = () => {
  const { addItem, attachedCadFile, setAttachedCadFile } = useOrderCart();
  const [selectedId, setSelectedId] = useState<ProductSlugId>('insultherm-core');
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(100);
  const [qty, setQty] = useState<number>(20);
  const [thicknessMm, setThicknessMm] = useState<number>(1.5);
  const [gradeSku, setGradeSku] = useState<string>('Core-300');
  const fileRef = useRef<HTMLInputElement | null>(null);

  const model = PRICING_MODELS[selectedId];
  const product = PRODUCTS.find((p) => p.id === selectedId) || PRODUCTS[0];

  const handleMaterialChange = (id: ProductSlugId) => {
    setSelectedId(id);
    const p = PRODUCTS.find((x) => x.id === id);
    const m = PRICING_MODELS[id];
    if (p && m) {
      setLengthMm(p.defaultLengthMm);
      setWidthMm(p.defaultWidthMm);
      setThicknessMm(p.defaultThicknessMm);
      setGradeSku(m.gradeOptions[0].sku);
    }
  };

  const result = calculatePartPrice({
    productId: selectedId,
    lengthMm,
    widthMm,
    quantity: qty,
    thicknessMm,
    gradeSku,
  });

  const volumeComparison = calculatePartPrice({
    productId: selectedId,
    lengthMm,
    widthMm,
    quantity: Math.max(200, qty),
    thicknessMm,
    gradeSku,
  });

  const handleAddToCart = () => {
    addItem(
      {
        sku: gradeSku,
        productId: selectedId,
        title: `${product.trademarkName} (${gradeSku})`,
        itemType: 'custom-cad',
        dimensionsLabel: `${lengthMm} × ${widthMm} × ${thicknessMm} mm (${result.areaCm2} cm²)`,
        areaCm2: result.areaCm2,
        unitPriceInr: result.unitPriceInr,
        quantity: qty,
        formulaNote: result.formulaExplanation,
        cadFileName: attachedCadFile ? attachedCadFile.name : 'Dimensions entered online',
      },
      true
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left 7 Cols: Clean Step-by-Step Inputs */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
              1. Select Material
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRODUCTS.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleMaterialChange(p.id)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      active
                        ? 'border-[#DC2626] bg-red-50/50 ring-1 ring-[#DC2626]'
                        : 'border-gray-200 bg-white hover:border-gray-400'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0F1115] leading-tight">
                      {p.name.replace('InsulTherm ', '')}™
                    </div>
                    <div className="text-[11px] text-gray-500 mt-1 truncate">{p.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Grade</label>
              <select
                value={gradeSku}
                onChange={(e) => setGradeSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-[#0F1115]"
              >
                {model.gradeOptions.map((g) => (
                  <option key={g.sku} value={g.sku}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Thickness</label>
              <select
                value={thicknessMm}
                onChange={(e) => setThicknessMm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-[#0F1115]"
              >
                {model.thicknessOptions.map((t) => (
                  <option key={t.mm} value={t.mm}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                2. Part Dimensions & Quantity
              </label>
              <span className="text-xs font-mono font-bold text-[#DC2626]">
                Part Area: {result.areaCm2} cm²
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {SIZE_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setLengthMm(preset.l);
                    setWidthMm(preset.w);
                  }}
                  className="px-3 py-1 rounded-md bg-[#F7F8FA] hover:bg-[#0F1115] hover:text-white border border-gray-200 text-xs font-medium transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Length (mm)</label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 font-mono text-sm font-bold text-[#0F1115]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">Width (mm)</label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={widthMm}
                  onChange={(e) => setWidthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 font-mono text-sm font-bold text-[#0F1115]"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">
                  Quantity (pcs)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 font-mono text-sm font-bold text-[#0F1115]"
                />
              </div>
            </div>
          </div>

          {/* Clean Area Tier Reference */}
          <div className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-4">
            <div className="text-xs font-bold text-[#0F1115] mb-2.5">
              {product.trademarkName} Area Pricing Schedule (₹0 Tooling NRE)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="pb-2 pr-3 font-semibold">Part Area Band</th>
                    <th className="pb-2 pr-3 font-semibold">Prototype (1–99 pcs)</th>
                    <th className="pb-2 font-semibold">Volume Nested (100+ pcs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200/70">
                  {model.areaTiersSummary.map((tier) => (
                    <tr key={tier.band}>
                      <td className="py-2 pr-3 font-semibold text-[#0F1115]">{tier.band}</td>
                      <td className="py-2 pr-3 text-gray-700">{tier.protoRule}</td>
                      <td className="py-2 font-semibold text-[#DC2626]">{tier.volumeRule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Clean Dark Summary Card */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#0F1115] text-white rounded-xl p-6 sm:p-7 tabular-nums">
          <div className="space-y-5">
            <div className="border-b border-gray-800 pb-4">
              <div className="text-xs font-semibold text-[#DC2626]">{result.tierName}</div>
              <div className="text-xl font-bold text-white mt-1">{product.trademarkName}</div>
              <div className="text-xs text-gray-400 mt-0.5">
                {lengthMm} × {widthMm} × {thicknessMm} mm ({result.areaCm2} cm²)
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-gray-400">Unit Price</div>
                <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
                  ₹{result.unitPriceInr.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  ₹{result.effectiveRatePerCm2} / cm²
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-xs text-gray-400">Subtotal ({qty} pcs)</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#DC2626] mt-1">
                  ₹{result.lineSubtotalInr.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-gray-400 mt-1">Eligible for Checkout Offers</div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-3.5 text-xs text-gray-300 space-y-1.5">
              <div>{result.formulaExplanation}</div>
              {qty < 100 && (
                <div className="text-emerald-400 pt-1.5 border-t border-white/10">
                  At 200+ pcs volume: drops to ₹{volumeComparison.unitPriceInr}/pc (₹
                  {volumeComparison.effectiveRatePerCm2}/cm² nested).
                </div>
              )}
            </div>

            {/* CAD Upload */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                3. Attach Custom CAD File (Optional — .DXF / .STEP / .PDF)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border border-dashed border-gray-700 hover:border-[#DC2626] bg-white/5 rounded-lg p-3.5 cursor-pointer transition-colors"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) setAttachedCadFile(f);
                  }}
                  className="hidden"
                />
                {attachedCadFile ? (
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileCode2 className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span className="text-xs font-mono text-white truncate">
                        {attachedCadFile.name}
                      </span>
                    </div>
                    <span className="text-xs text-[#DC2626] shrink-0">Replace</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-xs text-gray-300">
                    <Upload className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>Upload .DXF, .STEP, or .PDF profile</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-6 w-full py-3.5 px-5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Order & Apply Coupons →
          </button>
        </div>
      </div>
    </div>
  );
};
