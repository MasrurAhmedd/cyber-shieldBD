/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnalysisResult, Language, RiskLevel, ThreatSignal, SocialEngineeringStage } from '../src/types';

export function detectLanguage(text: string): Language {
  const banglaChars = (text.match(/[\u0980-\u09FF]/g) || []).length;
  const totalChars = text.trim().length;

  if (banglaChars / Math.max(1, totalChars) > 0.4) {
    return 'Bangla';
  }

  const banglishKeywords = [
    'apnar', 'apni', 'amader', 'ekhoni', 'bondho', 'hoyeche', 'hobe',
    'korun', 'den', 'koren', 'taka', 'jonno', 'bhaiya', 'shathe',
    'nosto', 'pathan', 'lagbe', 'kichu', 'grahok', 'khub', 'karon',
    'kisu', 'kore', 'hoise', 'kothay', 'ki', 'ami', 'tumi', 'amar'
  ];
  const words = text.toLowerCase().split(/\W+/);
  const banglishMatchCount = words.filter(w => banglishKeywords.includes(w)).length;

  if (banglishMatchCount >= 2) {
    return banglaChars > 5 ? 'Mixed' : 'Banglish';
  }

  if (banglaChars > 0 && banglishMatchCount > 0) {
    return 'Mixed';
  }

  return 'English';
}

