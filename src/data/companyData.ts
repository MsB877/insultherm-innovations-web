import { ProductSlugId } from '../utils/pricingEngine';

export interface ProductLayer {
  code: string;
  name: string;
  spec: string;
}

export interface ProductSpec {
  id: ProductSlugId;
  subBrandCode: string;
  division: 'Energy & Industrial' | 'Defense & Compute';
  name: string;
  trademarkName: string;
  shortTagline: string;
  category: 'Dielectric Origami' | 'Fire Barrier' | 'Anisotropic Spreader' | 'Thermal Gap Pad' | 'High-Flux Hybrid TIM';
  badgeColor: string;
  accentHex: string;
  revenueShareMix: string;
  grossMarginTarget: string;
  heroImage: string;
  secondaryImage?: string;
  tdsUrl: string;
  thermalConductivity: string;
  thermalConductivitySort: number;
  thermalImpedance: string;
  dielectricStrength: string;
  dielectricSort: number;
  operatingTemp: string;
  maxTempSort: number;
  flammability: string;
  hardnessOrDensity: string;
  thicknessRange: string;
  defaultLengthMm: number;
  defaultWidthMm: number;
  defaultThicknessMm: number;
  protoPriceLabel: string;
  volumePriceLabel: string;
  referencePriceNote: string;
  moqLabel: string;
  leadTime: string;
  outgassingCompliant: boolean;
  siliconeFreeAvailable: boolean;
  keyGrades: string[];
  summary: string;
  problemSolved: string;
  layers: ProductLayer[];
  applications: string[];
  standards: string[];
}

export interface KitBundle {
  id: string;
  sku: string;
  name: string;
  sector: string;
  priceInr: number;
  priceLabel: string;
  starterPriceInr?: number;
  starterLabel?: string;
  leadTime: string;
  contents: string[];
  procurementAdvantage: string;
}

export interface ProBenchPack {
  id: string;
  sku: string;
  brandLine: string;
  name: string;
  audience: string;
  priceInr: number;
  packCountLabel: string;
  materialBase: string;
  specs: string;
  includes: string[];
  badge: string;
}

export interface ValidationPlate {
  id: string;
  category: 'FEA Simulation' | 'CAD Architecture' | 'Physical Hardware';
  title: string;
  subtitle: string;
  src: string;
  dimensions: string;
  badge: string;
  metrics: { label: string; value: string }[];
  description: string;
}

export interface ApplicationChallenge {
  id: string;
  problemTitle: string;
  sectorTag: string;
  symptom: string;
  recommendedProductId: ProductSlugId;
  recommendedCompanionId?: ProductSlugId;
  whyItWorks: string;
  suggestedFootprint: { lengthMm: number; widthMm: number; qty: number };
}

export const COMPANY_INFO = {
  name: 'InsulTherm Innovations',
  legalDescriptor: 'Advanced Thermal & Dielectric Materials | Digital CNC Converting Lab',
  brandMotto: 'Material Science. Engineered to Fit.™',
  tagline: 'Zero-Tooling Custom Thermal, Fire-Containment & Dielectric Engineering',
  phoneMasked: '+91 78148 XXXXX',
  officialEmail: 'manav.sb@inslthrm.in',
  routingEmail: 'manavsb9719@gmail.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/manavsb9719@gmail.com',
  formSubmitAction: 'https://formsubmit.co/manavsb9719@gmail.com',
  addressLines: [
    'InsulTherm Innovations — Advanced Materials & Digital Converting Wing',
    'Block C-14, Sanand GIDC Industrial Estate (Near iCreate Campus)',
    'Ahmedabad, Gujarat – 382110, India',
  ],
  shortAddress: 'Sanand GIDC Industrial Corridor, Ahmedabad, Gujarat – 382110',
  coordinates: '22.9916° N, 72.3814° E',
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=72.3350%2C22.9650%2C72.4350%2C23.0250&layer=mapnik&marker=22.9916%2C72.3814',
  founders: [
    {
      name: 'Manav',
      role: 'Co-Founder — Commercial Strategy, OEM Accounts & Enterprise Partnerships',
      focus: 'Leads BESS, EV, Defense PSU qualification pipelines, transparent area-pricing architecture, and direct R&D procurement programs.',
      email: 'manav.sb@inslthrm.in',
    },
    {
      name: 'Nikhil',
      role: 'Co-Founder — Composite Formulation, Thermal FEA & Dielectric Validation',
      focus: 'Architects multi-layer TIM formulations, ASTM D5470 / D149 validation protocols, and 4-quadrant battery runaway thermal modeling.',
    },
    {
      name: 'Sukhmeet',
      role: 'Co-Founder — Digital CNC Converting, CAD/CAM Nesting & Quality Operations',
      focus: 'Directs zero-tooling oscillating-knife CNC cells, 50%-depth living-hinge scoring accuracy, and 24–48 hour rapid-dispatch execution.',
    },
  ],
};

export const BRAND_DIVISIONS = [
  {
    code: 'DIV-01',
    name: 'Energy, Mobility & Grid Safety',
    subBrands: ['SHIELD-FOLD™', 'PYROBLOCK™', 'TROPICORE™'],
    colorHex: '#E04819',
    summary:
      'AIS-156 / UL 9540A cell-to-cell fire containment, 1,500V DC 3D dielectric busbar origami, and 50°C tropical anti-bleed cold-plate draining.',
    ctaTarget: '/products',
  },
  {
    code: 'DIV-02',
    name: 'Defense, SpaceTech & AI Compute',
    subBrands: ['FLUXPLANE™', 'HYPERFLUX™'],
    colorHex: '#D97706',
    summary:
      'ASTM E595 zero-outgassing 1,000–1,500 W/m·K pyrolytic graphite planes and 5.5 W/m·K siloxane-free hybrid TIMs for radar, LEO satellites, and SiC/800G.',
    ctaTarget: '/products',
  },
  {
    code: 'DIV-03',
    name: 'ThermaFix™ Pro-Bench & Lab Direct',
    subBrands: ['THERMAFIX™', 'INSULTAPE™', 'RAPID-CUT™'],
    colorHex: '#047857',
    summary:
      '3M-style ready-to-use thermal & dielectric packs (₹349–₹1,499) for electronics repair labs, workstation/SSD builders, FPV robotics, and university EV teams.',
    ctaTarget: '/products#pro-bench',
  },
];

