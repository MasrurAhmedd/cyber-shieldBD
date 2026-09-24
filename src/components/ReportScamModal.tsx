/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Send, ShieldAlert, Lock, CheckCircle2 } from 'lucide-react';

interface ReportScamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReportSubmitted?: () => void;
}

export const ReportScamModal: React.FC<ReportScamModalProps> = ({
  isOpen,
  onClose,
  onReportSubmitted,
}) => {
  const [category, setCategory] = useState('MFS OTP Scam');
  const [channel, setChannel] = useState<'SMS' | 'WhatsApp' | 'Facebook' | 'Phone Call' | 'Telegram' | 'Other'>('SMS');
  const [city, setCity] = useState('Dhaka');
  const [senderIndicator, setSenderIndicator] = useState('');
  const [snippet, setSnippet] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          channel,
          city,
          sender_indicator: senderIndicator,
          snippet,
        })
      });

      const data = await res.json();
      setSuccessMsg(data.message || 'Anonymous report received. Thank you for protecting the community!');
      setTimeout(() => {
        setSuccessMsg(null);
        if (onReportSubmitted) onReportSubmitted();
        onClose();
      }, 2200);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
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
          <div className="w-9 h-9 rounded-lg bg-rose-950 border border-rose-800/60 text-rose-400 flex items-center justify-center font-bold">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-mono font-bold text-white">
              DISPATCH ANONYMOUS INCIDENT REPORT
            </h3>
            <p className="text-[11px] font-mono text-slate-400">
              Contribute threat telemetry signals to Bangladesh National Scam Radar
            </p>
          </div>
        </div>

        {successMsg ? (
          <div className="py-8 text-center space-y-3 font-mono">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto animate-pulse" />
            <p className="text-xs font-bold text-emerald-300">{successMsg}</p>
            <p className="text-[10px] text-slate-400">
              Aggregated cluster weights refreshed on national radar stream.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs font-mono">
            {/* Category */}
            <div>
              <label className="text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                INCIDENT CLUSTER VECTOR:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 rounded bg-[#070B14] border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
              >
                <option value="MFS OTP Scam">bKash / Nagad / Rocket OTP & PIN Extortion</option>
                <option value="Fake Courier Fee">Paperfly/Steadfast ৳50 Delivery Verification Trap</option>
                <option value="Telegram Job Scam">Telegram/WhatsApp "Like YouTube Video" Task Scam</option>
                <option value="Government Aid Phishing">Govt. Laptop / Education Relief Subsidy Phishing</option>
                <option value="Family Emergency Scam">Hospital Emergency / Arrest Ransom Impersonation</option>
                <option value="Banking Phishing Link">Bank Account KYC De-activation & Spoofed Portal</option>
              </select>
            </div>

            {/* Channel & City */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 text-[10px] uppercase tracking-wider block mb-1">INGRESS CHANNEL:</label>
                <select
                  value={channel}
                  onChange={(e) => setChannel(e.target.value as any)}
                  className="w-full p-2 rounded bg-[#070B14] border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                >
                  <option value="SMS">SMS Gateway</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Facebook">FB Messenger</option>
                  <option value="Phone Call">PSTN / Cellular Call</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Other">Other Media</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 text-[10px] uppercase tracking-wider block mb-1">COARSE DISTRICT:</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2 rounded bg-[#070B14] border border-slate-700 text-white text-xs focus:border-emerald-500 focus:outline-none font-mono"
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chattogram">Chattogram</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>
            </div>

            {/* Sender Indicator */}
            <div>
              <label className="text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                ORIGIN IDENTIFIER / SENDER MASK (E.G. 018... OR SHORTCODE):
              </label>
              <input
                type="text"
                value={senderIndicator}
                onChange={(e) => setSenderIndicator(e.target.value)}
                placeholder="018******** or GP-OFFER"
                className="w-full p-2 rounded bg-[#070B14] border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Snippet */}
            <div>
              <label className="text-slate-400 text-[10px] uppercase tracking-wider block mb-1">
                SANITIZED DECEPTION PHRASE OR URL:
              </label>
              <textarea
                value={snippet}
                onChange={(e) => setSnippet(e.target.value)}
                rows={2}
                placeholder="e.g. 'Pay 50 taka delivery fee at http://bkash-verification-pay.xyz'"
                className="w-full p-2 rounded bg-[#070B14] border border-slate-700 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
              />
            </div>

            {/* Privacy Promise */}
            <div className="bg-[#070B14] p-2.5 rounded-lg border border-slate-800 text-[10px] text-slate-400 flex items-start gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span>
                Zero Personal Traceability: MSISDNs and raw tokens are auto-sanitized through entropy hashing before storage. IP addresses are completely dropped.
              </span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono font-bold text-xs transition flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              {submitting ? 'COMMITTING TO RADAR...' : 'BROADCAST ANONYMOUS INCIDENT'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
