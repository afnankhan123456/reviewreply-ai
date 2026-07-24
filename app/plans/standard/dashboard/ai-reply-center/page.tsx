"use client";

import React, { useState, useEffect } from 'react';
import {
  Sparkles, BarChart3, MessageSquare, RefreshCw,
  ThumbsUp, Copy, CheckCircle, Clock, Check, X
} from 'lucide-react';
import {
  getAutoReplyMode,
  setAutoReplyMode,
  getPendingReplies,
  approvePendingReply,
  rejectPendingReply,
} from './actions';

export default function AIReplyCenterPage() {
  const [stats, setStats] = useState({
    used: 0,
    limit: 5,
    responseRate: 0,
    positive: 0,
    negative: 0,
  });
  const [reviewText, setReviewText] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [mode, setMode] = useState<'manual' | 'draft' | 'auto'>('manual');
  const [savingMode, setSavingMode] = useState(false);

  const [pendingReplies, setPendingReplies] = useState<any[]>([]);
  const [editingText, setEditingText] = useState<Record<string, string>>({});
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  // ✅ Theme state – reads from localStorage
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
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
        pendingResult.reviews.forEach((r: any) => {
          initialEdits[r.id] = r.reviewReply || '';
        });
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
        body: JSON.stringify({ reviewText }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedReply(data.reply);
      } else {
        alert(data.error || 'Failed to generate reply');
      }
    } catch (error) {
      alert('Error generating reply');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleModeChange = async (newMode: 'manual' | 'draft' | 'auto') => {
    setSavingMode(true);
    const result = await setAutoReplyMode(newMode);
    if (result.success) {
      setMode(newMode);
    } else {
      alert(result.error || 'Failed to update mode');
    }
    setSavingMode(false);
  };

  const handleApprove = async (reviewId: string) => {
    setPendingActionId(reviewId);
    const finalText = editingText[reviewId] || '';
    const result = await approvePendingReply(reviewId, finalText);
    if (result.success) {
      setPendingReplies((prev) => prev.filter((r) => r.id !== reviewId));
    } else {
      alert(result.error || 'Failed to approve');
    }
    setPendingActionId(null);
  };

  const handleReject = async (reviewId: string) => {
    setPendingActionId(reviewId);
    const result = await rejectPendingReply(reviewId);
    if (result.success) {
      setPendingReplies((prev) => prev.filter((r) => r.id !== reviewId));
    } else {
      alert(result.error || 'Failed to reject');
    }
    setPendingActionId(null);
  };

  if (isLoading) {
    return (
      <div className={`flex-1 flex items-center justify-center ${
        theme === "light" ? "text-gray-600" : "text-gray-400"
      }`}>
        Loading AI data...
      </div>
    );
  }

  // ✅ Common conditional classes
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const bgSubCard = theme === "light" ? "bg-gray-50 border-gray-200" : "bg-[#181D27] border-[#2A303C]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-400" : "text-gray-500";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900" : "bg-[#181D27] border-[#2A303C] text-gray-300";

  const modeOptions: { value: 'manual' | 'draft' | 'auto'; label: string; desc: string }[] = [
    { value: 'manual', label: 'Manual', desc: 'You generate & send replies yourself.' },
    { value: 'draft', label: 'Draft & Approve', desc: 'AI drafts replies — you approve before posting.' },
    { value: 'auto', label: 'Fully Automatic', desc: 'AI generates & posts replies with no review.' },
  ];

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${
      theme === "light" ? "bg-gray-50 text-gray-900" : "bg-[#0B0E14] text-gray-200"
    }`}>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>AI Reply Center</h1>
          <p className={`text-sm ${textSecondary}`}>Automate your review responses with AI-powered tools.</p>
        </div>
        <div className={`flex items-center gap-2 ${bgSubCard} border rounded-lg px-3 py-2 text-sm`}>
          <Sparkles size={16} className="text-indigo-400" />
          <span className={`${textSecondary}`}>AI Mode</span>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        {/* Card 1 */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <RefreshCw size={14} /> 500 AI Replies / Month
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className={`text-2xl font-bold ${textPrimary}`}>{stats.used}</div>
              <div className={`text-[10px] ${textMuted}`}>Used this month</div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-medium ${textPrimary}`}>{stats.limit - stats.used}</div>
              <div className={`text-[10px] ${textMuted}`}>Remaining</div>
            </div>
          </div>
          <div className="w-full h-1.5 bg-[#1F2430] rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(stats.used / stats.limit) * 100}%` }}></div>
          </div>
        </div>

        {/* Card 2 */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <BarChart3 size={14} /> Response Rate Tracking
          </div>
          <div className={`text-4xl font-bold ${textPrimary}`}>{stats.responseRate}%</div>
          <div className="text-[10px] text-green-400 flex items-center gap-1">
            <ThumbsUp size={12} /> Real-time analytics
          </div>
        </div>

        {/* Card 3 */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-2`}>
            <MessageSquare size={14} /> Positive & Negative Detection
          </div>
          <div className="flex items-center justify-between mt-1">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.positive}%</div>
              <div className={`text-[10px] ${textMuted}`}>Positive</div>
            </div>
            <div className={`h-8 w-[1px] ${theme === "light" ? "bg-gray-300" : "bg-[#1F2430]"}`}></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{100 - stats.positive - stats.negative}%</div>
              <div className={`text-[10px] ${textMuted}`}>Neutral</div>
            </div>
            <div className={`h-8 w-[1px] ${theme === "light" ? "bg-gray-300" : "bg-[#1F2430]"}`}></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.negative}%</div>
              <div className={`text-[10px] ${textMuted}`}>Negative</div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto-Reply Mode Selector */}
      <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
        <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
          <RefreshCw size={14} /> Auto-Reply Mode
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleModeChange(opt.value)}
              disabled={savingMode}
              className={`text-left p-3 rounded-lg border transition-colors disabled:opacity-50 ${
                mode === opt.value
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : theme === "light"
                    ? 'border-gray-200 hover:bg-gray-50'
                    : 'border-[#2A303C] hover:bg-[#181D27]'
              }`}
            >
              <div className={`text-sm font-medium ${mode === opt.value ? 'text-indigo-400' : textPrimary}`}>
                {opt.label}
              </div>
              <div className={`text-xs mt-1 ${textMuted}`}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Pending Approval (Draft mode) */}
      {pendingReplies.length > 0 && (
        <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
            <Clock size={14} /> Pending Approval ({pendingReplies.length})
          </div>
          <div className="space-y-3">
            {pendingReplies.map((r) => (
              <div key={r.id} className={`${bgSubCard} border rounded-lg p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-medium ${textPrimary}`}>{r.reviewerName}</span>
                  <span className="text-yellow-500 text-xs">
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </span>
                </div>
                <p className={`text-xs mb-3 ${textSecondary}`}>{r.comment || 'No comment'}</p>

                <label className={`block text-[10px] mb-1 ${textMuted}`}>AI-drafted reply (editable):</label>
                <textarea
                  className={`w-full border rounded-lg p-2 text-sm outline-none mb-3 ${inputBg}`}
                  rows={3}
                  value={editingText[r.id] || ''}
                  onChange={(e) => setEditingText((prev) => ({ ...prev, [r.id]: e.target.value }))}
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(r.id)}
                    disabled={pendingActionId === r.id}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    <Check size={12} /> Approve & Post
                  </button>
                  <button
                    onClick={() => handleReject(r.id)}
                    disabled={pendingActionId === r.id}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50 ${
                      theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-[#1F2430] text-gray-400 hover:text-white"
                    }`}
                  >
                    <X size={12} /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Generator (test/manual use) */}
      <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
        <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
          <Sparkles size={14} /> AI Review Reply Generator
        </div>
        <textarea
          className={`w-full border rounded-lg p-3 text-sm outline-none mb-3 ${inputBg}`}
          rows={3}
          placeholder="Paste a customer review here to generate a reply..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
          onClick={handleGenerateReply}
          disabled={isGenerating || !reviewText.trim()}
        >
          {isGenerating ? 'Generating...' : 'Generate Reply'}
        </button>

        {generatedReply && (
          <div className={`${bgSubCard} border rounded-lg p-4 mt-3`}>
            <div className="flex justify-between items-start mb-2">
              <span className={`text-xs ${textSecondary}`}>AI Generated Reply:</span>
              <button
                className={`text-[10px] px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                  theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-[#1F2430] text-gray-400 hover:text-white"
                }`}
                onClick={() => navigator.clipboard.writeText(generatedReply)}
              >
                <Copy size={12} /> Copy
              </button>
            </div>
            <p className={`text-sm leading-relaxed ${textPrimary}`}>{generatedReply}</p>
          </div>
        )}
      </div>

      {/* Recent AI Activity */}
      <div className={`${bgCard} border rounded-xl p-5`}>
        <h3 className={`text-sm font-medium ${textPrimary} mb-3`}>Recent AI Activity</h3>
        <div className="space-y-3">
          <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${
            theme === "light" ? "bg-gray-50" : "bg-[#181D27]"
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span className={`text-xs ${textPrimary}`}>Reply sent to Rohit Sharma (5★)</span>
            </div>
            <span className={`text-[10px] ${textMuted}`}>2 hours ago</span>
          </div>
          <div className={`flex items-center justify-between rounded-lg px-3 py-2 ${
            theme === "light" ? "bg-gray-50" : "bg-[#181D27]"
          }`}>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-green-400" />
              <span className={`text-xs ${textPrimary}`}>Reply sent to Priya Patel (4★)</span>
            </div>
            <span className={`text-[10px] ${textMuted}`}>5 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
