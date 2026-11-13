import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileCode2, RefreshCw, Trash2, UploadCloud } from 'lucide-react';
import { validateCadFile } from '../utils/validation';

interface CadFileUploadBoxProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
  label?: string;
  helperText?: string;
  compact?: boolean;
}

export const CadFileUploadBox: React.FC<CadFileUploadBoxProps> = ({
  file,
  onFileChange,
  label = 'Attach Custom CAD Drawing or Print (.DXF, .STEP, .IGES, .DWG, .PDF, .ZIP)',
  helperText = 'Supports .DXF, .STEP, .STP, .IGES, .DWG, .PDF, .ZIP (Max 10 MB • NDA-Safe)',
  compact = false,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleCandidateFile = (candidate: File | null) => {
    if (!candidate) return;
    const check = validateCadFile(candidate);
    if (!check.valid) {
      setFileError(check.error || 'Invalid CAD file.');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    setFileError(null);
    onFileChange(candidate);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileError(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  const formatSize = (bytes: number) =>
    bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : `${Math.max(1, Math.round(bytes / 1024))} KB`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
          {label}
        </label>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files?.[0]) {
            handleCandidateFile(e.dataTransfer.files[0]);
          }
        }}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-xl border-2 border-dashed transition-all ${
          compact ? 'px-3.5 py-2.5' : 'p-4'
        } ${
          dragActive
            ? 'border-[#DC2626] bg-red-50/70'
            : file
            ? 'border-emerald-500 bg-emerald-50/60'
            : fileError
            ? 'border-red-400 bg-red-50/40'
            : 'border-slate-300 hover:border-[#DC2626] bg-slate-50/80'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".dxf,.step,.stp,.iges,.igs,.dwg,.pdf,.zip,.png,.jpg,.jpeg"
          className="hidden"
          onChange={(e) => handleCandidateFile(e.target.files?.[0] || null)}
        />

        {file ? (
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <FileCode2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{file.name}</span>
                </div>
                <div className="text-[11px] text-emerald-800 font-mono">
                  {formatSize(file.size)} • Ready to route with order
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  inputRef.current?.click();
                }}
                className="px-2 py-1 rounded-md bg-white border border-emerald-300 hover:border-slate-900 text-[11px] font-semibold text-slate-800 inline-flex items-center gap-1"
                title="Replace CAD file"
              >
                <RefreshCw className="w-3 h-3" />
                Replace
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-md bg-white border border-red-200 hover:bg-red-50 text-red-600"
                title="Remove CAD file"
                aria-label="Remove attached CAD file"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : compact ? (
          <div className="flex items-center gap-2.5">
            <UploadCloud className="w-4 h-4 text-[#DC2626] shrink-0" />
            <div className="min-w-0">
              <div className="text-xs font-bold text-slate-800 truncate">
                Click or Drop <span className="text-[#DC2626]">.DXF / .STEP / .PDF</span>
              </div>
              <div className="text-[10px] text-slate-500 truncate">Max 10 MB • NDA-Safe</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#DC2626] flex items-center justify-center shrink-0 shadow-2xs">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-xs sm:text-sm font-bold text-slate-900">
                Click to Upload CAD Drawing <span className="text-slate-500 font-medium">or drag & drop here</span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">{helperText}</div>
            </div>
          </div>
        )}
      </div>

      {fileError && (
        <div className="flex items-start gap-1.5 text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{fileError}</span>
        </div>
      )}
    </div>
  );
};
