import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  ShieldCheck,
  Flame,
  Cpu,
  Zap,
  Layers,
  PackageCheck,
  ShoppingCart,
  Award,
} from 'lucide-react';
import {
  CORE_PRODUCTS,
  SECTOR_SOLUTIONS,
  TURNKEY_BUNDLES,
  CERTIFICATIONS_LIST,
  COMPETITOR_BENCHMARK,
  CONTACT_CONFIG,
} from '../data/companyData';
import { CadQuoteEngine } from '../components/CadQuoteEngine';
import { InquiryPreset } from '../components/InquiryModal';

interface HomePageProps {
  onOpenInquiry: (preset?: InquiryPreset) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry }) => {
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTOR_SOLUTIONS[0].id);
  const activeSector =
    SECTOR_SOLUTIONS.find((s) => s.id === activeSectorId) || SECTOR_SOLUTIONS[0];

  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION — SPLIT 50/50 INDUSTRIAL ENGINEERING PORTAL */}
      <section className="relative bg-[#0B192C] text-white bg-dark-grid border-b border-slate-800 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Engineering Authority & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-mono text-orange-400">
                <Zap className="w-3.5 h-3.5" />
                <span>DIGITAL CNC CAD-TO-PART IN 24–48 HRS • ₹0 HARD-DIE NRE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12]">
                Advanced Thermal, Dielectric &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                  1,100°C Runaway Containment
                </span>{' '}
                Materials.
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Sell into your CAD file—not an 8-week overseas catalog. InsulTherm Innovations engineers custom-converted{' '}
                <strong className="text-white">3D living-hinge busbar origami</strong>,{' '}
                <strong className="text-white">nanoporous aerogel-mica fire barriers</strong>,{' '}
                <strong className="text-white">ASTM E595 pyrolytic graphite spreaders</strong>, and{' '}
                <strong className="text-white">50°C tropical anti-bleed TIM pads</strong> for BESS, Rail, Defense, AI Compute, and EV packs.
              </p>

              {/* Key Engineering Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {[
                  { title: '₹0 NRE Tooling', sub: 'Digital CNC Oscillating Knife' },
                  { title: 'Zero MOQ', sub: '1 Prototype to 50,000+ Units' },
                  { title: '50°C Tropical Spec', sub: 'Zero Siloxane Oil Pump-Out' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5"
                  >
                    <div className="flex items-center gap-1.5 text-sm font-bold text-white">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <div className="text-xs font-mono text-slate-400 mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all"
                >
                  <span>Explore Advanced Materials</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry({
                      productName: 'Custom CAD Prototype / OEM Volume Quote',
                      pricingTier: '24–48 Hr Digital CNC Evaluation (₹0 NRE)',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white text-sm font-bold px-6 py-3.5 rounded-xl transition-all"
                >
                  <span>Request Engineering Quote</span>
                </button>
              </div>

              {/* Standards Benchmark Strip */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-slate-400">
                <span className="uppercase text-slate-500 font-semibold">Benchmarks:</span>
                <span className="text-slate-200">ASTM D5470-17</span>
                <span>•</span>
                <span className="text-slate-200">UL 94 V-0</span>
                <span>•</span>
                <span className="text-slate-200">ARAI AIS-156</span>
                <span>•</span>
                <span className="text-slate-200">ASTM E595 (TML &lt;1%)</span>
                <span>•</span>
                <span className="text-emerald-400">100% India DVA</span>
              </div>
            </div>

            {/* Right Column: Interactive CNC Quote Engine */}
            <div className="lg:col-span-5">
              <CadQuoteEngine onOpenInquiry={onOpenInquiry} />
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUANTIFIED ENGINEERING METRICS STRIP */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-5 gap-6">
          {[
            { metric: '1,500 W/m·K', label: 'Peak Lateral Heat Spreading (Graphite-Flex™)' },
            { metric: '0.018 W/m·K', label: '1,100°C Nanoporous Aerogel Block (Barrier™)' },
            { metric: '>22–32 kV/mm', label: '3D Living-Hinge Dielectric Holdoff (Shield™)' },
            { metric: '<0.15 K·cm²/W', label: 'High-Flux h-BN Hybrid Impedance (Ultra™)' },
            { metric: '800–1,200/day', label: 'In-House CNC Flatbed Capacity (Gujarat)' },
          ].map((stat) => (
            <div key={stat.metric} className="border-l-2 border-orange-600 pl-4">
              <div className="text-xl sm:text-2xl font-mono font-extrabold text-slate-900">
                {stat.metric}
              </div>
              <div className="text-xs text-slate-600 mt-1 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED 5-PRODUCT TECHNICAL CATALOG GRID */}
      <section className="py-16 sm:py-20 bg-slate-50 bg-lab-grid border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-2">
                <Layers className="w-4 h-4" />
                <span>5 Core Proprietary Material Systems</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Engineered Interface Portfolio &amp; Direct Pricing
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-3xl">
                Every material IP is supplied either as precision 24–48 hour custom CNC-cut CAD geometries (₹0 hard-tooling NRE) or volume OEM production runs, complete with standalone 2-page Technical Data Sheets.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 shrink-0"
            >
              <span>Open Parametric Comparison Matrix</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden group"
              >
                {/* Macro Studio Photograph */}
                <div className="relative h-52 bg-slate-900 overflow-hidden">
                  <img
                    src={product.image}
                    alt={`${product.name} Macro Cross-Section`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span
                      className={`${product.badgeColor} text-white text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded shadow`}
                    >
                      {product.categoryLabel}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-slate-200 border border-slate-700">
                    {product.tdsDocCode}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900">{product.name}</h3>
                      <p className="text-xs font-medium text-slate-500 mt-0.5">{product.tagline}</p>
                    </div>

                    {/* Quick Spec Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {product.quickBadges.map((b) => (
                        <span
                          key={b}
                          className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] font-semibold text-slate-800"
                        >
                          {b}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {product.chemistryDescription}
                    </p>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Prototype Rate:</span>
                        <span className="font-mono font-extrabold text-slate-900">
                          {product.primaryPriceHeadline}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 font-medium">Volume / OEM:</span>
                        <span className="font-mono font-bold text-emerald-700">
                          {product.volumePriceHeadline}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={product.tdsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-300 hover:border-slate-900 bg-white text-slate-800 text-xs font-bold transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                        <span>Download TDS</span>
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenInquiry({
                            productName: product.name,
                            variant: product.variants[0].code,
                            pricingTier: `${product.primaryPriceHeadline} | ${product.volumePriceHeadline}`,
                          })
                        }
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                        <span>Request to Buy</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* 6th Card: Custom Multi-IP Kit / Full Catalog CTA */}
            <div className="bg-[#0B192C] text-white rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-11 h-11 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-extrabold">
                  Need a Nested Multi-IP Battery or Inverter Kit?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Combine <strong className="text-white">Core™</strong> bottom cold-plate pads,{' '}
                  <strong className="text-white">Barrier™</strong> 1,100°C inter-cell firewalls, and{' '}
                  <strong className="text-white">Shield™</strong> 3D busbar wraps from a single <code className="font-mono">.STEP</code> pack assembly—pre-numbered for immediate benchtop integration.
                </p>
                <ul className="space-y-2 text-xs font-mono text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Zero Stamping or Injection Mold Fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Batch ASTM D5470 &amp; UL 94 Dossier Included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>&lt;₹15,000 Petty-Cash Card Eligible</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2.5">
                <Link
                  to="/products"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-slate-100 text-xs font-extrabold px-4 py-3 rounded-xl transition-colors"
                >
                  <span>Compare All 5 Products Side-by-Side</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry({
                      productName: 'ARAI AIS-156 Rapid Homologation Pack Kit',
                      variant: 'Core™ + Barrier™ + Shield™ Nested Kit',
                      pricingTier: '₹14,500 Full Pack Kit (or ₹3,499 Starter)',
                    })
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-3 rounded-xl transition-colors"
                >
                  <span>Order ₹14,500 AIS-156 Homologation Kit</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INDUSTRIES & APPLICATIONS MATRIX (INTERACTIVE 4-SECTOR SHOWCASE) */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-2">
              <Flame className="w-4 h-4" />
              <span>Industries &amp; Hardware Applications Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Mission-Critical Thermal &amp; Dielectric Architectures
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Select your industry vertical to inspect how InsulTherm replaces 6-to-8 week imported materials and eliminates hard-tooling bottlenecks.
            </p>
          </div>

          {/* Sector Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
            {SECTOR_SOLUTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveSectorId(s.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeSectorId === s.id
                    ? 'bg-[#0B192C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {s.tabLabel}
              </button>
            ))}
          </div>

          {/* Active Sector Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-orange-100 text-orange-800 font-mono text-xs font-bold">
                  {activeSector.allocation}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-white font-mono text-xs">
                  {activeSector.headlineMetric}
                </span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900">{activeSector.title}</h3>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <div className="p-4 rounded-xl bg-white border border-slate-200">
                  <div className="text-xs font-mono uppercase text-red-600 font-bold mb-1">
                    Engineering Bottleneck
                  </div>
                  <p>{activeSector.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-emerald-200">
                  <div className="text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
                    InsulTherm Material Architecture
                  </div>
                  <p>{activeSector.solution}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {activeSector.benchmarks.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    {b}
                  </span>
                ))}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenInquiry({
                      productName: activeSector.primaryIPs.join(' + '),
                      variant: `${activeSector.tabLabel} Custom Application`,
                      pricingTier: 'Sector Pilot / Custom CAD Evaluation',
                    })
                  }
                  className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors"
                >
                  <span>Request {activeSector.tabLabel.split('(')[0].trim()} Pilot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-3">
              <div className="rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-lg">
                <img
                  src={activeSector.image}
                  alt={activeSector.title}
                  className="w-full h-64 sm:h-72 object-cover"
                />
              </div>
              <p className="text-xs font-mono text-slate-500 text-center">
                {activeSector.imageCaption}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. 1-CLICK TURNKEY R&D HARDWARE BUNDLES (<₹15,000 PETTY-CASH LIMIT) */}
      <section className="py-16 sm:py-20 bg-[#0B192C] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-2">
              <PackageCheck className="w-4 h-4" />
              <span>Bypass 6-Month Vendor Empanelment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Turnkey R&amp;D Hardware Bundles (&lt;₹15,000 Petty-Cash Ready)
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Engineered strictly below the ₹15,000 departmental purchase-card ceiling so Lead R&amp;D Engineers can receive custom-cut validation parts on their bench in 48 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TURNKEY_BUNDLES.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-orange-500/60 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded bg-orange-500/20 text-orange-300 border border-orange-500/30 font-mono text-[11px] font-bold">
                      {bundle.badge}
                    </span>
                    <span className="font-mono text-sm font-extrabold text-emerald-400">
                      {bundle.pricePrimary}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white">{bundle.title}</h3>
                  {bundle.priceSecondary && (
                    <div className="text-xs font-mono text-amber-300">
                      Starter Option: {bundle.priceSecondary}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{bundle.contents}</p>
                  <p className="text-xs text-slate-400 italic">{bundle.valueProp}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {bundle.includedIPs.map((ip) => (
                      <span
                        key={ip}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px]"
                      >
                        {ip}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenInquiry({
                        productName: bundle.title,
                        variant: bundle.includedIPs.join(' + '),
                        pricingTier: bundle.priceSecondary
                          ? `${bundle.pricePrimary} | ${bundle.priceSecondary}`
                          : bundle.pricePrimary,
                        quantity: '1 Turnkey Lab Kit',
                      })
                    }
                    className="inline-flex items-center gap-1.5 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <span>Order Lab Kit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMPETITOR BENCHMARK & CERTIFICATIONS SHOWCASE */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Competitor Benchmark */}
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 font-bold mb-1">
                <Award className="w-4 h-4" />
                <span>Commercial &amp; Engineering Benchmark</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Indian OEMs &amp; Primes Switch to InsulTherm Innovations
              </h2>
            </div>

            <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[680px] text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-mono text-xs uppercase text-slate-300">Parameter</th>
                    <th className="p-4 font-mono text-xs uppercase text-slate-300">
                      Global Incumbents (Imported Catalog)
                    </th>
                    <th className="p-4 font-mono text-xs uppercase text-slate-300">
                      Domestic Job-Shop Converters
                    </th>
                    <th className="p-4 font-mono text-xs uppercase bg-orange-600 text-white">
                      InsulTherm Innovations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {COMPETITOR_BENCHMARK.map((row) => (
                    <tr key={row.parameter} className="hover:bg-slate-50">
                      <td className="p-4 font-bold text-slate-900">{row.parameter}</td>
                      <td className="p-4 text-slate-600">{row.globalIncumbents}</td>
                      <td className="p-4 text-slate-600">{row.regionalConverters}</td>
                      <td className="p-4 font-mono font-bold text-slate-900 bg-orange-50/70">
                        {row.insultherm}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quality, Certifications & Compliance Showcase Strip */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Quality, Metrology &amp; Regulatory Standards</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Testing Benchmarks &amp; Sovereign Procurement Compliance
                </h2>
              </div>
              <div className="text-xs font-mono text-slate-500">
                Contact QA Desk: <span className="text-slate-900 font-semibold">{CONTACT_CONFIG.emailPrimary}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CERTIFICATIONS_LIST.slice(0, 8).map((cert) => (
                <div
                  key={cert.code}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="font-mono text-sm font-extrabold text-slate-900">
                      {cert.code}
                    </div>
                    <div className="text-xs font-bold text-orange-700 mt-0.5">{cert.title}</div>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{cert.scope}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/80 text-[11px] font-mono text-emerald-700 font-semibold">
                    ✓ {cert.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
