export const CONTACT_CONFIG = {
  companyName: 'InsulTherm Innovations',
  legalDescriptor: 'Advanced Interface Materials & Digital Converting Wing',
  phoneMasked: '+91 78148 XXXXX',
  emailPrimary: 'manav.sb@inslthrm.in',
  emailOperations: 'manavsb9719@gmail.com',
  addressShort: 'Block C-14, Sanand GIDC Industrial Estate (Near iCreate Campus), Ahmedabad, Gujarat – 382110, India',
  addressFull:
    'InsulTherm Innovations, Advanced Materials & Digital Converting Wing, Block C-14, Sanand GIDC Industrial Estate (Near iCreate Campus), Ahmedabad District, Gujarat – 382110, India',
  mapCoordinates: {
    lat: 22.9916,
    lng: 72.3814,
    embedUrl:
      'https://www.openstreetmap.org/export/embed.html?bbox=72.3350%2C22.9550%2C72.4350%2C23.0250&layer=mapnik&marker=22.9916%2C72.3814',
  },
  slaTurnaround: '24–48 Hours CAD-to-Dispatch',
  toolingFee: '₹0 Hard-Tooling NRE',
};

export interface ProductVariant {
  code: string;
  name: string;
  chemistrySummary: string;
  thicknessOptions: string[];
  protoPriceLabel: string;
  volumePriceLabel: string;
  unitProtoINR: number;
  unitVolumeINR: number;
}

export interface ProductSpecRow {
  parameter: string;
  value: string;
  method: string;
}

export interface ProductLayer {
  index: string;
  title: string;
  detail: string;
  accentClass: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  rank: number;
  name: string;
  shortName: string;
  category: 'dielectric-origami' | 'fire-containment' | 'lateral-spreader' | 'vertical-tim';
  categoryLabel: string;
  revenueShare: string;
  tagline: string;
  materialBaseShort: string;
  chemistryDescription: string;
  image: string;
  secondaryImage?: string;
  imageOrigin: 'Google Drive Studio Macro' | 'Synthesized B2B Studio Macro';
  tdsUrl: string;
  tdsDocCode: string;
  accentHex: string;
  badgeColor: string;
  siliconeFreeAvailable: boolean;
  quickBadges: string[];
  keyMetrics: {
    thermalConductivity: string;
    impedanceOrFlame: string;
    dielectricStrength: string;
    operatingTemp: string;
    thicknessRange: string;
    flammability: string;
  };
  pricingTiers: {
    tierName: string;
    priceDisplay: string;
    notes: string;
  }[];
  primaryPriceHeadline: string;
  volumePriceHeadline: string;
  variants: ProductVariant[];
  layers: ProductLayer[];
  specsTable: ProductSpecRow[];
  applications: string[];
  targetSectors: string[];
}

