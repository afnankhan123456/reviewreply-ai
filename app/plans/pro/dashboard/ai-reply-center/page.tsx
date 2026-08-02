"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles, BarChart3, MessageSquare, RefreshCw,
  ThumbsUp, Copy, CheckCircle, Clock, Check, X, Settings2, ArrowLeft
} from 'lucide-react';
import {
  getAutoReplyMode,
  setAutoReplyMode,
  getPendingReplies,
  approvePendingReply,
  rejectPendingReply,
} from './actions';

function LiquidCard({ className = "", children, ...rest }: { className?: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className="volume"></div>
      <div className="refract"></div>
      <div className="cornerBloom"></div>
      <div className="bodyShade"></div>
      <div className="specular"></div>
      <div className="edgeLight"></div>
      <div className="rim"></div>
      <div className="rightGlow"></div>
      <div className="content">{children}</div>
    </div>
  );
}

export default function AIReplyCenterPage() {
  const [stats, setStats] = useState({ used: 0, limit: 5, responseRate: 0, positive: 0, negative: 0 });
  const [reviewText, setReviewText] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mode, setMode] = useState<'manual' | 'draft' | 'auto'>('manual');
  const [savingMode, setSavingMode] = useState(false);

  const [manualRules, setManualRules] = useState('');
  const [rulesSaved, setRulesSaved] = useState(false);

  const [pendingReplies, setPendingReplies] = useState<any[]>([]);
  const [editingText, setEditingText] = useState<Record<string, string>>({});
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  useEffect(() => {
    const savedRules = localStorage.getItem("aiReplyRules");
    if (savedRules) setManualRules(savedRules);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, modeResult, pendingResult] = await Promise.all([
        fetch('/api/standard/ai-reply-center/stats'),
        getAutoReplyMode(),
        getPendingReplies(),
      ]);
      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);
      if (modeResult.success) setMode(modeResult.mode as any);
      if (pendingResult.success) {
        setPendingReplies(pendingResult.reviews);
        const initialEdits: Record<string, string> = {};
        pendingResult.reviews.forEach((r: any) => { initialEdits[r.id] = r.reviewReply || ''; });
        setEditingText(initialEdits);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleGenerateReply = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/standard/ai-reply-center/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText, template: manualRules || undefined }),
      });
      const data = await res.json();
      if (data.success) setGeneratedReply(data.reply);
      else alert(data.error || 'Failed to generate reply');
    } catch (error) {
      alert('Error generating reply');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModeChange = async (newMode: 'manual' | 'draft' | 'auto') => {
    setSavingMode(true);
    const result = await setAutoReplyMode(newMode);
    if (result.success) setMode(newMode);
    else alert(result.error || 'Failed to update mode');
    setSavingMode(false);
  };

  const handleSaveRules = () => {
    localStorage.setItem('aiReplyRules', manualRules);
    setRulesSaved(true);
    setTimeout(() => setRulesSaved(false), 2000);
  };

  const handleApprove = async (reviewId: string) => {
    setPendingActionId(reviewId);
    const finalText = editingText[reviewId] || '';
    const result = await approvePendingReply(reviewId, finalText);
    if (result.success) setPendingReplies((prev) => prev.filter((r) => r.id !== reviewId));
    else alert(result.error || 'Failed to approve');
    setPendingActionId(null);
  };

  const handleReject = async (reviewId: string) => {
    setPendingActionId(reviewId);
    const result = await rejectPendingReply(reviewId);
    if (result.success) setPendingReplies((prev) => prev.filter((r) => r.id !== reviewId));
    else alert(result.error || 'Failed to reject');
    setPendingActionId(null);
  };

  const modeOptions: { value: 'manual' | 'draft' | 'auto'; label: string; desc: string; color: string }[] = [
    { value: 'manual', label: 'Manual', desc: 'You generate & send replies yourself.', color: '#4da3ff' },
    { value: 'draft', label: 'Draft & Approve', desc: 'AI drafts replies — you approve before posting.', color: '#c78bff' },
    { value: 'auto', label: 'Fully Automatic', desc: 'AI generates & posts replies with no review.', color: '#f5a623' },
  ];

  if (isLoading) {
    return <div className="page-wrap"><p style={{ color: "var(--text-dim)", padding: 40 }}>Loading AI data...</p></div>;
  }

  return (
    <div className="page-wrap">
      {/* header */}
      <div className="header-row">
        <div>
          <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8, fontSize: 12 }}>
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
          <h1>AI Reply Center</h1>
          <p>Automate your review responses with AI-powered tools.</p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="stats" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title">500 AI Replies / Month</p></div>
          <p className="value">{stats.used}</p>
          <p style={{ fontSize: 10.5, color: "var(--text-dim)", margin: "0 0 6px" }}>{stats.limit - stats.used} remaining</p>
          <div style={{ width: "100%", height: 5, background: "rgba(255,255,255,.1)", borderRadius: 999, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(stats.used / stats.limit) * 100}%`, background: "#4da3ff" }}></div>
          </div>
        </LiquidCard>

        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title">Response Rate</p></div>
          <p className="value">{stats.responseRate}%</p>
          <p style={{ fontSize: 10.5, color: "#57e39a" }}><ThumbsUp size={10} style={{ verticalAlign: "middle" }} /> Real-time analytics</p>
        </LiquidCard>

        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title">Sentiment Detection</p></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#57e39a" }}>{stats.positive}%</div>
              <div style={{ fontSize: 9.5, color: "var(--text-dim)" }}>Positive</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#e9b52a" }}>{100 - stats.positive - stats.negative}%</div>
              <div style={{ fontSize: 9.5, color: "var(--text-dim)" }}>Neutral</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#ff8e9a" }}>{stats.negative}%</div>
              <div style={{ fontSize: 9.5, color: "var(--text-dim)" }}>Negative</div>
            </div>
          </div>
        </LiquidCard>
      </div>

      {/* Auto-Reply Mode Selector */}
      <LiquidCard className="section-card">
        <div className="section-head"><h3>Auto-Reply Mode</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {modeOptions.map((opt) => (
            <div
              key={opt.value}
              onClick={() => !savingMode && handleModeChange(opt.value)}
              className="mini-glass"
              style={{
                padding: 12, cursor: savingMode ? "default" : "pointer",
                border: mode === opt.value ? `1px solid ${opt.color}` : undefined,
                background: mode === opt.value ? `${opt.color}22` : undefined,
                opacity: savingMode ? 0.6 : 1,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: mode === opt.value ? opt.color : "#fff" }}>{opt.label}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>{opt.desc}</div>
            </div>
          ))}
        </div>
      </LiquidCard>

      {/* Manual mode: rules box */}
      {mode === 'manual' && (
        <LiquidCard className="section-card">
          <div className="section-head"><h3><Settings2 size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Your Reply Style / Rules</h3></div>
          <p style={{ fontSize: 11.5, color: "var(--text-dim)", marginBottom: 10 }}>
            Optional — set a default tone or instructions the AI should follow (e.g. "keep it short and formal").
          </p>
          <textarea
            rows={3} placeholder="e.g. Always thank the customer by name and keep replies under 3 sentences."
            value={manualRules} onChange={(e) => setManualRules(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: 12, fontSize: 13, color: "#fff", resize: "none", marginBottom: 10 }}
          />
          <button className="btn-primary" onClick={handleSaveRules}>{rulesSaved ? 'Saved!' : 'Save Rules'}</button>
        </LiquidCard>
      )}

      {/* Pending Approval */}
      {mode === 'draft' && pendingReplies.length > 0 && (
        <LiquidCard className="section-card">
          <div className="section-head"><h3><Clock size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> Pending Approval ({pendingReplies.length})</h3></div>
          {pendingReplies.map((r) => (
            <div key={r.id} className="mini-glass" style={{ padding: 14, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.reviewerName}</span>
                <span style={{ color: "var(--orange)", fontSize: 12 }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 10 }}>{r.comment || 'No comment'}</p>
              <label style={{ display: "block", fontSize: 10, color: "var(--text-dimmer)", marginBottom: 4 }}>AI-drafted reply (editable):</label>
              <textarea
                rows={3} value={editingText[r.id] || ''}
                onChange={(e) => setEditingText((prev) => ({ ...prev, [r.id]: e.target.value }))}
                style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: 10, fontSize: 12.5, color: "#fff", resize: "none", marginBottom: 10 }}
              />
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ padding: "7px 14px", fontSize: 12 }} disabled={pendingActionId === r.id} onClick={() => handleApprove(r.id)}>
                  <Check size={12} style={{ verticalAlign: "middle" }} /> Approve & Post
                </button>
                <div className="mini-glass" style={{ padding: "7px 14px", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }} onClick={() => handleReject(r.id)}>
                  <X size={12} /> Reject
                </div>
              </div>
            </div>
          ))}
        </LiquidCard>
      )}

      {mode === 'draft' && pendingReplies.length === 0 && (
        <LiquidCard className="section-card">
          <p style={{ fontSize: 13, color: "var(--text-dim)", textAlign: "center" }}>No replies pending approval right now.</p>
        </LiquidCard>
      )}

      {/* AI Generator */}
      {mode === 'manual' && (
        <LiquidCard className="section-card">
          <div className="section-head"><h3><Sparkles size={14} style={{ verticalAlign: "middle", marginRight: 4 }} /> AI Review Reply Generator</h3></div>
          <textarea
            rows={3} placeholder="Paste a customer review here to generate a reply..."
            value={reviewText} onChange={(e) => setReviewText(e.target.value)}
            style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: 12, fontSize: 13, color: "#fff", resize: "none", marginBottom: 10 }}
          />
          <button className="btn-primary" onClick={handleGenerateReply} disabled={isGenerating || !reviewText.trim()}>
            {isGenerating ? 'Generating...' : 'Generate Reply'}
          </button>

          {generatedReply && (
            <div className="mini-glass" style={{ padding: 14, marginTop: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 11, color: "var(--text-dim)" }}>AI Generated Reply:</span>
                <div style={{ fontSize: 10.5, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", color: "var(--text-dim)" }}
                  onClick={() => navigator.clipboard.writeText(generatedReply)}>
                  <Copy size={11} /> Copy
                </div>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>{generatedReply}</p>
            </div>
          )}
        </LiquidCard>
      )}

      {/* Recent AI Activity */}
      <LiquidCard className="section-card">
        <div className="section-head"><h3>Recent AI Activity</h3></div>
        <div className="mini-glass" style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", marginBottom: 8 }}>
          <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}><CheckCircle size={13} style={{ color: "#57e39a" }} /> Reply sent to Rohit Sharma (5★)</span>
          <span style={{ fontSize: 10.5, color: "var(--text-dimmer)" }}>2 hours ago</span>
        </div>
        <div className="mini-glass" style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px" }}>
          <span style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}><CheckCircle size={13} style={{ color: "#57e39a" }} /> Reply sent to Priya Patel (4★)</span>
          <span style={{ fontSize: 10.5, color: "var(--text-dimmer)" }}>5 hours ago</span>
        </div>
      </LiquidCard>
    </div>
  );
}
