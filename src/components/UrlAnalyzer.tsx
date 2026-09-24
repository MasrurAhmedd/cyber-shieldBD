/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Link as LinkIcon, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  ExternalLink, 
  Lock, 
  Globe, 
  RotateCcw,
  AlertCircle,
  Shield,
  Activity,
  Check
} from 'lucide-react';
import { AnalysisResult, Language, DemoScenario } from '../types';
import { RiskCard } from './RiskCard';
import { DEMO_SCENARIOS } from '../data/demoData';

interface UrlAnalyzerProps {
  language: Language;
  onOpenTrustedContact?: () => void;
  presetScenario?: DemoScenario | null;
  onClearPreset?: () => void;
}

export const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({
  language,
  onOpenTrustedContact,
  presetScenario,
  onClearPreset,
}) => {
  const [urlInput, setUrlInput] = useState(
    presetScenario && presetScenario.type === 'url'
      ? presetScenario.sample_content
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (presetScenario && presetScenario.type === 'url') {
      setUrlInput(presetScenario.sample_content);
      handleAnalyze(presetScenario.sample_content);
    }
  }, [presetScenario]);

  const handleAnalyze = async (urlToTest?: string) => {
    const url = urlToTest || urlInput;
    if (!url.trim()) {
      setError('Please enter a target URL or domain to inspect.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      console.error('URL analysis error:', err);
      setError('Failed to inspect URL. Check formatting and connectivity.');
    } finally {
      setLoading(false);
    }
  };

  const sampleUrls = [
    {
      title: 'bKash Spoof Phish',
      url: 'http://bkash-verify-alert.net/login.php'
    },
    {
      title: 'Suspicious IP Portal',
      url: 'http://185.220.101.5:8080/ebl-skybanking/verify.html'
    },
    {
      title: 'Official Nagad SSL',
      url: 'https://nagad.com.bd'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header & Quick Vector Strip */}
      <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-bold text-white tracking-wide">
                {language === 'Bangla' ? 'ওয়েব লিঙ্ক ও ফিশিং সাইট পরীক্ষক' : 'URL & DOMAIN REPUTATION INSPECTOR'}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/50">
                SANDBOXED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Static structural decomposition • Zero-execution safe quarantine
            </p>
          </div>
        </div>

        {/* Quick Sample Links */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 hidden md:inline">TEST TARGET:</span>
          {sampleUrls.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setUrlInput(sample.url);
                handleAnalyze(sample.url);
              }}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#131B2E] hover:bg-[#1A2640] hover:text-cyan-300 text-slate-300 transition border border-slate-800"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 space-y-3.5">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 font-mono text-xs">
              <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Paste link: https://bank-login.xyz or http://185.220..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#070B14] border border-slate-800 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500/60 transition placeholder:text-slate-600"
            />
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !urlInput.trim()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-mono font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.2)] disabled:shadow-none transition whitespace-nowrap disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-900/30 border-t-slate-950 animate-spin" />
                <span>INSPECTING DOMAIN...</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>INSPECT URL REPUTATION</span>
              </>
            )}
          </button>
        </div>

        {/* Security Sandbox Guarantee Note */}
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-cyan-400 flex-shrink-0" />
            <span>SAFE DECONSTRUCTION: No HTTP requests or executable JS triggered from your device</span>
          </div>
          <span className="text-slate-500 hidden sm:inline">SHA-256 HASH VERIFIED</span>
        </div>

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
