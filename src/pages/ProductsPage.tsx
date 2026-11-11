import React, { useState } from 'react';
import {
  FileDown,
  ShoppingBag,
  Upload,
  Maximize2,
  CheckCircle2,
  Layers,
  Info,
  Wrench,
  Sparkles,
} from 'lucide-react';
import { PRODUCTS, RND_KITS, PRO_BENCH_PACKS, ProductSpec } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS } from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';
import { ParametricComparisonMatrix } from '../components/ParametricComparisonMatrix';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface ProductsPageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

const ProductDossierCard: React.FC<{
  product: ProductSpec;
  index: number;
  onOpenLightbox: (img: LightboxImagePayload) => void;
}> = ({ product, index, onOpenLightbox }) => {
  const { addItem, openConfigurator } = useOrderCart();
  const model = PRICING_MODELS[product.id];

  const [len, setLen] = useState<number>(product.defaultLengthMm);
  const [wid, setWid] = useState<number>(product.defaultWidthMm);
  const [qty, setQty] = useState<number>(product.id === 'insultherm-graphite-flex' ? 10 : 25);

  const livePrice = calculatePartPrice({
    productId: product.id,
    lengthMm: len,
    widthMm: wid,
    quantity: qty,
    thicknessMm: product.defaultThicknessMm,
  });

  return (
    <article
      id={product.id}
      className="bg-white border border-[#E2E0D8] rounded-md shadow-sm overflow-hidden"
    >
      {/* Top Banner */}
      <div className="px-6 py-4 bg-[#14171A] text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#E04819] text-white font-bold">
            0{index + 1} • {product.subBrandCode}
          </span>
          <span className="text-xs font-mono text-slate-300 hidden sm:inline">
            {product.category} • {product.revenueShareMix}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={product.tdsUrl}
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono font-semibold text-amber-300 border border-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            Download 2-Page TDS PDF
          </a>
          <button
            type="button"
            onClick={() => openConfigurator(product.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-xs font-bold text-white transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload CAD
          </button>
        </div>
      </div>

      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 5 Cols: Uncropped Studio Imagery + Layer Stackup */}
        <div className="lg:col-span-5 space-y-5">
          <div
            onClick={() =>
              onOpenLightbox({
                src: product.heroImage,
                title: `${product.trademarkName} — Multi-Layer Architecture`,
                subtitle: product.shortTagline,
                badge: product.subBrandCode,
                description: product.summary,
              })
            }
            className="relative bg-[#FBFBF9] border border-[#E2E0D8] rounded-md p-3 flex items-center justify-center min-h-[250px] cursor-zoom-in group"
          >
            <img
              src={product.heroImage}
              alt={product.trademarkName}
              className="max-h-[260px] w-auto max-w-full object-contain group-hover:scale-[1.02] transition-transform"
            />
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#14171A]/85 text-white text-[11px] font-mono inline-flex items-center gap-1 group-hover:bg-[#E04819]">
              <Maximize2 className="w-3 h-3" />
              Click for Full View
            </span>
          </div>

          {product.secondaryImage && (
            <div
              onClick={() =>
                onOpenLightbox({
                  src: product.secondaryImage!,
                  title: `${product.trademarkName} — Engineering Validation / Converted Geometry`,
                  subtitle: 'Full Uncropped View',
                  badge: 'Validation Plate',
                })
              }
              className="bg-[#F6F5F1] border border-[#E2E0D8] rounded-md p-2.5 flex items-center justify-between gap-3 cursor-zoom-in hover:border-[#E04819] transition-colors"
            >
              <img
                src={product.secondaryImage}
                alt={`${product.name} validation`}
                className="h-16 w-24 object-contain bg-white rounded border border-[#E2E0D8] p-1 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="text-[10px] font-mono uppercase text-[#E04819] font-bold">
                  Companion Engineering Plate
                </div>
                <div className="text-xs font-bold text-[#14171A] truncate">
                  Click to Inspect Full Uncropped Simulation / Cutout
                </div>
              </div>
              <Maximize2 className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
            </div>
          )}

          {/* Multi-Layer Stack */}
          <div className="bg-[#F6F5F1] border border-[#E2E0D8] rounded-md p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#14171A] font-bold">
              <Layers className="w-3.5 h-3.5 text-[#E04819]" />
              Cross-Section Laminate Architecture
            </div>
            {product.layers.map((layer) => (
              <div
                key={layer.code}
                className="bg-white border border-[#E2E0D8] rounded p-2.5 flex items-start gap-2.5"
              >
                <span className="px-1.5 py-0.5 rounded bg-[#14171A] text-white font-mono text-[10px] font-bold shrink-0 mt-0.5">
                  {layer.code}
                </span>
                <div>
                  <div className="text-xs font-bold text-[#14171A]">{layer.name}</div>
                  <div className="text-[11px] text-slate-600">{layer.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 7 Cols: Specs + Crystal-Clear Area Pricing Table + Instant Order Box */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14171A]">
              {product.trademarkName}
            </h2>
            <p className="text-sm font-semibold text-[#E04819] mt-0.5">{product.shortTagline}</p>
            <p className="text-sm text-slate-700 leading-relaxed mt-3">{product.summary}</p>
          </div>

          {/* Core Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">
                Thermal Conductivity
              </div>
              <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                {product.thermalConductivity}
              </div>
            </div>
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">
                Dielectric Strength
              </div>
              <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                {product.dielectricStrength}
              </div>
            </div>
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Operating Temp</div>
              <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                {product.operatingTemp}
              </div>
            </div>
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Thicknesses</div>
              <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                {product.thicknessRange}
              </div>
            </div>
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">
                Hardness / Density
              </div>
              <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                {product.hardnessOrDensity}
              </div>
            </div>
            <div className="p-3 rounded bg-[#FBFBF9] border border-[#E2E0D8]">
              <div className="text-[10px] font-mono uppercase text-slate-500">Dispatch SLA</div>
              <div className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                {product.leadTime} (₹0 NRE)
              </div>
            </div>
          </div>

          {/* Transparent Area-Based (cm²) Pricing Schedule */}
          <div className="bg-[#FFF3EE]/70 border border-[#E04819]/30 rounded-md p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#14171A] font-bold">
                <Info className="w-4 h-4 text-[#E04819]" />
                Transparent Area-Based (cm²) Pricing Schedule
              </div>
              <span className="text-[11px] font-mono text-slate-600">
                Ref: {model.referenceFootprintLabel}
              </span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">{product.referencePriceNote}</p>

            <div className="overflow-x-auto bg-white rounded border border-[#E2E0D8]">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F6F5F1] border-b border-[#E2E0D8] text-[10px] font-mono uppercase text-slate-600">
                    <th className="py-2 px-3">Part Area Tier (L × W)</th>
                    <th className="py-2 px-3">Prototype Custom (1–99 pcs)</th>
                    <th className="py-2 px-3">Volume Nested (100+ pcs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E0D8]">
                  {model.areaTiersSummary.map((row) => (
                    <tr key={row.band}>
                      <td className="py-2 px-3 font-semibold text-[#14171A]">
                        <div>{row.band}</div>
                        <div className="text-[10px] font-mono text-slate-500 font-normal">
                          {row.exampleSize}
                        </div>
                      </td>
                      <td className="py-2 px-3 font-mono text-slate-800">{row.protoRule}</td>
                      <td className="py-2 px-3 font-mono font-semibold text-emerald-800">
                        {row.volumeRule}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Instant Inline L × W × Qty Direct Buy Bar */}
          <div className="bg-[#14171A] text-white rounded-md p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <span className="text-amber-300 font-semibold">
                Quick Custom Part Calculator & Direct Order:
              </span>
              <span className="text-slate-300">
                Area: {livePrice.areaCm2} cm² • ₹{livePrice.effectiveRatePerCm2}/cm²
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 items-end">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">
                  Length (mm)
                </label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={len}
                  onChange={(e) => setLen(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">
                  Width (mm)
                </label>
                <input
                  type="number"
                  min={10}
                  max={1000}
                  value={wid}
                  onChange={(e) => setWid(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1">Qty (pcs)</label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full px-2.5 py-2 rounded bg-slate-900 border border-slate-700 font-mono text-xs text-white font-bold"
                />
              </div>
              <div className="col-span-3 sm:col-span-2">
                <button
                  type="button"
                  onClick={() =>
                    addItem(
                      {
                        sku: model.gradeOptions[0].sku,
                        productId: product.id,
                        title: `${product.trademarkName} (${model.gradeOptions[0].sku})`,
                        itemType: 'custom-cad',
                        dimensionsLabel: `${len} × ${wid} × ${product.defaultThicknessMm} mm (${livePrice.areaCm2} cm²)`,
                        areaCm2: livePrice.areaCm2,
                        unitPriceInr: livePrice.unitPriceInr,
                        quantity: qty,
                        formulaNote: livePrice.formulaExplanation,
                      },
                      true
                    )
                  }
                  className="w-full py-2 px-3 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors h-[36px]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add @ ₹{livePrice.unitPriceInr}/pc (₹
                  {livePrice.lineSubtotalInr.toLocaleString('en-IN')})
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenLightbox }) => {
  const { addItem, openConfigurator } = useOrderCart();

  return (
    <div className="bg-[#FBFBF9] pb-20">
      {/* Page Hero */}
      <section className="bg-white bg-architectural-grid border-b border-[#E2E0D8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
            5 Core Material Platforms • 4 R&D Kits • 4 Pro-Bench Packs
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#14171A] max-w-4xl leading-tight">
            Technical Material Catalog & Zero-Ambiguity{' '}
            <span className="font-serif italic font-normal text-[#E04819]">
              Area-Based (cm²) Pricing
            </span>
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Every custom part at InsulTherm is priced transparently by active bounding-box area (
            <strong className="font-mono text-[#14171A]">Length × Width in cm²</strong>) with{' '}
            <strong className="text-[#14171A]">₹0 steel-die tooling NRE</strong>. Prototype orders
            (1–99 pcs) use predictable area bands, while production orders (100+ pcs) switch
            automatically to pure nested <strong className="font-mono text-[#14171A]">₹/cm²</strong>{' '}
            sheet rates.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openConfigurator('insultherm-graphite-flex')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs sm:text-sm font-bold shadow-sm"
            >
              <Upload className="w-4 h-4" />
              Upload Custom .DXF / .STEP & Calculate Area Cost
            </button>
            <a
              href="#rnd-kits"
              className="inline-flex items-center gap-2 px-4 py-3 rounded bg-[#14171A] text-white text-xs sm:text-sm font-bold"
            >
              &lt; ₹15,000 Turnkey R&D Kits
            </a>
            <a
              href="#pro-bench"
              className="inline-flex items-center gap-2 px-4 py-3 rounded border border-emerald-700 text-emerald-800 bg-emerald-50 text-xs sm:text-sm font-bold"
            >
              ThermaFix™ Pro-Bench Packs (₹499+)
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
        {/* Parametric Comparison Matrix */}
        <ParametricComparisonMatrix />

        {/* All 5 Detailed Product Dossiers */}
        <div className="space-y-10">
          {PRODUCTS.map((product, idx) => (
            <ProductDossierCard
              key={product.id}
              product={product}
              index={idx}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>

        {/* Turnkey <₹15,000 R&D Kits */}
        <section id="rnd-kits" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Zero Vendor-Onboarding Delay
              </div>
              <h2 className="text-3xl font-display font-bold text-[#14171A] mt-1">
                Turnkey &lt; ₹15,000 R&D Qualification & Homologation Kits
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Order directly via R&D petty cash, UPI, or Proforma Invoice. Ships in 24–48 hours with ASTM compliance certificates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RND_KITS.map((kit) => (
              <div
                key={kit.id}
                className="bg-white border border-[#E2E0D8] rounded-md p-6 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#E04819]">{kit.sector}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#F6F5F1] border border-[#E2E0D8] text-slate-700">
                      {kit.sku} • {kit.leadTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#14171A]">{kit.name}</h3>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 pt-1">
                    {kit.contents.map((c, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="p-3 rounded bg-[#F6F5F1] text-xs text-slate-700">
                    <strong>Procurement Edge:</strong> {kit.procurementAdvantage}
                  </div>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E2E0D8] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-2xl font-mono font-bold text-[#14171A]">
                      {kit.priceLabel}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500">Full Turnkey Kit</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {kit.starterPriceInr && kit.starterLabel && (
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            sku: `${kit.sku}-MINI`,
                            title: `${kit.name} (${kit.starterLabel})`,
                            itemType: 'kit-bundle',
                            dimensionsLabel: 'Starter Evaluation Pack',
                            unitPriceInr: kit.starterPriceInr!,
                            quantity: 1,
                            formulaNote: 'Starter Petty-Cash Evaluation Pack',
                          })
                        }
                        className="px-3 py-2 rounded border border-[#14171A] text-xs font-bold text-[#14171A] hover:bg-[#14171A] hover:text-white transition-colors"
                      >
                        + {kit.starterLabel}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        addItem({
                          sku: kit.sku,
                          title: kit.name,
                          itemType: 'kit-bundle',
                          dimensionsLabel: 'Full Turnkey R&D Kit (<₹15k)',
                          unitPriceInr: kit.priceInr,
                          quantity: 1,
                          formulaNote: kit.leadTime,
                        })
                      }
                      className="px-4 py-2 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Order Full Kit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ThermaFix™ Pro-Bench Direct Packs */}
        <section id="pro-bench" className="space-y-6 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold">
                <Wrench className="w-3.5 h-3.5" />
                3M-Inspired Prosumer, Repair Lab & University Line
              </div>
              <h2 className="text-3xl font-display font-bold text-[#14171A] mt-1">
                ThermaFix™ & InsulTape™ Pro-Bench Direct Packs
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md">
              Precision-cut from our primary industrial laminates—giving PC/GPU service labs, drone builders, and student teams genuine aerospace/EV-grade materials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRO_BENCH_PACKS.map((pack) => (
              <div
                key={pack.id}
                className="bg-white border border-[#E2E0D8] rounded-md p-5 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-2.5">
                  <span className="inline-block text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {pack.badge}
                  </span>
                  <h3 className="text-base font-display font-bold text-[#14171A] leading-snug">
                    {pack.name}
                  </h3>
                  <div className="text-xs font-mono font-semibold text-emerald-800">
                    {pack.packCountLabel}
                  </div>
                  <div className="text-[11px] text-slate-500">{pack.specs}</div>
                  <ul className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {pack.includes.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E2E0D8] flex items-center justify-between">
                  <div className="text-xl font-mono font-bold text-[#14171A]">
                    ₹{pack.priceInr}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem({
                        sku: pack.sku,
                        title: pack.name,
                        itemType: 'pro-bench',
                        dimensionsLabel: pack.packCountLabel,
                        unitPriceInr: pack.priceInr,
                        quantity: 1,
                        formulaNote: `${pack.brandLine} Off-the-Shelf`,
                      })
                    }
                    className="px-3.5 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Buy Pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