export const CORE_PRODUCTS: ProductItem[] = [
  {
    id: 'shield',
    slug: 'insultherm-shield',
    rank: 1,
    name: 'InsulTherm Shield™',
    shortName: 'Shield™',
    category: 'dielectric-origami',
    categoryLabel: '3D Dielectric Origami',
    revenueShare: '32% Portfolio Focus',
    tagline: 'Crease-Scored 3D Dielectric Busbar Origami & 1,500V DC Isolation System',
    materialBaseShort: 'Flame-Retardant Polypropylene (Formex™ GK equiv.) / Aramid Duplex (Nomex® 410 equiv.)',
    chemistryDescription:
      'Extruded flame-retardant polypropylene or high-temperature calendered meta-aramid/PET duplex laminate, precision CNC kiss-cut with 50%-depth living hinges that snap-fold by hand in 5 seconds around complex 3D copper busbars—eliminating ₹25,000–₹60,000 plastic injection molds.',
    image: '/assets/products/insultherm-shield.jpg',
    secondaryImage: '/assets/products/tri-hazard-kit.jpg',
    imageOrigin: 'Synthesized B2B Studio Macro',
    tdsUrl: '/tds/insultherm-shield-tds.pdf',
    tdsDocCode: 'TDS-IT-SHD-101',
    accentHex: '#EA580C',
    badgeColor: 'bg-orange-600',
    siliconeFreeAvailable: true,
    quickBadges: ['>22–32 kV/mm', 'UL 94 V-0', '50%-Depth Living Hinge', '1,500V DC Rated'],
    keyMetrics: {
      thermalConductivity: '0.14 – 0.16 W/m·K (Barrier)',
      impedanceOrFlame: 'UL 94 V-0 | CTI > 600V',
      dielectricStrength: '> 22 – 32 kV/mm',
      operatingTemp: '-40°C to +115°C (FGK) / +205°C (NMX)',
      thicknessRange: '0.25 – 0.80 mm',
      flammability: 'UL 94 V-0',
    },
    pricingTiers: [
      {
        tierName: 'Prototype / Custom Folded (1–50 pcs)',
        priceDisplay: '₹45 / folded pc',
        notes: '₹0 NRE tooling fee • 24–48h dispatch from .DXF/.STEP',
      },
      {
        tierName: 'Volume Production Run',
        priceDisplay: '₹30 / pc',
        notes: '15–30 day industrial qualification • Zero mold amortization',
      },
    ],
    primaryPriceHeadline: '₹45 / folded pc (Proto 1–50 pcs)',
    volumePriceHeadline: '₹30 / pc (Volume)',
    variants: [
      {
        code: 'Shield-FGK',
        name: 'Shield-FGK (Formex™ GK-10/17 Equiv.)',
        chemistrySummary: 'Flame-retardant non-hygroscopic Polypropylene (<0.06% moisture absorption)',
        thicknessOptions: ['0.25 mm', '0.43 mm', '0.50 mm', '0.80 mm'],
        protoPriceLabel: '₹45 / folded pc (1–50 pcs)',
        volumePriceLabel: '₹30 / pc (Volume)',
        unitProtoINR: 45,
        unitVolumeINR: 30,
      },
      {
        code: 'Shield-NMX',
        name: 'Shield-NMX (Nomex® 410 Duplex Equiv.)',
        chemistrySummary: 'High-temperature calendered Aramid/Polyester duplex laminate (+205°C continuous)',
        thicknessOptions: ['0.25 mm', '0.40 mm', '0.50 mm', '0.76 mm'],
        protoPriceLabel: '₹45 / folded pc (1–50 pcs)',
        volumePriceLabel: '₹30 / pc (Volume)',
        unitProtoINR: 45,
        unitVolumeINR: 30,
      },
    ],
    layers: [
      {
        index: 'L1',
        title: 'Corona-Treated Dielectric Outer Skin',
        detail: 'Matte flame-retardant polypropylene or calendered aramid face (>22–32 kV/mm dielectric holdoff)',
        accentClass: 'bg-slate-900 text-white',
      },
      {
        index: 'L2',
        title: '50%-Depth Digital CNC Living-Hinge Score',
        detail: 'Precision ±3% depth-controlled oscillating-knife score enabling 5-second hand snap-folding (>1,000 flex cycles)',
        accentClass: 'bg-orange-600 text-white',
      },
      {
        index: 'L3',
        title: 'Non-Hygroscopic HV Core Matrix',
        detail: '0.25–0.80 mm moisture-impervious (<0.06%) UL 94 V-0 isolation barrier rated for 1,500V DC architectures',
        accentClass: 'bg-slate-700 text-white',
      },
      {
        index: 'L4',
        title: 'Optional Selective FR-PSA Mounting Strip',
        detail: 'Finger-lift PET release zone for rapid chassis or busbar retention where required',
        accentClass: 'bg-slate-500 text-white',
      },
    ],
    specsTable: [
      { parameter: 'Dielectric Breakdown Strength', value: '> 22 – 32 kV/mm', method: 'ASTM D149 / IEC 60243' },
      { parameter: 'Flammability Rating', value: 'UL 94 V-0 (Self-extinguishing)', method: 'UL 94 Vertical' },
      { parameter: 'Standard Thickness Range', value: '0.25 mm – 0.80 mm (0.43 mm std)', method: 'ASTM D374' },
      { parameter: 'Continuous Operating Temp', value: '-40°C to +115°C (FGK) / +205°C (NMX)', method: 'UL 746B / IEC 60216' },
      { parameter: 'Volume Resistivity', value: '> 1.0 × 10¹⁶ Ω·cm', method: 'ASTM D257' },
      { parameter: 'Moisture Absorption (24h)', value: '< 0.06% (Hydrophobic FGK)', method: 'ASTM D570' },
      { parameter: 'Living-Hinge Endurance', value: '50% ± 3% CNC score; >1,000 cycles', method: 'InsulTherm QC-CNC-04' },
    ],
    applications: [
      '1,500V DC solar string inverters & industrial Variable Frequency Drives (VFDs)',
      'Vande Bharat railway traction converters & Kavach signalling enclosures',
      'Grid-scale BESS 20-ft container steel tray dielectric liners & busbar shrouds',
      'EV high-voltage copper busbar collector covers & BDU arc-flash shields',
    ],
    targetSectors: ['Rail & Industrial Power', 'Grid-Scale BESS', 'EV Battery Packs'],
  },
  {
    id: 'barrier',
    slug: 'insultherm-barrier',
    rank: 2,
    name: 'InsulTherm Barrier™',
    shortName: 'Barrier™',
    category: 'fire-containment',
    categoryLabel: '1,100°C Runaway Firewalls',
    revenueShare: '26% Portfolio Focus',
    tagline: '4-Layer Phlogopite Mica + Nanoporous Silica Aerogel Thermal Runaway Firewall',
    materialBaseShort: '0.20mm Phlogopite Mica + 1.20mm Nanoporous Silica Aerogel + FR-PSA',
    chemistryDescription:
      '4-layer inter-cell thermal runaway containment composite combining a 0.20 mm calcined Phlogopite mica mineral blast shield with a 1.20 mm mesoporous silica aerogel core (k = 0.018 W/m·K) and 0.10 mm flame-retardant PSA—holding back >1,100°C direct venting flame for over 5 minutes.',
    image: '/assets/products/insultherm-barrier.jpg',
    secondaryImage: '/assets/validation/fea-runaway-400c.png',
    imageOrigin: 'Google Drive Studio Macro',
    tdsUrl: '/tds/insultherm-barrier-tds.pdf',
    tdsDocCode: 'TDS-IT-BAR-102',
    accentHex: '#DC2626',
    badgeColor: 'bg-red-600',
    siliconeFreeAvailable: false,
    quickBadges: ['k = 0.018 W/m·K', '>1,100°C (>5 min)', '>15 kV/mm', 'ARAI AIS-156 / UL 9540A'],
    keyMetrics: {
      thermalConductivity: '0.018 W/m·K @ 25°C',
      impedanceOrFlame: '> 1,100°C Direct Flame (> 5 min)',
      dielectricStrength: '> 15 kV/mm (MA1) / > 22 kV/mm (MK2)',
      operatingTemp: '-50°C to +650°C cont. / >1,100°C peak',
      thicknessRange: '1.50 mm std (1.0 – 3.0 mm)',
      flammability: 'UL 94 V-0 / AIS-156 & UL 9540A Support',
    },
    pricingTiers: [
      {
        tierName: 'Prototype / Custom CNC Sheet',
        priceDisplay: '₹110 / custom sheet',
        notes: '₹0 NRE tooling fee • Custom cell-wall & tab cutouts in 48h',
      },
      {
        tierName: 'Volume Production Run',
        priceDisplay: '₹85 / sheet',
        notes: '100% India DVA • Eliminates 30.98% imported aerogel customs uplift',
      },
    ],
    primaryPriceHeadline: '₹110 / custom sheet (Proto)',
    volumePriceHeadline: '₹85 / sheet (Volume)',
    variants: [
      {
        code: 'Barrier-MA1',
        name: 'Barrier-MA1 (Mica + Silica Aerogel + FR-PSA)',
        chemistrySummary: '0.20mm Phlogopite Mica blast face + 1.20mm Nanoporous Silica Aerogel + 0.10mm FR-PSA',
        thicknessOptions: ['1.00 mm', '1.50 mm (Std)', '2.00 mm', '3.00 mm'],
        protoPriceLabel: '₹110 / custom sheet (Proto)',
        volumePriceLabel: '₹85 / sheet (Volume)',
        unitProtoINR: 110,
        unitVolumeINR: 85,
      },
      {
        code: 'Barrier-MK2',
        name: 'Barrier-MK2 (Dual-Mica + Aerogel + Kapton® HV)',
        chemistrySummary: 'Dual-Mica encapsulated silica aerogel + Kapton® polyimide film for zero-dust HV racks',
        thicknessOptions: ['1.65 mm (Std)', '2.20 mm', '3.00 mm'],
        protoPriceLabel: '₹110 / custom sheet (Proto)',
        volumePriceLabel: '₹85 / sheet (Volume)',
        unitProtoINR: 110,
        unitVolumeINR: 85,
      },
    ],
    layers: [
      {
        index: 'L1',
        title: '0.20 mm Phlogopite Mica Flame Shield™ Face',
        detail: 'Mineral blast armor resisting >1,100°C hot particle ejection and electrolyte jet erosion',
        accentClass: 'bg-red-800 text-white',
      },
      {
        index: 'L2',
        title: '1.20 mm Nanoporous Silica Aerogel Felt Core™',
        detail: 'Mesoporous silica network (k = 0.018 W/m·K) blocking lateral heat soak; absorbs 10–25% cell swell',
        accentClass: 'bg-slate-200 text-slate-900',
      },
      {
        index: 'L3',
        title: '0.10 mm High-Temp Flame-Retardant PSA',
        detail: 'Anchors firewall vertically to prismatic LFP/NMC cell casings during stack assembly',
        accentClass: 'bg-orange-600 text-white',
      },
      {
        index: 'L4',
        title: 'Siliconized Kraft Paper / PET Release Liner',
        detail: 'Sacrificial carrier liner enabling precision digital CNC kiss-cutting without silica dust',
        accentClass: 'bg-amber-700 text-white',
      },
    ],
    specsTable: [
      { parameter: 'Thermal Conductivity @ 25°C', value: '0.018 W/m·K (0.023 @ 200°C)', method: 'ASTM C518 / D5470' },
      { parameter: 'Direct Flame Endurance', value: '> 1,100°C torch for > 5 minutes', method: 'Internal Torch / UL 9540A' },
      { parameter: 'AIS-156 Pack FEA Benchmark', value: 'Adjacent cell held at 74.189°C (<80°C)', method: '4-Quadrant Pack Validation' },
      { parameter: 'Dielectric Breakdown Strength', value: '> 15 kV/mm (MA1) / > 22 kV/mm (MK2)', method: 'ASTM D149' },
      { parameter: 'Compression Deflection', value: '10% – 25% @ 50 – 150 kPa', method: 'ASTM D575' },
      { parameter: 'Bulk Composite Density', value: '0.22 – 0.28 g/cm³', method: 'ASTM C303' },
      { parameter: 'Flammability Rating', value: 'UL 94 V-0', method: 'UL 94' },
    ],
    applications: [
      'Utility-scale 20-ft BESS containers (280Ah–314Ah prismatic LiFePO4 inter-cell firewalls)',
      'EV 2W/3W/4W traction battery modules targeting ARAI AIS-156 Amendment 3 homologation',
      'Battery pack top-lid flame deflection shields preventing aluminum enclosure burn-through',
      'Defense, aerospace, and marine lithium energy storage containment',
    ],
    targetSectors: ['Grid-Scale BESS', 'EV Battery Packs', 'Defense & Aerospace'],
  },
  {
    id: 'graphite-flex',
    slug: 'insultherm-graphite-flex',
    rank: 3,
    name: 'InsulTherm Graphite-Flex™',
    shortName: 'Graphite-Flex™',
    category: 'lateral-spreader',
    categoryLabel: 'Lateral Heat Spreaders',
    revenueShare: '15% Portfolio Focus',
    tagline: '5-Layer Edge-Sealed Pyrolytic Graphite Spreader (1,000–1,500 W/m·K | ASTM E595)',
    materialBaseShort: '0.025mm Kapton® Top Cap + Dual Pyrolytic Graphite + E-Glass Scrim + ASTM E595 PSA',
    chemistryDescription:
      'Ultra-thin 5-layer synthetic pyrolytic graphite laminate (>2,500°C carbonized hexagonal carbon planes) delivering 1,000–1,500 W/m·K in-plane lateral heat spreading (~4× copper at <25% weight), reinforced with a neutral-axis E-Glass scrim, edge-sealed >5 kV amber Kapton® cap, and 100% silicone-free ASTM E595 low-outgassing adhesive.',
    image: '/assets/products/insultherm-graphite-flex.jpg',
    imageOrigin: 'Google Drive Studio Macro',
    tdsUrl: '/tds/insultherm-graphite-flex-tds.pdf',
    tdsDocCode: 'TDS-IT-GFX-103',
    accentHex: '#D97706',
    badgeColor: 'bg-amber-600',
    siliconeFreeAvailable: true,
    quickBadges: ['1,000–1,500 W/m·K', 'ASTM E595 (TML <1%)', '>5 kV Edge-Sealed', 'Zero Silicone'],
    keyMetrics: {
      thermalConductivity: '1,000 – 1,500 W/m·K (In-Plane)',
      impedanceOrFlame: 'TML < 1.0%, CVCM < 0.1% (ASTM E595)',
      dielectricStrength: '> 5 kV (0.025 mm Kapton® Cap)',
      operatingTemp: '-55°C to +150°C (PSA) / +400°C Core',
      thicknessRange: '0.15 – 0.35 mm',
      flammability: 'UL 94 V-0',
    },
    pricingTiers: [
      {
        tierName: 'Custom CNC-Cut Part (GFlex-1000 / GFlex-1500)',
        priceDisplay: '₹350 – ₹1,800 / custom part',
        notes: 'Instant quote by area/geometry • Zero foreign MOQ • <₹200 Cr MoD GTE Ban compliant',
      },
      {
        tierName: 'Defense & SpaceTech Zero-Outgassing Kit',
        priceDisplay: '₹12,500 / turnkey kit',
        notes: 'Custom Graphite-Flex™ + Ultra-NS™ non-silicone pads + ASTM E595 trace',
      },
    ],
    primaryPriceHeadline: '₹350 – ₹1,800 / custom part',
    volumePriceHeadline: 'Instant Quote by Area (Zero MOQ)',
    variants: [
      {
        code: 'GFlex-1000',
        name: 'GFlex-1000 (Avionics, Radar & ECU Grade)',
        chemistrySummary: '0.025mm Kapton® cap + Pyrolytic Graphite (1,000 W/m·K) + E-Glass scrim + ASTM E595 PSA',
        thicknessOptions: ['0.18 mm', '0.25 mm (Std)', '0.35 mm'],
        protoPriceLabel: '₹350 – ₹1,200 / custom part',
        volumePriceLabel: 'Custom Lot Pricing (Zero MOQ)',
        unitProtoINR: 480,
        unitVolumeINR: 350,
      },
      {
        code: 'GFlex-1500',
        name: 'GFlex-1500 (LEO Satellite & Phased-Array Grade)',
        chemistrySummary: 'Ultra-thin high-crystallinity synthetic graphite stack (1,500 W/m·K) + edge-sealed Kapton®',
        thicknessOptions: ['0.15 mm', '0.22 mm'],
        protoPriceLabel: '₹650 – ₹1,800 / custom part',
        volumePriceLabel: 'Custom Lot Pricing (Zero MOQ)',
        unitProtoINR: 850,
        unitVolumeINR: 650,
      },
    ],
    layers: [
      {
        index: 'L1',
        title: '0.025 mm Translucent Amber Kapton® Polyimide Cap',
        detail: 'Edge-overlapping >5 kV dielectric shield containing microscopic conductive carbon flakes',
        accentClass: 'bg-amber-600 text-white',
      },
      {
        index: 'L2',
        title: 'Upper High-Crystallinity Pyrolytic Graphite Core',
        detail: 'Oriented SP2 hexagonal carbon planes spreading intense hotspot heat at 1,000–1,500 W/m·K',
        accentClass: 'bg-slate-900 text-white',
      },
      {
        index: 'L3',
        title: 'Center Woven E-Glass Scrim & ASTM E595 Bond Line',
        detail: 'Neutral-axis fiberglass mesh preventing brittle graphite fracture during digital CNC knife cutting',
        accentClass: 'bg-slate-100 text-slate-900',
      },
      {
        index: 'L4',
        title: 'Lower Balanced Pyrolytic Graphite Spreader Matrix',
        detail: 'Completes dual-core lateral thermal highway to chassis cold walls',
        accentClass: 'bg-slate-800 text-white',
      },
      {
        index: 'L5',
        title: '0.010 mm Silicone-Free PSA + 0.050 mm Clear PET Liner',
        detail: 'Zero siloxane outgassing (TML < 1.0%, CVCM < 0.1%); protects radar/LiDAR/optical lenses',
        accentClass: 'bg-slate-500 text-white',
      },
    ],
    specsTable: [
      { parameter: 'In-Plane Thermal Conductivity (X-Y)', value: '1,000 – 1,500 W/m·K', method: 'ASTM E1461 Laser Flash' },
      { parameter: 'Through-Plane Conductivity (Z)', value: '7.0 – 15.0 W/m·K', method: 'ASTM E1461' },
      { parameter: 'Vacuum Outgassing (Silicone-Free)', value: 'TML < 1.0% | CVCM < 0.10%', method: 'ASTM E595 (125°C, 10⁻⁵ Torr)' },
      { parameter: 'Top Dielectric Isolation', value: '> 5 kV AC (Kapton® edge-sealed)', method: 'ASTM D149' },
      { parameter: 'Graphite Specific Gravity', value: '1.95 – 2.12 g/cm³ (76% lighter than Cu)', method: 'Helium Pycnometry' },
      { parameter: 'Composite Total Thickness', value: '0.15 mm – 0.35 mm', method: 'ASTM D374' },
      { parameter: 'Defense Procurement Status', value: '100% India DVA (<₹200 Cr GTE Compliant)', method: 'Make-in-India Class I/II' },
    ],
    applications: [
      'Defense UAV flight computers & phased-array radar Transmit/Receive (T/R) modules',
      'Low-Earth-Orbit (LEO) satellite payloads & spaceborne optical sensor housings',
      'Sealed automotive ADAS camera/LiDAR ECUs & 5G/6G telecom enclosures with zero heatsink room',
      '800G / 1.6T AI data center optical transceivers',
    ],
    targetSectors: ['Defense & Aerospace', 'AI Data Centers', 'Rail & Industrial Power'],
  },
  {
    id: 'core',
    slug: 'insultherm-core',
    rank: 4,
    name: 'InsulTherm Core™',
    shortName: 'Core™',
    category: 'vertical-tim',
    categoryLabel: 'Anti-Bleed Gap Pads',
    revenueShare: '15% Portfolio Focus (Prepaid R&D)',
    tagline: '5-Layer Tropical Anti-Bleed Al2O3 Silicone Conduction TIM Pad (3.0 W/m·K)',
    materialBaseShort: 'Viscoelastic PDMS Silicone + 72% wt Silane-Passivated Spherical Al2O3 + E-Glass Scrim',
    chemistryDescription:
      '5-layer fiberglass-reinforced viscoelastic thermal interface pad compounded with 72% wt silane-passivated spherical alumina (Al2O3). Engineered specifically to survive 50°C–150°C Indian summer thermal soak with zero siloxane oil bleed or pump-out, featuring a center woven E-Glass anti-tear scrim and glove-friendly extended pull-tab.',
    image: '/assets/products/insultherm-core.jpg',
    secondaryImage: '/assets/products/insultherm-core-diecut.jpg',
    imageOrigin: 'Google Drive Studio Macro',
    tdsUrl: '/tds/insultherm-core-tds.pdf',
    tdsDocCode: 'TDS-IT-COR-104',
    accentHex: '#EA580C',
    badgeColor: 'bg-orange-600',
    siliconeFreeAvailable: false,
    quickBadges: ['k = 3.0 W/m·K', 'Rth 0.22–0.28 K·cm²/W', '40 Shore 00', '50°C Anti-Bleed'],
    keyMetrics: {
      thermalConductivity: '3.0 W/m·K',
      impedanceOrFlame: 'Rth = 0.22 – 0.28 K·cm²/W @ 20 psi',
      dielectricStrength: '> 10 – 14 kV/mm',
      operatingTemp: '-50°C to +200°C (50°C Anti-Bleed)',
      thicknessRange: '0.5 – 3.0 mm (40 Shore 00)',
      flammability: 'UL 94 V-0',
    },
    pricingTiers: [
      {
        tierName: 'Custom CNC Prototype Pad',
        priceDisplay: '₹80 / custom pad',
        notes: '₹0 NRE tooling fee • Shipped in 48h inside prepaid R&D / AIS-156 kits',
      },
      {
        tierName: 'Standard 50 × 50 mm BMS Pad',
        priceDisplay: '₹20 / std 50×50mm pad',
        notes: 'Pre-cut MOSFET & BMS shunt interface • Ready stock',
      },
      {
        tierName: 'OEM Blanket Volume (Y2 → Y3)',
        priceDisplay: '₹68 / pad (Y2) → ₹61.20 / pad (Y3)',
        notes: 'Rotary die tolling & in-house vacuum compounding schedule',
      },
    ],
    primaryPriceHeadline: '₹80 / custom pad (Proto) | ₹20 / BMS pad',
    volumePriceHeadline: '₹61.20 / pad (OEM Blanket)',
    variants: [
      {
        code: 'Core-300',
        name: 'Core-300 (3.0 W/m·K Anti-Bleed Standard)',
        chemistrySummary: 'PDMS Silicone + 72% wt Silane-Passivated Spherical Al2O3 + Center E-Glass Scrim',
        thicknessOptions: ['0.5 mm', '1.0 mm', '1.5 mm', '2.0 mm', '3.0 mm'],
        protoPriceLabel: '₹80 / custom pad | ₹20 / 50×50 BMS',
        volumePriceLabel: '₹61.20 / pad (OEM Blanket)',
        unitProtoINR: 80,
        unitVolumeINR: 61.2,
      },
      {
        code: 'Core-350D',
        name: 'Core-350D (High-Dielectric Anti-Puncture)',
        chemistrySummary: 'Reinforced woven E-Glass center scrim (>14 kV/mm) resisting machined cold-plate burrs',
        thicknessOptions: ['1.0 mm', '1.5 mm', '2.0 mm', '3.0 mm'],
        protoPriceLabel: '₹80 / custom pad (Proto)',
        volumePriceLabel: '₹61.20 / pad (OEM Blanket)',
        unitProtoINR: 80,
        unitVolumeINR: 61.2,
      },
    ],
    layers: [
      {
        index: 'L1',
        title: '0.050 mm Top Extended-Tab PET Release Liner',
        detail: 'Ergonomic pull-tab for rapid glove-friendly benchtop & pack-line placement',
        accentClass: 'bg-slate-600 text-white',
      },
      {
        index: 'L2',
        title: 'Upper Viscoelastic PDMS + 72% wt Silane-Passivated Al2O3',
        detail: '40 Shore 00 conformable matrix chemically anchored for zero 50°C–150°C oil pump-out',
        accentClass: 'bg-orange-600 text-white',
      },
      {
        index: 'L3',
        title: '0.050 mm Center Woven E-Glass Anti-Tear Scrim',
        detail: 'Prevents pad stretching, bolt-hole shear, and high-voltage burr puncture',
        accentClass: 'bg-slate-100 text-slate-900',
      },
      {
        index: 'L4',
        title: 'Lower Natural-Tack Al2O3 Conduction Matrix',
        detail: 'Wets out rough cast aluminum liquid cold plates (Rth = 0.22–0.28 K·cm²/W)',
        accentClass: 'bg-orange-500 text-white',
      },
      {
        index: 'L5',
        title: '0.075 mm Differential-Release PET Carrier Film',
        detail: 'Uncut kiss-cut base liner supporting clean multi-cavity CNC handling',
        accentClass: 'bg-slate-700 text-white',
      },
    ],
    specsTable: [
      { parameter: 'Thermal Conductivity', value: '3.0 W/m·K', method: 'ASTM D5470-17' },
      { parameter: 'Thermal Impedance @ 1mm, 20 psi', value: '0.22 – 0.28 K·cm²/W', method: 'ASTM D5470-17 Rig' },
      { parameter: 'Hardness (Conformability)', value: '40 Shore 00', method: 'ASTM D2240' },
      { parameter: 'Tropical Anti-Bleed Stability', value: 'Zero oil bleed @ 50°C–150°C (1,000h)', method: 'Tropical Aging Test' },
      { parameter: 'Dielectric Breakdown Voltage', value: '> 10 kV/mm (300) / > 14 kV/mm (350D)', method: 'ASTM D149' },
      { parameter: 'Flammability Rating', value: 'UL 94 V-0', method: 'UL 94' },
      { parameter: 'Operating Temperature Range', value: '-50°C to +200°C', method: 'IEC 60216' },
    ],
    applications: [
      'EV traction battery pack cell-to-liquid-cold-plate interfaces (AIS-156 rapid prototyping)',
      'BMS MOSFET arrays & shunt resistor cooling (Standard 50 × 50 mm @ ₹20/pad)',
      'Onboard Chargers (OBCs), DC-DC converters, and telecom rectifiers',
      'R&D Thermal Engineer Benchtop Sampler Box multi-thickness deflection coupons',
    ],
    targetSectors: ['EV Battery Packs', 'Rail & Industrial Power'],
  },
  {
    id: 'ultra',
    slug: 'insultherm-ultra',
    rank: 5,
    name: 'InsulTherm Ultra™',
    shortName: 'Ultra™',
    category: 'vertical-tim',
    categoryLabel: 'High-Flux Hybrid TIM',
    revenueShare: '12% Portfolio Focus',
    tagline: 'High-Flux Bimodal Al2O3 + Aligned h-BN Hybrid Percolation TIM Pad (5.5 W/m·K)',
    materialBaseShort: 'Functionalized Siloxane (or Non-Silicone) + 82% wt Bimodal Al2O3 (2µm+20µm) + Aligned h-BN',
    chemistryDescription:
      'Ultra-low thermal impedance (<0.15 K·cm²/W @ 20 psi) hybrid ceramic percolation TIM engineered with 82% wt bimodal spherical Al2O3 (2µm interstitial + 20µm primary) bridged by shear-aligned hexagonal Boron Nitride (h-BN) platelets in a 35 Shore 00 ultra-wetout elastomer—with a 100% non-silicone grade (Ultra-NS) for optics and AI compute.',
    image: '/assets/products/insultherm-ultra.jpg',
    imageOrigin: 'Synthesized B2B Studio Macro',
    tdsUrl: '/tds/insultherm-ultra-tds.pdf',
    tdsDocCode: 'TDS-IT-ULT-105',
    accentHex: '#059669',
    badgeColor: 'bg-emerald-600',
    siliconeFreeAvailable: true,
    quickBadges: ['k = 5.5 W/m·K', 'Rth < 0.15 K·cm²/W', '35 Shore 00 Wetout', 'Non-Silicone Opt.'],
    keyMetrics: {
      thermalConductivity: '5.5 W/m·K',
      impedanceOrFlame: 'Rth < 0.15 K·cm²/W @ 20 psi',
      dielectricStrength: '> 6.5 – 12 kV/mm',
      operatingTemp: '-55°C to +200°C (550) / +125°C (NS)',
      thicknessRange: '0.5 – 2.5 mm (35 Shore 00)',
      flammability: 'UL 94 V-0',
    },
    pricingTiers: [
      {
        tierName: 'Prototype Custom Pad (Ultra-550 / Ultra-NS)',
        priceDisplay: '₹140 / custom pad',
        notes: '₹0 NRE tooling fee • Custom SiC module & AI cold-plate footprints in 48h',
      },
      {
        tierName: 'Volume Production Run',
        priceDisplay: '₹95 / pad',
        notes: 'High-flux OEM production tier for 800V inverters & server assembly lines',
      },
    ],
    primaryPriceHeadline: '₹140 / custom pad (Proto)',
    volumePriceHeadline: '₹95 / pad (Volume)',
    variants: [
      {
        code: 'Ultra-550',
        name: 'Ultra-550 (800V SiC & AI Cold-Plate Grade)',
        chemistrySummary: 'Functionalized Siloxane + 82% wt Bimodal Al2O3 + Aligned h-BN Platelets (<100 ppm D3–D10)',
        thicknessOptions: ['0.5 mm', '1.0 mm (Std)', '1.5 mm', '2.0 mm', '2.5 mm'],
        protoPriceLabel: '₹140 / custom pad (Proto)',
        volumePriceLabel: '₹95 / pad (Volume)',
        unitProtoINR: 140,
        unitVolumeINR: 95,
      },
      {
        code: 'Ultra-NS',
        name: 'Ultra-NS (100% Non-Silicone Optical & Medical)',
        chemistrySummary: 'Zero-siloxane synthetic acrylic elastomer + Bimodal Al2O3/h-BN (0 ppm siloxane transfer)',
        thicknessOptions: ['0.5 mm', '1.0 mm', '1.5 mm', '2.0 mm'],
        protoPriceLabel: '₹140 / custom pad (Proto)',
        volumePriceLabel: '₹95 / pad (Volume)',
        unitProtoINR: 140,
        unitVolumeINR: 95,
      },
    ],
    layers: [
      {
        index: 'L1',
        title: 'Diamond-Embossed Low-Tack PET Top Liner',
        detail: 'Micro-channel texture evacuates trapped interfacial air bubbles during cold-plate seating',
        accentClass: 'bg-emerald-900 text-white',
      },
      {
        index: 'L2',
        title: '35 Shore 00 Ultra-Wetout Interfacial Skin',
        detail: 'Low-modulus conformable contact zone minimizing contact resistance at 15–25 psi',
        accentClass: 'bg-emerald-600 text-white',
      },
      {
        index: 'L3',
        title: '82% wt Bimodal Al2O3 + Aligned h-BN Percolation Core',
        detail: '2µm + 20µm alumina spheres bridged by hexagonal Boron Nitride platelets (k = 5.5 W/m·K)',
        accentClass: 'bg-emerald-400 text-emerald-950',
      },
      {
        index: 'L4',
        title: '75 µm Antistatic Release Carrier Liner',
        detail: 'Cleanroom silicone-free CNC kiss-cut backing for server & optical assembly lines',
        accentClass: 'bg-slate-700 text-white',
      },
    ],
    specsTable: [
      { parameter: 'Thermal Conductivity', value: '5.5 W/m·K', method: 'ASTM D5470-17' },
      { parameter: 'Thermal Impedance @ 20 psi', value: '< 0.15 K·cm²/W (@ 0.5–1.0 mm)', method: 'ASTM D5470-17 Rig' },
      { parameter: 'Hardness (Surface Wetout)', value: '35 Shore 00 (Ultra-soft)', method: 'ASTM D2240' },
      { parameter: 'Dielectric Breakdown Strength', value: '> 6.5 – 12.0 kV/mm', method: 'ASTM D149' },
      { parameter: 'Siloxane Volatility (D3–D10)', value: '< 100 ppm (550) | 0 ppm (Ultra-NS)', method: 'GC-MS Headspace' },
      { parameter: 'Specific Gravity', value: '3.15 ± 0.10 g/cm³', method: 'ASTM D792' },
      { parameter: 'Flammability Rating', value: 'UL 94 V-0', method: 'UL 94' },
    ],
    applications: [
      '100kW+ AI server liquid cold plates & high-TDP GPU/ASIC compute blocks',
      '800V Silicon-Carbide (SiC) IGBT & MOSFET modules (TO-247, EconoDUAL, PrimePACK)',
      '800G coherent optical transceivers & laser pump modules (Ultra-NS zero-silicone)',
      'MRI gradient amplifiers & precision medical power electronics',
    ],
    targetSectors: ['AI Data Centers', 'Rail & Industrial Power', 'Defense & Aerospace'],
  },
];

