/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, PhoneCall, Lock, AlertTriangle, Check } from 'lucide-react';

interface TrustedContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrustedContactModal: React.FC<TrustedContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('Tanvir Ahmed (Son)');
  const [number, setNumber] = useState('+880 1711-234567');
  const [alertSent, setAlertSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateAlert = async () => {
    setSending(true);
    try {
      const res = await fetch('/api/trusted-contact/alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: name,
          contactNumber: number,
          riskCategory: 'bKash OTP Impersonation Attempt',
          riskScore: 94
        })
      });
      const data = await res.json();
      setResponseMsg(data.message);
      setAlertSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-[#0D1424] rounded-xl border border-slate-700 shadow-2xl max-w-lg w-full p-5 sm:p-6 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800/60 text-emerald-400 flex items-center justify-center font-bold">
            <UserCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-mono font-bold text-white">
              TRUSTED GUARDIAN RELAY
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Immediate threat escalation channel for vulnerable & elderly users
            </p>
          </div>
        </div>

        <div className="space-y-3.5 text-xs">
          <p className="text-slate-300 leading-relaxed font-mono text-[11px]">
            When an elderly parent or family member encounters a <strong className="text-rose-400">CRITICAL</strong> threat (OTP extortion, fraudulent debit traps), SHIELD BD transmits a verified emergency push notification to their designated guardian.
          </p>

          <div className="space-y-2.5 bg-[#070B14] p-3.5 rounded-lg border border-slate-800">
            <div>
              <label className="font-mono text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                DESIGNATED GUARDIAN NAME:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-[#0D1424] border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-mono text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                EMERGENCY MOBILE NUMBER:
              </label>
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="w-full p-2 rounded bg-[#0D1424] border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/60 text-emerald-300 flex items-start gap-2 text-[10px] font-mono">
            <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Cryptographic Zero-Knowledge:</strong> The alert only relays the threat classification and defensive countermeasure ("Do not transmit OTP"). Private personal messages are <strong>never</strong> transmitted over the relay.
            </span>
          </div>

          {alertSent && responseMsg && (
            <div className="p-3 bg-[#070B14] text-emerald-300 rounded-lg text-[10px] font-mono leading-relaxed border border-emerald-800/60">
              <span className="font-bold text-white block mb-0.5">✓ SIMULATED DISPATCH TELEMETRY:</span>
              {responseMsg}
            </div>
          )}

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-mono text-xs transition"
            >
              DISMISS
            </button>

            <button
              onClick={handleSimulateAlert}
              disabled={sending}
              className="flex-1 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs transition flex items-center justify-center gap-2"
            >
              {sending ? 'DISPATCHING RELAY...' : alertSent ? 'RELAY DISPATCHED (SIMULATED)' : 'TEST GUARDIAN ESCALATION'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
