export type ProductSlugId =
  | 'insultherm-shield'
  | 'insultherm-barrier'
  | 'insultherm-graphite-flex'
  | 'insultherm-core'
  | 'insultherm-ultra';

export interface AreaPriceResult {
  areaCm2: number;
  unitPriceInr: number;
  effectiveRatePerCm2: number;
  lineSubtotalInr: number;
  tierName: string;
  formulaExplanation: string;
  nreFeeInr: 0;
  traditionalDieSavingsInr: number;
}

export interface ProductPricingModel {
  productId: ProductSlugId;
  referenceFootprintLabel: string;
  referenceAreaCm2: number;
  protoReferenceHeadline: string;
  pilotRateHeadline: string;
  volumeRateHeadline: string;
  competitorEdgeHeadline: string;
  areaTiersSummary: {
    band: string;
    exampleSize: string;
    protoRule: string;
    pilotRule: string;
    volumeRule: string;
  }[];
  thicknessOptions: { label: string; mm: number; multiplier: number }[];
  gradeOptions: { sku: string; label: string; multiplier: number }[];
}

export const PRICING_MODELS: Record<ProductSlugId, ProductPricingModel> = {
  'insultherm-shield': {
    productId: 'insultherm-shield',
    referenceFootprintLabel: '100 × 100 mm flat pattern (100 cm² folded busbar sleeve)',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹45.00 / pc @ 100 cm² (₹0.45/cm², min ₹25)',
    pilotRateHeadline: '₹35.00 / pc @ 100 cm² (100–499 pcs)',
    volumeRateHeadline: '₹30.00 / pc @ 100 cm² (500+ pcs OEM Blanket)',
    competitorEdgeHeadline: 'Up to 50% lower than ₹90–₹200 prototype imports + ₹0 mold NRE',
    areaTiersSummary: [
      {
        band: 'Compact Terminal / Tab Shroud (≤ 55 cm²)',
        exampleSize: 'e.g. 50 × 80 mm (40 cm²)',
        protoRule: '₹25.00 / pc (min CNC setup floor)',
        pilotRule: '₹20.00 / pc (100–499 pcs)',
        volumeRule: '₹0.30 / cm² (min ₹16.00 / pc)',
      },
      {
        band: 'Standard 3D Busbar Sleeve (56 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹0.45 / cm² → ₹45.00 / pc',
        pilotRule: '₹0.35 / cm² → ₹35.00 / pc',
        volumeRule: '₹0.30 / cm² → ₹30.00 / pc',
      },
      {
        band: '1,500V BESS / Rail Collector Liner (> 150 cm²)',
        exampleSize: 'e.g. 300 × 200 mm (600 cm²)',
        protoRule: '₹0.42 / cm² flat pattern + hinge score',
        pilotRule: '₹0.33 / cm² nested sheet area',
        volumeRule: '₹0.28 / cm² OEM blanket area',
      },
    ],
    thicknessOptions: [
      { label: '0.25 mm (Compact PCB / BMS)', mm: 0.25, multiplier: 0.92 },
      { label: '0.43 mm (Std EV/BESS Living-Hinge)', mm: 0.43, multiplier: 1.0 },
      { label: '0.50 mm (Aramid High-Temp)', mm: 0.5, multiplier: 1.08 },
      { label: '0.80 mm (Heavy Switchgear)', mm: 0.8, multiplier: 1.28 },
    ],
    gradeOptions: [
      { sku: 'Shield-FGK-043', label: 'Shield-FGK (Formex™ GK-17 Equiv. PP, Matte Black)', multiplier: 1.0 },
      { sku: 'Shield-NMX-050', label: 'Shield-NMX (Nomex® 410 Equiv. Aramid Duplex)', multiplier: 1.15 },
    ],
  },

  'insultherm-barrier': {
    productId: 'insultherm-barrier',
    referenceFootprintLabel: '100 × 100 mm cell firewall (100 cm² reference)',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹110.00 / sheet @ 100 cm² (₹1.10/cm², min ₹55)',
    pilotRateHeadline: '₹95.00 / sheet @ 100 cm² (100–499 pcs)',
    volumeRateHeadline: '₹85.00 / sheet @ 100 cm² (500+ pcs OEM Blanket)',
    competitorEdgeHeadline: '50% lower than ₹220–₹480 imported aerogel sheets + 100% India DVA',
    areaTiersSummary: [
      {
        band: 'Compact Cylindrical / Pouch Spacer (≤ 50 cm²)',
        exampleSize: 'e.g. 65 × 70 mm (45.5 cm²)',
        protoRule: '₹55.00 / sheet (min dust-sealed floor)',
        pilotRule: '₹46.00 / sheet (100–499 pcs)',
        volumeRule: '₹0.85 / cm² (min ₹40.00 / sheet)',
      },
      {
        band: 'Standard EV Prismatic Cell (51 – 160 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹1.10 / cm² → ₹110.00 / sheet',
        pilotRule: '₹0.95 / cm² → ₹95.00 / sheet',
        volumeRule: '₹0.85 / cm² → ₹85.00 / sheet',
      },
      {
        band: '280Ah / 314Ah Grid BESS Cell (> 160 cm²)',
        exampleSize: 'e.g. 174 × 204 mm (355 cm²)',
        protoRule: '₹1.05 / cm² (₹372.75 / 280Ah sheet)',
        pilotRule: '₹0.90 / cm² (₹319.50 / 280Ah sheet)',
        volumeRule: '₹0.80 / cm² (₹284.00 / 280Ah sheet)',
      },
    ],
    thicknessOptions: [
      { label: '1.50 mm (Std Aerogel-Mica Firewall)', mm: 1.5, multiplier: 1.0 },
      { label: '1.65 mm (Dual-Mica + Kapton® HV)', mm: 1.65, multiplier: 1.12 },
      { label: '2.00 mm (Extended 1,200°C Hold)', mm: 2.0, multiplier: 1.25 },
    ],
    gradeOptions: [
      { sku: 'Barrier-MA1-150', label: 'Barrier-MA1 (0.20mm Mica + 1.20mm Aerogel + FR-PSA)', multiplier: 1.0 },
      { sku: 'Barrier-MK2-165', label: 'Barrier-MK2 (Dual-Mica + Aerogel + Kapton® Seal)', multiplier: 1.12 },
    ],
  },

  'insultherm-graphite-flex': {
    productId: 'insultherm-graphite-flex',
    referenceFootprintLabel: '50 × 50 mm (25 cm² = ₹350) to 150 × 150 mm (225 cm² = ₹1,800)',
    referenceAreaCm2: 25,
    protoReferenceHeadline: '₹350.00 (50×50mm) to ₹1,800.00 (150×150mm)',
    pilotRateHeadline: '₹310.00 (50×50mm) to ₹1,650.00 (150×150mm)',
    volumeRateHeadline: '₹280.00 (50×50mm) to ₹1,500.00 (150×150mm Blanket)',
    competitorEdgeHeadline: '43.8%–46.2% lower than imported spreaders + <₹200 Cr GTE compliant',
    areaTiersSummary: [
      {
        band: 'Standard UAV / Radar / Optical Spreader (≤ 25 cm²)',
        exampleSize: '50 × 50 mm (25 cm² ref.)',
        protoRule: '₹350.00 / part (Edge-sealed Kapton®)',
        pilotRule: '₹310.00 / part (100–499 pcs)',
        volumeRule: '₹280.00 / part (500+ pcs)',
      },
      {
        band: 'Mid-Area Avionics / ADAS ECU Plane (26 – 150 cm²)',
        exampleSize: 'e.g. 100 × 100 mm (100 cm²)',
        protoRule: '₹350 + ₹7.25/cm² above 25 cm² (₹893.75)',
        pilotRule: '₹310 + ₹6.70/cm² above 25 cm² (₹812.50)',
        volumeRule: '₹280 + ₹6.10/cm² above 25 cm² (₹737.50)',
      },
      {
        band: 'Large Defense / Satellite Payload Plane (151 – 300+ cm²)',
        exampleSize: '150 × 150 mm (225 cm² ref.)',
        protoRule: '₹1,800.00 @ 225 cm² (+₹6.80/cm² above)',
        pilotRule: '₹1,650.00 @ 225 cm² (+₹6.20/cm² above)',
        volumeRule: '₹1,500.00 @ 225 cm² (+₹5.60/cm² above)',
      },
    ],
    thicknessOptions: [
      { label: '0.15 mm (Ultra-Thin Kapton-Capped)', mm: 0.15, multiplier: 0.95 },
      { label: '0.24 mm (Std Dual-Graphite + Scrim)', mm: 0.24, multiplier: 1.0 },
      { label: '0.35 mm (High-Mass Lateral Plane)', mm: 0.35, multiplier: 1.18 },
    ],
    gradeOptions: [
      { sku: 'GFlex-1000', label: 'GFlex-1000 (1,000 W/m·K Edge-Sealed ASTM E595)', multiplier: 1.0 },
      { sku: 'GFlex-1500', label: 'GFlex-1500 (1,500 W/m·K Satellite / Phased-Array Grade)', multiplier: 1.25 },
    ],
  },

  'insultherm-core': {
    productId: 'insultherm-core',
    referenceFootprintLabel: '100 × 100 mm pad (100 cm² = ₹80) | Std 50 × 50 mm = ₹20',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹80.00 / 100 cm² custom pad | ₹20.00 / std 50×50mm',
    pilotRateHeadline: '₹68.00 / 100 cm² pad | ₹18.50 / std 50×50mm',
    volumeRateHeadline: '₹61.20 / 100 cm² pad | ₹17.00 / std 50×50mm Blanket',
    competitorEdgeHeadline: '55.6% lower in prototype (₹0 steel die) & 15%–29% lower in volume',
    areaTiersSummary: [
      {
        band: 'Standard Pre-Cut 50 × 50 mm BMS Pad (25 cm²)',
        exampleSize: 'Exact 50 × 50 × 1.0/1.5 mm stock SKU',
        protoRule: '₹20.00 / pad (1–99 pcs)',
        pilotRule: '₹18.50 / pad (100–499 pcs)',
        volumeRule: '₹17.00 / pad (500+ pcs)',
      },
      {
        band: 'Custom CNC Module Gap Pad (1 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹0.80 / cm² → ₹80.00 / pad (min ₹35)',
        pilotRule: '₹0.68 / cm² → ₹68.00 / pad (min ₹28)',
        volumeRule: '₹0.612 / cm² → ₹61.20 / pad (min ₹24)',
      },
      {
        band: 'Large EV Cold-Plate Base Pad (> 150 cm²)',
        exampleSize: 'e.g. 250 × 160 mm (400 cm²)',
        protoRule: '₹0.76 / cm² (₹304.00 / 400 cm² pad)',
        pilotRule: '₹0.65 / cm² (₹260.00 / 400 cm² pad)',
        volumeRule: '₹0.59 / cm² nested rotary sheet',
      },
    ],
    thicknessOptions: [
      { label: '0.5 mm (Low-Impedance Thin)', mm: 0.5, multiplier: 0.85 },
      { label: '1.0 mm (Standard BMS / Inverter)', mm: 1.0, multiplier: 1.0 },
      { label: '1.5 mm (Standard EV Cold-Plate)', mm: 1.5, multiplier: 1.0 },
      { label: '2.0 mm (High Gap Deflection)', mm: 2.0, multiplier: 1.2 },
      { label: '3.0 mm (Cast Housing Compliance)', mm: 3.0, multiplier: 1.45 },
    ],
    gradeOptions: [
      { sku: 'Core-300', label: 'Core-300 (3.0 W/m·K Anti-Bleed + E-Glass Scrim)', multiplier: 1.0 },
      { sku: 'Core-350D', label: 'Core-350D (>14 kV/mm Heavy Dielectric Scrim)', multiplier: 1.1 },
      { sku: 'Core-BMS-50x50', label: 'Core-BMS-50x50 (Std Pre-Cut 50×50mm Pad @ ₹20→₹17)', multiplier: 1.0 },
    ],
  },

  'insultherm-ultra': {
    productId: 'insultherm-ultra',
    referenceFootprintLabel: '100 × 100 mm 800V SiC / AI h-BN pad (100 cm² = ₹140)',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹140.00 / pad @ 100 cm² (₹1.40/cm², min ₹50)',
    pilotRateHeadline: '₹110.00 / pad @ 100 cm² (100–499 pcs)',
    volumeRateHeadline: '₹95.00 / pad @ 100 cm² (500+ pcs OEM Blanket)',
    competitorEdgeHeadline: '50% lower than ₹280–₹650 prototype imports & 17.4% lower in volume',
    areaTiersSummary: [
      {
        band: 'Discrete TO-247 / Optical Module Pad (≤ 35 cm²)',
        exampleSize: 'e.g. 40 × 50 mm (20 cm²)',
        protoRule: '₹50.00 / pad (min precision CNC floor)',
        pilotRule: '₹38.00 / pad (100–499 pcs)',
        volumeRule: '₹0.95 / cm² (min ₹32.00 / pad)',
      },
      {
        band: '800V SiC / AI Cold-Plate Pad (36 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹1.40 / cm² → ₹140.00 / pad',
        pilotRule: '₹1.10 / cm² → ₹110.00 / pad',
        volumeRule: '₹0.95 / cm² → ₹95.00 / pad',
      },
      {
        band: 'Full Server / Traction Baseplate (> 150 cm²)',
        exampleSize: 'e.g. 200 × 150 mm (300 cm²)',
        protoRule: '₹1.32 / cm² (₹396.00 / 300 cm² pad)',
        pilotRule: '₹1.04 / cm² (₹312.00 / 300 cm² pad)',
        volumeRule: '₹0.90 / cm² OEM blanket rotary run',
      },
    ],
    thicknessOptions: [
      { label: '0.5 mm (Ultra-Low <0.15 K·cm²/W)', mm: 0.5, multiplier: 0.9 },
      { label: '1.0 mm (Std AI GPU / SiC Cold Plate)', mm: 1.0, multiplier: 1.0 },
      { label: '1.5 mm (IGBT Baseplate Conformable)', mm: 1.5, multiplier: 1.12 },
      { label: '2.0 mm (Deep Tolerance Stack)', mm: 2.0, multiplier: 1.28 },
    ],
    gradeOptions: [
      { sku: 'Ultra-550', label: 'Ultra-550 (5.5 W/m·K Bimodal Al2O3 + Aligned h-BN)', multiplier: 1.0 },
      { sku: 'Ultra-NS', label: 'Ultra-NS (100% Siloxane-Free Optical / Space Grade)', multiplier: 1.08 },
    ],
  },
};

