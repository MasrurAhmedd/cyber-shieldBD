/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Send, 
  Sparkles, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle, 
  HelpCircle, 
  ArrowDown, 
  Flame, 
  RotateCcw,
  Zap,
  PhoneOff,
  Terminal,
  Activity
} from 'lucide-react';
import { AnalysisResult, Language, DemoScenario, SocialEngineeringStage } from '../types';
import { RiskCard } from './RiskCard';
import { DEMO_SCENARIOS } from '../data/demoData';

interface ConversationAnalyzerProps {
  language: Language;
  onOpenTrustedContact?: () => void;
  presetScenario?: DemoScenario | null;
  onClearPreset?: () => void;
}

export const ConversationAnalyzer: React.FC<ConversationAnalyzerProps> = ({
  language,
  onOpenTrustedContact,
  presetScenario,
  onClearPreset,
}) => {
  const conversationPreset = DEMO_SCENARIOS.find(s => s.type === 'conversation')!;

  const [transcript, setTranscript] = useState(
    presetScenario && presetScenario.type === 'conversation'
      ? presetScenario.sample_content
      : conversationPreset.sample_content
  );
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (presetScenario && presetScenario.type === 'conversation') {
      setTranscript(presetScenario.sample_content);
      handleAnalyze(presetScenario.sample_content);
    }
  }, [presetScenario]);

  const handleAnalyze = async (textToTest?: string) => {
    const text = textToTest || transcript;
    if (!text.trim()) {
      setError('Please paste a conversation transcript to inspect.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch('/api/analyze/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript: text.trim() })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: AnalysisResult = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Conversation analysis error:', err);
      setError('Failed to analyze conversation transcript.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header & Quick Vector Strip */}
      <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-mono font-bold text-white tracking-wide">
                {language === 'Bangla' ? 'কথোপকথন ও সামাজিক মনস্তত্ত্ব অডিট' : 'SOCIAL ENGINEERING ATTACK TIMELINE AUDITOR'}
              </h2>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-800/50">
                BEHAVIORAL FORENSICS
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Chronological psychological hook deconstruction • Fear & urgency entrapment mapping
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setTranscript(conversationPreset.sample_content);
            handleAnalyze(conversationPreset.sample_content);
          }}
          className="text-xs font-mono font-semibold px-3 py-1.5 rounded bg-[#131B2E] hover:bg-[#1A2640] text-amber-300 border border-slate-800 hover:border-amber-500/40 transition whitespace-nowrap"
        >
          LOAD BANK MANAGER DIALOGUE
        </button>
      </div>

      {/* Input Box */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 space-y-3.5">
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            CONVERSATION BUFFER (FORMAT: SCAMMER vs VICTIM):
          </label>
          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={7}
            placeholder={`SCAMMER: Hello brother.\nUSER: Who is this?\nSCAMMER: Calling from your bank. An unauthorized transaction occurred...\nSCAMMER: Provide your 6-digit OTP immediately.`}
            className="w-full rounded-lg bg-[#070B14] border border-slate-800 p-3.5 text-xs sm:text-sm font-mono text-slate-100 focus:outline-none focus:border-amber-500/60 transition resize-y placeholder:text-slate-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <span className="text-[11px] font-mono text-slate-400">
            Stages Mapped: Rapport → Authority Impersonation → Manufactured Crisis → Urgency → Credential Extraction
          </span>

          <button
            onClick={() => handleAnalyze()}
            disabled={loading || !transcript.trim()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 font-mono font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.2)] disabled:shadow-none transition whitespace-nowrap disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-900/30 border-t-slate-950 animate-spin" />
                <span>MAPPING THREAT VECTOR...</span>
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" />
                <span>AUDIT SOCIAL ENGINEERING</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-rose-950/40 border border-rose-800/60 rounded-lg p-3 text-xs font-mono text-rose-300">
            {error}
          </div>
        )}
      </div>

      {/* Result Display & Interactive Social Engineering Progression Timeline */}
      {result && (
        <div className="space-y-5">
          {/* Visual Social Engineering Timeline */}
          {result.social_engineering_stages && result.social_engineering_stages.length > 0 && (
            <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-rose-400" />
                  <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
                    SOCIAL ENGINEERING ESCALATION TIMELINE
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50">
                  {result.social_engineering_stages.filter(s => s.detected).length} of 6 Stages Triggered
                </span>
              </div>

              {/* Timeline Stages Grid */}
              <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
                {result.social_engineering_stages.map((stage, idx) => {
                  const isTriggered = stage.detected;
                  const isInterventionPoint = stage.stage === 4;

                  return (
                    <div key={idx} className="relative group">
                      {/* Timeline Node Icon */}
                      <div className={`absolute -left-6 sm:-left-8 top-1 w-6 sm:w-8 h-6 sm:h-8 rounded-md flex items-center justify-center font-mono font-bold text-xs border ${
                        isTriggered
                          ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_10px_rgba(244,63,94,0.4)]'
                          : 'bg-[#0A101D] border-slate-800 text-slate-500'
                      }`}>
                        {stage.stage}
                      </div>

                      {/* Content Card */}
                      <div className={`p-3.5 rounded-lg border transition-all ${
                        isTriggered
                          ? 'bg-[#090E1A] border-rose-900/60 shadow-xs'
                          : 'bg-[#070B14] border-slate-850 opacity-50'
                      }`}>
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-xs">
                              Stage {stage.stage}: {stage.name}
                            </span>
                            {isTriggered && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800/60">
                                ACTIVE PATTERN
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            Trigger: {stage.psychologicalTrigger}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 mb-2 leading-relaxed font-sans">
                          {stage.tactic}
                        </p>

                        {isTriggered && stage.snippet && (
                          <div className="bg-[#05080F] border border-slate-800 p-2.5 rounded text-xs font-mono text-rose-300 mb-2">
                            <span className="text-slate-500">Transcribed Match: </span>
                            "{stage.snippet}"
                          </div>
                        )}

                        {/* Critical Safe Intervention Advice */}
                        {isInterventionPoint && isTriggered && (
                          <div className="mt-2.5 p-2.5 bg-amber-950/40 border border-amber-700/60 rounded text-xs font-mono text-amber-200 flex items-center gap-2">
                            <PhoneOff className="w-4 h-4 text-amber-400 flex-shrink-0" />
                            <span>
                              <strong>CRITICAL DEFENSE TURNING POINT:</strong> Hang up immediately. No legitimate bank officer ever solicits OTP or PIN codes over voice calls.
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Standard Risk Card Summary */}
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