export interface HardwareBundle {
  id: string;
  title: string;
  badge: string;
  pricePrimary: string;
  priceSecondary?: string;
  includedIPs: string[];
  contents: string;
  valueProp: string;
}

export const TURNKEY_BUNDLES: HardwareBundle[] = [
  {
    id: 'bundle-ais156',
    title: 'ARAI AIS-156 Rapid Homologation Pack Kit',
    badge: '48-Hr Dispatch • Petty-Cash Ready',
    pricePrimary: '₹14,500 (Full Pack Kit)',
    priceSecondary: '₹3,499 (Sub-Module Starter)',
    includedIPs: ['InsulTherm Core™', 'InsulTherm Barrier™', 'InsulTherm Shield™'],
    contents:
      'Custom CAD-cut Core™ bottom cold-plate pads + Barrier™ (1,100°C mica-aerogel inter-cell dividers) + Shield™ snap-fit busbar covers + batch-specific ASTM D5470 & UL 94 V-0 test dossier.',
    valueProp:
      'Upload one .STEP/.DXF pack assembly; receive every layer pre-cut, numbered, and ready for ARAI AIS-156 destructive validation in 48 hours.',
  },
  {
    id: 'bundle-sampler',
    title: "R&D Thermal Engineer's Benchtop Sampler Box",
    badge: 'Most Popular • Day-1 Clamping Test',
    pricePrimary: '₹9,800 (Full Multi-IP Lab Chest)',
    priceSecondary: '₹1,499 (Mini Coupon Pack)',
    includedIPs: ['InsulTherm Core™', 'InsulTherm Ultra™', 'InsulTherm Shield™', 'InsulTherm Graphite-Flex™'],
    contents:
      '20 Core™ thickness coupons (1.0, 1.5, 2.0, 3.0 mm), 5 Ultra™ high-flux 5.5 W/m·K pads, 5 Shield™ living-hinge busbar prototypes, and 2 Graphite-Flex™ lateral spreader strips.',
    valueProp:
      'Characterize clamping deflection, busbar clearances, and steady-state thermal resistance on your lab bench within 48 hours—below the ₹15,000 departmental card ceiling.',
  },
  {
    id: 'bundle-defense',
    title: 'Defense, Avionics & SpaceTech Zero-Outgassing Kit',
    badge: '<₹200 Cr GTE Ban • ASTM E595',
    pricePrimary: '₹12,500 (Avionics Lab Kit)',
    includedIPs: ['InsulTherm Graphite-Flex™', 'InsulTherm Ultra™ (Ultra-NS)'],
    contents:
      'Custom CNC-cut edge-sealed Graphite-Flex™ spreaders (1,000–1,500 W/m·K) + 100% non-silicone Ultra-NS™ pads + ASTM E595 outgassing trace (TML < 1.0%, CVCM < 0.1%).',
    valueProp:
      'Eliminates 8-week foreign MOQs ($3,000+) and prevents siloxane lens fogging inside radar T/R modules, UAV flight computers, and LEO satellite payloads.',
  },
  {
    id: 'bundle-power',
    title: 'Power Electronics, Rail & BMS Isolation Kit',
    badge: '1,500V DC • SiC & Busbar Ready',
    pricePrimary: '₹7,500 (Inverter Line Pack)',
    priceSecondary: '₹999 (25-Piece BMS Pack)',
    includedIPs: ['InsulTherm Shield™', 'InsulTherm Ultra™', 'InsulTherm Core™'],
    contents:
      'Pre-slit TO-247 / EconoDUAL SiC IGBT baseplate pads (Core-350D™ & Ultra™) + crease-scored Nomex® 410 / Formex™ GK living-hinge busbar sleeves.',
    valueProp:
      'Built for solar string inverters, Vande Bharat traction converters, VFDs, and high-voltage BMS assemblies with ₹0 injection-mold tooling.',
  },
];

