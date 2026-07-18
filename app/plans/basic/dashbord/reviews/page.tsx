"use client";

import { useEffect, useState } from "react";
import {
  Star,
  MessageSquare,
  Reply,
  TrendingUp,
  Search,
  X,
} from "lucide-react";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // View modal state
  const [selectedReview, setSelectedReview] = useState<any | null>(null);

  // Reply state
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error("Failed to load reviews", err);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  // Stats calculations from real data
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;
  const repliedCount = reviews.filter((r) => r.replied).length;
  const growth = totalReviews > 0 ? "+0%" : "0%";

  // Filter by search
  const filteredReviews = reviews.filter(
    (r) =>
      r.reviewerName?.toLowerCase().includes(search.toLowerCase()) ||
      r.comment?.toLowerCase().includes(search.toLowerCase())
  );

  // Handle view button
  const handleView = (review: any) => {
    setSelectedReview(review);
  };

  // Handle reply button
  const handleReplyClick = (reviewId: string) => {
    setReplyingTo(reviewId);
    setReplyText("");
  };

  const handleSubmitReply = async (reviewId: string) => {
    if (!replyText.trim()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/reviews/${reviewId}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText }),
      });
      const data = await res.json();
      if (data.success) {
        // Update local state to reflect the reply
        setReviews((prev) =>
          prev.map((r) =>
            r.id === reviewId
              ? { ...r, reviewReply: replyText, replied: true }
              : r
          )
        );
        setReplyingTo(null);
        setReplyText("");
      } else {
        alert(data.error || "Failed to submit reply");
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Reviews
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2">
            Manage and monitor all customer reviews.
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 w-full lg:w-[320px] transition-colors duration-300">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none text-sm bg-transparent text-black dark:text-white placeholder:text-zinc-400"
          />
        </div>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {/* CARD 1 – Total Reviews */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Total Reviews
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : totalReviews}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* CARD 2 – Average Rating */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Average Rating
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : averageRating.toFixed(1)}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-yellow-100 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
        </div>

        {/* CARD 3 – Replied Reviews */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Replied Reviews
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {loading ? "..." : repliedCount}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center">
              <Reply className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* CARD 4 – Review Growth */}
        <div className="bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 p-5 shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Review Growth
              </p>
              <h2 className="text-3xl font-bold text-black dark:text-white mt-2">
                {growth}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* REVIEWS LIST */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl border border-zinc-200 dark:border-zinc-700 p-6 shadow-sm mt-8 transition-colors duration-300">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-black dark:text-white">
              Recent Reviews
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Latest customer feedback and ratings.
            </p>
          </div>
        </div>

        {/* SCROLLABLE LIST WRAPPER — isi se page lamba hona band hoga */}
        <div className="space-y-5 max-h-[600px] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-zinc-500 text-center py-8">Loading reviews...</p>
          ) : filteredReviews.length === 0 ? (
            <p className="text-zinc-500 text-center py-8">No reviews found.</p>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-5 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex gap-4">
                  {/* PROFILE */}
                  <div className="w-14 h-14 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-lg font-bold text-zinc-600 dark:text-zinc-300 flex-shrink-0">
                    {review.reviewerName?.charAt(0) || "?"}
                  </div>

                  {/* CONTENT */}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-black dark:text-white">
                        {review.reviewerName || "Anonymous"}
                      </h3>
                      <div className="flex items-center gap-1">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-zinc-300 dark:text-zinc-600"
                              }`}
                            />
                          ))}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-2xl">
                      {review.comment || "No comment"}
                    </p>

                    <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-3">
                      {new Date(review.reviewDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-3">
                  {!review.replied && (
                    <button
                      onClick={() => handleReplyClick(review.id)}
                      className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-500/30 transition"
                    >
                      Reply
                    </button>
                  )}
                  <button
                    onClick={() => handleView(review)}
                    className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 text-sm font-medium hover:bg-zinc-200 dark:hover:bg-zinc-600 transition"
                  >
                    View
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* VIEW MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full max-w-lg mx-4 shadow-xl relative">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Review Details
            </h2>
            <div className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <p><span className="font-medium">Name:</span> {selectedReview.reviewerName || "Anonymous"}</p>
              <p><span className="font-medium">Rating:</span> {selectedReview.rating} ⭐</p>
              <p><span className="font-medium">Comment:</span> {selectedReview.comment || "No comment"}</p>
              {selectedReview.reviewReply && (
                <p><span className="font-medium">Reply:</span> {selectedReview.reviewReply}</p>
              )}
              <p><span className="font-medium">Date:</span> {new Date(selectedReview.reviewDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MODAL / FORM */}
      {replyingTo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 w-full max-w-md mx-4 shadow-xl relative">
            <button
              onClick={() => setReplyingTo(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-black dark:text-white mb-4">
              Reply to Review
            </h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply..."
              rows={4}
              className="w-full border border-zinc-200 dark:border-zinc-600 rounded-xl p-3 bg-transparent text-black dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSubmitReply(replyingTo)}
              disabled={submitting || !replyText.trim()}
              className="mt-4 w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition"
            >
              {submitting ? "Submitting..." : "Submit Reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
