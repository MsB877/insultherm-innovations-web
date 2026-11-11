import React, { useState } from 'react';
import { Maximize2, Flame, Layers, Cpu, ExternalLink, CheckCircle2 } from 'lucide-react';
import { VALIDATION_PLATES, ValidationPlate } from '../data/companyData';
import { LightboxImagePayload } from './ImageLightbox';

interface ValidationShowcaseProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
  onOrderKit?: () => void;
}

export const ValidationShowcase: React.FC<ValidationShowcaseProps> = ({
  onOpenLightbox,
  onOrderKit,
}) => {
  const [filter, setFilter] = useState<'ALL' | 'FEA Simulation' | 'CAD Architecture' | 'Physical Hardware'>('ALL');
  const [activeId, setActiveId] = useState<string>(VALIDATION_PLATES[0].id);

  const filteredPlates =
    filter === 'ALL'
      ? VALIDATION_PLATES
      : VALIDATION_PLATES.filter((p) => p.category === filter);

  const activePlate: ValidationPlate =
    filteredPlates.find((p) => p.id === activeId) || filteredPlates[0] || VALIDATION_PLATES[0];

  return (
    <div className="bg-white border border-[#E2E0D8] rounded-md shadow-sm overflow-hidden">
      {/* Header & Filter Tabs */}
      <div className="px-6 py-5 bg-[#F6F5F1] border-b border-[#E2E0D8] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E04819] font-semibold mb-1">
            <Flame className="w-3.5 h-3.5" />
            Full-Frame Engineering Evidence • Zero Cropping • Click Any Plate for HD Zoom
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-[#14171A]">
            4-Quadrant Thermal Runaway FEA, 3D Pack CAD & Physical Cutaway Dossier
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['ALL', 'FEA Simulation', 'CAD Architecture', 'Physical Hardware'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setFilter(tab);
                const firstMatch =
                  tab === 'ALL'
                    ? VALIDATION_PLATES[0]
                    : VALIDATION_PLATES.find((p) => p.category === tab);
                if (firstMatch) setActiveId(firstMatch.id);
              }}
              className={`px-3.5 py-2 rounded text-xs font-semibold transition-all border ${
                filter === tab
                  ? 'bg-[#14171A] text-white border-[#14171A]'
                  : 'bg-white text-slate-700 border-[#E2E0D8] hover:border-slate-400'
              }`}
            >
              {tab === 'ALL' ? 'All Plates (8)' : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Uncropped Stage + Engineering Readout */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left 8 Cols: Full-Aspect Uncropped Stage */}
        <div className="lg:col-span-8 bg-[#FBFBF9] bg-architectural-grid p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-[#E2E0D8] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#14171A] text-white text-[11px] font-mono font-semibold">
              {activePlate.category === 'FEA Simulation' && <Flame className="w-3 h-3 text-[#E04819]" />}
              {activePlate.category === 'CAD Architecture' && <Cpu className="w-3 h-3 text-amber-400" />}
              {activePlate.category === 'Physical Hardware' && <Layers className="w-3 h-3 text-emerald-400" />}
              {activePlate.category} — {activePlate.badge}
            </span>
            <button
              type="button"
              onClick={() => onOpenLightbox(activePlate)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E04819] hover:bg-[#BF360C] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Open Full-Screen HD Zoom
            </button>
          </div>

          <div
            onClick={() => onOpenLightbox(activePlate)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox(activePlate)}
            className="group relative w-full min-h-[300px] sm:min-h-[410px] bg-white border border-[#E2E0D8] rounded flex items-center justify-center p-3 cursor-zoom-in shadow-inner"
          >
            <img
              src={activePlate.src}
              alt={activePlate.title}
              className="max-h-[430px] w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.01]"
            />
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-[#14171A]/85 text-white text-[11px] font-mono flex items-center gap-1.5 opacity-90 group-hover:bg-[#E04819] transition-colors">
              <Maximize2 className="w-3 h-3" />
              Click to Expand ({activePlate.dimensions})
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-mono">
            <span>100% Uncropped Native Aspect Ratio ({activePlate.dimensions})</span>
            <a
              href={activePlate.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#14171A] hover:text-[#E04819] font-semibold"
            >
              Open Raw Engineering Asset <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Right 4 Cols: Technical Interpretation */}
        <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-white">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#E04819] font-semibold mb-1.5">
              {activePlate.subtitle}
            </div>
            <h4 className="text-xl font-display font-bold text-[#14171A] mb-3 leading-snug">
              {activePlate.title}
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {activePlate.description}
            </p>

            <div className="space-y-2.5 mb-6">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Key Boundary & Validation Readouts
              </div>
              {activePlate.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded bg-[#F6F5F1] border border-[#E2E0D8]"
                >
                  <span className="text-xs text-slate-600 font-medium">{m.label}</span>
                  <span className="text-xs font-mono font-bold text-[#14171A]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E0D8] space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Test this exact Core™ + Barrier™ + Shield™ stack on your own cells in 48 hours.
              </span>
            </div>
            {onOrderKit && (
              <button
                type="button"
                onClick={onOrderKit}
                className="w-full py-2.5 px-4 rounded bg-[#14171A] hover:bg-[#E04819] text-white text-xs font-semibold transition-colors"
              >
                Add AIS-156 Pack Kit (₹14,500) or Custom Cut to Order →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail Strip (All Uncropped Previews) */}
      <div className="p-4 bg-[#F6F5F1] border-t border-[#E2E0D8]">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2.5 font-semibold">
          Select Validation Plate ({filteredPlates.length} Available — Click Active Plate Above for Full-Screen Zoom):
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {filteredPlates.map((plate) => {
            const isSelected = plate.id === activePlate.id;
            return (
              <button
                key={plate.id}
                type="button"
                onClick={() => setActiveId(plate.id)}
                className={`text-left rounded p-2 bg-white border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#E04819] ring-2 ring-[#E04819]/25 shadow-sm'
                    : 'border-[#E2E0D8] hover:border-slate-400 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="w-full h-16 bg-[#FBFBF9] rounded border border-slate-100 flex items-center justify-center p-1 mb-1.5 overflow-hidden">
                  <img
                    src={plate.src}
                    alt={plate.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#E04819] font-semibold truncate">
                    {plate.badge}
                  </div>
                  <div className="text-[11px] font-semibold text-[#14171A] line-clamp-2 leading-tight mt-0.5">
                    {plate.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
