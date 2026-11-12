import React, { useEffect, useState } from 'react';
import { Maximize2, Pause, Play } from 'lucide-react';
import { VALIDATION_PLATES, ValidationPlate } from '../data/companyData';
import { LightboxImagePayload } from './ImageLightbox';

interface ValidationShowcaseProps {
  onOpenLightbox: (img: LightboxImagePayload) => void;
}

export const ValidationShowcase: React.FC<ValidationShowcaseProps> = ({ onOpenLightbox }) => {
  const [filter, setFilter] = useState<
    'ALL' | 'FEA Simulation' | 'CAD Architecture' | 'Physical Hardware'
  >('ALL');
  const [activeId, setActiveId] = useState<string>(VALIDATION_PLATES[0].id);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const filteredPlates =
    filter === 'ALL' ? VALIDATION_PLATES : VALIDATION_PLATES.filter((p) => p.category === filter);

  const activePlate: ValidationPlate =
    filteredPlates.find((p) => p.id === activeId) || filteredPlates[0] || VALIDATION_PLATES[0];

  // Scroll-proof continuous timer (controlled strictly by explicit Auto/Paused button)
  useEffect(() => {
    if (!autoPlay || filteredPlates.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveId((prev) => {
        const idx = filteredPlates.findIndex((p) => p.id === prev);
        const nextIdx = (idx + 1) % filteredPlates.length;
        return filteredPlates[nextIdx].id;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [autoPlay, filteredPlates]);

  return (
    <div className="bg-white border border-gray-200/90 rounded-2xl shadow-sm overflow-hidden">
      {/* Clean Header & Category Filter */}
      <div className="px-6 py-5 bg-[#F4F6FA] border-b border-gray-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
            Uncropped Engineering & Hardware Gallery
          </span>
          <h3 className="text-xl font-bold text-[#0F1115] mt-0.5">
            4-Quadrant Thermal FEA, Installed Hardware & 3D Pack CAD
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {(['ALL', 'Physical Hardware', 'FEA Simulation', 'CAD Architecture'] as const).map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setFilter(tab);
                  const first =
                    tab === 'ALL'
                      ? VALIDATION_PLATES[0]
                      : VALIDATION_PLATES.find((p) => p.category === tab);
                  if (first) setActiveId(first.id);
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  filter === tab
                    ? 'bg-[#0F1115] text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {tab === 'ALL' ? `All Views (${VALIDATION_PLATES.length})` : tab}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => setAutoPlay((v) => !v)}
            className="ml-1 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-400 text-xs font-semibold text-gray-700 inline-flex items-center gap-1.5"
            title={autoPlay ? 'Pause automatic slide transition' : 'Resume automatic slide transition'}
          >
            {autoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#DC2626]" />
                Auto
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-gray-600" />
                Paused
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Uncropped Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-8 bg-[#F8FAFC] p-5 sm:p-8 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div
            onClick={() => onOpenLightbox(activePlate)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onOpenLightbox(activePlate)}
            className="group relative w-full min-h-[300px] sm:min-h-[390px] bg-white border border-gray-200 rounded-xl flex items-center justify-center p-4 cursor-zoom-in overflow-hidden"
          >
            <img
              key={activePlate.id}
              src={activePlate.src}
              alt={activePlate.title}
              className="max-h-[400px] w-auto max-w-full object-contain rounded animate-showcase-visual"
            />
            <span className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#0F1115]/90 group-hover:bg-[#DC2626] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors">
              <Maximize2 className="w-3.5 h-3.5" />
              Expand Full View
            </span>
          </div>
        </div>

        {/* Clean Engineering Readout */}
        <div className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-white">
          <div className="space-y-4">
            <span className="inline-block text-xs font-bold px-2.5 py-1 rounded bg-red-50 text-[#DC2626]">
              {activePlate.badge}
            </span>
            <h4 className="text-lg font-bold text-[#0F1115] leading-snug">{activePlate.title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{activePlate.description}</p>

            <div className="space-y-2 pt-2">
              {activePlate.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#F4F6FA] border border-gray-200 text-xs"
                >
                  <span className="text-gray-600 font-medium">{m.label}</span>
                  <span className="font-mono font-bold text-[#0F1115]">{m.value}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenLightbox(activePlate)}
            className="mt-6 w-full py-2.5 px-4 rounded-lg border border-[#0F1115] text-[#0F1115] hover:bg-[#0F1115] hover:text-white text-xs font-bold transition-colors"
          >
            Open High-Resolution Lightbox
          </button>
        </div>
      </div>

      {/* Clean Thumbnail Selector */}
      <div className="p-4 bg-[#F4F6FA] border-t border-gray-200 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2.5">
        {filteredPlates.map((plate) => {
          const isSelected = plate.id === activePlate.id;
          return (
            <button
              key={plate.id}
              type="button"
              onClick={() => setActiveId(plate.id)}
              className={`text-left rounded-lg p-2 bg-white border transition-all ${
                isSelected
                  ? 'border-[#DC2626] ring-2 ring-[#DC2626]/20'
                  : 'border-gray-200 hover:border-gray-400 opacity-80 hover:opacity-100'
              }`}
            >
              <div className="w-full h-14 bg-[#F8FAFC] rounded flex items-center justify-center p-1 mb-1.5 overflow-hidden">
                <img
                  src={plate.src}
                  alt={plate.title}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="text-[11px] font-semibold text-[#0F1115] line-clamp-2 leading-tight">
                {plate.title}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