export const PRODUCTS: ProductSpec[] = [
  {
    id: 'insultherm-shield',
    subBrandCode: 'SHIELD-FOLD™ SERIES',
    division: 'Energy & Industrial',
    name: 'InsulTherm Shield',
    trademarkName: 'InsulTherm Shield™',
    shortTagline: '3D Dielectric Origami & Living-Hinge Busbar Shrouds',
    category: 'Dielectric Origami',
    badgeColor: 'bg-[#14171A] text-white border-[#14171A]',
    accentHex: '#14171A',
    revenueShareMix: '32% Portfolio Volume Anchor',
    grossMarginTarget: '68–76% Gross Margin',
    heroImage: '/assets/products/insultherm-shield.jpg',
    secondaryImage: '/assets/validation/cad-assembled-pack.png',
    tdsUrl: '/tds/insultherm-shield-tds.pdf',
    thermalConductivity: '0.16 – 0.22 W/m·K (Dielectric Barrier)',
    thermalConductivitySort: 0.2,
    thermalImpedance: 'Electrical Arc & Creepage Isolation',
    dielectricStrength: '28 – 32 kV/mm (>14 kV @ 0.43 mm)',
    dielectricSort: 32,
    operatingTemp: '-40°C to +115°C (FGK) / +180°C (NMX)',
    maxTempSort: 180,
    flammability: 'UL 94 V-0 Flame-Retardant',
    hardnessOrDensity: '< 0.8% Moisture Absorption | >200 Fold Cycles',
    thicknessRange: '0.25 mm, 0.43 mm, 0.50 mm, 0.80 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 0.43,
    protoPriceLabel: '₹45 / 100 cm² pc (₹0.45/cm²)',
    volumePriceLabel: '₹0.30 / cm² nested (₹30 / 100 cm²)',
    referencePriceNote: 'Reference 100×100 mm (100 cm²) shroud = ₹45 proto (min ₹25/pc) & ₹30 volume. Any custom flat-pattern size scales directly by cm².',
    moqLabel: '1 Piece (₹0 Tooling NRE)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Shield-FGK-043 (Formex™ GK-17 Equiv.)', 'Shield-NMX-050 (Nomex® 410 Duplex)'],
    summary:
      'Precision CNC-cut and 50%-depth crease-scored flame-retardant polypropylene and aramid dielectric sheets that ship flat and fold by hand into rigid, snap-fit 3D enclosures around 800V–1,500V DC busbars—eliminating ₹4–12 Lakh injection molds.',
    problemSolved:
      'Replaces 8-week injection-molded plastic housings and 12-week steel rule dies during EV battery, BESS inverter, and switchgear design iterations.',
    layers: [
      { code: 'L1', name: 'UL 94 V-0 Dielectric Polymer / Aramid Core', spec: '28–32 kV/mm breakdown, non-hygroscopic (<0.8% H2O)' },
      { code: 'L2', name: '50%-Depth Precision CNC Crease Channel', spec: '±0.05 mm Z-axis depth control for crack-free 90°/180° origami folds' },
      { code: 'L3', name: 'Interlocking Tab-and-Slot Retention Geometry', spec: 'Adhesive-free mechanical snap lock over live copper busbars' },
      { code: 'L4', name: 'Optional Zone-Applied UL94 V-0 Acrylic PSA', spec: 'Kiss-cut peel tab for rapid chassis wall anchoring' },
    ],
    applications: [
      '1,500V DC Grid-Scale BESS & Solar Inverter Busbar Shrouds',
      'AIS-156 EV Battery Pack Top Collector & BMS Enclosure Liners',
      'RDSO Railway Auxiliary Converter & Switchgear Arc Chutes',
      'Server PSU & Industrial UPS High-Voltage Creepage Dividers',
    ],
    standards: ['ASTM D149 (>28 kV/mm)', 'UL 94 V-0', 'IEC 60664-1 Creepage', 'RoHS 3 / REACH'],
  },
  {
    id: 'insultherm-barrier',
    subBrandCode: 'PYROBLOCK™ SERIES',
    division: 'Energy & Industrial',
    name: 'InsulTherm Barrier',
    trademarkName: 'InsulTherm Barrier™',
    shortTagline: '1,100°C Nanoporous Aerogel-Mica Thermal Runaway Firewall',
    category: 'Fire Barrier',
    badgeColor: 'bg-[#C81E1E] text-white border-[#C81E1E]',
    accentHex: '#C81E1E',
    revenueShareMix: '26% Portfolio Revenue Share',
    grossMarginTarget: '58–66% Gross Margin',
    heroImage: '/assets/products/insultherm-barrier.jpg',
    secondaryImage: '/assets/validation/fea-runaway-400c.png',
    tdsUrl: '/tds/insultherm-barrier-tds.pdf',
    thermalConductivity: '0.018 – 0.022 W/m·K @ 25°C',
    thermalConductivitySort: 0.018,
    thermalImpedance: 'ΔT > 325°C Hold @ 1.5 mm Wall',
    dielectricStrength: '> 15 kV/mm (>22.5 kV Total Stack)',
    dielectricSort: 15,
    operatingTemp: '-60°C to +1,100°C Torch Hold (>5 min)',
    maxTempSort: 1100,
    flammability: 'UL 94 V-0 / UL 9540A / AIS-156 Amend. 3',
    hardnessOrDensity: '25–35% Compressible Cell-Breathing Core',
    thicknessRange: '1.50 mm (Std), 1.65 mm (Kapton HV), 2.00 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹110 / 100 cm² sheet (₹1.10/cm²)',
    volumePriceLabel: '₹0.85 / cm² nested (₹85 / 100 cm²)',
    referencePriceNote: 'Reference 100×100 mm (100 cm²) cell sheet = ₹110 proto (min ₹55) & ₹85 volume. Large 280Ah BESS sheets (174×204 mm = 355 cm²) calculate transparently by cm².',
    moqLabel: '1 Sheet / Pack Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: true,
    keyGrades: ['Barrier-MA1-150 (Mica + Aerogel + FR-PSA)', 'Barrier-MK2-165 (Dual-Mica + Kapton® Seal)'],
    summary:
      'Ultra-thin 1.50 mm 4-layer cell-to-cell thermal runaway propagation firewall pairing high-velocity particle-erosion-resistant Phlogopite Mica with nanoporous Silica Aerogel (k = 0.018 W/m·K) to arrest cascading lithium-ion cell fires.',
    problemSolved:
      'Stops a 400°C–1,100°C venting lithium-ion cell from triggering thermal runaway in neighboring cells (<100°C safety ceiling) without sacrificing volumetric energy density.',
    layers: [
      { code: 'L1', name: '0.20 mm Calcined Phlogopite Mica Armor', spec: 'Withstands >1,100°C vent-gas particle jetting & >20 kV/mm dielectric stress' },
      { code: 'L2', name: '1.20 mm Nanoporous Silica Aerogel Felt', spec: 'k = 0.018 W/m·K ultra-insulation + 25–35% cell swelling absorption' },
      { code: 'L3', name: '0.10 mm UL 94 V-0 Flame-Retardant Acrylic PSA', spec: 'Instant peel-and-stick positioning directly onto prismatic/pouch cell cans' },
      { code: 'L4', name: '0.075 mm Moisture-Barrier PET Release Liner', spec: 'Split-back kiss-cut liner with sealed non-shedding CNC perimeter' },
    ],
    applications: [
      'AIS-156 Rev. 3 Two/Three-Wheeler & Passenger EV Inter-Cell Firewalls',
      'UL 9540A 280Ah / 314Ah LFP Utility BESS Container Propagation Barriers',
      'Module Lid Vent-Channel Blast Deflectors & Exhaust Shields',
      'Aerospace, Marine & Mining Emergency Backup Battery Enclosures',
    ],
    standards: ['AIS-156 Amend. 3 (>5 min @ 1,100°C)', 'UL 9540A', 'ASTM C518', 'ASTM D149'],
  },
  {
    id: 'insultherm-graphite-flex',
    subBrandCode: 'FLUXPLANE™ SERIES',
    division: 'Defense & Compute',
    name: 'InsulTherm Graphite-Flex',
    trademarkName: 'InsulTherm Graphite-Flex™',
    shortTagline: '1,000–1,500 W/m·K Edge-Sealed Zero-Outgassing Spreader',
    category: 'Anisotropic Spreader',
    badgeColor: 'bg-[#D97706] text-white border-[#D97706]',
    accentHex: '#D97706',
    revenueShareMix: '15% Portfolio Revenue Share',
    grossMarginTarget: '70–82% Gross Margin',
    heroImage: '/assets/products/insultherm-graphite-flex.jpg',
    tdsUrl: '/tds/insultherm-graphite-flex-tds.pdf',
    thermalConductivity: '1,000 – 1,500 W/m·K (X-Y) | ~12 W/m·K (Z)',
    thermalConductivitySort: 1500,
    thermalImpedance: '3.7× Copper In-Plane @ 24% Mass',
    dielectricStrength: '> 5,000 V AC (0.025 mm Kapton® Cap)',
    dielectricSort: 5,
    operatingTemp: '-55°C to +150°C (PSA) / +400°C (Core)',
    maxTempSort: 400,
    flammability: 'UL 94 V-0 | ASTM E595 Space Vacuum Grade',
    hardnessOrDensity: '1.95 – 2.12 g/cm³ (76% Lighter than Cu)',
    thicknessRange: '0.15 mm – 0.35 mm Ultra-Thin Stack',
    defaultLengthMm: 50,
    defaultWidthMm: 50,
    defaultThicknessMm: 0.24,
    protoPriceLabel: '₹350 (≤25 cm²) – ₹1,800 (300 cm²) by Area',
    volumePriceLabel: '₹3.20 / cm² nested (min ₹28 / pc)',
    referencePriceNote: '100% Area-Indexed: Proto ≤25 cm² = ₹350/pc; 26–100 cm² = ₹350 + ₹5.50/cm²; 101–300 cm² = +₹5.15/cm². Volume (≥100 pcs) = ₹3.20/cm² nested (so a 10 cm² strip is ₹32/pc!).',
    moqLabel: '1 Piece (100% Domestic DVA)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['GFlex-1000 (1,000 W/m·K Defense/ECU)', 'GFlex-1500 (1,500 W/m·K Satellite/Radar)'],
    summary:
      '5-layer anisotropic heat-spreading plane encapsulating dual high-crystallinity pyrolytic graphite cores beneath an edge-sealed amber Kapton® polyimide dielectric armor and ASTM E595 zero-outgassing silicone-free adhesive.',
    problemSolved:
      'Eliminates conductive graphite edge-flaking PCB shorts AND silicone outgassing optical fogging in sealed UAVs, phased-array radars, LEO satellites, and 800G optics.',
    layers: [
      { code: 'L1', name: '0.025 mm Kapton® Polyimide Dielectric Top Cap', spec: '>5 kV isolation + 1.0–1.5 mm CNC edge-seal overhang prevents flaking' },
      { code: 'L2', name: 'Dual Pyrolytic Graphite Core (k_xy 1,000–1,500 W/m·K)', spec: 'Rapid lateral heat diffusion eliminating ≥18°C local SoC/FPGA hotspots' },
      { code: 'L3', name: 'Ultra-Thin Open-Mesh E-Glass Scrim Interleaf', spec: 'Tear & fold reinforcement across 2.0 mm dynamic chassis bends' },
      { code: 'L4', name: '0.030 mm ASTM E595 Silicone-Free Acrylic PSA', spec: 'TML < 1.0%, CVCM < 0.10% — zero siloxane migration onto laser/camera optics' },
      { code: 'L5', name: '0.050 mm Kiss-Cut Clear PET Release Liner', spec: 'Cleanroom N2-purged ESD pouch packaging option' },
    ],
    applications: [
      'Defense UAV Flight Computers, Phased-Array Radar T/R Modules & Seekers',
      'LEO Satellite Payloads & Optical Earth-Observation Camera Housings',
      'Sealed Automotive ADAS LiDAR/Camera ECUs & 5G/6G Small Cells',
      '800G / 1.6T AI Pluggable Optical Transceiver Cold-Rail Heat Routing',
    ],
    standards: ['ASTM E595 (TML <1%, CVCM <0.1%)', 'MIL-STD-810H', 'ASTM D149 (>5 kV)', '100% India DVA'],
  },
  {
    id: 'insultherm-core',
    subBrandCode: 'TROPICORE™ SERIES',
    division: 'Energy & Industrial',
    name: 'InsulTherm Core',
    trademarkName: 'InsulTherm Core™',
    shortTagline: '3.0 W/m·K Tropical Anti-Bleed Scrim-Reinforced TIM Pad',
    category: 'Thermal Gap Pad',
    badgeColor: 'bg-[#E04819] text-white border-[#E04819]',
    accentHex: '#E04819',
    revenueShareMix: '15% Portfolio Revenue Share',
    grossMarginTarget: '52–60% Gross Margin',
    heroImage: '/assets/products/insultherm-core.jpg',
    secondaryImage: '/assets/products/insultherm-core-diecut.jpg',
    tdsUrl: '/tds/insultherm-core-tds.pdf',
    thermalConductivity: '3.0 W/m·K Bulk Conductivity',
    thermalConductivitySort: 3.0,
    thermalImpedance: '0.22 – 0.28 K·cm²/W @ 1 mm, 20 psi',
    dielectricStrength: '> 10 kV/mm (Core-300) / > 14 kV/mm (350D)',
    dielectricSort: 14,
    operatingTemp: '-50°C to +200°C (50°C Tropical Anti-Bleed)',
    maxTempSort: 200,
    flammability: 'UL 94 V-0 Certified Matrix',
    hardnessOrDensity: '40 Shore 00 Ultra-Soft Conformable',
    thicknessRange: '0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹80 / 100 cm² custom pad | ₹20 / std 50×50mm',
    volumePriceLabel: '₹0.68 → ₹0.612 / cm² (₹61.20 / 100 cm²)',
    referencePriceNote: 'In-stock 50×50 mm (25 cm²) BMS pad = ₹20/pad. Custom CNC pads = ₹0.80/cm² proto (100×100 mm = ₹80, min ₹35) and ₹0.68 → ₹0.612/cm² in OEM volume.',
    moqLabel: '1 Custom Pad or 50×50mm Pack',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: false,
    keyGrades: ['Core-300 (3.0 W/m·K Anti-Bleed)', 'Core-BMS-50x50 (₹20 Std Pad)', 'Core-350D (>14 kV/mm HV Scrim)'],
    summary:
      '5-layer tropical-climate-engineered elastomer thermal interface gap pad formulated with 72 wt% silane-passivated bimodal spherical alumina and central woven E-Glass scrim to eliminate silicone oil bleed and pad stretching during assembly.',
    problemSolved:
      'Prevents silicone oil pump-out under 50°C–60°C Indian ambient thermal cycling and eliminates 6–8 week import lead times on custom-cut EV cold-plate and BMS pads.',
    layers: [
      { code: 'L1', name: '0.050 mm Extended-Tab Top PET Release Liner', spec: 'Glove-friendly ergonomic peel tab for 3× faster line placement' },
      { code: 'L2', name: 'Upper Tacky PDMS + 72 wt% Spherical Alumina', spec: '40 Shore 00 micro-void wetting onto machined aluminum cold plates' },
      { code: 'L3', name: 'Central Woven E-Glass Fiberglass Scrim', spec: 'Zero stretching, zero tearing, and anti-puncture burr protection' },
      { code: 'L4', name: 'Lower Passivated Anti-Bleed Thermal Matrix', spec: 'Zero oil separation across 1,000 hours at 50°C–150°C cycling' },
      { code: 'L5', name: '0.075 mm Differential-Release Bottom PET Carrier', spec: 'Kiss-cut array compatible for automated or manual assembly' },
    ],
    applications: [
      'EV Battery Module Bottom Cell-to-Liquid-Cold-Plate Heat Draining',
      'BMS Shunt Resistors, D2PAK MOSFET Arrays & Onboard Chargers (OBC)',
      'Solar String Inverters, Telecom Rectifiers & Industrial Motor Drives',
      'Rapid Gap-Deflection R&D Benchmarking (0.5 mm to 3.0 mm Stackups)',
    ],
    standards: ['ASTM D5470-17', 'ASTM D2240 (40 Shore 00)', 'ASTM D149 (>10 kV/mm)', 'UL 94 V-0'],
  },
  {
    id: 'insultherm-ultra',
    subBrandCode: 'HYPERFLUX™ SERIES',
    division: 'Defense & Compute',
    name: 'InsulTherm Ultra',
    trademarkName: 'InsulTherm Ultra™',
    shortTagline: '5.5 W/m·K Bimodal Alumina + Aligned h-BN High-Flux TIM',
    category: 'High-Flux Hybrid TIM',
    badgeColor: 'bg-[#047857] text-white border-[#047857]',
    accentHex: '#047857',
    revenueShareMix: '12% Portfolio Revenue Share',
    grossMarginTarget: '64–72% Gross Margin',
    heroImage: '/assets/products/insultherm-ultra.jpg',
    tdsUrl: '/tds/insultherm-ultra-tds.pdf',
    thermalConductivity: '5.5 W/m·K Hybrid Ceramic Matrix',
    thermalConductivitySort: 5.5,
    thermalImpedance: '< 0.15 K·cm²/W @ 0.5 mm, 30 psi',
    dielectricStrength: '> 12 kV/mm (ASTM D149)',
    dielectricSort: 12,
    operatingTemp: '-55°C to +200°C (550) / +150°C (Ultra-NS)',
    maxTempSort: 200,
    flammability: 'UL 94 V-0 | Siloxane-Free Option',
    hardnessOrDensity: '35 Shore 00 Low Die-Stress Compliance',
    thicknessRange: '0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.0,
    protoPriceLabel: '₹140 / 100 cm² custom pad (₹1.40/cm²)',
    volumePriceLabel: '₹0.95 / cm² nested (₹95 / 100 cm²)',
    referencePriceNote: 'Reference 100×100 mm (100 cm²) pad = ₹140 proto (min ₹50 for discrete TO-247/optical pads) & ₹95 volume (₹0.95/cm² nested).',
    moqLabel: '1 Custom Pad / SiC Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Ultra-550 (5.5 W/m·K AI/SiC Grade)', 'Ultra-NS (100% Siloxane-Free Optical Grade)'],
    summary:
      'High-heat-flux 5.5 W/m·K hybrid ceramic interface pad combining 82 wt% bimodal spherical Al2O3 with platelet-aligned hexagonal Boron Nitride (h-BN) for >30 W/cm² SiC traction inverters and AI server cold plates—including a 100% siloxane-free Ultra-NS variant.',
    problemSolved:
      'Delivers <0.15 K·cm²/W thermal impedance at 35 Shore 00 low mounting pressure (<30 psi) so bare GPU/ASIC dies and ceramic DCB substrates never crack.',
    layers: [
      { code: 'L1', name: 'Diamond-Embossed Air-Bleed Top Release Liner', spec: 'Micro-channels purge trapped air pockets during cold-plate clamping' },
      { code: 'L2', name: '82 wt% Bimodal Al2O3 + Aligned h-BN Hybrid Core', spec: '5.5 W/m·K percolation network with 35 Shore 00 low-modulus compliance' },
      { code: 'L3', name: 'Optional Ultra-NS Non-Silicone Elastomer Matrix', spec: '0.00% siloxane volatiles (D3–D10 undetected) for optical & laser housings' },
      { code: 'L4', name: 'Ultra-Fine Micro-Glass Carrier & Kiss-Cut Base', spec: 'Precision CNC cutouts around heatsink standoffs and spring screws' },
    ],
    applications: [
      'AI Server GPU / ASIC Liquid Cold Plates & VRM Power Stages',
      '800V EV Silicon Carbide (SiC) Traction Inverters & DC-DC Converters',
      'RDSO Railway IGBT Modules, Wind/Solar Megawatt Central Inverters',
      '800G Optical Transceivers & Surgical/Medical Laser Diode Blocks (Ultra-NS)',
    ],
    standards: ['ASTM D5470 (<0.15 K·cm²/W)', 'GC-MS Zero-Siloxane (Ultra-NS)', 'ASTM D2240 (35 Shore 00)', 'UL 94 V-0'],
  },
];

