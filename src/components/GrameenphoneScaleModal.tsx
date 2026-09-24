/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, Layers, Radio, Smartphone, ShieldCheck, CheckCircle2, Globe, TrendingUp, Sparkles } from 'lucide-react';

interface GrameenphoneScaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GrameenphoneScaleModal: React.FC<GrameenphoneScaleModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-[#0D1424] rounded-xl border border-slate-700 shadow-2xl max-w-3xl w-full p-5 sm:p-7 my-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono mb-1">
              GRAMEENPHONE FUTUREMAKERS 2026 ROADMAP
            </div>
            <h2 className="text-lg sm:text-xl font-mono font-bold text-white">
              TELECOM-SCALE ARCHITECTURE & INTEGRATION
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-xs font-mono text-slate-300 leading-relaxed">
          {/* Executive Overview */}
          <div className="p-3.5 rounded-lg bg-[#070B14] text-slate-200 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              THE GRAMEENPHONE MULTIPLIER: 85+ MILLION PROTECTED SUBSCRIBERS
            </h4>
            <p className="text-[11px] text-slate-400 font-sans">
              With 85M+ active SIM subscribers across Bangladesh, Grameenphone holds the infrastructural vantage point to intercept fraud campaigns at the gateway layer before landing in citizen SMS inboxes. SHIELD BD transitions seamlessly from an endpoint sentinel into a network-level threat intelligence engine.
            </p>
          </div>

          {/* 4 Pillars of Telecom Integration */}
          <div>
            <h4 className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] mb-2.5">
              FOUR CORE INFRASTRUCTURE VECTORS (REGULATORY COMPLIANT):
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-2 text-xs">
                  <Radio className="w-3.5 h-3.5 text-emerald-400" />
                  1. SMSC Gateway Heuristic Filter
                </span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Edge regex & Banglish scoring at the SMSC routing plane to halt bulk OTP phishing campaigns before delivery.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-2 text-xs">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  2. USSD *121# Feature-Phone Protocol
                </span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Enabling 35M+ non-smartphone rural subscribers to dial *121*99# to instantly verify high-risk SMS or report scam calls.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  3. Caller-ID Masking & Anti-Spoof
                </span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Cryptographic validation of official MFS origin headers (16247, 16167) preventing SS7 header impersonation.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-[#070B14] border border-slate-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-2 text-xs">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  4. Multi-Telco Threat Radar Mesh
                </span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Cross-operator telemetry shared between GP, Robi, Banglalink, and BTRC to blacklist zero-day phishing domains in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Phased Roadmap */}
          <div>
            <h4 className="font-mono font-bold text-slate-400 uppercase tracking-wider text-[11px] mb-2.5">
              DEPLOYMENT TIMELINE:
            </h4>
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2.5 p-2 rounded bg-emerald-950/40 border border-emerald-800/60">
                <span className="px-1.5 py-0.2 rounded bg-emerald-600 text-slate-950 font-bold text-[9px]">
                  PHASE 1 (LIVE)
                </span>
                <span className="text-white text-[11px]">
                  AI Digital Safety Guardian Prototype (Web & Mobile Engine)
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded bg-[#070B14] border border-slate-800">
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold text-[9px]">
                  PHASE 2 (Q3 2026)
                </span>
                <span className="text-slate-300 text-[11px]">
                  National Scam Intelligence & Crowdsourced Reporting Mesh
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded bg-[#070B14] border border-slate-800">
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold text-[9px]">
                  PHASE 3 (Q4 2026)
                </span>
                <span className="text-slate-300 text-[11px]">
                  On-Device Local AI & MyGP Native SDK Integration
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded bg-[#070B14] border border-slate-800">
                <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-bold text-[9px]">
                  PHASE 4 (2027)
                </span>
                <span className="text-slate-300 text-[11px]">
                  Telecom-Scale Defense with BTRC & South Asian Regional Expansion
                </span>
              </div>
            </div>
          </div>

          {/* Social Impact Metrics */}
          <div className="p-3 bg-[#070B14] rounded-lg border border-slate-800 space-y-1.5 text-xs">
            <h5 className="font-mono font-bold text-white flex items-center gap-1.5 text-xs">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              MEASURABLE SOCIAL IMPACT BENCHMARKS
            </h5>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-400 text-[11px] font-sans list-disc list-inside">
              <li>96%+ Banglish & Bangla dialect deception detection precision</li>
              <li>85% reduction in unauthorized OTP / MFS wallet disclosures</li>
              <li>Zero private message retention (GDPR & BD Cyber Security Act aligned)</li>
              <li>Under 1.2s inference turnaround for instant safety decisions</li>
            </ul>
          </div>

          <div className="text-[10px] text-slate-500 italic font-mono pt-1">
            * Note: Grameenphone integration concepts represent architectural proposals for the FutureMakers 2026 challenge.
          </div>
        </div>
      </div>
    </div>
  );
};