export function calculatePartPrice(params: {
  productId: ProductSlugId;
  lengthMm: number;
  widthMm: number;
  quantity: number;
  thicknessMm?: number;
  gradeSku?: string;
}): AreaPriceResult {
  const { productId, quantity } = params;
  const lengthMm = Math.max(10, Math.min(1000, Number(params.lengthMm) || 100));
  const widthMm = Math.max(10, Math.min(1000, Number(params.widthMm) || 100));
  const qty = Math.max(1, Math.round(Number(quantity) || 1));
  const areaCm2 = Number(((lengthMm * widthMm) / 100).toFixed(2));

  const model = PRICING_MODELS[productId];
  const thicknessObj =
    (params.thicknessMm != null
      ? model.thicknessOptions.find((t) => Math.abs(t.mm - params.thicknessMm!) < 0.05)
      : undefined) ||
    model.thicknessOptions.find((t) => t.multiplier === 1.0) ||
    model.thicknessOptions[0];
  const gradeObj =
    model.gradeOptions.find((g) => g.sku === params.gradeSku) || model.gradeOptions[0];

  const combinedMult = thicknessObj.multiplier * gradeObj.multiplier;
  const isPilot = qty >= 100 && qty < 500;
  const isBlanket = qty >= 500;

  let rawUnit = 0;
  let tierName = isBlanket
    ? 'Tier 3 — OEM Blanket Volume (500+ pcs)'
    : isPilot
    ? 'Tier 2 — Pilot Production Transition (100–499 pcs)'
    : 'Tier 1 — Rapid CNC Prototype (1–99 pcs, ₹0 NRE)';
  let formulaExplanation = '';

  // Special exact SKU shortcut: Core-BMS-50x50 at 50x50mm (₹20 -> ₹18.50 -> ₹17.00 per very imp.pdf)
  if (
    productId === 'insultherm-core' &&
    (gradeObj.sku === 'Core-BMS-50x50' ||
      (Math.abs(lengthMm - 50) <= 2 && Math.abs(widthMm - 50) <= 2 && thicknessObj.mm <= 1.5))
  ) {
    rawUnit = isBlanket ? 17.0 : isPilot ? 18.5 : 20.0;
    tierName = isBlanket
      ? 'Std 50×50 mm BMS SKU — OEM Blanket (500+ pcs)'
      : isPilot
      ? 'Std 50×50 mm BMS SKU — Pilot Tier (100–499 pcs)'
      : 'Std 50×50 mm BMS SKU — Prototype Tier (1–99 pcs)';
    formulaExplanation = `Standard 50 × 50 mm (25.0 cm²) BMS pad @ ₹${rawUnit.toFixed(2)}/pad`;
  } else if (productId === 'insultherm-graphite-flex') {
    // Exact calibration to very imp.pdf:
    // 50x50mm (25 cm2): ₹350 (Proto) -> ₹310 (Pilot) -> ₹280 (Blanket)
    // 150x150mm (225 cm2): ₹1,800 (Proto) -> ₹1,650 (Pilot) -> ₹1,500 (Blanket)
    const base25 = isBlanket ? 280 : isPilot ? 310 : 350;
    const slopeTo225 = isBlanket ? 6.1 : isPilot ? 6.7 : 7.25;
    const slopeAbove225 = isBlanket ? 5.6 : isPilot ? 6.2 : 6.8;

    let base1000 = base25;
    if (areaCm2 <= 25) {
      base1000 = base25;
      formulaExplanation = `${areaCm2} cm² (≤25 cm² edge-sealed spreader) = ₹${base25.toFixed(2)} base`;
    } else if (areaCm2 <= 225) {
      base1000 = base25 + (areaCm2 - 25) * slopeTo225;
      formulaExplanation = `₹${base25} (25 cm²) + ${(areaCm2 - 25).toFixed(1)} cm² × ₹${slopeTo225.toFixed(2)}/cm²`;
    } else {
      const at225 = base25 + 200 * slopeTo225;
      base1000 = at225 + (areaCm2 - 225) * slopeAbove225;
      formulaExplanation = `₹${at225.toFixed(0)} (225 cm²) + ${(areaCm2 - 225).toFixed(1)} cm² × ₹${slopeAbove225.toFixed(2)}/cm²`;
    }
    rawUnit = base1000 * combinedMult;
    if (combinedMult !== 1) {
      formulaExplanation += ` × ${combinedMult.toFixed(2)} (${gradeObj.sku} / ${thicknessObj.mm}mm)`;
    }
  } else if (productId === 'insultherm-shield') {
    // ₹45 -> ₹35 -> ₹30 at 100 cm2
    const baseRate = isBlanket
      ? areaCm2 > 150
        ? 0.28
        : 0.3
      : isPilot
      ? areaCm2 > 150
        ? 0.33
        : 0.35
      : areaCm2 > 150
      ? 0.42
      : 0.45;
    const minFloor = isBlanket ? 16 : isPilot ? 20 : 25;
    const rate = baseRate * combinedMult;
    rawUnit = Math.max(minFloor, areaCm2 * rate);
    formulaExplanation = `${areaCm2} cm² flat pattern × ₹${rate.toFixed(2)}/cm² (min ₹${minFloor}/pc)`;
  } else if (productId === 'insultherm-barrier') {
    // ₹110 -> ₹95 -> ₹85 at 100 cm2
    const baseRate = isBlanket
      ? areaCm2 > 160
        ? 0.8
        : 0.85
      : isPilot
      ? areaCm2 > 160
        ? 0.9
        : 0.95
      : areaCm2 > 160
      ? 1.05
      : 1.1;
    const minFloor = isBlanket ? 40 : isPilot ? 46 : 55;
    const rate = baseRate * combinedMult;
    rawUnit = Math.max(minFloor, areaCm2 * rate);
    formulaExplanation = `${areaCm2} cm² firewall sheet × ₹${rate.toFixed(2)}/cm² (min ₹${minFloor}/sheet)`;
  } else if (productId === 'insultherm-core') {
    // ₹80 -> ₹68 -> ₹61.20 at 100 cm2
    const baseRate = isBlanket
      ? areaCm2 > 150
        ? 0.59
        : 0.612
      : isPilot
      ? areaCm2 > 150
        ? 0.65
        : 0.68
      : areaCm2 > 150
      ? 0.76
      : 0.8;
    const minFloor = isBlanket ? 24 : isPilot ? 28 : 35;
    const rate = baseRate * combinedMult;
    rawUnit = Math.max(minFloor, areaCm2 * rate);
    formulaExplanation = `${areaCm2} cm² pad area × ₹${rate.toFixed(3)}/cm² (min ₹${minFloor}/pad)`;
  } else {
    // insultherm-ultra: ₹140 -> ₹110 -> ₹95 at 100 cm2
    const baseRate = isBlanket
      ? areaCm2 > 150
        ? 0.9
        : 0.95
      : isPilot
      ? areaCm2 > 150
        ? 1.04
        : 1.1
      : areaCm2 > 150
      ? 1.32
      : 1.4;
    const minFloor = isBlanket ? 32 : isPilot ? 38 : 50;
    const rate = baseRate * combinedMult;
    rawUnit = Math.max(minFloor, areaCm2 * rate);
    formulaExplanation = `${areaCm2} cm² high-flux area × ₹${rate.toFixed(2)}/cm² (min ₹${minFloor}/pad)`;
  }

  const unitPriceInr = Number(rawUnit.toFixed(2));
  const lineSubtotalInr = Math.round(unitPriceInr * qty);
  const effectiveRatePerCm2 = Number((unitPriceInr / Math.max(1, areaCm2)).toFixed(2));

  return {
    areaCm2,
    unitPriceInr,
    effectiveRatePerCm2,
    lineSubtotalInr,
    tierName,
    formulaExplanation,
    nreFeeInr: 0,
    traditionalDieSavingsInr: 40000,
  };
}