export const RND_KITS: KitBundle[] = [
  {
    id: 'kit-ais156',
    sku: 'KIT-AIS156-PRO',
    name: 'AIS-156 / UL 9540A Battery Pack Thermal & Fire Homologation Kit',
    sector: 'EV Battery & Utility BESS R&D',
    priceInr: 14500,
    priceLabel: '₹14,500',
    starterPriceInr: 3499,
    starterLabel: '₹3,499 Mini Cell-Test Pack',
    leadTime: '48-Hour Custom Dispatch',
    contents: [
      'Custom CNC-cut InsulTherm Core™ bottom cold-plate pads (1.5 mm & 2.0 mm)',
      'Matched InsulTherm Barrier™ 1.50 mm aerogel-mica inter-cell runaway firewalls',
      '3D crease-scored InsulTherm Shield™ living-hinge top busbar collector shroud',
      'Signed ASTM D5470, D149 & UL 94 V-0 engineering certificate dossier',
    ],
    procurementAdvantage: 'Priced < ₹15,000 so Lead Battery Engineers can order directly via R&D petty cash / UPI without a 60-day vendor onboarding freeze.',
  },
  {
    id: 'kit-benchtop',
    sku: 'KIT-BENCH-5IP',
    name: 'All-5-IP Engineering Benchtop Master Sampler Box',
    sector: 'Hardware R&D Labs & Incubators',
    priceInr: 9800,
    priceLabel: '₹9,800',
    starterPriceInr: 1499,
    starterLabel: '₹1,499 Swatch Folio',
    leadTime: '24-Hour In-Stock Dispatch',
    contents: [
      'Multi-thickness indexed sheets of Core™ (0.5, 1.0, 1.5, 2.0, 3.0 mm) & Ultra™ (0.5, 1.0, 1.5 mm)',
      '2× Barrier™ 1,100°C aerogel-mica test coupons + 2× Graphite-Flex™ edge-sealed strips',
      '3× Shield™ living-hinge dielectric origami demo blanks (0.25, 0.43, 0.50 mm)',
      'Shore 00 compression deflection guide & printed 2-page TDS binder',
    ],
    procurementAdvantage: 'Eliminates blind thickness guessing during prototype tolerance stack-up signoff.',
  },
  {
    id: 'kit-defense-space',
    sku: 'KIT-DEF-E595',
    name: 'Defense, Avionics & SpaceTech Zero-Outgassing Qualification Kit',
    sector: 'Defense PSUs, UAVs & LEO Satellites',
    priceInr: 12500,
    priceLabel: '₹12,500',
    leadTime: '48-Hour Clean-Pouch Dispatch',
    contents: [
      'Custom CNC-nested InsulTherm Graphite-Flex™ (GFlex-1000 & GFlex-1500) Kapton®-sealed planes',
      '100% siloxane-free InsulTherm Ultra-NS™ hybrid ceramic pads for optical/RF modules',
      'Shield-NMX™ high-temperature aramid dielectric isolation barriers',
      'ASTM E595 outgassing & 100% Domestic Value Addition (DVA) traceability declaration',
    ],
    procurementAdvantage: '100% Make-in-India sovereign supply compliant with MoD < ₹200 Cr domestic tender norms.',
  },
  {
    id: 'kit-sic-inverter',
    sku: 'KIT-SIC-RAIL',
    name: 'Power Electronics, Rail & SiC Inverter Thermal-Dielectric Kit',
    sector: 'Solar, Rail IGBT & EV Traction',
    priceInr: 7500,
    priceLabel: '₹7,500',
    starterPriceInr: 999,
    starterLabel: '₹999 25-pc TO-247 Pack',
    leadTime: '24-Hour Dispatch',
    contents: [
      'Pre-cut TO-247, TO-220, D2PAK & EconoDUAL™ IGBT baseplate pads in Ultra™ 5.5 W/m·K',
      '20× Standard 50 × 50 mm Core™ BMS/MOSFET conduction pads',
      'Matched Shield™ high-voltage creepage barriers & slot liners',
      'Clamping torque vs. thermal impedance (K·cm²/W) application note',
    ],
    procurementAdvantage: 'Drop-in domestic replacement for imported Bergquist® Sil-Pad® and Laird™ Tflex™ SKUs.',
  },
];