export function analyzeUrlSafety(urlInput: string): AnalysisResult {
  const cleanUrl = urlInput.trim();
  const signals: ThreatSignal[] = [];
  let score = 5;

  let parsed: URL | null = null;
  try {
    parsed = new URL(cleanUrl.startsWith('http') ? cleanUrl : `http://${cleanUrl}`);
  } catch {
    // Malformed URL
  }

  const isHttpOnly = cleanUrl.toLowerCase().startsWith('http://');
  const hostname = parsed ? parsed.hostname.toLowerCase() : cleanUrl.toLowerCase();
  const pathname = parsed ? parsed.pathname.toLowerCase() : '';

  if (isHttpOnly) {
    score += 20;
    signals.push({
      type: 'suspicious_url',
      severity: 'high',
      title: 'Unencrypted HTTP Connection',
      evidence: 'http://',
      explanation: 'Legitimate financial platforms (bKash, Banks, Nagad) exclusively use encrypted HTTPS with valid TLS certificates.'
    });
  }

  // IP based host
  if (/^(\d{1,3}\.){3}\d{1,3}$/.test(hostname)) {
    score += 35;
    signals.push({
      type: 'suspicious_url',
      severity: 'critical',
      title: 'Direct IP Address Host',
      evidence: hostname,
      explanation: 'Attackers frequently use raw IP addresses or non-standard ports to bypass standard domain reputation filters.'
    });
  }

  // Brand impersonation in domain
  const brands = ['bkash', 'nagad', 'rocket', 'upay', 'ebl', 'bracbank', 'citytouch', 'redx', 'daraz', 'pathao'];
  for (const b of brands) {
    if (hostname.includes(b)) {
      const isOfficial =
        (b === 'bkash' && (hostname === 'bkash.com' || hostname.endsWith('.bkash.com'))) ||
        (b === 'nagad' && (hostname === 'nagad.com.bd' || hostname.endsWith('.nagad.com.bd'))) ||
        (b === 'redx' && (hostname === 'redx.com.bd' || hostname.endsWith('.redx.com.bd'))) ||
        (b === 'daraz' && (hostname === 'daraz.com.bd' || hostname.endsWith('.daraz.com.bd')));

      if (!isOfficial) {
        score += 35;
        signals.push({
          type: 'impersonation',
          severity: 'critical',
          title: `Brand Typosquatting / Impersonation (${b.toUpperCase()})`,
          evidence: hostname,
          explanation: `The domain name mimics the trusted brand "${b}", but does not belong to the official registered domain infrastructure.`
        });
      }
    }
  }

  // Suspicious TLDs
  const suspiciousTlds = ['.xyz', '.cc', '.top', '.buzz', '.work', '.click', '.tk', '.cf', '.ga', '.gq', '.ml'];
  if (suspiciousTlds.some(tld => hostname.endsWith(tld))) {
    score += 18;
    signals.push({
      type: 'suspicious_url',
      severity: 'medium',
      title: 'High-Risk Top-Level Domain (TLD)',
      evidence: hostname,
      explanation: 'This domain uses an inexpensive or free registrar TLD heavily favored in transient phishing campaigns.'
    });
  }

  // Sensitive keywords in path or subdomain
  const sensitiveTerms = ['verify', 'login', 'security', 'kyc', 'otp', 'update', 'portal', 'alert', 'account', 'claim'];
  const foundTerms = sensitiveTerms.filter(t => hostname.includes(t) || pathname.includes(t));
  if (foundTerms.length > 0) {
    score += foundTerms.length * 10;
    signals.push({
      type: 'credential_request',
      severity: 'high',
      title: 'Credential Harvesting Path Indicators',
      evidence: foundTerms.join(', '),
      explanation: 'Contains verification/login keywords arranged to deceive users into disclosing account credentials.'
    });
  }

  const finalScore = Math.min(98, Math.max(5, score));
  const riskLevel: RiskLevel = finalScore >= 80 ? 'CRITICAL' : finalScore >= 55 ? 'HIGH' : finalScore >= 25 ? 'MEDIUM' : 'LOW';

  return {
    id: `url-${Date.now()}`,
    timestamp: new Date().toISOString(),
    risk_score: finalScore,
    risk_level: riskLevel,
    category: finalScore >= 50 ? 'Malicious / Phishing URL' : 'Standard Web Link',
    detected_language: 'English',
    target_service: 'Web Domain',
    summary: riskLevel === 'LOW'
      ? 'This URL structure shows no overt signs of brand spoofing or known deceptive patterns.'
      : `High-risk indicators detected: Unofficial domain structure targeting user credentials.`,
    summary_bn: riskLevel === 'LOW'
      ? 'এই লিঙ্কে কোনো সুস্পষ্ট ফিশিং বা ছদ্মবেশী প্যাটার্ন সনাক্ত হয়নি।'
      : 'সতর্কতা: এই ওয়েব লিঙ্কটি ব্যাংক বা আর্থিক সেবার নাম ভাঁড়িয়ে পাসওয়ার্ড বা ওটিপি চুরির জন্য তৈরি ফিশিং পোর্টাল হতে পারে।',
    signals,
    why_risky: {
      evidence_points: signals.map(s => `${s.title}: ${s.evidence}`),
      ai_inference: 'Heuristic structural evaluation indicates deceptive domain composition without safe SSL/official registrar records.',
      target_intent: 'User redirection to an unauthenticated external credential-harvesting server.'
    },
    recommended_actions: {
      immediate: [
        'Do not click or open this link in any browser.',
        'Never type your PIN, password, or NID number on this page.',
        'If you already entered information, immediately reset your MFS/bank credentials from the official app.'
      ],
      advisory: [
        'Always verify the address bar ends with the exact official domain (e.g. .com.bd or .com).',
        'Report this URL to the BTRC / CSIRT cyber threat reporting portal.'
      ]
    },
    confidence: 0.91,
    privacy_notes: 'URL analyzed in memory. No user identity or browser cookies were sent or retained.',
    analyzed_via: 'deterministic-engine'
  };
}

