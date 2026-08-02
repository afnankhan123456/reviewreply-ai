"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Search, Filter, RefreshCw, Share2, X } from 'lucide-react';
import { getTagSummary } from './actions';

/* Same liquid-glass wrapper jo home page pe use hota hai */
function LiquidCard({ className = "", children, ...rest }: { className?: string; children: React.ReactNode; [key: string]: any }) {
  return (
    <div className={`card ${className}`} {...rest}>
      <div className="volume"></div>
      <div className="refract"></div>
      <div className="cornerBloom"></div>
      <div className="bodyShade"></div>
      <div className="specular"></div>
      <div className="edgeLight"></div>
      <div className="rim"></div>
      <div className="rightGlow"></div>
      <div className="content">{children}</div>
    </div>
  );
}

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

  const [shareMenu, setShareMenu] = useState<{ open: boolean; name: string; text: string; rating: number }>({
    open: false, name: '', text: '', rating: 0,
  });

  const [templates, setTemplates] = useState<string[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [templateCategory, setTemplateCategory] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // ✅ Response Rate / Avg Rating — home ke overview API se reuse
  const [stats, setStats] = useState<any>(null);

  // ✅ Tags & Categories
  const [tagSummary, setTagSummary] = useState<{ tag: string; count: number }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // ✅ Custom Review Filters — rating + source combine karke apna filter banana
  const [customOpen, setCustomOpen] = useState(false);
  const [customRating, setCustomRating] = useState<number | null>(null);
  const [customSource, setCustomSource] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
    fetchTemplates();
    fetchStats();
    fetchTags();
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
      setLastSynced(new Date().toLocaleTimeString());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/standard/ai-reply-center/templates');
      const data = await res.json();
      if (data.success) setTemplates(data.templates);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/pro/dashboard/overview');
      const json = await res.json();
      if (json.success) setStats(json.data);
    } catch (e) {}
  };

  const fetchTags = async () => {
    const res: any = await getTagSummary();
    if (res?.success) setTagSummary(res.summary);
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
        body: JSON.stringify({ reviewId: selectedReviewId, replyText }),
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: '✅ Reply sent successfully!', type: 'success' });
        setShowReplyModal(false);
        setReplyText('');
        setSelectedReviewId(null);
        setSelectedReviewText('');
        setSelectedTemplate('');
        setTemplateCategory('All');
        fetchDashboardData();
      } else {
        setToast({ message: 'Failed to send reply: ' + data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Error sending reply', type: 'error' });
    }
  };

  const handleSelectTemplate = (tpl: string) => {
    setSelectedTemplate(tpl);
    setReplyText(tpl);
  };

  const filteredTemplates = templates.filter((tpl) => {
    if (templateCategory === 'All') return true;
    if (templateCategory === 'Positive') return tpl.includes('Positive') || tpl.includes('glowing') || tpl.includes('5-star') || tpl.includes('enjoyed') || tpl.includes('thrilled');
    if (templateCategory === 'Negative') return tpl.includes('Negative') || tpl.includes('sorry') || tpl.includes('apologize') || tpl.includes('improve') || tpl.includes('disappointed');
    if (templateCategory === 'Professional') return tpl.includes('Dear Customer') || tpl.includes('Dear Valued') || tpl.includes('Dear Guest');
    if (templateCategory === 'General') return tpl.includes('Thank you') && !tpl.includes('Dear');
    return true;
  });

  const handleShare = (name: string, text: string, rating: number) => setShareMenu({ open: true, name, text, rating });
  const closeShareMenu = () => setShareMenu((prev) => ({ ...prev, open: false }));

  const shareCurrentReview = async (platform: 'whatsapp' | 'x' | 'linkedin' | 'facebook' | 'copy') => {
    if (!shareMenu.open) return;
    const shareText = `${shareMenu.rating}★ review from ${shareMenu.name}: "${shareMenu.text}"`;
    const pageUrl = window.location.href;
    const combinedText = `${shareText}\n${pageUrl}`;
    try {
      if (platform === 'whatsapp') window.open(`https://web.whatsapp.com/send?text=${encodeURIComponent(combinedText)}`, '_blank', 'noopener,noreferrer');
      else if (platform === 'x') window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(combinedText)}`, '_blank', 'noopener,noreferrer');
      else if (platform === 'linkedin') window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`, '_blank', 'noopener,noreferrer');
      else if (platform === 'facebook') window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank', 'noopener,noreferrer');
      else {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(combinedText);
          setToast({ message: 'Review copied to clipboard!', type: 'success' });
        } else {
          window.prompt('Copy this review text:', combinedText);
        }
      }
    } catch (error) {
      setToast({ message: 'Unable to share review', type: 'error' });
    } finally {
      closeShareMenu();
    }
  };

  // ✅ Search + preset sentiment filter + custom filter (rating/source combine) + tag filter — sab ek saath
  const filteredReviews = reviews.filter((review) => {
    const name = review.author || review.reviewerName || '';
    const text = review.text || review.comment || '';
    const source = review.source || '';
    const rating = review.rating || 0;
    const tags = review.tags || [];

    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || text.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesSentiment = true;
    if (filterSentiment === 'Positive') matchesSentiment = rating >= 4;
    else if (filterSentiment === 'Negative') matchesSentiment = rating <= 2;
    else if (filterSentiment === 'Neutral') matchesSentiment = rating === 3;
    else if (filterSentiment === 'Google') matchesSentiment = source.toLowerCase() === 'google';
    else if (filterSentiment === 'Facebook') matchesSentiment = source.toLowerCase() === 'facebook';

    const matchesCustomRating = customRating === null || rating === customRating;
    const matchesCustomSource = customSource === null || source.toLowerCase() === customSource.toLowerCase();
    const matchesTag = !selectedTag || tags.includes(selectedTag);

    return matchesSearch && matchesSentiment && matchesCustomRating && matchesCustomSource && matchesTag;
  });

  const responseRate = stats?.responseRate ?? 0;
  const avgRating = stats?.avgRating ?? 0;

  return (
    <div className="page-wrap">
      {toast && (
        <div style={{
          position: "fixed", top: 18, right: 18, zIndex: 50, padding: "10px 16px", borderRadius: 12,
          fontSize: 13, fontWeight: 600, color: "#fff",
          background: toast.type === 'success' ? "#2fbf82" : "#ef5a6f",
          boxShadow: "0 8px 20px rgba(0,0,0,.4)",
        }}>
          {toast.message}
        </div>
      )}

      {/* header — Review Dashboard */}
      <div className="header-row">
        <div>
          <h1>Reviews</h1>
          <p>Manage, filter, aur sync karo apne saare customer reviews — ek hi jagah (Unified Inbox).</p>
        </div>
        <button className="btn-primary" onClick={handleSyncNow} disabled={isSyncing}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5}>
            <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {isSyncing ? "Syncing..." : "Sync Now"}
        </button>
      </div>

      {/* Rating Overview + Response Rate Tracking + Unanswered — stat row */}
      <div className="stats">
        <LiquidCard className="stat-card">
          <div className="stat-head"><p className="title">Total Reviews</p></div>
          <p className="value">{stats?.totalReviews ?? reviews.length}</p>
        </LiquidCard>
        <LiquidCard className="stat-card">
          <div className="stat-head"><p className="title">Average Rating</p></div>
          <p className="value">{avgRating}</p>
        </LiquidCard>
        <LiquidCard className="stat-card">
          <div className="stat-head"><p className="title">Response Rate</p></div>
          <p className="value">{responseRate}%</p>
        </LiquidCard>
        <LiquidCard className="stat-card">
          <div className="stat-head"><p className="title">Unanswered</p></div>
          <p className="value" style={{ color: unansweredCount > 0 ? "#ef5a6f" : "#fff" }}>{unansweredCount}</p>
        </LiquidCard>
        <LiquidCard className="stat-card">
          <div className="stat-head"><p className="title">Last Synced</p></div>
          <p className="value" style={{ fontSize: 13 }}>{lastSynced}</p>
        </LiquidCard>
      </div>

      {/* Review Search & Filter + Custom Filters */}
      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>Search & Filter</h3>
          <div className="dropdown mini-glass" onClick={() => setCustomOpen((v) => !v)} style={{ position: "relative" }}>
            <Filter size={13} /> Custom Filter
            {customOpen && (
              <div className="mini-glass" style={{ position: "absolute", top: "115%", right: 0, zIndex: 20, padding: 12, width: 220, cursor: "default" }} onClick={(e) => e.stopPropagation()}>
                <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6 }}>Rating</p>
                <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <span key={r} onClick={() => setCustomRating(customRating === r ? null : r)}
                      style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, cursor: "pointer", background: customRating === r ? "rgba(174,71,255,.3)" : "rgba(255,255,255,.06)" }}>
                      {r}★
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 6 }}>Source</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {["Google", "Facebook"].map((s) => (
                    <span key={s} onClick={() => setCustomSource(customSource === s ? null : s)}
                      style={{ fontSize: 11, padding: "4px 8px", borderRadius: 999, cursor: "pointer", background: customSource === s ? "rgba(174,71,255,.3)" : "rgba(255,255,255,.06)" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          <div className="mini-glass" style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "9px 12px" }}>
            <Search size={14} style={{ color: "var(--text-dim)" }} />
            <input
              type="text" placeholder="Search reviews..."
              style={{ background: "transparent", border: "none", outline: "none", fontSize: 13, color: "#fff", width: "100%" }}
              value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {['All', 'Positive', 'Negative', 'Neutral', 'Google', 'Facebook'].map((s) => (
            <span key={s} className={`rev-tag`} onClick={() => setFilterSentiment(s)}
              style={{ cursor: "pointer", background: filterSentiment === s ? "rgba(174,71,255,.28)" : "rgba(255,255,255,.06)", color: filterSentiment === s ? "#c78bff" : "var(--text-dim)" }}>
              {s}
            </span>
          ))}
          {(customRating !== null || customSource !== null) && (
            <span className="rev-tag" onClick={() => { setCustomRating(null); setCustomSource(null); }} style={{ cursor: "pointer", background: "rgba(239,90,111,.18)", color: "#ff8e9a" }}>
              Clear Custom ✕
            </span>
          )}
        </div>
      </LiquidCard>

      {/* Review Tags & Categories */}
      {tagSummary.length > 0 && (
        <LiquidCard className="section-card">
          <div className="section-head"><h3>Tags & Categories</h3></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            <span className="rev-tag" onClick={() => setSelectedTag(null)}
              style={{ cursor: "pointer", background: !selectedTag ? "rgba(174,71,255,.28)" : "rgba(255,255,255,.06)", color: !selectedTag ? "#c78bff" : "var(--text-dim)" }}>
              All
            </span>
            {tagSummary.map((t) => (
              <span key={t.tag} className="rev-tag" onClick={() => setSelectedTag(selectedTag === t.tag ? null : t.tag)}
                style={{ cursor: "pointer", background: selectedTag === t.tag ? "rgba(174,71,255,.28)" : "rgba(255,255,255,.06)", color: selectedTag === t.tag ? "#c78bff" : "var(--text-dim)" }}>
                {t.tag} · {t.count}
              </span>
            ))}
          </div>
        </LiquidCard>
      )}

      {/* Unified Inbox — Review Management list */}
      <LiquidCard className="section-card">
        <div className="section-head">
          <h3>Review Management</h3>
          <span className="link">{filteredReviews.length} reviews</span>
        </div>
        <div className="alerts-scroll" style={{ maxHeight: 420 }}>
          {filteredReviews.length === 0 && (
            <p style={{ color: "var(--text-dim)", fontSize: 13 }}>No matching reviews found.</p>
          )}
          {filteredReviews.map((review, index) => {
            const name = review.author || review.reviewerName || 'Anonymous';
            const text = review.text || review.comment || '';
            const rating = review.rating || 0;
            const sentiment = rating >= 4 ? 'Positive' : rating >= 3 ? 'Neutral' : 'Negative';
            const status = review.replied ? 'replied' : 'pending';
            return (
              <div className="review-row" key={review.id || index}>
                <div className="rev-avatar">{name.charAt(0).toUpperCase()}</div>
                <div className="rev-mid">
                  <span className="rev-name">{name} <span className="rev-time">· {review.source}</span></span>
                  <div className="rev-stars" style={rating <= 2 ? { color: "var(--red)" } : undefined}>
                    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
                  </div>
                  <div className="rev-text">{text}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                  <span className={`rev-tag tag-${status === 'replied' ? 'replied' : sentiment === 'Negative' ? 'negative' : 'pending'}`}>
                    {status === 'replied' ? 'Replied' : sentiment}
                  </span>
                  {status !== 'replied' && canReply && (
                    <button className="btn-primary" style={{ padding: "5px 10px", fontSize: 11 }}
                      onClick={() => { setSelectedReviewId(review.id); setSelectedReviewText(text); setReplyText(''); setSelectedTemplate(''); setTemplateCategory('All'); setShowReplyModal(true); }}>
                      Reply
                    </button>
                  )}
                  <div className="mini-glass" style={{ width: 26, height: 26, display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={() => handleShare(name, text, rating)}>
                    <Share2 size={12} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </LiquidCard>

      {/* Reply Modal */}
      {showReplyModal && canReply && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LiquidCard style={{ width: 620, maxHeight: "85vh", overflowY: "auto" }}>
            <div className="section-head">
              <h3>Reply to Review</h3>
              <X size={16} style={{ cursor: "pointer" }} onClick={() => setShowReplyModal(false)} />
            </div>
            <div className="mini-glass" style={{ padding: 12, marginBottom: 14 }}>
              <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 4 }}>Original Review:</p>
              <p style={{ fontSize: 13 }}>{selectedReviewText}</p>
            </div>
            <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 8 }}>Choose a template category:</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {['All', 'General', 'Positive', 'Negative', 'Professional'].map((cat) => (
                <span key={cat} className="rev-tag" onClick={() => setTemplateCategory(cat)}
                  style={{ cursor: "pointer", background: templateCategory === cat ? "rgba(174,71,255,.28)" : "rgba(255,255,255,.06)", color: templateCategory === cat ? "#c78bff" : "var(--text-dim)" }}>
                  {cat}
                </span>
              ))}
            </div>
            <div style={{ maxHeight: 160, overflowY: "auto", marginBottom: 14 }} className="alerts-scroll">
              {templatesLoading && <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Loading templates...</div>}
              {!templatesLoading && filteredTemplates.length === 0 && <div style={{ fontSize: 12, color: "var(--text-dim)" }}>No templates in this category.</div>}
              {filteredTemplates.map((tpl, idx) => (
                <div key={idx} onClick={() => handleSelectTemplate(tpl)} className="mini-glass"
                  style={{ padding: "8px 10px", fontSize: 12, marginBottom: 6, cursor: "pointer", background: selectedTemplate === tpl ? "rgba(174,71,255,.22)" : undefined }}>
                  {tpl}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 6 }}>Final reply (edit bhi kar sakte ho):</p>
            <textarea
              rows={4} placeholder="Select a template above, or write your own reply..."
              value={replyText} onChange={(e) => setReplyText(e.target.value)}
              style={{ width: "100%", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10, padding: 12, fontSize: 13, color: "#fff", resize: "none" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 14 }}>
              <div className="mini-glass" style={{ padding: "9px 16px", fontSize: 13 }} onClick={() => setShowReplyModal(false)}>Cancel</div>
              <button className="btn-primary" disabled={!replyText.trim()} onClick={handleReplySubmit}>Send Reply</button>
            </div>
          </LiquidCard>
        </div>
      )}

      {/* Share Modal */}
      {shareMenu.open && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <LiquidCard style={{ width: 380 }}>
            <div className="section-head"><h3>Share Review</h3></div>
            <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 14 }}>{shareMenu.name} · {shareMenu.rating}★</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <div className="mini-glass" style={{ padding: "9px", textAlign: "center", fontSize: 12 }} onClick={() => shareCurrentReview('whatsapp')}>WhatsApp</div>
              <div className="mini-glass" style={{ padding: "9px", textAlign: "center", fontSize: 12 }} onClick={() => shareCurrentReview('x')}>X</div>
              <div className="mini-glass" style={{ padding: "9px", textAlign: "center", fontSize: 12 }} onClick={() => shareCurrentReview('linkedin')}>LinkedIn</div>
              <div className="mini-glass" style={{ padding: "9px", textAlign: "center", fontSize: 12 }} onClick={() => shareCurrentReview('facebook')}>Facebook</div>
              <div className="mini-glass" style={{ padding: "9px", textAlign: "center", fontSize: 12, gridColumn: "span 2" }} onClick={() => shareCurrentReview('copy')}>Copy Text</div>
            </div>
            <div className="mini-glass" style={{ marginTop: 10, padding: "9px", textAlign: "center", fontSize: 12 }} onClick={closeShareMenu}>Cancel</div>
          </LiquidCard>
        </div>
      )}
    </div>
  );
}
