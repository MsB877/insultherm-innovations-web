import React from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  CheckCircle2,
  Mail,
  ArrowRight,
  FileCode2,
  Scissors,
  Gauge,
  PackageCheck,
} from 'lucide-react';
import { COMPANY_INFO, ORIGIN_BACKSTORY } from '../data/companyData';
import { ValidationShowcase } from '../components/ValidationShowcase';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface AboutPageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

const SOURCING_COMPARISON_ROWS = [
  {
    criterion: 'Custom Tooling Cost (NRE)',
    imports: '₹25,000 – ₹60,000 per steel die or injection mold',
    commodity: '₹15,000 – ₹25,000 hard punch die per revision',
    insultherm: '₹0 Hard-Tooling NRE (Direct .DXF / .STEP CNC)',
  },
  {
    criterion: 'Prototype & Revision Turnaround',
    imports: '4 – 8 Weeks (Overseas freight + customs clearance)',
    commodity: '1 – 3 Weeks (External die-shop queue)',
    insultherm: '24 – 48 Hours from CAD approval',
  },
  {
    criterion: 'Minimum Order & Cash Outlay',
    imports: 'Master-roll MOQs + import duty/IGST cash lockup',
    commodity: '200 – 500 pc stamping setup minimums',
    insultherm: 'MOQ = 1 Piece or <₹15,000 R&D Kits',
  },
  {
    criterion: '3D Busbar & Firewall Geometry',
    imports: 'Flat catalog rolls; 3D shrouds require plastic molds',
    commodity: 'Liquid pastes cannot form vertical firewalls or 3D wraps',
    insultherm: '50%-Depth Living-Hinge Origami & 1,100°C Vertical Walls',
  },
  {
    criterion: 'High-Ambient & Optical Stability',
    imports: 'Standard silicone pads risk volatile siloxane migration',
    commodity: 'Unverified sheets prone to oil bleed & assembly stretch',
    insultherm: '50°C–150°C Anti-Bleed Scrim + ASTM E595 Silicone-Free Grades',
  },
  {
    criterion: 'Technical & Domestic Traceability',
    imports: 'Generic global catalog sheet only',
    commodity: 'No test alignment or DVA documentation',
    insultherm: 'ASTM D5470 / D149 Test Alignment + Domestic DVA Docs',
  },
];

