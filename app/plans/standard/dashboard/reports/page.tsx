"use client";

import React, { useState } from 'react';
import { 
  FileText, Download, Calendar, Clock, CheckCircle, 
  Loader2, AlertCircle
} from 'lucide-react';

export default function ReportsPage() {
  const [isGeneratingMonthly, setIsGeneratingMonthly] = useState(false);
  const [isGeneratingWeekly, setIsGeneratingWeekly] = useState(false);

  const handleDownloadMonthly = async () => {
    setIsGeneratingMonthly(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingMonthly(false);
      alert('Monthly report downloaded successfully!');
    }, 1500);
  };

  const handleDownloadWeekly = async () => {
    setIsGeneratingWeekly(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingWeekly(false);
      alert('Weekly report downloaded successfully!');
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reports</h1>
          <p className="text-sm text-gray-400">Download detailed performance reports in PDF format.</p>
        </div>
      </div>

      {/* Reports Cards */}
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
          
          <button
            onClick={handleDownloadMonthly}
            disabled={isGeneratingMonthly}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingMonthly ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Monthly Report</span>
              </>
            )}
          </button>
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
          
          <button
            onClick={handleDownloadWeekly}
            disabled={isGeneratingWeekly}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingWeekly ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Weekly Report</span>
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
