"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Tag, X, Plus, ArrowLeft, RefreshCw } from 'lucide-react';
import { getTagSummary, getReviewsByTag, addTag, removeTag } from './actions';

export default function TagsCategoriesPage() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || 'OWNER';
  const canEditTags = teamRole !== 'VIEW_ONLY';

  const [summary, setSummary] = useState<{ tag: string; count: number }[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [untaggedCount, setUntaggedCount] = useState(0);
  const [loadingSummary, setLoadingSummary] = useState(true);

  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const [newTagInput, setNewTagInput] = useState<Record<string, string>>({});

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
    fetchSummary();
  }, []);

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-gray-200";
  const bgCard = theme === "light" ? "bg-white border-gray-200" : "bg-[#11141C] border-[#1F2430]";
  const textPrimary = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-500" : "text-gray-500";
  const buttonSecBg = theme === "light" ? "bg-gray-100 hover:bg-gray-200 text-gray-700" : "bg-[#1F2430] hover:bg-[#2A303C] text-gray-400";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500" : "bg-[#181D27] border-[#2A303C] text-gray-300 placeholder-gray-500 focus:border-indigo-500";
  const tagPill = "text-[10px] px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"; // keep accent
  const plusButtonBg = theme === "light" ? "bg-gray-100 hover:bg-gray-200" : "bg-[#1F2430] hover:bg-[#2A303C]";
  const loadMoreBg = theme === "light" ? "bg-gray-200 hover:bg-gray-300 text-gray-700" : "bg-[#1F2430] hover:bg-[#2A303C] text-gray-300";

  const fetchSummary = async () => {
    setLoadingSummary(true);
    const result = await getTagSummary();
    if (result.success) {
      setSummary(result.summary);
      setTotalCount(result.totalCount);
      setUntaggedCount(result.untaggedCount);
    }
    setLoadingSummary(false);
  };

  const openTag = async (tag: string | null) => {
    setActiveTag(tag);
    setPage(1);
    setReviews([]);
    setLoadingReviews(true);
    const result = await getReviewsByTag(tag, 1);
    if (result.success) {
      setReviews(result.reviews);
      setHasMore(result.hasMore);
    }
    setLoadingReviews(false);
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setLoadingReviews(true);
    const result = await getReviewsByTag(activeTag, nextPage);
    if (result.success) {
      setReviews((prev) => [...prev, ...result.reviews]);
      setHasMore(result.hasMore);
      setPage(nextPage);
    }
    setLoadingReviews(false);
  };

  const handleAddTag = async (reviewId: string) => {
    if (!canEditTags) return;
    const tagValue = newTagInput[reviewId];
    if (!tagValue || !tagValue.trim()) return;
    const result = await addTag(reviewId, tagValue);
    if (result.success) {
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, tags: result.tags } : r)));
      setNewTagInput((prev) => ({ ...prev, [reviewId]: '' }));
      fetchSummary();
    }
  };

  const handleRemoveTag = async (reviewId: string, tag: string) => {
    if (!canEditTags) return;
    const result = await removeTag(reviewId, tag);
    if (result.success) {
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, tags: result.tags } : r)));
      fetchSummary();
    }
  };

  // Summary view (default screen)
  if (activeTag === null) {
    return (
      <div className={`min-h-screen ${bgMain} p-6 ${textMain}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 bg-indigo-500 rounded-full"></div>
            <div>
              <h1 className={`text-2xl font-bold ${textPrimary}`}>Tags & Categories</h1>
              <p className={`${textMuted} text-sm mt-1`}>{totalCount} total reviews, categorized automatically</p>
            </div>
          </div>
          <button onClick={fetchSummary} className={`p-2 rounded-lg ${buttonSecBg}`}>
            <RefreshCw size={16} />
          </button>
        </div>

        {loadingSummary ? (
          <div className={`text-center ${textMuted} py-10`}>Loading summary...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {summary.map((item) => (
              <button
                key={item.tag}
                onClick={() => openTag(item.tag)}
                className={`${bgCard} border rounded-xl p-4 text-left hover:border-indigo-500/40 transition-colors`}
              >
                <div className="flex items-center gap-2 text-indigo-400 mb-2">
                  <Tag size={14} />
                  <span className="text-sm font-medium">{item.tag}</span>
                </div>
                <div className={`text-2xl font-bold ${textPrimary}`}>{item.count}</div>
              </button>
            ))}

            {untaggedCount > 0 && (
              <button
                onClick={() => openTag('__untagged__')}
                className={`${bgCard} border rounded-xl p-4 text-left hover:border-gray-500/40 transition-colors`}
              >
                <div className={`flex items-center gap-2 mb-2 ${textMuted}`}>
                  <Tag size={14} />
                  <span className="text-sm font-medium">Untagged</span>
                </div>
                <div className={`text-2xl font-bold ${textPrimary}`}>{untaggedCount}</div>
              </button>
            )}
          </div>
        )}

        {!loadingSummary && summary.length === 0 && untaggedCount === 0 && (
          <div className={`text-center ${textMuted} text-sm py-10`}>No reviews yet.</div>
        )}
      </div>
    );
  }

  // Drilled-down review list view
  return (
    <div className={`min-h-screen ${bgMain} p-6 ${textMain}`}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setActiveTag(null)} className={`p-2 rounded-lg ${buttonSecBg}`}>
          <ArrowLeft size={16} />
        </button>
        <div>
          <h1 className={`text-xl font-bold ${textPrimary}`}>
            {activeTag === '__untagged__' ? 'Untagged Reviews' : activeTag}
          </h1>
        </div>
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div key={review.id} className={`${bgCard} border rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`${textPrimary} text-sm font-medium`}>{review.reviewerName}</span>
              <span className="text-yellow-500 text-xs">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </span>
            </div>
            <p className={`${textSecondary} text-sm mb-3`}>{review.comment || 'No comment'}</p>

            <div className="flex flex-wrap items-center gap-2">
              {review.tags.map((tag: string) => (
                <span
                  key={tag}
                  className={tagPill}
                >
                  {tag}
                  {canEditTags && (
                    <button onClick={() => handleRemoveTag(review.id, tag)}>
                      <X size={10} className="hover:text-red-400" />
                    </button>
                  )}
                </span>
              ))}

              {canEditTags && (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="Add tag..."
                    value={newTagInput[review.id] || ''}
                    onChange={(e) => setNewTagInput((prev) => ({ ...prev, [review.id]: e.target.value }))}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleAddTag(review.id); }}
                    className={`text-[10px] border rounded-full px-2 py-1 w-24 outline-none ${inputBg}`}
                  />
                  <button onClick={() => handleAddTag(review.id)} className={`p-1 rounded-full ${plusButtonBg} text-gray-400`}>
                    <Plus size={12} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {reviews.length === 0 && !loadingReviews && (
          <div className={`text-center ${textMuted} text-sm py-10`}>No reviews found.</div>
        )}

        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loadingReviews}
            className={`w-full py-2.5 text-sm rounded-xl disabled:opacity-50 ${loadMoreBg}`}
          >
            {loadingReviews ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
}
