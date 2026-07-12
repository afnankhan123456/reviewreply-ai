"use client";

import React, { useState } from 'react';
import { 
  Search, Filter, RefreshCw, CheckCircle, XCircle, 
  Star, ThumbsUp, ThumbsDown, MoreHorizontal
} from 'lucide-react';

export default function ReviewsPage() {
  // Placeholder state for search/filter (Logic baad mein lagayenge)
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('All');

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto bg-[#0B0E14] text-gray-200">
      
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reviews</h1>
          <p className="text-sm text-gray-400">Manage, filter, and sync all your customer reviews.</p>
        </div>
      </div>

      {/* ========================================== */}
      {/* TOP CARDS SECTION (4 Cards) */}
      {/* ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        
        {/* CARD 1: Review Search & Filter */}
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
          {/* Filter Chips (Placeholder) */}
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Positive</span>
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Negative</span>
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Google</span>
            <span className="text-[10px] bg-[#1F2430] text-gray-400 px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#2A303C]">Facebook</span>
          </div>
        </div>

        {/* CARD 2: Unanswered Reviews Tracking */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
            <XCircle size={14} /> Unanswered Reviews
          </div>
          <div className="flex items-end justify-between mt-2">
            <div className="text-4xl font-bold text-white">18</div>
            <div className="text-[10px] text-yellow-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span> Awaiting Reply
            </div>
          </div>
          <button className="w-full mt-3 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-400 text-xs py-1.5 rounded-lg transition-colors">
            Reply Now →
          </button>
        </div>

        {/* CARD 3: Google Review Sync (With 500 Badge) */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <RefreshCw size={14} /> Google Review Sync
            </div>
            {/* The 500 Badge */}
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
              500
            </span>
          </div>
          <div className="text-[10px] text-gray-500 mt-2">Last synced: 2 hours ago</div>
          <button className="w-full mt-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium py-1.5 rounded-lg transition-colors">
            Sync Now
          </button>
        </div>

        {/* CARD 4: Facebook Review Sync (With 500 Badge) */}
        <div className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
              <RefreshCw size={14} /> Facebook Review Sync
            </div>
            {/* The 500 Badge */}
            <span className="bg-purple-500/20 text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-500/30">
              500
            </span>
          </div>
          <div className="text-[10px] text-gray-500 mt-2">Last synced: 5 hours ago</div>
          <button className="w-full mt-3 bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium py-1.5 rounded-lg transition-colors">
            Sync Now
          </button>
        </div>

      </div>

      {/* ========================================== */}
      {/* BOTTOM SECTION: FULL REVIEW DASHBOARD LIST */}
      {/* ========================================== */}
      <div className="bg-[#11141C] border border-[#1F2430] rounded-xl overflow-hidden">
        
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1F2430] bg-[#181D27]/50 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
          <div className="col-span-4">Customer & Review</div>
          <div className="col-span-2 text-center">Rating</div>
          <div className="col-span-2 text-center">Sentiment</div>
          <div className="col-span-2 text-center">Source</div>
          <div className="col-span-2 text-center">Status / Action</div>
        </div>

        {/* Review Rows */}
        <div className="divide-y divide-[#1F2430]">
          <ReviewRow 
            name="Rohit Sharma"
            text="Very bad experience. Will not come again. The service was extremely slow."
            rating={3}
            sentiment="Negative"
            source="Google"
            status="Unanswered"
          />
          <ReviewRow 
            name="Pooja Mehta"
            text="Service was okay but staff was rude. Not what I expected from this place."
            rating={5}
            sentiment="Neutral"
            source="Facebook"
            status="Replied"
          />
          <ReviewRow 
            name="Amit Verma"
            text="Not satisfied with the product quality. The item was damaged upon delivery."
            rating={2}
            sentiment="Negative"
            source="Google"
            status="Unanswered"
          />
          <ReviewRow 
            name="Sneha Patel"
            text="Absolutely loved the ambiance! Will definitely visit again with friends."
            rating={5}
            sentiment="Positive"
            source="Facebook"
            status="Replied"
          />
          <ReviewRow 
            name="Rahul Singh"
            text="Good value for money. The food was delicious and the staff was friendly."
            rating={4}
            sentiment="Positive"
            source="Google"
            status="Unanswered"
          />
        </div>

        {/* Table Footer / Pagination Placeholder */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-[#1F2430] text-[10px] text-gray-500">
          <span>Showing 1-5 of 1,248 reviews</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Previous</button>
            <button className="px-3 py-1 bg-[#1F2430] rounded hover:bg-[#2A303C]">Next</button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// REUSABLE COMPONENT: Review Row
// ==========================================
function ReviewRow({ name, text, rating, sentiment, source, status }: any) {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-[#181D27] transition-colors">
      
      {/* Col 1: Name & Text */}
      <div className="col-span-4 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-[10px] font-bold">
            {name.split(' ').map((n: string) => n[0]).join('')}
          </div>
          <span className="text-xs text-white font-medium">{name}</span>
        </div>
        <div className="text-[11px] text-gray-400 line-clamp-2">{text}</div>
      </div>

      {/* Col 2: Rating */}
      <div className="col-span-2 flex items-center justify-center gap-1">
        <div className="flex text-[10px] text-yellow-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < rating ? '★' : '☆'}</span>
          ))}
        </div>
      </div>

      {/* Col 3: Sentiment */}
      <div className="col-span-2 flex items-center justify-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
          sentiment === 'Positive' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
          sentiment === 'Negative' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
          'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        }`}>
          {sentiment}
        </span>
      </div>

      {/* Col 4: Source */}
      <div className="col-span-2 flex items-center justify-center">
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
          source === 'Google' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
          'bg-purple-500/10 text-purple-400 border-purple-500/20'
        }`}>
          {source}
        </span>
      </div>

      {/* Col 5: Status / Action */}
      <div className="col-span-2 flex items-center justify-center gap-2">
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
          status === 'Replied' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
        }`}>
          {status}
        </span>
        {status === 'Unanswered' && (
          <button className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-0.5 rounded">
            Reply
          </button>
        )}
      </div>
    </div>
  );
}
