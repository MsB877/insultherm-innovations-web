import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FileDown,
  ShoppingBag,
  Upload,
  Maximize2,
  CheckCircle2,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS, RND_KITS, ProductSpec } from '../data/companyData';
import { calculatePartPrice, PRICING_MODELS } from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';
import { ParametricComparisonMatrix } from '../components/ParametricComparisonMatrix';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface ProductsPageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

const ProductDetailSection: React.FC<{
  product: ProductSpec;
  onOpenLightbox: (img: LightboxImagePayload) => void;
}> = ({ product, onOpenLightbox }) => {
  const { addItem, openConfigurator } = useOrderCart();
  const model = PRICING_MODELS[product.id];

  const [activeTab, setActiveTab] = useState<'specs' | 'layers' | 'pricing'>('specs');
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
      className="bg-white border border-gray-200/90 rounded-2xl shadow-sm overflow-hidden scroll-mt-28"
    >
      <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Left 5 Cols: Clean Uncropped Image + Quick Price Card */}
        <div className="lg:col-span-5 space-y-4">
          <div
            onClick={() =>
              onOpenLightbox({
                src: product.heroImage,
                title: product.trademarkName,
                description: product.summary,
                badge: product.category,
              })
            }
            className="group relative bg-[#F4F6FA] border border-gray-200 rounded-xl p-4 flex items-center justify-center min-h-[250px] cursor-zoom-in"
          >
            <img
              src={product.heroImage}
              alt={product.trademarkName}
              loading="lazy"
              className="max-h-[250px] w-auto max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-[#0F1115]/85 group-hover:bg-[#DC2626] text-white text-xs font-semibold inline-flex items-center gap-1 transition-colors">
              <Maximize2 className="w-3.5 h-3.5" />
              Full View
            </span>
          </div>

          {product.secondaryImage && (
            <button
              type="button"
              onClick={() =>
                onOpenLightbox({
                  src: product.secondaryImage!,
                  title: `${product.trademarkName} — Validation / Geometry View`,
                  badge: 'Full Uncropped Plate',
                })
              }
              className="w-full bg-[#F4F6FA] hover:bg-gray-200/60 border border-gray-200 rounded-xl p-3 flex items-center justify-between gap-3 text-left transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={product.secondaryImage}
                  alt={`${product.name} secondary`}
                  loading="lazy"
                  className="h-12 w-16 object-contain bg-white rounded border border-gray-200 p-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#0F1115] truncate">
                    View Companion Engineering Plate
                  </div>
                  <div className="text-xs text-gray-500">Opens uncropped in lightbox</div>
                </div>
              </div>
              <Maximize2 className="w-4 h-4 text-[#DC2626] shrink-0" />
            </button>
          )}

          <div className="bg-[#F4F6FA] border border-gray-200 rounded-xl p-4 space-y-2 text-xs tabular-nums">
            <div className="flex justify-between">
              <span className="text-gray-500">Prototype Base:</span>
              <span className="font-bold text-[#0F1115]">{product.protoPriceLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Volume Rate:</span>
              <span className="font-bold text-[#DC2626]">{product.volumePriceLabel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">MOQ & Lead Time:</span>
              <span className="font-semibold text-gray-800">1 Pc • {product.leadTime}</span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Title + Clean Tabbed Details + Direct Order Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  {product.familyGroup}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] mt-0.5">
                  {product.trademarkName}
                </h2>
                <p className="text-sm font-medium text-gray-500 mt-0.5">{product.shortTagline}</p>
              </div>

              <a
                href={product.tdsUrl}
                download
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F4F6FA] border border-gray-200 hover:border-[#0F1115] text-xs font-bold text-[#0F1115] shrink-0 transition-colors"
              >
                <FileDown className="w-4 h-4 text-[#DC2626]" />
                Download TDS PDF
              </a>
            </div>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{product.summary}</p>

            {/* Clean Progressive Disclosure Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-gray-200 pb-3">
              {[
                { id: 'specs', label: 'Key Specifications' },
                { id: 'layers', label: `Layer Architecture (${product.layers.length})` },
                { id: 'pricing', label: 'Area (cm²) Pricing & Calculator' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as typeof activeTab)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    activeTab === t.id
                      ? 'bg-[#0F1115] text-white'
                      : 'bg-[#F4F6FA] text-gray-700 hover:bg-gray-200/70'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Specifications */}
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200">
                    <div className="text-xs text-gray-500">Thermal Conductivity</div>
                    <div className="text-sm font-bold text-[#0F1115] mt-0.5">
                      {product.thermalConductivity}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200">
                    <div className="text-xs text-gray-500">Dielectric Breakdown</div>
                    <div className="text-sm font-bold text-[#0F1115] mt-0.5">
                      {product.dielectricStrength}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200">
                    <div className="text-xs text-gray-500">Operating Temperature</div>
                    <div className="text-sm font-bold text-[#0F1115] mt-0.5">
                      {product.operatingTemp}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200">
                    <div className="text-xs text-gray-500">Available Thicknesses</div>
                    <div className="text-sm font-bold text-[#0F1115] mt-0.5">
                      {product.thicknessRange}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {product.standards.map((st) => (
                    <span
                      key={st}
                      className="px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-gray-200 text-xs font-medium text-gray-700"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Layer Architecture */}
            {activeTab === 'layers' && (
              <div className="space-y-2.5">
                {product.layers.map((layer) => (
                  <div
                    key={layer.code}
                    className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200 flex items-start gap-3"
                  >
                    <span className="px-2 py-0.5 rounded bg-[#0F1115] text-white font-mono text-xs font-bold shrink-0 mt-0.5">
                      {layer.code}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-[#0F1115]">{layer.name}</div>
                      <div className="text-xs text-gray-600 mt-0.5">{layer.spec}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Area Pricing Schedule + Inline Quick Calculator */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.referencePriceNote}
                </p>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#F4F6FA] border-b border-gray-200 text-gray-600">
                        <th className="py-2.5 px-3 font-semibold">Part Area Band</th>
                        <th className="py-2.5 px-3 font-semibold">Prototype (1–99 pcs)</th>
                        <th className="py-2.5 px-3 font-semibold">Volume (100+ pcs)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {model.areaTiersSummary.map((row) => (
                        <tr key={row.band}>
                          <td className="py-2.5 px-3 font-semibold text-[#0F1115]">{row.band}</td>
                          <td className="py-2.5 px-3 text-gray-700">{row.protoRule}</td>
                          <td className="py-2.5 px-3 font-semibold text-[#DC2626]">
                            {row.volumeRule}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quick Size Calculator */}
                <div className="p-4 rounded-lg bg-[#F4F6FA] border border-gray-200 grid grid-cols-3 sm:grid-cols-4 gap-3 items-end tabular-nums">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Length (mm)</label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={len}
                      onChange={(e) => setLen(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Width (mm)</label>
                    <input
                      type="number"
                      min={10}
                      max={1000}
                      value={wid}
                      onChange={(e) => setWid(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-xs font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Quantity</label>
                    <input
                      type="number"
                      min={1}
                      max={100000}
                      value={qty}
                      onChange={(e) => setQty(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white font-mono text-xs font-bold"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-1 text-right sm:text-left">
                    <div className="text-xs text-gray-500">{livePrice.areaCm2} cm²</div>
                    <div className="text-base font-extrabold text-[#0F1115]">
                      ₹{livePrice.unitPriceInr}/pc
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Clean Action Bar */}
          <div className="pt-5 border-t border-gray-100 flex flex-wrap items-center gap-3">
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
              className="px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors tabular-nums"
            >
              <ShoppingBag className="w-4 h-4" />
              Add {qty} pcs (₹{livePrice.lineSubtotalInr.toLocaleString('en-IN')})
            </button>
            <button
              type="button"
              onClick={() => openConfigurator(product.id)}
              className="px-5 py-3 rounded-lg border border-[#0F1115] text-[#0F1115] hover:bg-[#0F1115] hover:text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Custom Size / Upload CAD
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenLightbox }) => {
  const { addItem } = useOrderCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get('group') || 'all';
  const [spotlightIdx, setSpotlightIdx] = useState(0);

  const visibleProducts = PRODUCTS.filter((p) => {
    if (groupParam === 'thermal') return p.familyGroup === 'Thermal Interface & Heat Spreading';
    if (groupParam === 'protection')
      return p.familyGroup === 'Runaway Fire & Dielectric Protection';
    return true;
  });

  // Auto-advance header material preview card every 4 seconds so header feels balanced & alive
  useEffect(() => {
    const timer = window.setInterval(() => {
      setSpotlightIdx((prev) => (prev + 1) % PRODUCTS.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  const spotlightProduct = PRODUCTS[spotlightIdx];

  return (
    <div className="bg-canvas-tonal pb-24">
      {/* Balanced Tonal Architectural Header + Smooth Wave Transition (Eliminates Empty White Space) */}
      <section className="relative bg-hero-architectural bg-subtle-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Cols: Portfolio Title, Summary & Filter Controls */}
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
                Product Hierarchy & Specifications
              </span>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] tracking-tight leading-[1.12]">
                Thermal, Fire-Barrier & Dielectric Portfolio
              </h1>

              <p className="text-base text-gray-600 max-w-2xl leading-relaxed">
                Explore full material specifications, downloadable 2-page Technical Data Sheets, and
                transparent area-based pricing—converted directly from your CAD with zero tooling NRE.
              </p>

              {/* Capability Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-2xl">
                {[
                  { label: 'Core Laminates', val: '5 Platforms' },
                  { label: 'Hard-Die NRE', val: '₹0 Tooling' },
                  { label: 'Min. Order', val: 'MOQ = 1 Pc' },
                  { label: 'CNC Dispatch', val: '24–48 Hours' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="px-3.5 py-2.5 rounded-xl bg-white/90 border border-gray-200/90 shadow-2xs"
                  >
                    <div className="text-[11px] text-gray-500 font-medium">{stat.label}</div>
                    <div className="text-xs sm:text-sm font-extrabold text-[#0F1115] font-mono mt-0.5">
                      {stat.val}
                    </div>
                  </div>
                ))}
              </div>

              {/* Clean Portfolio Filter Pills */}
              <div className="pt-3 flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All 5 Core Materials' },
                  { id: 'thermal', label: 'Thermal & Heat Spreading (3)' },
                  { id: 'protection', label: 'Fire & Dielectric Protection (2)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() =>
                      f.id === 'all' ? setSearchParams({}) : setSearchParams({ group: f.id })
                    }
                    className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                      groupParam === f.id
                        ? 'bg-[#0F1115] text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
                <a
                  href="#rnd-kits"
                  className="px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-red-50 text-[#DC2626] border border-red-200/80 hover:bg-[#DC2626] hover:text-white transition-colors"
                >
                  R&D & Starter Kits ↓
                </a>
              </div>
            </div>

            {/* Right 5 Cols: Auto-Cycling Material Preview Card */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-md space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#DC2626]">
                    Live Material Preview • 0{spotlightIdx + 1}/0{PRODUCTS.length}
                  </span>
                  <div className="flex gap-1">
                    {PRODUCTS.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        aria-label={`Preview ${p.trademarkName}`}
                        onClick={() => setSpotlightIdx(i)}
                        className={`h-1.5 rounded-full transition-all ${
                          i === spotlightIdx ? 'w-5 bg-[#DC2626]' : 'w-2 bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="h-44 rounded-xl bg-[#F4F6FA] border border-gray-100 p-3 flex items-center justify-center overflow-hidden">
                  <img
                    key={spotlightProduct.id}
                    src={spotlightProduct.heroImage}
                    alt={spotlightProduct.trademarkName}
                    className="max-h-full max-w-full object-contain animate-showcase-visual"
                  />
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-extrabold text-[#0F1115]">
                      {spotlightProduct.trademarkName}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {spotlightProduct.shortTagline}
                    </div>
                  </div>
                  <a
                    href={`#${spotlightProduct.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs font-bold inline-flex items-center gap-1 shrink-0 transition-colors"
                  >
                    Jump <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtle Architectural Wave Divider flowing into Slate-Tinted Canvas */}
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-7 sm:h-10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 14C360 46 760 -6 1140 22C1280 32 1380 28 1440 18V44H0V14Z"
              fill="#EEF1F6"
            />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-14">
        {/* Parametric Comparison Table */}
        <ParametricComparisonMatrix />

        {/* Clean Tabbed Product Sections */}
        <div className="space-y-8">
          {visibleProducts.map((product) => (
            <ProductDetailSection
              key={product.id}
              product={product}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      </div>

      {/* Subtle Tonal Wave Section for Turnkey <₹15k R&D Kits & Starter Packs */}
      <div className="mt-16">
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-6 sm:h-9"
            preserveAspectRatio="none"
          >
            <path
              d="M0 24C420 -4 880 42 1440 12V40H0V24Z"
              fill="#E5E9F2"
            />
          </svg>
        </div>

        <section id="rnd-kits" className="bg-[#E5E9F2]/75 py-16 border-y border-gray-200/90 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  <Tag className="w-3.5 h-3.5" />
                  Eligible for PROTO10 & RNDKIT1000 Checkout Offers
                </div>
                <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                  R&D Qualification Kits & Starter Packs
                </h2>
              </div>
              <p className="text-sm text-gray-600 max-w-md">
                Designed for rapid corporate R&D signoff (&lt;₹15,000 petty-cash limit) as well as
                student EV teams, repair labs, and individual hardware builders (from ₹999).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {RND_KITS.map((kit) => (
                <div
                  key={kit.id}
                  className="bg-white border border-gray-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-[#DC2626]">{kit.sector}</span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#F4F6FA] border border-gray-200 text-gray-700">
                        {kit.leadTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0F1115]">{kit.name}</h3>

                    <ul className="space-y-2 text-sm text-gray-600">
                      {kit.contents.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>

                    {kit.starterSummary && (
                      <div className="p-3.5 rounded-lg bg-[#F4F6FA] border border-gray-200 text-xs text-gray-600">
                        <strong className="text-[#0F1115]">Starter Option:</strong>{' '}
                        {kit.starterSummary}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 tabular-nums">
                    <div>
                      <div className="text-2xl font-extrabold text-[#0F1115]">{kit.priceLabel}</div>
                      <div className="text-xs text-gray-500">Full Qualification Kit</div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {kit.starterPriceInr && kit.starterLabel && (
                        <button
                          type="button"
                          onClick={() =>
                            addItem({
                              sku: kit.starterSku || `${kit.sku}-MINI`,
                              title: `${kit.name} — Starter`,
                              itemType: 'kit-bundle',
                              dimensionsLabel: kit.starterLabel!,
                              unitPriceInr: kit.starterPriceInr!,
                              quantity: 1,
                              formulaNote: 'Compact Prototyping Pack',
                            })
                          }
                          className="px-3.5 py-2.5 rounded-lg border border-[#0F1115] text-xs font-bold text-[#0F1115] hover:bg-[#0F1115] hover:text-white transition-colors"
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
                            dimensionsLabel: 'Full Turnkey R&D Kit',
                            unitPriceInr: kit.priceInr,
                            quantity: 1,
                            formulaNote: kit.leadTime,
                          })
                        }
                        className="px-4 py-2.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Order Full Kit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
