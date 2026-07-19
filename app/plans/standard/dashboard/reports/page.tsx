"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  FileText, Download, Calendar, Clock, 
  Loader2, ChevronDown, Database, TrendingUp, TrendingDown, Star, BarChart3
} from 'lucide-react';

export default function ReportsPage() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || 'OWNER';
  const canDownload = teamRole !== 'VIEW_ONLY'; // View Only sirf dekh sakta hai, download nahi

  const [isGeneratingMonthly, setIsGeneratingMonthly] = useState(false);
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);
  const [isGeneratingHistory, setIsGeneratingHistory] = useState(false);
  
  const [monthlyFormat, setMonthlyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [weeklyFormat, setWeeklyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [showMonthlyMenu, setShowMonthlyMenu] = useState(false);
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);

  // ✅ History data states
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  // ✅ Hardcoded N/A data (always shows N/A)
  const monthlyData = null;
  const weeklyData = null;
  const loading = false;

  const handleDownloadMonthly = async (format: 'pdf' | 'csv') => {
    if (!canDownload) return;
    setIsGeneratingMonthly(true);
    setShowMonthlyMenu(false);
    try {
      const res = await fetch(`/api/standard/reports/monthly?format=${format}`);
      
      if (format === 'csv') {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `monthly-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `monthly-report-${new Date().toISOString().split('T')[0]}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
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
      
      if (format === 'csv') {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download report');
    } finally {
      setIsGeneratingWeekly(false);
    }
  };

  // ✅ View History - Direct fetch (no queue) — sirf viewing hai, View Only bhi kar sakta hai
  const handleViewHistory = async () => {
    setIsGeneratingHistory(true);
    setHistoryLoading(true);
    try {
      const res = await fetch('/api/standard/reports/history');
      const data = await res.json();
      
      if (data.success) {
        const sortedData = data.data.monthlyData.sort((a: any, b: any) => 
          new Date(b.month).getTime() - new Date(a.month).getTime()
        );
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

  // ✅ Download specific month - Direct (no queue)
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
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-gray-400">Download detailed performance reports in PDF or CSV format.</p>
        </div>
      </div>

      {!canDownload && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-sm text-yellow-400">
          You have view-only access. Only the account owner or a Full Access member can download reports.
        </div>
      )}

      {/* Reports Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Monthly Report Card */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <Calendar className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Monthly PDF Report</h3>
                <p className="text-sm text-gray-400">Complete performance summary for the month</p>
              </div>
            </div>
            
            <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-300 leading-relaxed">
                Thank you for your continued trust.<br />
                ReviewReply AI – Empowering businesses with insights.
              </p>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowMonthlyMenu(!showMonthlyMenu)}
                disabled={isGeneratingMonthly || !canDownload}
                className="w-full flex items-center justify-between gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isGeneratingMonthly ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download ({monthlyFormat.toUpperCase()})</span>
                    </>
                  )}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showMonthlyMenu && canDownload && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1A1F2E] border border-[#2A303C] rounded-lg shadow-lg overflow-hidden z-10">
                  <button
                    onClick={() => handleDownloadMonthly('pdf')}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2A303C] text-gray-300 text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownloadMonthly('csv')}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2A303C] text-gray-300 text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weekly Report Card */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6 flex flex-col">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">Weekly Performance Report</h3>
                <p className="text-sm text-gray-400">Track weekly performance trends</p>
              </div>
            </div>
            
            <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-4 text-center">
              <p className="text-sm text-gray-300 leading-relaxed">
                Thank you for your continued trust.<br />
                ReviewReply AI – Empowering businesses with insights.
              </p>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowWeeklyMenu(!showWeeklyMenu)}
                disabled={isGeneratingWeekly || !canDownload}
                className="w-full flex items-center justify-between gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  {isGeneratingWeekly ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Download ({weeklyFormat.toUpperCase()})</span>
                    </>
                  )}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showWeeklyMenu && canDownload && (
                <div className="absolute bottom-full left-0 w-full mb-2 bg-[#1A1F2E] border border-[#2A303C] rounded-lg shadow-lg overflow-hidden z-10">
                  <button
                    onClick={() => handleDownloadWeekly('pdf')}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2A303C] text-gray-300 text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => handleDownloadWeekly('csv')}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-[#2A303C] text-gray-300 text-sm transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    CSV
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6 Months Data History Card - Full Width */}
        <div className="md:col-span-2 bg-[#11141C] border border-[#1F2430] rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/20 rounded-lg">
                <Database className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-medium text-lg">6 Months Data History</h3>
                <p className="text-sm text-gray-400">Complete historical data for last 6 months</p>
              </div>
            </div>
            
            {/* ✅ Best/Worst/Trend section REMOVED */}
          </div>
          
          <button
            onClick={handleViewHistory}
            disabled={isGeneratingHistory}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingHistory ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>View History</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-xl">Last 6 Months History</h2>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            {historyLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              </div>
            ) : historyData.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                No history data available
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {historyData.map((item, index) => (
                  <div key={index} className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-white font-medium">{item.month}</p>
                        <div className="text-sm text-gray-400 mt-1">
                          <p>Reviews: {item.count}</p>
                          <p>Avg Rating: {item.avgRating?.toFixed(1) || 'N/A'} ★</p>
                          <p>Response: {item.responseRate || 0}%</p>
                        </div>
                      </div>
                      {canDownload && (
                        <button
                          onClick={() => handleDownloadMonth(item.month)}
                          className="p-2 bg-amber-600 hover:bg-amber-500 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
