import React from 'react';
import {
  Cpu,
  ShieldCheck,
  Maximize2,
  CheckCircle2,
  Mail,
  Upload,
  Award,
  TrendingUp,
} from 'lucide-react';
import { COMPANY_INFO, SECTORS } from '../data/companyData';
import { ValidationShowcase } from '../components/ValidationShowcase';
import { LightboxImagePayload } from '../components/ImageLightbox';
import { useOrderCart } from '../context/OrderCartContext';

interface AboutPageProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenLightbox }) => {
  const { openConfigurator } = useOrderCart();

  return (
    <div className="bg-[#FBFBF9] pb-20">
      {/* Editorial Header */}
      <section className="bg-white bg-architectural-grid border-b border-[#E2E0D8] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
              <Cpu className="w-4 h-4" />
              Sanand GIDC Industrial Corridor • Ahmedabad, Gujarat
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-bold text-[#14171A] leading-tight">
              Replacing 8-Week Tooling Freezes with{' '}
              <span className="font-serif italic font-normal text-[#E04819]">
                48-Hour Digital Precision.
              </span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              InsulTherm Innovations was founded on a first-principles observation across India’s EV, BESS, power electronics, and defense labs: hardware teams lose months—and ₹40,000 to ₹8 Lakh per revision—waiting on imported thermal sheets, steel rule dies, and injection-molded busbar covers.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                onClick={() => openConfigurator()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs sm:text-sm font-bold shadow-sm"
              >
                <Upload className="w-4 h-4" />
                Send Custom .DXF / .STEP to Sanand CNC Cell
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              onClick={() =>
                onOpenLightbox({
                  src: '/assets/facility/cnc-converting-lab.jpg',
                  title: 'InsulTherm Digital Oscillating-Knife & Crease-Scoring CNC Cell',
                  subtitle: 'Sanand GIDC Advanced Converting Wing, Ahmedabad, Gujarat',
                  dimensions: '1408 × 768 px',
                  badge: 'Zero-Tooling CNC Lab',
                  description:
                    'High-precision vacuum-bed digital CNC oscillating-knife and 50%-depth crease-wheel workcell converting soft 35 Shore 00 TIM pads, aerogel-mica firewalls, and 3D dielectric origami from raw CAD files.',
                })
              }
              className="bg-white border border-[#E2E0D8] rounded-md p-3 shadow-sm cursor-zoom-in group"
            >
              <img
                src="/assets/facility/cnc-converting-lab.jpg"
                alt="InsulTherm Digital CNC Converting Cell"
                className="w-full h-auto object-contain rounded"
              />
              <div className="mt-2.5 flex items-center justify-between text-xs font-mono text-slate-600 px-1">
                <span>Digital CNC Oscillating-Knife & Z-Depth Scoring Cell</span>
                <span className="inline-flex items-center gap-1 text-[#E04819] font-bold">
                  <Maximize2 className="w-3.5 h-3.5" /> Expand HD
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* Full Uncropped 4-Quadrant FEA & 3D CAD Dossier */}
        <section className="space-y-4">
          <ValidationShowcase onOpenLightbox={onOpenLightbox} />
        </section>

        {/* Competitive Landscape Matrix (Uncropped Full Plate) */}
        <section className="bg-white border border-[#E2E0D8] rounded-md p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
              Strategic Positioning
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14171A]">
              Why Hardware Teams Switch from Legacy Import Distributors
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Multinational catalogs enforce high MOQs, 6–10 week sea/air lead times, and ₹35,000–₹50,000 steel-die charges—while unbranded commodity traders ship unverified sheets prone to silicone oil bleed and zero ASTM traceability.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>MOQ = 1 Piece</strong> with transparent area-based (cm²) prototype & volume pricing.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>ASTM D5470, D149 & E595</strong> batch-traceable engineering certificates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>100% Domestic Value Addition (DVA)</strong> for Defense PSU & PLI-linked EV tenders.
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
                  subtitle: 'Uncropped Strategic Benchmark Matrix',
                  dimensions: '1325 × 675 px',
                  badge: 'Market Benchmark',
                })
              }
              className="bg-[#F6F5F1] border border-[#E2E0D8] rounded-md p-3 cursor-zoom-in"
            >
              <img
                src="/assets/validation/competitor-benchmark.jpg"
                alt="InsulTherm Competitive Benchmark"
                className="w-full h-auto object-contain rounded bg-white"
              />
              <div className="mt-2 text-right text-xs font-mono text-[#E04819] font-semibold">
                Click to Open Full-Resolution Matrix →
              </div>
            </div>
          </div>
        </section>

        {/* 3-Stage Manufacturing Scale Architecture */}
        <section className="space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              Capital-Efficient Industrial Roadmap
            </div>
            <h2 className="text-3xl font-display font-bold text-[#14171A] mt-1">
              From 1-Piece R&D Agility to Million-Part OEM Blanket Supply
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stage: 'PHASE 01 • ACTIVE TODAY',
                title: 'Digital CNC Converting & Spec-In Wedge',
                desc: 'Oscillating-knife & living-hinge crease-scoring cells convert qualified master laminates directly from customer .DXF/.STEP files in 24–48 hours with ₹0 NRE.',
                kpi: 'MOQ: 1 pc • 24–48h SLA • 60%+ Blended GM',
              },
              {
                stage: 'PHASE 02 • VOLUME RAMP',
                title: 'High-Speed Rotary Kiss-Cut & Nesting Automation',
                desc: 'Once an OEM battery or inverter geometry freezes past 10,000+ pcs/month, production transitions seamlessly onto high-speed rotary kiss-cut rolls at pure nested ₹/cm² rates.',
                kpi: '10k–250k pcs/mo • Automated Peel-Tab Rolls',
              },
              {
                stage: 'PHASE 03 • VERTICAL INTEGRATION',
                title: 'Sovereign Slurry Coating & Composite Lamination',
                desc: 'In-house silane-passivated ceramic dispersion, aerogel-mica encapsulation, and siloxane-free elastomer coating in Gujarat SEZ/GIDC.',
                kpi: 'IATF 16949 & AS9100D Qualification Track',
              },
            ].map((p) => (
              <div
                key={p.stage}
                className="bg-white border border-[#E2E0D8] rounded-md p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold text-[#E04819]">{p.stage}</span>
                  <h3 className="text-lg font-display font-bold text-[#14171A]">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
                <div className="mt-5 pt-3 border-t border-[#E2E0D8] text-xs font-mono font-bold text-[#14171A]">
                  {p.kpi}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Target Industry Verticals */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#14171A]">
            Industries & Standards Qualified
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SECTORS.map((sec) => (
              <div key={sec.title} className="bg-white border border-[#E2E0D8] rounded-md p-6 space-y-2.5">
                <div className="text-xs font-mono font-bold text-[#E04819]">{sec.standards}</div>
                <h3 className="text-lg font-display font-bold text-[#14171A]">{sec.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sec.painSolved}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {sec.products.map((pr) => (
                    <span
                      key={pr}
                      className="px-2.5 py-0.5 rounded bg-[#F6F5F1] border border-[#E2E0D8] text-[11px] font-mono font-semibold text-[#14171A]"
                    >
                      {pr}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Founding Leadership */}
        <section className="bg-[#14171A] text-white rounded-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#E04819] font-bold">
                <Award className="w-4 h-4" />
                Founding Engineering & Commercial Leadership
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1">
                Direct Founder Access for Every OEM & R&D Account
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              Mutual NDA Signed Within 2 Hours
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {COMPANY_INFO.founders.map((f) => (
              <div
                key={f.name}
                className="bg-slate-900 border border-slate-800 rounded-md p-5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded bg-[#E04819] text-white font-display font-bold text-lg flex items-center justify-center">
                    {f.name[0]}
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">{f.name}</h3>
                  <div className="text-xs font-mono text-amber-300">{f.role}</div>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{f.focus}</p>
                </div>
                {f.email && (
                  <a
                    href={`mailto:${f.email}`}
                    className="mt-4 pt-3 border-t border-slate-800 inline-flex items-center gap-1.5 text-xs font-mono text-[#E04819] hover:text-orange-300"
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
