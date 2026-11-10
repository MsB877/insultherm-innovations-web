# InsulTherm Innovations — Enterprise B2B Portal & Digital Converting Engine

Official production web application and programmatic Technical Data Sheet (TDS) engineering suite for **InsulTherm Innovations** (Advanced Thermal, Dielectric & 1,100°C Runaway Containment Materials).

## Core Capabilities
- **5 Proprietary Material Systems:**
  1. **InsulTherm Shield™** (`insultherm-shield`) — Crease-scored 3D dielectric busbar origami (`>22–32 kV/mm`, `UL 94 V-0`, `₹45` proto / `₹30` volume)
  2. **InsulTherm Barrier™** (`insultherm-barrier`) — 4-layer Phlogopite mica + nanoporous silica aerogel firewall (`k = 0.018 W/m·K`, `>1,100°C` hold, `₹110` proto / `₹85` volume)
  3. **InsulTherm Graphite-Flex™** (`insultherm-graphite-flex`) — 5-layer edge-sealed Kapton® + pyrolytic graphite spreader (`1,000–1,500 W/m·K`, `ASTM E595`, `₹350–₹1,800` custom part)
  4. **InsulTherm Core™** (`insultherm-core`) — 5-layer tropical anti-bleed `Al2O3` silicone TIM pad (`3.0 W/m·K`, `₹80` proto / `₹20` `50×50mm` BMS / `₹61.20` OEM blanket)
  5. **InsulTherm Ultra™** (`insultherm-ultra`) — High-flux bimodal `Al2O3` + aligned `h-BN` percolation TIM pad (`5.5 W/m·K`, `Rth < 0.15 K·cm²/W`, `₹140` proto / `₹95` volume)
- **Standalone 2-Page PDF Technical Data Sheets:** Generated programmatically via `scripts/generate_tds.py` into `public/tds/[product-slug]-tds.pdf`.
- **Interactive Digital CNC CAD-to-Part Quote Engine & Side-by-Side Parametric Comparison Matrix.**
- **Netlify Forms & Live Operational Lead Routing:** Configured to deliver all RFQ and purchase inquiries directly to `manavsb9719@gmail.com`.

## Build & Run
```bash
npm install
npm run generate:tds
npm run build
npm run preview
```
