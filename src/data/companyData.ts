import { ProductSlugId } from '../utils/pricingEngine';

export interface ProductLayer {
  code: string;
  name: string;
  spec: string;
}

export interface ProductSpec {
  id: ProductSlugId;
  familyGroup: 'Thermal Interface & Heat Spreading' | 'Runaway Fire & Dielectric Protection';
  name: string;
  trademarkName: string;
  shortTagline: string;
  category:
    | 'Dielectric Origami'
    | 'Fire Barrier'
    | 'Anisotropic Spreader'
    | 'Thermal Gap Pad'
    | 'High-Flux Hybrid TIM';
  heroImage: string;
  installedImage: string;
  installedCaption: string;
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
  pilotPriceLabel: string;
  volumePriceLabel: string;
  referencePriceNote: string;
  moqLabel: string;
  leadTime: string;
  outgassingCompliant: boolean;
  siliconeFreeAvailable: boolean;
  keyGrades: string[];
  summary: string;
  oneLineSummary: string;
  layers: ProductLayer[];
  applications: string[];
  standards: string[];
}

export interface KitBundle {
  id: string;
  sku: string;
  name: string;
  sector: string;
  audienceTag: 'B2B R&D Lab' | 'Prototyping & B2C Friendly';
  priceInr: number;
  priceLabel: string;
  starterSku?: string;
  starterPriceInr?: number;
  starterLabel?: string;
  starterSummary?: string;
  leadTime: string;
  image: string;
  contents: string[];
  procurementAdvantage: string;
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

export interface MarketVertical {
  id: string;
  name: string;
  standards: string;
  headline: string;
  description: string;
  image: string;
  imageLabel: string;
  recommendedProducts: ProductSlugId[];
  keyOutcome: string;
}

export const COMPANY_INFO = {
  name: 'InsulTherm Innovations',
  legalDescriptor: 'Advanced Thermal, Fire-Barrier & Dielectric Materials',
  tagline: 'Zero-Tooling Custom Thermal & Dielectric Converting in 24–48 Hours',
  phoneMasked: '+91 78148 XXXXX',
  officialEmail: 'manav.sb@inslthrm.in',
  routingEmail: 'manavsb9719@gmail.com',
  formSubmitEndpoint: 'https://formsubmit.co/ajax/manavsb9719@gmail.com',
  addressLines: [
    'InsulTherm Innovations — Advanced Materials & Digital Converting Wing',
    'Block C-14, Sanand GIDC Industrial Estate (Near iCreate Campus)',
    'Ahmedabad, Gujarat – 382110, India',
  ],
  shortAddress: 'Sanand GIDC, Ahmedabad, Gujarat – 382110',
  coordinates: '22.9916° N, 72.3814° E',
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=72.3350%2C22.9650%2C72.4350%2C23.0250&layer=mapnik&marker=22.9916%2C72.3814',
  founders: [
    {
      name: 'Manav',
      role: 'Founder — Commercial Strategy & OEM Accounts',
      focus:
        'Leads BESS, industrial power, defense, and EV R&D qualification programs, transparent area-pricing schedules, and direct procurement.',
      email: 'manav.sb@inslthrm.in',
    },
    {
      name: 'Nikhil',
      role: 'Founder — Materials Formulation & Thermal Validation',
      focus:
        'Leads composite TIM architecture, ASTM D5470 / D149 characterization, and 4-quadrant thermal runaway FEA modeling.',
      email: '',
    },
    {
      name: 'Sukhmeet',
      role: 'Founder — Digital CNC Converting & Operations',
      focus:
        'Directs zero-tooling oscillating-knife CNC cells, 50%-depth living-hinge scoring accuracy, and 24–48h dispatch.',
      email: '',
    },
  ],
};

export const PORTFOLIOS = [
  {
    id: 'portfolio-thermal',
    title: 'Thermal Interface & Heat Spreading',
    subtitle: 'Core™ • Ultra™ • Graphite-Flex™',
    description:
      'From 3.0 W/m·K tropical anti-bleed gap pads and 5.5 W/m·K low-stress hybrid ceramic TIMs to 1,500 W/m·K zero-outgassing pyrolytic graphite lateral spreaders.',
    link: '/products?group=thermal',
    metric: '3.0 to 1,500 W/m·K',
  },
  {
    id: 'portfolio-protection',
    title: 'Runaway Fire & Dielectric Protection',
    subtitle: 'Barrier™ • Shield™',
    description:
      '1.50 mm nanoporous aerogel-mica inter-cell firewalls (>1,100°C hold) paired with 3D living-hinge dielectric busbar sleeves (>28 kV/mm) that snap-fold by hand.',
    link: '/products?group=protection',
    metric: '>1,100°C & 28–32 kV/mm',
  },
  {
    id: 'portfolio-converting',
    title: 'Zero-Tooling CNC & Prototyping Kits',
    subtitle: '24–48h Custom CAD • <₹15k Kits',
    description:
      'Upload .DXF or .STEP geometry for custom parts with ₹0 steel-die NRE across 3 transparent volume tiers, or order turnkey R&D kits and starter packs from ₹999.',
    link: '/quote',
    metric: '₹0 NRE • MOQ 1 Pc',
  },
];

export const PRODUCTS: ProductSpec[] = [
  {
    id: 'insultherm-shield',
    familyGroup: 'Runaway Fire & Dielectric Protection',
    name: 'InsulTherm Shield',
    trademarkName: 'InsulTherm Shield™',
    shortTagline: '3D Dielectric Origami & Living-Hinge Busbar Sleeves',
    category: 'Dielectric Origami',
    heroImage: '/assets/products/insultherm-shield.jpg',
    installedImage: '/assets/applications/inverter-shield-busbar-installed.jpg',
    installedCaption:
      'Installed View: 50%-depth crease-scored Shield™ 3D sleeve snap-locked around 1,500V DC copper busbars inside an industrial inverter cabinet.',
    secondaryImage: '/assets/validation/cad-assembled-pack.png',
    tdsUrl: '/tds/insultherm-shield-tds.pdf',
    thermalConductivity: '0.16 – 0.22 W/m·K (Insulator)',
    thermalConductivitySort: 0.2,
    thermalImpedance: 'High-Voltage Arc & Creepage Barrier',
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
    protoPriceLabel: '₹45 / pc (100 cm² ref)',
    pilotPriceLabel: '₹35 / pc (100–499 pcs)',
    volumePriceLabel: '₹30 / pc (500+ Blanket)',
    referencePriceNote:
      'Standardized 100×100 mm (100 cm²) 3D busbar sleeve: ₹45.00 Prototype (1–99 pcs, ₹0 die NRE) → ₹35.00 Pilot (100–499 pcs) → ₹30.00 OEM Blanket (500+ pcs). Up to 50% lower than ₹90–₹200 prototype imports.',
    moqLabel: '1 Piece (₹0 Tooling NRE)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Shield-FGK-043 (Formex™ GK-17 Equiv.)', 'Shield-NMX-050 (Nomex® 410 Duplex)'],
    oneLineSummary:
      'CNC-cut and 50%-depth crease-scored UL 94 V-0 dielectric sheets that ship flat and fold in 5 seconds around copper busbars—eliminating ₹25k–₹60k plastic molds.',
    summary:
      'Precision CNC-cut and 50%-depth crease-scored flame-retardant polypropylene and aramid dielectric sheets that ship flat and snap-fold by hand into rigid 3D enclosures around 800V–1,500V DC copper busbars—eliminating ₹25,000–₹60,000 injection molds and 4–6 week tooling waits.',
    layers: [
      { code: 'L1', name: 'UL 94 V-0 Dielectric Polymer / Aramid Core', spec: '28–32 kV/mm breakdown, non-hygroscopic (<0.8% H2O)' },
      { code: 'L2', name: '50%-Depth Precision CNC Crease Channel', spec: '±0.05 mm Z-axis depth control for crack-free 90°/180° living hinges' },
      { code: 'L3', name: 'Interlocking Tab-and-Slot Retention Geometry', spec: 'Adhesive-free 5-second mechanical snap lock over copper busbars' },
      { code: 'L4', name: 'Optional Zone-Applied UL 94 V-0 Acrylic PSA', spec: 'Kiss-cut peel tab for rapid chassis wall anchoring' },
    ],
    applications: [
      '1,500V DC Grid-Scale BESS & Solar String Inverter Busbar Sleeves',
      'Railway Traction Converters & Industrial Variable Frequency Drives (VFDs)',
      'AIS-156 EV Battery Pack Top Collector & BDU Arc-Flash Shrouds',
      'Server PSU & Industrial UPS High-Voltage Creepage Dividers',
    ],
    standards: ['ASTM D149 (>28 kV/mm)', 'UL 94 V-0', 'IEC 60664-1 Creepage', 'RoHS 3 / REACH'],
  },
  {
    id: 'insultherm-barrier',
    familyGroup: 'Runaway Fire & Dielectric Protection',
    name: 'InsulTherm Barrier',
    trademarkName: 'InsulTherm Barrier™',
    shortTagline: '1,100°C Aerogel-Mica Cell-to-Cell Runaway Firewall',
    category: 'Fire Barrier',
    heroImage: '/assets/products/insultherm-barrier.jpg',
    installedImage: '/assets/applications/bess-barrier-lfp-installed.jpg',
    installedCaption:
      'Installed View: 1.50 mm Barrier™ phlogopite mica + silica aerogel firewalls sandwiched vertically between 280Ah prismatic LFP cells.',
    secondaryImage: '/assets/validation/fea-runaway-400c.png',
    tdsUrl: '/tds/insultherm-barrier-tds.pdf',
    thermalConductivity: '0.018 – 0.022 W/m·K @ 25°C',
    thermalConductivitySort: 0.018,
    thermalImpedance: '74.189°C Neighbor Hold @ 400°C Fault',
    dielectricStrength: '> 15 kV/mm (>22.5 kV @ 1.5 mm)',
    dielectricSort: 15,
    operatingTemp: '-60°C to +1,100°C (>5 min Torch Hold)',
    maxTempSort: 1100,
    flammability: 'UL 94 V-0 Grade | Supports AIS-156 & UL 9540A Pack Designs',
    hardnessOrDensity: '25–35% Compressible Cell-Breathing Core',
    thicknessRange: '1.50 mm (Std), 1.65 mm (Kapton HV), 2.00 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹110 / sheet (100 cm² ref)',
    pilotPriceLabel: '₹95 / sheet (100–499 pcs)',
    volumePriceLabel: '₹85 / sheet (500+ Blanket)',
    referencePriceNote:
      'Standardized 100×100 mm (100 cm²) cell firewall sheet: ₹110.00 Prototype (1–99 pcs) → ₹95.00 Pilot (100–499 pcs) → ₹85.00 OEM Blanket (500+ pcs). ~50% lower than ₹220–₹480 imported aerogel sheets with 100% India DVA.',
    moqLabel: '1 Sheet / Pack Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: true,
    keyGrades: ['Barrier-MA1-150 (Mica + Aerogel + FR-PSA)', 'Barrier-MK2-165 (Dual-Mica + Kapton® Seal)'],
    oneLineSummary:
      'Dust-encapsulated 1.50 mm Phlogopite Mica + Silica Aerogel composite (k = 0.018 W/m·K) arresting 1,100°C cell-to-cell thermal runaway propagation.',
    summary:
      '4-layer composite inter-cell firewall cold-laminating particle-erosion-resistant Phlogopite Mica over nanoporous Silica Aerogel felt (k = 0.018 W/m·K) to seal shedding silica dust and stop >1,100°C cascading battery fires where liquid gap fillers cannot be dispensed.',
    layers: [
      { code: 'L1', name: '0.20 mm Calcined Phlogopite Mica Armor', spec: 'Withstands >1,100°C vent-gas particle jetting & >20 kV/mm stress' },
      { code: 'L2', name: '1.20 mm Nanoporous Silica Aerogel Felt', spec: 'k = 0.018 W/m·K ultra-insulation + 25–35% cell swelling absorption' },
      { code: 'L3', name: '0.10 mm UL 94 V-0 Flame-Retardant Acrylic PSA', spec: 'Peel-and-stick positioning directly onto prismatic or pouch cell cans' },
      { code: 'L4', name: '0.075 mm Moisture-Barrier PET Release Liner', spec: 'Split-back kiss-cut liner with clean dust-consolidated CNC edge' },
    ],
    applications: [
      'Grid-Scale 20-ft BESS Containers (280Ah–314Ah LFP Inter-Cell Firewalls)',
      'AIS-156 Amend. 3 EV Battery Pack Propagation Barriers',
      'Module Lid Vent-Channel Blast Deflectors & Exhaust Shields',
      'Defense, Marine & Industrial Backup Storage Enclosures',
    ],
    standards: ['AIS-156 Amend. 3 Pack Support', 'UL 9540A Cell Firewall Design', 'ASTM C518', 'ASTM D149'],
  },
  {
    id: 'insultherm-graphite-flex',
    familyGroup: 'Thermal Interface & Heat Spreading',
    name: 'InsulTherm Graphite-Flex',
    trademarkName: 'InsulTherm Graphite-Flex™',
    shortTagline: '1,000–1,500 W/m·K Edge-Sealed Zero-Outgassing Spreader',
    category: 'Anisotropic Spreader',
    heroImage: '/assets/products/insultherm-graphite-flex.jpg',
    installedImage: '/assets/applications/drone-graphite-flex-installed.jpg',
    installedCaption:
      'Installed View: Edge-sealed Kapton®-capped Graphite-Flex™ spreader adhered over a UAV flight computer SoC and routed laterally to the milled aluminum chassis wall.',
    tdsUrl: '/tds/insultherm-graphite-flex-tds.pdf',
    thermalConductivity: '1,000 – 1,500 W/m·K (X-Y Plane)',
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
    protoPriceLabel: '₹350 (50×50) – ₹1,800 (150×150)',
    pilotPriceLabel: '₹310 – ₹1,650 (100–499 pcs)',
    volumePriceLabel: '₹280 – ₹1,500 (500+ Blanket)',
    referencePriceNote:
      'Std 50×50 mm (25 cm²) spreader: ₹350 Prototype → ₹310 Pilot → ₹280 OEM Blanket. Large 150×150 mm (225 cm²) defense/satellite plane: ₹1,800 Prototype → ₹1,650 Pilot → ₹1,500 OEM Blanket (43.8%–46.2% lower than imports).',
    moqLabel: '1 Piece (<₹200 Cr GTE Compliant)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['GFlex-1000 (1,000 W/m·K Defense/ECU)', 'GFlex-1500 (1,500 W/m·K Satellite/Radar)'],
    oneLineSummary:
      'Edge-sealed Kapton®-capped pyrolytic graphite plane (1,000–1,500 W/m·K) with ASTM E595 silicone-free PSA—eliminating hotspots in sealed UAV, radar, and optical boxes.',
    summary:
      '5-layer anisotropic lateral heat-spreading plane encapsulating dual oriented pyrolytic graphite cores beneath an oversize-sealed 0.025 mm Kapton® polyimide dielectric cap (>5 kV) and ASTM E595 silicone-free adhesive so conductive carbon flakes never short-circuit defense or satellite PCBs.',
    layers: [
      { code: 'L1', name: '0.025 mm Kapton® Polyimide Dielectric Top Cap', spec: '>5 kV isolation + 1.0–1.5 mm CNC edge-seal overhang prevents carbon flaking' },
      { code: 'L2', name: 'Dual Pyrolytic Graphite Core (1,000–1,500 W/m·K)', spec: 'Rapid lateral heat diffusion eliminating ≥18°C local SoC/FPGA hotspots' },
      { code: 'L3', name: '45 GSM Woven E-Glass Scrim Interleaf', spec: 'Neutral-axis tear reinforcement across 2.0 mm chassis routing bends' },
      { code: 'L4', name: '0.030 mm ASTM E595 Silicone-Free Acrylic PSA', spec: 'TML < 1.0%, CVCM < 0.10% — zero siloxane fogging on radar/camera optics' },
      { code: 'L5', name: '0.050 mm Kiss-Cut Clear PET Release Liner', spec: 'Cleanroom ESD pouch packaging option' },
    ],
    applications: [
      'Defense UAV Flight Computers, Phased-Array Radar T/R Modules & Seekers',
      'LEO Satellite Payloads & Optical Earth-Observation Camera Housings',
      'Sealed Automotive ADAS LiDAR/Camera ECUs & 5G/6G Small Cells',
      '800G / 1.6T Optical Transceiver Cold-Rail Heat Routing',
    ],
    standards: ['ASTM E595 (TML <1%, CVCM <0.1%)', 'MIL-STD-810H', 'ASTM D149 (>5 kV)', '100% India DVA'],
  },
  {
    id: 'insultherm-core',
    familyGroup: 'Thermal Interface & Heat Spreading',
    name: 'InsulTherm Core',
    trademarkName: 'InsulTherm Core™',
    shortTagline: '3.0 W/m·K Tropical Anti-Bleed Scrim-Reinforced Gap Pad',
    category: 'Thermal Gap Pad',
    heroImage: '/assets/products/insultherm-core.jpg',
    installedImage: '/assets/applications/ev-coldplate-core-installed.jpg',
    installedCaption:
      'Installed View: Scrim-reinforced Core™ gap pad with extended peel-tab laid across an EV liquid cold plate alongside 50×50 mm BMS MOSFET pads.',
    secondaryImage: '/assets/products/insultherm-core-diecut.jpg',
    tdsUrl: '/tds/insultherm-core-tds.pdf',
    thermalConductivity: '3.0 W/m·K Bulk Conductivity',
    thermalConductivitySort: 3.0,
    thermalImpedance: '0.22 – 0.28 K·cm²/W @ 1 mm, 20 psi',
    dielectricStrength: '> 10 kV/mm (Core-300) / > 14 kV/mm (350D)',
    dielectricSort: 14,
    operatingTemp: '-50°C to +200°C (50°C Anti-Bleed)',
    maxTempSort: 200,
    flammability: 'UL 94 V-0 Matrix Target',
    hardnessOrDensity: '40 Shore 00 Soft Conformable',
    thicknessRange: '0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹80 / pad | ₹20 std 50×50mm',
    pilotPriceLabel: '₹68 / pad | ₹18.50 BMS (100+)',
    volumePriceLabel: '₹61.20 / pad | ₹17.00 BMS (500+)',
    referencePriceNote:
      'Custom 100×100 mm (100 cm²) module pad: ₹80.00 Prototype → ₹68.00 Pilot (100–499 pcs) → ₹61.20 OEM Blanket (500+ pcs). Standard 50×50 mm BMS pad: ₹20.00 → ₹18.50 → ₹17.00.',
    moqLabel: '1 Custom Pad or 50×50mm Pack',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: false,
    keyGrades: ['Core-300 (3.0 W/m·K Anti-Bleed)', 'Core-BMS-50x50 (₹20→₹17 Std Pad)', 'Core-350D (>14 kV/mm HV Scrim)'],
    oneLineSummary:
      '3.0 W/m·K silane-passivated alumina gap pad with central E-Glass scrim—engineered for zero oil bleed across 50°C–150°C tropical duty cycles.',
    summary:
      '5-layer tropical-climate-engineered elastomer thermal interface gap pad formulated with 72 wt% silane-passivated spherical alumina and central woven E-Glass fiberglass mesh to prevent 50°C oil bleed and assembly stretching.',
    layers: [
      { code: 'L1', name: '0.050 mm Extended-Tab Top PET Release Liner', spec: 'Glove-friendly ergonomic peel tab for fast benchtop & line placement' },
      { code: 'L2', name: 'Upper Tacky PDMS + 72 wt% Spherical Alumina', spec: '40 Shore 00 micro-void wetting onto machined cold plates' },
      { code: 'L3', name: 'Central Woven E-Glass Fiberglass Scrim', spec: 'Prevents stretching, tearing, and cast-housing burr puncture' },
      { code: 'L4', name: 'Lower Passivated Anti-Bleed Thermal Matrix', spec: 'Zero oil separation across 1,000h at 50°C–150°C cycling' },
      { code: 'L5', name: '0.075 mm Differential-Release Bottom Carrier', spec: 'Kiss-cut sheet & rotary reel compatible' },
    ],
    applications: [
      'EV Battery Module Bottom Cell-to-Cold-Plate Heat Draining',
      'BMS Shunt Resistors, MOSFET Arrays (50×50 mm SKU) & Onboard Chargers',
      'Solar Inverters, Telecom Rectifiers & Industrial Motor Drives',
      'Rapid R&D Gap-Deflection Benchmarking (0.5–3.0 mm)',
    ],
    standards: ['ASTM D5470-17', 'ASTM D2240 (40 Shore 00)', 'ASTM D149 (>10 kV/mm)', 'UL 94 V-0'],
  },
  {
    id: 'insultherm-ultra',
    familyGroup: 'Thermal Interface & Heat Spreading',
    name: 'InsulTherm Ultra',
    trademarkName: 'InsulTherm Ultra™',
    shortTagline: '5.5 W/m·K Bimodal Alumina + Aligned h-BN High-Flux TIM',
    category: 'High-Flux Hybrid TIM',
    heroImage: '/assets/products/insultherm-ultra.jpg',
    installedImage: '/assets/applications/sic-coldplate-ultra-installed.jpg',
    installedCaption:
      'Installed View: Precision bolt-cut Ultra™ 5.5 W/m·K pad mounted on a machined aluminum liquid cold plate beneath an 800V SiC power module.',
    tdsUrl: '/tds/insultherm-ultra-tds.pdf',
    thermalConductivity: '5.5 W/m·K Hybrid Ceramic Matrix',
    thermalConductivitySort: 5.5,
    thermalImpedance: '< 0.15 K·cm²/W @ 0.5 mm, 20 psi',
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
    protoPriceLabel: '₹140 / pad (100 cm² ref)',
    pilotPriceLabel: '₹110 / pad (100–499 pcs)',
    volumePriceLabel: '₹95 / pad (500+ Blanket)',
    referencePriceNote:
      'Standardized 100×100 mm (100 cm²) high-flux pad: ₹140.00 Prototype (1–99 pcs) → ₹110.00 Pilot (100–499 pcs) → ₹95.00 OEM Blanket (500+ pcs). 50% lower than ₹280–₹650 prototype imports.',
    moqLabel: '1 Custom Pad / SiC Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Ultra-550 (5.5 W/m·K AI/SiC Grade)', 'Ultra-NS (100% Siloxane-Free Optical Grade)'],
    oneLineSummary:
      'Ultra-soft 35 Shore 00, 5.5 W/m·K hybrid Al2O3 + aligned Boron Nitride gap pad (<0.15 K·cm²/W) for 800V SiC inverters, AI cold plates, and optics.',
    summary:
      'High-heat-flux 5.5 W/m·K hybrid percolation pad combining 82 wt% bimodal spherical Al2O3 (2µm + 20µm) with aligned hexagonal Boron Nitride (h-BN) platelets for 800V SiC traction modules and 100kW+ AI server liquid cold plates—including a 100% siloxane-free Ultra-NS option.',
    layers: [
      { code: 'L1', name: 'Diamond-Embossed Air-Bleed Top Release Liner', spec: 'Purges trapped air pockets during heatsink/cold-plate clamping' },
      { code: 'L2', name: '82 wt% Bimodal Al2O3 + Aligned h-BN Core', spec: '5.5 W/m·K percolation network with 35 Shore 00 low die stress' },
      { code: 'L3', name: 'Optional Ultra-NS Non-Silicone Matrix', spec: '0.00% siloxane volatiles for 800G optical transceivers & laser modules' },
      { code: 'L4', name: 'Antistatic Release Carrier & Kiss-Cut Base', spec: 'Precision CNC bolt-hole cutouts around heatsink standoffs' },
    ],
    applications: [
      '100kW+ AI Server GPU / ASIC Liquid Cold Plates & High-Density VRMs',
      '800V EV & Rail Silicon Carbide (SiC) Traction Inverters (EconoDUAL / TO-247)',
      'Central Solar Inverters & High-Frequency Power Bricks',
      '800G / 1.6T Coherent Optical Transceivers (Ultra-NS Grade)',
    ],
    standards: ['ASTM D5470 (<0.15 K·cm²/W)', 'GC-MS Zero-Siloxane (Ultra-NS)', 'ASTM D2240 (35 Shore 00)', 'UL 94 V-0'],
  },
];

