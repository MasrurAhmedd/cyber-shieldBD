/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneOff, 
  UserCheck, 
  ArrowLeft, 
  Send, 
  AlertOctagon, 
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { AnalysisResult } from '../types';

interface ElderModeViewProps {
  onExitElderMode: () => void;
  onOpenTrustedContact: () => void;
}

export const ElderModeView: React.FC<ElderModeViewProps> = ({
  onExitElderMode,
  onOpenTrustedContact,
}) => {
  const [elderInput, setElderInput] = useState('আপনার একাউন্ট বন্ধ হয়ে যাবে। ওটিপি দিন।');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>({
    id: 'elder-demo',
    timestamp: new Date().toISOString(),
    risk_score: 96,
    risk_level: 'CRITICAL',
    category: 'ওটিপি চুরি ও একাউন্ট হ্যাকিং',
    detected_language: 'Bangla',
    summary: 'বিপদ হতে পারে! এই মেসেজে আপনার গোপন পিন বা ওটিপি চাওয়া হয়েছে।',
    summary_bn: 'বিপদ হতে পারে! এই মেসেজে আপনার গোপন পিন বা ওটিপি চাওয়া হয়েছে।',
    signals: [],
    why_risky: {
      evidence_points: ['ওটিপি চাওয়া হয়েছে', 'একাউন্ট বন্ধের ভয় দেখানো হয়েছে'],
      ai_inference: 'প্রতারক আপনার বিকাশ/ব্যাংক একাউন্ট খালি করার চেষ্টা করছে।',
      target_intent: 'টাকা চুরি'
    },
    recommended_actions: {
      immediate: ['কাউকে ওটিপি দেবেন না', 'মেসেজটি মুছে ফেলুন বা ব্লক করুন'],
      advisory: ['পরিবারের ছোটদের বা ব্যাংককে জানান']
    },
    confidence: 0.98,
    privacy_notes: 'মেমোরিতে সংরক্ষিত নেই',
    analyzed_via: 'deterministic-engine'
  });

  const handleElderAnalyze = async () => {
    if (!elderInput.trim()) return;
    setAnalyzing(true);
    try {
      const res = await fetch('/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: elderInput, language: 'Bangla' })
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  const isDanger = result && (result.risk_level === 'CRITICAL' || result.risk_level === 'HIGH');

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner for Senior Accessibility */}
      <div className="flex items-center justify-between bg-amber-100 border-2 border-amber-300 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-lg">
            👴
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-amber-950">
              সহজ মোড (Elder Mode) • বড় লেখা ও স্পষ্ট নির্দেশিকা
            </h2>
            <p className="text-xs text-amber-900 font-medium">
              অভিভাবক ও প্রবীণদের জন্য সহজ বাংলায় ডিজিটাল নিরাপত্তা সহায়তা
            </p>
          </div>
        </div>

        <button
          onClick={onExitElderMode}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-950 font-bold text-sm hover:bg-amber-50 transition shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          সাধারণ মোডে যান
        </button>
      </div>

      {/* Large Input Box */}
      <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 shadow-sm space-y-4">
        <label className="block text-base font-extrabold text-slate-900">
          আপনার মোবাইলে আসা মেসেজটি এখানে লিখুন বা পেস্ট করুন:
        </label>
        <textarea
          value={elderInput}
          onChange={(e) => setElderInput(e.target.value)}
          rows={3}
          className="w-full text-lg sm:text-xl font-bold p-4 rounded-2xl border-2 border-slate-300 focus:border-emerald-600 focus:outline-none bg-slate-50 text-slate-900"
          placeholder="মেসেজটি এখানে লিখুন..."
        />

        <button
          onClick={handleElderAnalyze}
          disabled={analyzing || !elderInput.trim()}
          className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-extrabold text-lg sm:text-xl shadow-md transition flex items-center justify-center gap-3"
        >
          {analyzing ? (
            <span>যাচাই করা হচ্ছে...</span>
          ) : (
            <>
              <Send className="w-6 h-6" />
              <span>নিরাপদ কি না পরীক্ষা করুন</span>
            </>
          )}
        </button>
      </div>

      {/* Very Clear, High-Contrast Result Card */}
      {result && (
        <div className={`p-6 sm:p-8 rounded-3xl border-4 ${
          isDanger ? 'bg-rose-50 border-rose-500' : 'bg-emerald-50 border-emerald-500'
        } shadow-md space-y-6 text-slate-900`}>
          <div className="flex items-center gap-3">
            {isDanger ? (
              <AlertOctagon className="w-12 h-12 text-rose-600 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-12 h-12 text-emerald-600 flex-shrink-0" />
            )}
            <div>
              <span className={`text-sm font-extrabold uppercase px-3 py-1 rounded-full ${
                isDanger ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
              }`}>
                {isDanger ? '🚨 মারাত্মক বিপদ হতে পারে!' : '✅ নিরাপদ মনে হচ্ছে'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black mt-2 leading-tight">
                {result.summary_bn || result.summary}
              </h3>
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 text-base sm:text-lg font-bold leading-relaxed space-y-2">
            <p className="text-rose-700">
              🔴 বিকাশ, নগদ বা কোনো ব্যাংক কখনো আপনার কাছে ওটিপি বা পিন চায় না।
            </p>
            <p className="text-slate-800">
              🔴 ফোনে কাউকে ওটিপি বা পিন দিলে আপনার একাউন্টের সব টাকা চলে যেতে পারে।
            </p>
          </div>

          {/* 3 Big Action Buttons */}
          <div className="space-y-3 pt-2">
            <span className="text-sm font-extrabold text-slate-700 block uppercase">
              এখন আপনার করণীয় (যেকোনো একটি চাপুন):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setElderInput('')}
                className="py-4 px-3 rounded-2xl bg-white hover:bg-slate-100 border-2 border-slate-300 font-extrabold text-base text-slate-800 shadow-sm transition flex flex-col items-center gap-1"
              >
                <ArrowLeft className="w-6 h-6 text-slate-600" />
                <span>[ ফিরে যান ]</span>
                <span className="text-[11px] font-normal text-slate-500">কিছু করবেন না</span>
              </button>

              <button
                onClick={() => alert('নম্বরটি আপনার মোবাইলে ব্লক তালিকায় যোগ করতে পারেন বা মেসেজটি ডিলিট করুন।')}
                className="py-4 px-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-base shadow-sm transition flex flex-col items-center gap-1"
              >
                <PhoneOff className="w-6 h-6 text-white" />
                <span>[ ব্লক করুন ]</span>
                <span className="text-[11px] font-normal text-rose-100">কথা বলবেন না</span>
              </button>

              <button
                onClick={onOpenTrustedContact}
                className="py-4 px-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-sm transition flex flex-col items-center gap-1"
              >
                <UserCheck className="w-6 h-6 text-white" />
                <span>[ পরিবারকে জানান ]</span>
                <span className="text-[11px] font-normal text-emerald-100">বিশ্বাসযোগ্য স্বজন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
