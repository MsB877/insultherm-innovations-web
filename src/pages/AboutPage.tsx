import React from 'react';
import { Link } from 'react-router-dom';
import {
  Cpu,
  ShieldCheck,
  Microscope,
  Factory,
  Flame,
  CheckCircle2,
  ArrowRight,
  FileText,
  Users,
} from 'lucide-react';
import { CERTIFICATIONS_LIST, CONTACT_CONFIG, CORE_PRODUCTS } from '../data/companyData';
import { InquiryPreset } from '../components/InquiryModal';

interface AboutPageProps {
  onOpenInquiry: (preset?: InquiryPreset) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenInquiry }) => {
  const manufacturingRoadmap = [
    {
      phase: 'Phase 1 — Active Factory Baseline (Year 1)',
      capex: '₹7,00,000 Setup CapEx',
      title: 'Digital CNC Oscillating-Knife Converting & In-House ASTM D5470 Metrology',
      details:
        'Multi-axis digital CNC oscillating-knife flatbed table with perforated vacuum hold-down bed (800–1,200 custom parts/day throughput; 50%-depth living-hinge crease scoring; differential release-liner kiss-cutting) paired with an in-house ASTM D5470-17 steady-state thermal impedance calibration rig (10–50 psi).',
    },
    {
      phase: 'Phase 2 — High-Volume OEM Scale-Out (Year 2)',
      capex: '₹8,40,000 Tooling CapEx',
      title: 'Hybrid Rotary Die-Cutting Tolling Network (>10,000 Units/Month)',
      details:
        'As qualified BESS, Rail, and EMS programs graduate past 10,000 units/month, high-speed rotary kiss-cutting (@ ₹3.75/pad converting rate) handles bulk volume while keeping the in-house CNC flatbed 100% dedicated to 24–48 hour CAD prototypes and precision Graphite-Flex™ / Shield™ runs.',
    },
    {
      phase: 'Phase 3 — Backward Chemical Integration (Year 3)',
      capex: '₹4,20,000 Compounding CapEx',
      title: 'In-House Dual-Planetary Vacuum Mixing & High-Shear Ceramic Dispersion',
      details:
        'Commissioning proprietary vacuum compounding for silane-passivated bimodal Al2O3 and shear-aligned hexagonal Boron Nitride (h-BN) slurries, stripping out third-party master-sheet premiums and reducing unit COGS by 10.02%.',
    },
    {
      phase: 'Phase 4 — Regulated Cleanroom Expansion (Years 4–7)',
      capex: 'Internal Cash-Flow Funded',
      title: 'AS9100D (Aerospace), ISO 13485 (Medical) & Dispensable Liquid Formulations',
      details:
        'Scaling 2-part 1:1 cure-in-place robotic liquid gap fillers alongside cleanroom-laminated non-silicone phase-change and low-outgassing interfaces for defense avionics, satellite payloads, and MRI/electrosurgical electronics.',
    },
  ];

  const feaScenarios = [
    {
      quadrant: 'Q1: Idle / Parked Summer Soak',
      load: '45.0°C Indian summer ambient; active chiller OFF (0 W cell load)',
      result: 'Uniform 45.0°C stabilization; zero siloxane oil bleed or phase separation on Core™.',
    },
    {
      quadrant: 'Q2: Continuous 1C City Driving',
      load: '25.0°C cold plate; 15 W continuous internal heat per cell',
      result: 'Cells stabilized securely in optimal 38°C – 42°C operating band via Core™ (3.0 W/m·K).',
    },
    {
      quadrant: 'Q3: 3C DC Fast Charge / Grade Climb',
      load: '20.0°C max chiller; 55 W heavy resistive heat per cell',
      result: 'Peak cell temperature held at 55°C – 62°C, safely below the 65°C degradation limit.',
    },
    {
      quadrant: 'Q4: ARAI AIS-156 Single-Cell Runaway',
      load: 'Cell 1 catastrophic thermal runaway (400°C – 800°C exothermic event)',
      result:
        'InsulTherm Barrier™ (k = 0.018 W/m·K) holds adjacent cell at 74.189°C (<80°C secondary cascade threshold).',
    },
  ];

  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Banner */}
      <section className="bg-[#0B192C] text-white border-b border-slate-800 bg-dark-grid py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-400 font-bold">
            <Factory className="w-4 h-4" />
            <span>About InsulTherm Innovations &amp; Manufacturing Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-4xl leading-tight">
            Engineering Sovereign Thermal, Dielectric &amp; Fire-Safety Interfaces for High-Reliability Hardware.
          </h1>
          <p className="text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            InsulTherm Innovations is an asset-agile advanced materials converting and specialty compounding venture headquartered in Gujarat&apos;s Sanand GIDC / iCreate industrial corridor—built to eliminate imported catalog lead times and hard-tooling friction across India&apos;s energy storage, rail, defense, and AI compute ecosystems.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Vision, Mission & Defensible Moat */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-600 font-bold">
              <Microscope className="w-4 h-4" />
              <span>Origin Narrative &amp; Strategic Thesis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Our CNC Knife Table Is Our Commercial Wedge; Tropical Material Chemistry Is Our Moat.
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Indian hardware R&amp;D engineers designing 1,500V DC BESS racks, railway traction converters, defense avionics, and ARAI AIS-156 battery packs face a structural bottleneck: global incumbents enforce 4-to-8 week import lead times, ₹25,000–₹60,000 stamping/molding NRE fees, and 500–1,000 piece MOQs—while generic commodity pads suffer severe siloxane oil pump-out in 50°C Indian summer temperatures.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              By combining <strong>24–48 hour tool-free digital CNC converting</strong> with a resilient multi-sector 5-IP material architecture—<strong>Shield™</strong> (32% target mix), <strong>Barrier™</strong> (26%), <strong>Graphite-Flex™</strong> (15%), <strong>Core™</strong> (15%), and <strong>Ultra™</strong> (12%)—we embed custom-nested interfaces into OEM CAD designs during rapid prototyping, locking into production Bills of Materials before designs freeze.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-mono uppercase text-orange-600 font-bold mb-1">
                  Corporate Mission
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Deliver CAD-matched thermal, dielectric, and 1,100°C fire-containment interfaces from digital drawing to engineering bench in 24–48 hours with ₹0 tooling NRE and full ASTM/UL lot traceability.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <div className="text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
                  Long-Term Vision
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Scale from rapid digital converter to India&apos;s sovereign AS9100D &amp; ISO 13485 certified specialty interface compounder—replacing imported TIMs, aerogels, and pyrolytic graphite laminates.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-3">
            <div className="rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-slate-900">
              <img
                src="/assets/facility/cnc-converting-lab.jpg"
                alt="InsulTherm Digital CNC Oscillating-Knife & ASTM D5470 Calibration Lab"
                className="w-full h-72 sm:h-80 object-cover"
              />
            </div>
            <p className="text-xs font-mono text-slate-500 text-center">
              Digital CNC Vacuum-Bed Oscillating-Knife Converting &amp; Steady-State ASTM D5470 Rig
            </p>
          </div>
        </section>

        {/* 4-Stage Manufacturing Scale-Up Roadmap */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-600 font-bold mb-1">
              <Cpu className="w-4 h-4" />
              <span>Capital-Disciplined Industrial Execution</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              R&amp;D, Digital Converting &amp; Compounding Scale-Up Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manufacturingRoadmap.map((step) => (
              <div
                key={step.phase}
                className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded">
                    {step.phase}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-600">
                    {step.capex}
                  </span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900">{step.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{step.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Material Science & 4-Quadrant Thermal Runaway FEA Validation */}
        <section className="bg-[#0B192C] text-white rounded-2xl border border-slate-800 p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-400 font-bold">
              <Flame className="w-4 h-4" />
              <span>Empirical FEA &amp; Benchtop Hardware Proof</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              4-Quadrant Thermal Runaway Simulation &amp; Tri-Hazard Containment
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Validated in Autodesk Fusion steady-state &amp; transient thermal models across Indian summer soak, 3C fast-charge, and catastrophic single-cell thermal runaway events.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img
                    src="/assets/validation/fea-runaway-400c.png"
                    alt="400°C Runaway Cell vs 74.189°C Protected Adjacent Cell FEA"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 text-[11px] font-mono text-slate-300">
                    Runaway Event: Adjacent cell held at 74.189°C (&lt;80°C limit)
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                  <img
                    src="/assets/products/tri-hazard-kit.jpg"
                    alt="Core, Barrier & Shield Benchtop Prototypes"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-2.5 text-[11px] font-mono text-slate-300">
                    Benchtop Inspection: Core™ + Barrier™ + Shield™ Origami
                  </div>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-950">
                <img
                  src="/assets/validation/cad-exploded-pack.png"
                  alt="Exploded CAD Pack Integration"
                  className="w-full h-44 object-cover"
                />
                <div className="p-2.5 text-[11px] font-mono text-slate-300">
                  Exploded CAD Architecture: Bottom Core™ Pad + Inter-Cell Barrier™ + Top Busbar Shield™
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-3">
              {feaScenarios.map((item) => (
                <div
                  key={item.quadrant}
                  className="rounded-xl bg-slate-900/90 border border-slate-800 p-4 space-y-1"
                >
                  <div className="text-xs font-mono font-bold text-orange-400">
                    {item.quadrant}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">Boundary: {item.load}</div>
                  <div className="text-xs sm:text-sm text-white font-medium pt-0.5">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications, Compliance & TDS Data-Room */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-emerald-700 font-bold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Standards, Metrology &amp; Regulatory Documentation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Quality Standards &amp; Sovereign Procurement Readiness
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS_LIST.map((c) => (
              <div
                key={c.code}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col justify-between space-y-3 shadow-sm"
              >
                <div>
                  <div className="font-mono text-sm font-extrabold text-slate-900">{c.code}</div>
                  <div className="text-xs font-bold text-orange-600 mt-0.5">{c.title}</div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{c.scope}</p>
                </div>
                <div className="text-[11px] font-mono text-emerald-700 font-semibold pt-2 border-t border-slate-100">
                  ✓ {c.status}
                </div>
              </div>
            ))}
          </div>

          {/* Direct Download Strip for All 5 TDS PDFs */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Download Official 2-Page Product Technical Data Sheets (PDF)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Instant access to full material compositions, ASTM/UL test methods, and commercial pricing schedules:
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {CORE_PRODUCTS.map((p) => (
                <a
                  key={p.id}
                  href={p.tdsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-mono text-xs font-bold transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-orange-600" />
                  <span>{p.shortName} TDS</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Founding Leadership & Facility CTA */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase text-orange-600 font-bold">
              <Users className="w-4 h-4" />
              <span>Founding Engineering Team &amp; Gujarat Facility</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Built by Material Scientists &amp; Thermal Systems Engineers
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Founded by <strong>Manav</strong> (Operations, Strategy &amp; Lead Applications),{' '}
              <strong>Nikhil</strong> (CAD/FEA Thermal Simulation &amp; Digital CNC Systems), and{' '}
              <strong>Sukhmeet</strong> (Polymer Compounding &amp; Dielectric/Fire Validation). Operating out of{' '}
              <span className="font-medium text-slate-800">{CONTACT_CONFIG.addressShort}</span>.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-xs font-mono text-slate-700">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {CONTACT_CONFIG.phoneMasked}
              </span>
              <a
                href={`mailto:${CONTACT_CONFIG.emailPrimary}`}
                className="text-orange-600 font-semibold hover:underline"
              >
                {CONTACT_CONFIG.emailPrimary}
              </a>
              <a
                href={`mailto:${CONTACT_CONFIG.emailOperations}`}
                className="text-emerald-700 font-semibold hover:underline"
              >
                {CONTACT_CONFIG.emailOperations}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors"
            >
              <span>Explore Technical Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              type="button"
              onClick={() =>
                onOpenInquiry({
                  productName: 'Factory Qualification & Engineering Consultation',
                  pricingTier: 'OEM / PSU Technical Audit & Sample Pilot',
                })
              }
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors"
            >
              <span>Schedule Engineering Review</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
