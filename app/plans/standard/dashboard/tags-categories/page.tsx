"use client";

import React, { useState, useEffect } from 'react';
import { Tag, X, Plus } from 'lucide-react';
import { getTaggedReviews, addTag, removeTag } from './actions';

export default function TagsCategoriesPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [newTagInput, setNewTagInput] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const result = await getTaggedReviews();
    if (result.success) {
      setReviews(result.reviews);
    }
    setLoading(false);
  };

  const allTags = Array.from(new Set(reviews.flatMap((r) => r.tags)));

  const filteredReviews = activeFilter
    ? reviews.filter((r) => r.tags.includes(activeFilter))
    : reviews;

  const handleAddTag = async (reviewId: string) => {
    const tag = newTagInput[reviewId];
    if (!tag || !tag.trim()) return;

    const result = await addTag(reviewId, tag);
    if (result.success) {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, tags: result.tags } : r))
      );
      setNewTagInput((prev) => ({ ...prev, [reviewId]: '' }));
    }
  };

  const handleRemoveTag = async (reviewId: string, tag: string) => {
    const result = await removeTag(reviewId, tag);
    if (result.success) {
      setReviews((prev) =>
        prev.map((r) => (r.id === reviewId ? { ...r, tags: result.tags } : r))
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E14] p-6 flex items-center justify-center text-gray-400">
        Loading tags...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0E14] p-6 text-gray-200">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
        <div>
          <h1 className="text-2xl font-bold text-white">Tags & Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Reviews ko automatically aur manually tag karo, filter karke dekho</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveFilter(null)}
          className={`text-xs px-3 py-1.5 rounded-full border ${
            activeFilter === null
              ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
              : 'bg-[#1F2430] text-gray-400 border-transparent hover:bg-[#2A303C]'
          }`}
        >
          All ({reviews.length})
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            className={`text-xs px-3 py-1.5 rounded-full border flex items-center gap-1 ${
              activeFilter === tag
                ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
                : 'bg-[#1F2430] text-gray-400 border-transparent hover:bg-[#2A303C]'
            }`}
          >
            <Tag size={10} /> {tag} ({reviews.filter((r) => r.tags.includes(tag)).length})
          </button>
        ))}
      </div>

      {/* Reviews list */}
      <div className="space-y-3">
        {filteredReviews.length === 0 ? (
          <div className="text-center text-gray-500 text-sm py-10 bg-[#11141C] rounded-xl border border-[#1F2430]">
            No reviews found.
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-[#11141C] border border-[#1F2430] rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-sm font-medium">{review.reviewerName}</span>
                <span className="text-yellow-500 text-xs">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">{review.comment || 'No comment'}</p>

              <div className="flex flex-wrap items-center gap-2">
                {review.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  >
                    {tag}
                    <button onClick={() => handleRemoveTag(review.id, tag)}>
                      <X size={10} className="hover:text-red-400" />
                    </button>
                  </span>
                ))}

                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={newTagInput[review.id] || ''}
                    onChange={(e) =>
                      setNewTagInput((prev) => ({ ...prev, [review.id]: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTag(review.id);
                    }}
                    className="text-[10px] bg-[#181D27] border border-[#2A303C] rounded-full px-2 py-1 text-gray-300 w-24 outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={() => handleAddTag(review.id)}
                    className="p-1 rounded-full bg-[#1F2430] hover:bg-[#2A303C] text-gray-400"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