export const RND_KITS: KitBundle[] = [
  {
    id: 'kit-ais156',
    sku: 'KIT-AIS156-PRO',
    name: 'AIS-156 / UL 9540A Battery Pack Thermal & Fire Kit',
    sector: 'EV Battery & Utility BESS R&D',
    audienceTag: 'B2B R&D Lab',
    priceInr: 14500,
    priceLabel: '₹14,500',
    starterSku: 'KIT-AIS156-MINI',
    starterPriceInr: 3499,
    starterLabel: '₹3,499 Mini Cell-Test Pack',
    starterSummary: '4-cell coupon set for student EV teams & compact benchtop runaway tests',
    leadTime: '48-Hour Dispatch',
    image: '/assets/applications/bess-barrier-lfp-installed.jpg',
    contents: [
      'Custom CNC-cut InsulTherm Core™ bottom cold-plate pads (1.5 mm & 2.0 mm)',
      'Matched InsulTherm Barrier™ 1.50 mm aerogel-mica inter-cell firewalls',
      '3D crease-scored InsulTherm Shield™ living-hinge top busbar sleeve',
      'ASTM D5470, D149 & UL 94 V-0 engineering verification dossier',
    ],
    procurementAdvantage:
      'Priced below ₹15,000 so engineering leads can order immediately via petty cash / UPI (eligible for RNDKIT1000 ₹1,000 OFF at checkout).',
  },
  {
    id: 'kit-benchtop',
    sku: 'KIT-BENCH-5IP',
    name: 'All-5-Material Engineering Benchtop Sampler Box',
    sector: 'Hardware Labs, Prototyping & Makers',
    audienceTag: 'Prototyping & B2C Friendly',
    priceInr: 9800,
    priceLabel: '₹9,800',
    starterSku: 'KIT-SWATCH-MINI',
    starterPriceInr: 1499,
    starterLabel: '₹1,499 Prototyping Swatch Pack',
    starterSummary: 'Indexed sample strips for individual hardware builders, workstations & repair labs',
    leadTime: '24-Hour In-Stock Dispatch',
    image: '/assets/applications/rnd-sampler-kit-unboxed.jpg',
    contents: [
      'Indexed thickness sheets of Core™ (0.5–3.0 mm) & Ultra™ (0.5–1.5 mm)',
      'Barrier™ 1,100°C aerogel-mica test coupons + Graphite-Flex™ Kapton®-sealed strips',
      'Shield™ living-hinge dielectric origami fold sleeves (0.25, 0.43, 0.50 mm)',
      'Shore 00 compression guide & printed 2-page Technical Data Sheets',
    ],
    procurementAdvantage:
      'Ideal for both corporate R&D labs (₹9,800 full box) and independent hardware prototypers (₹1,499 starter pack with PROTO10 10% OFF).',
  },
  {
    id: 'kit-defense-space',
    sku: 'KIT-DEF-E595',
    name: 'Defense, Avionics & SpaceTech Zero-Outgassing Kit',
    sector: 'Defense PSUs, UAVs & Satellites',
    audienceTag: 'B2B R&D Lab',
    priceInr: 12500,
    priceLabel: '₹12,500',
    leadTime: '48-Hour ESD Dispatch',
    image: '/assets/applications/drone-graphite-flex-installed.jpg',
    contents: [
      'Custom CNC-nested Graphite-Flex™ (50×50 mm & custom radar/UAV planes)',
      '100% siloxane-free InsulTherm Ultra-NS™ pads for optical/RF modules',
      'Shield-NMX™ high-temperature aramid dielectric barriers',
      'ASTM E595 outgassing & 100% Domestic Value Addition (DVA) declaration',
    ],
    procurementAdvantage:
      '100% Make-in-India supply compliant with <₹200 Crore Global Tender Enquiry (GTE) domestic procurement.',
  },
  {
    id: 'kit-sic-inverter',
    sku: 'KIT-SIC-RAIL',
    name: 'Power Electronics, Inverter & BMS Isolation Kit',
    sector: 'SiC Inverters, Solar & Electronics Repair',
    audienceTag: 'Prototyping & B2C Friendly',
    priceInr: 7500,
    priceLabel: '₹7,500',
    starterSku: 'KIT-TO247-25PC',
    starterPriceInr: 999,
    starterLabel: '₹999 25-Pc TO-247 / BMS Pack',
    starterSummary: 'Ready-to-use TO-247 / 50×50mm thermal & dielectric pack for prototypes and repairs',
    leadTime: '24-Hour Dispatch',
    image: '/assets/applications/sic-coldplate-ultra-installed.jpg',
    contents: [
      'Pre-cut TO-247, TO-220, D2PAK & EconoDUAL baseplate pads in Ultra™ 5.5 W/m·K',
      '20× Standard 50 × 50 mm Core™ BMS/MOSFET conduction pads',
      'Matched Shield™ high-voltage creepage barriers & busbar sleeves',
      'Mounting pressure vs. thermal impedance application note',
    ],
    procurementAdvantage:
      'Available as a ₹7,500 pilot kit or a ₹999 25-piece starter pack for rapid benchtop assembly.',
  },
];