export const SECTOR_SOLUTIONS = [
  {
    id: 'bess',
    tabLabel: 'Grid-Scale BESS (30%)',
    title: 'Grid-Scale Battery Energy Storage Systems (BESS) & Stationary Racks',
    allocation: '30% Strategic Revenue Share',
    primaryIPs: ['InsulTherm Barrier™', 'InsulTherm Shield™'],
    headlineMetric: '1,100°C Direct Flame Hold • 1,500V DC Isolation',
    challenge:
      'Utility-scale 20-ft BESS containers pack thousands of 280Ah–314Ah prismatic LiFePO4 cells tightly into 1,500V DC racks. Automated liquid gap-filler robots cannot dispense vertical inter-cell firewalls, while imported aerogel sheets incur a 30.98% gross border cash tariff uplift and 6-week sea delays.',
    solution:
      'InsulTherm Barrier™ (1.50 mm Phlogopite Mica + Nanoporous Silica Aerogel, k = 0.018 W/m·K) sits vertically between cells to block >1,100°C thermal runaway propagation for >5 minutes, paired with crease-scored InsulTherm Shield™ tray liners and DC busbar shrouds.',
    image: '/assets/products/insultherm-barrier.jpg',
    imageCaption: 'InsulTherm Barrier™ 4-layer Phlogopite Mica + Silica Aerogel cross-section (1.50 mm)',
    benchmarks: ['100% Domestic Value Addition (SECI Tender Ready)', '15–120 m²/MWh Nested Kit Supply', 'Zero Silica Dust Shedding'],
  },
  {
    id: 'rail-power',
    tabLabel: 'Rail & Power Electronics (30%)',
    title: 'Rail Propulsion, 1,500V Solar Inverters & Industrial Drives',
    allocation: '30% Strategic Revenue Share',
    primaryIPs: ['InsulTherm Shield™', 'InsulTherm Ultra™'],
    headlineMetric: '>22–32 kV/mm Origami • ₹0 Plastic Mold NRE',
    challenge:
      'Inside 1,500V DC solar string inverters, VFDs, and railway traction converters, heavy laminated copper busbars carry hundreds of amps millimeters from grounded aluminum walls. Modifying a busbar layout normally triggers ₹25,000–₹60,000 in plastic mold/stamping die fees and 4–6 week delays.',
    solution:
      'We convert customer .DXF/.STEP files directly on our digital CNC oscillating-knife table with 50%-depth living-hinge scores—shipping snap-fit Formex™ GK / Nomex® 410 busbar origami in 48 hours alongside Ultra™ (5.5 W/m·K) pads for SiC IGBT baseplates.',
    image: '/assets/products/insultherm-shield.jpg',
    imageCaption: 'InsulTherm Shield™ 50%-depth CNC crease-scored 3D busbar shroud with mechanical corner snap-locks',
    benchmarks: ['5-Second Hand Assembly via Living Hinges', 'UL 94 V-0 Flame Retardant', '15–30 Day Fast Industrial Qualification'],
  },
  {
    id: 'defense-ai',
    tabLabel: 'Defense, Space & AI Compute (25%)',
    title: 'Defense Avionics, SpaceTech Payloads & 100kW+ AI Liquid Cooling',
    allocation: '25% Strategic Revenue Share',
    primaryIPs: ['InsulTherm Graphite-Flex™', 'InsulTherm Ultra™ (Ultra-NS)'],
    headlineMetric: '1,000–1,500 W/m·K Lateral • ASTM E595 Zero-Outgassing',
    challenge:
      'UAV flight computers, phased-array radar T/R modules, and LEO satellites have zero vertical clearance for heavy heatsinks and strictly prohibit volatile siloxane oil fogging on optical/RF hardware—while India’s <₹200 Cr GTE ban restricts foreign imports.',
    solution:
      'InsulTherm Graphite-Flex™ spreads scorching hotspot flux laterally at 1,000–1,500 W/m·K (~4× copper) with an edge-sealed >5 kV amber Kapton® cap and ASTM E595 acrylic PSA, while Ultra™ (5.5 W/m·K, Rth < 0.15 K·cm²/W) cools 100kW+ AI server cold plates and 800G optical transceivers.',
    image: '/assets/products/insultherm-graphite-flex.jpg',
    imageCaption: 'InsulTherm Graphite-Flex™ 5-layer edge-sealed Kapton® + pyrolytic graphite + E-glass scrim macro stack',
    benchmarks: ['TML < 1.0%, CVCM < 0.1% (ASTM E595)', '<₹200 Cr MoD GTE Ban Compliant', 'Zero Conductive Carbon Edge Flaking'],
  },
  {
    id: 'ev-homologation',
    tabLabel: 'EV R&D & AIS-156 Packs (15%)',
    title: 'Agile EV & Drone Battery R&D Homologation (ARAI AIS-156)',
    allocation: '15% Capped Prepaid R&D Lane',
    primaryIPs: ['InsulTherm Core™', 'InsulTherm Barrier™', 'InsulTherm Shield™'],
    headlineMetric: '74.189°C Adjacent Cell Hold (<80°C Cascade Limit)',
    challenge:
      'EV battery R&D teams iterating cell spacing days before mandatory ARAI AIS-156 thermal runaway testing face 6-week import lead times—and standard silicone pads suffer severe oil pump-out in 50°C Indian summer soak conditions.',
    solution:
      'Delivered via <₹15,000 turnkey homologation kits in 48 hours: Core™ (3.0 W/m·K silane-passivated anti-bleed pad) drains heat into bottom liquid cold plates, Barrier™ blocks lateral cell-to-cell fire, and Shield™ isolates high-voltage copper busbars.',
    image: '/assets/validation/fea-runaway-400c.png',
    imageCaption: 'Autodesk Fusion 4-Quadrant Thermal Runaway FEA: 400°C runaway cell vs. 74.189°C protected adjacent cell',
    benchmarks: ['50°C–150°C 1,000-Hr Anti-Bleed Matrix', '4-Quadrant FEA Validated (<80°C Limit)', 'Prepaid Lab-Card Petty-Cash Ready'],
  },
];

