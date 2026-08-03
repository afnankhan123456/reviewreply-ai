"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { HelpCircle, BookOpen, Mail, Bug, ArrowLeft, Clock, X } from "lucide-react";
import "../liquid-glass.css";

function LiquidCard({ className = "", children, onClick }: { className?: string; children: ReactNode; onClick?: () => void }) {
  return (
    <div className={`card ${className}`} onClick={onClick} style={onClick ? { cursor: "pointer" } : undefined}>
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

const faqs = [
  { q: "How do I connect my Google Business account?", a: "Go to Quick Actions → Connect Platform → Connect." },
  { q: "How many reviews can I sync per month?", a: "Your Pro plan limit is shown on the dashboard, resetting every billing cycle." },
  { q: "Can I change my plan later?", a: "Yes, you can upgrade or downgrade from the Pricing page at any time." },
  { q: "How do I reply to a review?", a: "Use the Reviews page or the AI Reply Center to respond directly." },
  { q: "How are email alerts triggered?", a: "When a low-rating review (1-2 stars) is synced, an alert is sent if Gmail is connected." },
];

export default function HelpCenterPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showBugModal, setShowBugModal] = useState(false);
  const [bugFeature, setBugFeature] = useState("");
  const [bugIssueType, setBugIssueType] = useState("");
  const [bugDescription, setBugDescription] = useState("");
  const [customFeature, setCustomFeature] = useState("");
  const [customIssueType, setCustomIssueType] = useState("");
  const [submittingBug, setSubmittingBug] = useState(false);
  const [userTickets, setUserTickets] = useState<any[]>([]);
  const [loadingTickets, setLoadingTickets] = useState(false);

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
              <p>Find answers, documentation, and support.</p>
            </div>
          </div>

          <div className="ai-grid">
            <LiquidCard className="ai-card" onClick={() => setActiveSection("faqs")}>
              <div className="ai-icon" style={{ background: "rgba(77,163,255,.18)", color: "var(--blue)" }}><HelpCircle size={16} /></div>
              <b>FAQs</b>
              <div className="sub">Common questions and quick answers.</div>
            </LiquidCard>

            <LiquidCard className="ai-card" onClick={() => setActiveSection("docs")}>
              <div className="ai-icon" style={{ background: "rgba(52,211,153,.18)", color: "var(--green)" }}><BookOpen size={16} /></div>
              <b>Documentation</b>
              <div className="sub">Step-by-step guides to get started.</div>
            </LiquidCard>

            <a href="mailto:afnank6789@gmail.com" style={{ textDecoration: "none", color: "inherit" }}>
              <LiquidCard className="ai-card">
                <div className="ai-icon" style={{ background: "rgba(245,166,35,.18)", color: "var(--orange)" }}><Mail size={16} /></div>
                <b>Contact Support</b>
                <div className="sub">Email us at afnank6789@gmail.com</div>
              </LiquidCard>
            </a>

            <LiquidCard className="ai-card" onClick={() => setShowBugModal(true)}>
              <div className="ai-icon" style={{ background: "rgba(239,90,111,.18)", color: "var(--red)" }}><Bug size={16} /></div>
              <b>Report a Bug</b>
              <div className="sub">Found an issue? Let us know.</div>
            </LiquidCard>

            <LiquidCard className="ai-card" onClick={() => setActiveSection("tickets")}>
              <div className="ai-icon" style={{ background: "rgba(174,71,255,.18)", color: "var(--purple)" }}><Clock size={16} /></div>
              <b>My Tickets</b>
              <div className="sub">Track the status of your submitted bug reports.</div>
            </LiquidCard>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => setActiveSection(null)} className="link" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, background: "none", border: "none", cursor: "pointer" }}>
            <ArrowLeft size={14} /> Back to Help Center
          </button>

          {activeSection === "faqs" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 16px" }}>FAQs</h3>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ padding: "12px 0", borderBottom: idx < faqs.length - 1 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                  <div style={{ fontWeight: 600, fontSize: 13.5 }}>{faq.q}</div>
                  <div style={{ color: "var(--text-dim)", fontSize: 12.5, marginTop: 4 }}>{faq.a}</div>
                </div>
              ))}
            </LiquidCard>
          )}

          {activeSection === "docs" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 16px" }}>Documentation</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>
                <div><b style={{ color: "var(--text)" }}>1. Connect Google Business</b><br />Use Quick Actions → Connect Platform to link your Google Business location.</div>
                <div><b style={{ color: "var(--text)" }}>2. Sync Reviews</b><br />Reviews sync automatically. You can also trigger a manual sync from the dashboard.</div>
                <div><b style={{ color: "var(--text)" }}>3. Reply to Reviews</b><br />Use Reviews or AI Reply Center to respond — auto, draft-approve, or fully manual.</div>
                <div><b style={{ color: "var(--text)" }}>4. View Analytics</b><br />The Analytics page shows total reviews, rating trends, and sentiment breakdown.</div>
                <div><b style={{ color: "var(--text)" }}>5. Export Reports</b><br />Use Create Report to download your data as CSV or PDF.</div>
              </div>
            </LiquidCard>
          )}

          {activeSection === "tickets" && (
            <LiquidCard className="section-card">
              <h3 style={{ margin: "0 0 16px" }}>My Tickets</h3>
              {loadingTickets ? (
                <p style={{ color: "var(--text-dim)", fontSize: 13 }}>Loading your tickets...</p>
              ) : userTickets.length === 0 ? (
                <p style={{ color: "var(--text-dim)", fontSize: 13 }}>No tickets submitted yet.</p>
              ) : (
                userTickets.map((t) => (
                  <div key={t.id} className="review-row">
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
