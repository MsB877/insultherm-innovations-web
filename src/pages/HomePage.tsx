import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Upload,
  FileDown,
  Maximize2,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  Wrench,
  GraduationCap,
} from 'lucide-react';
import {
  BRAND_DIVISIONS,
  PRODUCTS,
  APPLICATION_CHALLENGES,
  PRO_BENCH_PACKS,
  RND_KITS,
} from '../data/companyData';
import { calculatePartPrice } from '../utils/pricingEngine';
import { useOrderCart } from '../context/OrderCartContext';
import { CadQuoteEngine } from '../components/CadQuoteEngine';
import { ValidationShowcase } from '../components/ValidationShowcase';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface HomePageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

const CUTAWAY_CALLOUTS = [
  {
    code: '01 • TOP COLLECTOR',
    productId: 'insultherm-shield' as const,
    name: 'InsulTherm Shield™ (SHIELD-FOLD™)',
    metric: '28–32 kV/mm • 0.43 mm Folded Origami',
    price: '₹45 / 100 cm² proto • ₹0.30/cm² vol',
    detail: 'Ships flat, folds by hand over 1,500V DC copper busbars—replaces ₹6L+ injection molds.',
  },
  {
    code: '02 • INTER-CELL WALLS',
    productId: 'insultherm-barrier' as const,
    name: 'InsulTherm Barrier™ (PYROBLOCK™)',
    metric: 'k = 0.018 W/m·K • >1,100°C Mica-Aerogel',
    price: '₹110 / 100 cm² proto • ₹0.85/cm² vol',
    detail: 'Holds neighbor cells to 74.189°C during a 400°C adjacent cell thermal runaway event.',
  },
  {
    code: '03 • COLD-PLATE BASE',
    productId: 'insultherm-core' as const,
    name: 'InsulTherm Core™ (TROPICORE™)',
    metric: '3.0 W/m·K • 40 Shore 00 • 50°C Anti-Bleed',
    price: '₹80 / 100 cm² custom • ₹20 std 50×50mm',
    detail: 'Silane-passivated alumina + E-glass scrim drains cell heat with zero tropical oil bleed.',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenLightbox }) => {
  const { openConfigurator, addItem } = useOrderCart();
  const [activeCutawayIdx, setActiveCutawayIdx] = useState(0);
  const [selectedChallengeId, setSelectedChallengeId] = useState(APPLICATION_CHALLENGES[0].id);

  const activeChallenge =
    APPLICATION_CHALLENGES.find((c) => c.id === selectedChallengeId) || APPLICATION_CHALLENGES[0];
  const recommendedProduct =
    PRODUCTS.find((p) => p.id === activeChallenge.recommendedProductId) || PRODUCTS[0];

  const challengePrice = calculatePartPrice({
    productId: recommendedProduct.id,
    lengthMm: activeChallenge.suggestedFootprint.lengthMm,
    widthMm: activeChallenge.suggestedFootprint.widthMm,
    quantity: activeChallenge.suggestedFootprint.qty,
    thicknessMm: recommendedProduct.defaultThicknessMm,
  });

  return (
    <div className="space-y-0">
      {/* 1. DAYLIGHT INDUSTRIAL-EDITORIAL HERO (Henkel + 3M Benchmark) */}
      <section className="relative bg-[#FBFBF9] bg-architectural-grid border-b border-[#E2E0D8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 6 Cols: Editorial Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded bg-white border border-[#E2E0D8] shadow-sm text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#E04819]" />
                <span className="font-semibold text-[#14171A]">SANAND GIDC, GUJARAT</span>
                <span className="text-slate-400">|</span>
                <span className="text-[#E04819] font-semibold">₹0 TOOLING NRE • 24–48H DISPATCH</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-display font-bold text-[#14171A] leading-[1.06] tracking-tight">
                Thermal, Fire & Dielectric Materials.{' '}
                <span className="font-serif italic font-normal text-[#E04819]">
                  Engineered to Fit.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-xl">
                India’s multi-platform advanced materials house—combining{' '}
                <strong className="text-[#14171A]">5 proprietary industrial laminates</strong>,
                custom digital CNC converting priced transparently per{' '}
                <strong className="font-mono text-[#14171A]">cm²</strong> with zero steel-die fees,
                and ready-to-ship <strong className="text-[#14171A]">ThermaFix™ Pro-Bench</strong>{' '}
                packs.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => openConfigurator('insultherm-graphite-flex')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-sm font-bold shadow-md transition-all"
                >
                  <Upload className="w-4 h-4" />
                  Upload Custom CAD & Instant ₹/cm² Quote
                </button>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded bg-[#14171A] hover:bg-slate-800 text-white text-sm font-bold transition-colors"
                >
                  Explore All 5 Sub-Brands
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E2E0D8]">
                <div>
                  <div className="text-2xl font-display font-bold text-[#14171A]">₹0 NRE</div>
                  <div className="text-xs text-slate-600">Saves ₹40k–₹8L die/mold cost</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-[#E04819]">24–48 hrs</div>
                  <div className="text-xs text-slate-600">CAD-to-part CNC dispatch</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-[#14171A]">100% DVA</div>
                  <div className="text-xs text-slate-600">Sovereign domestic supply</div>
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Interactive Module Cutaway Showcase */}
            <div className="lg:col-span-6">
              <div className="bg-white border border-[#E2E0D8] rounded-md shadow-md overflow-hidden">
                <div className="px-4 py-3 bg-[#14171A] text-white flex items-center justify-between text-xs">
                  <span className="font-mono uppercase tracking-wider text-amber-300 font-semibold">
                    Inside Hardware: Tri-Material Module Cutaway
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenLightbox({
                        src: '/assets/validation/pack-cutaway-studio.jpg',
                        title: 'Integrated EV / BESS Prismatic Module Hardware Cutaway',
                        subtitle: 'Shield™ Top Shroud + Barrier™ Cell Firewalls + Core™ Cold-Plate TIM',
                        dimensions: '1408 × 768 px (Full Studio Cutaway)',
                        badge: 'Tri-Material Stack',
                        description:
                          'Physical hardware assembly demonstrating how InsulTherm Shield™, Barrier™, and Core™ integrate inside a liquid-cooled aluminum battery module with zero tooling delay.',
                      })
                    }
                    className="inline-flex items-center gap-1 font-mono text-slate-200 hover:text-[#E04819]"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    HD Full View
                  </button>
                </div>

                <div
                  onClick={() =>
                    onOpenLightbox({
                      src: '/assets/validation/pack-cutaway-studio.jpg',
                      title: 'Integrated EV / BESS Prismatic Module Hardware Cutaway',
                      subtitle: 'Shield™ Top Shroud + Barrier™ Cell Firewalls + Core™ Cold-Plate TIM',
                      dimensions: '1408 × 768 px',
                      badge: 'Tri-Material Stack',
                    })
                  }
                  className="relative bg-[#F6F5F1] p-3 cursor-zoom-in"
                >
                  <img
                    src="/assets/validation/pack-cutaway-studio.jpg"
                    alt="Prismatic Battery Module Cutaway with Shield, Barrier and Core"
                    className="w-full h-auto max-h-[340px] object-contain mx-auto rounded"
                  />
                </div>

                {/* Interactive Layer Selector Tabs */}
                <div className="grid grid-cols-3 border-t border-b border-[#E2E0D8] bg-[#F6F5F1]">
                  {CUTAWAY_CALLOUTS.map((c, idx) => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => setActiveCutawayIdx(idx)}
                      className={`p-2.5 text-left border-r last:border-r-0 border-[#E2E0D8] transition-colors ${
                        activeCutawayIdx === idx
                          ? 'bg-white border-b-2 border-b-[#E04819]'
                          : 'hover:bg-white/60'
                      }`}
                    >
                      <div className="text-[10px] font-mono font-bold text-[#E04819]">{c.code}</div>
                      <div className="text-xs font-bold text-[#14171A] truncate mt-0.5">
                        {c.name.split(' (')[0]}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Layer Detail Bar */}
                <div className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="text-xs font-mono font-bold text-[#14171A]">
                      {CUTAWAY_CALLOUTS[activeCutawayIdx].metric} •{' '}
                      <span className="text-emerald-700">
                        {CUTAWAY_CALLOUTS[activeCutawayIdx].price}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {CUTAWAY_CALLOUTS[activeCutawayIdx].detail}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openConfigurator(CUTAWAY_CALLOUTS[activeCutawayIdx].productId)}
                    className="px-3.5 py-2 rounded bg-[#14171A] hover:bg-[#E04819] text-white text-xs font-bold shrink-0 transition-colors"
                  >
                    Price Custom Size →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MULTI-DIVISION BRAND ARCHITECTURE RIBBON (3M & Henkel Ecosystem Model) */}
      <section className="bg-white border-b border-[#E2E0D8] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold">
                One Converting Platform • Three Commercial Divisions
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14171A] mt-1">
                Built Like a Modern Industrial Materials House
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              From utility-scale 314Ah BESS containers and LEO satellite avionics to benchtop SSD & repair-lab packs—all cut on the same zero-tooling CNC architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BRAND_DIVISIONS.map((div) => (
              <div
                key={div.code}
                className="bg-[#FBFBF9] border border-[#E2E0D8] rounded-md p-6 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: div.colorHex }}
                />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-slate-500">
                      {div.code}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {div.subBrands.map((sb) => (
                        <span
                          key={sb}
                          className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-[#E2E0D8] text-[#14171A]"
                        >
                          {sb}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-display font-bold text-[#14171A] mb-2">
                    {div.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">{div.summary}</p>
                </div>
                <Link
                  to={div.ctaTarget}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#14171A] hover:text-[#E04819] transition-colors"
                >
                  Explore Division SKUs & Pricing <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HENKEL-STYLE INTERACTIVE "SOLVE BY THERMAL/ELECTRICAL CHALLENGE" SELECTOR */}
      <section className="bg-[#F6F5F1] border-b border-[#E2E0D8] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold">
              30-Second Application Wizard
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14171A] mt-1">
              Select Your Engineering Bottleneck → Get Exact Material & Area Cost
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Challenge Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              {APPLICATION_CHALLENGES.map((ch) => {
                const active = ch.id === activeChallenge.id;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChallengeId(ch.id)}
                    className={`w-full text-left p-4 rounded-md border transition-all ${
                      active
                        ? 'bg-[#14171A] text-white border-[#14171A] shadow-md'
                        : 'bg-white text-[#14171A] border-[#E2E0D8] hover:border-slate-400'
                    }`}
                  >
                    <div
                      className={`text-[10px] font-mono uppercase tracking-wider font-bold mb-1 ${
                        active ? 'text-[#E04819]' : 'text-slate-500'
                      }`}
                    >
                      {ch.sectorTag}
                    </div>
                    <div className="text-sm font-display font-bold leading-snug">
                      {ch.problemTitle}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Recommended Solution Panel */}
            <div className="lg:col-span-7 bg-white border border-[#E2E0D8] rounded-md p-6 sm:p-7 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E0D8] pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#E04819] font-bold">
                      Recommended Platform • {recommendedProduct.subBrandCode}
                    </span>
                    <h3 className="text-2xl font-display font-bold text-[#14171A]">
                      {recommendedProduct.trademarkName}
                    </h3>
                  </div>
                  <a
                    href={recommendedProduct.tdsUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#F6F5F1] hover:bg-[#14171A] hover:text-white border border-[#E2E0D8] text-xs font-mono font-semibold transition-colors"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#E04819]" />
                    2-Page TDS PDF
                  </a>
                </div>

                <div className="bg-[#FFF3EE] border border-[#E04819]/25 rounded p-3.5 text-xs text-slate-800">
                  <strong className="text-[#14171A]">Failure Mode Addressed: </strong>
                  {activeChallenge.symptom}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  <strong className="text-[#14171A]">Engineering Mechanism: </strong>
                  {activeChallenge.whyItWorks}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded bg-[#F6F5F1] border border-[#E2E0D8]">
                    <div className="text-[10px] font-mono uppercase text-slate-500">Thermal / Arc</div>
                    <div className="text-xs font-mono font-bold text-[#14171A] mt-0.5">
                      {recommendedProduct.thermalConductivity}
                    </div>
                  </div>
                  <div className="p-3 rounded bg-[#F6F5F1] border border-[#E2E0D8]">
                    <div className="text-[10px] font-mono uppercase text-slate-500">
                      Sample Run ({activeChallenge.suggestedFootprint.lengthMm}×
                      {activeChallenge.suggestedFootprint.widthMm}mm)
                    </div>
                    <div className="text-xs font-mono font-bold text-[#E04819] mt-0.5">
                      ₹{challengePrice.unitPriceInr}/pc ({challengePrice.areaCm2} cm²)
                    </div>
                  </div>
                  <div className="p-3 rounded bg-[#F6F5F1] border border-[#E2E0D8] col-span-2 sm:col-span-1">
                    <div className="text-[10px] font-mono uppercase text-slate-500">
                      Volume Area Rate
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-800 mt-0.5">
                      {recommendedProduct.volumePriceLabel}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-[#E2E0D8] flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() =>
                    addItem(
                      {
                        sku: recommendedProduct.keyGrades[0].split(' ')[0],
                        productId: recommendedProduct.id,
                        title: `${recommendedProduct.trademarkName} (Suggested Sample Run)`,
                        itemType: 'custom-cad',
                        dimensionsLabel: `${activeChallenge.suggestedFootprint.lengthMm} × ${activeChallenge.suggestedFootprint.widthMm} × ${recommendedProduct.defaultThicknessMm} mm (${challengePrice.areaCm2} cm²)`,
                        areaCm2: challengePrice.areaCm2,
                        unitPriceInr: challengePrice.unitPriceInr,
                        quantity: activeChallenge.suggestedFootprint.qty,
                        formulaNote: challengePrice.formulaExplanation,
                      },
                      true
                    )
                  }
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add {activeChallenge.suggestedFootprint.qty}-pc Sample Run (₹
                  {challengePrice.lineSubtotalInr.toLocaleString('en-IN')})
                </button>
                <button
                  type="button"
                  onClick={() => openConfigurator(recommendedProduct.id)}
                  className="text-xs font-bold text-[#14171A] hover:text-[#E04819] underline"
                >
                  Or Enter Custom Dimensions & Upload .DXF →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALL 5 CORE INDUSTRIAL SUB-BRANDS (Crystal-Clear Area Pricing + Uncropped Clickable Photos) */}
      <section className="bg-white border-b border-[#E2E0D8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold">
                5 Proprietary Material Platforms • 100% Area-Transparent Pricing
              </div>
              <h2 className="text-3xl font-display font-bold text-[#14171A] mt-1">
                Core Industrial & Defense Material Portfolio
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E04819] hover:underline"
            >
              View Full Layer Stackups & Comparison Matrix <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-[#FBFBF9] border border-[#E2E0D8] rounded-md overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                <div>
                  {/* Uncropped / Expandable Product Studio Image */}
                  <div
                    onClick={() =>
                      onOpenLightbox({
                        src: product.heroImage,
                        title: `${product.trademarkName} (${product.subBrandCode})`,
                        subtitle: product.shortTagline,
                        badge: product.category,
                        description: product.summary,
                        metrics: [
                          { label: 'Thermal k', value: product.thermalConductivity.split(' (')[0] },
                          { label: 'Dielectric', value: product.dielectricStrength.split(' (')[0] },
                          { label: 'Proto Rate', value: product.protoPriceLabel },
                        ],
                      })
                    }
                    className="relative h-52 bg-white border-b border-[#E2E0D8] p-2 flex items-center justify-center cursor-zoom-in overflow-hidden"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.trademarkName}
                      className="max-h-full max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span
                      className={`absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${product.badgeColor}`}
                    >
                      {product.subBrandCode}
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded bg-[#14171A]/80 text-white opacity-80 group-hover:bg-[#E04819]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-xl font-display font-bold text-[#14171A]">
                        {product.trademarkName}
                      </h3>
                      <p className="text-xs font-medium text-[#E04819] mt-0.5">
                        {product.shortTagline}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {product.summary}
                    </p>

                    <div className="bg-white border border-[#E2E0D8] rounded p-3 space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">Proto (₹0 NRE):</span>
                        <span className="font-bold text-[#14171A] text-right">
                          {product.protoPriceLabel}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-slate-500">Volume (100+):</span>
                        <span className="font-bold text-emerald-800 text-right">
                          {product.volumePriceLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openConfigurator(product.id)}
                    className="flex-1 py-2.5 px-3 rounded bg-[#14171A] hover:bg-[#E04819] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Price by cm² & Order
                  </button>
                  <a
                    href={product.tdsUrl}
                    download
                    className="py-2.5 px-3 rounded border border-[#E2E0D8] bg-white hover:border-[#14171A] text-xs font-mono font-semibold text-[#14171A] inline-flex items-center gap-1"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#E04819]" />
                    TDS
                  </a>
                </div>
              </div>
            ))}

            {/* 6th Card: Turnkey <₹15k R&D Homologation Bundles */}
            <div className="bg-[#14171A] text-white border border-[#14171A] rounded-md p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#E04819] text-white font-bold">
                  <Sparkles className="w-3 h-3" />
                  Bypass 60-Day Vendor Onboarding
                </span>
                <h3 className="text-2xl font-display font-bold leading-snug">
                  4 Turnkey &lt; ₹15,000 R&D Qualification Kits
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered specifically under corporate petty-cash limits so Battery, Inverter, and Defense Lead Engineers can test custom-cut multi-material stacks in 48 hours via UPI or Lab Card.
                </p>
                <div className="space-y-2 pt-1">
                  {RND_KITS.map((k) => (
                    <div
                      key={k.id}
                      className="flex items-center justify-between gap-2 p-2.5 rounded bg-slate-900 border border-slate-800 text-xs"
                    >
                      <span className="truncate text-slate-200 font-medium">{k.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          addItem({
                            sku: k.sku,
                            title: k.name,
                            itemType: 'kit-bundle',
                            dimensionsLabel: 'Turnkey Engineering Kit',
                            unitPriceInr: k.priceInr,
                            quantity: 1,
                            formulaNote: k.leadTime,
                          })
                        }
                        className="font-mono font-bold text-[#E04819] hover:text-orange-300 shrink-0"
                      >
                        + {k.priceLabel}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/products#rnd-kits"
                className="mt-5 w-full py-2.5 px-4 rounded bg-white text-[#14171A] hover:bg-[#E04819] hover:text-white text-xs font-bold text-center transition-colors"
              >
                Inspect All R&D Kit Contents →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FULL-VISIBILITY 4-QUADRANT FEA & 3D CAD SHOWCASE */}
      <section className="bg-[#F6F5F1] border-b border-[#E2E0D8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ValidationShowcase
            onOpenLightbox={onOpenLightbox}
            onOrderKit={() =>
              addItem({
                sku: RND_KITS[0].sku,
                title: RND_KITS[0].name,
                itemType: 'kit-bundle',
                dimensionsLabel: 'Core™ + Barrier™ + Shield™ Pack Kit',
                unitPriceInr: RND_KITS[0].priceInr,
                quantity: 1,
                formulaNote: '48-Hour Custom Homologation Dispatch',
              })
            }
          />
        </div>
      </section>

      {/* 6. LIVE AREA (cm²) PRICING & CUSTOM CAD UPLOAD ENGINE */}
      <section className="bg-white border-b border-[#E2E0D8] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CadQuoteEngine />
        </div>
      </section>

      {/* 7. 3M-INSPIRED "THERMAFIX™ PRO-BENCH" & UNIVERSITY CO-DESIGN ECOSYSTEM */}
      <section className="bg-[#FBFBF9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold">
                <Wrench className="w-3.5 h-3.5" />
                Division 03 • ThermaFix™ Pro-Bench Direct
              </div>
              <h2 className="text-3xl font-display font-bold text-[#14171A] leading-tight">
                Industrial-Grade Thermal Science—Packaged for Every Workbench.
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Inspired by 3M’s industrial-to-prosumer model, we precision-slit our cleanroom CNC nesting stock into affordable, off-the-shelf strip & washer packs (<strong className="text-[#14171A]">₹499 – ₹1,199</strong>) for workstation builders, GPU repair centers, drone teams, and university labs.
              </p>
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: '/assets/products/thermafix-bench-pack.jpg',
                    title: 'ThermaFix™ Pro-Bench & Maker Pre-Cut Strip Series',
                    subtitle: 'Precision CNC-Slit Core™, Ultra™, Graphite-Flex™ & Shield™ Benchtop Packs',
                    dimensions: '1408 × 768 px',
                    badge: 'Direct Bench Line',
                  })
                }
                className="rounded-md overflow-hidden border border-[#E2E0D8] bg-white p-2 cursor-zoom-in shadow-sm"
              >
                <img
                  src="/assets/products/thermafix-bench-pack.jpg"
                  alt="ThermaFix Pro-Bench Electronics Thermal Packs"
                  className="w-full h-auto object-contain rounded"
                />
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRO_BENCH_PACKS.map((pack) => (
                <div
                  key={pack.id}
                  className="bg-white border border-[#E2E0D8] rounded-md p-5 flex flex-col justify-between hover:border-emerald-600 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {pack.brandLine}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{pack.sku}</span>
                    </div>
                    <h3 className="text-base font-display font-bold text-[#14171A] leading-snug">
                      {pack.name}
                    </h3>
                    <div className="text-xs font-mono text-slate-600">{pack.packCountLabel}</div>
                    <ul className="space-y-1 text-xs text-slate-600 pt-1">
                      {pack.includes.slice(0, 2).map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E2E0D8] flex items-center justify-between">
                    <div>
                      <div className="text-lg font-mono font-bold text-[#14171A]">
                        ₹{pack.priceInr}
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">Ships in 24h</div>
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
                          formulaNote: `${pack.brandLine} Direct Pack`,
                        })
                      }
                      className="px-3.5 py-2 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grounded Ecosystem Programs Strip (Rapid-Cut Toll Service + University Formula EV Program) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-[#E2E0D8]">
            <div className="bg-white border border-[#E2E0D8] rounded-md p-5 flex items-start gap-3.5">
              <Layers className="w-7 h-7 text-[#E04819] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-display font-bold text-[#14171A]">
                  Rapid-Cut™ Custom Toll Converting
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Already sourced specialty gaskets, EMI absorbers, or VHB™ tapes? Ship rolls/sheets to our Sanand CNC table for 48-hour tool-free digital cutting.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E2E0D8] rounded-md p-5 flex items-start gap-3.5">
              <Zap className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-display font-bold text-[#14171A]">
                  Thermal & Dielectric DFM Co-Design
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Send your 3D battery module `.STEP` assembly—our team unfolds busbar origami shrouds and optimizes nesting yield to cut part cost by 18–25%.
                </p>
              </div>
            </div>

            <div className="bg-white border border-[#E2E0D8] rounded-md p-5 flex items-start gap-3.5">
              <GraduationCap className="w-7 h-7 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-display font-bold text-[#14171A]">
                  Formula Bharat, BAJA & IIT Robotics Desk
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Student EV accumulator & UAV teams receive academic discounts on AIS-156 Barrier™ firewalls and Shield™ accumulator liners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
