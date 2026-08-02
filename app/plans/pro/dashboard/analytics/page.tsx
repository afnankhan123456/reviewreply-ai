"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3, TrendingUp, ThumbsUp, Minus, RefreshCw, ArrowLeft
} from 'lucide-react';

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

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<any>({
    stats: { totalReviews: 0, used: 0, limit: 5, responseRate: 0, positive: 0, negative: 0 },
    daily: [],
    weekly: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      const statsRes = await fetch('/api/standard/ai-reply-center/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        if (statsData.success) setAnalyticsData((prev: any) => ({ ...prev, stats: statsData.data }));
      }
      const dailyRes = await fetch('/api/standard/analytics/trends/daily');
      if (dailyRes.ok) {
        const dailyData = await dailyRes.json();
        if (dailyData.success) setAnalyticsData((prev: any) => ({ ...prev, daily: dailyData.data || [] }));
      }
      const weeklyRes = await fetch('/api/standard/analytics/trends/weekly');
      if (weeklyRes.ok) {
        const weeklyData = await weeklyRes.json();
        if (weeklyData.success) setAnalyticsData((prev: any) => ({ ...prev, weekly: weeklyData.data || [] }));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="page-wrap"><p style={{ color: "var(--text-dim)", padding: 40 }}>Loading analytics data...</p></div>;
  }

  const maxDaily = Math.max(...(analyticsData.daily || [0]), 1);
  const maxWeekly = Math.max(...(analyticsData.weekly || [0]), 1);
  const p = analyticsData.stats.positive || 0;
  const n = analyticsData.stats.negative || 0;
  const neutral = 100 - p - n;

  return (
    <div className="page-wrap">
      {/* header */}
      <div className="header-row">
        <div>
          <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8, fontSize: 12 }}>
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
          <h1>Analytics</h1>
          <p>Track your review performance with real-time analytics and sentiment insights.</p>
        </div>
        <div className="mini-glass" style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 14px", fontSize: 13 }} onClick={fetchAnalyticsData}>
          <RefreshCw size={14} /> Refresh
        </div>
      </div>

      {/* Basic Analytics — stat cards */}
      <div className="stats" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title"><BarChart3 size={11} style={{ verticalAlign: "middle", marginRight: 3 }} /> Total Reviews</p></div>
          <p className="value">{analyticsData.stats.totalReviews || 0}</p>
          <p style={{ fontSize: 10.5, color: "#57e39a" }}><TrendingUp size={10} style={{ verticalAlign: "middle" }} /> {analyticsData.stats?.growth?.total || 0}% this month</p>
        </LiquidCard>

        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title"><TrendingUp size={11} style={{ verticalAlign: "middle", marginRight: 3 }} /> Response Rate</p></div>
          <p className="value">{analyticsData.stats.responseRate || 0}%</p>
          <p style={{ fontSize: 10.5, color: "#57e39a" }}><TrendingUp size={10} style={{ verticalAlign: "middle" }} /> {analyticsData.stats?.growth?.response || 0}% this month</p>
        </LiquidCard>

        <LiquidCard className="stat-card" style={{ height: "auto" }}>
          <div className="stat-head"><p className="title"><ThumbsUp size={11} style={{ verticalAlign: "middle", marginRight: 3 }} /> AI Replies Used</p></div>
          <p className="value">{analyticsData.stats.used || 0}</p>
          <p style={{ fontSize: 10.5, color: "#e9b52a" }}><Minus size={10} style={{ verticalAlign: "middle" }} /> {analyticsData.stats.limit - analyticsData.stats.used || 0} remaining</p>
        </LiquidCard>
      </div>

      {/* Advanced Analytics — Charts & Trends */}
      <div className="two-col">
        <LiquidCard>
          <div className="section-head">
            <h3>Daily Review Trends</h3>
            <span style={{ fontSize: 10.5, color: "var(--text-dim)" }}>Last 7 days</span>
          </div>
          <div style={{ height: 140, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6 }}>
            {analyticsData.daily.map((val: number, i: number) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                <div style={{ width: "100%", height: `${(val / maxDaily) * 100}%`, background: "linear-gradient(180deg,#a561f6,#4da3ff)", borderRadius: "6px 6px 0 0", minHeight: 2 }}></div>
                <span style={{ fontSize: 8.5, color: "var(--text-dimmer)" }}>D{i + 1}</span>
              </div>
            ))}
          </div>
        </LiquidCard>

        <LiquidCard>
          <div className="section-head">
            <h3>Weekly Review Trends</h3>
            <span style={{ fontSize: 10.5, color: "var(--text-dim)" }}>Last 7 weeks</span>
          </div>
          <div style={{ height: 140, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6 }}>
            {analyticsData.weekly.map((val: number, i: number) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                <div style={{ width: "100%", height: `${(val / maxWeekly) * 100}%`, background: "linear-gradient(180deg,#c78bff,#7b2db9)", borderRadius: "6px 6px 0 0", minHeight: 2 }}></div>
                <span style={{ fontSize: 8.5, color: "var(--text-dimmer)" }}>W{i + 1}</span>
              </div>
            ))}
          </div>
        </LiquidCard>
      </div>

      {/* Sentiment Analysis */}
      <div className="two-col" style={{ gridTemplateColumns: "1fr 1.6fr" }}>
        <LiquidCard>
          <div className="section-head"><h3>Sentiment Overview</h3></div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0" }}>
            <div className="donut" style={{
              background: `conic-gradient(#e9b52a 0% ${neutral}%, #34d399 ${neutral}% ${neutral + p}%, #ef5a6f ${neutral + p}% 100%)`,
              width: 110, height: 110,
            }}>
              <div className="donut-center"><b>{p}%</b><span>Positive</span></div>
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 14, fontSize: 11 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="legend-dot" style={{ background: "#34d399" }}></span>Positive</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="legend-dot" style={{ background: "#e9b52a" }}></span>Neutral</span>
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><span className="legend-dot" style={{ background: "#ef5a6f" }}></span>Negative</span>
            </div>
          </div>
        </LiquidCard>

        <LiquidCard>
          <div className="section-head"><h3>Sentiment Distribution</h3></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: 6 }}>
            {[
              { label: "Positive", value: p, color: "#34d399" },
              { label: "Neutral", value: neutral, color: "#e9b52a" },
              { label: "Negative", value: n, color: "#ef5a6f" },
            ].map((row) => (
              <div key={row.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: "var(--text-dim)" }}>{row.label}</span>
                  <span style={{ color: "var(--text-dim)" }}>{row.value}%</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,.08)", borderRadius: 999, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${row.value}%`, background: row.color, borderRadius: 999 }}></div>
                </div>
              </div>
            ))}
          </div>
        </LiquidCard>
      </div>
    </div>
  );
}
