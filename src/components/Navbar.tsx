/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Shield, 
  MessageSquare, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Users, 
  Radio, 
  LayoutDashboard, 
  Lock, 
  Eye, 
  Sparkles,
  Layers,
  Activity,
  Terminal,
  Zap
} from 'lucide-react';
import { Language } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  elderMode: boolean;
  setElderMode: (val: boolean) => void;
  onOpenGpModal?: () => void;
  onOpenLiveDemo?: () => void;
  onOpenDemo?: () => void;
  onOpenTelecomVision?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  elderMode,
  setElderMode,
  onOpenGpModal,
  onOpenLiveDemo,
  onOpenDemo,
  onOpenTelecomVision,
}) => {
  const triggerGpModal = onOpenGpModal || onOpenTelecomVision;
  const triggerLiveDemo = onOpenLiveDemo || onOpenDemo;

  const navItems = [
    { id: 'message', label: 'Message Analysis', labelBn: 'বার্তা বিশ্লেষণ', hotkey: '1', icon: MessageSquare },
    { id: 'screenshot', label: 'Screenshot OCR', labelBn: 'স্ক্রিনশট যাচাই', hotkey: '2', icon: ImageIcon },
    { id: 'url', label: 'URL Sandbox', labelBn: 'লিঙ্ক স্যান্ডবক্স', hotkey: '3', icon: LinkIcon },
    { id: 'conversation', label: 'Chat Progression', labelBn: 'কথোপকথন অডিট', hotkey: '4', icon: Users },
    { id: 'radar', label: 'Threat Radar', labelBn: 'থ্রেট রাডার', hotkey: '5', icon: Radio },
    { id: 'dashboard', label: 'Security Posture', labelBn: 'নিরাপত্তা স্কোর', hotkey: '6', icon: LayoutDashboard },
    { id: 'privacy', label: 'Zero-Trace Privacy', labelBn: 'প্রাইভেসি আর্কিটেকচার', hotkey: '7', icon: Lock },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060B08]/95 backdrop-blur-xl border-b border-[#142318] text-slate-100">
      {/* Precision Operational Telemetry Strip */}
      <div className="bg-[#040805] text-slate-400 text-[11px] px-4 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#142318] font-mono tracking-tight">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] animate-pulse shadow-[0_0_6px_#D4FF00]" />
            <span className="text-[#D4FF00] font-semibold tracking-wider">SHIELD-BD // NODE-01</span>
          </div>
          <span className="text-slate-800">|</span>
          <span className="text-slate-400 hidden sm:inline">
            GP FUTUREMAKERS 2026 • AI DIGITAL GUARDIAN
          </span>
          <span className="text-slate-800 hidden md:inline">|</span>
          <span className="text-slate-500 hidden md:inline flex items-center gap-1">
            <Activity className="w-3 h-3 text-[#D4FF00]" />
            LATENCY: 24ms • CIPHER: AES-GCM-256
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {triggerGpModal && (
            <button
              onClick={triggerGpModal}
              className="flex items-center gap-1.5 text-emerald-300 hover:text-white transition text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/50 hover:border-[#D4FF00]"
            >
              <Layers className="w-3 h-3 text-[#D4FF00]" />
              <span>Telecom Architecture</span>
            </button>
          )}

          {triggerLiveDemo && (
            <button
              onClick={triggerLiveDemo}
              className="flex items-center gap-1.5 text-[#D4FF00] hover:text-white transition text-[11px] font-semibold bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/40 hover:border-[#D4FF00]"
            >
              <Zap className="w-3 h-3 text-[#D4FF00]" />
              <span>Judges Sandbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Command Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand Identity - Styled like the '2.3' radar icon in the reference */}
          <div 
            onClick={() => setActiveTab('message')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            {/* Circular Radar/Target Logo */}
            <div className="relative w-8 h-8 rounded-full border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-[#D4FF00] transition-colors">
              <div className="w-4 h-4 rounded-full border border-[#D4FF00]/60 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_6px_#D4FF00]" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#D4FF00]/80" />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold tracking-tight font-sans text-white">
                SHIELD<span className="text-[#D4FF00]">BD</span>
              </span>
              <span className="font-mono text-sm font-bold text-[#D4FF00]">
                2.3
              </span>
            </div>
          </div>

          {/* Navigation Links - Matching Company, Stories, Community, Resources + Analyzers */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#040805] px-2 py-1 rounded-full border border-[#142318]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-slate-500'}`} />
                  <span>{language === 'Bangla' ? item.labelBn : item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Elder Mode, Language & Solid White Pill SIGN UP button */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* Elder Mode Toggle */}
            <button
              onClick={() => setElderMode(!elderMode)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition border ${
                elderMode
                  ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                  : 'bg-[#08100B] border-[#142318] text-slate-400 hover:text-slate-200'
              }`}
              title="Elder / Simplified Large-Text Mode for Parents & Seniors"
            >
              <Eye className={`w-3.5 h-3.5 ${elderMode ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="hidden sm:inline">Elder</span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                elderMode ? 'bg-amber-400/30 text-amber-200' : 'bg-slate-800 text-slate-400'
              }`}>
                {elderMode ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* Language Selector */}
            <div className="inline-flex bg-[#040805] p-0.5 rounded-full border border-[#142318] text-xs font-mono">
              {(['Bangla', 'Banglish', 'English'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2.5 py-1 rounded-full text-[11px] transition ${
                    language === lang
                      ? 'bg-[#D4FF00] text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {lang === 'Bangla' ? 'বাংলা' : lang === 'Banglish' ? 'BANGLISH' : 'EN'}
                </button>
              ))}
            </div>

            {/* White Pill Button - Exactly like 'SIGN UP' in reference image */}
            <button
              onClick={() => {
                const target = document.getElementById('analyzer-workbench');
                if (target) target.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('message');
              }}
              className="bg-white hover:bg-slate-100 text-black font-sans font-bold text-xs uppercase px-5 py-2 rounded-full transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-1.5"
            >
              <span>SIGN UP</span>
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Navigation Scroll */}
        <div className="lg:hidden flex items-center gap-1.5 py-2 overflow-x-auto no-scrollbar border-t border-[#142318]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs whitespace-nowrap transition border ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#08100B] border-[#142318] text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{language === 'Bangla' ? item.labelBn : item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
