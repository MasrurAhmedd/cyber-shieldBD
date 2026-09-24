/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type Language = 'Bangla' | 'English' | 'Banglish' | 'Mixed';

export interface ThreatSignal {
  type: 'urgency' | 'credential_request' | 'financial_manipulation' | 'impersonation' | 'suspicious_url' | 'emotional_pressure' | 'unknown_sender' | 'offer_too_good';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  evidence: string;
  explanation: string;
}

export interface SocialEngineeringStage {
  stage: number;
  name: string;
  detected: boolean;
  speaker: 'scammer' | 'user';
  snippet: string;
  tactic: string;
  psychologicalTrigger: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  risk_score: number; // 0 - 100
  risk_level: RiskLevel;
  category: string;
  detected_language: Language;
  target_service?: string; // e.g. "bKash", "Nagad", "Bank", "Courier", "Telegram"
  summary: string;
  summary_bn?: string;
  signals: ThreatSignal[];
  why_risky: {
    evidence_points: string[];
    ai_inference: string;
    target_intent: string;
  };
  recommended_actions: {
    immediate: string[];
    advisory: string[];
    emergency_contact?: string;
  };
  confidence: number; // 0 - 1
  social_engineering_stages?: SocialEngineeringStage[];
  privacy_notes: string;
  analyzed_via: 'gemini-ai' | 'deterministic-engine';
}

export interface ScamCampaign {
  id: string;
  title: string;
  title_bn: string;
  category: string;
  risk_level: RiskLevel;
  reports_count: number;
  trend: string; // e.g. "+38% this week"
  locations: string[]; // e.g. ["Dhaka", "Chattogram", "Sylhet"]
  target_channels: string[]; // e.g. ["SMS", "WhatsApp", "Facebook Messenger"]
  common_phrases: string[];
  first_seen: string;
  last_active: string;
  description: string;
  verified_by_intel: boolean;
}

export interface AnonymousReport {
  id: string;
  category: string;
  channel: 'SMS' | 'WhatsApp' | 'Facebook' | 'Phone Call' | 'Telegram' | 'Email' | 'Other';
  city: string;
  sender_indicator: string; // e.g. "018XXXXXXXX" or "Shortcode"
  snippet_sanitized: string;
  reported_at: string;
  status: 'Investigating' | 'Verified' | 'Archived';
}

export interface UserSafetyScore {
  overall_score: number;
  account_security: number;
  scam_awareness: number;
  privacy_health: number;
  device_safety: number;
  threats_prevented: number;
  scams_flagged: number;
  safe_verifications: number;
  key_recommendations: string[];
}

export interface PrivacySettings {
  store_messages: boolean;
  store_screenshots: boolean;
  anonymous_telemetry: boolean;
  coarse_location_sharing: boolean;
  community_threat_sharing: boolean;
  ephemeral_mode: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  title_bn: string;
  category: string;
  language: Language;
  type: 'message' | 'screenshot' | 'url' | 'conversation';
  sample_content: string;
  description: string;
  expected_risk: RiskLevel;
}