// 3M-inspired Prosumer / Repair Lab / Workstation / University EV Line
// Grounded 100% in existing Sanand CNC oscillating-knife & nesting offcut capabilities!
export const PRO_BENCH_PACKS: ProBenchPack[] = [
  {
    id: 'bench-nvme-pro',
    sku: 'TFX-NVME-08',
    brandLine: 'ThermaFix™ Pro-Bench',
    name: 'M.2 NVMe Gen4/Gen5 SSD & Workstation Heatsink Strip Pack',
    audience: 'PC/Server Builders, AI Workstations & Repair Labs',
    priceInr: 499,
    packCountLabel: '8 Pre-Cut Strips (22×70 mm)',
    materialBase: 'InsulTherm Ultra™ (5.5 W/m·K) + Core™ (3.0 W/m·K)',
    specs: '4× 0.5 mm + 4× 1.0 mm | 35 Shore 00 Low Controller Stress',
    includes: [
      '4× Ultra-550 (5.5 W/m·K) strips for Gen5 SSD controllers (-14°C throttle drop)',
      '4× Core-300 (3.0 W/m·K) anti-bleed strips for NAND flash & laptop heatpipes',
      'Zero silicone oil bleed onto motherboard PCIe slots',
    ],
    badge: 'Off-the-Shelf Direct Buy',
  },
  {
    id: 'bench-gpu-vram',
    sku: 'TFX-VRAM-12',
    brandLine: 'ThermaFix™ Pro-Bench',
    name: 'GPU VRAM, VRM & Console Thermal Rebuild Master Sheet Pack',
    audience: 'Electronics Service Centers & GPU Refurbishers',
    priceInr: 899,
    packCountLabel: '3 Indexed Sheets (120×20 mm × 1.0 / 1.5 / 2.0 mm)',
    materialBase: 'InsulTherm Ultra™ 5.5 W/m·K Soft-Conformable',
    specs: '35 Shore 00 | >12 kV/mm | Scrim Tear-Free Repositioning',
    includes: [
      'Covers 1.0 mm, 1.5 mm & 2.0 mm GDDR6X / VRM choke heights in one pack',
      'Embedded micro-scrim prevents tearing when opening heatsinks for servicing',
      'Industrial lab formulation vs. dry generic retail thermal pads',
    ],
    badge: 'Bestseller for Repair Labs',
  },
  {
    id: 'bench-drone-fpv',
    sku: 'TFX-DRONE-06',
    brandLine: 'FluxPlane™ Maker Edition',
    name: 'UAV / FPV Drone ESC, VTX & Raspberry Pi5 Spreader Pack',
    audience: 'Robotics Labs, Drone Teams & Embedded Makers',
    priceInr: 1199,
    packCountLabel: '6 Edge-Sealed Strips (30×35 mm & 25×60 mm)',
    materialBase: 'InsulTherm Graphite-Flex™ (1,000 W/m·K) Kapton®-Capped',
    specs: '0.24 mm Thin | >5 kV Top Cap | 76% Lighter than Copper Heatsinks',
    includes: [
      'Spreads 4-in-1 ESC & HD digital VTX heat without adding gram-weight penalty',
      'Amber Kapton® dielectric top cap prevents carbon-fiber frame shorts',
      'Peel-and-stick ASTM E595 high-temp acrylic PSA',
    ],
    badge: 'Zero-Weight Cooling',
  },
  {
    id: 'bench-hv-insul',
    sku: 'INS-HV-ASSORT',
    brandLine: 'InsulTape™ & Origami Bench',
    name: 'EV / Inverter Repair Dielectric Washer, Ring & Fold-Strip Kit',
    audience: 'EV Battery Rebuilders, Solar Techs & Formula Student Teams',
    priceInr: 649,
    packCountLabel: '60-Piece Precision CNC Assortment',
    materialBase: 'InsulTherm Shield™ (0.43 mm UL 94 V-0) + Core-BMS',
    specs: '28 kV/mm Breakdown | Includes 10× 50×50mm BMS Pads',
    includes: [
      '30× TO-247 / TO-220 dielectric shoulder pads + 20× 21700 cell HV terminal rings',
      '10× Pre-scored Shield™ living-hinge busbar corner fold guards',
      'Bonus: 5× Core-BMS 50×50 mm MOSFET conduction pads',
    ],
    badge: 'EV & Inverter Essential',
  },
];

