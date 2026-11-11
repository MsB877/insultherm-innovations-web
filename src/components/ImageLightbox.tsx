import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink, Maximize2 } from 'lucide-react';

export interface LightboxImagePayload {
  src: string;
  title: string;
  subtitle?: string;
  dimensions?: string;
  badge?: string;
  description?: string;
  metrics?: { label: string; value: string }[];
}

interface ImageLightboxProps {
  image: LightboxImagePayload | null;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ image, onClose }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(false);
    if (!image) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [image, onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#14171A]/90 backdrop-blur-md p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[94vh] bg-white border border-[#E2E0D8] rounded-md shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-[#14171A] text-white border-b border-slate-800">
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#E04819] text-white font-semibold">
                <Maximize2 className="w-3 h-3" />
                {image.badge || 'Full Uncropped View'}
              </span>
              {image.dimensions && (
                <span className="text-xs font-mono text-slate-400">{image.dimensions}</span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-display font-bold text-white mt-1 truncate">
              {image.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
            >
              {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              {zoomed ? 'Fit Full Diagram (1×)' : 'Zoom 180% Detail'}
            </button>
            <a
              href={image.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Original File
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close full resolution viewer"
              className="p-1.5 rounded bg-slate-800 hover:bg-[#E04819] text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Uncropped Image Stage */}
        <div className="flex-1 overflow-auto bg-[#F6F5F1] bg-architectural-grid p-4 sm:p-8 flex items-center justify-center min-h-[340px]">
          <img
            src={image.src}
            alt={image.title}
            onClick={() => setZoomed((z) => !z)}
            className={`transition-all duration-200 rounded border border-[#E2E0D8] bg-white shadow-md ${
              zoomed
                ? 'w-[1650px] max-w-none cursor-zoom-out'
                : 'max-h-[64vh] w-auto max-w-full object-contain cursor-zoom-in'
            }`}
          />
        </div>

        {/* Footer Technical Readout */}
        {(image.description || (image.metrics && image.metrics.length > 0)) && (
          <div className="px-5 py-4 bg-white border-t border-[#E2E0D8] grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7">
              {image.subtitle && (
                <div className="text-xs font-mono uppercase tracking-wider text-[#E04819] font-semibold mb-1">
                  {image.subtitle}
                </div>
              )}
              {image.description && (
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{image.description}</p>
              )}
            </div>
            {image.metrics && image.metrics.length > 0 && (
              <div className="lg:col-span-5 grid grid-cols-3 gap-2">
                {image.metrics.map((m) => (
                  <div key={m.label} className="bg-[#F6F5F1] border border-[#E2E0D8] rounded p-2.5">
                    <div className="text-[10px] font-mono uppercase text-slate-500">{m.label}</div>
                    <div className="text-xs sm:text-sm font-mono font-bold text-[#14171A] mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
