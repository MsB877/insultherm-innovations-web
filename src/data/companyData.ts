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
      role: 'Co-Founder — Commercial Strategy & OEM Accounts',
      focus: 'Leads BESS, EV, and Defense qualification programs, transparent area-pricing schedules, and direct R&D procurement.',
      email: 'manav.sb@inslthrm.in',
    },
    {
      name: 'Nikhil',
      role: 'Co-Founder — Materials Formulation & Thermal Validation',
      focus: 'Leads composite TIM architecture, ASTM D5470 / D149 characterization, and 4-quadrant thermal runaway FEA modeling.',
    },
    {
      name: 'Sukhmeet',
      role: 'Co-Founder — Digital CNC Converting & Operations',
      focus: 'Directs zero-tooling oscillating-knife CNC cells, 50%-depth living-hinge scoring accuracy, and 24–48h dispatch.',
    },
  ],
};

// Laird.com-style 3 Clean Technology Portfolios (Genuine InsulTherm Capabilities Only)
export const PORTFOLIOS = [
  {
    id: 'portfolio-thermal',
    title: 'Thermal Interface & Heat Spreading',
    subtitle: 'Core™ • Ultra™ • Graphite-Flex™',
    description:
      'From 3.0 W/m·K tropical anti-bleed gap pads and 5.5 W/m·K low-stress hybrid ceramic TIMs to 1,500 W/m·K zero-outgassing pyrolytic graphite spreaders.',
    link: '/products?group=thermal',
    metric: '3.0 to 1,500 W/m·K',
  },
  {
    id: 'portfolio-protection',
    title: 'Runaway Fire & Dielectric Protection',
    subtitle: 'Barrier™ • Shield™',
    description:
      '1.50 mm nanoporous aerogel-mica inter-cell firewalls (>1,100°C hold) paired with 3D living-hinge dielectric busbar shrouds (>28 kV/mm) that fold by hand.',
    link: '/products?group=protection',
    metric: '>1,100°C & 28–32 kV/mm',
  },
  {
    id: 'portfolio-converting',
    title: 'Zero-Tooling CNC & Prototyping Kits',
    subtitle: '24–48h Custom CAD • <₹15k Kits',
    description:
      'Upload .DXF or .STEP geometry for custom parts with ₹0 steel-die NRE, or order off-the-shelf R&D qualification kits and compact starter packs from ₹999.',
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
    shortTagline: '3D Dielectric Origami & Living-Hinge Busbar Shrouds',
    category: 'Dielectric Origami',
    heroImage: '/assets/products/insultherm-shield.jpg',
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
    protoPriceLabel: '₹45 / folded pc (100 cm² ref)',
    volumePriceLabel: '₹30 / pc (₹0.30/cm² nested)',
    referencePriceNote:
      'Reference 100×100 mm (100 cm²) folded shroud = ₹45 prototype (₹0.45/cm², min ₹25/pc) & ₹30 volume (₹0.30/cm² nested flat area).',
    moqLabel: '1 Piece (₹0 Tooling NRE)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Shield-FGK-043 (Formex™ GK-17 Equiv.)', 'Shield-NMX-050 (Nomex® 410 Duplex)'],
    oneLineSummary:
      'CNC-cut and 50%-depth crease-scored UL 94 V-0 dielectric sheets that ship flat and fold into 3D busbar shrouds—eliminating injection mold costs.',
    summary:
      'Precision CNC-cut and 50%-depth crease-scored flame-retardant polypropylene and aramid dielectric sheets that ship flat and fold by hand into rigid, snap-fit 3D enclosures around 800V–1,500V DC busbars—eliminating ₹4–12 Lakh injection molds.',
    layers: [
      { code: 'L1', name: 'UL 94 V-0 Dielectric Polymer / Aramid Core', spec: '28–32 kV/mm breakdown, non-hygroscopic (<0.8% H2O)' },
      { code: 'L2', name: '50%-Depth Precision CNC Crease Channel', spec: '±0.05 mm Z-axis depth control for crack-free 90°/180° folds' },
      { code: 'L3', name: 'Interlocking Tab-and-Slot Retention Geometry', spec: 'Adhesive-free mechanical snap lock over copper busbars' },
      { code: 'L4', name: 'Optional Zone-Applied UL 94 V-0 Acrylic PSA', spec: 'Kiss-cut peel tab for rapid chassis wall anchoring' },
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
    familyGroup: 'Runaway Fire & Dielectric Protection',
    name: 'InsulTherm Barrier',
    trademarkName: 'InsulTherm Barrier™',
    shortTagline: '1,100°C Aerogel-Mica Cell-to-Cell Runaway Firewall',
    category: 'Fire Barrier',
    heroImage: '/assets/products/insultherm-barrier.jpg',
    secondaryImage: '/assets/validation/fea-runaway-400c.png',
    tdsUrl: '/tds/insultherm-barrier-tds.pdf',
    thermalConductivity: '0.018 – 0.022 W/m·K @ 25°C',
    thermalConductivitySort: 0.018,
    thermalImpedance: '74.189°C Neighbor Hold @ 400°C Fault',
    dielectricStrength: '> 15 kV/mm (>22.5 kV @ 1.5 mm)',
    dielectricSort: 15,
    operatingTemp: '-60°C to +1,100°C (>5 min Torch Hold)',
    maxTempSort: 1100,
    flammability: 'UL 94 V-0 / UL 9540A / AIS-156 Amend. 3',
    hardnessOrDensity: '25–35% Compressible Cell-Breathing Core',
    thicknessRange: '1.50 mm (Std), 1.65 mm (Kapton HV), 2.00 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹110 / custom sheet (100 cm² ref)',
    volumePriceLabel: '₹85 / sheet (₹0.85/cm² nested)',
    referencePriceNote:
      'Reference 100×100 mm (100 cm²) cell sheet = ₹110 prototype (₹1.10/cm², min ₹55/pc) & ₹85 volume (₹0.85/cm² nested area).',
    moqLabel: '1 Sheet / Pack Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: true,
    keyGrades: ['Barrier-MA1-150 (Mica + Aerogel + FR-PSA)', 'Barrier-MK2-165 (Dual-Mica + Kapton® Seal)'],
    oneLineSummary:
      'Ultra-thin 1.50 mm Phlogopite Mica + Silica Aerogel composite (k = 0.018 W/m·K) arresting lithium-ion thermal runaway propagation.',
    summary:
      'Ultra-thin 1.50 mm 4-layer cell-to-cell thermal runaway propagation firewall pairing particle-erosion-resistant Phlogopite Mica with nanoporous Silica Aerogel (k = 0.018 W/m·K) to stop cascading battery fires.',
    layers: [
      { code: 'L1', name: '0.20 mm Calcined Phlogopite Mica Armor', spec: 'Withstands >1,100°C vent-gas particle jetting & >20 kV/mm stress' },
      { code: 'L2', name: '1.20 mm Nanoporous Silica Aerogel Felt', spec: 'k = 0.018 W/m·K ultra-insulation + 25–35% cell swelling absorption' },
      { code: 'L3', name: '0.10 mm UL 94 V-0 Flame-Retardant Acrylic PSA', spec: 'Peel-and-stick positioning directly onto prismatic or pouch cell cans' },
      { code: 'L4', name: '0.075 mm Moisture-Barrier PET Release Liner', spec: 'Split-back kiss-cut liner with clean CNC perimeter' },
    ],
    applications: [
      'AIS-156 Rev. 3 Two/Three-Wheeler & Passenger EV Inter-Cell Firewalls',
      'UL 9540A 280Ah / 314Ah LFP Utility BESS Container Propagation Barriers',
      'Module Lid Vent-Channel Blast Deflectors & Exhaust Shields',
      'Industrial, Marine & Backup Energy Storage Enclosures',
    ],
    standards: ['AIS-156 Amend. 3 (>5 min @ 1,100°C)', 'UL 9540A', 'ASTM C518', 'ASTM D149'],
  },
  {
    id: 'insultherm-graphite-flex',
    familyGroup: 'Thermal Interface & Heat Spreading',
    name: 'InsulTherm Graphite-Flex',
    trademarkName: 'InsulTherm Graphite-Flex™',
    shortTagline: '1,000–1,500 W/m·K Edge-Sealed Zero-Outgassing Spreader',
    category: 'Anisotropic Spreader',
    heroImage: '/assets/products/insultherm-graphite-flex.jpg',
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
    protoPriceLabel: '₹350 – ₹1,800 / part (by cm² area)',
    volumePriceLabel: '₹3.20 / cm² nested (min ₹28/pc)',
    referencePriceNote:
      'Prototype (1–99 pcs): ≤25 cm² = ₹350/pc; 26–100 cm² = ₹350 + ₹5.50/cm²; 101–300 cm² = +₹5.15/cm² (up to ₹1,800). Volume (100+ pcs): ₹3.20/cm² nested area (min ₹28/pc).',
    moqLabel: '1 Piece (100% Domestic DVA)',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['GFlex-1000 (1,000 W/m·K Defense/ECU)', 'GFlex-1500 (1,500 W/m·K Satellite/Radar)'],
    oneLineSummary:
      'Edge-sealed Kapton®-capped pyrolytic graphite plane (1,000–1,500 W/m·K) with ASTM E595 silicone-free PSA for sealed electronics, radar, and optics.',
    summary:
      '5-layer anisotropic lateral heat-spreading plane encapsulating dual high-crystallinity pyrolytic graphite cores beneath an edge-sealed Kapton® polyimide dielectric cap and ASTM E595 silicone-free adhesive.',
    layers: [
      { code: 'L1', name: '0.025 mm Kapton® Polyimide Dielectric Top Cap', spec: '>5 kV isolation + 1.0–1.5 mm CNC edge-seal overhang prevents flaking' },
      { code: 'L2', name: 'Dual Pyrolytic Graphite Core (1,000–1,500 W/m·K)', spec: 'Rapid lateral heat diffusion eliminating ≥18°C local SoC/FPGA hotspots' },
      { code: 'L3', name: 'Ultra-Thin Open-Mesh E-Glass Scrim Interleaf', spec: 'Tear & fold reinforcement across 2.0 mm dynamic chassis bends' },
      { code: 'L4', name: '0.030 mm ASTM E595 Silicone-Free Acrylic PSA', spec: 'TML < 1.0%, CVCM < 0.10% — zero siloxane fogging on optics' },
      { code: 'L5', name: '0.050 mm Kiss-Cut Clear PET Release Liner', spec: 'Cleanroom ESD pouch packaging option' },
    ],
    applications: [
      'Defense UAV Flight Computers, Phased-Array Radar T/R Modules & Seekers',
      'LEO Satellite Payloads & Optical Camera Housings',
      'Sealed Automotive ADAS ECUs & 5G/6G Small Cells',
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
    secondaryImage: '/assets/products/insultherm-core-diecut.jpg',
    tdsUrl: '/tds/insultherm-core-tds.pdf',
    thermalConductivity: '3.0 W/m·K Bulk Conductivity',
    thermalConductivitySort: 3.0,
    thermalImpedance: '0.22 – 0.28 K·cm²/W @ 1 mm, 20 psi',
    dielectricStrength: '> 10 kV/mm (Core-300) / > 14 kV/mm (350D)',
    dielectricSort: 14,
    operatingTemp: '-50°C to +200°C (50°C Anti-Bleed)',
    maxTempSort: 200,
    flammability: 'UL 94 V-0 Certified Matrix',
    hardnessOrDensity: '40 Shore 00 Soft Conformable',
    thicknessRange: '0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm',
    defaultLengthMm: 100,
    defaultWidthMm: 100,
    defaultThicknessMm: 1.5,
    protoPriceLabel: '₹80 / custom pad | ₹20 std 50×50mm',
    volumePriceLabel: '₹68 → ₹61.20 / pad (₹0.612/cm²)',
    referencePriceNote:
      'In-stock 50×50 mm (25 cm²) BMS pad = ₹20/pad. Custom CNC prototype pads = ₹80 at 100×100 mm (₹0.80/cm², min ₹35/pc) & ₹68 → ₹61.20/pad in OEM volume.',
    moqLabel: '1 Custom Pad or 50×50mm Pack',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: false,
    siliconeFreeAvailable: false,
    keyGrades: ['Core-300 (3.0 W/m·K Anti-Bleed)', 'Core-BMS-50x50 (₹20 Std Pad)', 'Core-350D (>14 kV/mm HV Scrim)'],
    oneLineSummary:
      '3.0 W/m·K silane-passivated alumina gap pad with central fiberglass scrim—engineered for zero oil bleed across 50°C–150°C tropical duty cycles.',
    summary:
      '5-layer tropical-climate-engineered elastomer thermal interface gap pad formulated with 72 wt% silane-passivated spherical alumina and woven E-Glass scrim to eliminate oil bleed and pad stretching during assembly.',
    layers: [
      { code: 'L1', name: '0.050 mm Extended-Tab Top PET Release Liner', spec: 'Glove-friendly ergonomic peel tab for fast placement' },
      { code: 'L2', name: 'Upper Tacky PDMS + 72 wt% Spherical Alumina', spec: '40 Shore 00 micro-void wetting onto machined cold plates' },
      { code: 'L3', name: 'Central Woven E-Glass Fiberglass Scrim', spec: 'Prevents stretching, tearing, and housing burr puncture' },
      { code: 'L4', name: 'Lower Passivated Anti-Bleed Thermal Matrix', spec: 'Zero oil separation across 1,000h at 50°C–150°C cycling' },
      { code: 'L5', name: '0.075 mm Differential-Release Bottom Carrier', spec: 'Kiss-cut sheet array compatible' },
    ],
    applications: [
      'EV Battery Module Bottom Cell-to-Cold-Plate Heat Draining',
      'BMS Shunt Resistors, MOSFET Arrays & Onboard Chargers (OBC)',
      'Solar Inverters, Telecom Rectifiers & Industrial Motor Drives',
      'Hardware Prototyping & Gap-Deflection Benchmarking (0.5–3.0 mm)',
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
    protoPriceLabel: '₹140 / custom pad (100 cm² ref)',
    volumePriceLabel: '₹95 / pad (₹0.95/cm² nested)',
    referencePriceNote:
      'Reference 100×100 mm (100 cm²) pad = ₹140 prototype (₹1.40/cm², min ₹50/pad for discrete packages) & ₹95 volume (₹0.95/cm² nested).',
    moqLabel: '1 Custom Pad / SiC Kit',
    leadTime: '24 – 48 Hours',
    outgassingCompliant: true,
    siliconeFreeAvailable: true,
    keyGrades: ['Ultra-550 (5.5 W/m·K AI/SiC Grade)', 'Ultra-NS (100% Siloxane-Free Optical Grade)'],
    oneLineSummary:
      'Ultra-soft 35 Shore 00, 5.5 W/m·K hybrid Al2O3 + Boron Nitride gap filler (<0.15 K·cm²/W) for SiC inverters, AI GPUs, and siloxane-free optics.',
    summary:
      'High-heat-flux 5.5 W/m·K hybrid ceramic interface pad combining 82 wt% bimodal spherical Al2O3 with aligned hexagonal Boron Nitride (h-BN) for >30 W/cm² SiC inverters and AI cold plates—including a 100% siloxane-free Ultra-NS option.',
    layers: [
      { code: 'L1', name: 'Diamond-Embossed Air-Bleed Top Release Liner', spec: 'Purges trapped air pockets during heatsink/cold-plate clamping' },
      { code: 'L2', name: '82 wt% Bimodal Al2O3 + Aligned h-BN Core', spec: '5.5 W/m·K percolation network with 35 Shore 00 low die stress' },
      { code: 'L3', name: 'Optional Ultra-NS Non-Silicone Matrix', spec: '0.00% siloxane volatiles for optical transceivers & laser modules' },
      { code: 'L4', name: 'Micro-Glass Carrier & Kiss-Cut Base', spec: 'Precision CNC cutouts around heatsink standoffs' },
    ],
    applications: [
      'AI Server GPU / ASIC Liquid Cold Plates & High-Density VRMs',
      '800V EV Silicon Carbide (SiC) Traction Inverters & DC-DC Converters',
      'RDSO Railway IGBT Modules & Central Solar Inverters',
      '800G Optical Transceivers & Workstation / GPU Thermal Rebuilds',
    ],
    standards: ['ASTM D5470 (<0.15 K·cm²/W)', 'GC-MS Zero-Siloxane (Ultra-NS)', 'ASTM D2240 (35 Shore 00)', 'UL 94 V-0'],
  },
];

// Genuine <₹15k R&D Kits + Compact Prototyping Starter Packs (B2B + B2C Friendly, Exact Original Prices!)
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
    image: '/assets/validation/pack-cutaway-studio.jpg',
    contents: [
      'Custom CNC-cut InsulTherm Core™ bottom cold-plate pads (1.5 mm & 2.0 mm)',
      'Matched InsulTherm Barrier™ 1.50 mm aerogel-mica inter-cell firewalls',
      '3D crease-scored InsulTherm Shield™ living-hinge top busbar shroud',
      'ASTM D5470, D149 & UL 94 V-0 engineering certificate dossier',
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
    image: '/assets/products/thermafix-bench-pack.jpg',
    contents: [
      'Indexed thickness sheets of Core™ (0.5–3.0 mm) & Ultra™ (0.5–1.5 mm)',
      'Barrier™ 1,100°C aerogel-mica test coupons + Graphite-Flex™ Kapton®-sealed strips',
      'Shield™ living-hinge dielectric origami fold blanks (0.25, 0.43, 0.50 mm)',
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
    image: '/assets/products/insultherm-graphite-flex.jpg',
    contents: [
      'Custom CNC-nested Graphite-Flex™ (GFlex-1000 & GFlex-1500) Kapton®-sealed planes',
      '100% siloxane-free InsulTherm Ultra-NS™ pads for optical/RF modules',
      'Shield-NMX™ high-temperature aramid dielectric barriers',
      'ASTM E595 outgassing & 100% Domestic Value Addition (DVA) declaration',
    ],
    procurementAdvantage:
      '100% Make-in-India sovereign supply compliant with domestic defense procurement norms.',
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
    image: '/assets/products/tri-hazard-kit.jpg',
    contents: [
      'Pre-cut TO-247, TO-220, D2PAK & IGBT baseplate pads in Ultra™ 5.5 W/m·K',
      '20× Standard 50 × 50 mm Core™ BMS/MOSFET conduction pads',
      'Matched Shield™ high-voltage creepage barriers & slot liners',
      'Mounting pressure vs. thermal impedance application note',
    ],
    procurementAdvantage:
      'Available as a ₹7,500 pilot kit or a ₹999 25-piece starter pack for rapid benchtop assembly.',
  },
];

export const MARKETS: MarketVertical[] = [
  {
    id: 'mkt-ev',
    name: 'Automotive & EV Battery Systems',
    standards: 'AIS-156 Amend. 3 • ISO 6469 • UL 94 V-0',
    headline: 'Pass Thermal Propagation Homologation Without 8-Week Tooling Delays',
    description:
      'EV two/three-wheelers, passenger packs, and SiC traction inverters rely on coupled cell-to-cell fire isolation (Barrier™), bottom cold-plate conduction (Core™), and tool-free busbar shrouds (Shield™) cut directly from CAD in 48 hours.',
    image: '/assets/validation/pack-cutaway-studio.jpg',
    recommendedProducts: ['insultherm-barrier', 'insultherm-core', 'insultherm-shield'],
    keyOutcome: '74.189°C neighbor cell hold against a 400°C runaway fault cell',
  },
  {
    id: 'mkt-bess',
    name: 'Grid-Scale BESS & Solar Inverters',
    standards: 'UL 9540A • IEC 62619 • 1,500V DC',
    headline: 'High-Voltage Dielectric Creepage & 280Ah/314Ah LFP Container Firewalls',
    description:
      'Utility energy storage integrators eliminate ₹6–12 Lakh plastic mold fees across evolving 1,500V DC busbar collectors using hand-folded Shield™ shrouds alongside large-format Barrier™ LFP dividers.',
    image: '/assets/products/insultherm-shield.jpg',
    recommendedProducts: ['insultherm-shield', 'insultherm-barrier', 'insultherm-ultra'],
    keyOutcome: '28–32 kV/mm breakdown strength with ₹0 mold tooling NRE',
  },
  {
    id: 'mkt-defense',
    name: 'Aerospace, Defense & SpaceTech',
    standards: 'ASTM E595 • MIL-STD-810H • 100% India DVA',
    headline: 'Zero-Outgassing Lateral Cooling at 24% the Weight of Copper',
    description:
      'Sealed UAV flight computers, phased-array radar T/R modules, and LEO satellite optical payloads use Kapton®-sealed Graphite-Flex™ (1,500 W/m·K) and siloxane-free Ultra-NS™ to eliminate hotspots without outgassing.',
    image: '/assets/products/insultherm-graphite-flex.jpg',
    recommendedProducts: ['insultherm-graphite-flex', 'insultherm-ultra'],
    keyOutcome: 'TML < 1.0%, CVCM < 0.10% with 100% domestic traceability',
  },
  {
    id: 'mkt-ai',
    name: 'AI Data Centers, 5G & Power Electronics',
    standards: '<0.15 K·cm²/W • 35 Shore 00 • Siloxane-Free',
    headline: 'High-Flux Heat Extraction Without Bare-Die or PCB Bending Stress',
    description:
      'Liquid-cooled AI server plates, 800G optical transceivers, and SiC/IGBT power bricks achieve <0.15 K·cm²/W thermal impedance at low mounting pressure using Ultra™ 5.5 W/m·K hybrid ceramic pads.',
    image: '/assets/products/insultherm-ultra.jpg',
    recommendedProducts: ['insultherm-ultra', 'insultherm-graphite-flex', 'insultherm-core'],
    keyOutcome: '5.5 W/m·K conductivity with ultra-compliant 35 Shore 00 softness',
  },
  {
    id: 'mkt-proto',
    name: 'Prototyping Labs, Student EV & Hardware Builders',
    standards: 'MOQ 1 Piece • Starter Packs from ₹999',
    headline: 'Industrial-Grade Materials Accessible to Every Workbench & Startup',
    description:
      'Whether you need 2 custom-cut pads for a weekend board bring-up, a Formula Student EV accumulator firewall set, or high-durability workstation/GPU thermal strips, order online with zero MOQ gates.',
    image: '/assets/products/thermafix-bench-pack.jpg',
    recommendedProducts: ['insultherm-core', 'insultherm-ultra', 'insultherm-shield'],
    keyOutcome: 'Instant online area pricing + 10% OFF starter coupon (PROTO10)',
  },
];

export const VALIDATION_PLATES: ValidationPlate[] = [
  {
    id: 'val-fea-runaway',
    category: 'FEA Simulation',
    title: '4-Quadrant Thermal Runaway Simulation (400°C Fault Event)',
    subtitle: 'Full Uncropped Thermal Solver Output — Q1 Fault Cell vs. Q2/Q3/Q4 Neighbors',
    src: '/assets/validation/fea-runaway-400c.png',
    dimensions: '1669 × 873 px',
    badge: '74.189°C Neighbor Hold',
    metrics: [
      { label: 'Q1 Fault Cell', value: '400.0 °C' },
      { label: 'Neighbor Edge', value: '74.189 °C' },
      { label: 'AIS-156 Ceiling', value: '< 100 °C PASS' },
    ],
    description:
      'Full 4-quadrant coupled conduction simulation showing a 400°C cell runaway in Quadrant 1 arrested across a 1.50 mm InsulTherm Barrier™ wall while the bottom InsulTherm Core™ pad drains heat into the cold plate—holding adjacent cells down to 74.189°C.',
  },
  {
    id: 'val-fea-continuous',
    category: 'FEA Simulation',
    title: '4-Quadrant Continuous High-Load Simulation (180°C Source)',
    subtitle: 'Steady-State Coupled Barrier™ Isolation + Core™ Cold-Plate Draining',
    src: '/assets/validation/fea-continuous-load.png',
    dimensions: '1683 × 793 px',
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
    title: 'Prismatic Battery Module Hardware Cutaway',
    subtitle: 'Core™ Cold-Plate Base + Barrier™ Cell Walls + Shield™ Busbar Shroud',
    src: '/assets/validation/pack-cutaway-studio.jpg',
    dimensions: '1408 × 768 px',
    badge: 'Hardware Cutaway',
    metrics: [
      { label: 'Top Shroud', value: 'Shield™ 0.43 mm' },
      { label: 'Cell Walls', value: 'Barrier™ 1.50 mm' },
      { label: 'Base Pad', value: 'Core™ 1.5–2.0 mm' },
    ],
    description:
      'Physical demonstration cutaway showing how all three InsulTherm protection & thermal materials assemble inside an aluminum liquid-cooled battery module.',
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
  {
    id: 'val-ruler-kit',
    category: 'Physical Hardware',
    title: 'Millimeter-Scale Benchtop Coupon Inspection',
    subtitle: 'Physical Samples of Core™, Barrier™ & Folded Shield™ Over 30 cm Steel Rule',
    src: '/assets/products/tri-hazard-kit.jpg',
    dimensions: '1300 × 1027 px',
    badge: 'Physical QC',
    metrics: [
      { label: 'Edge Quality', value: 'Zero-Fray Cut' },
      { label: 'Hinge Fold', value: 'Crisp 90° Bend' },
      { label: 'Lead Time', value: '24–48 Hours' },
    ],
    description:
      'Unretouched benchtop scale inspection demonstrating clean digital oscillating-knife cut quality across elastomer, aerogel-mica, and scored polymer.',
  },
];
