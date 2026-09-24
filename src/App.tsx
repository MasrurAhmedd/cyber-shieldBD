/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  Phone, 
  Lock, 
  Globe, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Layers,
  Heart
} from 'lucide-react';
import { Language, DemoScenario } from './types';
import { Navbar } from './components/Navbar';
import { DemoBar } from './components/DemoBar';
import { HeroBanner } from './components/HeroBanner';
import { MessageAnalyzer } from './components/MessageAnalyzer';
import { ScreenshotAnalyzer } from './components/ScreenshotAnalyzer';
import { UrlAnalyzer } from './components/UrlAnalyzer';
import { ConversationAnalyzer } from './components/ConversationAnalyzer';
import { ScamRadar } from './components/ScamRadar';
import { Dashboard } from './components/Dashboard';
import { PrivacyCenter } from './components/PrivacyCenter';
import { ElderModeView } from './components/ElderModeView';
import { ReportScamModal } from './components/ReportScamModal';
import { TrustedContactModal } from './components/TrustedContactModal';
import { GrameenphoneScaleModal } from './components/GrameenphoneScaleModal';
import { LiveDemoModal } from './components/LiveDemoModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('message');
  const [language, setLanguage] = useState<Language>('English');
  const [elderMode, setElderMode] = useState<boolean>(false);
  const [presetScenario, setPresetScenario] = useState<DemoScenario | null>(null);

  // Modals
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isTrustedContactModalOpen, setIsTrustedContactModalOpen] = useState(false);
  const [isGpModalOpen, setIsGpModalOpen] = useState(false);
  const [isLiveDemoModalOpen, setIsLiveDemoModalOpen] = useState(false);

  const handleSelectScenario = (scenario: DemoScenario) => {
    setPresetScenario(scenario);
    if (scenario.type === 'message') {
      setActiveTab('message');
    } else if (scenario.type === 'url') {
      setActiveTab('url');
    } else if (scenario.type === 'conversation') {
      setActiveTab('conversation');
    } else {
      setActiveTab('message');
    }
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col font-sans selection:bg-emerald-950 selection:text-emerald-300">
      {/* Top Demo Bar for Competition Judges */}
      <DemoBar 
        onSelectScenario={handleSelectScenario}
        activeTab={activeTab}
      />

      {/* Primary Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        elderMode={elderMode}
        setElderMode={setElderMode}
        onOpenGpModal={() => setIsGpModalOpen(true)}
        onOpenLiveDemo={() => setIsLiveDemoModalOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1">
        {elderMode ? (
          <div className="py-8 px-4 sm:px-6">
            <ElderModeView 
              onExitElderMode={() => setElderMode(false)}
              onOpenTrustedContact={() => setIsTrustedContactModalOpen(true)}
            />
          </div>
        ) : (
          <>
            {/* Hero Launch Area with 4 Quick Actions */}
            <HeroBanner
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              language={language}
              onOpenReportModal={() => setIsReportModalOpen(true)}
            />

            {/* Active Content Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {activeTab === 'message' && (
                <MessageAnalyzer
                  language={language}
                  onOpenTrustedContact={() => setIsTrustedContactModalOpen(true)}
                  presetScenario={presetScenario}
                  onClearPreset={() => setPresetScenario(null)}
                />
              )}

              {activeTab === 'screenshot' && (
                <ScreenshotAnalyzer
                  language={language}
                  onOpenTrustedContact={() => setIsTrustedContactModalOpen(true)}
                />
              )}

              {activeTab === 'url' && (
                <UrlAnalyzer
                  language={language}
                  onOpenTrustedContact={() => setIsTrustedContactModalOpen(true)}
                  presetScenario={presetScenario}
                  onClearPreset={() => setPresetScenario(null)}
                />
              )}

              {activeTab === 'conversation' && (
                <ConversationAnalyzer
                  language={language}
                  onOpenTrustedContact={() => setIsTrustedContactModalOpen(true)}
                  presetScenario={presetScenario}
                  onClearPreset={() => setPresetScenario(null)}
                />
              )}

              {activeTab === 'radar' && (
                <ScamRadar
                  language={language}
                  onOpenReportModal={() => setIsReportModalOpen(true)}
                />
              )}

              {activeTab === 'dashboard' && (
                <Dashboard
                  language={language}
                  onNavigateToTab={(tab) => setActiveTab(tab)}
                />
              )}

              {activeTab === 'privacy' && (
                <PrivacyCenter
                  language={language}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#070B14] text-slate-400 border-t border-slate-800 text-xs py-8 px-4 sm:px-6 lg:px-8 mt-12 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded bg-emerald-600 flex items-center justify-center text-white font-mono font-bold text-xs">
                  🛡️
                </div>
                <span className="font-mono font-bold text-white text-sm tracking-wide">
                  SHIELD BD (শিল্ড বিডি) • CYBER COMMAND
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                  FUTUREMAKERS 2026
                </span>
              </div>
              <p className="text-slate-400 mt-2 max-w-xl text-[11px] leading-relaxed font-sans">
                Bangladesh's First AI-Powered Digital Safety Guardian. Protecting citizens from financial impersonation, deceptive OTP extortion, and social engineering across Bangla, Banglish, and English dialects.
              </p>
            </div>

            {/* Official Bangladesh Emergency Helplines */}
            <div className="bg-[#0D1424] p-3 rounded-lg border border-slate-800 space-y-1 self-stretch md:self-auto">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                NATIONAL CYBER EMERGENCY DISPATCH:
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] font-mono text-slate-300">
                <span>• BTRC HOTLINE: <strong className="text-white">100</strong></span>
                <span>• EMERGENCY: <strong className="text-white">999</strong></span>
                <span>• CYBER CID: <strong className="text-white">01769-691522</strong></span>
                <span>• bKash CARE: <strong className="text-white">16247</strong></span>
                <span>• Nagad CARE: <strong className="text-white">16167</strong></span>
                <span>• Rocket CARE: <strong className="text-white">16216</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>ZERO-RETENTION CHARTER: Inspected texts & visual buffers process purely in volatile memory.</span>
            </div>

            <div className="flex items-center gap-4 font-mono">
              <button 
                onClick={() => setIsGpModalOpen(true)}
                className="hover:text-emerald-400 transition"
              >
                TELECOM ARCHITECTURE
              </button>
              <button 
                onClick={() => setActiveTab('privacy')}
                className="hover:text-emerald-400 transition"
              >
                PRIVACY SPEC
              </button>
              <button 
                onClick={() => setIsLiveDemoModalOpen(true)}
                className="text-amber-400 hover:text-amber-300 transition font-bold"
              >
                JUDGES WALKTHROUGH
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <ReportScamModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReportSubmitted={() => {
          // If on radar, refresh
        }}
      />

      <TrustedContactModal
        isOpen={isTrustedContactModalOpen}
        onClose={() => setIsTrustedContactModalOpen(false)}
      />

      <GrameenphoneScaleModal
        isOpen={isGpModalOpen}
        onClose={() => setIsGpModalOpen(false)}
      />

      <LiveDemoModal
        isOpen={isLiveDemoModalOpen}
        onClose={() => setIsLiveDemoModalOpen(false)}
        onSelectScenario={handleSelectScenario}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
