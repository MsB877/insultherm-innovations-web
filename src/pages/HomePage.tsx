import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileDown,
  Layers,
  Maximize2,
  Pause,
  Play,
  Search,
  ShoppingBag,
  Tag,
  Upload,
} from 'lucide-react';
import {
  DISCOVERY_MATRIX,
  MARKETS,
  PORTFOLIOS,
  PRODUCTS,
  RND_KITS,
  TRUST_PILLARS,
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
      'Upload .DXF or .STEP geometry for precision CNC-converted thermal pads, runaway barriers, and folded busbar shrouds—with transparent 3-tier INR pricing and zero steel-die fees.',
    ctaPrimaryLabel: 'Instant CAD Quote',
    ctaPrimaryLink: '/quote',
    ctaSecondaryLabel: 'Explore 5 Platforms',
    ctaSecondaryLink: '/products',
    image: '/assets/validation/pack-cutaway-studio.jpg',
    shortLabel: '3-IP Module Cutaway',
    metricBadge: '24–48h Dispatch • ₹0 Die NRE',
    imageCaption: 'Integrated Module Cutaway: Shield™ Busbar Shroud + Barrier™ Cell Walls + Core™ Base Pad',
  },
  {
    eyebrow: 'BESS & EV RUNAWAY CONTAINMENT • INSTALLED IN 280Ah LFP RACK',
    title: 'Arrest 1,100°C Cell Propagation in Just 1.50 mm',
    description:
      'InsulTherm Barrier™ sandwiches calcined Phlogopite Mica + nanoporous Silica Aerogel (0.018 W/m·K) vertically between prismatic LFP cells—holding neighbor cells to 74.2°C.',
    ctaPrimaryLabel: 'View Barrier™ Specs',
    ctaPrimaryLink: '/products#insultherm-barrier',
    ctaSecondaryLabel: 'Inspect 4-Quadrant FEA',
    ctaSecondaryLink: '/about',
    image: '/assets/applications/bess-barrier-lfp-installed.jpg',
    shortLabel: 'Barrier™ in LFP Rack',
    metricBadge: '₹110 Proto • ₹95 Pilot • ₹85 Blanket',
    imageCaption: 'Installed Fitment: 1.50 mm Barrier™ Firewalls Between 280Ah Prismatic LFP Cells',
  },
  {
    eyebrow: 'UAV AVIONICS, RADAR & SPACETECH • ZERO OUTGASSING',
    title: '1,500 W/m·K Lateral Cooling Inside Sealed Drone Boxes',
    description:
      'InsulTherm Graphite-Flex™ routes SoC & FPGA hotspots laterally to chassis walls beneath an edge-sealed Kapton® dielectric cap and ASTM E595 silicone-free adhesive.',
    ctaPrimaryLabel: 'Calculate Spreader Price',
    ctaPrimaryLink: '/quote',
    ctaSecondaryLabel: 'View Graphite-Flex™',
    ctaSecondaryLink: '/products#insultherm-graphite-flex',
    image: '/assets/applications/drone-graphite-flex-installed.jpg',
    shortLabel: 'Graphite-Flex™ in UAV',
    metricBadge: '₹350 (50×50) • ASTM E595 Pass',
    imageCaption: 'Installed Fitment: Edge-Sealed Graphite-Flex™ Routing UAV Flight Computer Heat to Sidewall',
  },
  {
    eyebrow: '1,500V DC BUSBAR ORIGAMI • REPLACES ₹40,000+ MOLDS',
    title: 'Snap-Fold 3D Copper Busbar Sleeves in 5 Seconds',
    description:
      'Precision 50%-depth CNC crease-scored InsulTherm Shield™ ships flat and snap-locks by hand around heavy inverter and BESS copper busbars (>28 kV/mm, UL 94 V-0).',
    ctaPrimaryLabel: 'View Shield™ Origami',
    ctaPrimaryLink: '/products#insultherm-shield',
    ctaSecondaryLabel: 'Browse <₹15k R&D Kits',
    ctaSecondaryLink: '/products#rnd-kits',
    image: '/assets/applications/inverter-shield-busbar-installed.jpg',
    shortLabel: 'Shield™ on 1,500V Busbar',
    metricBadge: '₹45 Proto • ₹35 Pilot • ₹30 Blanket',
    imageCaption: 'Installed Fitment: Hand-Folded Shield™ 3D Dielectric Shroud Over Copper Busbars',
  },
  {
    eyebrow: '800V SiC INVERTERS & 100kW+ AI LIQUID COLD PLATES',
    title: '5.5 W/m·K Low-Stress Hybrid Ceramic Interface',
    description:
      'InsulTherm Ultra™ pairs bimodal spherical Al2O3 with aligned Boron Nitride (<0.15 K·cm²/W at 35 Shore 00)—CNC cut with exact mounting-bolt clearances.',
    ctaPrimaryLabel: 'View Ultra™ 5.5 W/m·K',
    ctaPrimaryLink: '/products#insultherm-ultra',
    ctaSecondaryLabel: 'Instant Area Quote',
    ctaSecondaryLink: '/quote',
    image: '/assets/applications/sic-coldplate-ultra-installed.jpg',
    shortLabel: 'Ultra™ on SiC Cold Plate',
    metricBadge: '₹140 Proto • ₹110 Pilot • ₹95 Blanket',
    imageCaption: 'Installed Fitment: Bolt-Cut Ultra™ 5.5 W/m·K Pad Under 800V SiC Power Brick',
  },
];

