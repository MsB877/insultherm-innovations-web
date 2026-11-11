import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, ExternalLink } from 'lucide-react';

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
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[92vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-[#0F1115] text-white">
          <div className="min-w-0">
            {image.badge && (
              <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded bg-[#DC2626] text-white mb-1">
                {image.badge}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-bold text-white truncate">{image.title}</h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-white transition-colors"
            >
              {zoomed ? <ZoomOut className="w-3.5 h-3.5" /> : <ZoomIn className="w-3.5 h-3.5" />}
              {zoomed ? 'Fit Full Diagram' : 'Zoom 180%'}
            </button>
            <a
              href={image.src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-semibold text-gray-200 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Original
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close viewer"
              className="p-1.5 rounded-lg bg-gray-800 hover:bg-[#DC2626] text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Uncropped Stage */}
        <div className="flex-1 overflow-auto bg-[#F7F8FA] p-4 sm:p-8 flex items-center justify-center min-h-[340px]">
          <img
            src={image.src}
            alt={image.title}
            onClick={() => setZoomed((z) => !z)}
            className={`transition-all duration-200 rounded-lg border border-gray-200 bg-white shadow-sm ${
              zoomed
                ? 'w-[1650px] max-w-none cursor-zoom-out'
                : 'max-h-[62vh] w-auto max-w-full object-contain cursor-zoom-in'
            }`}
          />
        </div>

        {/* Clean Readout */}
        {(image.description || (image.metrics && image.metrics.length > 0)) && (
          <div className="px-6 py-4 bg-white border-t border-gray-200 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-7">
              {image.description && (
                <p className="text-sm text-gray-600 leading-relaxed">{image.description}</p>
              )}
            </div>
            {image.metrics && image.metrics.length > 0 && (
              <div className="lg:col-span-5 grid grid-cols-3 gap-2.5">
                {image.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-[#F7F8FA] border border-gray-200 rounded-lg p-2.5"
                  >
                    <div className="text-[11px] text-gray-500">{m.label}</div>
                    <div className="text-xs sm:text-sm font-bold text-[#0F1115] mt-0.5 tabular-nums">
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
