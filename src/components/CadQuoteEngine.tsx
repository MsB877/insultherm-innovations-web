import React, { useRef, useState } from 'react';
import { Calculator, Upload, ShoppingBag, CheckCircle2, FileCode2, Info } from 'lucide-react';
import { PRODUCTS } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS, ProductSlugId } from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';

const SIZE_PRESETS = [
  { label: '25 × 80 mm (20 cm² Strip)', l: 80, w: 25 },
  { label: '50 × 50 mm (25 cm² BMS)', l: 50, w: 50 },
  { label: '100 × 100 mm (100 cm² Ref)', l: 100, w: 100 },
  { label: '174 × 204 mm (355 cm² 280Ah)', l: 204, w: 174 },
  { label: '200 × 150 mm (300 cm² Plane)', l: 200, w: 150 },
];

export const CadQuoteEngine: React.FC = () => {
  const { addItem, attachedCadFile, setAttachedCadFile } = useOrderCart();
  const [selectedId, setSelectedId] = useState<ProductSlugId>('insultherm-graphite-flex');
  const [lengthMm, setLengthMm] = useState<number>(80);
  const [widthMm, setWidthMm] = useState<number>(50);
  const [qty, setQty] = useState<number>(15);
  const [thicknessMm, setThicknessMm] = useState<number>(0.24);
  const [gradeSku, setGradeSku] = useState<string>('GFlex-1000');
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

  // Also preview volume unit price at Qty 200 so buyer immediately sees volume area drop!
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
        cadFileName: attachedCadFile ? attachedCadFile.name : 'Dimensions entered via Area Calculator',
      },
      true
    );
  };

  return (
    <div className="bg-white border border-[#E2E0D8] rounded-md shadow-sm overflow-hidden">
      {/* Top Bar */}
      <div className="px-6 py-5 bg-[#14171A] text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold mb-1">
            <Calculator className="w-4 h-4" />
            Transparent Area-Based (cm²) Pricing & Custom CAD Upload Engine
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold">
            Calculate Exact Custom Part Cost by Area (L × W mm) & Order Online
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-emerald-400">
            ₹0 Steel-Die NRE
          </span>
          <span className="px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-amber-300">
            1–99 Proto • 100+ Nested Volume
          </span>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Controls + Area Tier Schedule */}
        <div className="lg:col-span-7 space-y-6">
          {/* Material Selector Tabs */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold mb-2">
              1. Choose InsulTherm® Material Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRODUCTS.map((p) => {
                const active = p.id === selectedId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleMaterialChange(p.id)}
                    className={`p-2.5 rounded border text-left transition-all ${
                      active
                        ? 'border-[#E04819] bg-[#FFF3EE] shadow-sm'
                        : 'border-[#E2E0D8] bg-[#FBFBF9] hover:border-slate-400'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold text-[#E04819] truncate">
                      {p.subBrandCode.split(' ')[0]}
                    </div>
                    <div className="text-xs font-bold text-[#14171A] mt-0.5 leading-tight">
                      {p.name.replace('InsulTherm ', '')}™
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grade & Thickness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Material Grade / SKU
              </label>
              <select
                value={gradeSku}
                onChange={(e) => setGradeSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] bg-white text-xs sm:text-sm font-medium text-[#14171A]"
              >
                {model.gradeOptions.map((g) => (
                  <option key={g.sku} value={g.sku}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Thickness Stack
              </label>
              <select
                value={thicknessMm}
                onChange={(e) => setThicknessMm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] bg-white text-xs sm:text-sm font-medium text-[#14171A]"
              >
                {model.thicknessOptions.map((t) => (
                  <option key={t.mm} value={t.mm}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Dimensions & Presets */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                2. Part Bounding-Box Area (Length × Width in mm) & Quantity
              </label>
              <span className="text-xs font-mono font-bold text-[#E04819]">
                Active Area = {result.areaCm2} cm²
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
                  className="px-2.5 py-1 rounded bg-[#F6F5F1] hover:bg-[#14171A] hover:text-white border border-[#E2E0D8] text-[11px] font-mono transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Length (mm)</label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">Width (mm)</label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={widthMm}
                  onChange={(e) => setWidthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 mb-1 font-medium">
                  Quantity (pcs)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded border border-[#E2E0D8] font-mono text-sm font-bold text-[#14171A]"
                />
                <div className="flex gap-1.5 mt-1">
                  {[10, 50, 150, 500].map((qPreset) => (
                    <button
                      key={qPreset}
                      type="button"
                      onClick={() => setQty(qPreset)}
                      className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      {qPreset}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transparent Area Pricing Schedule for Selected Material */}
          <div className="bg-[#F6F5F1] border border-[#E2E0D8] rounded-md p-4">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#14171A] font-bold mb-2.5">
              <Info className="w-3.5 h-3.5 text-[#E04819]" />
              How {product.trademarkName} Area Pricing Works (Proto vs. Volume)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E0D8] text-[10px] font-mono uppercase text-slate-500">
                    <th className="pb-2 pr-3">Part Area Band</th>
                    <th className="pb-2 pr-3">Prototype (1–99 pcs)</th>
                    <th className="pb-2">Volume Nested (100+ pcs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0D8]/70">
                  {model.areaTiersSummary.map((tier) => (
                    <tr key={tier.band}>
                      <td className="py-2 pr-3 font-semibold text-[#14171A]">
                        <div>{tier.band}</div>
                        <div className="text-[10px] font-mono text-slate-500 font-normal">
                          {tier.exampleSize}
                        </div>
                      </td>
                      <td className="py-2 pr-3 font-mono text-slate-700">{tier.protoRule}</td>
                      <td className="py-2 font-mono text-emerald-800 font-semibold">
                        {tier.volumeRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Live Quote Readout + Custom CAD Upload + Direct Buy */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-[#14171A] text-white rounded-md p-6 border border-slate-800">
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <div className="text-[11px] font-mono uppercase text-amber-400 font-semibold">
                  {result.tierName}
                </div>
                <div className="text-lg font-display font-bold text-white mt-0.5">
                  {product.trademarkName} • {gradeSku}
                </div>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs text-slate-400">Footprint</div>
                <div className="text-sm font-bold text-emerald-400">{result.areaCm2} cm²</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded p-3.5">
                <div className="text-[11px] font-mono uppercase text-slate-400">Unit Part Price</div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1">
                  ₹{result.unitPriceInr.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-1">
                  Effective: ₹{result.effectiveRatePerCm2} / cm²
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded p-3.5">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  Line Total ({qty} pcs)
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-bold text-[#E04819] mt-1">
                  ₹{result.lineSubtotalInr.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-mono text-slate-400 mt-1">+ 18% GST at checkout</div>
              </div>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded p-3 text-xs font-mono text-slate-300 space-y-1.5">
              <div className="text-amber-300 font-semibold">Exact Calculation:</div>
              <div>{result.formulaExplanation}</div>
              {qty < 100 && (
                <div className="text-emerald-400 pt-1 border-t border-slate-800">
                  Volume Preview (≥200 pcs): Drops to ₹{volumeComparison.unitPriceInr}/pc (₹
                  {volumeComparison.effectiveRatePerCm2}/cm² nested)!
                </div>
              )}
            </div>

            {/* Inline CAD Upload */}
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                3. Attach Custom CAD File (Optional — .DXF / .STEP / .PDF)
              </label>
              <div
                onClick={() => fileRef.current?.click()}
                className="border border-dashed border-slate-600 hover:border-[#E04819] bg-slate-900/60 rounded p-3.5 cursor-pointer transition-colors"
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
                      <FileCode2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-xs font-mono text-emerald-300 truncate">
                        {attachedCadFile.name} ({(attachedCadFile.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <span className="text-[11px] text-[#E04819] underline shrink-0">Change</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 text-xs text-slate-300">
                    <Upload className="w-4 h-4 text-[#E04819] shrink-0" />
                    <span>Click to attach .DXF / .STEP / .PDF custom cutout profile</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-5 space-y-2.5">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-3.5 px-5 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Custom Part to Order (₹{result.lineSubtotalInr.toLocaleString('en-IN')}) →
            </button>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                24–48h Dispatch
              </span>
              <span>Saves ₹40,000 Steel Die NRE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