const PRODUCTION_STEPS = [
  {
    step: 'Step 01',
    icon: FileCode2,
    title: 'CAD Intake & Digital Nesting',
    summary:
      'Customer .DXF or .STEP files are checked for bolt-hole datums, creepage margins, and bend radii, then nested digitally to maximize sheet yield with zero die fabrication.',
  },
  {
    step: 'Step 02',
    icon: Scissors,
    title: 'Vacuum-Bed CNC Cutting & Z-Creasing',
    summary:
      'Laminates are secured on a vacuum hold-down bed while oscillating blades execute fray-free through-cuts, split-liner kiss-cuts, 50%-depth living hinges (Shield™), and Kapton® edge seals (Graphite-Flex™).',
  },
  {
    step: 'Step 03',
    icon: Gauge,
    title: 'Dimensional, Thermal & Dielectric QC',
    summary:
      'Converted lots undergo caliper and datum verification (±0.15 mm), steady-state thermal impedance benchmarking (ASTM D5470 rig), and dielectric isolation checks (ASTM D149).',
  },
  {
    step: 'Step 04',
    icon: PackageCheck,
    title: 'Indexed Liner Prep & 24–48h Dispatch',
    summary:
      'Parts are finished with ergonomic peel-tabs or kiss-cut carrier sheets, sealed in moisture/ESD-safe pouches, and shipped in 24–48 hours—with repeat approved drawings supported via dedicated rotary kiss-cut scheduling.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLightbox }) => {
  return (
    <div className="bg-canvas-tonal pb-24">
      {/* Balanced Architectural Header Section */}
      <section className="relative bg-hero-architectural bg-subtle-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
              Manufacturing & Engineering Validation
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] leading-tight tracking-tight">
              Precision Materials Science Meets Zero-Tooling Digital Converting
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Operating from the Sanand GIDC industrial corridor near Ahmedabad, Gujarat,{' '}
              <strong className="text-[#0F1115]">InsulTherm Innovations</strong> eliminates multi-week
              import delays and hard-tooling fees across BESS, industrial power electronics, defense
              hardware, and EV R&D programs—delivering custom converted parts in 24–48 hours.
            </p>
            <div className="pt-1 flex flex-wrap gap-3">
              <Link
                to="/quote"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold transition-colors"
              >
                Calculate Custom Part <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-gray-300 hover:border-[#0F1115] text-[#0F1115] text-sm font-semibold transition-colors"
              >
                Contact Engineering
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: '/assets/facility/cnc-converting-lab.jpg',
                  title: 'Digital CNC Oscillating-Knife & Crease-Scoring Cell',
                  badge: 'Sanand GIDC Facility',
                  description:
                    'Precision digital CNC converting cell cutting custom TIM pads, aerogel-mica sheets, and 50%-depth living-hinge dielectric shrouds directly from .DXF / .STEP files.',
                })
              }
              className="group bg-white border border-gray-200/90 rounded-2xl p-3.5 shadow-md cursor-zoom-in"
            >
              <img
                src="/assets/facility/cnc-converting-lab.jpg"
                alt="InsulTherm Digital CNC Converting Lab"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="mt-3 px-1 flex items-center justify-between text-xs text-gray-600">
                <span className="font-medium">
                  Digital CNC Oscillating-Knife & Living-Hinge Scoring Cell
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-[#DC2626]">
                  <Maximize2 className="w-3.5 h-3.5" /> Full View
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Wave Transition */}
        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-7 sm:h-10"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16C380 44 820 -4 1440 20V42H0V16Z"
              fill="#EEF1F6"
            />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        {/* Section 1B: Authentic Indigenous Origin Story & India Market Bottleneck */}
        <section className="bg-white border border-gray-200/90 rounded-2xl p-7 sm:p-10 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                {ORIGIN_BACKSTORY.eyebrow}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] leading-snug">
                {ORIGIN_BACKSTORY.headline}
              </h2>
              <div className="space-y-3.5 text-sm sm:text-base text-gray-600 leading-relaxed">
                {ORIGIN_BACKSTORY.narrativeParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="pt-1">
                <Link
                  to="/knowledge"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#DC2626] hover:underline"
                >
                  Read Our Polymer Chemistry & Regulatory Primers in the Knowledge Centre{' '}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ORIGIN_BACKSTORY.keyStats.map((st) => (
                <div
                  key={st.label}
                  className="rounded-xl border border-gray-200 bg-[#F8FAFC] p-5 space-y-1.5"
                >
                  <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#DC2626]">
                    {st.value}
                  </div>
                  <div className="text-xs font-bold text-[#0F1115]">{st.label}</div>
                  <p className="text-[11px] text-gray-600 leading-relaxed">{st.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* India Domestic Market Context Table */}
          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
              India Domestic Specialty Thermal & Dielectric Market Context (Synthesized @ ₹84/USD)
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#0F1115] text-white">
                    <th className="py-3 px-4 font-bold">Market Segment</th>
                    <th className="py-3 px-4 font-semibold text-gray-300">Current India Scale</th>
                    <th className="py-3 px-4 font-bold bg-[#DC2626] text-white">
                      2030 Projected India Scale
                    </th>
                    <th className="py-3 px-4 font-semibold text-gray-300">
                      Included Hardware & Demand Drivers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {ORIGIN_BACKSTORY.marketSizingTable.map((m, i) => (
                    <tr key={m.metric} className={i % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                      <td className="py-3.5 px-4 font-bold text-[#0F1115]">{m.metric}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-gray-800">
                        {m.currentInr}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F1115] bg-red-50/50">
                        {m.projected2030Inr}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600">{m.scope}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section 2: Full Uncropped Validation Showcase */}
        <section>
          <ValidationShowcase onOpenLightbox={onOpenLightbox} />
        </section>

        {/* Section 3: Native, Fact-Checked B2B Sourcing Comparison (Zero Internal Screenshots or Margins) */}
        <section className="bg-white border border-gray-200/90 rounded-2xl p-7 sm:p-10 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                Why InsulTherm
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] leading-snug">
                Bridging the Gap Between Slow Imports & Unverified Commodity Sheets
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Imported catalog sheets lock up working capital in high roll MOQs, multi-week customs
                clearance, and separate tooling—while generic local commodity pads lack anti-bleed
                stability, low-outgassing adhesives, and 3D living-hinge precision.
              </p>

              <ul className="space-y-2.5 text-sm text-gray-700 pt-1">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0F1115]">Design Revisions Without Penalty:</strong>{' '}
                    Modify busbar slots or cell spacing in CAD and receive updated parts in 48 hours
                    with ₹0 die fees.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0F1115]">Solid Structural Architectures:</strong>{' '}
                    Vertical 1,100°C inter-cell firewalls and 3D folded busbar shrouds where liquid
                    dispensers cannot be applied.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                  <span>
                    <strong className="text-[#0F1115]">Domestic Value Addition (DVA):</strong>{' '}
                    Converted in Gujarat to support domestic BESS, rail, and defense procurement
                    mandates.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#0F1115] text-white">
                      <th className="py-3.5 px-4 font-bold">Engineering / Sourcing Factor</th>
                      <th className="py-3.5 px-4 font-semibold text-gray-300">
                        Imported Catalogs
                      </th>
                      <th className="py-3.5 px-4 font-semibold text-gray-300">
                        Commodity Die-Cutters
                      </th>
                      <th className="py-3.5 px-4 font-bold text-white bg-[#DC2626]">
                        InsulTherm Digital CNC
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {SOURCING_COMPARISON_ROWS.map((row, idx) => (
                      <tr key={row.criterion} className={idx % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}>
                        <td className="py-3.5 px-4 font-bold text-[#0F1115]">{row.criterion}</td>
                        <td className="py-3.5 px-4 text-gray-600">{row.imports}</td>
                        <td className="py-3.5 px-4 text-gray-600">{row.commodity}</td>
                        <td className="py-3.5 px-4 font-bold text-[#0F1115] bg-red-50/55">
                          {row.insultherm}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Curated 4-Step Production & Converting Procedure */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Production Procedure
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
              Digital CAD-to-Part Converting Workflow
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2 leading-relaxed">
              Every custom profile and R&D kit follows a controlled four-stage converting and
              inspection workflow at our Sanand facility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTION_STEPS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-red-50 text-[#DC2626]">
                        {item.step}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-[#0F1115] text-white flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#0F1115] leading-snug">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Founding Leadership ("Founder" Titles + Clean Spacing) */}
        <section className="bg-[#0F1115] text-white rounded-2xl p-8 sm:p-12 space-y-8 scroll-mt-24">
          <div className="max-w-2xl space-y-1.5">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Leadership Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Direct Engineering & Commercial Ownership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_INFO.founders.map((f) => (
              <div
                key={f.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-[#DC2626] text-white font-extrabold text-base flex items-center justify-center">
                    {f.name[0]}
                  </div>
                  <h3 className="text-lg font-bold text-white">{f.name}</h3>
                  <div className="text-xs font-semibold text-gray-200">{f.role}</div>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1">{f.focus}</p>
                </div>
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="mt-5 pt-3 border-t border-white/10 inline-flex items-center gap-1.5 text-xs font-mono text-[#DC2626] hover:text-red-400"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {f.email}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
