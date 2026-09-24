/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Lock, 
  Smartphone, 
  Eye, 
  ArrowUpRight, 
  Award,
  BarChart3,
  Activity,
  Terminal,
  Radio,
  Cpu,
  Shield
} from 'lucide-react';
import { Language } from '../types';

interface DashboardProps {
  language: Language;
  onNavigateToTab: (tab: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ language, onNavigateToTab }) => {
  const [safetyStats] = useState({
    overall: 84,
    accountSecurity: 88,
    scamAwareness: 94,
    privacyHealth: 80,
    deviceSafety: 76,
    threatsPrevented: 14,
    scamsFlagged: 9,
    safeVerifications: 5
  });

  const recentHistory = [
    {
      id: 'log-1',
      title: 'bKash Suspension SMS (Banglish Vector)',
      risk: 'CRITICAL',
      score: 94,
      time: '12m ago',
      action: 'OTP Exfiltration Intercepted'
    },
    {
      id: 'log-2',
      title: 'RedX ৳50 Delivery Phishing Domain',
      risk: 'HIGH',
      score: 82,
      time: '2h ago',
      action: 'Sandbox Quarantined'
    },
    {
      id: 'log-3',
      title: 'City Bank Inbound Salary Notification',
      risk: 'NOMINAL',
      score: 12,
      time: '22h ago',
      action: 'Cryptographic Match Validated'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome & Digital Safety Telemetry Card */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              <span>ACTIVE SENTINEL NODE • BANGLADESH CELL TELEMETRY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
              CITADEL DEFENSE POSTURE
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1 max-w-xl leading-relaxed">
              Real-time threat evaluation engine active. Zero credential leaks or unvetted OTP disclosures registered this period.
            </p>
          </div>

          {/* Safety Score Highlight */}
          <div className="bg-[#070B14] text-white rounded-xl p-4 flex items-center gap-4 border border-slate-800 shadow-inner self-stretch lg:self-auto">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  strokeWidth="3.5"
                  strokeDasharray={`${safetyStats.overall}, 100`}
                  strokeLinecap="round"
                  className="text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-lg text-emerald-400">
                {safetyStats.overall}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                CYBER RESILIENCE INDEX
              </span>
              <span className="text-sm font-mono font-bold text-slate-100">DEFENSIVE HARDENED</span>
              <span className="text-[11px] font-mono text-emerald-400 block mt-0.5">Top 10% nationwide posture</span>
            </div>
          </div>
        </div>

        {/* Dimension Breakdown Progress Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-800">
          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span className="text-slate-400">MFS & Identity Armor</span>
              <span className="text-slate-200 font-bold">{safetyStats.accountSecurity}%</span>
            </div>
            <div className="w-full bg-[#070B14] rounded-full h-1.5 border border-slate-800">
              <div className="bg-emerald-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: `${safetyStats.accountSecurity}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span className="text-slate-400">Phishing Heuristics</span>
              <span className="text-slate-200 font-bold">{safetyStats.scamAwareness}%</span>
            </div>
            <div className="w-full bg-[#070B14] rounded-full h-1.5 border border-slate-800">
              <div className="bg-cyan-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: `${safetyStats.scamAwareness}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span className="text-slate-400">Ephemeral Privacy</span>
              <span className="text-slate-200 font-bold">{safetyStats.privacyHealth}%</span>
            </div>
            <div className="w-full bg-[#070B14] rounded-full h-1.5 border border-slate-800">
              <div className="bg-teal-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.5)]" style={{ width: `${safetyStats.privacyHealth}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[11px] font-mono mb-1.5">
              <span className="text-slate-400">Endpoint Hygiene</span>
              <span className="text-slate-200 font-bold">{safetyStats.deviceSafety}%</span>
            </div>
            <div className="w-full bg-[#070B14] rounded-full h-1.5 border border-slate-800">
              <div className="bg-amber-400 h-1.5 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.5)]" style={{ width: `${safetyStats.deviceSafety}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Telemetry Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400">ATTACK VECTOR STOPS</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <span className="text-2xl font-mono font-bold text-white block">
            {safetyStats.threatsPrevented}
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Past 30 operational days</span>
        </div>

        <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400">OTP SCAMS DEFUSED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl font-mono font-bold text-white block">
            {safetyStats.scamsFlagged}
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">৳0 balance compromised</span>
        </div>

        <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">SANDBOX VERIFICATIONS</span>
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-mono font-bold text-white block">
            {safetyStats.safeVerifications}
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Suspicious links isolated</span>
        </div>

        <div className="bg-[#0D1424] p-4 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">COMMUNITY TELEMETRY</span>
            <Radio className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl font-mono font-bold text-white block">
            3
          </span>
          <span className="text-[11px] text-slate-400 font-mono mt-1 block">Grameenphone mesh signals</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Threats & Actionable Safety Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recent Threat Logs */}
        <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-slate-400" />
                <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
                  RECENT THREAT INTERCEPTION LOG
                </h3>
              </div>
              <button 
                onClick={() => onNavigateToTab('message')} 
                className="text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300"
              >
                TEST SAMPLE →
              </button>
            </div>

            <div className="space-y-2.5">
              {recentHistory.map((item) => (
                <div 
                  key={item.id} 
                  className="p-3 rounded-lg bg-[#070B14] border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`font-mono font-bold text-[10px] px-1.5 py-0.5 rounded border ${
                      item.risk === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border-rose-800/60' :
                      item.risk === 'HIGH' ? 'bg-amber-950 text-amber-300 border-amber-800/60' : 'bg-emerald-950 text-emerald-300 border-emerald-800/60'
                    }`}>
                      {item.risk} [{item.score}]
                    </span>
                    <div>
                      <h4 className="font-mono text-slate-200 text-xs font-medium">{item.title}</h4>
                      <span className="text-slate-500 text-[10px] font-mono">{item.time}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-[#0D1424] font-mono text-[10px] border border-slate-800 text-slate-300 whitespace-nowrap">
                    {item.action}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
            <span>Zero persistent PII storage in container memory</span>
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-slate-800">
              <Award className="w-4 h-4 text-amber-400" />
              <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
                RECOMMENDED DEFENSE HARDENING PROTOCOLS
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-lg bg-[#091120] border border-emerald-900/40 text-slate-200 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-emerald-300 block">Nominate a Family Trusted Contact</span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    Automated SMS alerting triggers if high-urgency voice or OTP coercion targets elderly relatives.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 text-slate-200 flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-slate-200 block">Audit Telegram Job Recruitment Groups</span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    Purge and exit channels soliciting advance collateral for task completion or video review jobs.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 text-slate-200 flex items-start gap-2.5">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-slate-200 block">Verify bKash App Biometrics</span>
                  <span className="text-slate-400 text-[11px] font-sans">
                    Switch wallet PIN to biometric fingerprint lock to prevent shoulder-surfing in public transit.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-500 text-[11px]">Grameenphone Safety Shield • BD Baseline 2026</span>
            <button 
              onClick={() => onNavigateToTab('privacy')}
              className="text-emerald-400 hover:text-emerald-300 font-bold"
            >
              PRIVACY COMPLIANCE →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
