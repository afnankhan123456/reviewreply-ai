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
  
  const [reviews, setReviews] = useState<any[]>([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null);
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [replyText, setReplyText] = useState('');

  // ✅ Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ Auto-hide toast after 2 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchDashboardData = async () => {
    try {
      // ✅ PARALLEL FETCHING (Promise.all) - Fast load
      const [reviewsRes, countRes] = await Promise.all([
        fetch('/api/test/fetch-reviews'),
        fetch('/api/standard/reviews/unanswered-count')
      ]);

      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) {
        setReviews(reviewsData.reviews);
      }

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

  // ✅ Filter Logic
  const filteredReviews = reviews.filter((review) => {
    const name = review.author || review.reviewerName || '';
    const text = review.text || review.comment || '';
    const source = review.source || '';
    const rating = review.rating || 0;

    // Search filter (name ya text)
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      text.toLowerCase().includes(searchTerm.toLowerCase());

    // Sentiment filter
    let matchesSentiment = true;
    if (filterSentiment === 'Positive') {
      matchesSentiment = rating >= 4;
    } else if (filterSentiment === 'Negative') {
      matchesSentiment = rating <= 2;
    } else if (filterSentiment === 'Neutral') {
      matchesSentiment = rating === 3;
    } else if (filterSentiment === 'Google') {
      matchesSentiment = source.toLowerCase() === 'google';
    } else if (filterSentiment === 'Facebook') {
      matchesSentiment = source.toLowerCase() === 'facebook';
    }

    return matchesSearch && matchesSentiment;
  });

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
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
            <span 
              className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                filterSentiment === 'Positive' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-[#1F2430] text-gray-400 hover:bg-[#2A303C]'
              }`}
              onClick={() => setFilterSentiment('Positive')}
            >
              Positive
            </span>
            <span 
              className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                filterSentiment === 'Negative' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-[#1F2430] text-gray-400 hover:bg-[#2A303C]'
              }`}
              onClick={() => setFilterSentiment('Negative')}
            >
              Negative
            </span>
            <span 
              className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                filterSentiment === 'Google' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-[#1F2430] text-gray-400 hover:bg-[#2A303C]'
              }`}
              onClick={() => setFilterSentiment('Google')}
            >
              Google
            </span>
            <span 
              className={`text-[10px] px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                filterSentiment === 'All' 
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' 
                  : 'bg-[#1F2430] text-gray-400 hover:bg-[#2A303C]'
              }`}
              onClick={() => setFilterSentiment('All')}
            >
              All
            </span>
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

        <div className="h-[600px] overflow-y-auto custom-scroll divide-y divide-[#1F2430]">
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
                onReplyClick={(id, text) => {
                  setSelectedReviewId(id);
                  setSelectedReviewText(text);
                  setShowReplyModal(true);
                }}
              />
            ))
          ) : (
            <div className="p-6 text-center text-gray-500 text-sm">No matching reviews found.</div>
          )}
        </div>

        <div className="flex justify-between items-center px-6 py-4 border-t border-[#1F2430] text-[10px] text-gray-500 shrink-0">
          <span>Showing {filteredReviews.length} reviews</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Previous</button>
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Next</button>
          </div>
        </div>

      </div>

      {/* Reply Modal */}
      {showReplyModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-6 w-[600px] shadow-2xl">
            <h3 className="text-white text-lg font-medium mb-3">Reply to Review</h3>
            
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
