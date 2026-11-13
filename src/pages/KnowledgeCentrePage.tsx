import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileDown,
  FlaskConical,
  ShieldCheck,
  Sparkles,
  Upload,
} from 'lucide-react';
import {
  DISCOVERY_MATRIX,
  KNOWLEDGE_CENTRE_PRIMERS,
  PRODUCTS,
  REGULATORY_STANDARDS_GUIDE,
} from '../data/companyData';
import { useOrderCart } from '../context/OrderCartContext';

export const KnowledgeCentrePage: React.FC = () => {
  const { openConfigurator } = useOrderCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [discoveryMode, setDiscoveryMode] = useState<'chemistry' | 'application' | 'industry'>(
    'chemistry'
  );

  const categories = [
    'All',
    'Polymer & Filler Chemistry',
    'Fire & Dielectric Physics',
    'Standards & Qualification',
  ];

  const filteredPrimers =
    selectedCategory === 'All'
      ? KNOWLEDGE_CENTRE_PRIMERS
      : KNOWLEDGE_CENTRE_PRIMERS.filter((a) => a.category === selectedCategory);

  const activeDiscoveryList = DISCOVERY_MATRIX[discoveryMode];

  return (
    <div className="bg-canvas-tonal pb-24">
      {/* Architectural Header */}
      <section className="relative bg-hero-architectural bg-subtle-grid overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-red-200/80 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                <FlaskConical className="w-3.5 h-3.5" />
                Technical Knowledge Centre • Polymer, Ceramic & Fire Science
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F1115] tracking-tight leading-[1.12]">
                Materials Chemistry, Thermal Physics & Indian Compliance Guide
              </h1>
              <p className="text-base text-gray-600 max-w-3xl leading-relaxed">
                Explore the polymer chemistry, filler percolation science, and Indian regulatory
                benchmarks (AIS-156 Amend. 3, ASTM D5470, ASTM E595 vacuum outgassing, and 1,500V
                DC dielectric creepage) behind InsulTherm’s five engineered platforms.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-3">
              <button
                type="button"
                onClick={() => openConfigurator()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload CAD & Price Part
              </button>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-gray-300 hover:border-[#0F1115] text-[#0F1115] text-xs sm:text-sm font-semibold transition-colors"
              >
                5 Product TDS Sheets
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full overflow-hidden leading-none pointer-events-none">
          <svg
            viewBox="0 0 1440 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-7 sm:h-10"
            preserveAspectRatio="none"
          >
            <path d="M0 16C380 44 820 -4 1440 20V42H0V16Z" fill="#EEF1F6" />
          </svg>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-20">
        {/* SECTION 1: 3-WAY TECHNICAL SELECTOR (BY CHEMISTRY / APPLICATION / INDUSTRY) */}
        <section className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                3-Way Material Selection Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] mt-1">
                Specify By Chemistry, Engineering Function, or Industry
              </h2>
            </div>

            <div className="inline-flex rounded-xl bg-[#F4F6FA] p-1 border border-gray-200 text-xs font-bold">
              {[
                { id: 'chemistry', label: 'By Chemistry (5)' },
                { id: 'application', label: 'By Application (5)' },
                { id: 'industry', label: 'By Industry (5)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setDiscoveryMode(tab.id as typeof discoveryMode)}
                  className={`px-3.5 py-2 rounded-lg transition-all ${
                    discoveryMode === tab.id
                      ? 'bg-[#0F1115] text-white shadow-xs'
                      : 'text-gray-600 hover:text-[#0F1115]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeDiscoveryList.map((entry) => (
              <div
                key={entry.id}
                className="rounded-xl border border-gray-200 bg-[#F8FAFC] hover:bg-white hover:border-[#0F1115] p-6 flex flex-col justify-between transition-all"
              >
                <div className="space-y-3">
                  <span className="inline-block text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-red-50 text-[#DC2626] border border-red-200/70">
                    {entry.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F1115] leading-snug">{entry.title}</h3>
                  <div className="text-xs font-semibold text-gray-500">{entry.subtitle}</div>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {entry.technicalSummary}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-gray-200/80 space-y-3">
                  <div className="text-xs font-mono font-semibold text-[#0F1115]">
                    {entry.keyMetric}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.recommendedProductIds.map((pid) => {
                      const prod = PRODUCTS.find((p) => p.id === pid);
                      if (!prod) return null;
                      return (
                        <Link
                          key={pid}
                          to={`/products#${pid}`}
                          className="px-2.5 py-1 rounded-md bg-white border border-gray-300 hover:border-[#DC2626] text-xs font-bold text-[#0F1115] hover:text-[#DC2626] inline-flex items-center gap-1"
                        >
                          {prod.trademarkName}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: IN-DEPTH POLYMER, CERAMIC & THERMAL ENGINEERING PRIMERS */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] inline-flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                Engineering Primers & Formulation Notes
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] mt-1">
                Why Material Architecture Matters on Real Hardware
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#DC2626] text-white'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filteredPrimers.map((article) => {
              const linkedProd = PRODUCTS.find((p) => p.id === article.relatedProductId);
              return (
                <article
                  key={article.id}
                  className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-800 text-xs font-bold">
                        {article.category}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{article.readTime}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-[#0F1115] leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-relaxed">{article.summary}</p>

                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700 pt-1">
                      {article.engineeringPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="p-3 rounded-xl bg-red-50/60 border border-red-200/70 text-xs text-gray-900">
                      <strong className="text-[#DC2626]">Design Rule:</strong>{' '}
                      {article.practicalTakeaway}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Link
                        to={`/products#${article.relatedProductId}`}
                        className="text-xs font-bold text-[#0F1115] hover:text-[#DC2626] inline-flex items-center gap-1"
                      >
                        Inspect {article.relatedProduct} Specs <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <div className="flex items-center gap-2">
                        {linkedProd && (
                          <a
                            href={linkedProd.tdsUrl}
                            download
                            className="px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#0F1115] text-xs font-semibold text-gray-700 inline-flex items-center gap-1"
                          >
                            <FileDown className="w-3.5 h-3.5 text-[#DC2626]" />
                            TDS PDF
                          </a>
                        )}
                        <button
                          type="button"
                          onClick={() => openConfigurator(article.relatedProductId)}
                          className="px-3 py-1.5 rounded-lg bg-[#0F1115] hover:bg-[#DC2626] text-white text-xs font-bold transition-colors"
                        >
                          Configure Part
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INDIAN REGULATORY, DEFENSE & TEST STANDARDS REFERENCE TABLE */}
        <section className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626] inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Standards & Indigenous Compliance Reference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1115] mt-1">
              Key Indian EV, Defense, Space & Dielectric Standards
            </h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Quick-reference crosswalk mapping Indian homologation mandates and international test
              methods to the corresponding InsulTherm material platform.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#0F1115] text-white">
                  <th className="py-3.5 px-4 font-bold">Standard / Program</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-300">Target Sector</th>
                  <th className="py-3.5 px-4 font-semibold text-gray-300">
                    Core Engineering Requirement
                  </th>
                  <th className="py-3.5 px-4 font-bold bg-[#DC2626] text-white">
                    InsulTherm Architecture
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {REGULATORY_STANDARDS_GUIDE.map((row, idx) => (
                  <tr
                    key={row.standard}
                    className={idx % 2 === 1 ? 'bg-[#F8FAFC]' : 'bg-white'}
                  >
                    <td className="py-3.5 px-4 font-bold text-[#0F1115] font-mono text-xs">
                      {row.standard}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-gray-800">{row.sector}</td>
                    <td className="py-3.5 px-4 text-gray-600 leading-relaxed">
                      {row.requirement}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-[#0F1115] bg-red-50/45 leading-relaxed">
                      {row.insulthermAlignment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#0F1115] text-white rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
              <Sparkles className="w-4 h-4" />
              Need Custom Formulation or CAD Nesting Advice?
            </div>
            <h3 className="text-2xl font-extrabold">
              Upload Your .DXF / .STEP Drawing for 24–48h Prototyping
            </h3>
            <p className="text-sm text-gray-300">
              Zero steel-die tooling NRE, MOQ = 1 piece, or start with a &lt;₹15,000 turnkey R&D
              evaluation box.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openConfigurator()}
              className="px-5 py-3 rounded-lg bg-[#DC2626] hover:bg-[#B91C1C] text-white text-sm font-bold inline-flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload CAD Now
            </button>
            <Link
              to="/contact"
              className="px-5 py-3 rounded-lg bg-white text-[#0F1115] hover:bg-gray-100 text-sm font-bold"
            >
              Speak With Materials R&D
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