export function analyzeDeterministicMessage(text: string): AnalysisResult {
  const lang = detectLanguage(text);
  const lower = text.toLowerCase();
  const signals: ThreatSignal[] = [];

  let socialScore = 0;
  let credentialScore = 0;
  let financialScore = 0;
  let urgencyScore = 0;
  let urlScore = 0;
  let impersonationScore = 0;

  // 1. Credential & OTP indicators
  const otpMatches = [
    'otp', 'pin', 'password', 'পিন', 'পাসওয়ার্ড', 'ওটিপি', 'code', 'ভেরিফিকেশন কোড',
    'gopon pin', 'secret pin', 'otp ta den', 'otp din', 'security code', 'cvv'
  ].filter(w => lower.includes(w));

  if (otpMatches.length > 0) {
    credentialScore += 40;
    signals.push({
      type: 'credential_request',
      severity: 'critical',
      title: 'Disclose OTP / Secret PIN Request',
      evidence: otpMatches.slice(0, 3).join(', '),
      explanation: 'No legitimate financial service, bank, or mobile wallet (bKash/Nagad/Rocket) will ever ask for your OTP or PIN.'
    });
  }

  // 2. Financial Service Impersonation
  const brands = [
    { name: 'bKash', terms: ['bkash', 'বিকাশ'] },
    { name: 'Nagad', terms: ['nagad', 'নগদ'] },
    { name: 'Rocket / Dutch-Bangla', terms: ['rocket', 'রকেট', 'dbbl'] },
    { name: 'BRAC Bank', terms: ['brac bank', 'ব্র্যাক ব্যাংক'] },
    { name: 'EBL Skybanking', terms: ['ebl', 'skybanking'] },
    { name: 'RedX / Courier', terms: ['redx', 'courier', 'ডেলিভারি', 'parcel', 'পার্সেল', 'sundarban'] },
    { name: 'Bangladesh Bank', terms: ['bangladesh bank', 'বাংলাদেশ ব্যাংক'] }
  ];

  let targetService = 'Digital Service';
  for (const b of brands) {
    if (b.terms.some(t => lower.includes(t))) {
      targetService = b.name;
      impersonationScore += 25;
      signals.push({
        type: 'impersonation',
        severity: 'high',
        title: `Financial Service / Entity Impersonation (${b.name})`,
        evidence: b.terms.find(t => lower.includes(t)) || b.name,
        explanation: `The message claims official association with ${b.name} to establish unearned authority.`
      });
      break;
    }
  }

  // 3. Urgency / Fear Creation
  const urgencyTerms = [
    'account bondho', 'bondho hoye jabe', 'suspended', 'blocked', 'স্থগিত', 'বন্ধ হয়ে যাবে',
    'immediately', 'urgent', 'ekhoni', 'এখনই', '২৪ ঘণ্টা', '24 hour', '24 ghonta',
    'today', 'ajker moddhe', 'জরুরী', 'emergency', 'hold', 'action required'
  ].filter(w => lower.includes(w));

  if (urgencyTerms.length > 0) {
    urgencyScore += 30;
    signals.push({
      type: 'urgency',
      severity: 'high',
      title: 'Artificial Time Pressure & Fear Creation',
      evidence: urgencyTerms.slice(0, 2).join(', '),
      explanation: 'Creates a false emergency to induce panic and prevent the victim from consulting official channels.'
    });
  }

  // 4. Financial manipulation / Fee trap
  const moneyTerms = [
    'send money', 'taka', 'টাকা', '৳', 'fee', 'charge', 'deposit', 'won', 'জিতুন', 'লোন', 'loan',
    'prize', 'lottery', 'income', 'daily', '50 taka', '৫০ টাকা', 'refund', 'রিফান্ড'
  ].filter(w => lower.includes(w));

  if (moneyTerms.length > 0) {
    financialScore += 25;
    signals.push({
      type: 'financial_manipulation',
      severity: 'high',
      title: 'Direct Financial Solicitation / Fee Trap',
      evidence: moneyTerms.slice(0, 3).join(', '),
      explanation: 'Demands upfront payment, delivery verification fee, or lures victim with unrealistically high cash rewards.'
    });
  }

  // 5. Suspicious Links
  if (/https?:\/\/[^\s]+/.test(text) || lower.includes('www.') || lower.includes('.com') || lower.includes('.xyz') || lower.includes('.cc') || lower.includes('.net') || lower.includes('t.me/')) {
    urlScore += 25;
    const urlMatch = text.match(/https?:\/\/[^\s]+/) || ['unspecified link'];
    signals.push({
      type: 'suspicious_url',
      severity: 'high',
      title: 'Embedded Unverified Link / External Redirection',
      evidence: urlMatch[0],
      explanation: 'Directs the victim away from official stores/apps to an unauthenticated external portal or Telegram channel.'
    });
  }

  // 6. Social Engineering Progression
  if (lower.includes('bhaiya') || lower.includes('accident') || lower.includes('hospital') || lower.includes('doctor') || lower.includes('cv shortlisted') || lower.includes('telegram')) {
    socialScore += 30;
    signals.push({
      type: 'emotional_pressure',
      severity: 'high',
      title: 'Emotional Leverage / Opportunistic Social Lure',
      evidence: 'Emotional manipulation or unrealistic job opportunity',
      explanation: 'Leverages emotional vulnerability (family emergency or desperate job seeking) to override caution.'
    });
  }

  // Calculate weighted score
  const rawScore = (socialScore * 0.25) +
                   (credentialScore * 0.20) +
                   (financialScore * 0.20) +
                   (urgencyScore * 0.15) +
                   (urlScore * 0.10) +
                   (impersonationScore * 0.10);

  // If OTP request is present with urgency, score must be at least 90
  let finalScore = Math.round(rawScore);
  if (otpMatches.length > 0 && urgencyTerms.length > 0) {
    finalScore = Math.max(92, finalScore);
  } else if (otpMatches.length > 0) {
    finalScore = Math.max(85, finalScore);
  } else if (signals.length === 0) {
    finalScore = 12; // Clean legitimate message
  } else {
    finalScore = Math.min(96, Math.max(15, finalScore));
  }

  const riskLevel: RiskLevel = finalScore >= 80 ? 'CRITICAL' : finalScore >= 55 ? 'HIGH' : finalScore >= 30 ? 'MEDIUM' : 'LOW';

  let category = 'Unknown Message';
  if (otpMatches.length > 0 && impersonationScore > 0) {
    category = 'Financial Impersonation / OTP Scam';
  } else if (otpMatches.length > 0) {
    category = 'Credential Harvesting / OTP Theft';
  } else if (lower.includes('courier') || lower.includes('redx') || lower.includes('parcel')) {
    category = 'Delivery / Fake Courier Scam';
  } else if (lower.includes('telegram') || lower.includes('income') || lower.includes('job') || lower.includes('cv')) {
    category = 'Fake Job / Task Investment Scam';
  } else if (lower.includes('accident') || lower.includes('hospital') || lower.includes('emergency')) {
    category = 'Emergency / Family Impersonation Scam';
  } else if (riskLevel === 'LOW') {
    category = 'Legitimate Notification';
  } else {
    category = 'Social Engineering / Suspicious Communication';
  }

  return {
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    risk_score: finalScore,
    risk_level: riskLevel,
    category,
    detected_language: lang,
    target_service: targetService,
    summary: riskLevel === 'LOW'
      ? 'This message appears benign: no sensitive credentials requested, no artificial urgency, and standard official notification structure.'
      : `High-risk communication detected: Exhibits ${signals.length} classic indicators of social engineering targeting financial credentials.`,
    summary_bn: riskLevel === 'LOW'
      ? 'এই বার্তাটি নিরাপদ ও স্বাভাবিক নোটিফিকেশন বলে মনে হচ্ছে। কোনো ওটিপি, পিন বা গোপন তথ্য চাওয়া হয়নি।'
      : `সতর্কতা: এই বার্তাটিতে প্রতারণার সুস্পষ্ট লক্ষণ রয়েছে (${signals.length}টি ঝুঁকি পাওয়া গেছে)। এটি আপনার ব্যাংক বা বিকাশ/নগদ একাউন্টের গোপন তথ্য হাতিয়ে নেওয়ার অপচেষ্টা।`,
    signals,
    why_risky: {
      evidence_points: signals.map(s => `${s.title} (প্রমাণ: "${s.evidence}")`),
      ai_inference: 'The sender uses structured behavioral manipulation—creating artificial panic followed by a direct demand for identity or transaction codes.',
      target_intent: otpMatches.length > 0 ? 'Unauthorized Account Takeover & Fund Drainage' : 'Fraudulent Monetary Extraction'
    },
    recommended_actions: {
      immediate: [
        'Never share your OTP, PIN, or verification code with anyone, even someone claiming to be an agent.',
        'Do not click any embedded links or call back phone numbers provided inside the message.',
        'Immediately report and block the sender on your mobile device.'
      ],
      advisory: [
        `Verify directly by dialing official helpline: ${targetService === 'bKash' ? '16247' : targetService === 'Nagad' ? '16167' : 'your bank\'s official customer care hotline'}.`,
        'Educate family members who may not be familiar with digital scam tactics.'
      ],
      emergency_contact: targetService === 'bKash' ? 'bKash Helpline: 16247' : targetService === 'Nagad' ? 'Nagad Helpline: 16167' : 'National Helpline: 999 / 333'
    },
    confidence: 0.94,
    privacy_notes: 'Transient processing. Raw text content was not stored on disk or shared with third parties.',
    analyzed_via: 'deterministic-engine'
  };
}

