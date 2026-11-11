import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  FileDown,
  Maximize2,
  ShoppingBag,
  Tag,
  Upload,
} from 'lucide-react';
import {
  PORTFOLIOS,
  PRODUCTS,
  MARKETS,
  RND_KITS,
  VALIDATION_PLATES,
} from '../data/companyData';
import { CHECKOUT_COUPONS } from '../utils/couponEngine';
import { useOrderCart } from '../context/OrderCartContext';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface HomePageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

const HERO_SLIDES = [
  {
    eyebrow: 'SANAND GIDC DIGITAL CONVERTING • ₹0 TOOLING NRE',
    title: 'Custom Thermal, Fire & Dielectric Parts in 48 Hours',
    description:
      'Upload .DXF or .STEP geometry for precision CNC-converted thermal pads, runaway barriers, and folded busbar shrouds—priced transparently by part area with zero steel-die fees.',
    ctaPrimaryLabel: 'Instant CAD Quote',
    ctaPrimaryLink: '/quote',
    ctaSecondaryLabel: 'Explore Products',
    ctaSecondaryLink: '/products',
    image: '/assets/validation/pack-cutaway-studio.jpg',
    imageCaption: 'Integrated Module Cutaway: Shield™ Shroud + Barrier™ Walls + Core™ Base Pad',
  },
  {
    eyebrow: 'THERMAL RUNAWAY CONTAINMENT • AIS-156 & UL 9540A',
    title: 'Arrest 1,100°C Cell Propagation in 1.50 mm',
    description:
      'InsulTherm Barrier™ pairs calcined Phlogopite Mica with nanoporous Silica Aerogel (0.018 W/m·K), holding neighboring cells to 74.2°C during adjacent cell thermal runaway.',
    ctaPrimaryLabel: 'View Barrier™ Specs',
    ctaPrimaryLink: '/products#insultherm-barrier',
    ctaSecondaryLabel: 'Inspect 4-Quadrant FEA',
    ctaSecondaryLink: '/about',
    image: '/assets/products/insultherm-barrier.jpg',
    imageCaption: 'InsulTherm Barrier™ — ₹110 / custom proto sheet (100 cm² ref) | ₹85 volume',
  },
  {
    eyebrow: 'DEFENSE, SPACETECH & HIGH-DENSITY ELECTRONICS',
    title: '1,500 W/m·K Lateral Cooling With Zero Outgassing',
    description:
      'InsulTherm Graphite-Flex™ encapsulates pyrolytic graphite beneath an edge-sealed Kapton® dielectric cap and ASTM E595 silicone-free PSA—at 24% the weight of copper.',
    ctaPrimaryLabel: 'Calculate Area Price',
    ctaPrimaryLink: '/quote',
    ctaSecondaryLabel: 'View Graphite-Flex™',
    ctaSecondaryLink: '/products#insultherm-graphite-flex',
    image: '/assets/products/insultherm-graphite-flex.jpg',
    imageCaption: 'InsulTherm Graphite-Flex™ — Area-indexed prototype & ₹3.20/cm² volume rate',
  },
  {
    eyebrow: 'B2B R&D LABS & INDIVIDUAL PROTOTYPERS',
    title: 'Turnkey Qualification Kits & Starter Packs From ₹999',
    description:
      'Order <₹15,000 petty-cash R&D kits or compact ₹999–₹3,499 starter packs online—and apply B2B or first-order coupons directly at checkout.',
    ctaPrimaryLabel: 'Browse Kits & Packs',
    ctaPrimaryLink: '/products#rnd-kits',
    ctaSecondaryLabel: 'View Checkout Offers',
    ctaSecondaryLink: '/quote',
    image: '/assets/products/thermafix-bench-pack.jpg',
    imageCaption: 'Ready-to-ship evaluation boxes and starter prototyping strip packs',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onOpenLightbox }) => {
  const navigate = useNavigate();
  const { openConfigurator, openCheckout } = useOrderCart();
  const [slideIdx, setSlideIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMarketId, setActiveMarketId] = useState(MARKETS[0].id);

  const slide = HERO_SLIDES[slideIdx];
  const activeMarket = MARKETS.find((m) => m.id === activeMarketId) || MARKETS[0];

  const searchMatches = searchQuery.trim()
    ? PRODUCTS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.trademarkName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.thermalConductivity.toLowerCase().includes(q) ||
          p.dielectricStrength.toLowerCase().includes(q) ||
          p.oneLineSummary.toLowerCase().includes(q) ||
          p.applications.some((a) => a.toLowerCase().includes(q)) ||
          p.standards.some((s) => s.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div>
      {/* SECTION 1: LAIRD-INSPIRED INTERACTIVE SPOTLIGHT HERO (Black & Red Theme) */}
      <section className="bg-[#0F1115] text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#DC2626]">
                <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                {slide.eyebrow}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.12] tracking-tight">
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={slide.ctaPrimaryLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold transition-colors"
                >
                  {slide.ctaPrimaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={slide.ctaSecondaryLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition-colors"
                >
                  {slide.ctaSecondaryLabel}
                </Link>
              </div>

              {/* Clean Slide Controls (1 / 4) */}
              <div className="pt-6 flex items-center gap-4 border-t border-gray-800/90">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous spotlight"
                    onClick={() =>
                      setSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
                    }
                    className="p-2 rounded-lg border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next spotlight"
                    onClick={() => setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
                    className="p-2 rounded-lg border border-gray-800 hover:border-gray-600 text-gray-300 hover:text-white transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-xs font-mono text-gray-400 tabular-nums">
                  {slideIdx + 1} / {HERO_SLIDES.length}
                </span>

                <div className="flex gap-1.5 flex-1 max-w-[180px]">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => setSlideIdx(i)}
                      className={`h-1.5 rounded-full transition-all flex-1 ${
                        i === slideIdx ? 'bg-[#DC2626]' : 'bg-gray-700 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Clean Uncropped Spotlight Visual */}
            <div className="lg:col-span-6">
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: slide.image,
                    title: slide.title,
                    description: slide.description,
                    badge: 'InsulTherm Spotlight',
                  })
                }
                className="group bg-[#181B22] border border-gray-800 rounded-xl p-4 cursor-zoom-in transition-colors hover:border-gray-700"
              >
                <div className="relative bg-black/40 rounded-lg overflow-hidden flex items-center justify-center min-h-[280px] sm:min-h-[340px] p-2">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[340px] w-auto max-w-full object-contain rounded"
                  />
                  <span className="absolute top-3 right-3 p-2 rounded-lg bg-black/70 text-gray-200 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
                <div className="mt-3 px-1 flex items-center justify-between gap-2 text-xs text-gray-400">
                  <span>{slide.imageCaption}</span>
                  <span className="text-gray-300 font-semibold shrink-0">Full View →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LAIRD-STYLE QUICK PRODUCT & PROPERTY FINDER BAR */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Find materials by property or application (e.g., 5.5 W/mK, AIS-156, busbar, silicone-free, BMS)..."
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0F1115] focus:outline-none text-sm"
                />
              </div>
              <button
                type="button"
                onClick={() => openConfigurator()}
                className="px-5 py-3 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
              >
                <Upload className="w-4 h-4 text-[#DC2626] group-hover:text-white" />
                Upload CAD for Quote
              </button>
            </div>

            {/* Quick Filter Suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-gray-400 font-medium">Quick filters:</span>
              {['AIS-156', 'Silicone-Free', 'Busbar', '5.5 W/m·K', '1,500 W/m·K', '50×50mm'].map(
                (chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => setSearchQuery(chip === searchQuery ? '' : chip)}
                    className={`px-2.5 py-1 rounded-md border transition-colors ${
                      searchQuery === chip
                        ? 'bg-[#DC2626] text-white border-[#DC2626]'
                        : 'bg-[#F7F8FA] text-gray-600 border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    {chip}
                  </button>
                )
              )}
            </div>

            {/* Instant Auto-Complete Dropdown */}
            {searchQuery.trim() !== '' && (
              <div className="mt-3 bg-white border border-gray-200 rounded-xl shadow-lg divide-y divide-gray-100 overflow-hidden">
                {searchMatches.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500 flex items-center justify-between">
                    <span>No exact catalog match for “{searchQuery}”.</span>
                    <button
                      type="button"
                      onClick={() => navigate('/contact')}
                      className="text-xs font-bold text-[#DC2626] hover:underline"
                    >
                      Ask Engineering →
                    </button>
                  </div>
                ) : (
                  searchMatches.map((m) => (
                    <div
                      key={m.id}
                      className="p-4 hover:bg-[#F7F8FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-sm font-bold text-[#0F1115]">{m.trademarkName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {m.thermalConductivity} • {m.dielectricStrength} • {m.protoPriceLabel}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          to={`/products#${m.id}`}
                          onClick={() => setSearchQuery('')}
                          className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-[#0F1115] hover:border-[#0F1115]"
                        >
                          Specs
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery('');
                            openConfigurator(m.id);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#DC2626] text-white text-xs font-bold"
                        >
                          Configure
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR PORTFOLIOS (Laird.com 3-Pillar Architecture) */}
      <section className="bg-[#F7F8FA] border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Our Portfolios
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
              Engineered Protection & Thermal Control
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Three focused capabilities built around rapid digital converting and verified material
              performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {PORTFOLIOS.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="group bg-white border border-gray-200 hover:border-[#0F1115] rounded-xl p-7 flex flex-col justify-between shadow-sm transition-all"
              >
                <div className="space-y-3">
                  <span className="inline-block text-xs font-mono font-semibold text-[#DC2626]">
                    {item.metric}
                  </span>
                  <h3 className="text-xl font-bold text-[#0F1115] group-hover:text-[#DC2626] transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-gray-500">{item.subtitle}</div>
                  <p className="text-sm text-gray-600 leading-relaxed pt-1">{item.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1115] group-hover:text-[#DC2626]">
                  Explore Portfolio <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR PRODUCTS (Clean, Spacious 5-Product Grid) */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Our Products
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                5 Core Material Platforms
              </h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:underline"
            >
              Compare Full Technical Specifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div
                    onClick={() =>
                      onOpenLightbox({
                        src: product.heroImage,
                        title: product.trademarkName,
                        description: product.summary,
                        badge: product.category,
                      })
                    }
                    className="h-52 bg-[#F7F8FA] border-b border-gray-100 p-4 flex items-center justify-center cursor-zoom-in"
                  >
                    <img
                      src={product.heroImage}
                      alt={product.trademarkName}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-xs font-semibold text-[#DC2626]">{product.category}</div>
                    <h3 className="text-xl font-bold text-[#0F1115]">{product.trademarkName}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {product.oneLineSummary}
                    </p>

                    <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs tabular-nums">
                      <div className="flex justify-between text-gray-600">
                        <span>Key Rating:</span>
                        <span className="font-semibold text-[#0F1115]">
                          {product.category === 'Dielectric Origami'
                            ? product.dielectricStrength.split(' (')[0]
                            : product.thermalConductivity.split(' (')[0]}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Prototype:</span>
                        <span className="font-semibold text-[#0F1115]">
                          {product.protoPriceLabel}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Volume:</span>
                        <span className="font-semibold text-[#DC2626]">
                          {product.volumePriceLabel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => openConfigurator(product.id)}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    Configure & Buy
                  </button>
                  <Link
                    to={`/products#${product.id}`}
                    className="py-2.5 px-3.5 rounded-lg border border-gray-200 hover:border-[#0F1115] text-xs font-semibold text-[#0F1115]"
                  >
                    Details
                  </Link>
                  <a
                    href={product.tdsUrl}
                    download
                    title="Download 2-Page TDS PDF"
                    className="p-2.5 rounded-lg border border-gray-200 hover:border-[#DC2626] text-gray-700 hover:text-[#DC2626]"
                  >
                    <FileDown className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}

            {/* 6th Card: R&D & Prototyping Kits Summary Card */}
            <div className="bg-[#0F1115] text-white rounded-xl p-7 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Fast Evaluation & Starter Packs
                </span>
                <h3 className="text-2xl font-bold leading-snug">
                  &lt; ₹15,000 R&D Kits & Prototyping Packs
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Skip 60-day vendor onboarding with turnkey R&D kits (₹7,500–₹14,500) or compact
                  starter packs (₹999–₹3,499) for individual builders and student teams.
                </p>

                <div className="space-y-2 pt-2 text-xs tabular-nums">
                  {RND_KITS.map((k) => (
                    <div
                      key={k.id}
                      className="flex items-center justify-between py-2 border-b border-gray-800"
                    >
                      <span className="text-gray-300 truncate pr-2">{k.sector}</span>
                      <span className="font-mono font-bold text-white shrink-0">
                        {k.starterPriceInr ? `₹${k.starterPriceInr} / ` : ''}
                        {k.priceLabel}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/products#rnd-kits"
                className="mt-6 w-full py-3 px-4 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold text-center transition-colors"
              >
                View Kits & Starter Packs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR MARKETS (Clean Laird-Style Tabbed Showcase — Zero Clutter) */}
      <section className="bg-[#F7F8FA] border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Our Markets
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
              Applications Across Critical Industries
            </h2>
          </div>

          {/* Clean Sector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MARKETS.map((mkt) => (
              <button
                key={mkt.id}
                type="button"
                onClick={() => setActiveMarketId(mkt.id)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  mkt.id === activeMarket.id
                    ? 'bg-[#0F1115] text-white shadow-sm'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {mkt.name}
              </button>
            ))}
          </div>

          {/* Single Focused Market Panel */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-5">
              <div className="bg-[#F7F8FA] border border-gray-100 rounded-xl p-4 flex items-center justify-center h-64">
                <img
                  src={activeMarket.image}
                  alt={activeMarket.name}
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-mono font-semibold text-[#DC2626]">
                {activeMarket.standards}
              </div>
              <h3 className="text-2xl font-bold text-[#0F1115] leading-snug">
                {activeMarket.headline}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {activeMarket.description}
              </p>

              <div className="px-4 py-3 rounded-lg bg-[#F7F8FA] border border-gray-200 text-xs sm:text-sm text-[#0F1115]">
                <strong>Validated Benchmark:</strong> {activeMarket.keyOutcome}
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-2.5">
                {activeMarket.recommendedProducts.map((pid) => {
                  const pr = PRODUCTS.find((x) => x.id === pid);
                  if (!pr) return null;
                  return (
                    <Link
                      key={pid}
                      to={`/products#${pid}`}
                      className="px-3.5 py-2 rounded-lg border border-gray-200 hover:border-[#DC2626] text-xs font-bold text-[#0F1115] hover:text-[#DC2626] transition-colors"
                    >
                      {pr.trademarkName} →
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ENGINEERING VALIDATION HIGHLIGHTS & CHECKOUT OFFERS BANNER */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 3 Clean Engineering Highlights (Laird "Latest / Case Studies" Pattern) */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Validation & Engineering Proof
                </span>
                <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                  Full-Frame Simulation & CAD Architecture
                </h2>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:underline"
              >
                Open All 8 Validation Plates <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[VALIDATION_PLATES[0], VALIDATION_PLATES[4], VALIDATION_PLATES[7]].map((plate) => (
                <div
                  key={plate.id}
                  onClick={() => onOpenLightbox(plate)}
                  className="group bg-white border border-gray-200 hover:border-[#0F1115] rounded-xl overflow-hidden cursor-zoom-in flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="h-52 bg-[#F7F8FA] border-b border-gray-100 p-3 flex items-center justify-center relative">
                      <img
                        src={plate.src}
                        alt={plate.title}
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-[#0F1115]/80 text-white group-hover:bg-[#DC2626] transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="p-6 space-y-2">
                      <div className="text-xs font-semibold text-[#DC2626]">{plate.category}</div>
                      <h3 className="text-base font-bold text-[#0F1115] leading-snug">
                        {plate.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {plate.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-5 text-xs font-bold text-[#0F1115] group-hover:text-[#DC2626]">
                    Click to Expand Uncropped Plate →
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clean Black & Red Checkout Offers Banner */}
          <div className="bg-[#0F1115] text-white rounded-2xl p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                <Tag className="w-4 h-4" />
                Direct Checkout Privileges — B2B & Prototyping
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                Transparent Base Pricing + 4 Instant Checkout Coupons
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                Whether you are ordering a ₹999 starter pack or a ₹35,000+ OEM pilot batch, apply
                unlocked offers directly inside the Order Cart without altering standard catalog
                rates.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {CHECKOUT_COUPONS.map((c) => (
                  <span
                    key={c.code}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-xs font-mono"
                  >
                    <strong className="text-[#DC2626]">{c.code}</strong>: {c.badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-3">
              <Link
                to="/quote"
                className="px-6 py-3.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold transition-colors"
              >
                Calculate Custom Part
              </Link>
              <button
                type="button"
                onClick={openCheckout}
                className="px-6 py-3.5 rounded-lg bg-white text-[#0F1115] hover:bg-gray-100 text-sm font-bold transition-colors"
              >
                Open Order Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
