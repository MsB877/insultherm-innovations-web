import React, { useState } from 'react';
import { UploadCloud, Cpu, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { CORE_PRODUCTS } from '../data/companyData';
import { InquiryPreset } from './InquiryModal';

interface CadQuoteEngineProps {
  onOpenInquiry: (preset: InquiryPreset) => void;
}

export const CadQuoteEngine: React.FC<CadQuoteEngineProps> = ({ onOpenInquiry }) => {
  const [selectedProdId, setSelectedProdId] = useState<string>('shield');
  const [variantIdx, setVariantIdx] = useState<number>(0);
  const [thicknessIdx, setThicknessIdx] = useState<number>(1);
  const [quantity, setQuantity] = useState<number>(25);
  const [lengthMm, setLengthMm] = useState<number>(100);
  const [widthMm, setWidthMm] = useState<number>(80);
  const [cadFileName, setCadFileName] = useState<string>('');

  const product = CORE_PRODUCTS.find((p) => p.id === selectedProdId) || CORE_PRODUCTS[0];
  const variant = product.variants[variantIdx] || product.variants[0];
  const thickness = variant.thicknessOptions[thicknessIdx] || variant.thicknessOptions[0];

  const handleProductChange = (id: string) => {
    setSelectedProdId(id);
    setVariantIdx(0);
    setThicknessIdx(0);
  };

  // Compute exact unit price grounded strictly in Google Drive pricing rules
  const computeUnitPrice = (): { unitINR: number; tierLabel: string } => {
    const areaCm2 = (lengthMm * widthMm) / 100;

    if (product.id === 'graphite-flex') {
      // ₹350 – ₹1,800 / custom part by area & grade
      const base = variant.code === 'GFlex-1500' ? 650 : 350;
      const maxCap = 1800;
      const areaScaled = Math.round(base + Math.max(0, areaCm2 - 25) * 4.5);
      const finalUnit = Math.min(maxCap, Math.max(350, areaScaled));
      return {
        unitINR: finalUnit,
        tierLabel: `₹${finalUnit} / custom part (Range: ₹350–₹1,800 by area)`,
      };
    }

    if (product.id === 'core' && lengthMm === 50 && widthMm === 50) {
      return {
        unitINR: 20,
        tierLabel: '₹20 / std 50×50mm BMS Pad Tier',
      };
    }

    const isVolume = quantity >= 100;
    const unitINR = isVolume ? variant.unitVolumeINR : variant.unitProtoINR;
    const tierLabel = isVolume ? variant.volumePriceLabel : variant.protoPriceLabel;
    return { unitINR, tierLabel };
  };

  const { unitINR, tierLabel } = computeUnitPrice();
  const totalINR = Math.round(unitINR * quantity * 100) / 100;
  const isPettyCashEligible = totalINR > 0 && totalINR <= 15000;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCadFileName(file.name);
    }
  };

  return (
    <div className="bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      {/* Calculator Header */}
      <div className="bg-slate-900 px-5 py-4 border-b border-slate-800 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
            Instant Digital CNC Quote Engine
          </span>
        </div>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          ₹0.00 Tooling NRE
        </span>
      </div>

      <div className="p-5 space-y-4">
        {/* CAD Dropzone */}
        <label className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-orange-500 bg-slate-50 cursor-pointer transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <UploadCloud className="w-5 h-5 text-orange-600 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold text-slate-800 truncate">
                {cadFileName ? `CAD Attached: ${cadFileName}` : 'Attach .DXF, .STEP, or 2D Drawing (Optional)'}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Auto-nesting &amp; 50% living-hinge toolpath check
              </div>
            </div>
          </div>
          <span className="text-[11px] font-mono font-semibold text-orange-600 shrink-0">Browse</span>
          <input
            type="file"
            accept=".dxf,.step,.stp,.pdf,.dwg,.iges"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Material & Premix Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              1. Proprietary Material IP
            </label>
            <select
              value={selectedProdId}
              onChange={(e) => handleProductChange(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
            >
              {CORE_PRODUCTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.categoryLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              2. Premix Grade / Variant
            </label>
            <select
              value={variantIdx}
              onChange={(e) => {
                setVariantIdx(Number(e.target.value));
                setThicknessIdx(0);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-mono font-semibold text-slate-900 focus:border-orange-600 focus:outline-none"
            >
              {product.variants.map((v, i) => (
                <option key={v.code} value={i}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Thickness, Dimensions, Quantity */}
        <div className="grid grid-cols-3 gap-2.5">
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Thickness
            </label>
            <select
              value={thicknessIdx}
              onChange={(e) => setThicknessIdx(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
            >
              {variant.thicknessOptions.map((t, idx) => (
                <option key={t} value={idx}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Size L×W (mm)
            </label>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min={10}
                max={1000}
                value={lengthMm}
                onChange={(e) => setLengthMm(Math.max(10, Number(e.target.value) || 10))}
                className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
              />
              <span className="text-xs text-slate-400">×</span>
              <input
                type="number"
                min={10}
                max={1000}
                value={widthMm}
                onChange={(e) => setWidthMm(Math.max(10, Number(e.target.value) || 10))}
                className="w-full rounded-lg border border-slate-300 px-2 py-2 text-xs font-mono text-slate-900 focus:border-orange-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-500 font-semibold mb-1">
              Quantity (pcs)
            </label>
            <input
              type="number"
              min={1}
              max={100000}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-lg border border-slate-300 px-2.5 py-2 text-xs font-mono font-bold text-slate-900 focus:border-orange-600 focus:outline-none"
            />
          </div>
        </div>

        {product.id === 'core' && (
          <button
            type="button"
            onClick={() => {
              setLengthMm(50);
              setWidthMm(50);
              setQuantity(50);
            }}
            className="text-[11px] font-mono text-orange-600 hover:text-orange-700 underline"
          >
            Quick-set Standard 50×50 mm BMS Pad (@ ₹20/pad)
          </button>
        )}

        {/* Live Pricing Breakdown */}
        <div className="rounded-xl bg-slate-900 text-white p-4 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span>Hard-Die Tooling NRE:</span>
            <span className="text-emerald-400 font-bold">₹0.00 (Saved ₹35,000 Die)</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Active Tier Rate:</span>
            <span className="text-white font-bold">₹{unitINR.toLocaleString('en-IN')} / pc</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-sm">
            <span className="font-sans font-semibold text-slate-200">Estimated Lot Total (ex-GST):</span>
            <span className="text-lg font-extrabold text-orange-400">
              ₹{totalINR.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-1 pt-1 text-[11px] text-slate-400">
            <span className="inline-flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              SLA: Ships in 24–48 Hours
            </span>
            {isPettyCashEligible && (
              <span className="inline-flex items-center gap-1 text-amber-300">
                <Sparkles className="w-3 h-3" />
                &lt;₹15k Lab Card Eligible
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onOpenInquiry({
              productName: product.name,
              variant: `${variant.code} (${thickness})`,
              pricingTier: `${tierLabel} — Est. Total ₹${totalINR.toLocaleString('en-IN')}`,
              quantity: `${quantity} pcs`,
              dimensions: `${lengthMm} × ${widthMm} mm${cadFileName ? ` | File: ${cadFileName}` : ''}`,
            })
          }
          className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md transition-all"
        >
          <span>Lock Quote &amp; Request to Buy</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
