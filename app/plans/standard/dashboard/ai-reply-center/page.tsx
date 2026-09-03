"use client";

import React, { useState, useEffect } from 'react';
import {
  Sparkles, BarChart3, MessageSquare, RefreshCw,
  ThumbsUp, Copy, CheckCircle, Clock, Check, X, Settings2,
  Briefcase, Smile, Heart, UserCheck, FlaskConical, Send,
  ChevronDown, ChevronUp
} from 'lucide-react';
import {
  getAutoReplyMode,
  setAutoReplyMode,
  getPendingReplies,
  approvePendingReply,
  rejectPendingReply,
  generateTestReply,
} from './actions';

type ToneValue = 'Professional' | 'Friendly' | 'Empathetic' | 'Formal';

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

  const [manualRules, setManualRules] = useState('');
  const [rulesSaved, setRulesSaved] = useState(false);

  const [pendingReplies, setPendingReplies] = useState<any[]>([]);
  const [editingText, setEditingText] = useState<Record<string, string>>({});
  const [pendingActionId, setPendingActionId] = useState<string | null>(null);

  // ✅ NAYA — "Test AI Generator" widget state
  const [testTone, setTestTone] = useState<ToneValue>('Professional');
  const [testLanguage, setTestLanguage] = useState('English');
  const [testLength, setTestLength] = useState<'Short' | 'Medium' | 'Long'>('Medium');
  const [testAddEmojis, setTestAddEmojis] = useState(true);
  const [testReviewText, setTestReviewText] = useState('');
  const [testGeneratedReply, setTestGeneratedReply] = useState('');
  const [isTestGenerating, setIsTestGenerating] = useState(false);
  const [testCopied, setTestCopied] = useState(false);
  const [testPosted, setTestPosted] = useState(false);

  // ✅ NAYA — "Select Reply Tone" cards ab accordion hain: click karne se
  // wo tone select bhi hota hai AUR expand/collapse bhi hota hai. Har tone
  // ka apna alag rule/condition ho sakta hai (jaise "sirf 1-2 star ke liye",
  // "refund/complaint keyword aaye to isi tone se reply karo"), jo active
  // mode (Manual/Draft/Auto) ke andar hi apply hota hai — mode khud nahi
  // badalta, sirf uske andar ka content is rule se guide hota hai.
  const [expandedTones, setExpandedTones] = useState<Partial<Record<ToneValue, boolean>>>({});
  const [toneRules, setToneRules] = useState<Record<ToneValue, string>>({
    Professional: '',
    Friendly: '',
    Empathetic: '',
    Formal: '',
  });
  const [toneRuleSaved, setToneRuleSaved] = useState<ToneValue | null>(null);

  // ✅ Theme state – reads from localStorage
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
    const savedRules = localStorage.getItem("aiReplyRules");
    if (savedRules) setManualRules(savedRules);

    // ✅ NAYA — saved per-tone rules load karo
    const savedToneRules = localStorage.getItem("aiReplyToneRules");
    if (savedToneRules) {
      try {
        const parsed = JSON.parse(savedToneRules);
        setToneRules((prev) => ({ ...prev, ...parsed }));
      } catch {
        // corrupt data — ignore, defaults use ho jayenge
      }
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
      // ✅ NAYA — manual free-text rules + currently selected tone ka apna
      // rule, dono ko combine karke bhejte hain. Ye Manual mode ke "AI Review
      // Reply Generator" box se generate hota hai, isliye yahi is mode ka
      // "kaise" wala hissa hai.
      const combinedTemplate = [manualRules, toneRules[testTone]]
        .filter((t) => t && t.trim())
        .join(' ');

      const res = await fetch('/api/standard/ai-reply-center/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewText, template: combinedTemplate || undefined }),
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

  const handleSaveRules = () => {
    localStorage.setItem('aiReplyRules', manualRules);
    setRulesSaved(true);
    setTimeout(() => setRulesSaved(false), 2000);
  };

  // ✅ NAYA — Tone card pe click: select bhi karo, expand/collapse bhi karo
  const handleToneCardClick = (toneValue: ToneValue) => {
    setTestTone(toneValue);
    setExpandedTones((prev) => ({ ...prev, [toneValue]: !prev[toneValue] }));
  };

  // ✅ NAYA — Ek specific tone ka rule save karo (localStorage me sab tones
  // ka combined object rehta hai)
  const handleSaveToneRule = (toneValue: ToneValue) => {
    const updated = { ...toneRules };
    localStorage.setItem('aiReplyToneRules', JSON.stringify(updated));
    setToneRuleSaved(toneValue);
    setTimeout(() => setToneRuleSaved(null), 2000);
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

  // ✅ NAYA — "Test AI Generator" widget handlers
  const handleGenerateTestReply = async () => {
    if (!testReviewText.trim()) return;
    setIsTestGenerating(true);
    setTestPosted(false);
    try {
      // ✅ NAYA — selected tone ka apna rule bhi bhejo, taaki wo backend me
      // style-guidance ke saath combine ho jaaye
      const result = await generateTestReply(
        testReviewText,
        testTone,
        testLanguage,
        testLength,
        testAddEmojis,
        toneRules[testTone]
      );
      if (result.success) {
        setTestGeneratedReply(result.reply || '');
      } else {
        alert(result.error || 'Failed to generate reply');
      }
    } catch (error) {
      alert('Error generating reply');
    } finally {
      setIsTestGenerating(false);
    }
  };

  const handleCopyTestReply = () => {
    if (!testGeneratedReply) return;
    navigator.clipboard.writeText(testGeneratedReply);
    setTestCopied(true);
    setTimeout(() => setTestCopied(false), 2000);
  };

  // Ye "Test AI Generator" hai — koi real review yahan select nahi hota
  // (sirf free-paste text), isliye "Post" seedha Google pe kuch post nahi
  // karta. Ye reply ko copy karke user ko batata hai ki actual posting
  // "Reviews" tab se, us specific review pe hoti hai.
  const handlePostTestReply = () => {
    if (!testGeneratedReply) return;
    navigator.clipboard.writeText(testGeneratedReply);
    setTestPosted(true);
    setTimeout(() => setTestPosted(false), 2500);
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
  const inactiveBtn = theme === "light" ? "border-gray-200 hover:bg-gray-50" : "border-[#2A303C] hover:bg-[#181D27]";

  // ✅ Har mode ka apna alag color — sirf selected wala dark/highlighted dikhega
  const modeOptions: {
    value: 'manual' | 'draft' | 'auto';
    label: string;
    desc: string;
    activeClasses: string;
  }[] = [
    {
      value: 'manual',
      label: 'Manual',
      desc: 'You generate & send replies yourself.',
      activeClasses: 'border-blue-500 bg-blue-500/15 text-blue-400',
    },
    {
      value: 'draft',
      label: 'Draft & Approve',
      desc: 'AI drafts replies — you approve before posting.',
      activeClasses: 'border-purple-500 bg-purple-500/15 text-purple-400',
    },
    {
      value: 'auto',
      label: 'Fully Automatic',
      desc: 'AI generates & posts replies with no review.',
      activeClasses: 'border-orange-500 bg-orange-500/15 text-orange-400',
    },
  ];

  // ✅ NAYA — tone card definitions ek jagah, taaki grid aur expanded panels
  // dono isi se render ho sakein
  const toneOptions: { value: ToneValue; label: string; icon: any }[] = [
    { value: 'Professional', label: 'Professional', icon: Briefcase },
    { value: 'Friendly', label: 'Friendly', icon: Smile },
    { value: 'Empathetic', label: 'Empathetic', icon: Heart },
    { value: 'Formal', label: 'Formal', icon: UserCheck },
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
              className={`text-left p-3 rounded-lg border-2 transition-colors disabled:opacity-50 ${
                mode === opt.value ? opt.activeClasses : `border ${inactiveBtn} ${textSecondary}`
              }`}
            >
              <div className={`text-sm font-medium ${mode === opt.value ? '' : textPrimary}`}>
                {opt.label}
              </div>
              <div className={`text-xs mt-1 ${mode === opt.value ? 'opacity-80' : textMuted}`}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* ✅ NAYA — Test AI Generator widget (tone + advanced options + free-text tester) */}
      <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
        <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-1`}>
          <Settings2 size={14} /> Select Reply Tone
        </div>
        <p className={`text-xs mb-3 ${textMuted}`}>
          Click a tone to select it — click again to open its rule settings. Rules you set here apply inside whichever Auto-Reply Mode is active above.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
          {toneOptions.map((t) => {
            const Icon = t.icon;
            const active = testTone === t.value;
            const isOpen = !!expandedTones[t.value];
            const hasRule = !!toneRules[t.value]?.trim();
            return (
              <button
                key={t.value}
                onClick={() => handleToneCardClick(t.value)}
                className={`relative flex flex-col items-center justify-center gap-1.5 py-3 rounded-lg border-2 transition-colors ${
                  active ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400' : `border ${inactiveBtn} ${textSecondary}`
                }`}
              >
                {hasRule && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400" title="Rule set" />
                )}
                <Icon size={16} />
                <span className="text-xs font-medium">{t.label}</span>
                <span className="flex items-center gap-0.5 text-[10px] opacity-70">
                  {isOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                  {isOpen ? 'Hide rule' : 'Set rule'}
                </span>
              </button>
            );
          })}
        </div>

        {/* ✅ NAYA — expanded rule panel(s), ek ya zyada tones ek saath khule reh sakte hain */}
        {toneOptions
          .filter((t) => expandedTones[t.value])
          .map((t) => (
            <div key={t.value} className={`${bgSubCard} border rounded-lg p-4 mb-3`}>
              <div className={`flex items-center gap-2 text-xs font-medium mb-2 ${textPrimary}`}>
                <t.icon size={14} /> {t.label} — Rule
              </div>
              <p className={`text-xs mb-2 ${textMuted}`}>
                Optional — describe when this tone should apply (e.g. "use for 1-2 star reviews", "use when the review mentions refund or complaint"). Leave blank to just use this as the default tone.
              </p>
              <textarea
                className={`w-full border rounded-lg p-3 text-sm outline-none mb-3 ${inputBg}`}
                rows={2}
                placeholder={`e.g. Use ${t.label} tone for 1-2 star or negative-sentiment reviews.`}
                value={toneRules[t.value]}
                onChange={(e) =>
                  setToneRules((prev) => ({ ...prev, [t.value]: e.target.value }))
                }
              />
              <button
                onClick={() => handleSaveToneRule(t.value)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                {toneRuleSaved === t.value ? 'Saved!' : 'Save Rule'}
              </button>
            </div>
          ))}

        <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
          <Settings2 size={14} /> Advanced Options
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <select
            className={`border rounded-lg px-3 py-2 text-xs outline-none ${inputBg}`}
            value={testLanguage}
            onChange={(e) => setTestLanguage(e.target.value)}
          >
            <option value="English">🇬🇧 English</option>
            <option value="Hindi">🇮🇳 Hindi</option>
            <option value="Hinglish">🇮🇳 Hinglish</option>
            <option value="Spanish">🇪🇸 Spanish</option>
            <option value="French">🇫🇷 French</option>
          </select>

          <select
            className={`border rounded-lg px-3 py-2 text-xs outline-none ${inputBg}`}
            value={testLength}
            onChange={(e) => setTestLength(e.target.value as 'Short' | 'Medium' | 'Long')}
          >
            <option value="Short">Short (1-2 lines)</option>
            <option value="Medium">Medium (3-4 lines)</option>
            <option value="Long">Long (5-6 lines)</option>
          </select>

          <label className={`flex items-center gap-2 text-xs ${textSecondary}`}>
            <input
              type="checkbox"
              checked={testAddEmojis}
              onChange={(e) => setTestAddEmojis(e.target.checked)}
            />
            Add Emojis ✨
          </label>
        </div>

        <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
          <FlaskConical size={14} /> Test AI Generator
        </div>
        <textarea
          className={`w-full border rounded-lg p-3 text-sm outline-none mb-3 ${inputBg}`}
          rows={3}
          placeholder="Paste any customer review here..."
          value={testReviewText}
          onChange={(e) => setTestReviewText(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          <button
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleGenerateTestReply}
            disabled={isTestGenerating || !testReviewText.trim()}
          >
            <Sparkles size={14} /> {isTestGenerating ? 'Generating...' : 'Generate AI Reply'}
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            onClick={handleCopyTestReply}
            disabled={!testGeneratedReply}
          >
            <Copy size={14} /> {testCopied ? 'Copied!' : 'Copy'}
          </button>
          <button
            className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            onClick={handlePostTestReply}
            disabled={!testGeneratedReply}
            title="Test generator me koi real review linked nahi hai — ye reply copy kar deta hai taaki tum use Reviews tab se us review par post kar sako."
          >
            <Send size={14} /> {testPosted ? 'Copied for posting!' : 'Post'}
          </button>
        </div>

        {testGeneratedReply && (
          <div className={`${bgSubCard} border rounded-lg p-4 mt-3`}>
            <span className={`text-xs ${textSecondary}`}>AI Generated Reply:</span>
            <p className={`text-sm leading-relaxed mt-1 ${textPrimary}`}>{testGeneratedReply}</p>
          </div>
        )}
      </div>

      {/* Manual mode: rule/style-guidance box — sirf Manual select hone par dikhega */}
      {mode === 'manual' && (
        <div className={`${bgCard} border rounded-xl p-5 mb-6`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
            <Settings2 size={14} /> Your Reply Style / Rules
          </div>
          <p className={`text-xs mb-3 ${textMuted}`}>
            Optional — set a default tone or instructions the AI should follow whenever you generate a reply manually (e.g. "keep it short and formal", "always mention our loyalty program").
          </p>
          <textarea
            className={`w-full border rounded-lg p-3 text-sm outline-none mb-3 ${inputBg}`}
            rows={3}
            placeholder="e.g. Always thank the customer by name and keep replies under 3 sentences."
            value={manualRules}
            onChange={(e) => setManualRules(e.target.value)}
          />
          <button
            onClick={handleSaveRules}
            className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            {rulesSaved ? 'Saved!' : 'Save Rules'}
          </button>
        </div>
      )}

      {/* Pending Approval — sirf Draft & Approve select hone par dikhega */}
      {mode === 'draft' && pendingReplies.length > 0 && (
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

      {mode === 'draft' && pendingReplies.length === 0 && (
        <div className={`${bgCard} border rounded-xl p-5 mb-6 text-center`}>
          <p className={`text-sm ${textMuted}`}>No replies pending approval right now.</p>
        </div>
      )}

      {/* AI Generator (manual mode ke liye test/direct use) */}
      {mode === 'manual' && (
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
      )}

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
