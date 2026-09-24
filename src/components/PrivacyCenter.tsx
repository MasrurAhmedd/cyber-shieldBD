/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  EyeOff, 
  Server, 
  Clock, 
  Trash2, 
  Check, 
  AlertCircle,
  HelpCircle,
  FileText,
  Sparkles,
  Terminal,
  Cpu
} from 'lucide-react';
import { PrivacySettings, Language } from '../types';

interface PrivacyCenterProps {
  language: Language;
}

export const PrivacyCenter: React.FC<PrivacyCenterProps> = ({ language }) => {
  const [settings, setSettings] = useState<PrivacySettings>({
    store_messages: false,
    store_screenshots: false,
    anonymous_telemetry: true,
    coarse_location_sharing: false,
    community_threat_sharing: true,
    ephemeral_mode: true,
  });

  const [saved, setSaved] = useState(false);

  const toggle = (key: keyof PrivacySettings) => {
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Privacy Manifesto Header */}
      <div className="bg-[#0D1424] text-white p-5 sm:p-6 rounded-xl border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-950 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono mb-2">
            <Lock className="w-3 h-3" />
            <span>ZERO-RETENTION CRYPTOGRAPHIC PRIVACY CHARTER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-tight">
            YOUR COMMUNICATIONS BELONG STRICTLY TO YOU.
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1.5 max-w-2xl leading-relaxed">
            SHIELD BD executes all lexical and heuristic evaluations in volatile ephemeral memory. Raw SMS bodies and screenshot pixels are immediately scrubbed upon inference completion. Zero behavioral ad profiling. Zero data sales.
          </p>
        </div>
      </div>

      {/* Interactive Controls & Toggles */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
              EPHEMERAL RUNTIME & RETENTION SWITCHES
            </h3>
          </div>
          {saved && (
            <span className="text-[11px] font-mono font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> PREFERENCES PERSISTED
            </span>
          )}
        </div>

        <div className="space-y-3">
          {/* Message Storage */}
          <div className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-[#070B14] border border-slate-800">
            <div>
              <span className="font-mono font-bold text-slate-200 text-xs block">
                Persistent Message Storage
              </span>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                Permanently saves raw inspected message tokens in a cloud database. (Default: HARD OFF)
              </p>
            </div>
            <button
              onClick={() => toggle('store_messages')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 border ${
                settings.store_messages ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                settings.store_messages ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute`} />
            </button>
          </div>

          {/* Screenshot Storage */}
          <div className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-[#070B14] border border-slate-800">
            <div>
              <span className="font-mono font-bold text-slate-200 text-xs block">
                Screenshot & Bitmap Storage
              </span>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                Retains uploaded image buffers after OCR parsing and threat classification completes. (Default: HARD OFF)
              </p>
            </div>
            <button
              onClick={() => toggle('store_screenshots')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 border ${
                settings.store_screenshots ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                settings.store_screenshots ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute`} />
            </button>
          </div>

          {/* Coarse Location */}
          <div className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-[#070B14] border border-slate-800">
            <div>
              <span className="font-mono font-bold text-slate-200 text-xs block">
                Coarse District Tagging (Opt-in only)
              </span>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                Attaches approximate district (e.g., "Dhaka" or "Chittagong") solely when filing citizen scam reports. Never precise GPS coordinates.
              </p>
            </div>
            <button
              onClick={() => toggle('coarse_location_sharing')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 border ${
                settings.coarse_location_sharing ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                settings.coarse_location_sharing ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute`} />
            </button>
          </div>

          {/* Anonymous Threat Intel */}
          <div className="flex items-start justify-between gap-4 p-3.5 rounded-lg bg-[#070B14] border border-slate-800">
            <div>
              <span className="font-mono font-bold text-slate-200 text-xs block">
                Mesh Threat Radar Contribution
              </span>
              <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                Contributes anonymous URL hash fingerprints to warn fellow citizens of emerging phishing infrastructure.
              </p>
            </div>
            <button
              onClick={() => toggle('community_threat_sharing')}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 border ${
                settings.community_threat_sharing ? 'bg-emerald-600 border-emerald-500' : 'bg-slate-800 border-slate-700'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform transform shadow-sm ${
                settings.community_threat_sharing ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute`} />
            </button>
          </div>
        </div>
      </div>

      {/* Data Lifecycle Transparency Matrix */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 space-y-3">
        <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
          DATA LIFECYCLE & VOLATILE ARCHITECTURE AUDIT
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-bold uppercase">
                <th className="pb-2.5 pr-4">Artifact</th>
                <th className="pb-2.5 pr-4">Execution Host</th>
                <th className="pb-2.5 pr-4">Retention Window</th>
                <th className="pb-2.5">Exfiltration Guard</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              <tr>
                <td className="py-2.5 font-bold text-slate-100">SMS / Voice Transcripts</td>
                <td className="py-2.5 text-slate-400">RAM (Node V8 Ephemeral)</td>
                <td className="py-2.5 text-emerald-400 font-bold">0 Seconds (Scrubbed)</td>
                <td className="py-2.5 text-slate-400">Never Persisted</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-slate-100">Uploaded Image Bitmaps</td>
                <td className="py-2.5 text-slate-400">Multimodal Buffer</td>
                <td className="py-2.5 text-emerald-400 font-bold">Purged post-OCR</td>
                <td className="py-2.5 text-slate-400">Zero Disk Write</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-slate-100">Phone Numbers & OTP Tokens</td>
                <td className="py-2.5 text-slate-400">Client-Side Sanitizer</td>
                <td className="py-2.5 text-emerald-400 font-bold">Masked (01X-XXXXXXX)</td>
                <td className="py-2.5 text-slate-400">Regex Redacted</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-slate-100">Aggregated Campaign Stats</td>
                <td className="py-2.5 text-slate-400">Community Radar Index</td>
                <td className="py-2.5 text-cyan-400 font-bold">Rolling 24h Counter</td>
                <td className="py-2.5 text-slate-400">Public Mesh Feed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsible AI Disclaimer */}
      <div className="bg-amber-950/30 border border-amber-800/60 rounded-xl p-4 text-xs font-mono text-amber-300 space-y-1.5">
        <div className="flex items-center gap-2 font-bold text-amber-200 text-xs">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>RESPONSIBLE AI & LIMITATIONS DISCLOSURE</span>
        </div>
        <p className="leading-relaxed text-slate-300 font-sans text-xs">
          SHIELD BD operates as an automated threat-warning sentinel, not a statutory judicial authority or financial clearinghouse. Models are calibrated on empirical Bangladeshi deception vectors (bKash/Nagad spoofing, lottery SMS, illegal job rings). Novel zero-day evasion methods may occasionally require verification through official 16247 or banking helplines.
        </p>
      </div>
    </div>
  );
};