export const VALIDATION_PLATES: ValidationPlate[] = [
  {
    id: 'val-fea-runaway',
    category: 'FEA Simulation',
    title: '4-Quadrant Thermal Runaway Containment Simulation (400°C Fault Event)',
    subtitle: 'Full Uncropped ANSYS/Fusion Thermal Solver Output — Q1 Fault Cell vs. Q2/Q3/Q4 Neighbors',
    src: '/assets/validation/fea-runaway-400c.png',
    dimensions: '1669 × 873 px (Full HD Solver Plate)',
    badge: '74.189°C Neighbor Cell Hold',
    metrics: [
      { label: 'Q1 Fault Cell Peak', value: '400.0 °C' },
      { label: 'Neighbor Cell Min/Edge', value: '74.189 °C' },
      { label: 'Safety Threshold', value: '< 100 °C PASS' },
    ],
    description:
      'Full 4-quadrant coupled conduction simulation showing a catastrophic 400°C cell runaway in Quadrant 1 arrested across a 1.50 mm InsulTherm Barrier™ aerogel-mica wall while the bottom InsulTherm Core™ pad drains residual heat into the cold plate—holding adjacent cells down to 74.189°C.',
  },
  {
    id: 'val-fea-continuous',
    category: 'FEA Simulation',
    title: '4-Quadrant Continuous High-Discharge Thermal Load (180°C Hot Cell)',
    subtitle: 'Steady-State Coupled Barrier™ Isolation + Core™ Bottom Cold-Plate Heat Rejection',
    src: '/assets/validation/fea-continuous-load.png',
    dimensions: '1683 × 793 px (Full HD Solver Plate)',
    badge: '91.3°C Peak Adjacent Hold',
    metrics: [
      { label: 'Hot Cell Source', value: '180.0 °C' },
      { label: 'Adjacent Cell Peak', value: '91.3 °C' },
      { label: 'Barrier Wall Thickness', value: '1.50 mm' },
    ],
    description:
      'Demonstrates continuous abuse-discharge operation where sustained 180°C thermal stress in one cell quadrant is simultaneously blocked laterally by Barrier™ (k = 0.018 W/m·K) and extracted vertically through Core™ (k = 3.0 W/m·K).',
  },
  {
    id: 'val-fea-matrix',
    category: 'FEA Simulation',
    title: 'Q1–Q4 Multi-Cell Coupled Thermal Boundary Condition Matrix',
    subtitle: 'Quadrant-by-Quadrant Heat Flux & Dielectric/Thermal Interface Mapping',
    src: '/assets/validation/fea-boundary-matrix.png',
    dimensions: '1161 × 895 px (Full Engineering Diagram)',
    badge: '4-Cell Coupled Model',
    metrics: [
      { label: 'Horizontal Axis', value: 'Barrier™ k=0.018' },
      { label: 'Vertical Sink Axis', value: 'Core™ k=3.0' },
      { label: 'Top Collector', value: 'Shield™ >28 kV/mm' },
    ],
    description:
      'Complete quadrant boundary layout illustrating directional thermal anisotropy inside a 4-cell module: blocking lateral cell-to-cell heat transfer while maximizing downward heat conduction into the liquid cooling plate.',
  },
  {
    id: 'val-cutaway-studio',
    category: 'Physical Hardware',
    title: 'Integrated Prismatic Module Hardware Cutaway (Tri-Material Stack)',
    subtitle: 'Physical Demonstration Assembly: Core™ Base + Barrier™ Cell Dividers + Shield™ Busbar Cover',
    src: '/assets/validation/pack-cutaway-studio.jpg',
    dimensions: '1408 × 768 px (Studio Hardware Cutaway)',
    badge: 'Tri-Hazard Integration',
    metrics: [
      { label: 'Top Shroud', value: 'Shield™ 0.43 mm' },
      { label: 'Inter-Cell Sheets', value: 'Barrier™ 1.50 mm' },
      { label: 'Cold-Plate Pad', value: 'Core™ 1.5–2.0 mm' },
    ],
    description:
      'Cross-sectional view of an aluminum liquid-cooled prismatic battery module showing how all three InsulTherm Energy-series materials assemble with zero custom injection-molding or steel-die tooling.',
  },
  {
    id: 'val-cad-exploded',
    category: 'CAD Architecture',
    title: 'Exploded 4-Cell Module CAD Stackup (Autodesk Fusion Assembly)',
    subtitle: 'Full Uncropped Exploded Isometric View — Cold Plate, Core™ Pad, Cells, Barrier™ Walls & Busbars',
    src: '/assets/validation/cad-exploded-pack.png',
    dimensions: '625 × 636 px (1:1 Full CAD Plate)',
    badge: '.STEP / .DXF Ready',
    metrics: [
      { label: 'CNC Nesting Input', value: '.DXF / .STEP' },
      { label: 'Tooling NRE', value: '₹0' },
      { label: 'Cut Tolerance', value: '±0.15 mm' },
    ],
    description:
      'Uncropped exploded 3D CAD assembly used directly by our CAM nesting pipeline to extract 2D flat patterns for the bottom Core™ thermal pad, vertical Barrier™ sheets, and folded Shield™ top busbar cover.',
  },
  {
    id: 'val-cad-assembled',
    category: 'CAD Architecture',
    title: 'Assembled Isometric Busbar, Terminal & Inter-Cell Firewall CAD',
    subtitle: 'Compact 4S Prismatic Pack Geometry Showing Zero Volumetric Bloat',
    src: '/assets/validation/cad-assembled-pack.png',
    dimensions: '748 × 673 px (Full Isometric CAD)',
    badge: 'Zero Pack Bloat',
    metrics: [
      { label: 'Inter-Cell Pitch', value: '1.50 mm Wall' },
      { label: 'Busbar Isolation', value: '1,500V DC Rated' },
      { label: 'Turnaround', value: '24–48 Hours' },
    ],
    description:
      'Assembled CAD verification confirming busbar bolt clearance, inter-cell compression allowance (25–35%), and top collector creepage protection.',
  },
  {
    id: 'val-cad-top',
    category: 'CAD Architecture',
    title: 'Top-Down Busbar Collector & Firewall Slot Alignment CAD',
    subtitle: 'Plan-View Datum Verification for CNC Bolt-Hole & Living-Hinge Registration',
    src: '/assets/validation/cad-top-busbar.png',
    dimensions: '637 × 663 px (Plan View CAD)',
    badge: '±0.15mm Datum Fit',
    metrics: [
      { label: 'Hole Registration', value: '±0.15 mm' },
      { label: 'Crease Depth', value: '50% ± 0.05 mm' },
      { label: 'MOQ', value: '1 Piece' },
    ],
    description:
      'Top-view engineering alignment plate verifying copper interconnect geometry against inter-cell firewall tabs and dielectric shroud fold lines.',
  },
  {
    id: 'val-ruler-kit',
    category: 'Physical Hardware',
    title: 'Millimeter-Scale Benchtop Inspection (0–30 cm Calibrated Steel Rule)',
    subtitle: 'Physical Coupons of Core™ (Orange), Barrier™ (White) & Shield™ (Folded Black)',
    src: '/assets/products/tri-hazard-kit.jpg',
    dimensions: '1300 × 1027 px (Benchtop Inspection)',
    badge: 'Physical QC Sample',
    metrics: [
      { label: 'Edge Quality', value: 'Zero-Fray Clean Cut' },
      { label: 'Fold Angle', value: 'Crisp 90° Living Hinge' },
      { label: 'Dispatch SLA', value: '24–48 Hours' },
    ],
    description:
      'Unretouched benchtop scale photograph demonstrating crisp CNC oscillating-knife edge quality across soft elastomer, fibrous aerogel-mica, and scored flame-retardant polymer.',
  },
];

