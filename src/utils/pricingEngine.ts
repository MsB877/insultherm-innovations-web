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
  volumeRateHeadline: string;
  areaTiersSummary: {
    band: string;
    exampleSize: string;
    protoRule: string;
    volumeRule: string;
  }[];
  thicknessOptions: { label: string; mm: number; multiplier: number }[];
  gradeOptions: { sku: string; label: string; multiplier: number }[];
}

export const PRICING_MODELS: Record<ProductSlugId, ProductPricingModel> = {
  'insultherm-shield': {
    productId: 'insultherm-shield',
    referenceFootprintLabel: '100 × 100 mm flat pattern (100 cm² folded shroud)',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹45 / 100 cm² folded pc (₹0.45 / cm², min ₹25)',
    volumeRateHeadline: '₹0.30 / cm² nested flat area (₹30 / 100 cm² pc)',
    areaTiersSummary: [
      {
        band: 'Small Terminal / Tab Cap (≤ 55 cm²)',
        exampleSize: 'e.g. 50 × 80 mm (40 cm²)',
        protoRule: '₹25 – ₹28 / folded pc (min CNC setup floor)',
        volumeRule: '₹0.30 / cm² nested (min ₹16 / pc)',
      },
      {
        band: 'Standard Busbar Shroud (56 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹0.45 / cm² → ₹45 / folded pc @ 100 cm²',
        volumeRule: '₹0.30 / cm² → ₹30 / folded pc @ 100 cm²',
      },
      {
        band: 'Full BESS / EV Pack Liner (> 150 cm²)',
        exampleSize: 'e.g. 300 × 200 mm (600 cm²)',
        protoRule: '₹0.42 / cm² flat-pattern area + living-hinge score',
        volumeRule: '₹0.28 / cm² nested sheet area ( Blanket ≥500 pcs: ₹0.25/cm²)',
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
    protoReferenceHeadline: '₹110 / 100 cm² custom sheet (₹1.10 / cm², min ₹55)',
    volumeRateHeadline: '₹0.85 / cm² nested cell area (₹85 / 100 cm² sheet)',
    areaTiersSummary: [
      {
        band: 'Compact Cylindrical / Pouch Spacer (≤ 50 cm²)',
        exampleSize: 'e.g. 65 × 70 mm (45.5 cm²)',
        protoRule: '₹55 / custom sheet (min sealed-edge floor)',
        volumeRule: '₹0.85 / cm² nested (min ₹38 / sheet)',
      },
      {
        band: 'Standard EV Prismatic Cell (51 – 160 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹1.10 / cm² → ₹110 / custom sheet @ 100 cm²',
        volumeRule: '₹0.85 / cm² → ₹85 / sheet @ 100 cm²',
      },
      {
        band: '280Ah / 314Ah Grid BESS Cell (> 160 cm²)',
        exampleSize: 'e.g. 174 × 204 mm (355 cm²)',
        protoRule: '₹1.05 / cm² (₹373 / 280Ah firewall)',
        volumeRule: '₹0.82 / cm² (₹291 / 280Ah sheet; ≥500 pcs ₹0.76/cm²)',
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
    referenceFootprintLabel: 'Area-Indexed Custom Spreader (1 cm² – 300+ cm²)',
    referenceAreaCm2: 25,
    protoReferenceHeadline: '₹350 (≤25 cm²) to ₹1,800 (300 cm²) — Priced by Area (cm²)',
    volumeRateHeadline: '₹3.20 / cm² nested (GFlex-1000) | ₹4.60 / cm² (GFlex-1500)',
    areaTiersSummary: [
      {
        band: 'Band A — Compact IC / Optical Strip (≤ 25 cm²)',
        exampleSize: 'e.g. 25 × 80 mm (20 cm²) or 50 × 50 mm',
        protoRule: '₹350 / pc (GFlex-1000) | ₹550 / pc (GFlex-1500)',
        volumeRule: '₹3.20 / cm² (min ₹28/pc — e.g. 10 cm² = ₹32/pc!)',
      },
      {
        band: 'Band B — Radar T/R & ADAS ECU Plane (26 – 100 cm²)',
        exampleSize: 'e.g. 100 × 100 mm (100 cm²)',
        protoRule: '₹350 + ₹5.50/cm² above 25 cm² (100 cm² = ₹763 / pc)',
        volumeRule: '₹3.20 / cm² nested (100 cm² = ₹320 / pc)',
      },
      {
        band: 'Band C — Avionics / Satellite Chassis (101 – 300 cm²)',
        exampleSize: 'e.g. 200 × 150 mm (300 cm²)',
        protoRule: '₹763 + ₹5.15/cm² above 100 cm² (300 cm² = ₹1,793 / pc)',
        volumeRule: '₹2.95 / cm² nested (≥500 pcs Blanket: ₹2.65 / cm²)',
      },
    ],
    thicknessOptions: [
      { label: '0.15 mm (Ultra-Thin Kapton-Capped)', mm: 0.15, multiplier: 0.95 },
      { label: '0.24 mm (Std Dual-Graphite + Scrim)', mm: 0.24, multiplier: 1.0 },
      { label: '0.35 mm (High-Mass Lateral Plane)', mm: 0.35, multiplier: 1.18 },
    ],
    gradeOptions: [
      { sku: 'GFlex-1000', label: 'GFlex-1000 (1,000 W/m·K Edge-Sealed ASTM E595)', multiplier: 1.0 },
      { sku: 'GFlex-1500', label: 'GFlex-1500 (1,500 W/m·K Satellite / Phased-Array Grade)', multiplier: 1.42 },
    ],
  },

  'insultherm-core': {
    productId: 'insultherm-core',
    referenceFootprintLabel: '100 × 100 mm pad (100 cm² = ₹80) | Std 50 × 50 mm = ₹20',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹80 / 100 cm² custom pad (₹0.80 / cm²) | ₹20 / std 50×50mm',
    volumeRateHeadline: '₹0.68 / cm² (100+ pcs) → ₹0.612 / cm² (₹61.20 / 100 cm² blanket)',
    areaTiersSummary: [
      {
        band: 'Standard Pre-Cut 50 × 50 mm BMS Pad (25 cm²)',
        exampleSize: 'Exact 50 × 50 × 1.0/1.5 mm stock SKU',
        protoRule: '₹20 / pad (In-stock pre-cut SKU, ₹0.80 / cm²)',
        volumeRule: '₹16.50 / pad (≥500 pcs)',
      },
      {
        band: 'Custom CNC Prototype Pad (1 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹0.80 / cm² @ 1.0–1.5mm (min ₹35 / custom CAD pad)',
        volumeRule: '₹0.68 / cm² (100–499 pcs) → ₹0.612 / cm² (500+ pcs)',
      },
      {
        band: 'Large EV Module Bottom Cold-Plate Pad (> 150 cm²)',
        exampleSize: 'e.g. 250 × 160 mm (400 cm²)',
        protoRule: '₹0.76 / cm² (₹304 / 400 cm² custom pad)',
        volumeRule: '₹0.59 / cm² nested cold-plate sheet',
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
      { sku: 'Core-BMS-50x50', label: 'Core-BMS-50x50 (Std Pre-Cut 50×50mm Pad @ ₹20)', multiplier: 1.0 },
    ],
  },

  'insultherm-ultra': {
    productId: 'insultherm-ultra',
    referenceFootprintLabel: '100 × 100 mm high-flux pad (100 cm² = ₹140)',
    referenceAreaCm2: 100,
    protoReferenceHeadline: '₹140 / 100 cm² custom pad (₹1.40 / cm², min ₹50)',
    volumeRateHeadline: '₹0.95 / cm² nested area (₹95 / 100 cm² pad)',
    areaTiersSummary: [
      {
        band: 'Discrete SiC / Optical Module Pad (≤ 35 cm²)',
        exampleSize: 'e.g. TO-247 / 40 × 50 mm (20 cm²)',
        protoRule: '₹50 / custom pad (min precision CNC handling)',
        volumeRule: '₹0.95 / cm² nested (min ₹28 / pad)',
      },
      {
        band: 'AI Accelerator / IGBT Brick Pad (36 – 150 cm²)',
        exampleSize: '100 × 100 mm (100 cm² ref.)',
        protoRule: '₹1.40 / cm² → ₹140 / custom pad @ 100 cm²',
        volumeRule: '₹0.95 / cm² → ₹95 / pad @ 100 cm²',
      },
      {
        band: 'Server Cold-Plate / Inverter Baseplate (> 150 cm²)',
        exampleSize: 'e.g. 200 × 150 mm (300 cm²)',
        protoRule: '₹1.32 / cm² (₹396 / 300 cm² custom pad)',
        volumeRule: '₹0.88 / cm² (Blanket ≥500 pcs: ₹0.82 / cm²)',
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
    model.thicknessOptions.find((t) => Math.abs(t.mm - (params.thicknessMm ?? 0)) < 0.05) ||
    model.thicknessOptions[1] ||
    model.thicknessOptions[0];
  const gradeObj =
    model.gradeOptions.find((g) => g.sku === params.gradeSku) || model.gradeOptions[0];

  const combinedMult = thicknessObj.multiplier * gradeObj.multiplier;
  const isVolume = qty >= 100;
  const isBlanket = qty >= 500;

  let rawUnit = 0;
  let tierName = isBlanket
    ? 'OEM Blanket Nested Area Tier (500+ pcs)'
    : isVolume
    ? 'Production Nested Area Tier (100–499 pcs)'
    : 'Prototype Digital CNC Tier (1–99 pcs, ₹0 NRE)';
  let formulaExplanation = '';

  // Special exact SKU shortcut: Core-BMS-50x50 at 50x50mm
  if (
    productId === 'insultherm-core' &&
    (gradeObj.sku === 'Core-BMS-50x50' || (Math.abs(lengthMm - 50) <= 2 && Math.abs(widthMm - 50) <= 2 && thicknessObj.mm <= 1.5))
  ) {
    rawUnit = isBlanket ? 16.5 : isVolume ? 18 : 20;
    tierName = 'In-Stock Pre-Cut 50×50 mm BMS SKU';
    formulaExplanation = `Standard 50 × 50 mm (25.0 cm²) pre-cut BMS pad SKU @ ₹${rawUnit.toFixed(2)}/pad`;
  } else if (productId === 'insultherm-graphite-flex') {
    if (!isVolume) {
      let base1000 = 350;
      if (areaCm2 <= 25) {
        base1000 = 350;
        formulaExplanation = `${areaCm2} cm² (Band A ≤25 cm² proto floor) = ₹350 base`;
      } else if (areaCm2 <= 100) {
        base1000 = 350 + (areaCm2 - 25) * 5.5;
        formulaExplanation = `${areaCm2} cm² = ₹350 (first 25 cm²) + ${(areaCm2 - 25).toFixed(1)} cm² × ₹5.50/cm²`;
      } else {
        base1000 = 762.5 + (areaCm2 - 100) * 5.15;
        formulaExplanation = `${areaCm2} cm² = ₹762.50 (first 100 cm²) + ${(areaCm2 - 100).toFixed(1)} cm² × ₹5.15/cm²`;
      }
      rawUnit = base1000 * combinedMult;
      if (combinedMult !== 1) {
        formulaExplanation += ` × ${combinedMult.toFixed(2)} (${gradeObj.sku} / ${thicknessObj.mm}mm)`;
      }
    } else {
      const rate = (isBlanket ? 2.65 : areaCm2 > 100 ? 2.95 : 3.2) * combinedMult;
      const minFloor = gradeObj.sku === 'GFlex-1500' ? 38 : 28;
      rawUnit = Math.max(minFloor, areaCm2 * rate);
      formulaExplanation = `Nested Volume Area: ${areaCm2} cm² × ₹${rate.toFixed(2)}/cm² (min ₹${minFloor}/pc)`;
    }
  } else if (productId === 'insultherm-shield') {
    if (!isVolume) {
      const rate = (areaCm2 > 150 ? 0.42 : 0.45) * combinedMult;
      rawUnit = Math.max(25, areaCm2 * rate);
      formulaExplanation = `${areaCm2} cm² flat pattern × ₹${rate.toFixed(2)}/cm² (min ₹25/folded pc)`;
    } else {
      const rate = (isBlanket ? 0.25 : areaCm2 > 150 ? 0.28 : 0.3) * combinedMult;
      rawUnit = Math.max(16, areaCm2 * rate);
      formulaExplanation = `Nested Volume Area: ${areaCm2} cm² × ₹${rate.toFixed(2)}/cm² (min ₹16/pc)`;
    }
  } else if (productId === 'insultherm-barrier') {
    if (!isVolume) {
      const rate = (areaCm2 > 160 ? 1.05 : 1.1) * combinedMult;
      rawUnit = Math.max(55, areaCm2 * rate);
      formulaExplanation = `${areaCm2} cm² firewall area × ₹${rate.toFixed(2)}/cm² (min ₹55/sheet)`;
    } else {
      const rate = (isBlanket ? 0.76 : areaCm2 > 160 ? 0.82 : 0.85) * combinedMult;
      rawUnit = Math.max(38, areaCm2 * rate);
      formulaExplanation = `Nested Volume Area: ${areaCm2} cm² × ₹${rate.toFixed(2)}/cm² (min ₹38/sheet)`;
    }
  } else if (productId === 'insultherm-core') {
    if (!isVolume) {
      const rate = (areaCm2 > 150 ? 0.76 : 0.8) * combinedMult;
      rawUnit = Math.max(35, areaCm2 * rate);
      formulaExplanation = `${areaCm2} cm² pad area × ₹${rate.toFixed(2)}/cm² (min ₹35/custom pad)`;
    } else {
      const rate = (isBlanket ? 0.612 : 0.68) * combinedMult;
      rawUnit = Math.max(20, areaCm2 * rate);
      formulaExplanation = `Nested Volume Area: ${areaCm2} cm² × ₹${rate.toFixed(3)}/cm² (min ₹20/pad)`;
    }
  } else {
    // insultherm-ultra
    if (!isVolume) {
      const rate = (areaCm2 > 150 ? 1.32 : 1.4) * combinedMult;
      rawUnit = Math.max(50, areaCm2 * rate);
      formulaExplanation = `${areaCm2} cm² high-flux area × ₹${rate.toFixed(2)}/cm² (min ₹50/pad)`;
    } else {
      const rate = (isBlanket ? 0.82 : areaCm2 > 150 ? 0.88 : 0.95) * combinedMult;
      rawUnit = Math.max(28, areaCm2 * rate);
      formulaExplanation = `Nested Volume Area: ${areaCm2} cm² × ₹${rate.toFixed(2)}/cm² (min ₹28/pad)`;
    }
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
