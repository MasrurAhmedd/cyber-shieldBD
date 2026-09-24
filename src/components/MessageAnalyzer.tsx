/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  RotateCcw, 
  Clipboard, 
  Sparkles, 
  AlertCircle, 
  Check, 
  ShieldCheck,
  Languages,
  Terminal,
  Shield,
  Activity
} from 'lucide-react';
import { AnalysisResult, Language, DemoScenario } from '../types';
import { RiskCard } from './RiskCard';
import { DEMO_SCENARIOS } from '../data/demoData';

interface MessageAnalyzerProps {
  language: Language;
  onOpenTrustedContact?: () => void;
  presetScenario?: DemoScenario | null;
  onClearPreset?: () => void;
}

export const MessageAnalyzer: React.FC<MessageAnalyzerProps> = ({
  language,
  onOpenTrustedContact,
  presetScenario,
  onClearPreset,
}) => {
  const [inputText, setInputText] = useState(
    presetScenario && presetScenario.type === 'message'
      ? presetScenario.sample_content
      : ''
  );
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pasted, setPasted] = useState(false);

  // Update text when preset scenario changes
  React.useEffect(() => {
    if (presetScenario && presetScenario.type === 'message') {
      setInputText(presetScenario.sample_content);
      handleAnalyze(presetScenario.sample_content);
    }
  }, [presetScenario]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputText(text);
        setPasted(true);
        setTimeout(() => setPasted(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleClear = () => {
    setInputText('');
    setResult(null);
    setError(null);
    if (onClearPreset) onClearPreset();
  };

  const handleAnalyze = async (textToAnalyze?: string) => {
    const text = textToAnalyze || inputText;
    if (!text.trim()) {
      setError('Please enter or paste a message to inspect.');
      return;
    }

    setError(null);
    setLoading(true);

    setLoadingStep('Parsing Bangla / Banglish phonetic lexical structures...');
    setTimeout(() => {
      setLoadingStep('Matching against Bangladesh MFS phishing heuristics (bKash/Nagad/Upay)...');
    }, 350);
    setTimeout(() => {
      setLoadingStep('Generating explainable threat vector & tactical mitigation dossier...');
    }, 700);

    try {
      const response = await fetch('/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          language: language
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError('Could not complete analysis. Please verify your connection.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const quickSamples = DEMO_SCENARIOS.filter(s => s.type === 'message').slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Tool Header & Sample Injection Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#09110B] p-4 rounded-xl border border-white/10 hud-corner-card relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/40 text-[#D4FF00] flex items-center justify-center font-bold">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-bold text-white tracking-wide">
                {language === 'Bangla' ? 'বার্তা ও এসএমএস নিরাপত্তা বিশ্লেষক' : 'MESSAGE & SMS THREAT INSPECTOR'}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/50 text-[#D4FF00] border border-[#D4FF00]/40">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Dialect-aware: Bangla (বাংলা), Banglish, English, SMS Unicode & Phonetic Fraud
            </p>
          </div>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono text-slate-500 mr-1 hidden md:inline">
            INJECT SAMPLE:
          </span>
          {quickSamples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => {
                setInputText(sample.sample_content);
                handleAnalyze(sample.sample_content);
              }}
              className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#08100B] hover:bg-[#0E1A11] hover:text-[#D4FF00] text-slate-300 transition border border-white/10 hover:border-[#D4FF00]/40"
            >
              {sample.title.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Input Box Area */}
      <div className="bg-[#09110B] rounded-xl border border-white/10 p-4 sm:p-5 space-y-3.5 hud-corner-card relative">
        <div className="relative">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
              INPUT BUFFER
            </span>
            <div className="flex items-center gap-3">
              <span>{inputText.length} CHARS</span>
              <button
                type="button"
                onClick={handlePaste}
                className="flex items-center gap-1 text-[#D4FF00] hover:text-white transition"
              >
                {pasted ? <Check className="w-3 h-3 text-[#D4FF00]" /> : <Clipboard className="w-3 h-3" />}
                <span>{pasted ? 'PASTED' : 'PASTE CLIPBOARD'}</span>
              </button>
              {inputText.length > 0 && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 transition"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>CLEAR</span>
                </button>
              )}
            </div>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'Bangla'
                ? 'সন্দেহজনক এসএমএস, হোয়াটসঅ্যাপ বা মেসেঞ্জার বার্তাটি এখানে পেস্ট করুন...\n(যেমন: "আপনার বিকাশ একাউন্ট স্থগিত হবে। এখনই ভেরিফাই করুন...")'
                : 'Paste suspicious SMS, WhatsApp, or messenger text here...\n(e.g., "Apnar bKash account e somoshya hoyeche. Ekhoni verify korun: http://...")'
            }
            rows={5}
            className="w-full rounded-lg bg-[#040805] border border-white/10 p-3.5 text-sm text-slate-100 focus:outline-none focus:border-[#D4FF00]/70 transition resize-y font-mono placeholder:text-slate-600"
          />
        </div>

        {/* Real-time Heuristic Status Checkpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400 py-1 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="text-[#D4FF00] font-bold">✓</span>
            <span>Phonetic Bengali Lexicon</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#D4FF00] font-bold">✓</span>
            <span>MFS OTP/PIN Threat Heuristics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#D4FF00] font-bold">✓</span>
            <span>Zero Remote Storage Policy</span>
          </div>
        </div>

        {/* Action Button & Language Context Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2.5 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Languages className="w-3.5 h-3.5 text-slate-400" />
            <span>EXPLAIN IN: <strong className="text-slate-200">{language === 'Bangla' ? 'বাংলা' : language.toUpperCase()}</strong></span>
          </div>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !inputText.trim()}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-md bg-[#D4FF00] hover:bg-[#c3ed00] disabled:bg-[#142318] disabled:text-slate-600 text-black font-mono font-bold text-xs transition shadow-[0_0_20px_rgba(212,255,0,0.2)] disabled:shadow-none disabled:cursor-not-allowed uppercase tracking-wider"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-black/30 border-t-black animate-spin" />
                <span>INSPECTING THREAT PATTERNS...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>RUN SECURITY ANALYSIS</span>
              </>
            )}
          </button>
        </div>

        {/* Loading Progress State */}
        {loading && (
          <div className="bg-[#0C1A10] border border-[#D4FF00]/40 rounded-lg p-3 text-xs font-mono text-[#D4FF00] flex items-center gap-2.5 animate-pulse">
            <Activity className="w-4 h-4 text-[#D4FF00] flex-shrink-0 animate-spin" />
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

      {/* Analysis Result Card */}
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
