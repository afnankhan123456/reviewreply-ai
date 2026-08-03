"use client";

import { useState, useEffect, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import {
  BookOpen, Bug, ArrowLeft, ArrowRight, X, Search,
  Zap, ShieldCheck, MessageCircle, Headphones, Ticket,
} from "lucide-react";
import "../liquid-glass.css";

function LiquidCard({ className = "", children, onClick, style }: { className?: string; children: ReactNode; onClick?: () => void; style?: CSSProperties }) {
  return (
    <div className={`card ${className}`} onClick={onClick} style={{ ...(onClick ? { cursor: "pointer" } : {}), ...style }}>
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

/* ---------- Knowledge Base content ---------- */
const knowledgeBase = [
  {
    category: "Dashboard Overview",
    icon: <BookOpen size={15} />,
    color: "var(--blue)",
    bg: "rgba(77,163,255,.18)",
    articles: [
      { q: "What do the stat cards on my dashboard mean?", a: "The top cards show your key numbers at a glance — total reviews, average rating, reply rate, and recent trend — updated automatically as new reviews sync in." },
      { q: "How do I connect my Google Business account?", a: "Go to Quick Actions → Connect Platform → Connect, then sign in with your Google Business account." },
      { q: "How many reviews can I sync per month?", a: "Your Pro plan limit is shown on the dashboard, resetting every billing cycle." },
      { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade from the Pricing page at any time." },
    ],
  },
  {
    category: "Quick Actions",
    icon: <Zap size={15} />,
    color: "var(--purple)",
    bg: "rgba(174,71,255,.18)",
    articles: [
      { q: "What is Quick Actions for?", a: "It's the shortcut panel on your dashboard — one tap takes you straight to the most common tasks: replying to reviews, generating AI replies, checking analytics, creating reports, or connecting a new platform." },
      { q: "Reply to Reviews — what does this do?", a: "Opens the Reviews page filtered to your pending reviews so you can reply to them directly." },
      { q: "AI Reply — what does this do?", a: "Opens the AI Reply Center, where AI-generated draft replies are suggested for your reviews based on your saved tone." },
      { q: "Analyze Reviews — what does this do?", a: "Opens Analytics, where you get AI-powered insights into rating trends and customer sentiment." },
      { q: "Create Report — what does this do?", a: "Opens the Reports page so you can download your review data as a CSV or PDF." },
      { q: "Connect Platform — what does this do?", a: "Opens Connect Platform, where you add or manage review sources like Google Business." },
      { q: "How do I customize my Quick Actions?", a: "Click the Customize button above the Quick Actions grid. You can reorder cards, hide ones you don't use, change each card's color, and switch between glass, solid, or minimal card styles." },
    ],
  },
  {
    category: "Reviews & Replies",
    icon: <MessageCircle size={15} />,
    color: "var(--green)",
    bg: "rgba(52,211,153,.18)",
    articles: [
      { q: "How do I reply to a review?", a: "Use the Reviews page or the AI Reply Center to respond directly." },
      { q: "How are email alerts triggered?", a: "When a low-rating review (1-2 stars) is synced, an alert is sent if Gmail is connected." },
      { q: "Can I automate replies?", a: "Yes — enable Auto Reply in the AI Reply Center to respond automatically using your saved tone and templates." },
    ],
  },
  {
    category: "Analytics & Reports",
    icon: <Zap size={15} />,
    color: "var(--orange)",
    bg: "rgba(245,166,35,.18)",
    articles: [
      { q: "Where can I see rating trends?", a: "The Analytics page shows total reviews, rating trends, and sentiment breakdown over time." },
      { q: "How do I export my data?", a: "Use Create Report to download your data as CSV or PDF." },
    ],
  },
  {
    category: "Account & Billing",
    icon: <ShieldCheck size={15} />,
    color: "var(--purple)",
    bg: "rgba(174,71,255,.18)",
    articles: [
      { q: "How do I update my payment method?", a: "Go to Settings → Billing to update your card or view invoices." },
      { q: "Who can I contact for billing issues?", a: "Email afnank6789@gmail.com — Pro plan billing questions are answered with priority." },
    ],
  },
];

export default function HelpCenterPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Bug reporting
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugFeature, setBugFeature] = useState("");
  const [bugIssueType, setBugIssueType] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [customIssueType, setCustomIssueType] = useState("");
  const [submittingBug, setSubmittingBug] = useState(false);

  // Support ticket system
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [ticketFilter, setTicketFilter] = useState<"all" | "open" | "resolved">("all");
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  // Knowledge base
  const [kbQuery, setKbQuery] = useState("");
  const [openCategory, setOpenCategory] = useState<string | null>(knowledgeBase[0].category);

  useEffect(() => { fetchUserTickets(); }, []);

  const fetchUserTickets = async () => {
    setLoadingTickets(true);
    try {
      const res = await fetch("/api/user/bugs");
      const data = await res.json();
      if (data.success) setUserTickets(data.bugs || []);
    } catch (err) {
      console.error("Failed to fetch tickets", err);
    } finally {
      setLoadingTickets(false);
    }
  };

  const handleBugSubmit = async () => {
    const finalFeature = bugFeature === "Other" ? customFeature.trim() : bugFeature;
    const finalIssueType = bugIssueType === "Other" ? customIssueType.trim() : bugIssueType;
    if (!finalFeature || !finalIssueType || !bugDescription.trim()) return;

    setSubmittingBug(true);
    try {
      const res = await fetch("/api/bug-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feature: finalFeature, issueType: finalIssueType, description: bugDescription }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Bug report submitted successfully. Thank you!");
        setShowBugModal(false);
        setBugFeature(""); setBugIssueType(""); setBugDescription("");
        setCustomFeature(""); setCustomIssueType("");
        await fetchUserTickets();
      } else if (res.status === 409) {
        alert("You already have an open ticket for this issue.");
      } else {
        alert(data.error || "Failed to submit bug report.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmittingBug(false);
    }
  };

  const filteredTickets = userTickets.filter((t) => {
    if (ticketFilter === "open") return t.status === "Open";
    if (ticketFilter === "resolved") return t.status !== "Open";
    return true;
  });

  const filteredKb = knowledgeBase
    .map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (a) =>
          !kbQuery.trim() ||
          a.q.toLowerCase().includes(kbQuery.toLowerCase()) ||
          a.a.toLowerCase().includes(kbQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.articles.length > 0);

  return (
    <div className="page-wrap">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="liquidWarp" x="-15%" y="-15%" width="130%" height="130%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.025" numOctaves={2} seed={9} result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale={7} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {!activeSection ? (
        <>
          <Link href="/plans/pro/dashboard" className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>← Back to Dashboard</Link>
          <div className="header-row">
            <div>
              <h1>Help Center</h1>
              <p>Find answers, get priority help, and track your support tickets.</p>
            </div>
          </div>

          <div className="help-grid">
            <LiquidCard className="help-card themed" style={{ ["--action-color" as any]: "#4da3ff" }} onClick={() => setActiveSection("knowledge")}>
              <BookOpen size={110} className="help-card-illustration" style={{ color: "var(--blue)" }} />
              <div className="help-card-icon" style={{ background: "linear-gradient(135deg,#4da3ff,#2d6fd6)" }}><BookOpen size={20} color="#fff" /></div>
              <b>Knowledge Base</b>
              <div className="sub">Guides and answers organized by topic.</div>
              <div className="help-card-arrow"><ArrowRight size={15} /></div>
            </LiquidCard>

            <LiquidCard className="help-card themed" style={{ ["--action-color" as any]: "#ef5a6f" }} onClick={() => setShowBugModal(true)}>
              <Bug size={110} className="help-card-illustration" style={{ color: "var(--red)" }} />
              <div className="help-card-icon" style={{ background: "linear-gradient(135deg,#f0707f,#c8394f)" }}><Bug size={20} color="#fff" /></div>
              <b>Bug Reporting</b>
              <div className="sub">Found an issue? Report it in seconds.</div>
              <div className="help-card-arrow"><ArrowRight size={15} /></div>
            </LiquidCard>

            <LiquidCard className="help-card themed" style={{ ["--action-color" as any]: "#ae47ff" }} onClick={() => setActiveSection("priority")}>
              <Headphones size={110} className="help-card-illustration" style={{ color: "var(--purple)" }} />
              <div className="help-card-icon" style={{ background: "linear-gradient(135deg,#a561f6,#7b2db9)" }}><Headphones size={20} color="#fff" /></div>
              <b>Priority Support</b>
              <div className="sub">Get priority help from our expert team.</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: "auto" }}>
                <span className="pro-tag">PRO</span>
                <div className="help-card-arrow"><ArrowRight size={15} /></div>
              </div>
            </LiquidCard>

            <LiquidCard className="help-card themed" style={{ ["--action-color" as any]: "#34d399" }} onClick={() => setActiveSection("tickets")}>
              <Ticket size={110} className="help-card-illustration" style={{ color: "var(--green)" }} />
              <div className="help-card-icon" style={{ background: "linear-gradient(135deg,#34d399,#1f9d74)" }}><Ticket size={20} color="#fff" /></div>
              <b>Support Ticket System</b>
              <div className="sub">Track and manage all your submitted tickets.</div>
              <div className="help-card-arrow"><ArrowRight size={15} /></div>
            </LiquidCard>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setActiveSection(null)} className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={14} /> Back to Help Center
          </button>

          {/* ---------------- KNOWLEDGE BASE ---------------- */}
          {activeSection === "knowledge" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 16px" }}>Knowledge Base</h3>

              <div className="help-search">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={kbQuery}
                  onChange={(e) => setKbQuery(e.target.value)}
                />
              </div>

              {filteredKb.length === 0 ? (
                <p style={{ color: "var(--text-dim)", fontSize: 13 }}>No articles match your search.</p>
              ) : (
                filteredKb.map((cat) => {
                  const isOpen = openCategory === cat.category;
                  return (
                    <div key={cat.category} className="kb-category">
                      <div className="kb-category-head" onClick={() => setOpenCategory(isOpen ? null : cat.category)}>
                        <div className="left">
                          <div className="kb-category-icon" style={{ background: cat.bg, color: cat.color }}>{cat.icon}</div>
                          <div>
                            <div className="kb-category-title">{cat.category}</div>
                            <div className="kb-category-count">{cat.articles.length} article{cat.articles.length !== 1 ? "s" : ""}</div>
                          </div>
                        </div>
                        <svg className={`kb-chevron ${isOpen ? "open" : ""}`} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                      {isOpen && (
                        <div className="kb-articles">
                          {cat.articles.map((a, idx) => (
                            <div key={idx} className="kb-article">
                              <div className="kb-article-q">{a.q}</div>
                              <div className="kb-article-a">{a.a}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </LiquidCard>
          )}

          {/* ---------------- PRIORITY SUPPORT ---------------- */}
          {activeSection === "priority" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                Priority Support <span className="pro-tag">PRO</span>
              </h3>

              <div className="priority-grid">
                <div className="priority-stat">
                  <div className="val">&lt; 4 hrs</div>
                  <div className="lbl">Average response time</div>
                </div>
                <div className="priority-stat">
                  <div className="val">24/7</div>
                  <div className="lbl">Ticket monitoring</div>
                </div>
                <div className="priority-stat">
                  <div className="val">Top</div>
                  <div className="lbl">Queue priority</div>
                </div>
              </div>

              <div className="priority-perk">
                <div className="priority-perk-icon"><Zap size={15} /></div>
                <div>
                  <div className="priority-perk-title">Expedited fixes</div>
                  <div className="priority-perk-sub">Bugs reported by Pro users are triaged and resolved ahead of standard and basic plans.</div>
                </div>
              </div>
              <div className="priority-perk">
                <div className="priority-perk-icon"><MessageCircle size={15} /></div>
                <div>
                  <div className="priority-perk-title">Direct email line</div>
                  <div className="priority-perk-sub">Reach the team directly instead of a general support queue.</div>
                </div>
              </div>
              <div className="priority-perk">
                <div className="priority-perk-icon"><ShieldCheck size={15} /></div>
                <div>
                  <div className="priority-perk-title">Dedicated billing help</div>
                  <div className="priority-perk-sub">Billing and account issues are handled with priority for Pro members.</div>
                </div>
              </div>

              <a href="mailto:afnank6789@gmail.com" style={{ textDecoration: "none" }}>
                <button className="btn-primary priority-contact-btn">
                  <MessageCircle size={14} /> Contact Priority Support
                </button>
              </a>
            </LiquidCard>
          )}

          {/* ---------------- SUPPORT TICKET SYSTEM ---------------- */}
          {activeSection === "tickets" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 6px" }}>Support Ticket System</h3>
              <p style={{ margin: "0 0 16px", fontSize: 12.5, color: "var(--text-dim)" }}>
                Every ticket you submit from <b style={{ color: "var(--text)" }}>Bug Reporting</b> shows up here — track its status and see whether our team has actioned it yet.
              </p>

              <div className="ticket-tabs">
                <div className={`ticket-tab ${ticketFilter === "all" ? "active" : ""}`} onClick={() => setTicketFilter("all")}>All</div>
                <div className={`ticket-tab ${ticketFilter === "open" ? "active" : ""}`} onClick={() => setTicketFilter("open")}>Open</div>
                <div className={`ticket-tab ${ticketFilter === "resolved" ? "active" : ""}`} onClick={() => setTicketFilter("resolved")}>Resolved</div>
              </div>

              {loadingTickets ? (
                <p style={{ color: "var(--text-dim)", fontSize: 13 }}>Loading your tickets...</p>
              ) : filteredTickets.length === 0 ? (
                <div className="ticket-empty">No tickets yet — submit one from Bug Reporting and it'll appear here.</div>
              ) : (
                filteredTickets.map((t) => (
                  <div key={t.id} className="review-row ticket-row" onClick={() => setSelectedTicket(t)}>
                    <div className="rev-mid">
                      <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                        <span className="rev-tag tag-pending">{t.feature}</span>
                        <span className="rev-tag tag-negative">{t.issueType}</span>
                        <span className={`rev-tag ${t.status === "Open" ? "tag-pending" : "tag-replied"}`}>{t.status}</span>
                      </div>
                      <div className="rev-text">{t.description}</div>
                    </div>
                  </div>
                ))
              )}
            </LiquidCard>
          )}
        </>
      )}

      {/* ---------------- TICKET DETAIL OVERLAY ---------------- */}
      {selectedTicket && (
        <div className="ticket-detail-overlay" onClick={() => setSelectedTicket(null)}>
          <div className="ticket-detail-card" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>Ticket Details</h3>
              <button onClick={() => setSelectedTicket(null)} className="qa-close"><X size={12} /></button>
            </div>

            <div className="ticket-detail-row">
              <span className="ticket-detail-label">Feature</span>
              <span className="ticket-detail-value">{selectedTicket.feature}</span>
            </div>
            <div className="ticket-detail-row">
              <span className="ticket-detail-label">Issue Type</span>
              <span className="ticket-detail-value">{selectedTicket.issueType}</span>
            </div>
            <div className="ticket-detail-row">
              <span className="ticket-detail-label">Status</span>
              <span className={`rev-tag ${selectedTicket.status === "Open" ? "tag-pending" : "tag-replied"}`}>{selectedTicket.status}</span>
            </div>
            {selectedTicket.createdAt && (
              <div className="ticket-detail-row">
                <span className="ticket-detail-label">Submitted</span>
                <span className="ticket-detail-value">{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
              </div>
            )}

            <div className="ticket-detail-desc">{selectedTicket.description}</div>
          </div>
        </div>
      )}

      {/* ---------------- REPORT A BUG MODAL ---------------- */}
      {showBugModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.65)", backdropFilter: "blur(4px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ width: 420, maxWidth: "100%", background: "#151517", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: 20, boxShadow: "0 30px 70px rgba(0,0,0,.6)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 15 }}>Report a Bug</h3>
              <button onClick={() => setShowBugModal(false)} className="qa-close"><X size={12} /></button>
            </div>

            <label style={{ fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 6 }}>Which feature has the issue?</label>
            <select value={bugFeature} onChange={(e) => { setBugFeature(e.target.value); if (e.target.value !== "Other") setCustomFeature(""); }}
              style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "var(--text)", fontSize: 13 }}>
              <option value="">-- Select feature --</option>
              <option>Dashboard</option><option>Reviews</option><option>AI Reply Center</option>
              <option>Analytics</option><option>Reports</option><option>Connect Platform</option>
              <option>Settings</option><option>Help Center</option><option>Other</option>
            </select>
            {bugFeature === "Other" && (
              <input type="text" placeholder="Enter feature name" value={customFeature} onChange={(e) => setCustomFeature(e.target.value)}
                style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "var(--text)", fontSize: 13 }} />
            )}

            <label style={{ fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 6 }}>What type of problem is it?</label>
            <select value={bugIssueType} onChange={(e) => { setBugIssueType(e.target.value); if (e.target.value !== "Other") setCustomIssueType(""); }}
              style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "var(--text)", fontSize: 13 }}>
              <option value="">-- Select issue type --</option>
              <option>UI / Design glitch</option><option>Data not loading</option>
              <option>Button not working</option><option>Wrong data shown</option>
              <option>Sync issue</option><option>Email alert issue</option><option>Other</option>
            </select>
            {bugIssueType === "Other" && (
              <input type="text" placeholder="Enter problem type" value={customIssueType} onChange={(e) => setCustomIssueType(e.target.value)}
                style={{ width: "100%", marginBottom: 12, padding: 10, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "var(--text)", fontSize: 13 }} />
            )}

            <label style={{ fontSize: 12, color: "var(--text-dim)", display: "block", marginBottom: 6 }}>Description</label>
            <textarea rows={4} value={bugDescription} onChange={(e) => setBugDescription(e.target.value)} placeholder="Describe the issue..."
              style={{ width: "100%", marginBottom: 16, padding: 10, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", color: "var(--text)", fontSize: 13, resize: "none" }} />

            <button
              onClick={handleBugSubmit}
              disabled={!bugFeature || !bugIssueType || !bugDescription.trim() || (bugFeature === "Other" && !customFeature.trim()) || (bugIssueType === "Other" && !customIssueType.trim()) || submittingBug}
              className="btn-primary" style={{ width: "100%", justifyContent: "center", opacity: submittingBug ? 0.6 : 1 }}
            >
              {submittingBug ? "Submitting..." : "Submit Bug Report"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
