/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Link2, 
  Users, 
  AlertCircle, 
  ChevronRight, 
  Globe, 
  Sparkles,
  Award,
  ShieldAlert,
  ArrowUpRight,
  Lock,
  Cpu
} from 'lucide-react';
import { Language } from '../types';

interface HeroBannerProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  onOpenReportModal: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  activeTab,
  setActiveTab,
  language,
  onOpenReportModal,
}) => {
  const quickActions = [
    {
      id: 'message',
      indexTag: '[01]',
      title: 'Message Analysis',
      titleBn: 'বার্তা ও এসএমএস বিশ্লেষণ',
      desc: 'Phonetic Banglish, SMS, & WhatsApp text parsing against known MFS phishing heuristics.',
      icon: MessageSquare,
      badge: 'SMS / MFS / CHAT',
    },
    {
      id: 'screenshot',
      indexTag: '[02]',
      title: 'Screenshot Forensics',
      titleBn: 'স্ক্রিনশট ওসিআর ফরেনসিক',
      desc: 'Vision OCR inspection on fraudulent bKash/Nagad receipts, fake prizes, & doctored slips.',
      icon: ImageIcon,
      badge: 'VISION OCR',
    },
    {
      id: 'url',
      indexTag: '[03]',
      title: 'Domain & URL Sandbox',
      titleBn: 'ওয়েব ডোমেইন ও লিঙ্ক যাচাই',
      desc: 'Inspect suspicious links, Punycode impersonation, and malicious APK direct downloads.',
      icon: Link2,
      badge: 'DNS & PUNYCODE',
    },
    {
      id: 'conversation',
      indexTag: '[04]',
      title: 'Social Engineering Audit',
      titleBn: 'সামাজিক প্রকৌশল অডিট',
      desc: 'Evaluate multi-step chat threads to uncover staged psychological urgency and OTP traps.',
      icon: Users,
      badge: 'MULTI-STEP INTEL',
    },
  ];

  return (
    <div className="relative bg-[#060B08] text-white overflow-hidden border-b border-[#142318]/80">
      {/* Background Cyber Wireframe Vortex Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg 
          className="w-full h-full object-cover" 
          viewBox="0 0 1440 900" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="rgba(212, 255, 0, 0.25)" strokeWidth="0.8">
            {/* Perspective Wireframe Tunnel Lines */}
            <path d="M720 380 L1440 100" />
            <path d="M720 380 L1440 250" />
            <path d="M720 380 L1440 450" />
            <path d="M720 380 L1440 680" />
            <path d="M720 380 L1440 900" />
            <path d="M720 380 L1080 900" />
            <path d="M720 380 L720 900" />
            <path d="M720 380 L360 900" />
            <path d="M720 380 L0 800" />
            <path d="M720 380 L0 500" />
            <path d="M720 380 L0 250" />
            <path d="M720 380 L0 100" />
            {/* Concentric elliptical rings forming the cyber tunnel */}
            <ellipse cx="880" cy="380" rx="120" ry="80" />
            <ellipse cx="980" cy="380" rx="220" ry="140" />
            <ellipse cx="1080" cy="380" rx="360" ry="220" />
            <ellipse cx="1180" cy="380" rx="520" ry="320" />
            <ellipse cx="1280" cy="380" rx="720" ry="440" />
          </g>
        </svg>
      </div>

      {/* Subtle Radial Atmosphere Glow */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#D4FF00]/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Hero Showcase Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Left Column: Headline, Split CTA, Social Proof, Subtext */}
          <div className="lg:col-span-5 z-10 flex flex-col justify-center space-y-7">
            {/* Subtle Tag */}
            <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider text-[#D4FF00] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
              <span>BD CYBER POLICE // AI DEFENSE GUARDIAN</span>
            </div>

            {/* Display Headline - Perfectly matched to reference */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[72px] font-extralight tracking-[-0.03em] leading-[1.05] text-white font-sans">
              Cyber police<br />
              with The<br />
              power of AI
            </h1>

            {/* Split CTA Button - Matching Book A Demo + Lime Arrow Box */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <div 
                onClick={() => {
                  const target = document.getElementById('analyzer-workbench');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                  else setActiveTab('message');
                }}
                className="inline-flex items-center group cursor-pointer filter drop-shadow-[0_4px_24px_rgba(212,255,0,0.15)]"
              >
                <div className="bg-white hover:bg-slate-100 text-black font-mono font-bold text-xs sm:text-sm tracking-wider uppercase px-7 py-3.5 rounded-l-md transition-colors duration-150 flex items-center gap-2">
                  <span>BOOK A DEMO</span>
                </div>
                <div className="bg-[#D4FF00] group-hover:bg-[#c3ed00] text-black w-12 h-[46px] sm:h-[48px] rounded-r-md flex items-center justify-center transition-colors duration-150">
                  <ChevronRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>

              <button
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-md bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border border-white/20 text-xs font-mono font-semibold transition"
              >
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>REPORT INTEL</span>
              </button>
            </div>

            {/* Social Proof & Active Users Count */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5 overflow-hidden">
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060B08] object-cover"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"
                    alt="User avatar 1"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060B08] object-cover"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
                    alt="User avatar 2"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060B08] object-cover"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
                    alt="User avatar 3"
                    referrerPolicy="no-referrer"
                  />
                  <img
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-[#060B08] object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces"
                    alt="User avatar 4"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-mono text-base font-bold text-white tracking-tight">
                  2.3M+
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                <Globe className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span className="text-slate-300">World active users</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Protecting 64 districts in Bangladesh</span>
              </div>
            </div>

            {/* Bottom Subtext Paragraph */}
            <div className="pt-3 max-w-md">
              <p className="text-[11px] font-mono tracking-wider uppercase text-slate-400 leading-relaxed">
                SIMPLIFY YOUR FINANCIAL LIFE. OUR INTUITIVE APP MAKES MANAGING YOUR MONEY SAFE FROM DIGITAL EXTORTION, PHISHING & MFS FRAUD.
              </p>
            </div>
          </div>

          {/* Center Column: Futuristic White 3D Robot Figure */}
          <div className="lg:col-span-4 relative flex items-center justify-center my-4 lg:my-0">
            <div className="relative w-full max-w-[420px] aspect-[4/5] sm:aspect-[3/4] flex items-center justify-center">
              {/* Radial gradient background behind robot */}
              <div className="absolute inset-0 bg-radial from-[#142318]/60 via-transparent to-transparent rounded-full blur-2xl" />
              
              {/* The Robot Image */}
              <img
                src="/assets/cyber_robot_hero.jpg"
                alt="Cyber Police AI Guardian Robot"
                className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                referrerPolicy="no-referrer"
              />

              {/* Bottom vignette overlay to blend into background */}
              <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#060B08] via-[#060B08]/80 to-transparent z-20 pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Floating Cyber HUD Telemetry Cards */}
          <div className="lg:col-span-3 z-10 flex flex-col justify-center space-y-6 lg:pl-2">
            
            {/* HUD Card 1: Up to [60%] More Security */}
            <div className="relative bg-[#09110B]/85 border border-white/15 p-5 rounded-lg backdrop-blur-md shadow-2xl group hover:border-[#D4FF00]/50 transition-colors">
              {/* Corner Bracket Marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-white/40 group-hover:border-[#D4FF00] transition-colors" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-white/40 group-hover:border-[#D4FF00] transition-colors" />

              <span className="text-xs text-slate-400 font-sans tracking-wide block mb-1">
                Up to
              </span>
              
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">
                  [60%]
                </span>
                <span className="text-xs text-slate-400 font-sans">
                  More Security
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                Automated pre-intercept threat deflection before SMS disclosure or OTP compromise.
              </p>
            </div>

            {/* HUD Card 2: [200K] Simplify your financial life */}
            <div className="relative bg-[#09110B]/85 border border-white/15 p-5 rounded-lg backdrop-blur-md shadow-2xl group hover:border-[#D4FF00]/50 transition-colors">
              {/* Corner Bracket Marks */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-white/40 group-hover:border-[#D4FF00] transition-colors" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-white/40 group-hover:border-[#D4FF00] transition-colors" />

              <div className="mb-1">
                <span className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tighter">
                  [200K]
                </span>
              </div>

              <p className="text-xs text-slate-200 font-sans mb-3">
                Simplify your financial life.
              </p>

              {/* Award laurel badge */}
              <div className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <div className="w-7 h-7 rounded bg-amber-500/15 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-white block leading-tight">
                    The World's Best Cyber Safety Platform
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Futuremakers Innovation 2026
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Vector Triage Modules - Integrated smoothly below hero */}
        <div id="analyzer-workbench" className="mt-12 pt-8 border-t border-[#142318]">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4FF00]">
              <Cpu className="w-3.5 h-3.5" />
              <span className="tracking-wider uppercase">SELECT TRIAGE VECTOR // VOLATILE SECURE MEMORY</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>ZERO-RETENTION CHARTER ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isCurrent = activeTab === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setActiveTab(action.id)}
                  className={`group text-left p-4 rounded-lg transition-all border relative flex flex-col justify-between ${
                    isCurrent
                      ? 'bg-[#0E1A11] border-[#D4FF00] shadow-[0_0_25px_rgba(212,255,0,0.15)] ring-1 ring-[#D4FF00]'
                      : 'bg-[#08100B]/90 hover:bg-[#0C170F] border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Bracket ticks on active */}
                  {isCurrent && (
                    <>
                      <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t border-l border-[#D4FF00]" />
                      <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b border-r border-[#D4FF00]" />
                    </>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`font-mono text-xs font-bold tracking-wider ${
                        isCurrent ? 'text-[#D4FF00]' : 'text-slate-400'
                      }`}>
                        {action.indexTag}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-slate-400 border border-white/10">
                        {action.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`w-7 h-7 rounded flex items-center justify-center border ${
                        isCurrent
                          ? 'bg-[#D4FF00]/15 border-[#D4FF00] text-[#D4FF00]'
                          : 'bg-white/5 border-white/10 text-slate-300 group-hover:text-white'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-semibold text-sm text-white font-sans">
                        {language === 'Bangla' ? action.titleBn : action.title}
                      </h3>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {action.desc}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono">
                    <span className={isCurrent ? 'text-[#D4FF00] font-bold' : 'text-slate-500'}>
                      {isCurrent ? 'INITIALIZED' : 'ACTIVATE'}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${
                      isCurrent ? 'text-[#D4FF00]' : 'text-slate-500 group-hover:text-white'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
