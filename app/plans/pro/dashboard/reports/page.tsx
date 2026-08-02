"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  FileText, Download, Calendar, Clock, Loader2, ChevronDown, Database, ArrowLeft, X
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

export default function ReportsPage() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || 'OWNER';
  const canDownload = teamRole !== 'VIEW_ONLY';

  const [isGeneratingMonthly, setIsGeneratingMonthly] = useState(false);
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);
  const [isGeneratingHistory, setIsGeneratingHistory] = useState(false);

  const [monthlyFormat, setMonthlyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [weeklyFormat, setWeeklyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [showMonthlyMenu, setShowMonthlyMenu] = useState(false);
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);

  const [historyData, setHistoryData] = useState<any[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  const handleDownloadMonthly = async (format: 'pdf' | 'csv') => {
    if (!canDownload) return;
    setIsGeneratingMonthly(true);
    setShowMonthlyMenu(false);
    try {
      const res = await fetch(`/api/standard/reports/monthly?format=${format}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `monthly-report-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    } finally {
      setIsGeneratingMonthly(false);
    }
  };

  const handleDownloadWeekly = async (format: 'pdf' | 'csv') => {
    if (!canDownload) return;
    setIsGeneratingWeekly(true);
    setShowWeeklyMenu(false);
    try {
      const res = await fetch(`/api/standard/reports/weekly?format=${format}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    } finally {
      setIsGeneratingWeekly(false);
    }
  };

  const handleViewHistory = async () => {
    setIsGeneratingHistory(true);
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/standard/reports/history');
      const data = await res.json();
      if (data.success) {
        const sortedData = data.data.monthlyData.sort((a: any, b: any) => new Date(b.month).getTime() - new Date(a.month).getTime());
        setHistoryData(sortedData);
        setShowHistoryModal(true);
      } else {
        alert('Failed to load history');
      }
    } catch (error) {
      console.error('History error:', error);
      alert('Failed to load history');
    } finally {
      setIsGeneratingHistory(false);
      setHistoryLoading(false);
    }
  };

  const handleDownloadMonth = async (month: string) => {
    if (!canDownload) return;
    try {
      const res = await fetch(`/api/standard/reports/monthly?format=csv&month=${month}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${month}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download month report');
    }
  };

  return (
    <div className="page-wrap">
      <div className="header-row">
        <div>
          <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 8, fontSize: 12 }}>
            <ArrowLeft size={13} /> Back to Dashboard
          </Link>
          <h1>Reports</h1>
          <p>Download detailed performance reports in PDF or CSV format.</p>
        </div>
      </div>

      {!canDownload && (
        <LiquidCard className="section-card">
          <p style={{ fontSize: 13, color: "#e9b52a" }}>You have view-only access. Only the account owner or a Full Access member can download reports.</p>
        </LiquidCard>
      )}

      <div className="two-col">
        {/* Monthly Report */}
        <LiquidCard>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div className="mini-glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: "#c78bff" }}>
              <Calendar size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Monthly PDF Report</h3>
              <p style={{ fontSize: 11.5, color: "var(--text-dim)", margin: 0 }}>Complete performance summary for the month</p>
            </div>
          </div>

          <div className="mini-glass" style={{ padding: 14, textAlign: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5, margin: 0 }}>
              Thank you for your continued trust.<br />ReviewReply AI – Empowering businesses with insights.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <button
              className="btn-primary" style={{ width: "100%", justifyContent: "space-between", opacity: (isGeneratingMonthly || !canDownload) ? 0.5 : 1 }}
              disabled={isGeneratingMonthly || !canDownload}
              onClick={() => setShowMonthlyMenu(!showMonthlyMenu)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {isGeneratingMonthly ? <><Loader2 size={14} className="spin" /> Generating...</> : <><Download size={14} /> Download ({monthlyFormat.toUpperCase()})</>}
              </span>
              <ChevronDown size={14} />
            </button>
            {showMonthlyMenu && canDownload && (
              <div className="mini-glass" style={{ position: "absolute", bottom: "110%", left: 0, width: "100%", zIndex: 10, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }} onClick={() => handleDownloadMonthly('pdf')}><FileText size={14} /> PDF</div>
                <div style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }} onClick={() => handleDownloadMonthly('csv')}><FileText size={14} /> CSV</div>
              </div>
            )}
          </div>
        </LiquidCard>

        {/* Weekly Report */}
        <LiquidCard>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <div className="mini-glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: "#c78bff" }}>
              <Clock size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>Weekly Performance Report</h3>
              <p style={{ fontSize: 11.5, color: "var(--text-dim)", margin: 0 }}>Track weekly performance trends</p>
            </div>
          </div>

          <div className="mini-glass" style={{ padding: 14, textAlign: "center", marginBottom: 14 }}>
            <p style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5, margin: 0 }}>
              Thank you for your continued trust.<br />ReviewReply AI – Empowering businesses with insights.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <button
              className="btn-primary" style={{ width: "100%", justifyContent: "space-between", opacity: (isGeneratingWeekly || !canDownload) ? 0.5 : 1 }}
              disabled={isGeneratingWeekly || !canDownload}
              onClick={() => setShowWeeklyMenu(!showWeeklyMenu)}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {isGeneratingWeekly ? <><Loader2 size={14} className="spin" /> Generating...</> : <><Download size={14} /> Download ({weeklyFormat.toUpperCase()})</>}
              </span>
              <ChevronDown size={14} />
            </button>
            {showWeeklyMenu && canDownload && (
              <div className="mini-glass" style={{ position: "absolute", bottom: "110%", left: 0, width: "100%", zIndex: 10, overflow: "hidden" }}>
                <div style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }} onClick={() => handleDownloadWeekly('pdf')}><FileText size={14} /> PDF</div>
                <div style={{ padding: "10px 14px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }} onClick={() => handleDownloadWeekly('csv')}><FileText size={14} /> CSV</div>
              </div>
            )}
          </div>
        </LiquidCard>
      </div>

      {/* 6 Months History */}
      <LiquidCard className="section-card">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div className="mini-glass" style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: "#e9b52a" }}>
            <Database size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }}>6 Months Data History</h3>
            <p style={{ fontSize: 11.5, color: "var(--text-dim)", margin: 0 }}>Complete historical data for last 6 months</p>
          </div>
        </div>
        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: isGeneratingHistory ? 0.5 : 1 }} disabled={isGeneratingHistory} onClick={handleViewHistory}>
          {isGeneratingHistory ? <><Loader2 size={14} className="spin" /> Loading...</> : <><Download size={14} /> View History</>}
        </button>
      </LiquidCard>

      {/* History Modal */}
      {showHistoryModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LiquidCard style={{ width: 700, maxHeight: "80vh", overflowY: "auto" }}>
            <div className="section-head">
              <h3>Last 6 Months History</h3>
              <X size={16} style={{ cursor: "pointer" }} onClick={() => setShowHistoryModal(false)} />
            </div>
            {historyLoading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: 30 }}><Loader2 size={26} className="spin" style={{ color: "#e9b52a" }} /></div>
            ) : historyData.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--text-dim)", padding: 20 }}>No history data available</p>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }}>
                {historyData.map((item, index) => (
                  <div key={index} className="mini-glass" style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>{item.month}</p>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>
                        <p style={{ margin: "2px 0" }}>Reviews: {item.count}</p>
                        <p style={{ margin: "2px 0" }}>Avg Rating: {item.avgRating?.toFixed(1) || 'N/A'} ★</p>
                        <p style={{ margin: "2px 0" }}>Response: {item.responseRate || 0}%</p>
                      </div>
                    </div>
                    {canDownload && (
                      <div style={{ padding: 8, cursor: "pointer", color: "#e9b52a" }} onClick={() => handleDownloadMonth(item.month)}>
                        <Download size={16} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </LiquidCard>
        </div>
      )}

      <style jsx>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
