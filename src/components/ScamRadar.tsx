/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  TrendingUp, 
  MapPin, 
  ShieldAlert, 
  Share2, 
  AlertCircle, 
  CheckCircle2, 
  PlusCircle, 
  X, 
  Send, 
  Lock, 
  MessageSquare,
  Sparkles,
  Layers,
  Terminal,
  Activity
} from 'lucide-react';
import { ScamCampaign, AnonymousReport, Language } from '../types';

interface ScamRadarProps {
  language: Language;
  onOpenReportModal: () => void;
}

export const ScamRadar: React.FC<ScamRadarProps> = ({ language, onOpenReportModal }) => {
  const [campaigns, setCampaigns] = useState<ScamCampaign[]>([]);
  const [recentReports, setRecentReports] = useState<AnonymousReport[]>([]);
  const [stats, setStats] = useState({
    totalReportsToday: 384,
    activeCampaignsCount: 4,
    threatsPrevented24h: 1290
  });
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const fetchRadarData = async () => {
    try {
      const res = await fetch('/api/scam-radar');
      const data = await res.json();
      setCampaigns(data.campaigns || []);
      setRecentReports(data.recentReports || []);
      setStats({
        totalReportsToday: data.totalReportsToday || 384,
        activeCampaignsCount: data.activeCampaignsCount || 4,
        threatsPrevented24h: data.threatsPrevented24h || 1290
      });
    } catch (e) {
      console.error('Failed to load scam radar data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRadarData();
  }, []);

  const filteredCampaigns = selectedFilter === 'ALL'
    ? campaigns
    : campaigns.filter(c => c.risk_level === selectedFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Banner & National Threat Level */}
      <div className="bg-[#0D1424] text-white rounded-xl p-5 sm:p-6 border border-slate-800 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono mb-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>LIVE BANGLADESH COMMUNITY RADAR • BD TELEMETRY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-mono font-bold tracking-tight">
              SCAM RADAR & CLUSTER INTELLIGENCE
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-1 max-w-xl leading-relaxed">
              Real-time heuristic clustering synthesizes citizen reports across 64 districts to detect organized syndicate campaigns before nationwide proliferation.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2.5 self-stretch md:self-auto">
            <div className="bg-[#070B14] border border-slate-800 p-3 rounded-lg text-center">
              <span className="text-lg font-mono font-bold text-emerald-400 block">{stats.totalReportsToday}</span>
              <span className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Reports 24h</span>
            </div>
            <div className="bg-[#070B14] border border-slate-800 p-3 rounded-lg text-center">
              <span className="text-lg font-mono font-bold text-amber-400 block">{stats.activeCampaignsCount}</span>
              <span className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Active Rings</span>
            </div>
            <div className="bg-[#070B14] border border-slate-800 p-3 rounded-lg text-center">
              <span className="text-lg font-mono font-bold text-cyan-400 block">{stats.threatsPrevented24h}+</span>
              <span className="text-[9px] uppercase font-mono text-slate-400 tracking-wider">Intercepts</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Charter: Aggregated frequency hashes & coarse districts only. Zero personal chat retention.</span>
          </div>

          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs transition shadow-[0_0_15px_rgba(16,185,129,0.2)]"
          >
            <PlusCircle className="w-4 h-4" />
            FILE SUSPICIOUS INCIDENT
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-1.5 bg-[#0D1424] p-1 rounded-lg border border-slate-800 text-xs">
          {['ALL', 'CRITICAL', 'HIGH'].map((level) => (
            <button
              key={level}
              onClick={() => setSelectedFilter(level)}
              className={`px-3 py-1 rounded font-mono text-xs font-semibold transition ${
                selectedFilter === level
                  ? 'bg-slate-800 text-white border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {level === 'ALL' ? 'ALL ACTIVE THREATS' : `${level} SEVERITY`}
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          Source: Coarse community signals + Grameenphone Mesh 2026
        </div>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCampaigns.map((camp) => {
          const isCrit = camp.risk_level === 'CRITICAL';
          return (
            <div 
              key={camp.id}
              className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5 hover:border-slate-700 transition flex flex-col justify-between"
            >
              <div>
                {/* Status bar */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                    isCrit 
                      ? 'bg-rose-950 text-rose-300 border-rose-800/60' 
                      : 'bg-amber-950 text-amber-300 border-amber-800/60'
                  }`}>
                    {camp.risk_level} THREAT
                  </span>

                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/60">
                    <TrendingUp className="w-3 h-3" />
                    <span>{camp.trend}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-mono font-bold text-white leading-snug mb-1">
                  {language === 'Bangla' ? camp.title_bn : camp.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mb-2.5">
                  Category: <strong className="text-slate-200">{camp.category}</strong> • {camp.reports_count} verified citizen telemetries
                </p>

                <p className="text-xs text-slate-300 leading-relaxed mb-3.5 font-sans">
                  {camp.description}
                </p>

                {/* Common Phrases & Attack Fingerprint */}
                <div className="mb-3.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    LINGUISTIC SIGNATURE PATTERNS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {camp.common_phrases.map((phrase, idx) => (
                      <span key={idx} className="text-[10px] font-mono bg-[#070B14] text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Hotspots & Target Channels */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" />
                  <span>Target Hubs: <strong className="text-slate-200">{camp.locations.join(', ')}</strong></span>
                </div>
                <div className="flex items-center gap-1">
                  <span>Vectors: {camp.target_channels.join(', ')}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Anonymous Threat Feed */}
      <div className="bg-[#0D1424] rounded-xl border border-slate-800 p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <h3 className="font-mono font-bold text-white text-xs sm:text-sm tracking-wide">
              LIVE ANONYMOUS THREAT DISPATCH WIRE
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Coarse district cluster telemetry</span>
        </div>

        <div className="divide-y divide-slate-800">
          {recentReports.map((report) => (
            <div key={report.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse flex-shrink-0" />
                <span className="font-mono font-bold text-slate-200">{report.category}</span>
                <span className="px-1.5 py-0.2 rounded bg-[#070B14] text-slate-400 font-mono text-[10px] border border-slate-800">
                  via {report.channel} ({report.sender_indicator})
                </span>
                <span className="text-slate-400 truncate max-w-md hidden md:inline font-mono text-[11px]">
                  "{report.snippet_sanitized}"
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 font-mono text-[10px] flex-shrink-0">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {report.city}
                </span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-800/60">
                  {report.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