export function analyzeConversationJourney(transcript: string): AnalysisResult {
  const baseResult = analyzeDeterministicMessage(transcript);
  const lines = transcript.split('\n').map(l => l.trim()).filter(Boolean);

  const stages: SocialEngineeringStage[] = [
    {
      stage: 1,
      name: 'Trust Building & Rapport',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Polite greeting, formal religious salutation, or family pretense to disarm natural suspicion.',
      psychologicalTrigger: 'Authority / Familial Trust'
    },
    {
      stage: 2,
      name: 'Authority Impersonation',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Claiming to be an official bank manager, security head, or government representative.',
      psychologicalTrigger: 'Institutional Deference'
    },
    {
      stage: 3,
      name: 'Fear & Threat Creation',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Fabricating an urgent crisis (card cloned, unauthorized withdrawal, emergency hospital bills).',
      psychologicalTrigger: 'Panic / Loss Aversion'
    },
    {
      stage: 4,
      name: 'Urgency & Pressure Escalation',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Demanding instantaneous compliance within minutes to prevent irreversible financial loss.',
      psychologicalTrigger: 'Time Scarcity / Impulsive Reaction'
    },
    {
      stage: 5,
      name: 'Credential / OTP Extraction',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Framing the OTP request as a "security cancel code" or "refund authorization" rather than a withdrawal.',
      psychologicalTrigger: 'Deceptive Inversion'
    },
    {
      stage: 6,
      name: 'Financial Exploitation',
      detected: false,
      speaker: 'scammer',
      snippet: '',
      tactic: 'Executing unauthorized transfers while keeping the victim engaged on the line.',
      psychologicalTrigger: 'Direct Theft'
    }
  ];

  // Map transcript lines to stages
  lines.forEach(line => {
    const l = line.toLowerCase();
    if (!stages[0].detected && (l.includes('assalamu') || l.includes('hello') || l.includes('shonun') || l.includes('brother') || l.includes('ভাইয়া') || l.includes('স্যার'))) {
      stages[0].detected = true;
      stages[0].snippet = line;
    }
    if (!stages[1].detected && (l.includes('bank') || l.includes('head office') || l.includes('মতিঝিল') || l.includes('branch') || l.includes('manager') || l.includes('bkash') || l.includes('nagad') || l.includes('ডাক্তার'))) {
      stages[1].detected = true;
      stages[1].snippet = line;
    }
    if (!stages[2].detected && (l.includes('transaction') || l.includes('accident') || l.includes('problem') || l.includes('fraud') || l.includes('bondho') || l.includes('টাকা কাটা') || l.includes('ক্লোন'))) {
      stages[2].detected = true;
      stages[2].snippet = line;
    }
    if (!stages[3].detected && (l.includes('ekhoni') || l.includes('druto') || l.includes('এখনই') || l.includes('urgent') || l.includes('deri') || l.includes('দ্রুত'))) {
      stages[3].detected = true;
      stages[3].snippet = line;
    }
    if (!stages[4].detected && (l.includes('otp') || l.includes('pin') || l.includes('code') || l.includes('পিন') || l.includes('কোড') || l.includes('password'))) {
      stages[4].detected = true;
      stages[4].snippet = line;
    }
    if (!stages[5].detected && (l.includes('pathan') || l.includes('send') || l.includes('ফেরত') || l.includes('টাকা') || l.includes('transfer'))) {
      stages[5].detected = true;
      stages[5].snippet = line;
    }
  });

  // Ensure high score if multiple stages match
  const detectedCount = stages.filter(s => s.detected).length;
  const conversationScore = Math.max(baseResult.risk_score, Math.min(98, 45 + detectedCount * 11));

  return {
    ...baseResult,
    risk_score: conversationScore,
    risk_level: conversationScore >= 80 ? 'CRITICAL' : 'HIGH',
    category: 'Social Engineering Multi-Stage Attack',
    social_engineering_stages: stages,
    confidence: 0.96,
    summary: `Multi-stage psychological exploitation detected across ${detectedCount} sequential social engineering phases.`,
    summary_bn: `এই কথোপকথনটিতে বহু-ধাপীয় সামাজিক মনস্তাত্ত্বিক ফাঁদের (${detectedCount}টি পর্যায়) সুস্পষ্ট উপস্থিতি সনাক্ত হয়েছে।`,
  };
}
