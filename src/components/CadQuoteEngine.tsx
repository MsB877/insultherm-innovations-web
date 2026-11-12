import React, { useEffect, useRef, useState } from 'react';
import {
  CheckCircle2,
  FileCode2,
  Plus,
  Ruler,
  ShoppingBag,
  Sparkles,
  UploadCloud,
} from 'lucide-react';
import { PRODUCTS } from '../data/companyData';
import {
  calculatePartPrice,
  PRICING_MODELS,
  ProductSlugId,
} from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';

interface CadQuoteEngineProps {
  initialProductId?: ProductSlugId;
}

const SIZE_PRESETS = [
  { label: '50 × 50 mm (25 cm²)', l: 50, w: 50 },
  { label: '100 × 100 mm (100 cm² Ref)', l: 100, w: 100 },
  { label: '150 × 150 mm (225 cm²)', l: 150, w: 150 },
  { label: '174 × 204 mm (280Ah Cell)', l: 174, w: 204 },
  { label: '200 × 150 mm (300 cm²)', l: 200, w: 150 },
];

export const CadQuoteEngine: React.FC<CadQuoteEngineProps> = ({
  initialProductId = 'insultherm-shield',
}) => {
  const { addItem, attachedCadFile, setAttachedCadFile, openCheckout } = useOrderCart();

  const [selectedId, setSelectedId] = useState<ProductSlugId>(initialProductId);
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(100);
  const [thicknessMm, setThicknessMm] = useState<number>(0.43);
  const [gradeSku, setGradeSku] = useState<string>('Shield-FGK-043');
  const [quantity, setQuantity] = useState<number>(20);
  const [finishOption, setFinishOption] = useState<string>(
    'Kiss-Cut on Carrier Sheet + Peel Tabs'
  );
  const [dragActive, setDragActive] = useState(false);
  const [addedToast, setAddedToast] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSelectedId(initialProductId);
  }, [initialProductId]);

  useEffect(() => {
    const prod = PRODUCTS.find((p) => p.id === selectedId);
    const model = PRICING_MODELS[selectedId];
    if (prod && model) {
      setLengthMm(prod.defaultLengthMm);
      setWidthMm(prod.defaultWidthMm);
      setThicknessMm(prod.defaultThicknessMm);
      setGradeSku(model.gradeOptions[0].sku);
      if (selectedId === 'insultherm-shield') {
        setFinishOption('50%-Depth Living-Hinge Crease + Snap-Lock Tabs');
      } else if (selectedId === 'insultherm-barrier') {
        setFinishOption('Dust-Consolidated CNC Cut + UL 94 V-0 FR-PSA');
      } else if (selectedId === 'insultherm-graphite-flex') {
        setFinishOption('1.5 mm Oversize Kapton® Edge-Seal + ASTM E595 PSA');
      } else {
        setFinishOption('Kiss-Cut on Carrier Sheet + Extended Peel Tabs');
      }
    }
  }, [selectedId]);

  // Auto-sync dimensions to 50x50 when Core-BMS-50x50 is picked
  useEffect(() => {
    if (gradeSku === 'Core-BMS-50x50') {
      setLengthMm(50);
      setWidthMm(50);
    }
  }, [gradeSku]);

  const currentModel = PRICING_MODELS[selectedId];
  const currentProduct = PRODUCTS.find((p) => p.id === selectedId) || PRODUCTS[0];

  const quote = calculatePartPrice({
    productId: selectedId,
    lengthMm,
    widthMm,
    quantity,
    thicknessMm,
    gradeSku,
  });

  const handleFilePick = (file: File | null) => {
    if (!file) return;
    setAttachedCadFile(file);
  };

  const handleAddPartToOrder = (openDrawerAfter: boolean) => {
    addItem(
      {
        sku: gradeSku,
        productId: selectedId,
        title: `${currentProduct.trademarkName} — Custom CNC Part`,
        itemType: 'custom-cad',
        dimensionsLabel: `${lengthMm} × ${widthMm} × ${thicknessMm} mm (${quote.areaCm2} cm²)`,
        lengthMm,
        widthMm,
        thicknessMm,
        areaCm2: quote.areaCm2,
        unitPriceInr: quote.unitPriceInr,
        quantity,
        formulaNote: quote.formulaExplanation,
        finishOption,
        cadFileName: attachedCadFile ? attachedCadFile.name : undefined,
      },
      openDrawerAfter
    );

    if (!openDrawerAfter) {
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white px-6 sm:px-8 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-red-400 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            3-Tier Custom Part Area Calculator • Zero Steel-Die Tooling
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Configure Custom Geometry & Instant 3-Tier INR Pricing
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-200">
            Tooling NRE: <strong className="text-emerald-400">₹0</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 font-semibold text-slate-200">
            Tiers: <strong className="text-white">1–99 • 100–499 • 500+</strong>
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-red-600/20 border border-red-500/40 font-semibold text-red-300">
            24–48h Dispatch
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 7 Columns */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          {/* Step 1: Material Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              1. Select InsulTherm Material Architecture
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRODUCTS.map((prod) => {
                const active = prod.id === selectedId;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => setSelectedId(prod.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      active
                        ? 'border-red-600 bg-red-50/60 ring-1 ring-red-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-slate-900">
                        {prod.trademarkName}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-red-700 bg-red-100/80 px-2 py-0.5 rounded">
                        {prod.protoPriceLabel.split('(')[0].trim()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                      {prod.shortTagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Grade & Thickness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                2. Formulation Grade / SKU
              </label>
              <select
                value={gradeSku}
                onChange={(e) => setGradeSku(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-red-600"
              >
                {currentModel.gradeOptions.map((g) => (
                  <option key={g.sku} value={g.sku}>
                    {g.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                3. Nominal Thickness
              </label>
              <select
                value={thicknessMm}
                onChange={(e) => setThicknessMm(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-red-600"
              >
                {currentModel.thicknessOptions.map((t) => (
                  <option key={t.mm} value={t.mm}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 3: Dimensions & Quantity */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-red-600" />
                4. Flat-Pattern Bounding Dimensions & Quantity
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SIZE_PRESETS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => {
                      setLengthMm(p.l);
                      setWidthMm(p.w);
                    }}
                    className={`text-[11px] px-2.5 py-1 rounded-md border font-medium transition-colors ${
                      lengthMm === p.l && widthMm === p.w
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <span className="block text-xs text-slate-500 mb-1">Length (mm)</span>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={lengthMm}
                  onChange={(e) => setLengthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">Width (mm)</span>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={widthMm}
                  onChange={(e) => setWidthMm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-red-600"
                />
              </div>
              <div>
                <span className="block text-xs text-slate-500 mb-1">Quantity (pcs)</span>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Quick Tier Switcher Pills */}
            <div className="flex flex-wrap items-center gap-2 mt-2.5">
              <span className="text-[11px] font-semibold text-slate-500">Test Volume Tiers:</span>
              {[
                { label: 'Prototype (20 pcs)', q: 20 },
                { label: 'Pilot Tier (100 pcs)', q: 100 },
                { label: 'OEM Blanket (500 pcs)', q: 500 },
              ].map((tierBtn) => (
                <button
                  key={tierBtn.q}
                  type="button"
                  onClick={() => setQuantity(tierBtn.q)}
                  className={`text-[11px] px-2.5 py-1 rounded-md font-semibold border transition-colors ${
                    (tierBtn.q === 20 && quantity < 100) ||
                    (tierBtn.q === 100 && quantity >= 100 && quantity < 500) ||
                    (tierBtn.q === 500 && quantity >= 500)
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {tierBtn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: CNC Converting Finish & CAD Upload */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                5. CNC Converting Finish
              </label>
              <select
                value={finishOption}
                onChange={(e) => setFinishOption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:border-red-600"
              >
                <option value="Kiss-Cut on Carrier Sheet + Extended Peel Tabs">
                  Kiss-Cut on Carrier Sheet + Peel Tabs
                </option>
                <option value="50%-Depth Living-Hinge Crease + Snap-Lock Tabs">
                  50%-Depth Living-Hinge Crease + Snap Tabs
                </option>
                <option value="Through-Cut Individual Parts + Bolt Holes">
                  Through-Cut Individual Parts + Bolt Holes
                </option>
                <option value="1.5 mm Oversize Kapton® Edge-Seal + ASTM E595 PSA">
                  Oversize Kapton® Edge-Seal + ASTM E595 PSA
                </option>
                <option value="Dust-Consolidated CNC Cut + UL 94 V-0 FR-PSA">
                  Dust-Consolidated Edge + UL 94 V-0 FR-PSA
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                6. Attach CAD Drawing (Optional)
              </label>
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                  if (e.dataTransfer.files?.[0]) {
                    handleFilePick(e.dataTransfer.files[0]);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`cursor-pointer rounded-xl border border-dashed px-3.5 py-2.5 flex items-center gap-2.5 transition-colors ${
                  dragActive
                    ? 'border-red-600 bg-red-50'
                    : attachedCadFile
                    ? 'border-emerald-500 bg-emerald-50/60'
                    : 'border-slate-300 hover:border-slate-400 bg-slate-50'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".dxf,.step,.stp,.dwg,.pdf,.zip,.igs"
                  className="hidden"
                  onChange={(e) => handleFilePick(e.target.files?.[0] || null)}
                />
                {attachedCadFile ? (
                  <>
                    <FileCode2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-900 truncate">
                      {attachedCadFile.name}
                    </span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="text-xs text-slate-600 truncate">
                      Drop <strong>.DXF / .STEP / .PDF</strong>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Transparent 3-Tier Rate Schedule Table */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Published 3-Tier Rate Schedule — {currentProduct.trademarkName}
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                {currentModel.competitorEdgeHeadline}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-200">
                    <th className="pb-2 font-semibold">Part Area Band</th>
                    <th className="pb-2 font-semibold">Prototype (1–99)</th>
                    <th className="pb-2 font-semibold">Pilot (100–499)</th>
                    <th className="pb-2 font-semibold">OEM Blanket (500+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70">
                  {currentModel.areaTiersSummary.map((row) => (
                    <tr key={row.band}>
                      <td className="py-2 pr-2 font-medium text-slate-800">
                        {row.band}
                        <div className="text-[11px] text-slate-500">{row.exampleSize}</div>
                      </td>
                      <td className="py-2 pr-2 font-mono text-slate-900 font-semibold">
                        {row.protoRule}
                      </td>
                      <td className="py-2 pr-2 font-mono text-blue-700 font-semibold">
                        {row.pilotRule}
                      </td>
                      <td className="py-2 font-mono text-emerald-700 font-semibold">
                        {row.volumeRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Live Price Summary & Add to Order */}
        <div className="lg:col-span-5 p-6 sm:p-8 bg-slate-50/70 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Live Area-Based Estimate
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {quote.tierName}
              </span>
            </div>

            {/* Price Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <div className="text-xs text-slate-500">Estimated Unit Price</div>
                  <div className="text-3xl font-extrabold font-mono text-slate-950 mt-0.5">
                    ₹{quote.unitPriceInr.toLocaleString('en-IN')}
                    <span className="text-sm font-sans font-medium text-slate-500"> / pc</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Line Subtotal ({quantity} pcs)</div>
                  <div className="text-xl font-extrabold font-mono text-red-600 mt-0.5">
                    ₹{quote.lineSubtotalInr.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Computed Part Area:</span>
                  <strong className="font-mono text-slate-900">
                    {lengthMm} × {widthMm} mm = {quote.areaCm2} cm²
                  </strong>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="shrink-0">Pricing Formula:</span>
                  <strong className="font-mono text-slate-900 text-right">
                    {quote.formulaExplanation}
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Steel-Rule Die / Mold NRE:</span>
                  <strong className="font-mono text-emerald-700">
                    ₹0 (Saves ₹25k–₹60k tooling)
                  </strong>
                </div>
                <div className="flex justify-between">
                  <span>Standard CNC Lead Time:</span>
                  <strong className="text-slate-900">24–48 Hours (Ex-Works Sanand)</strong>
                </div>
              </div>
            </div>

            {/* Installed Hardware Preview Thumbnail */}
            <div className="rounded-xl border border-slate-200 bg-white p-3 flex items-center gap-3">
              <img
                src={currentProduct.installedImage}
                alt={currentProduct.trademarkName}
                loading="lazy"
                className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
              />
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-red-600">
                  Hardware Fitment Reference
                </div>
                <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                  {currentProduct.installedCaption}
                </p>
              </div>
            </div>

            {/* Offer Coupon Hint */}
            <div className="rounded-xl bg-amber-50/90 border border-amber-200/80 p-3.5 text-xs text-amber-950">
              <div className="font-bold mb-0.5">
                4 Checkout Coupons Available + Dynamic Cart Tier Pricing
              </div>
              <p className="text-amber-900/90 leading-relaxed">
                Adjusting quantity in your cart automatically unlocks{' '}
                <strong>Pilot (100+)</strong> or <strong>Blanket (500+)</strong> unit rates, plus{' '}
                <span className="font-mono font-bold">PROTO10</span>,{' '}
                <span className="font-mono font-bold">MULTISTACK8</span>,{' '}
                <span className="font-mono font-bold">RNDKIT1000</span>, or{' '}
                <span className="font-mono font-bold">PILOT12</span>.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 space-y-2.5">
            <button
              type="button"
              onClick={() => handleAddPartToOrder(true)}
              className="w-full py-3.5 px-5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Add Part & Proceed to Checkout
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleAddPartToOrder(false)}
                className="py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add & Configure Another
              </button>
              <button
                type="button"
                onClick={openCheckout}
                className="py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                View Order Cart
              </button>
            </div>

            {addedToast && (
              <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 pt-1">
                <CheckCircle2 className="w-4 h-4" />
                Part added to your order list! Configure your next geometry.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
