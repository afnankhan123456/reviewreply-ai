"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, BarChart3, MessageSquare, RefreshCw, 
  ThumbsUp, ThumbsDown, AlertCircle, Copy, CheckCircle
} from 'lucide-react';

export default function AIReplyCenterPage() {
  const [stats, setStats] = useState({
    used: 0,
    limit: 5,
    responseRate: 0,
    positive: 0,
    negative: 0,
  });
  const [templates, setTemplates] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [filterCategory, setFilterCategory] = useState('All');

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
      const [statsRes, templatesRes] = await Promise.all([
        fetch('/api/standard/ai-reply-center/stats'),
        fetch('/api/standard/ai-reply-center/templates')
      ]);

      const statsData = await statsRes.json();
      if (statsData.success) setStats(statsData.data);

      const templatesData = await templatesRes.json();
      if (templatesData.success) setTemplates(templatesData.templates);

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
        body: JSON.stringify({ template: selectedTemplate }),
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedReply(data.reply);
      } else {
        alert('Failed to generate reply');
      }
    } catch (error) {
      alert('Error generating reply');
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredTemplates = templates.filter((tpl) => {
    if (filterCategory === 'All') return true;
    if (filterCategory === 'Positive') return tpl.includes('Positive') || tpl.includes('glowing') || tpl.includes('5-star') || tpl.includes('enjoyed') || tpl.includes('thrilled');
    if (filterCategory === 'Negative') return tpl.includes('Negative') || tpl.includes('sorry') || tpl.includes('apologize') || tpl.includes('improve') || tpl.includes('disappointed');
    if (filterCategory === 'Professional') return tpl.includes('Dear Customer') || tpl.includes('Dear Valued') || tpl.includes('Dear Guest');
    if (filterCategory === 'General') return tpl.includes('Thank you') && !tpl.includes('Dear');
    return true;
  });

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
  const borderColor = theme === "light" ? "border-gray-200" : "border-[#1F2430]";
  const selectBg = theme === "light" ? "bg-white border-gray-300 text-gray-900" : "bg-[#181D27] border-[#2A303C] text-gray-300";
  const pillInactive = theme === "light" ? "bg-gray-100 text-gray-600 border-gray-300" : "bg-[#1F2430] text-gray-400 border-[#2A303C]";
  const pillActive = "bg-indigo-500/20 text-indigo-400 border-indigo-500/30"; // same in both modes (keeps accent)

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${
      theme === "light" ? "bg-gray-50 text-gray-900" : "bg-[#0B0E14] text-gray-200"
    }`}>
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>AI Reply Center</h1>
          <p className={`text-sm ${textSecondary}`}>Automate your review responses with AI-powered tools and templates.</p>
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

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-6">
        
        {/* Left: AI Generator */}
        <div className={`lg:col-span-2 ${bgCard} border rounded-xl p-5`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
            <Sparkles size={14} /> AI Review Reply Generator
          </div>
          <div className="flex gap-3 mb-3">
            <select 
              className={`w-[450px] h-12 border rounded-lg px-3 py-2 text-sm outline-none ${selectBg}`}
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
            >
              <option value="">Select a template (optional)</option>
              {templates.map((tpl) => (
                <option key={tpl} value={tpl}>{tpl}</option>
              ))}
            </select>
            <button 
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              onClick={handleGenerateReply}
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : 'Generate Reply'}
            </button>
          </div>
          
          {generatedReply && (
            <div className={`${bgSubCard} border rounded-lg p-4 mt-2`}>
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

        {/* Right: Templates */}
        <div className={`lg:col-span-1 ${bgCard} border rounded-xl p-5`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium mb-3`}>
            <Copy size={14} /> 500 AI Reply Templates
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {['All', 'General', 'Positive', 'Negative', 'Professional'].map((cat) => (
              <button
                key={cat}
                className={`text-[10px] px-3 py-1 rounded-full border transition-colors ${
                  filterCategory === cat ? pillActive : pillInactive
                }`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Template List */}
          <div className="space-y-2 mt-2 max-h-[250px] overflow-y-auto custom-scroll">
            {filteredTemplates.map((tpl) => (
              <div 
                key={tpl}
                className={`flex items-center justify-between border rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                  theme === "light"
                    ? "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
                    : "bg-[#181D27] border-[#2A303C] hover:bg-[#222633] text-gray-300"
                }`}
                onClick={() => setSelectedTemplate(tpl)}
              >
                <span className="text-xs">{tpl}</span>
                <span className="text-[10px] text-indigo-400">Select</span>
              </div>
            ))}
            <button className="w-full mt-2 text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors text-center">
              View All Templates →
            </button>
          </div>
        </div>
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
