/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Image as ImageIcon, 
  UploadCloud, 
  X, 
  Sparkles, 
  AlertCircle, 
  Eye, 
  FileText,
  ScanLine,
  Scan,
  Shield,
  Activity
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';
import { RiskCard } from './RiskCard';

interface ScreenshotAnalyzerProps {
  language: Language;
  onOpenTrustedContact?: () => void;
}

export const ScreenshotAnalyzer: React.FC<ScreenshotAnalyzerProps> = ({
  language,
  onOpenTrustedContact,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/png');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // High-fidelity attack vector mock screenshots
  const sampleScreenshots = [
    {
      title: 'Lottery Winner SMS',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="100%" height="100%" fill="%230f172a"/><text x="20" y="40" fill="%2338bdf8" font-family="monospace" font-size="14" font-weight="bold">MESSAGES • +8801799221100</text><rect x="15" y="60" width="370" height="170" rx="8" fill="%231e293b" stroke="%23334155"/><text x="30" y="95" fill="%23f8fafc" font-family="sans-serif" font-size="14" font-weight="bold">Congratulations! You won ৳50,000!</text><text x="30" y="125" fill="%23cbd5e1" font-family="sans-serif" font-size="13">Claim immediately. Call our hotline</text><text x="30" y="150" fill="%23cbd5e1" font-family="sans-serif" font-size="13">and provide your bKash OTP to verify</text><text x="30" y="175" fill="%23cbd5e1" font-family="sans-serif" font-size="13">prize disbursement.</text><text x="30" y="210" fill="%23f43f5e" font-family="monospace" font-size="12">Expires today • Dial 019238811</text></svg>'
    },
    {
      title: 'Courier ৳50 Spoof',
      dataUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="260" viewBox="0 0 400 260"><rect width="100%" height="100%" fill="%23090e17"/><text x="20" y="40" fill="%23f43f5e" font-family="monospace" font-size="14" font-weight="bold">REDX PARCEL ALERT</text><rect x="15" y="60" width="370" height="170" rx="8" fill="%231f131a" stroke="%23881337"/><text x="30" y="95" fill="%23fecdd3" font-family="sans-serif" font-size="14" font-weight="bold">Parcel #9821 On Hold</text><text x="30" y="125" fill="%23fda4af" font-family="sans-serif" font-size="13">Pay ৳50 delivery re-verification fee</text><text x="30" y="150" fill="%23fda4af" font-family="sans-serif" font-size="13">Click: http://redx-parcel-bd.xyz/pay</text><text x="30" y="180" fill="%23fb7185" font-family="sans-serif" font-size="12">Permanent parcel return in 2 hours.</text></svg>'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (PNG, JPG, or WebP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit. Please upload a smaller image.');
      return;
    }

    setError(null);
    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    setMimeType(file.type);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (sampleData?: string) => {
    const dataToSend = sampleData || imagePreview;
    if (!dataToSend) {
      setError('Please select or upload a screenshot first.');
      return;
    }

    setError(null);
    setLoading(true);

    setLoadingStep('Ingesting visual buffer & executing OCR text parsing...');
    setTimeout(() => {
      setLoadingStep('Extracting Bengali/Banglish typography & spoofed brand marks...');
    }, 450);
    setTimeout(() => {
      setLoadingStep('Evaluating social engineering vectors via Gemini Multimodal Intelligence...');
    }, 900);

    try {
      const response = await fetch('/api/analyze/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: dataToSend,
          mimeType: mimeType
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Screenshot analysis error:', err);
      setError('Failed to analyze image. Please try another screenshot.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header & Quick Vector Strip */}
      <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/40 text-indigo-400 flex items-center justify-center font-bold">
            <Scan className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-bold text-white tracking-wide">
                {language === 'Bangla' ? 'স্ক্রিনশট ও ছবি বিশ্লেষণ' : 'OCR & COMPUTER VISION THREAT INTAKE'}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                MULTIMODAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              In-memory OCR • Detects forged bKash seals, fake invoice vouchers & WhatsApp scams
            </p>
          </div>
        </div>

        {/* Preset Samples */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 hidden md:inline">TEST MOCK:</span>
          {sampleScreenshots.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setImagePreview(sample.dataUrl);
                setMimeType('image/svg+xml');
                handleAnalyze(sample.dataUrl);
              }}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#131B2E] hover:bg-[#1A2640] hover:text-indigo-300 text-slate-300 transition border border-slate-800"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Zone */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 space-y-4">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />

        {!imagePreview ? (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border border-dashed border-slate-800 hover:border-indigo-500/70 rounded-xl p-8 sm:p-12 text-center cursor-pointer transition bg-[#070B14] hover:bg-[#0B101E] group"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition">
              <UploadCloud className="w-6 h-6" />
            </div>
            <h3 className="text-xs sm:text-sm font-mono font-bold text-white mb-1">
              DROP SCREENSHOT HERE, OR <span className="text-indigo-400 underline">SELECT FILE</span>
            </h3>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto font-mono">
              PNG, JPG, WebP up to 10MB • Ephemeral OCR memory parsing, zero disk caching
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-[#070B14] max-h-96 flex items-center justify-center p-3">
              <img
                src={imagePreview}
                alt="Screenshot Preview"
                className="max-h-80 object-contain rounded border border-slate-800 shadow-sm"
              />
              <button
                onClick={handleClear}
                className="absolute top-3 right-3 p-1.5 rounded bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 transition border border-slate-700"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1 border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ScanLine className="w-4 h-4 text-indigo-400" />
                <span>Buffer ready for optical layout extraction & forgery evaluation</span>
              </div>

              <button
                onClick={() => handleAnalyze()}
                disabled={loading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-mono font-bold text-xs shadow-[0_0_15px_rgba(99,102,241,0.2)] disabled:shadow-none transition disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>EXTRACTING PIXEL FORENSICS...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INSPECT VISUAL THREATS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading Step Progress */}
        {loading && (
          <div className="bg-[#0D1527] border border-indigo-800/60 rounded-lg p-3 text-xs font-mono text-indigo-300 flex items-center gap-2.5 animate-pulse">
            <Activity className="w-4 h-4 text-indigo-400 flex-shrink-0 animate-spin" />
            <span>{loadingStep}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="bg-rose-950/40 border border-rose-800/60 rounded-lg p-3 text-xs font-mono text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Result Display */}
      {result && (
        <div>
          <RiskCard 
            result={result} 
            languagePref={language} 
            onOpenTrustedContact={onOpenTrustedContact}
          />
        </div>
      )}
    </div>
  );
};