export const APPLICATION_CHALLENGES: ApplicationChallenge[] = [
  {
    id: 'chal-runaway',
    problemTitle: 'Stop Cell-to-Cell Thermal Runaway (AIS-156 / UL 9540A)',
    sectorTag: 'EV Packs & Grid BESS',
    symptom: 'Adjacent prismatic or 21700 cells exceed 100°C during single-cell nail-penetration or overcharge testing.',
    recommendedProductId: 'insultherm-barrier',
    recommendedCompanionId: 'insultherm-core',
    whyItWorks:
      '1.50 mm Barrier™ (k = 0.018 W/m·K + >1,100°C mica shield) blocks lateral flame/heat while Core™ (3.0 W/m·K) drains heat into the bottom cold plate—holding neighbor cells to 74.2°C.',
    suggestedFootprint: { lengthMm: 148, widthMm: 95, qty: 24 },
  },
  {
    id: 'chal-busbar',
    problemTitle: 'Insulate 800V–1,500V Copper Busbars Without Mold Tooling',
    sectorTag: 'BESS, EV & Switchgear',
    symptom: 'Injection-molded plastic covers cost ₹6L+ and take 8 weeks every time busbar geometry shifts by 2 mm.',
    recommendedProductId: 'insultherm-shield',
    whyItWorks:
      '50%-depth CNC crease-scored Shield™ ships flat in 48 hours with ₹0 NRE and folds by hand into a rigid >28 kV/mm UL 94 V-0 snap-fit 3D shroud.',
    suggestedFootprint: { lengthMm: 180, widthMm: 110, qty: 15 },
  },
  {
    id: 'chal-hotspot',
    problemTitle: 'Eliminate Sealed PCB / Radar / Optical Hotspots with Zero Weight or Outgassing',
    sectorTag: 'Defense, Space & 800G',
    symptom: 'No vertical room for a finned heatsink, copper shims are too heavy, and silicone pads fog sensitive optics.',
    recommendedProductId: 'insultherm-graphite-flex',
    recommendedCompanionId: 'insultherm-ultra',
    whyItWorks:
      'Edge-sealed Kapton®-capped Graphite-Flex™ spreads heat laterally at 1,000–1,500 W/m·K (3.7× copper at 24% weight) with ASTM E595 silicone-free PSA.',
    suggestedFootprint: { lengthMm: 60, widthMm: 40, qty: 10 },
  },
  {
    id: 'chal-highflux',
    problemTitle: 'Cool High-Flux SiC Inverters or AI GPUs Without Cracking Bare Dies',
    sectorTag: 'AI Servers, Rail & SiC',
    symptom: 'Standard 3 W/m·K pads bottleneck >30 W/cm² power density, while stiff 6+ W/m·K pads over-stress PCBs.',
    recommendedProductId: 'insultherm-ultra',
    whyItWorks:
      '82 wt% bimodal Al2O3 + aligned h-BN achieves 5.5 W/m·K and <0.15 K·cm²/W at an ultra-soft 35 Shore 00 hardness (plus siloxane-free Ultra-NS option).',
    suggestedFootprint: { lengthMm: 80, widthMm: 60, qty: 20 },
  },
];

