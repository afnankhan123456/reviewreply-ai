"use client";

import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Clock, 
  Loader2, ChevronDown, Database, TrendingUp, TrendingDown, Star, BarChart3
} from 'lucide-react';

export default function ReportsPage() {
  const [isGeneratingMonthly, setIsGeneratingMonthly] = useState(false);
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);
  const [isGeneratingHistory, setIsGeneratingHistory] = useState(false);
  
  const [monthlyFormat, setMonthlyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [weeklyFormat, setWeeklyFormat] = useState<'pdf' | 'csv'>('pdf');
  const [showMonthlyMenu, setShowMonthlyMenu] = useState(false);
  const [showWeeklyMenu, setShowWeeklyMenu] = useState(false);

  const handleDownloadMonthly = async (format: 'pdf' | 'csv') => {
    setIsGeneratingMonthly(true);
    setShowMonthlyMenu(false);
    try {
      const res = await fetch(`/api/standard/reports/monthly?format=${format}`);
      
      if (format === 'csv') {
        // ✅ CSV: Binary file download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `monthly-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // ✅ PDF: Binary file download
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
    setIsGeneratingWeekly(true);
    setShowWeeklyMenu(false);
    try {
      const res = await fetch(`/api/standard/reports/weekly?format=${format}`);
      
      if (format === 'csv') {
        // ✅ CSV: Binary file download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `weekly-report-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // ✅ PDF: Binary file download
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

  const handleDownloadHistory = async () => {
    setIsGeneratingHistory(true);
    try {
      const res = await fetch('/api/standard/reports/history');
      const blob = await res.blob(); // ✅ Binary file download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `history-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download history');
    } finally {
      setIsGeneratingHistory(false);
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

      {/* Reports Cards - Grid with 6 Months History spanning full width */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Monthly Report Card */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">Monthly PDF Report</h3>
              <p className="text-sm text-gray-400">Complete performance summary for the month</p>
            </div>
          </div>
          
          <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Last generated</span>
              <span className="text-gray-300">July 1, 2026</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Total reviews</span>
              <span className="text-gray-300">124</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Avg rating</span>
              <span className="text-gray-300">4.2 ★</span>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMonthlyMenu(!showMonthlyMenu)}
              disabled={isGeneratingMonthly}
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
            
            {showMonthlyMenu && (
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

        {/* Weekly Report Card */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Clock className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">Weekly Performance Report</h3>
              <p className="text-sm text-gray-400">Track weekly performance trends</p>
            </div>
          </div>
          
          <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Last generated</span>
              <span className="text-gray-300">July 12, 2026</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">New reviews</span>
              <span className="text-gray-300">45</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Response rate</span>
              <span className="text-gray-300">76%</span>
            </div>
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowWeeklyMenu(!showWeeklyMenu)}
              disabled={isGeneratingWeekly}
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
            
            {showWeeklyMenu && (
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

        {/* 6 Months Data History Card - Full Width (spanning 2 columns) */}
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
            
            {/* Right Side Stats - Best Month, Worst Month, Trend */}
            <div className="flex gap-6">
              {/* Best Month */}
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  Best Month
                </div>
                <p className="text-white font-bold text-lg">June</p>
                <p className="text-xs text-gray-400">245 reviews</p>
              </div>

              {/* Worst Month */}
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                  <TrendingDown className="w-3 h-3" />
                  Worst Month
                </div>
                <p className="text-white font-bold text-lg">Feb</p>
                <p className="text-xs text-gray-400">89 reviews</p>
              </div>

              {/* Trend */}
              <div className="text-center">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                  <BarChart3 className="w-3 h-3" />
                  Trend
                </div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <p className="text-white font-bold text-lg text-green-400">+12%</p>
                </div>
                <p className="text-xs text-gray-400">Growth</p>
              </div>
            </div>
          </div>
          
          <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Last updated</span>
              <span className="text-gray-300">July 13, 2026</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Total records</span>
              <span className="text-gray-300">1,247</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-400">Date range</span>
              <span className="text-gray-300">Jan - Jun 2026</span>
            </div>
          </div>
          
          <button
            onClick={handleDownloadHistory}
            disabled={isGeneratingHistory}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingHistory ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download History</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Recent Reports List */}
      <div className="mt-6 bg-[#11141C] border border-[#1F2430] rounded-xl p-6">
        <h3 className="text-white font-medium text-lg mb-4">Recent Reports</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-[#181D27] border border-[#2A303C] rounded-lg p-3">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-300">Monthly Report - June 2026</p>
                <p className="text-xs text-gray-500">Generated 3 days ago</p>
              </div>
            </div>
            <button className="text-xs text-indigo-400 hover:text-indigo-300">Download</button>
          </div>
          <div className="flex items-center justify-between bg-[#181D27] border border-[#2A303C] rounded-lg p-3">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-300">Weekly Report - Week 28</p>
                <p className="text-xs text-gray-500">Generated 5 days ago</p>
              </div>
            </div>
            <button className="text-xs text-indigo-400 hover:text-indigo-300">Download</button>
          </div>
        </div>
      </div>

    </div>
  );
}
