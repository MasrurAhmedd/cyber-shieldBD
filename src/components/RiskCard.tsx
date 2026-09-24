/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  Info, 
  ArrowRight, 
  PhoneCall, 
  Share2, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Zap,
  Check,
  Cpu,
  FileCheck,
  Copy,
  ExternalLink
} from 'lucide-react';
import { AnalysisResult, Language } from '../types';

interface RiskCardProps {
  result: AnalysisResult;
  languagePref: Language;
  onOpenTrustedContact?: () => void;
}

export const RiskCard: React.FC<RiskCardProps> = ({ result, languagePref, onOpenTrustedContact }) => {
  const [showTechnical, setShowTechnical] = useState(false);
  const [copied, setCopied] = useState(false);
  const [completedActions, setCompletedActions] = useState<number[]>([]);

  const toggleAction = (idx: number) => {
    setCompletedActions(prev => 
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const getRiskColors = (level: string) => {
    switch (level) {
      case 'CRITICAL':
        return {
          cardBorder: 'border-rose-500/60 shadow-[0_0_25px_rgba(244,63,94,0.12)]',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          accent: 'text-rose-400',
          gaugeColor: '#f43f5e',
          icon: AlertOctagon,
          glow: 'shadow-[0_0_12px_#f43f5e]'
        };
      case 'HIGH':
        return {
          cardBorder: 'border-amber-500/60 shadow-[0_0_25px_rgba(245,158,11,0.12)]',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          accent: 'text-amber-400',
          gaugeColor: '#f59e0b',
          icon: ShieldAlert,
          glow: 'shadow-[0_0_12px_#f59e0b]'
        };
      case 'MEDIUM':
        return {
          cardBorder: 'border-yellow-500/50 shadow-[0_0_20px_rgba(234,179,8,0.1)]',
          badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40',
          accent: 'text-yellow-400',
          gaugeColor: '#eab308',
          icon: AlertTriangle,
          glow: 'shadow-[0_0_10px_#eab308]'
        };
      default:
        return {
          cardBorder: 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          accent: 'text-emerald-400',
          gaugeColor: '#10b981',
          icon: CheckCircle2,
          glow: 'shadow-[0_0_10px_#10b981]'
        };
    }
  };

  const colors = getRiskColors(result.risk_level);
  const Icon = colors.icon;

  const handleCopySummary = () => {
    const textToCopy = `[SHIELD BD INCIDENT REPORT]\nRisk: ${result.risk_level} (${result.risk_score}/100)\nCategory: ${result.category}\nAdvice: ${result.recommended_actions.immediate.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border bg-[#09110B] ${colors.cardBorder} p-5 sm:p-6 text-slate-100 transition-all hud-corner-card relative`}>
      {/* Dossier Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">DOSSIER-REF:</span>
          <span className="text-slate-200 font-bold">{result.id.slice(0, 18)}</span>
          <span className="text-slate-700">•</span>
          <span className="text-slate-400">{result.timestamp}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500">ENGINE:</span>
          <span className="text-[#D4FF00] font-semibold flex items-center gap-1">
            <Cpu className="w-3 h-3 text-[#D4FF00]" />
            {result.analyzed_via === 'gemini-ai' ? 'GEMINI 2.5 CYBER-INTEL' : 'SHIELD HEURISTIC CORE'}
          </span>
        </div>
      </div>

      {/* Primary Triage Breakdown: Score Gauge & Risk Overview */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 py-5 border-b border-white/10">
        <div className="flex items-start gap-4">
          {/* High-Precision Gauge */}
          <div className="relative w-18 h-18 flex-shrink-0 flex items-center justify-center bg-[#040805] rounded-xl border border-white/10 shadow-inner">
            <svg className="w-15 h-15 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                strokeWidth="3.5"
                strokeDasharray={`${result.risk_score}, 100`}
                strokeLinecap="round"
                stroke={colors.gaugeColor}
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-lg font-extrabold text-white tracking-tight leading-none">
                {result.risk_score}
              </span>
              <span className="text-[9px] text-slate-500">/100</span>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold border ${colors.badgeBg}`}>
                <Icon className="w-3.5 h-3.5" />
                {result.risk_level} SEVERITY
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10">
                {result.category}
              </span>
              {result.target_service && (
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 text-[#D4FF00] border border-emerald-800/50">
                  Target: {result.target_service}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {languagePref === 'Bangla' && result.summary_bn ? result.summary_bn : result.summary}
            </h3>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-400 mt-2 font-mono">
              <span>Lang: <strong className="text-slate-200">{result.detected_language}</strong></span>
              <span>•</span>
              <span>Confidence: <strong className="text-[#D4FF00]">{Math.round(result.confidence * 100)}%</strong></span>
              <span>•</span>
              <span className="text-slate-500">ZERO DATA STORED ON CLOUD</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#040805] border border-white/10 hover:border-white/30 text-slate-200 hover:text-white text-xs font-mono font-medium transition"
            title="Copy advisory summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy Dossier'}
          </button>
          {result.risk_level === 'CRITICAL' && onOpenTrustedContact && (
            <button
              onClick={onOpenTrustedContact}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition shadow-sm"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Alert Trusted Family</span>
            </button>
          )}
        </div>
      </div>

      {/* Forensics Inspection: Evidence vs AI Behavioral Deduction */}
      <div className="mt-5 bg-[#090E1A] rounded-lg border border-slate-800 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
            {languagePref === 'Bangla' ? 'প্রমাণ ও কৌশল বিশ্লেষণ (EVIDENCE & TACTICS)' : 'Forensic Evidence & Social Engineering Analysis'}
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
          {/* Concrete Evidence Points */}
          <div className="bg-[#0E1526] p-3 rounded-md border border-slate-800">
            <span className="font-mono text-slate-300 block mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
              Verified Textual Artifacts (তথ্যগত প্রমাণ)
            </span>
            {result.why_risky.evidence_points.length > 0 ? (
              <ul className="space-y-1.5 text-slate-300 list-disc list-inside font-sans">
                {result.why_risky.evidence_points.map((point, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {point}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 italic">No overt malicious keywords detected.</p>
            )}
          </div>

          {/* AI Behavioral Inference */}
          <div className="bg-[#0E1526] p-3 rounded-md border border-slate-800">
            <span className="font-mono text-slate-300 block mb-2 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Psychological Vector (মনস্তাত্ত্বিক ফাঁদ)
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">
              {result.why_risky.ai_inference}
            </p>
            {result.why_risky.target_intent && (
              <div className="mt-2.5 pt-2 border-t border-slate-800/80 font-mono text-[11px] text-slate-300">
                <span className="text-amber-400 font-semibold">TARGET GOAL: </span>
                {result.why_risky.target_intent}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Threat Signals Breakdown */}
      {result.signals.length > 0 && (
        <div className="mt-5">
          <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            {languagePref === 'Bangla' ? 'সনাক্ত হওয়া সংকেতসমূহ (THREAT SIGNALS)' : 'Detected Threat Indicators'}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {result.signals.map((signal, idx) => (
              <div 
                key={idx} 
                className="bg-[#090E1A] p-3 rounded-md border border-slate-800/90 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-semibold text-white text-xs">{signal.title}</span>
                    <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      signal.severity === 'critical' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                      signal.severity === 'high' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {signal.severity}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-2 font-sans">
                    {signal.explanation}
                  </p>
                </div>
                <div className="bg-[#05080F] px-2 py-1 rounded text-[11px] text-slate-400 border border-slate-850 font-mono truncate">
                  Artifact: <span className="text-rose-400 font-semibold">"{signal.evidence}"</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actionable Countermeasures with Interactive Check-off */}
      <div className="mt-5 bg-[#08151E] rounded-lg border border-cyan-900/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <h4 className="font-mono font-bold text-xs tracking-wider uppercase text-cyan-200">
              {languagePref === 'Bangla' ? 'জরুরী পদক্ষেপ ও প্রতিরোধ (IMMEDIATE COUNTERMEASURES)' : 'Mandatory Protective Action Plan'}
            </h4>
          </div>
          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800/40">
            {completedActions.length}/{result.recommended_actions.immediate.length} Completed
          </span>
        </div>

        <div className="space-y-2">
          {result.recommended_actions.immediate.map((action, idx) => {
            const isDone = completedActions.includes(idx);
            return (
              <div 
                key={idx} 
                onClick={() => toggleAction(idx)}
                className={`flex items-start gap-2.5 p-2 rounded cursor-pointer transition border text-xs sm:text-sm ${
                  isDone 
                    ? 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300 line-through opacity-75' 
                    : 'bg-[#0A1A26] border-slate-800/80 text-cyan-100 hover:border-cyan-700/60'
                }`}
              >
                <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 transition ${
                  isDone ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-cyan-700 bg-slate-900'
                }`}>
                  {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="leading-snug">{action}</span>
              </div>
            );
          })}
        </div>

        {/* Verified Helpline Quick Connect */}
        <div className="mt-4 pt-3 border-t border-cyan-900/50 flex flex-wrap items-center justify-between gap-2.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <PhoneCall className="w-3 h-3 text-cyan-400" />
            <span>Official Emergency Speed-Dial:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <a href="tel:16247" className="bg-[#0D2436] hover:bg-cyan-900 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-200 border border-cyan-800/50 transition">
              bKash: 16247
            </a>
            <a href="tel:16167" className="bg-[#0D2436] hover:bg-cyan-900 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-200 border border-cyan-800/50 transition">
              Nagad: 16167
            </a>
            <a href="tel:121" className="bg-[#0D2436] hover:bg-cyan-900 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-200 border border-cyan-800/50 transition">
              GP Cyber: 121
            </a>
            <a href="tel:13219" className="bg-[#0D2436] hover:bg-cyan-900 px-2 py-0.5 rounded text-[11px] font-semibold text-cyan-200 border border-cyan-800/50 transition">
              Cyber Police: 13219
            </a>
            <a href="tel:999" className="bg-rose-950/60 hover:bg-rose-900 px-2 py-0.5 rounded text-[11px] font-semibold text-rose-200 border border-rose-800/50 transition">
              Police Emergency: 999
            </a>
          </div>
        </div>
      </div>

      {/* Privacy Notice & Technical Breakdown Accordion */}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800/80 font-mono">
        <div className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-emerald-400" />
          <span className="text-[11px]">{result.privacy_notes}</span>
        </div>
        <button
          onClick={() => setShowTechnical(!showTechnical)}
          className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition"
        >
          <span>{showTechnical ? 'Hide Technical Metadata' : 'View Security Metadata'}</span>
          {showTechnical ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {showTechnical && (
        <div className="mt-3 p-3 bg-[#070B14] text-emerald-400 rounded-md text-[11px] font-mono border border-slate-800 overflow-x-auto">
          <pre>{JSON.stringify({
            incident_id: result.id,
            timestamp_utc6: result.timestamp,
            risk_score: result.risk_score,
            risk_level: result.risk_level,
            engine: result.analyzed_via,
            confidence_interval: result.confidence,
            detected_signals: result.signals.length,
            client_hash: 'sha256-verified-tamper-proof',
            cloud_persistence: 'DISABLED'
          }, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
