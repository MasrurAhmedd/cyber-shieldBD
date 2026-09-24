/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { analyzeTextMessageWithAi, analyzeScreenshotWithAi } from './server/gemini';
import { analyzeUrlSafety, analyzeConversationJourney } from './server/engine';
import { EMERGING_SCAM_CAMPAIGNS } from './src/data/demoData';
import { AnonymousReport, ScamCampaign } from './src/types';

dotenv.config();

const app = express();
const PORT = 3000;

// Increase JSON payload limits for image uploads
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// In-memory state for community threat reports (transient & privacy-preserving)
const communityReports: AnonymousReport[] = [
  {
    id: 'rep-01',
    category: 'MFS OTP Scam',
    channel: 'SMS',
    city: 'Dhaka',
    sender_indicator: '01912***43',
    snippet_sanitized: 'bKash account suspended. Provide OTP code immediately...',
    reported_at: '2026-09-06T10:14:00Z',
    status: 'Verified'
  },
  {
    id: 'rep-02',
    category: 'Fake Courier Fee',
    channel: 'WhatsApp',
    city: 'Chattogram',
    sender_indicator: '01700***89',
    snippet_sanitized: 'Pay 50 taka delivery fee at tracking link...',
    reported_at: '2026-09-06T11:22:00Z',
    status: 'Verified'
  },
  {
    id: 'rep-03',
    category: 'Telegram Job Scam',
    channel: 'Telegram',
    city: 'Sylhet',
    sender_indicator: '@bd_parttime_hr',
    snippet_sanitized: 'Daily ৳5,000 YouTube like work. Deposit ৳2,000 for VIP...',
    reported_at: '2026-09-06T12:05:00Z',
    status: 'Investigating'
  }
];

const campaigns: ScamCampaign[] = [...EMERGING_SCAM_CAMPAIGNS];

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SHIELD BD Engine',
    version: '1.0.0-grameenphone-futuremakers-2026',
    ai_available: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Analyze Text
app.post('/api/analyze/text', async (req, res) => {
  try {
    const { text, language } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Text content is required for analysis.' });
    }
    // Limit text length for safety
    const sanitized = text.slice(0, 10000);
    const result = await analyzeTextMessageWithAi(sanitized, language);
    res.json(result);
  } catch (error) {
    console.error('[API Error] /api/analyze/text:', error);
    res.status(500).json({ error: 'Internal server error during analysis.' });
  }
});

// Analyze Screenshot / Image
app.post('/api/analyze/image', async (req, res) => {
  try {
    const { imageBase64, mimeType } = req.body;
    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }
    const result = await analyzeScreenshotWithAi(imageBase64, mimeType || 'image/png');
    res.json(result);
  } catch (error) {
    console.error('[API Error] /api/analyze/image:', error);
    res.status(500).json({ error: 'Internal server error during screenshot analysis.' });
  }
});

// Analyze URL
app.post('/api/analyze/url', (req, res) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required.' });
    }
    const result = analyzeUrlSafety(url.slice(0, 2048));
    res.json(result);
  } catch (error) {
    console.error('[API Error] /api/analyze/url:', error);
    res.status(500).json({ error: 'Internal server error during URL analysis.' });
  }
});

// Analyze Conversation
app.post('/api/analyze/conversation', (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ error: 'Conversation transcript is required.' });
    }
    const result = analyzeConversationJourney(transcript.slice(0, 15000));
    res.json(result);
  } catch (error) {
    console.error('[API Error] /api/analyze/conversation:', error);
    res.status(500).json({ error: 'Internal server error during conversation analysis.' });
  }
});

// Community Threat Radar & Stats
app.get('/api/scam-radar', (req, res) => {
  res.json({
    campaigns,
    recentReports: communityReports.slice(0, 15),
    totalReportsToday: 384,
    activeCampaignsCount: campaigns.length,
    threatsPrevented24h: 1290
  });
});

// Anonymous Scam Report
app.post('/api/report', (req, res) => {
  try {
    const { category, channel, city, sender_indicator, snippet } = req.body;
    if (!category) {
      return res.status(400).json({ error: 'Category is required.' });
    }

    // Sanitize snippet to prevent storing private personal details
    const cleanSnippet = (snippet || '')
      .replace(/\b(\d{4})\s?(\d{4})\s?(\d{4})\b/g, '****-****-****') // card numbers
      .replace(/(\+?88)?01[3-9]\d{8}/g, '01X-XXXXXXX') // bd phone numbers
      .slice(0, 200);

    const newReport: AnonymousReport = {
      id: `rep-${Date.now()}`,
      category,
      channel: channel || 'SMS',
      city: city || 'Dhaka',
      sender_indicator: sender_indicator ? sender_indicator.slice(0, 20) : 'Anonymous Sender',
      snippet_sanitized: cleanSnippet,
      reported_at: new Date().toISOString(),
      status: 'Investigating'
    };

    communityReports.unshift(newReport);

    // Update relevant campaign report count if category matches
    const matchedCamp = campaigns.find(c => c.category.toLowerCase().includes(category.toLowerCase()));
    if (matchedCamp) {
      matchedCamp.reports_count += 1;
    }

    res.json({
      success: true,
      message: 'Anonymous threat report logged successfully. Thank you for protecting the community.',
      reportId: newReport.id
    });
  } catch (error) {
    console.error('[API Error] /api/report:', error);
    res.status(500).json({ error: 'Failed to record report.' });
  }
});

// User Digital Safety Score
app.get('/api/safety-score', (req, res) => {
  res.json({
    overall_score: 82,
    account_security: 88,
    scam_awareness: 94,
    privacy_health: 80,
    device_safety: 76,
    threats_prevented: 14,
    scams_flagged: 9,
    safe_verifications: 5,
    key_recommendations: [
      'Enable 2-Step Verification on WhatsApp and Facebook.',
      'Never reveal bKash or Nagad 4/5-digit PIN even if caller claims to be customer care.',
      'Do not install APK files sent via SMS or Telegram messages.'
    ]
  });
});

// Trusted Contact Simulated Alert
app.post('/api/trusted-contact/alert', (req, res) => {
  const { contactName, contactNumber, riskCategory, riskScore } = req.body;
  res.json({
    success: true,
    sent: false, // Simulated for privacy
    message: `[Simulated Alert] Safe safety advisory would be dispatched to ${contactName || 'Trusted Contact'} (${contactNumber || '01XXXXXXXXX'}). Note: In accordance with our Privacy-by-Design charter, no private conversation text is ever transmitted.`,
    payload: {
      alertType: 'CRITICAL_DIGITAL_SAFETY_WARNING',
      riskCategory,
      riskScore,
      actionAdvice: 'Please contact this person to verify they are not sharing any OTP or money.'
    }
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SHIELD BD] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
