/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, Play, ShieldAlert, Users, Radio, Lock } from 'lucide-react';
import { DemoScenario } from '../types';
import { DEMO_SCENARIOS } from '../data/demoData';

interface LiveDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScenario: (scenario: DemoScenario) => void;
  onNavigateToTab: (tab: string) => void;
}

export const LiveDemoModal: React.FC<LiveDemoModalProps> = ({
  isOpen,
  onClose,
  onSelectScenario,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const handleRunPrimaryJudgeScenario = () => {
    const primaryScenario = DEMO_SCENARIOS[0]; // Banglish bKash OTP scam
    onNavigateToTab('message');
    onSelectScenario(primaryScenario);
    onClose();
  };

  const steps = [
    {
      num: '1',
      title: 'The Real-World Bangladeshi Problem',
      desc: 'Imagine your mother receives a message in Banglish: "Apnar account bondho hoye jabe. Ekhoni verify korun. OTP ta den."',
      action: 'Run Banglish OTP Scenario',
      icon: ShieldAlert,
      onClick: handleRunPrimaryJudgeScenario
    },
    {
      num: '2',
      title: 'Explainable AI — Not Just Binary Scam/Not-Scam',
      desc: 'SHIELD scores 94/100 (CRITICAL) and breaks down verified text evidence vs AI inference.',
      action: 'Inspect Risk Signals & "Why?"',
      icon: CheckCircle2,
      onClick: () => {
        onNavigateToTab('message');
        onClose();
      }
    },
    {
      num: '3',
      title: 'Social Engineering Attack Journey',
      desc: 'Examine entire dialogues step-by-step from Trust Building to Fear, Urgency, and Credential Extortion.',
      action: 'Open Conversation Analyzer',
      icon: Users,
      onClick: () => {
        onNavigateToTab('conversation');
        onClose();
      }
    },
    {
      num: '4',
      title: 'Community Scam Radar & Cluster Intelligence',
      desc: 'Anonymous reports roll into active threat campaigns across Dhaka, Chattogram, and Sylhet.',
      action: 'Open Scam Radar',
      icon: Radio,
      onClick: () => {
        onNavigateToTab('radar');
        onClose();
      }
    },
    {
      num: '5',
      title: 'Privacy-by-Design & Elder Mode',
      desc: 'Showcase zero message retention and switch on Elder Mode for high-contrast, large-button Bangla safety.',
      action: 'Review Privacy Center',
      icon: Lock,
      onClick: () => {
        onNavigateToTab('privacy');
        onClose();
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#0D1424] rounded-xl border border-slate-700 shadow-2xl max-w-2xl w-full p-5 sm:p-7 my-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-amber-950 border border-amber-700/60 text-amber-400 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wide">
              FUTUREMAKERS 2026 EVALUATION SEQUENCE
            </div>
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white">
              EVALUATION BRIEFING (2-MINUTE WALKTHROUGH)
            </h2>
          </div>
        </div>

        <p className="text-xs text-slate-300 font-mono leading-relaxed mb-4">
          Step through this choreographed vector pipeline to examine how SHIELD BD resolves real Bangladeshi digital attack patterns:
        </p>

        {/* Steps List */}
        <div className="space-y-2.5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-3 rounded-lg bg-[#070B14] border border-slate-800 hover:border-slate-700 transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded bg-slate-800 text-white font-mono font-bold flex items-center justify-center text-[11px] flex-shrink-0 mt-0.5 border border-slate-700">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="font-mono font-bold text-white text-xs">{step.title}</h4>
                    <p className="text-slate-400 mt-0.5 leading-relaxed font-mono text-[11px]">{step.desc}</p>
                  </div>
                </div>

                <button
                  onClick={step.onClick}
                  className="self-end sm:self-auto flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1424] hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs transition flex-shrink-0"
                >
                  <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                  <span>{step.action}</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Quick Launch CTA */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
          <p className="text-[11px] font-mono text-slate-500 italic">
            "Zero-retention architecture with deterministic evidence parsing."
          </p>
          <button
            onClick={handleRunPrimaryJudgeScenario}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)] transition"
          >
            <span>LAUNCH SEQUENCE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
