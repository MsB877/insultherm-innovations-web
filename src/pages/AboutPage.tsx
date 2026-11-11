import React from 'react';
import { Link } from 'react-router-dom';
import {
  Maximize2,
  CheckCircle2,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { ValidationShowcase } from '../components/ValidationShowcase';
import { LightboxImagePayload } from '../components/ImageLightbox';

interface AboutPageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLightbox }) => {
  return (
    <div className="bg-[#F7F8FA] pb-24">
      {/* Clean Header Section */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Manufacturing & Engineering Validation
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] leading-tight tracking-tight">
              Precision Materials Science Meets Zero-Tooling Digital Converting
            </h1>
            <p className="text-base text-gray-600 leading-relaxed">
              Operating from the Sanand GIDC industrial corridor near Ahmedabad, Gujarat,{' '}
              <strong className="text-[#0F1115]">InsulTherm Innovations</strong> eliminates the
              8-week import and tooling bottleneck faced by hardware teams—delivering custom
              thermal, fire-barrier, and dielectric parts in 24–48 hours.
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
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-gray-300 hover:border-[#0F1115] text-[#0F1115] text-sm font-semibold transition-colors"
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
              className="group bg-[#F7F8FA] border border-gray-200 rounded-xl p-3 cursor-zoom-in"
            >
              <img
                src="/assets/facility/cnc-converting-lab.jpg"
                alt="InsulTherm Digital CNC Converting Lab"
                className="w-full h-auto object-contain rounded-lg"
              />
              <div className="mt-3 px-1 flex items-center justify-between text-xs text-gray-600">
                <span>Digital CNC Oscillating-Knife & Living-Hinge Scoring Cell</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#DC2626]">
                  <Maximize2 className="w-3.5 h-3.5" /> Full View
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Section 2: Full Uncropped 8-Plate Validation Showcase */}
        <section>
          <ValidationShowcase onOpenLightbox={onOpenLightbox} />
        </section>

        {/* Section 3: Strategic Benchmark (Clean 2-Col) */}
        <section className="bg-white border border-gray-200 rounded-xl p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center shadow-sm">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Why InsulTherm
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115]">
              Bridging the Gap Between Slow Imports & Unverified Commodity Sheets
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Legacy multinational distributors require high MOQs, 6–10 week lead times, and costly
              steel dies—while unbranded commodity traders lack anti-bleed stability and ASTM
              compliance.
            </p>
            <ul className="space-y-2.5 text-sm text-gray-700 pt-1">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#0F1115]">MOQ 1 Piece & ₹0 NRE:</strong> Iterate geometry
                  freely during R&D without paying ₹40,000+ per die revision.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#0F1115]">Verified ASTM Standards:</strong> D5470 thermal
                  impedance, D149 dielectric breakdown, and E595 outgassing traceability.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-1" />
                <span>
                  <strong className="text-[#0F1115]">100% Domestic Supply:</strong> Sovereign Indian
                  converting for EV PLI and Defense PSU programs.
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: '/assets/validation/competitor-benchmark.jpg',
                  title: 'InsulTherm vs. Multinational Imports & Commodity Traders',
                  badge: 'Benchmark Matrix',
                })
              }
              className="bg-[#F7F8FA] border border-gray-200 rounded-xl p-4 cursor-zoom-in"
            >
              <img
                src="/assets/validation/competitor-benchmark.jpg"
                alt="InsulTherm Benchmark Comparison"
                className="w-full h-auto object-contain rounded-lg bg-white"
              />
              <div className="mt-2.5 text-right text-xs font-bold text-[#DC2626]">
                Click to Expand Full Matrix →
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: 3-Phase Scale Architecture */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Scale Roadmap
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F1115] mt-1">
              Seamless Transition From 1-Piece Prototype to OEM Volume
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                phase: 'Stage 01 • Rapid Prototyping',
                title: 'Digital CNC Converting',
                desc: 'Oscillating-knife and Z-depth crease-scoring cells cut parts directly from .DXF / .STEP files in 24–48 hours with zero tooling fees.',
                metric: '1–99 pcs • 24–48h Dispatch',
              },
              {
                phase: 'Stage 02 • Pilot & Production',
                title: 'High-Speed Nested Converting',
                desc: 'Once part geometry freezes, orders scale smoothly to nested sheet and kiss-cut roll converting at low ₹/cm² production rates.',
                metric: '100–50,000+ pcs • Kiss-Cut Rolls',
              },
              {
                phase: 'Stage 03 • Blanket OEM Supply',
                title: 'Dedicated Sovereign Supply',
                desc: 'Scheduled lot traceability, custom laminate thickness builds, and blanket commercial agreements for EV, BESS, and Defense lines.',
                metric: 'Annual Schedules • CoC Traceability',
              },
            ].map((s) => (
              <div
                key={s.phase}
                className="bg-white border border-gray-200 rounded-xl p-7 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#DC2626]">{s.phase}</span>
                  <h3 className="text-xl font-bold text-[#0F1115]">{s.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-gray-100 text-xs font-mono font-bold text-[#0F1115]">
                  {s.metric}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Founding Leadership */}
        <section className="bg-[#0F1115] text-white rounded-2xl p-8 sm:p-10 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              Leadership Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold mt-1">
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
                  <div className="text-xs font-semibold text-gray-300">{f.role}</div>
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
