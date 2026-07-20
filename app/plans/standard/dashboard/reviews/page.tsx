"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { 
  Search, Filter, RefreshCw, CheckCircle, XCircle, 
  Star, ThumbsUp, ThumbsDown, MoreHorizontal
} from 'lucide-react';

export default function ReviewsPage() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || 'OWNER';
  const canReply = teamRole !== 'VIEW_ONLY';

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('All');
  const [lastSynced, setLastSynced] = useState('Loading...');
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [replyText, setReplyText] = useState('');

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // ✅ Theme state
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

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchDashboardData = async () => {
    try {
      const [reviewsRes, countRes] = await Promise.all([
        fetch('/api/standard/reviews/list'),
        fetch('/api/standard/reviews/unanswered-count')
      ]);

      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) setReviews(reviewsData.reviews);

      const countData = await countRes.json();
      setUnansweredCount(countData.count || 0);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/standard/google/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setToast({ message: 'Sync successful!', type: 'success' });
        fetchDashboardData();
      } else {
        setToast({ message: 'Sync failed: ' + data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error syncing reviews', type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleReplySubmit = async () => {
    if (!canReply || !selectedReviewId || !replyText.trim()) return;

    try {
      const res = await fetch('/api/standard/reviews/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewId: selectedReviewId,
          replyText: replyText,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setToast({ message: '✅ Reply sent successfully!', type: 'success' });
        setShowReplyModal(false);
        setReplyText('');
        setSelectedReviewId(null);
        setSelectedReviewText('');
        fetchDashboardData();
      } else {
        setToast({ message: 'Failed to send reply: ' + data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error sending reply', type: 'error' });
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const name = review.author || review.reviewerName || '';
    const text = review.text || review.comment || '';
    const source = review.source || '';
    const rating = review.rating || 0;

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesSentiment = true;
    if (filterSentiment === 'Positive') matchesSentiment = rating >= 4;
    else if (filterSentiment === 'Negative') matchesSentiment = rating <= 2;
    else if (filterSentiment === 'Neutral') matchesSentiment = rating === 3;
    else if (filterSentiment === 'Google') matchesSentiment = source.toLowerCase() === 'google';
    else if (filterSentiment === 'Facebook') matchesSentiment = source.toLowerCase() === 'facebook';

    return matchesSearch && matchesSentiment;
  });

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-200";
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const bgSubCard = theme === "light" ? "bg-gray-50 border-gray-200" : "bg-[#181D27] border-[#2A303C]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-400" : "text-gray-500";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400" : "bg-[#181D27] border-[#2A303C] text-gray-300 placeholder-gray-500";
  const buttonBg = theme === "light" ? "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200" : "bg-[#181D27] border-[#2A303C] text-gray-400 hover:text-white hover:bg-[#222633]";
  const pillInactive = theme === "light" ? "bg-gray-100 text-gray-600 border-gray-300" : "bg-[#1F2430] text-gray-400 border-[#2A303C]";
  const tableHeaderBg = theme === "light" ? "bg-gray-50/50" : "bg-[#181D27]/50";
  const rowHover = theme === "light" ? "hover:bg-gray-100" : "hover:bg-[#181D27]";
  const borderLight = theme === "light" ? "border-gray-200" : "border-[#1F2430]";
  const divider = theme === "light" ? "divide-gray-200" : "divide-[#1F2430]";
  const modalBg = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";

  return (
    <div className={`flex-1 flex flex-col p-6 overflow-y-auto transition-colors duration-300 ${bgMain} ${textMain}`}>
      
      {/* Toast Notification */}
      {toast && (
        <div 
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 ${
            toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>Reviews</h1>
          <p className={`text-sm ${textSecondary}`}>Manage, filter, and sync all your customer reviews.</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1: Search & Filter */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col gap-3`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium`}>
            <Search size={14} /> Review Search & Filter
          </div>
          <div className="flex gap-2">
            <div className={`flex-1 border rounded-lg flex items-center px-3 py-2 ${inputBg}`}>
              <Search size={16} className={`${textMuted} mr-2`} />
              <input 
                type="text" 
                placeholder="Search reviews..." 
                className="bg-transparent border-none outline-none text-sm w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className={`${buttonBg} border rounded-lg px-3 py-2`}>
              <Filter size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {['Positive', 'Negative', 'Google', 'All'].map((sentiment) => (
              <span 
                key={sentiment}
                className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                  filterSentiment === sentiment 
                    ? sentiment === 'Positive' ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : sentiment === 'Negative' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : sentiment === 'Google' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : pillInactive
                }`}
                onClick={() => setFilterSentiment(sentiment)}
              >
                {sentiment}
              </span>
            ))}
          </div>
        </div>

        {/* Card 2: Unanswered Reviews */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium`}>
            <XCircle size={14} /> Unanswered Reviews
          </div>
          <div className="flex items-end justify-between mt-2">
            <div className={`text-4xl font-bold ${textPrimary}`}>{unansweredCount}</div>
            <div className="text-[10px] text-yellow-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> Awaiting Reply
            </div>
          </div>
          {canReply && (
            <button className="w-full mt-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs py-1.5 rounded-lg transition-colors">
              Reply Now →
            </button>
          )}
        </div>

        {/* Card 3: Google Review Sync */}
        <div className={`${bgCard} border rounded-xl p-4 flex flex-col justify-between`}>
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-2 ${textSecondary} text-xs font-medium`}>
              <RefreshCw size={14} /> Google Review Sync
            </div>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
              500
            </span>
          </div>
          <div className={`text-[10px] ${textMuted} mt-2`}>Last synced: {lastSynced}</div>
        </div>

      </div>

      {/* Reviews Table */}
      <div className={`${bgCard} border rounded-xl overflow-hidden flex flex-col`}>
        
        {/* Header */}
        <div className={`grid grid-cols-12 gap-4 px-6 py-3 border-b ${borderLight} ${tableHeaderBg} text-[10px] text-gray-400 font-medium uppercase tracking-wider shrink-0`}>
          <div className="col-span-4">Customer & Review</div>
          <div className="col-span-2 text-center">Rating</div>
          <div className="col-span-2 text-center">Sentiment</div>
          <div className="col-span-2 text-center">Source</div>
          <div className="col-span-2 text-center">Status / Action</div>
        </div>

        <div className={`h-[600px] overflow-y-auto custom-scroll ${divider}`}>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, index) => (
              <ReviewRow 
                key={index}
                reviewId={review.id}
                reviewText={review.text || review.comment}
                name={review.author || review.reviewerName}
                text={review.text || review.comment}
                rating={review.rating}
                sentiment={review.rating >= 4 ? 'Positive' : review.rating >= 3 ? 'Neutral' : 'Negative'}
                source={review.source}
                status={review.replied ? 'Replied' : 'Unanswered'}
                canReply={canReply}
                onReplyClick={(id, text) => {
                  setSelectedReviewId(id);
                  setSelectedReviewText(text);
                  setShowReplyModal(true);
                }}
                theme={theme}
              />
            ))
          ) : (
            <div className={`p-6 text-center ${textMuted} text-sm`}>No matching reviews found.</div>
          )}
        </div>

        <div className={`flex justify-between items-center px-6 py-4 border-t ${borderLight} text-[10px] ${textMuted} shrink-0`}>
          <span>Showing {filteredReviews.length} reviews</span>
          <div className="flex gap-2">
            <button className={`px-3 py-1 rounded ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-[#1F2430] hover:bg-[#2A303C] text-gray-400"}`}>Previous</button>
            <button className={`px-3 py-1 rounded ${theme === "light" ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-[#1F2430] hover:bg-[#2A303C] text-gray-400"}`}>Next</button>
          </div>
        </div>

      </div>

      {/* Reply Modal */}
      {showReplyModal && canReply && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className={`${modalBg} border rounded-xl p-6 w-[600px] shadow-2xl`}>
            <h3 className={`text-lg font-medium ${textPrimary} mb-3`}>Reply to Review</h3>
            
            <div className={`${bgSubCard} border rounded-lg p-3 mb-4`}>
              <p className={`text-xs ${textSecondary} mb-1`}>Original Review:</p>
              <p className={`text-sm ${textPrimary}`}>{selectedReviewText}</p>
            </div>

            <textarea
              className={`w-full border rounded-lg p-3 text-sm focus:outline-none focus:border-indigo-500 resize-none ${inputBg}`}
              rows={4}
              placeholder="Write your professional reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  theme === "light" 
                    ? "bg-gray-200 text-gray-700 hover:bg-gray-300" 
                    : "bg-[#1F2430] text-gray-400 hover:bg-[#2A303C]"
                }`}
                onClick={() => {
                  setShowReplyModal(false);
                  setReplyText('');
                  setSelectedReviewId(null);
                  setSelectedReviewText('');
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleReplySubmit}
                disabled={!replyText.trim()}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReviewRow({ reviewId, reviewText, name, text, rating, sentiment, source, status, canReply, onReplyClick, theme }: any) {
  const rowBg = theme === "light" ? "hover:bg-gray-100" : "hover:bg-[#181D27]";
  const nameColor = theme === "light" ? "text-gray-900" : "text-white";
  const textColor = theme === "light" ? "text-gray-600" : "text-gray-400";
  const avatarBg = "bg-blue-900 text-blue-300"; // keep accent

  return (
    <div className={`grid grid-cols-12 gap-4 px-6 py-4 transition-colors ${rowBg}`}>
      <div className="col-span-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full ${avatarBg} flex items-center justify-center text-[10px] font-bold`}>
            {name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className={`text-xs font-medium ${nameColor}`}>{name}</span>
        </div>
        <div className={`text-[11px] ${textColor} line-clamp-2`}>{text}</div>
      </div>
      <div className="col-span-2 flex items-center justify-center gap-1">
        <div className="flex text-[10px] text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? '★' : '☆'}</span>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
          sentiment === 'Positive' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
          sentiment === 'Negative' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        }`}>
          {sentiment}
        </span>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
          source === 'Google' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
          'bg-purple-500/10 text-purple-400 border-purple-500/20'
        }`}>
          {source}
        </span>
      </div>
      <div className="col-span-2 flex items-center justify-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
          status === 'Replied' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {status}
        </span>
        {status === 'Unanswered' && canReply && (
          <button 
            className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-0.5 rounded"
            onClick={() => onReplyClick(reviewId, reviewText)}
          >
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