const HERO_DURATION_MS = 4800;
const MARKET_DURATION_MS = 5600;
const TICK_MS = 80;

export const HomePage: React.FC<HomePageProps> = ({ onOpenLightbox }) => {
  const navigate = useNavigate();
  const { openConfigurator, openCheckout } = useOrderCart();

  // Scroll-proof continuous JS progress timers (no hover-locks that freeze on scroll!)
  const [slideIdx, setSlideIdx] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState(true);
  const [heroProgress, setHeroProgress] = useState(0);

  const [activeMarketId, setActiveMarketId] = useState(MARKETS[0].id);
  const [marketAutoPlay, setMarketAutoPlay] = useState(true);
  const [marketProgress, setMarketProgress] = useState(0);

  // Per-card image mode toggle ('installed' vs 'material') on Home product grid
  const [cardViewMode, setCardViewMode] = useState<Record<string, 'installed' | 'material'>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [discoveryTab, setDiscoveryTab] = useState<'chemistry' | 'application' | 'industry'>(
    'chemistry'
  );

  const slide = HERO_SLIDES[slideIdx];
  const activeMarket = MARKETS.find((m) => m.id === activeMarketId) || MARKETS[0];

  // Continuous, scroll-proof Hero Spotlight ticker (advances reliably regardless of scroll/cursor position)
  useEffect(() => {
    if (!heroAutoPlay) return;
    const step = (TICK_MS / HERO_DURATION_MS) * 100;
    const timer = window.setInterval(() => {
      setHeroProgress((prev) => {
        if (prev + step >= 100) {
          setSlideIdx((s) => (s + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + step;
      });
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [heroAutoPlay]);

  // Continuous, scroll-proof Markets Showcase ticker
  useEffect(() => {
    if (!marketAutoPlay) return;
    const step = (TICK_MS / MARKET_DURATION_MS) * 100;
    const timer = window.setInterval(() => {
      setMarketProgress((prev) => {
        if (prev + step >= 100) {
          setActiveMarketId((curr) => {
            const idx = MARKETS.findIndex((m) => m.id === curr);
            return MARKETS[(idx + 1) % MARKETS.length].id;
          });
          return 0;
        }
        return prev + step;
      });
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [marketAutoPlay]);

  const jumpToHeroSlide = (index: number) => {
    setSlideIdx((index + HERO_SLIDES.length) % HERO_SLIDES.length);
    setHeroProgress(0);
  };

  const jumpToMarket = (id: string) => {
    setActiveMarketId(id);
    setMarketProgress(0);
  };

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
      {/* SECTION 1: AIRY ARCHITECTURAL HERO WITH SCROLL-PROOF AUTO-ADVANCING SHOWCASE */}
      <section className="relative bg-hero-architectural bg-subtle-grid text-[#0F1115] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 6 Cols: Crisp Black & Red Executive Messaging */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-red-200/80 shadow-xs text-xs font-bold tracking-wider uppercase text-[#DC2626]">
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
                {slide.eyebrow}
              </div>

              <h1
                key={`title-${slideIdx}`}
                className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] leading-[1.12] tracking-tight animate-showcase-visual"
              >
                {slide.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl">
                {slide.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  to={slide.ctaPrimaryLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold shadow-sm transition-colors"
                >
                  {slide.ctaPrimaryLabel}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={slide.ctaSecondaryLink}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#0F1115] hover:bg-gray-800 text-white text-sm font-semibold transition-colors"
                >
                  {slide.ctaSecondaryLabel}
                </Link>
              </div>

              {/* Scroll-Proof Continuous Auto-Timer Controls + Progress Indicator */}
              <div className="pt-6 flex flex-wrap items-center gap-4 border-t border-gray-200/90">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Previous spotlight"
                    onClick={() => jumpToHeroSlide(slideIdx - 1)}
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:border-[#0F1115] text-gray-700 hover:text-[#0F1115] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next spotlight"
                    onClick={() => jumpToHeroSlide(slideIdx + 1)}
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:border-[#0F1115] text-gray-700 hover:text-[#0F1115] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    aria-label={heroAutoPlay ? 'Pause slideshow' : 'Play slideshow'}
                    onClick={() => setHeroAutoPlay((v) => !v)}
                    className="px-2.5 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#0F1115] text-gray-700 hover:text-[#DC2626] transition-colors inline-flex items-center gap-1 text-xs font-semibold"
                    title={heroAutoPlay ? 'Click to pause auto-rotation' : 'Click to resume auto-rotation'}
                  >
                    {heroAutoPlay ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#DC2626]" />
                        <span>Live</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>Paused</span>
                      </>
                    )}
                  </button>
                </div>

                <span className="text-xs font-mono font-semibold text-gray-600 tabular-nums">
                  0{slideIdx + 1} / 0{HERO_SLIDES.length}
                </span>

                {/* Synchronized JS Progress Bars */}
                <div className="flex gap-1.5 flex-1 max-w-[240px]">
                  {HERO_SLIDES.map((s, i) => (
                    <button
                      key={s.shortLabel}
                      type="button"
                      aria-label={`Slide ${i + 1}: ${s.shortLabel}`}
                      onClick={() => jumpToHeroSlide(i)}
                      className="h-2 rounded-full bg-gray-200 overflow-hidden flex-1 relative"
                    >
                      {i === slideIdx ? (
                        <span
                          style={{ width: `${Math.min(100, heroProgress)}%` }}
                          className="block h-full bg-[#DC2626] rounded-full transition-[width] duration-75 ease-linear"
                        />
                      ) : i < slideIdx ? (
                        <span className="block h-full w-full bg-[#0F1115]/35 rounded-full" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 6 Cols: Installed-in-Hardware & Cutaway Spotlight Frame + 5-Slide Strip */}
            <div className="lg:col-span-6 space-y-3">
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: slide.image,
                    title: slide.title,
                    description: slide.description,
                    badge: slide.metricBadge,
                  })
                }
                className="group bg-white border border-gray-200/90 rounded-2xl p-4 shadow-md hover:shadow-lg hover:border-gray-300 cursor-zoom-in transition-all"
              >
                <div className="relative bg-gradient-to-br from-[#F4F6FA] via-white to-[#F8FAFC] border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center min-h-[270px] sm:min-h-[330px] p-3">
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-md bg-[#0F1115]/90 text-white font-mono text-[11px] font-semibold shadow-xs">
                    {slide.metricBadge}
                  </span>

                  <img
                    key={`img-${slideIdx}`}
                    src={slide.image}
                    alt={slide.title}
                    className="max-h-[320px] w-auto max-w-full object-contain rounded-lg animate-showcase-visual"
                  />

                  <span className="absolute top-3 right-3 z-10 p-2 rounded-lg bg-white/90 border border-gray-200 text-gray-700 group-hover:bg-[#DC2626] group-hover:border-[#DC2626] group-hover:text-white transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div className="mt-3 px-1 flex items-center justify-between gap-2 text-xs text-gray-600">
                  <span className="font-medium truncate">{slide.imageCaption}</span>
                  <span className="text-[#DC2626] font-bold shrink-0">Full View →</span>
                </div>
              </div>

              {/* 5-Card Interactive Mini-Selector Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {HERO_SLIDES.map((s, idx) => {
                  const active = idx === slideIdx;
                  return (
                    <button
                      key={s.shortLabel}
                      type="button"
                      onClick={() => jumpToHeroSlide(idx)}
                      className={`text-left px-2.5 py-2 rounded-xl border text-[11px] transition-all flex items-center gap-2 ${
                        active
                          ? 'bg-[#0F1115] text-white border-[#0F1115] shadow-xs'
                          : 'bg-white/90 text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={s.image}
                        alt={s.shortLabel}
                        className="w-7 h-7 rounded object-cover bg-gray-100 shrink-0"
                      />
                      <span className="font-semibold leading-tight line-clamp-2">
                        {s.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Architectural Wave Transition into Quick Finder */}
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-7 sm:h-10 preserve-3d"
            preserveAspectRatio="none"
          >
            <path
              d="M0 18C320 44 680 -4 1080 20C1240 30 1360 28 1440 16V44H0V18Z"
              fill="#FFFFFF"
            />
          </svg>
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
                  placeholder="Find materials by property or hardware zone (e.g., 5.5 W/mK, UAV drone, 280Ah BESS, busbar, BMS)..."
                  className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-[#0F1115] focus:outline-none text-sm bg-[#F8FAFC] focus:bg-white transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={() => openConfigurator()}
                className="px-5 py-3 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 shrink-0 transition-colors"
              >
                <Upload className="w-4 h-4 text-[#DC2626]" />
                Upload CAD for Quote
              </button>
            </div>

            {/* Quick Filter Suggestions */}
            <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
              <span className="text-gray-400 font-medium">Quick filters:</span>
              {['AIS-156', 'UAV', 'Busbar', '5.5 W/m·K', '1,500 W/m·K', '50×50mm'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip === searchQuery ? '' : chip)}
                  className={`px-2.5 py-1 rounded-md border transition-colors ${
                    searchQuery === chip
                      ? 'bg-[#DC2626] text-white border-[#DC2626]'
                      : 'bg-[#F4F6FA] text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {chip}
                </button>
              ))}
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
                      <div className="flex items-center gap-3">
                        <img
                          src={m.installedImage}
                          alt={m.trademarkName}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                        />
                        <div>
                          <div className="text-sm font-bold text-[#0F1115]">{m.trademarkName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {m.thermalConductivity} • {m.protoPriceLabel} → {m.volumePriceLabel}
                          </div>
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

      {/* SECTION 3: OUR PORTFOLIOS (Tonal Slate Surface) */}
      <section className="bg-canvas-tonal border-b border-gray-200/80 py-20">
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
                className="group bg-white border border-gray-200 hover:border-[#0F1115] rounded-2xl p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <span className="inline-block text-xs font-mono font-semibold px-2.5 py-1 rounded bg-red-50 text-[#DC2626]">
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

          {/* 4-Pillar Indigenous Industrial Capability Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST_PILLARS.map((pillar) => (
              <div
                key={pillar.code}
                className="bg-white/95 border border-gray-200 rounded-xl p-5 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-extrabold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                    Pillar {pillar.code}
                  </span>
                  <span className="text-[11px] font-semibold text-gray-400">Make in India</span>
                </div>
                <h4 className="text-sm font-extrabold text-[#0F1115]">{pillar.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">{pillar.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3B: ANABOND-INSPIRED 3-WAY TECHNICAL SELECTOR (BY CHEMISTRY • BY APPLICATION • BY INDUSTRY) */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                3-Way Engineering Discovery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] mt-1">
                Specify Materials By Chemistry, Application, or Industry
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Match polymer/filler chemistry, thermal or dielectric function, and Indian sector
                standards directly to our custom CNC platforms.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-[#F4F6FA] p-1 border border-gray-200 text-xs font-bold">
                {[
                  { id: 'chemistry', label: 'By Chemistry' },
                  { id: 'application', label: 'By Application' },
                  { id: 'industry', label: 'By Industry' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setDiscoveryTab(t.id as typeof discoveryTab)}
                    className={`px-3.5 py-2 rounded-lg transition-all ${
                      discoveryTab === t.id
                        ? 'bg-[#0F1115] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#0F1115]'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <Link
                to="/knowledge"
                className="px-3.5 py-2 rounded-xl border border-red-200 bg-red-50/60 hover:bg-[#DC2626] hover:text-white text-xs font-bold text-[#DC2626] transition-colors"
              >
                Knowledge Centre →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {DISCOVERY_MATRIX[discoveryTab].map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-gray-200 bg-[#F8FAFC] hover:bg-white hover:border-[#0F1115] p-4 flex flex-col justify-between transition-all"
              >
                <div className="space-y-2">
                  <span className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-50 text-[#DC2626] border border-red-200/70">
                    {item.badge}
                  </span>
                  <h3 className="text-sm font-extrabold text-[#0F1115] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.technicalSummary}</p>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-200/80 space-y-2">
                  <div className="text-[11px] font-mono font-semibold text-gray-800">
                    {item.keyMetric}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.recommendedProductIds.map((pid) => {
                      const prod = PRODUCTS.find((x) => x.id === pid);
                      if (!prod) return null;
                      return (
                        <button
                          key={pid}
                          type="button"
                          onClick={() => openConfigurator(pid)}
                          className="px-2 py-1 rounded bg-[#0F1115] hover:bg-[#DC2626] text-white text-[11px] font-bold transition-colors"
                        >
                          {prod.name.replace('InsulTherm ', '')}™ →
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: OUR PRODUCTS (Dual-View: Installed in Hardware <-> Material Stack + 3-Tier Pricing) */}
      <section className="bg-white border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Our Products • Material & Installed Hardware Views
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                5 Core Material Platforms
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Toggle any card between <strong>Installed in Hardware</strong> and{' '}
                <strong>Material Stack</strong>, or click to inspect full-frame.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:underline"
            >
              Compare Full Technical Specifications <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PRODUCTS.map((product) => {
              const mode = cardViewMode[product.id] || 'installed';
              const activeImg = mode === 'installed' ? product.installedImage : product.heroImage;
              const activeDesc =
                mode === 'installed' ? product.installedCaption : product.summary;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="relative h-56 bg-[#F4F6FA] border-b border-gray-100 overflow-hidden group">
                      {/* Dual-View Toggle Bar */}
                      <div className="absolute top-2.5 left-2.5 z-10 inline-flex rounded-lg bg-white/95 backdrop-blur-xs p-0.5 border border-gray-200 shadow-2xs text-[11px] font-bold">
                        <button
                          type="button"
                          onClick={() =>
                            setCardViewMode((prev) => ({ ...prev, [product.id]: 'installed' }))
                          }
                          className={`px-2 py-1 rounded-md inline-flex items-center gap-1 transition-colors ${
                            mode === 'installed'
                              ? 'bg-[#0F1115] text-white'
                              : 'text-gray-600 hover:text-[#0F1115]'
                          }`}
                        >
                          <Cpu className="w-3 h-3" />
                          Installed Fit
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setCardViewMode((prev) => ({ ...prev, [product.id]: 'material' }))
                          }
                          className={`px-2 py-1 rounded-md inline-flex items-center gap-1 transition-colors ${
                            mode === 'material'
                              ? 'bg-[#0F1115] text-white'
                              : 'text-gray-600 hover:text-[#0F1115]'
                          }`}
                        >
                          <Layers className="w-3 h-3" />
                          Material
                        </button>
                      </div>

                      <div
                        onClick={() =>
                          onOpenLightbox({
                            src: activeImg,
                            title: `${product.trademarkName} — ${
                              mode === 'installed' ? 'Installed Hardware View' : 'Material Stack'
                            }`,
                            description: activeDesc,
                            badge: product.category,
                          })
                        }
                        className="w-full h-full flex items-center justify-center p-3 cursor-zoom-in"
                      >
                        <img
                          src={activeImg}
                          alt={product.trademarkName}
                          loading="lazy"
                          className={`max-h-full max-w-full ${
                            mode === 'installed' ? 'w-full h-full object-cover rounded-lg' : 'object-contain'
                          } group-hover:scale-105 transition-transform duration-300`}
                        />
                      </div>
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
                          <span>Prototype (1–99):</span>
                          <span className="font-semibold text-[#0F1115]">
                            {product.protoPriceLabel}
                          </span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Pilot / Blanket:</span>
                          <span className="font-semibold text-[#DC2626]">
                            {product.pilotPriceLabel.split(' (')[0]} → {product.volumePriceLabel.split(' (')[0]}
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
              );
            })}

            {/* 6th Card: R&D & Prototyping Kits Summary Card with Unboxed Kit Visual */}
            <div className="bg-[#0F1115] text-white rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div
                  onClick={() =>
                    onOpenLightbox({
                      src: '/assets/applications/rnd-sampler-kit-unboxed.jpg',
                      title: 'All-5-Material Engineering Benchtop Sampler Box (₹9,800)',
                      description:
                        'Turnkey <₹15,000 petty-cash qualification box containing indexed sheets and custom parts across Shield™, Barrier™, Graphite-Flex™, Core™, and Ultra™.',
                      badge: '<₹15,000 R&D Kits',
                    })
                  }
                  className="h-44 overflow-hidden relative cursor-zoom-in group"
                >
                  <img
                    src="/assets/applications/rnd-sampler-kit-unboxed.jpg"
                    alt="All-5-IP Benchtop R&D Sampler Kit"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#DC2626] text-white text-[11px] font-bold">
                    &lt; ₹15,000 Petty-Cash Limit
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold leading-snug">
                    Turnkey R&D Kits & Starter Packs
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Bypass 60-day vendor onboarding with full R&D kits (₹7,500–₹14,500) or compact
                    starter packs (₹999–₹3,499).
                  </p>

                  <div className="space-y-1.5 pt-1 text-xs tabular-nums">
                    {RND_KITS.map((k) => (
                      <div
                        key={k.id}
                        className="flex items-center justify-between py-1.5 border-b border-gray-800"
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
              </div>

              <div className="px-6 pb-6">
                <Link
                  to="/products#rnd-kits"
                  className="block w-full py-2.5 px-4 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs font-bold text-center transition-colors"
                >
                  View Kits & Starter Packs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR MARKETS (Scroll-Proof Continuous Auto-Advancing Hardware Showcase) */}
      <section className="bg-canvas-tonal border-b border-gray-200 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Our Markets • Exact Hardware Fitment Zones
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                Where InsulTherm Fits Inside Real Systems
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-28 h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <span
                  style={{ width: `${Math.min(100, marketProgress)}%` }}
                  className="block h-full bg-[#DC2626] transition-[width] duration-75 ease-linear"
                />
              </div>
              <button
                type="button"
                onClick={() => setMarketAutoPlay((v) => !v)}
                className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-[#0F1115] text-xs font-semibold text-gray-700 inline-flex items-center gap-1.5"
              >
                {marketAutoPlay ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-[#DC2626]" />
                    Auto
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    Paused
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Clean Sector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {MARKETS.map((mkt) => (
              <button
                key={mkt.id}
                type="button"
                onClick={() => jumpToMarket(mkt.id)}
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

          {/* Single Focused Market Panel with Installed Hardware Photo */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
            <div className="lg:col-span-5">
              <div
                onClick={() =>
                  onOpenLightbox({
                    src: activeMarket.image,
                    title: activeMarket.imageLabel,
                    description: activeMarket.description,
                    badge: activeMarket.name,
                  })
                }
                className="group relative bg-[#F4F6FA] border border-gray-200 rounded-xl overflow-hidden h-64 sm:h-72 cursor-zoom-in"
              >
                <img
                  key={activeMarket.id}
                  src={activeMarket.image}
                  alt={activeMarket.name}
                  loading="lazy"
                  className="w-full h-full object-cover animate-showcase-visual group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-[#0F1115]/85 text-white text-[11px] font-medium flex items-center justify-between gap-2">
                  <span className="truncate">{activeMarket.imageLabel}</span>
                  <Maximize2 className="w-3.5 h-3.5 shrink-0 text-[#DC2626]" />
                </span>
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

              <div className="px-4 py-3 rounded-lg bg-[#F4F6FA] border border-gray-200 text-xs sm:text-sm text-[#0F1115]">
                <strong>Engineering Benchmark:</strong> {activeMarket.keyOutcome}
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
          {/* 3 Clean Engineering Highlights */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Validation & Engineering Proof
                </span>
                <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
                  Full-Frame Simulation, Hardware & CAD Architecture
                </h2>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:underline"
              >
                Open All {VALIDATION_PLATES.length} Engineering Plates{' '}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[VALIDATION_PLATES[0], VALIDATION_PLATES[1], VALIDATION_PLATES[9]].map((plate) => (
                <div
                  key={plate.id}
                  onClick={() => onOpenLightbox(plate)}
                  className="group bg-white border border-gray-200 hover:border-[#0F1115] rounded-2xl overflow-hidden cursor-zoom-in flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="h-52 bg-[#F4F6FA] border-b border-gray-100 p-3 flex items-center justify-center relative">
                      <img
                        src={plate.src}
                        alt={plate.title}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
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
                3-Tier Volume Rates + 4 Instant Checkout Coupons
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                Whether you are ordering a ₹999 starter pack, a &lt;₹15k petty-cash R&D kit, or a
                500+ piece OEM blanket batch, unlock automatic volume tiers and apply eligible
                coupons at checkout.
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
