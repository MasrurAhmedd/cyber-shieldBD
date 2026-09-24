/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, AlertTriangle, ShieldCheck, ChevronRight, Terminal } from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoData';
import { DemoScenario } from '../types';

interface DemoBarProps {
  onSelectScenario: (scenario: DemoScenario) => void;
  activeTab: string;
}

export const DemoBar: React.FC<DemoBarProps> = ({ onSelectScenario, activeTab }) => {
  return (
    <div className="bg-[#040805] text-slate-200 border-b border-[#142318] py-2.5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-6 h-6 rounded bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-wider text-[#D4FF00]">
                ATTACK PRESETS
              </span>
              <span className="px-1.5 py-0.2 rounded bg-black/50 text-[10px] font-mono text-slate-400 border border-white/10">
                1-CLICK SIMULATION
              </span>
            </div>
          </div>
        </div>

        {/* Preset scenario pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
          {DEMO_SCENARIOS.slice(0, 6).map((scenario) => {
            const isCritical = scenario.expected_risk === 'CRITICAL';
            const isHigh = scenario.expected_risk === 'HIGH';
            return (
              <button
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className="group flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#08100B] hover:bg-[#0E1A11] text-xs font-medium whitespace-nowrap transition border border-white/10 hover:border-[#D4FF00]/40 text-slate-300 hover:text-white flex-shrink-0 shadow-xs"
              >
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isCritical ? 'bg-rose-500 shadow-[0_0_6px_#f43f5e]' : isHigh ? 'bg-amber-400' : 'bg-[#D4FF00]'
                }`} />
                <span className="text-slate-200">{scenario.title.split('(')[0].trim()}</span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-black/40 text-slate-400 border border-white/10">
                  {scenario.language}
                </span>
                <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#D4FF00] group-hover:translate-x-0.5 transition" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
