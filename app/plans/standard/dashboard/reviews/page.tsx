"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, RefreshCw, CheckCircle, XCircle, 
  Star, ThumbsUp, ThumbsDown, MoreHorizontal
} from 'lucide-react';

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('All');
  const [lastSynced, setLastSynced] = useState('Loading...');
  const [unansweredCount, setUnansweredCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // ✅ NEW: Reviews state
  const [reviews, setReviews] = useState<any[]>([]);

  // ✅ NEW: Reply Modal State
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedReviewText, setSelectedReviewText] = useState(''); // ✅ NEW
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ 1. Fetch reviews from database
      const res = await fetch('/api/test/fetch-reviews'); // <-- ✅ URL FIXED
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }

      // ✅ 2. Fetch unanswered count
      const countRes = await fetch('/api/standard/reviews/unanswered-count'); // <-- FIXED URL
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
        alert('Sync successful!');
        fetchDashboardData();
      } else {
        alert('Sync failed: ' + data.message);
      }
    } catch (error) {
      alert('Error syncing reviews');
    } finally {
      setIsSyncing(false);
    }
  };

  // ✅ NEW: Handle Reply Submission
  const handleReplySubmit = async () => {
    if (!selectedReviewId || !replyText.trim()) return;

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
        alert('Reply sent successfully!');
        setShowReplyModal(false);
        setReplyText('');
        setSelectedReviewId(null);
        setSelectedReviewText('');
        fetchDashboardData(); // ✅ Refresh UI
      } else {
        alert('Failed to send reply: ' + data.message);
      }
    } catch (error) {
      alert('Error sending reply');
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-sm text-gray-400">Manage, filter, and sync all your customer reviews.</p>
        </div>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        
        {/* Card 1: Search & Filter */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <Search size={14} /> Review Search & Filter
          </div>
          <div className="flex gap-2">
            <div className="flex-1 bg-[#181D27] border border-[#2A303C] rounded-lg flex items-center px-3 py-2">
              <Search size={16} className="text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search reviews..." 
                className="bg-transparent border-none outline-none text-sm text-gray-300 w-full placeholder-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="bg-[#181D27] border border-[#2A303C] rounded-lg px-3 py-2 text-gray-400 hover:text-white">
              <Filter size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Positive</span>
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Negative</span>
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Google</span>
          </div>
        </div>

        {/* Card 2: Unanswered Reviews */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <XCircle size={14} /> Unanswered Reviews
          </div>
          <div className="flex items-end justify-between mt-2">
            <div className="text-4xl font-bold text-white">{unansweredCount}</div>
            <div className="text-[10px] text-yellow-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> Awaiting Reply
            </div>
          </div>
          <button className="w-full mt-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs py-1.5 rounded-lg transition-colors">
            Reply Now →
          </button>
        </div>

        {/* Card 3: Google Review Sync */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <RefreshCw size={14} /> Google Review Sync
            </div>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
              500
            </span>
          </div>
          <div className="text-[10px] text-gray-500 mt-2">Last synced: {lastSynced}</div>
        </div>

      </div>

      {/* Reviews Table with Thin Scroll */}
      <div className="bg-[#11141C] border border-[#1F2430] rounded-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1F2430] bg-[#181D27]/50 text-[10px] text-gray-400 font-medium uppercase tracking-wider shrink-0">
          <div className="col-span-4">Customer & Review</div>
          <div className="col-span-2 text-center">Rating</div>
          <div className="col-span-2 text-center">Sentiment</div>
          <div className="col-span-2 text-center">Source</div>
          <div className="col-span-2 text-center">Status / Action</div>
        </div>

        {/* ✅ Scrollable List - DYNAMIC REVIEWS FROM DB */}
        <div className="h-[600px] overflow-y-auto custom-scroll divide-y divide-[#1F2430]">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <ReviewRow 
                key={index}
                reviewId={review.id} // ✅ Pass review ID
                reviewText={review.text || review.comment} // ✅ Pass review text
                name={review.author || review.reviewerName}
                text={review.text || review.comment}
                rating={review.rating}
                sentiment={review.rating >= 4 ? 'Positive' : review.rating >= 3 ? 'Neutral' : 'Negative'}
                source={review.source}
                status={review.replied ? 'Replied' : 'Unanswered'}
                onReplyClick={(id, text) => {
                  setSelectedReviewId(id);
                  setSelectedReviewText(text);
                  setShowReplyModal(true);
                }}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">No reviews found. Run the test API to add dummy data.</div>
          )}
        </div>

        {/* Footer / Pagination */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-[#1F2430] text-[10px] text-gray-500 shrink-0">
          <span>Showing {reviews.length} reviews</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Previous</button>
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Next</button>
          </div>
        </div>

      </div>

      {/* ✅ PROFESSIONAL REPLY MODAL WITH REVIEW TEXT */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6 w-[600px] shadow-2xl">
            <h3 className="text-white text-lg font-medium mb-3">Reply to Review</h3>
            
            {/* ✅ SHOW THE ORIGINAL REVIEW TEXT */}
            <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-3 mb-4">
              <p className="text-xs text-gray-400 mb-1">Original Review:</p>
              <p className="text-sm text-gray-200">{selectedReviewText}</p>
            </div>

            <textarea
              className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg p-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
              rows={4}
              placeholder="Write your professional reply here..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 bg-[#1F2430] text-gray-400 rounded-lg hover:bg-[#2A303C] transition-colors"
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

// ✅ UPDATED ReviewRow Component with reviewId, reviewText, and onReplyClick
function ReviewRow({ reviewId, reviewText, name, text, rating, sentiment, source, status, onReplyClick }: any) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#181D27] transition-colors">
      <div className="col-span-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-[10px] font-bold">
            {name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-xs text-white font-medium">{name}</span>
        </div>
        <div className="text-[11px] text-gray-400 line-clamp-2">{text}</div>
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
        {status === 'Unanswered' && (
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