export const SECTORS = [
  {
    title: 'Grid-Scale BESS & Utility Solar',
    standards: 'UL 9540A • IEC 62619 • 1,500V DC',
    products: ['InsulTherm Barrier™', 'InsulTherm Shield™', 'InsulTherm Core™'],
    painSolved:
      'Prevents cascading 280Ah/314Ah LFP container fires and eliminates ₹8L injection-molded busbar shroud tooling across custom integrator layouts.',
  },
  {
    title: 'EV Battery Packs, OBC & SiC Traction',
    standards: 'AIS-156 Amend. 3 • ISO 6469 • UL 94 V-0',
    products: ['InsulTherm Core™', 'InsulTherm Barrier™', 'InsulTherm Ultra™'],
    painSolved:
      '48-hour CNC custom pads and aerogel-mica cell dividers let EV teams pass ARAI thermal propagation homologation without 8-week die delays.',
  },
  {
    title: 'Defense PSUs, UAVs & LEO SpaceTech',
    standards: 'ASTM E595 • MIL-STD-810H • 100% India DVA',
    products: ['InsulTherm Graphite-Flex™', 'InsulTherm Ultra-NS™', 'Shield-NMX™'],
    painSolved:
      'Zero-outgassing, silicone-free 1,500 W/m·K lateral heat planes with sovereign Make-in-India traceability for radar T/R modules and optical payloads.',
  },
  {
    title: 'AI Data Centers, Rail IGBT & Pro-Bench Labs',
    standards: '<0.15 K·cm²/W • Siloxane-Free • 35 Shore 00',
    products: ['InsulTherm Ultra™', 'ThermaFix™ Pro-Bench', 'InsulTherm Shield™'],
    painSolved:
      'Ultra-low contact resistance for liquid-cooled GPU plates and 800G transceivers—plus ready-to-ship Pro-Bench strip packs for workstation & repair labs.',
  },
];