export const CERTIFICATIONS_LIST = [
  {
    code: 'ASTM D5470-17',
    title: 'Steady-State Thermal Transmission & Impedance',
    scope: 'In-house steady-state thermal impedance calibration rig verifying Rth vs. clamping pressure (10–50 psi) across Core™ and Ultra™ batches.',
    status: 'In-House Rig Active • Batch Traceable',
  },
  {
    code: 'UL 94 V-0',
    title: 'Vertical Flame Retardancy Standard',
    scope: 'Self-extinguishing, non-dripping flame retardancy benchmark across Shield™, Barrier™, Core™, Graphite-Flex™, and Ultra™ formulations.',
    status: 'Material Grade Verified',
  },
  {
    code: 'ARAI AIS-156 (Amend. 3)',
    title: 'EV Traction Pack Thermal Propagation Containment',
    scope: 'Tri-Hazard Pack system (Core™ + Barrier™ + Shield™) engineered to hold adjacent cells at 74.189°C (<80°C cascade threshold) for 5-minute warning compliance.',
    status: 'Pack Homologation Kit Ready',
  },
  {
    code: 'ASTM E595',
    title: 'Space & Defense Vacuum Low-Outgassing',
    scope: 'Total Mass Loss (TML) < 1.0% and Collected Volatile Condensable Materials (CVCM) < 0.10% on silicone-free Graphite-Flex™ and Ultra-NS™ grades.',
    status: 'Zero-Siloxane Avionics Grade',
  },
  {
    code: 'UL 9540A Support',
    title: 'BESS Cell & Module Fire Propagation Mitigation',
    scope: 'InsulTherm Barrier™ (>1,100°C direct flame hold >5 min, k = 0.018 W/m·K) custom-nested to integrator module/rack fire test plans.',
    status: 'Integrator Pilot & Kit Ready',
  },
  {
    code: 'ASTM D149 / IEC 60243',
    title: 'High-Voltage Dielectric Breakdown Strength',
    scope: 'Verified >22–32 kV/mm on Shield™ living-hinge busbar origami, >15 kV/mm on Barrier™, and >5 kV on edge-sealed Graphite-Flex™.',
    status: '1,500V DC Architecture Rated',
  },
  {
    code: '100% India DVA / GTE',
    title: 'Sovereign Domestic Converting & HSN Traceability',
    scope: 'Compliant with PM E-DRIVE DVA rules, SECI BESS domestic content, and MoD <₹200 Cr Global Tender Enquiry (GTE) ban (HSN 39199090 / 85479090).',
    status: 'Gujarat Manufacturing Declaration',
  },
  {
    code: 'AS9100D / ISO 13485',
    title: 'Aerospace & Medical Cleanroom Roadmap',
    scope: 'Phased quality management progression funded via multi-sector cash flows: NABL third-party pack dossiers (M12) → ISO 9001 → AS9100D & ISO 13485 (Y3–Y5).',
    status: 'Phase 3–5 Certification Ladder',
  },
];