export const MARKETS: MarketVertical[] = [
  {
    id: 'mkt-bess',
    name: 'Grid-Scale BESS & Stationary Storage',
    standards: 'UL 9540A Design • IEC 62619 • 1,500V DC • 100% DVA',
    headline: '1,100°C Inter-Cell Firewalls & 1,500V DC Busbar Sleeves for 280Ah–314Ah LFP Racks',
    description:
      'Utility container integrators sandwich 1.50 mm Barrier™ mica-aerogel sheets vertically between prismatic LFP cells (where liquid pastes cannot be dispensed) alongside hand-folded Shield™ busbar shrouds—eliminating 30.98% import duty stacks and 6-week sea/air delays.',
    image: '/assets/applications/bess-barrier-lfp-installed.jpg',
    imageLabel: 'Barrier™ 1.50 mm Firewalls Installed Between 280Ah Prismatic LFP Cells',
    recommendedProducts: ['insultherm-barrier', 'insultherm-shield'],
    keyOutcome: '>1,100°C flame block (k = 0.018 W/m·K) + 28–32 kV/mm busbar isolation',
  },
  {
    id: 'mkt-rail-industrial',
    name: 'Industrial Power, Rail & Solar Inverters',
    standards: 'UL 94 V-0 • >28 kV/mm • 800V–1,500V DC',
    headline: 'Snap-Fold 3D Copper Busbar Insulation in 48 Hours With ₹0 Mold Tooling',
    description:
      'Traction converter, VFD, and solar inverter builders replace ₹25,000–₹60,000 plastic injection molds with 50%-depth CNC crease-scored Shield™ sleeves that fold by hand in 5 seconds, paired with Ultra™ 5.5 W/m·K pads beneath SiC/IGBT baseplates.',
    image: '/assets/applications/inverter-shield-busbar-installed.jpg',
    imageLabel: 'Shield™ 3D Origami Shroud Wrapped Over 1,500V Copper Busbars',
    recommendedProducts: ['insultherm-shield', 'insultherm-ultra'],
    keyOutcome: '50% lower prototype unit cost + ₹0 NRE on every busbar CAD revision',
  },
  {
    id: 'mkt-defense',
    name: 'Defense Avionics, SpaceTech & Drones',
    standards: 'ASTM E595 (TML <1%, CVCM <0.1%) • <₹200 Cr GTE Compliant',
    headline: 'Edge-Sealed Lateral Hotspot Spreading in Sealed UAV & Radar Enclosures',
    description:
      'Where sealed drone flight computers, phased-array radar T/R modules, and LEO satellite payloads have zero vertical room for fans or heatsinks, Kapton®-encapsulated Graphite-Flex™ routes heat sideways at 1,000–1,500 W/m·K with zero silicone outgassing or carbon flaking.',
    image: '/assets/applications/drone-graphite-flex-installed.jpg',
    imageLabel: 'Graphite-Flex™ Lateral Spreader Installed Inside Sealed UAV Flight Computer',
    recommendedProducts: ['insultherm-graphite-flex', 'insultherm-ultra'],
    keyOutcome: '4× copper lateral diffusivity at 24% mass + zero optical fogging',
  },
  {
    id: 'mkt-ai',
    name: 'AI Data Centers & 800V SiC Cooling',
    standards: 'Rth < 0.15 K·cm²/W • 35 Shore 00 • Siloxane-Free Option',
    headline: 'High-Flux Heat Extraction for 100kW+ Liquid Cold Plates & 800G Optics',
    description:
      'Localized AI server cold plates, 800V SiC power bricks, and coherent optical transceivers use Ultra™ 5.5 W/m·K bimodal Al2O3 + aligned h-BN pads (and siloxane-free Ultra-NS™) to achieve <0.15 K·cm²/W at low 20 psi clamping stress.',
    image: '/assets/applications/sic-coldplate-ultra-installed.jpg',
    imageLabel: 'Ultra™ 5.5 W/m·K Pad Installed Under 800V SiC Power Module on Liquid Cold Plate',
    recommendedProducts: ['insultherm-ultra', 'insultherm-graphite-flex'],
    keyOutcome: '<0.15 K·cm²/W thermal impedance at gentle 35 Shore 00 compliance',
  },
  {
    id: 'mkt-ev-proto',
    name: 'EV Pack R&D & Rapid Prototyping Labs',
    standards: 'AIS-156 Amend. 3 Support • <₹15,000 Petty-Cash Kits',
    headline: '48-Hour Custom Pack Kits & Scrim-Reinforced Cold-Plate Conduction',
    description:
      'EV battery R&D cells, incubators, and pack builders order custom-cut Core™ anti-bleed cold-plate pads, 50×50 mm BMS pads, and turnkey <₹15,000 AIS-156 evaluation kits online—getting parts on the bench in 48 hours without 6-month vendor onboarding.',
    image: '/assets/applications/ev-coldplate-core-installed.jpg',
    imageLabel: 'Core™ Anti-Bleed Pad & 50×50 mm BMS Pads Installed on EV Liquid Cold Plate',
    recommendedProducts: ['insultherm-core', 'insultherm-barrier', 'insultherm-shield'],
    keyOutcome: '74.189°C neighbor cell hold in 4-quadrant runaway FEA + MOQ 1 pc',
  },
];

