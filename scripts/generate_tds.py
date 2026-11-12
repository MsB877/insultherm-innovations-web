#!/usr/bin/env python3
"""
Programmatic Technical Data Sheet (TDS) Generator for InsulTherm Innovations
Generates 5 standalone 2-page enterprise B2B Technical Data Sheet PDFs styled after
Henkel Bergquist, Parker Lord CoolTherm, and 3M Advanced Materials data sheets.
"""

import os
from xml.sax.saxutils import escape
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak, KeepTogether
)
from reportlab.graphics.shapes import Drawing, Rect, String, Line

# Register Unicode TrueType Fonts (supports Indian Rupee ₹, Ω, µ, °, ™)
FONT_DIR = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DVSans", os.path.join(FONT_DIR, "DejaVuSans.ttf")))
pdfmetrics.registerFont(TTFont("DVSans-Bold", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("DVMono", os.path.join(FONT_DIR, "DejaVuSansMono.ttf")))
pdfmetrics.registerFont(TTFont("DVMono-Bold", os.path.join(FONT_DIR, "DejaVuSansMono-Bold.ttf")))
pdfmetrics.registerFontFamily("DVSans", normal="DVSans", bold="DVSans-Bold", italic="DVSans", boldItalic="DVSans-Bold")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO_PATH = os.path.join(BASE_DIR, "public", "assets", "brand", "logo.png")
PRODUCTS_IMG_DIR = os.path.join(BASE_DIR, "public", "assets", "products")
OUTPUT_DIR = os.path.join(BASE_DIR, "public", "tds")

SLATE_DARK = colors.HexColor("#0B192C")
SLATE_MID = colors.HexColor("#1E293B")
SLATE_MUTED = colors.HexColor("#475569")
SLATE_LIGHT = colors.HexColor("#F1F5F9")
SLATE_BORDER = colors.HexColor("#CBD5E1")
WHITE = colors.white

COMPANY_NAME = "InsulTherm Innovations"
PHONE_MASKED = "+91 78148 XXXXX"
EMAIL_PRIMARY = "manav.sb@inslthrm.in"
EMAIL_OPS = "manavsb9719@gmail.com"
FACILITY_ADDRESS = (
    "InsulTherm Innovations, Advanced Materials & Digital Converting Wing, "
    "Block C-14, Sanand GIDC Industrial Estate (Near iCreate Campus), Ahmedabad, Gujarat – 382110, India"
)

PRODUCTS_TDS = [
    {
        "slug": "insultherm-shield",
        "doc_code": "TDS-IT-SHD-101 | REV 2026.11",
        "name": "InsulTherm Shield™",
        "subtitle": "Crease-Scored 3D Dielectric Busbar Origami & High-Voltage Isolation System",
        "series": "SHIELD SERIES (Shield-FGK / Shield-NMX)",
        "accent": "#EA580C",
        "image": "insultherm-shield.jpg",
        "badges": ["UL 94 V-0", ">22–32 kV/mm", "1,500V DC Rated", "₹0 Tooling NRE", "100% India DVA"],
        "overview": (
            "InsulTherm Shield™ is a precision digital CNC kiss-cut and 50%-depth crease-scored 3D dielectric insulation system "
            "engineered to replace expensive injection-molded plastic busbar shrouds and hard-stamped liners. "
            "Converted from flame-retardant polypropylene (Formex™ GK equiv.) or high-temperature calendered aramid/PET "
            "duplex laminate (Nomex® 410 equiv.), Shield™ ships flat and snap-folds by hand in <5 seconds via zero-memory "
            "living hinges around complex 3D copper busbars, collector plates, and 1,500V DC battery rack trays."
        ),
        "chemistry": (
            "Monolithic extruded flame-retardant polypropylene sheet (Shield-FGK) or high-density calendered aromatic polyamide / PET "
            "duplex composite (Shield-NMX). Converted on a multi-axis vacuum-bed digital oscillating-knife table with depth-controlled "
            "scoring (50% ± 3% wall depth) that aligns polymer chains along the fold axis, preventing stress-whitening or dielectric loss."
        ),
        "layers": [
            ("Top Dielectric Face", "Corona-treated matte flame-retardant polypropylene / calendered meta-aramid surface", "#1E293B", "#FFFFFF"),
            ("50% CNC Living Hinge", "Precision depth-controlled score line enabling 90°–180° 5-second snap folding", "#EA580C", "#FFFFFF"),
            ("Core Isolation Matrix", "0.25–0.80 mm non-hygroscopic high-dielectric polymer matrix (>22–32 kV/mm)", "#334155", "#FFFFFF"),
            ("Optional PSA Strip", "Selective UL 94 V-0 acrylic mounting strip with finger-lift PET liner where specified", "#64748B", "#FFFFFF"),
        ],
        "properties": [
            ["Dielectric Breakdown Voltage", "> 22 – 32 kV/mm (11 – 16 kV @ 0.50 mm)", "ASTM D149 / IEC 60243"],
            ["Flammability Rating", "UL 94 V-0 (Non-dripping, self-extinguishing)", "UL 94 Vertical Burn"],
            ["Standard Thickness Range", "0.25 mm – 0.80 mm (0.40 mm & 0.43 mm stock)", "ASTM D374 Micrometer"],
            ["Continuous Operating Temp", "-40°C to +115°C (FGK) / -60°C to +205°C (NMX)", "UL 746B / IEC 60216"],
            ["Volume Resistivity", "> 1.0 × 10^16 Ω·cm", "ASTM D257"],
            ["Moisture Absorption (24h)", "< 0.06% (Shield-FGK hydrophobic matrix)", "ASTM D570"],
            ["Thermal Conductivity", "0.14 – 0.16 W/m·K (Electrical & arc barrier)", "ASTM C518"],
            ["Comparative Tracking Index", "> 600 V (PLC 0)", "IEC 60112"],
            ["Living-Hinge Score Depth", "50% ± 3% thickness; >1,000 fold cycles", "InsulTherm QC-CNC-04"],
            ["System Voltage Architecture", "Up to 1,500V DC BESS, Solar & Rail Busbars", "IEC 60664-1 Clearance"],
        ],
        "variants": [
            ["Shield-FGK-043", "Formex™ GK-17 equiv. PP, 0.43 mm (100 cm² ref. 3D sleeve)", "₹45.00 Proto | ₹35.00 Pilot", "₹30.00 OEM Blanket (500+)"],
            ["Shield-NMX-050", "Nomex® 410 equiv. Aramid Duplex, 0.50 mm (100 cm² ref.)", "₹51.75 Proto | ₹40.25 Pilot", "₹34.50 OEM Blanket (500+)"],
            ["Custom Tray / Shroud", "Custom .DXF/.STEP 3D Origami (Priced by flat cm² area, ₹0 NRE)", "₹0.45/cm² (min ₹25/pc)", "₹0.35 Pilot | ₹0.30 Blanket"],
        ],
        "applications": [
            "1,500V DC solar string inverters, industrial Variable Frequency Drives (VFDs), and UPS collector isolation.",
            "Railway propulsion traction converters (Vande Bharat / Kavach signalling power enclosures) replacing ₹25,000–₹60,000 plastic molds.",
            "Grid-scale BESS 20-ft container steel tray dielectric liners and high-amperage laminated copper busbar shrouds.",
            "EV traction battery pack high-voltage terminal post shields and BDU (Battery Disconnect Unit) arc-flash dividers.",
        ],
        "handling": (
            "1. CAD Submission: Supply flat-pattern .DXF or 3D sheet-metal .STEP files (specify K-factor = 0.40 and bend radius = 0.5× thickness). "
            "2. Assembly: Pre-scored parts ship flat in anti-static sleeves. Fold briskly past 90° along CNC crease lines to engage integrated "
            "tab-slot mechanical locks in <5 seconds without adhesives or heat guns. "
            "3. Storage: Store flat at 15°C–35°C, <75% RH away from direct UV exposure. Shelf life: 60 months (uncoated) / 24 months (PSA-backed)."
        ),
    },
    {
        "slug": "insultherm-barrier",
        "doc_code": "TDS-IT-BAR-102 | REV 2026.11",
        "name": "InsulTherm Barrier™",
        "subtitle": "4-Layer 1,100°C Nanoporous Aerogel-Mica Thermal Runaway & Fire Containment Sheet",
        "series": "BARRIER SERIES (Barrier-MA1 / Barrier-MK2)",
        "accent": "#DC2626",
        "image": "insultherm-barrier.jpg",
        "badges": ["k = 0.018 W/m·K", ">1,100°C (>5 min)", "ARAI AIS-156", "UL 9540A Support", ">15 kV/mm"],
        "overview": (
            "InsulTherm Barrier™ is an ultra-thin, 4-layer inter-cell thermal runaway firewall engineered for utility-scale LiFePO4 "
            "Battery Energy Storage Systems (BESS) and high-density NMC/LFP electric vehicle traction packs. Combining a 0.20 mm Phlogopite "
            "mica mineral blast shield with a 1.20 mm nanoporous silica aerogel core (k = 0.018 W/m·K), Barrier™ blocks both 1,100°C "
            "particle-laden venting torches and conductive heat transfer between adjacent prismatic or pouch cells."
        ),
        "chemistry": (
            "Hybrid mineral-nanoporous composite stack: (1) Calcined Phlogopite mica paper impregnated with high-temp silicone resin "
            "to resist abrasive hot-particle ejection during cell vent bursts; (2) Fiber-reinforced mesoporous amorphous silica aerogel felt "
            "(pore size ~20 nm, suppressing gas-phase convection); (3) 0.10 mm flame-retardant acrylic PSA; and (4) Siliconized kraft/PET liner."
        ),
        "layers": [
            ("Layer 1 (0.20 mm)", "Phlogopite Mica Flame Shield™ Blast Face (>1,100°C Torch & Particle Guard)", "#991B1B", "#FFFFFF"),
            ("Layer 2 (1.20 mm)", "Nanoporous Silica Aerogel Felt Core™ (k = 0.018 W/m·K Mesoporous Block)", "#E2E8F0", "#0F172A"),
            ("Layer 3 (0.10 mm)", "High-Temperature Flame-Retardant Acrylic PSA Mounting Adhesive", "#EA580C", "#FFFFFF"),
            ("Layer 4 (Liner)", "Siliconized Kraft Paper / PET Differential Release Liner (CNC Kiss-Cut)", "#B45309", "#FFFFFF"),
        ],
        "properties": [
            ["Thermal Conductivity @ 25°C", "0.018 W/m·K (0.023 W/m·K @ 200°C)", "ASTM C518 / ASTM D5470"],
            ["Direct Flame Hold Endurance", "> 1,100°C torch for > 5 mins (Zero burn-through)", "Internal Torch / UL 9540A"],
            ["ARAI AIS-156 Pack FEA Benchmark", "Adjacent cell at 74.189°C (<80°C cascade limit)", "4-Quadrant Pack Validation"],
            ["Dielectric Breakdown Strength", "> 15 kV/mm (MA1) / > 22 kV/mm (MK2)", "ASTM D149"],
            ["Flammability Classification", "UL 94 V-0 / Non-propagating mineral-aerogel", "UL 94 / IEC 60695"],
            ["Nominal Composite Thickness", "1.50 mm std (1.0 mm – 3.0 mm custom)", "ASTM D374"],
            ["Continuous / Excursion Temp", "-50°C to +650°C cont. / >1,100°C excursion", "TGA Thermal Analysis"],
            ["Compression Deflection", "10% – 25% deflection @ 50 – 150 kPa", "ASTM D575"],
            ["Bulk Composite Density", "0.22 – 0.28 g/cm³ (Low EV/Aero mass impact)", "ASTM C303"],
            ["Particulate / Dust Control", "Mica-faced & edge-consolidated assembly", "InsulTherm QC-BAR-02"],
        ],
        "variants": [
            ["Barrier-MA1-150", "0.20mm Mica + 1.20mm Silica Aerogel + FR-PSA (100 cm² ref.)", "₹110.00 Proto | ₹95.00 Pilot", "₹85.00 OEM Blanket (500+)"],
            ["Barrier-MK2-165", "Dual-Mica + Aerogel + Kapton® HV Seal (100 cm² ref. sheet)", "₹123.20 Proto | ₹106.40 Pilot", "₹95.20 OEM Blanket (500+)"],
            ["Custom 280Ah / AIS-156", "280Ah/314Ah LFP Custom Cutouts (AIS-156 Pack Kit ₹14,500)", "₹1.05–₹1.10/cm² (min ₹55)", "₹0.90 Pilot | ₹0.80–₹0.85 Vol"],
        ],
        "applications": [
            "Grid-scale 20-ft BESS containers: vertical inter-cell thermal runaway firewalls between 280Ah–314Ah prismatic LiFePO4 cells.",
            "EV 2W/3W/4W & commercial fleet battery modules engineered for ARAI AIS-156 Amendment 3 five-minute thermal propagation compliance.",
            "Battery enclosure lid flame-deflection blankets preventing hot gas/electrolyte jetting burn-through of aluminum or composite covers.",
            "Defense, marine, and aviation energy storage modules requiring high dielectric holdoff after severe thermal shock.",
        ],
        "handling": (
            "1. Orientation: Always orient the rigid Phlogopite Mica blast face toward the highest thermal-runaway impingement surface or vent path; "
            "apply the PSA face to clean, IPA-degreased cell walls or module end-plates. "
            "2. Compression Preload: Design cell-stack preload between 35 kPa and 120 kPa at Beginning-of-Life (BOL) to absorb End-of-Life (EOL) swelling. "
            "3. Regulatory Note: UL 9540A and ARAI AIS-156 evaluate system-level propagation; InsulTherm supplies nested kits and lot traceability for pack testing."
        ),
    },
    {
        "slug": "insultherm-graphite-flex",
        "doc_code": "TDS-IT-GFX-103 | REV 2026.11",
        "name": "InsulTherm Graphite-Flex™",
        "subtitle": "5-Layer Edge-Sealed Pyrolytic Graphite Lateral Heat Spreader (ASTM E595 Low-Outgassing)",
        "series": "GRAPHITE-FLEX SERIES (GFlex-1000 / GFlex-1500)",
        "accent": "#D97706",
        "image": "insultherm-graphite-flex.jpg",
        "badges": ["1,000–1,500 W/m·K", "ASTM E595 (TML <1%)", ">5 kV Kapton Cap", "Silicone-Free", "GTE Ban Compliant"],
        "overview": (
            "InsulTherm Graphite-Flex™ is an ultra-thin, 5-layer carrier-backed synthetic pyrolytic graphite laminate engineered to eliminate "
            "intense localized processor, GaN/RF, and optical hotspots by spreading heat laterally (1,000–1,500 W/m·K in-plane—up to 4× pure "
            "copper at <25% weight). Integrating a neutral-axis woven E-Glass scrim, an edge-overlapping 0.025 mm Kapton® dielectric cap (>5 kV), "
            "and an ASTM E595 silicone-free adhesive, it prevents carbon flaking and optical lens fogging."
        ),
        "chemistry": (
            "Polymeric precursor film carbonized above 2,500°C into oriented hexagonal SP2 carbon planes. Dual pyrolytic graphite cores are "
            "laminated symmetrically across an ultra-thin woven E-Glass fiberglass neutral-axis scrim using a 100% siloxane-free ASTM E595 "
            "acrylic PSA (TML < 1.0%, CVCM < 0.1%) beneath a 0.025 mm translucent amber Kapton® polyimide dielectric shield."
        ),
        "layers": [
            ("Layer 1 (0.025 mm)", "Translucent Amber Kapton® Polyimide Dielectric Top Cap (Edge-Sealed, >5 kV)", "#D97706", "#FFFFFF"),
            ("Layer 2 (Upper Core)", "High-Crystallinity Oriented Pyrolytic Graphite Matrix (k_xy = 1,000–1,500 W/m·K)", "#1E293B", "#FFFFFF"),
            ("Layer 3 (Center Axis)", "Embedded Woven E-Glass Fiberglass Scrim + ASTM E595 Bonding Line", "#F8FAFC", "#0F172A"),
            ("Layer 4 (Lower Core)", "Balanced Lower Synthetic Pyrolytic Graphite Spreader Matrix", "#1E293B", "#FFFFFF"),
            ("Layer 5 (0.050 mm)", "Clear Siliconized PET Release Liner + 0.010 mm Silicone-Free Acrylic PSA", "#64748B", "#FFFFFF"),
        ],
        "properties": [
            ["In-Plane Conductivity (X-Y)", "1,000 – 1,500 W/m·K (4× Copper diffusivity)", "Laser Flash (ASTM E1461)"],
            ["Through-Plane Conductivity (Z)", "7.0 – 15.0 W/m·K", "ASTM E1461"],
            ["Vacuum Outgassing (No Silicone)", "TML < 1.0% | CVCM < 0.10% (Zero oil fogging)", "ASTM E595 (125°C, 10^-5 Torr)"],
            ["Top-Cap Dielectric Isolation", "> 5,000 V AC breakdown (0.025 mm Kapton®)", "ASTM D149"],
            ["Composite Total Thickness", "0.15 mm – 0.35 mm ultra-low-profile stack", "ASTM D374"],
            ["Graphite Core Density", "1.95 – 2.12 g/cm³ (~76% lighter than Copper)", "Helium Pycnometry"],
            ["Operating Temperature Range", "-55°C to +150°C (PSA) / +400°C (Core)", "MIL-STD-810H Shock"],
            ["Minimum Bend Radius", "2.0 mm dynamic / 1.0 mm static routing", "IPC-TM-650 Flex"],
            ["Flammability Rating", "UL 94 V-0", "UL 94"],
            ["Procurement Sovereignty", "100% India DVA (< ₹200 Cr MoD GTE Compliant)", "Make-in-India Class I/II"],
        ],
        "variants": [
            ["GFlex-1000 (Std 50×50)", "Edge-Sealed Kapton® + Graphite (50 × 50 mm = 25 cm² ref.)", "₹350.00 Proto | ₹310.00 Pilot", "₹280.00 OEM Blanket (500+)"],
            ["GFlex-1000 (Large 150×150)", "Large Defense / Space Spreader (150 × 150 mm = 225 cm² ref.)", "₹1,800 Proto | ₹1,650 Pilot", "₹1,500 OEM Blanket (500+)"],
            ["Space/Defense Kit", "Turnkey Zero-Outgassing Sampler Kit (GFlex + Ultra-NS + ASTM E595)", "₹12,500 / turnkey lab kit", "Ships in 48 Hours (<₹200Cr GTE)"],
        ],
        "applications": [
            "Defense UAV flight computers, phased-array radar Transmit/Receive (T/R) modules, and seeker electronics (BEL, HAL, DRDO, private primes).",
            "Low-Earth-Orbit (LEO) satellite payloads and optical Earth-observation camera housings requiring zero siloxane outgassing.",
            "Sealed automotive ADAS LiDAR/camera ECUs and 5G/6G small-cell telecom enclosures with zero vertical clearance for finned heatsinks.",
            "800G / 1.6T pluggable optical transceivers in AI data centers routing heat laterally into cold-rail chassis walls.",
        ],
        "handling": (
            "1. Edge-Seal Integrity: Specify perimeter geometry in .DXF CAD so InsulTherm's CNC step-cut creates a 1.0–1.5 mm amber Kapton® "
            "dielectric skirt overhang around conductive graphite edges where adjacent SMD components sit within <2 mm. "
            "2. Application: Peel the clear 0.050 mm PET release liner using the kiss-cut tab and apply with 15–30 psi roller pressure onto clean IC/metal surfaces. "
            "3. Cleanroom Option: Available double-bagged in N2-purged ESD pouches for SpaceTech and optical assembly lines."
        ),
    },
    {
        "slug": "insultherm-core",
        "doc_code": "TDS-IT-COR-104 | REV 2026.11",
        "name": "InsulTherm Core™",
        "subtitle": "5-Layer Tropical Anti-Bleed Vertical Conduction TIM Gap Pad (3.0 W/m·K)",
        "series": "CORE SERIES (Core-300 / Core-350D)",
        "accent": "#EA580C",
        "image": "insultherm-core.jpg",
        "badges": ["k = 3.0 W/m·K", "Rth 0.22–0.28 K·cm²/W", "40 Shore 00", "50°C Anti-Bleed", "UL 94 V-0"],
        "overview": (
            "InsulTherm Core™ is a 5-layer, fiberglass-reinforced viscoelastic thermal interface gap filler pad engineered specifically "
            "for 50°C Indian tropical ambient extremes, rapid EV battery R&D homologation, and industrial BMS power stages. Compounded with "
            "72% wt silane-passivated spherical alumina (Al2O3) inside a crosslinked PDMS matrix around a central 0.05 mm woven E-Glass "
            "anti-tear scrim, Core™ eliminates siloxane oil bleed, pump-out, and bolt-hole tearing on rough cast cold plates."
        ),
        "chemistry": (
            "Addition-cured vinyl-functionalized polydimethylsiloxane (PDMS) elastomer filled at 72% wt with surface silane-coupled spherical "
            "aluminum oxide (Al2O3) ceramics. Silane passivation chemically anchors filler particles to the polymer backbone, preventing free-oil "
            "separation during 50°C–150°C cycling, while a neutral-axis 0.05 mm E-Glass scrim prevents stretch distortion and burr puncture."
        ),
        "layers": [
            ("Layer 1 (0.050 mm)", "Top Extended-Tab Clear PET Release Liner (Glove-Friendly Pull-Tab)", "#64748B", "#FFFFFF"),
            ("Layer 2 (Upper TIM)", "Viscoelastic PDMS Silicone + 72% wt Silane-Passivated Al2O3 (3.0 W/m·K)", "#EA580C", "#FFFFFF"),
            ("Layer 3 (0.050 mm)", "Center-Embedded Woven E-Glass Fiberglass Anti-Tear & Burr Scrim", "#F8FAFC", "#0F172A"),
            ("Layer 4 (Lower TIM)", "Compliant Natural-Tack PDMS + 72% wt Spherical Al2O3 Matrix", "#EA580C", "#FFFFFF"),
            ("Layer 5 (0.075 mm)", "Differential-Release Bottom PET Carrier Film (CNC Kiss-Cut Base)", "#475569", "#FFFFFF"),
        ],
        "properties": [
            ["Bulk Thermal Conductivity", "3.0 W/m·K", "ASTM D5470-17 Steady-State"],
            ["Thermal Impedance @ 1mm, 20 psi", "0.22 – 0.28 K·cm²/W (0.14 – 0.18°C·in²/W)", "ASTM D5470-17 Calibration Rig"],
            ["Hardness (Bulk Conformability)", "40 Shore 00 (Low PCB & cell mounting stress)", "ASTM D2240 (3-sec delay)"],
            ["Tropical Anti-Bleed Stability", "Zero oil bleed / pump-out (1,000h @ 50°C–150°C)", "InsulTherm Tropical Aging"],
            ["Dielectric Breakdown Voltage", "> 10 kV/mm (Core-300) / > 14 kV/mm (Core-350D)", "ASTM D149"],
            ["Volume Resistivity", "> 1.0 × 10^13 Ω·cm", "ASTM D257"],
            ["Flammability Rating", "UL 94 V-0", "UL 94"],
            ["Specific Gravity", "2.95 ± 0.10 g/cm³", "ASTM D792"],
            ["Standard Thicknesses", "0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm, 3.0 mm", "ASTM D374"],
            ["Continuous Operating Temp", "-50°C to +200°C", "IEC 60216"],
        ],
        "variants": [
            ["Core-300 (100 cm² Ref)", "Custom CNC Module Pad (100 × 100 mm = 100 cm² @ ₹0.80/cm²)", "₹80.00 Proto | ₹68.00 Pilot", "₹61.20 OEM Blanket (500+)"],
            ["Core-BMS-50x50", "Standard Pre-Cut 50 × 50 mm (25 cm²) MOSFET / BMS Conduction Pad", "₹20.00 Proto | ₹18.50 Pilot", "₹17.00 OEM Blanket (500+)"],
            ["Core-350D (>14 kV/mm)", "High-Dielectric Heavy E-Glass Anti-Puncture Grade (100 cm² ref.)", "₹88.00 Proto | ₹74.80 Pilot", "₹67.32 OEM Blanket (500+)"],
        ],
        "applications": [
            "EV traction battery module bottom cell-to-liquid-cold-plate thermal draining interfaces during ARAI AIS-156 rapid prototyping.",
            "Battery Management System (BMS) shunt resistors, D2PAK MOSFET arrays, and onboard charger (OBC) baseplate conduction.",
            "Industrial power supplies, telecom rectifiers, and driver chassis thermal bridging requiring mechanical tear resistance.",
            "Pre-packaged R&D Benchtop Sampler Boxes (₹9,800) enabling engineers to test 1.0, 1.5, 2.0, and 3.0 mm gap deflection on Day 1.",
        ],
        "handling": (
            "1. Liner Removal Sequence: Peel the thinner 0.050 mm top extended-tab PET liner first, position the naturally tacky face onto the cold plate "
            "using alignment bosses, and smoothly peel away the stiffer 0.075 mm differential bottom carrier at a 180° low angle. "
            "2. Recommended Compression: Design assembly stackup for 15% to 30% nominal thickness deflection (15–35 psi) to minimize contact resistance. "
            "3. Commercial Policy: Custom Core™ prototype runs ship under prepaid R&D kit or milestone PO terms with ₹0 tooling NRE."
        ),
    },
    {
        "slug": "insultherm-ultra",
        "doc_code": "TDS-IT-ULT-105 | REV 2026.11",
        "name": "InsulTherm Ultra™",
        "subtitle": "High-Flux Bimodal Al2O3 + Aligned h-BN Hybrid Percolation TIM Pad (5.5 W/m·K)",
        "series": "ULTRA SERIES (Ultra-550 / Ultra-NS Non-Silicone)",
        "accent": "#059669",
        "image": "insultherm-ultra.jpg",
        "badges": ["k = 5.5 W/m·K", "Rth < 0.15 K·cm²/W", "35 Shore 00", "Aligned h-BN", "Non-Silicone Opt."],
        "overview": (
            "InsulTherm Ultra™ is an ultra-low thermal impedance hybrid percolation gap filler pad engineered for high-heat-flux 800V "
            "Silicon-Carbide (SiC) power modules and 100kW+ AI data center liquid cold plates where conventional 3.0 W/m·K alumina pads "
            "choke. Combining an 82% wt bimodal spherical alumina network (2 µm + 20 µm) with shear-aligned hexagonal Boron Nitride (h-BN) "
            "platelets inside a 35 Shore 00 ultra-wetout matrix, Ultra™ achieves R_th < 0.15 K·cm²/W at 20 psi clamping pressure."
        ),
        "chemistry": (
            "Ultra-550 utilizes a functionalized ultra-low-modulus siloxane copolymer loaded at 82% wt with bimodal spherical Al2O3 (interstitial "
            "2 µm spheres bridging 20 µm primary spheres) plus aligned hexagonal Boron Nitride (h-BN, intrinsic k > 300 W/m·K) platelets forming "
            "continuous phonon highways. Ultra-NS substitutes a 100% siloxane-free acrylic elastomer for zero volatile migration on optics."
        ),
        "layers": [
            ("Layer 1 (Top Liner)", "Diamond-Embossed Low-Tack PET Release Film (Micro-Air Channel Evacuation)", "#065F46", "#FFFFFF"),
            ("Layer 2 (Contact Skin)", "Ultra-Wetout 35 Shore 00 Low-Modulus Interfacial Contact Skin", "#059669", "#FFFFFF"),
            ("Layer 3 (Hybrid Core)", "82% wt Bimodal Al2O3 (2µm+20µm) + Aligned h-BN Percolation Network (5.5 W/m·K)", "#10B981", "#064E3B"),
            ("Layer 4 (Carrier)", "75 µm Antistatic Release Carrier Liner (Cleanroom Silicone-Free Option)", "#334155", "#FFFFFF"),
        ],
        "properties": [
            ["Bulk Thermal Conductivity", "5.5 W/m·K", "ASTM D5470-17 Steady-State"],
            ["Thermal Impedance @ 20 psi", "< 0.15 K·cm²/W (@ 0.5 – 1.0 mm nominal)", "ASTM D5470-17 Calibration Rig"],
            ["Hardness / Surface Wetout", "35 Shore 00 (Ultra-conformable wetout)", "ASTM D2240"],
            ["Dielectric Breakdown Strength", "> 6.5 – 12.0 kV/mm", "ASTM D149"],
            ["Volume Resistivity", "> 1.0 × 10^13 Ω·cm", "ASTM D257"],
            ["Flammability Rating", "UL 94 V-0", "UL 94"],
            ["Siloxane Volatility (D3–D10)", "< 100 ppm (Ultra-550) | 0 ppm (Ultra-NS)", "GC-MS Headspace"],
            ["Specific Gravity", "3.15 ± 0.10 g/cm³", "ASTM D792"],
            ["Standard Thicknesses", "0.5 mm, 1.0 mm, 1.5 mm, 2.0 mm, 2.5 mm", "ASTM D374"],
            ["Operating Temperature Range", "-55°C to +200°C (550) / -40°C to +125°C (NS)", "IEC 60216"],
        ],
        "variants": [
            ["Ultra-550 (100 cm² Ref)", "82% Bimodal Al2O3 + Aligned h-BN (100 × 100 mm = 100 cm² ref.)", "₹140.00 Proto | ₹110.00 Pilot", "₹95.00 OEM Blanket (500+)"],
            ["Ultra-NS (Non-Silicone)", "100% Siloxane-Free Optical/Space Grade (100 cm² ref. pad)", "₹151.20 Proto | ₹118.80 Pilot", "₹102.60 OEM Blanket (500+)"],
            ["Inverter / SiC Kit", "Power Electronics, Rail & SiC Isolation Kit (TO-247 / EconoDUAL + Shield™)", "₹999 (25-pc) | ₹7,500 (Kit)", "Ships in 24–48 Hours"],
        ],
        "applications": [
            "100kW+ AI data center liquid cold plates, high-TDP GPU/ASIC server accelerator blocks, and localized compute racks.",
            "800V Silicon-Carbide (SiC) MOSFET & IGBT traction power modules (TO-247, EconoDUAL, PrimePACK) in EV and rail inverters.",
            "800G / 1.6T coherent optical transceivers, telecom laser pump modules, and precision avionics optics (Ultra-NS siloxane-free grade).",
            "Medical imaging MRI gradient amplifiers and high-frequency electrosurgical generators.",
        ],
        "handling": (
            "1. Micro-Void Elimination: Apply Ultra™ using a rolling motion from one edge to expel trapped air via the diamond-embossed channels. "
            "2. Clamping Pressure: Achieves optimal interfacial wetout (<0.15 K·cm²/W) at just 15–25 psi, protecting fragile bare-die SiC and BGA packages. "
            "3. Non-Silicone Cleanliness: Specify 'Ultra-NS' on all optical/laser BOMs; processed on dedicated cleanroom silicone-free CNC vacuum mats."
        ),
    },
]


def build_layer_diagram(layers, accent_hex):
    """Build a crisp vector cross-sectional material stack diagram using ReportLab Shapes."""
    width = 182 * mm
    row_h = 7.4 * mm
    gap = 1.1 * mm
    pad_top = 1.5 * mm
    total_h = len(layers) * (row_h + gap) + pad_top
    d = Drawing(width, total_h)

    for idx, (label_left, desc_right, bg_hex, fg_hex) in enumerate(layers):
        y = total_h - pad_top - (idx + 1) * (row_h + gap) + gap
        d.add(Rect(0, y, 42 * mm, row_h, fillColor=colors.HexColor(bg_hex), strokeColor=SLATE_BORDER, strokeWidth=0.5, rx=2, ry=2))
        d.add(String(2.8 * mm, y + 2.4 * mm, label_left, fontName="DVSans-Bold", fontSize=6.8, fillColor=colors.HexColor(fg_hex)))
        d.add(Line(42 * mm, y + row_h / 2, 46 * mm, y + row_h / 2, strokeColor=colors.HexColor(accent_hex), strokeWidth=1.2))
        d.add(Rect(46 * mm, y, width - 46 * mm, row_h, fillColor=SLATE_LIGHT, strokeColor=SLATE_BORDER, strokeWidth=0.5, rx=2, ry=2))
        d.add(String(49 * mm, y + 2.4 * mm, desc_right, fontName="DVSans", fontSize=6.9, fillColor=SLATE_DARK))

    return d


def make_header_footer(product):
    accent_color = colors.HexColor(product["accent"])

    def on_page(canvas, doc):
        canvas.saveState()
        w, h = A4

        # Top brand bar
        canvas.setFillColor(SLATE_DARK)
        canvas.rect(0, h - 21 * mm, w, 21 * mm, fill=1, stroke=0)
        canvas.setFillColor(accent_color)
        canvas.rect(0, h - 22.2 * mm, w, 1.2 * mm, fill=1, stroke=0)

        if os.path.exists(LOGO_PATH):
            canvas.setFillColor(WHITE)
            canvas.roundRect(14 * mm, h - 17.5 * mm, 12.5 * mm, 12.5 * mm, 2 * mm, fill=1, stroke=0)
            canvas.drawImage(LOGO_PATH, 15.1 * mm, h - 16.6 * mm, width=10.3 * mm, height=10.7 * mm, preserveAspectRatio=True, mask="auto")

        canvas.setFillColor(WHITE)
        canvas.setFont("DVSans-Bold", 10.5)
        canvas.drawString(29.5 * mm, h - 10.5 * mm, "INSULTHERM INNOVATIONS")
        canvas.setFillColor(colors.HexColor("#94A3B8"))
        canvas.setFont("DVSans", 7.0)
        canvas.drawString(29.5 * mm, h - 15.2 * mm, "ADVANCED THERMAL, DIELECTRIC & RUNAWAY CONTAINMENT MATERIALS")

        canvas.setFillColor(WHITE)
        canvas.setFont("DVSans-Bold", 8.2)
        canvas.drawRightString(w - 14 * mm, h - 10.5 * mm, "TECHNICAL DATA SHEET (TDS)")
        canvas.setFillColor(colors.HexColor("#FDBA74"))
        canvas.setFont("DVMono-Bold", 7.2)
        canvas.drawRightString(w - 14 * mm, h - 15.2 * mm, product["doc_code"])

        # Footer block (zero overlap guaranteed)
        canvas.setStrokeColor(SLATE_BORDER)
        canvas.setLineWidth(0.6)
        canvas.line(14 * mm, 20.5 * mm, w - 14 * mm, 20.5 * mm)

        canvas.setFillColor(SLATE_DARK)
        canvas.setFont("DVSans-Bold", 6.1)
        canvas.drawString(
            14 * mm, 16.2 * mm,
            f"{COMPANY_NAME} | Tel: {PHONE_MASKED} | Official: {EMAIL_PRIMARY} | Orders/RFQ: {EMAIL_OPS}"
        )
        canvas.drawRightString(w - 14 * mm, 16.2 * mm, f"Page {doc.page} of 2")

        canvas.setFillColor(SLATE_MUTED)
        canvas.setFont("DVSans", 5.7)
        canvas.drawString(14 * mm, 12.0 * mm, FACILITY_ADDRESS)
        canvas.drawString(
            14 * mm, 8.0 * mm,
            "Engineering Notice: Typical laboratory & baseline metrics (ASTM D5470 / UL 94 / ASTM E595). System-level OEM qualification is required prior to volume release."
        )

        canvas.restoreState()

    return on_page


def generate_single_tds(product):
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, f"{product['slug']}-tds.pdf")

    doc = SimpleDocTemplate(
        out_path,
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=25 * mm,
        bottomMargin=23 * mm,
        title=f"{product['name']} - Technical Data Sheet | InsulTherm Innovations",
        author=COMPANY_NAME,
        subject=product["subtitle"],
    )

    styles = getSampleStyleSheet()
    accent_color = colors.HexColor(product["accent"])

    s_series = ParagraphStyle("Series", parent=styles["Normal"], fontName="DVMono-Bold", fontSize=7.5, textColor=accent_color, spaceAfter=1.5)
    s_title = ParagraphStyle("ProdTitle", parent=styles["Heading1"], fontName="DVSans-Bold", fontSize=16.5, leading=19.5, textColor=SLATE_DARK, spaceAfter=2)
    s_sub = ParagraphStyle("ProdSub", parent=styles["Normal"], fontName="DVSans-Bold", fontSize=8.8, leading=11.8, textColor=SLATE_MUTED, spaceAfter=4.5)
    s_h2 = ParagraphStyle("SecH2", parent=styles["Heading2"], fontName="DVSans-Bold", fontSize=9.2, leading=12, textColor=SLATE_DARK, spaceBefore=5.5, spaceAfter=3)
    s_body = ParagraphStyle("Body", parent=styles["Normal"], fontName="DVSans", fontSize=7.8, leading=11.2, textColor=SLATE_MID, alignment=TA_JUSTIFY, spaceAfter=3)
    s_bullet = ParagraphStyle("BulletItem", parent=s_body, leftIndent=10, firstLineIndent=-7, spaceAfter=2.5)
    s_cell = ParagraphStyle("Cell", parent=styles["Normal"], fontName="DVSans", fontSize=7.3, leading=9.8, textColor=SLATE_DARK)
    s_cell_bold = ParagraphStyle("CellB", parent=s_cell, fontName="DVSans-Bold")
    s_cell_mono = ParagraphStyle("CellMono", parent=s_cell, fontName="DVMono-Bold", fontSize=7.0, textColor=SLATE_DARK)
    s_th = ParagraphStyle("TH", parent=styles["Normal"], fontName="DVSans-Bold", fontSize=7.3, leading=9.5, textColor=WHITE)

    story = []

    badge_cells = [
        Paragraph(f"<b>{escape(b)}</b>", ParagraphStyle("Bdg", fontName="DVMono-Bold", fontSize=6.8, alignment=TA_CENTER, textColor=SLATE_DARK))
        for b in product["badges"]
    ]
    col_w = (182 * mm) / len(badge_cells)
    badge_tbl = Table([badge_cells], colWidths=[col_w] * len(badge_cells))
    badge_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SLATE_LIGHT),
        ("BOX", (0, 0), (-1, -1), 0.6, SLATE_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, SLATE_BORDER),
        ("TOPPADDING", (0, 0), (-1, -1), 3.2),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.2),
    ]))

    img_path = os.path.join(PRODUCTS_IMG_DIR, product["image"])
    left_hero = [
        Paragraph(escape(product["series"]), s_series),
        Paragraph(escape(product["name"]), s_title),
        Paragraph(escape(product["subtitle"]), s_sub),
        Paragraph(escape(product["overview"]), s_body),
    ]
    if os.path.exists(img_path):
        prod_img = Image(img_path, width=56 * mm, height=37 * mm)
        img_caption = Paragraph(
            "Macro Cross-Section / Studio Hardware Inspection",
            ParagraphStyle("Cap", fontName="DVSans", fontSize=6.0, alignment=TA_CENTER, textColor=SLATE_MUTED, spaceBefore=2)
        )
        hero_tbl = Table([[left_hero, [prod_img, img_caption]]], colWidths=[122 * mm, 60 * mm])
        hero_tbl.setStyle(TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (0, 0), 0),
            ("RIGHTPADDING", (0, 0), (0, 0), 5 * mm),
            ("LEFTPADDING", (1, 0), (1, 0), 2 * mm),
            ("RIGHTPADDING", (1, 0), (1, 0), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ]))
        story.append(hero_tbl)
    else:
        story.extend(left_hero)

    story.append(Spacer(1, 1.5 * mm))
    story.append(badge_tbl)
    story.append(Spacer(1, 1.5 * mm))

    story.append(Paragraph("1. CHEMICAL / MATERIAL COMPOSITION &amp; INTERNAL LAYER ARCHITECTURE", s_h2))
    story.append(Paragraph(escape(product["chemistry"]), s_body))
    story.append(Spacer(1, 1 * mm))
    story.append(build_layer_diagram(product["layers"], product["accent"]))
    story.append(Spacer(1, 1.5 * mm))

    story.append(Paragraph("2. TYPICAL PHYSICAL, THERMAL &amp; ELECTRICAL PROPERTIES", s_h2))
    prop_rows = [[
        Paragraph("PROPERTY / PARAMETER", s_th),
        Paragraph("TYPICAL ENGINEERING VALUE", s_th),
        Paragraph("TEST METHOD / STANDARD", s_th),
    ]]
    for p_name, p_val, p_std in product["properties"]:
        prop_rows.append([
            Paragraph(escape(p_name), s_cell_bold),
            Paragraph(escape(p_val), s_cell_mono),
            Paragraph(escape(p_std), s_cell),
        ])

    prop_tbl = Table(prop_rows, colWidths=[58 * mm, 76 * mm, 48 * mm], repeatRows=1)
    prop_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), SLATE_DARK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SLATE_LIGHT]),
        ("BOX", (0, 0), (-1, -1), 0.6, SLATE_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, SLATE_BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 2.8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2.8),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(prop_tbl)

    # Page 2
    story.append(PageBreak())

    story.append(Paragraph("3. ORDERING NOMENCLATURE, PREMIX VARIANTS &amp; COMMERCIAL PRICING SCHEDULE", s_h2))
    var_rows = [[
        Paragraph("PART / GRADE CODE", s_th),
        Paragraph("MATERIAL SPECIFICATION &amp; CONSTRUCTION", s_th),
        Paragraph("PROTOTYPE / R&amp;D TIER", s_th),
        Paragraph("VOLUME / OEM TIER", s_th),
    ]]
    for v_code, v_desc, v_proto, v_vol in product["variants"]:
        var_rows.append([
            Paragraph(escape(v_code), s_cell_mono),
            Paragraph(escape(v_desc), s_cell),
            Paragraph(escape(v_proto), s_cell_bold),
            Paragraph(escape(v_vol), s_cell_bold),
        ])
    var_tbl = Table(var_rows, colWidths=[35 * mm, 75 * mm, 38 * mm, 34 * mm], repeatRows=1)
    var_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), accent_color),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, SLATE_LIGHT]),
        ("BOX", (0, 0), (-1, -1), 0.6, SLATE_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, SLATE_BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.append(var_tbl)
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("4. TARGET INDUSTRIAL APPLICATIONS &amp; DEPLOYMENT SECTORS", s_h2))
    for app in product["applications"]:
        story.append(Paragraph(f"•  {escape(app)}", s_bullet))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("5. DIGITAL CNC CONVERTING, APPLICATION &amp; STORAGE GUIDELINES", s_h2))
    story.append(Paragraph(escape(product["handling"]), s_body))
    story.append(Spacer(1, 3 * mm))

    story.append(Paragraph("6. QUALITY ASSURANCE, REGULATORY COMPLIANCE &amp; SOVEREIGN DVA TRACEABILITY", s_h2))
    qa_rows = [
        [Paragraph("<b>Thermal &amp; Electrical Metrology</b>", s_cell), Paragraph("Batch-wise ASTM D5470-17 thermal impedance calibration curves (10–50 psi) &amp; ASTM D149 dielectric verification.", s_cell)],
        [Paragraph("<b>Flammability &amp; Fire Safety</b>", s_cell), Paragraph("UL 94 V-0 rated material formulations; supports ARAI AIS-156 Amendment 3 &amp; UL 9540A pack/rack propagation testing.", s_cell)],
        [Paragraph("<b>Outgassing &amp; Environmental</b>", s_cell), Paragraph("RoHS 3 (EU 2015/863) &amp; REACH compliant; ASTM E595 low-outgassing trace on Graphite-Flex™ &amp; Ultra-NS™ grades.", s_cell)],
        [Paragraph("<b>Domestic Value Addition (DVA)</b>", s_cell), Paragraph("100% India Digital CNC Converting (Gujarat); compliant with PM E-DRIVE, SECI BESS DVA &amp; &lt;₹200 Cr MoD GTE Ban.", s_cell)],
    ]
    qa_tbl = Table(qa_rows, colWidths=[52 * mm, 130 * mm])
    qa_tbl.setStyle(TableStyle([
        ("ROWBACKGROUNDS", (0, 0), (-1, -1), [SLATE_LIGHT, WHITE]),
        ("BOX", (0, 0), (-1, -1), 0.6, SLATE_BORDER),
        ("INNERGRID", (0, 0), (-1, -1), 0.4, SLATE_BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.append(qa_tbl)
    story.append(Spacer(1, 5 * mm))

    cta_text = (
        f"<b>RAPID 24–48 HOUR CAD-TO-PART PROTOTYPING &amp; OEM PROCUREMENT DESK</b><br/>"
        f"Submit .DXF / .STEP drawings, request &lt;₹15,000 Petty-Cash R&amp;D Sampler Kits, or schedule an engineering review:<br/>"
        f"<b>Primary Official Desk:</b> {escape(EMAIL_PRIMARY)}  |  <b>Active Operations &amp; Order Routing:</b> {escape(EMAIL_OPS)}<br/>"
        f"<b>Engineering Helpline:</b> {escape(PHONE_MASKED)}  |  <b>Manufacturing Wing:</b> {escape(FACILITY_ADDRESS)}"
    )
    cta_tbl = Table([[Paragraph(cta_text, ParagraphStyle("CTA", fontName="DVSans", fontSize=7.8, leading=12.5, textColor=WHITE))]], colWidths=[182 * mm])
    cta_tbl.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SLATE_DARK),
        ("BOX", (0, 0), (-1, -1), 1.0, accent_color),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
    ]))
    story.append(KeepTogether([cta_tbl]))

    doc.build(story, onFirstPage=make_header_footer(product), onLaterPages=make_header_footer(product))
    return out_path


def main():
    print("Generating 5 enterprise Technical Data Sheet (TDS) PDFs...")
    for p in PRODUCTS_TDS:
        path = generate_single_tds(p)
        size_kb = os.path.getsize(path) / 1024
        print(f"  [OK] {os.path.basename(path)} ({size_kb:.1f} KB)")


if __name__ == "__main__":
    main()