export const COMPETITOR_BENCHMARK = [
  {
    parameter: 'Tooling Setup Fee (NRE)',
    globalIncumbents: '₹25,000 – ₹60,000 (Steel Stamping / Injection Mold)',
    regionalConverters: '₹15,000 – ₹25,000 (Hard Punch Die)',
    insultherm: '₹0 (100% Digital CNC Oscillating Knife)',
  },
  {
    parameter: 'Prototype Delivery Turnaround',
    globalIncumbents: '4 to 8 Weeks (Overseas Freight + Customs)',
    regionalConverters: '1 to 2 Weeks (Die Fabrication)',
    insultherm: '24 to 48 Hours (Direct .DXF/.STEP to Part)',
  },
  {
    parameter: 'Minimum Order Quantity (MOQ)',
    globalIncumbents: '500 – 1,000 pcs / Master Rolls ($3,000+)',
    regionalConverters: '200 – 500 pcs (Die Setup Minimum)',
    insultherm: 'Zero MOQ (Order 1 Prototype or 50,000 Units)',
  },
  {
    parameter: '50°C Indian Climate Stability',
    globalIncumbents: 'Standard grades prone to siloxane oil pump-out',
    regionalConverters: 'Unverified commodity grey-market imports',
    insultherm: 'Silane-Passivated 50°C–150°C Anti-Bleed Matrix',
  },
  {
    parameter: 'Border Tariff & Sovereign DVA',
    globalIncumbents: '+30.98% Gross Customs Cash Uplift; Restricted in <₹200Cr GTE',
    regionalConverters: 'No ASTM D5470 / E595 lot traceability',
    insultherm: '100% Domestic Converting & Batch Test Dossiers',
  },
  {
    parameter: '3D Busbar & Runaway Integration',
    globalIncumbents: 'Separate single-material catalog silos',
    regionalConverters: 'Flat punch-cutting only (flaking on graphite)',
    insultherm: 'Unified 5-IP Stack (Origami + 1,100°C Firewall + TIMs)',
  },
];