export const VALIDATION_PLATES: ValidationPlate[] = [
  {
    id: 'val-fea-runaway',
    category: 'FEA Simulation',
    title: '4-Quadrant Thermal Runaway Simulation (400°C Fault Event)',
    subtitle: 'Full Uncropped Thermal Solver Output — Q1 Fault Cell vs. Q2/Q3/Q4 Neighbors',
    src: '/assets/validation/fea-runaway-400c.png',
    dimensions: '1500 × 785 px',
    badge: '74.189°C Neighbor Hold',
    metrics: [
      { label: 'Q1 Fault Cell', value: '400.0 °C' },
      { label: 'Neighbor Edge', value: '74.189 °C' },
      { label: 'Cascade Ceiling', value: '< 80 °C PASS' },
    ],
    description:
      'Full 4-quadrant coupled conduction simulation showing a 400°C cell runaway in Quadrant 1 arrested across a 1.50 mm InsulTherm Barrier™ wall while the bottom InsulTherm Core™ pad drains heat into the cold plate—holding adjacent cells down to 74.189°C.',
  },
  {
    id: 'val-app-drone',
    category: 'Physical Hardware',
    title: 'UAV Avionics & Radar T/R Box — Graphite-Flex™ Installed',
    subtitle: 'Edge-Sealed Kapton® + Pyrolytic Graphite Routing Chip Heat to Sidewall',
    src: '/assets/applications/drone-graphite-flex-installed.jpg',
    dimensions: '1360 × 765 px',
    badge: '1,500 W/m·K Lateral',
    metrics: [
      { label: 'In-Plane k', value: '1,000–1,500 W/m·K' },
      { label: 'Outgassing', value: 'ASTM E595 Pass' },
      { label: 'Std 50×50 Price', value: '₹350 → ₹280' },
    ],
    description:
      'Installed hardware view inside a sealed black-anodized UAV flight computer showing an oversize Kapton®-edge-sealed Graphite-Flex™ plane transferring heat laterally from the BGA processor to the finned chassis wall.',
  },
  {
    id: 'val-app-bess',
    category: 'Physical Hardware',
    title: '280Ah Prismatic LFP Rack — Barrier™ Inter-Cell Firewalls',
    subtitle: '1.50 mm Mica + Nanoporous Silica Aerogel Dividers Under Compression',
    src: '/assets/applications/bess-barrier-lfp-installed.jpg',
    dimensions: '1360 × 765 px',
    badge: '>1,100°C Firewall',
    metrics: [
      { label: 'Conductivity', value: '0.018 W/m·K' },
      { label: 'Wall Thickness', value: '1.50 mm' },
      { label: '100cm² Price', value: '₹110 → ₹85' },
    ],
    description:
      'Utility BESS / EV prismatic LFP cell stack demonstrating dust-encapsulated 1.50 mm InsulTherm Barrier™ sheets installed vertically between every adjacent cell to block cascading runaway.',
  },
  {
    id: 'val-app-busbar',
    category: 'Physical Hardware',
    title: '1,500V DC Inverter Copper Busbars — Shield™ 3D Origami Shroud',
    subtitle: '50%-Depth CNC Living Hinges & Snap-Fit Mechanical Locks',
    src: '/assets/applications/inverter-shield-busbar-installed.jpg',
    dimensions: '1360 × 765 px',
    badge: '>28 kV/mm Origami',
    metrics: [
      { label: 'Dielectric', value: '28–32 kV/mm' },
      { label: 'Mold Tooling', value: '₹0 NRE' },
      { label: '100cm² Price', value: '₹45 → ₹30' },
    ],
    description:
      'Matte-black UL 94 V-0 InsulTherm Shield™ sleeve folded along precision 50%-depth CNC score lines and snap-locked around heavy copper busbars inside a grounded inverter cabinet.',
  },
  {
    id: 'val-app-sic',
    category: 'Physical Hardware',
    title: '800V SiC Power Module & Liquid Cold Plate — Ultra™ 5.5 W/m·K',
    subtitle: 'CNC Bolt-Hole Kiss-Cut Hybrid Al2O3 + h-BN Interface Pad',
    src: '/assets/applications/sic-coldplate-ultra-installed.jpg',
    dimensions: '1360 × 765 px',
    badge: '<0.15 K·cm²/W',
    metrics: [
      { label: 'Conductivity', value: '5.5 W/m·K' },
      { label: 'Hardness', value: '35 Shore 00' },
      { label: '100cm² Price', value: '₹140 → ₹95' },
    ],
    description:
      'Benchtop assembly of an EconoDUAL 800V SiC power brick onto a machined aluminum liquid cold plate over a precision CNC-cut InsulTherm Ultra™ 5.5 W/m·K pad.',
  },
  {
    id: 'val-app-core',
    category: 'Physical Hardware',
    title: 'EV Liquid Cooling Plate & BMS PCB — Core™ Anti-Bleed Pads',
    subtitle: 'E-Glass Scrim Cold-Plate Pad + Pre-Cut 50×50 mm BMS Pads',
    src: '/assets/applications/ev-coldplate-core-installed.jpg',
    dimensions: '1360 × 765 px',
    badge: '50°C Anti-Bleed',
    metrics: [
      { label: 'Conductivity', value: '3.0 W/m·K' },
      { label: 'BMS 50×50 SKU', value: '₹20 → ₹17' },
      { label: '100cm² Custom', value: '₹80 → ₹61.20' },
    ],
    description:
      'Fiberglass-scrim-reinforced InsulTherm Core™ bottom pad with extended pull-tab liner laid onto an EV serpentine cooling plate alongside 50×50 mm MOSFET conduction pads.',
  },
  {
    id: 'val-fea-continuous',
    category: 'FEA Simulation',
    title: '4-Quadrant Continuous High-Load Simulation (180°C Source)',
    subtitle: 'Steady-State Coupled Barrier™ Isolation + Core™ Cold-Plate Draining',
    src: '/assets/validation/fea-continuous-load.png',
    dimensions: '1500 × 707 px',
    badge: '91.3°C Peak Hold',
    metrics: [
      { label: 'Hot Cell Source', value: '180.0 °C' },
      { label: 'Adjacent Peak', value: '91.3 °C' },
      { label: 'Barrier Wall', value: '1.50 mm' },
    ],
    description:
      'Sustained 180°C thermal stress in one cell quadrant blocked laterally by Barrier™ (k = 0.018 W/m·K) and extracted vertically through Core™ (k = 3.0 W/m·K).',
  },
  {
    id: 'val-fea-matrix',
    category: 'FEA Simulation',
    title: 'Q1–Q4 Multi-Cell Coupled Boundary Matrix',
    subtitle: 'Quadrant Heat-Flux & Directional Anisotropy Mapping',
    src: '/assets/validation/fea-boundary-matrix.png',
    dimensions: '1161 × 895 px',
    badge: 'Coupled Boundary Map',
    metrics: [
      { label: 'Lateral Axis', value: 'Barrier™ k=0.018' },
      { label: 'Vertical Sink', value: 'Core™ k=3.0' },
      { label: 'Top Shroud', value: 'Shield™ >28 kV/mm' },
    ],
    description:
      'Complete 4-cell boundary layout showing how directional thermal management blocks cell-to-cell propagation while maximizing cold-plate heat rejection.',
  },
  {
    id: 'val-cutaway-studio',
    category: 'Physical Hardware',
    title: 'Integrated Prismatic Module Cutaway (3-IP Stack)',
    subtitle: 'Core™ Cold-Plate Base + Barrier™ Cell Walls + Shield™ Busbar Shroud',
    src: '/assets/validation/pack-cutaway-studio.jpg',
    dimensions: '1400 × 764 px',
    badge: '3-IP Pack Cutaway',
    metrics: [
      { label: 'Top Shroud', value: 'Shield™ 0.43 mm' },
      { label: 'Cell Walls', value: 'Barrier™ 1.50 mm' },
      { label: 'Base Pad', value: 'Core™ 1.5–2.0 mm' },
    ],
    description:
      'Demonstration cutaway showing how Shield™, Barrier™, and Core™ integrate simultaneously inside an aluminum liquid-cooled battery module.',
  },
  {
    id: 'val-cad-exploded',
    category: 'CAD Architecture',
    title: 'Exploded 4-Cell Module CAD Assembly',
    subtitle: 'Uncropped Isometric Stackup — Cold Plate, Core™, Cells, Barrier™ & Busbars',
    src: '/assets/validation/cad-exploded-pack.png',
    dimensions: '625 × 636 px',
    badge: '.STEP / .DXF Ready',
    metrics: [
      { label: 'CAD Input', value: '.DXF / .STEP' },
      { label: 'Tooling NRE', value: '₹0' },
      { label: 'Tolerance', value: '±0.15 mm' },
    ],
    description:
      'Uncropped exploded 3D CAD assembly used by our CAM nesting pipeline to generate precision 2D flat patterns with zero steel-die tooling.',
  },
  {
    id: 'val-cad-assembled',
    category: 'CAD Architecture',
    title: 'Assembled Busbar & Inter-Cell Firewall CAD',
    subtitle: 'Compact 4S Prismatic Pack Geometry With Zero Volumetric Bloat',
    src: '/assets/validation/cad-assembled-pack.png',
    dimensions: '748 × 673 px',
    badge: 'Compact Pack Fit',
    metrics: [
      { label: 'Cell Spacing', value: '1.50 mm Wall' },
      { label: 'Busbar Rating', value: '1,500V DC' },
      { label: 'Dispatch', value: '24–48 Hours' },
    ],
    description:
      'Assembled CAD verification confirming copper busbar clearance, cell compression allowance, and top collector creepage isolation.',
  },
  {
    id: 'val-cad-top',
    category: 'CAD Architecture',
    title: 'Top-Down Busbar & Firewall Datum Layout',
    subtitle: 'Plan-View Registration for Bolt-Holes & Living-Hinge Fold Lines',
    src: '/assets/validation/cad-top-busbar.png',
    dimensions: '637 × 663 px',
    badge: '±0.15mm Datum',
    metrics: [
      { label: 'Registration', value: '±0.15 mm' },
      { label: 'Crease Depth', value: '50% ± 0.05 mm' },
      { label: 'MOQ', value: '1 Piece' },
    ],
    description:
      'Plan-view alignment plate verifying copper interconnect geometry against inter-cell firewall tabs and dielectric shroud fold channels.',
  },
];
