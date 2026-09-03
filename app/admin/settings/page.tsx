// app/admin/settings/page.tsx

"use client";

import { useState, useEffect } from "react";

type UserOffer = {
  email: string;
  yearlyDiscount: number;
  halfYearlyDiscount: number;
  expiresAt: string;
};

export default function AdminSettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Bumper offer (sabke liye) state
  const [offerActive, setOfferActive] = useState(false);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const [offerLoading, setOfferLoading] = useState(true);
  const [offerSaving, setOfferSaving] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  // Per-user special discount state
  const [userEmail, setUserEmail] = useState("");
  const [userYearlyDiscount, setUserYearlyDiscount] = useState("5");
  const [userHalfYearlyDiscount, setUserHalfYearlyDiscount] = useState("3");
  const [grantingOffer, setGrantingOffer] = useState(false);
  const [activeUserOffers, setActiveUserOffers] = useState<UserOffer[]>([]);
  const [userOffersLoading, setUserOffersLoading] = useState(true);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ===================== Bumper offer (existing) =====================
  useEffect(() => {
    fetchOfferStatus();
  }, []);

  const fetchOfferStatus = async () => {
    try {
      const res = await fetch("/api/admin/offer");
      const data = await res.json();
      setOfferActive(data.isActive ?? false);
      setExpiresAt(data.expiresAt ?? null);
    } catch (err) {
      console.error("Failed to fetch offer status:", err);
    } finally {
      setOfferLoading(false);
    }
  };

  const toggleOffer = async () => {
    setOfferSaving(true);
    try {
      const res = await fetch("/api/admin/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !offerActive }),
      });
      const data = await res.json();
      if (data.success) {
        setOfferActive(data.isActive);
        setExpiresAt(data.expiresAt);
      }
    } catch (err) {
      console.error("Failed to update offer:", err);
    } finally {
      setOfferSaving(false);
    }
  };

  useEffect(() => {
    if (!offerActive || !expiresAt) {
      setTimeLeft("");
      return;
    }

    const tick = () => {
      const diff = new Date(expiresAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft("");
        setOfferActive(false);
        setExpiresAt(null);
        return;
      }
      const h = String(Math.floor(diff / 3600000)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
      setTimeLeft(`${h}:${m}:${s}`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [offerActive, expiresAt]);

  // ===================== Per-user special discount (naya) =====================
  useEffect(() => {
    fetchUserOffers();
    const listInterval = setInterval(fetchUserOffers, 15000); // list bhi refresh hoti rahe
    const clockInterval = setInterval(() => setNow(Date.now()), 1000); // countdown ke liye
    return () => {
      clearInterval(listInterval);
      clearInterval(clockInterval);
    };
  }, []);

  const fetchUserOffers = async () => {
    try {
      const res = await fetch("/api/admin/user-offer");
      const data = await res.json();
      setActiveUserOffers(data.offers ?? []);
    } catch (err) {
      console.error("Failed to fetch user offers:", err);
    } finally {
      setUserOffersLoading(false);
    }
  };

  const grantUserOffer = async () => {
    if (!userEmail.trim()) return;
    setGrantingOffer(true);
    try {
      const res = await fetch("/api/admin/user-offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail.trim(),
          yearlyDiscount: userYearlyDiscount,
          halfYearlyDiscount: userHalfYearlyDiscount,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setUserEmail("");
        fetchUserOffers();
      }
    } catch (err) {
      console.error("Failed to grant user offer:", err);
    } finally {
      setGrantingOffer(false);
    }
  };

  const revokeUserOffer = async (email: string) => {
    try {
      await fetch("/api/admin/user-offer", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      fetchUserOffers();
    } catch (err) {
      console.error("Failed to revoke user offer:", err);
    }
  };

  const formatRemaining = (expiresAtStr: string) => {
    const diff = new Date(expiresAtStr).getTime() - now;
    if (diff <= 0) return "Expired";
    const m = String(Math.floor(diff / 60000)).padStart(2, "0");
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
        Admin Settings
      </h1>

      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Dark / Light Mode
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Change dashboard appearance
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-zinc-900 dark:bg-white dark:text-black text-white px-5 py-2 rounded-xl transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Bumper Offer toggle (sabke liye) */}
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            12-Month Bumper Offer (All Users)
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            {offerActive
              ? "Offer is LIVE. It will auto turn off in 24 hours if you don't stop it manually."
              : "Offer is currently off. Turn it on whenever you want to run it."}
          </p>
          {offerActive && timeLeft && (
            <p className="text-xs mt-2 font-mono text-violet-500 dark:text-violet-400">
              Auto-off in: {timeLeft}
            </p>
          )}
        </div>
        <button
          onClick={toggleOffer}
          disabled={offerLoading || offerSaving}
          className={`px-5 py-2 rounded-xl transition font-semibold disabled:opacity-50 ${
            offerActive
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:opacity-90"
          }`}
        >
          {offerLoading
            ? "Loading..."
            : offerSaving
            ? "Saving..."
            : offerActive
            ? "Turn Offer OFF"
            : "Turn Offer ON"}
        </button>
      </div>

      {/* Per-user special discount (naya) */}
      <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-1">
          Give a Specific User a Discount
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
          Isi email se login karne par hi discount dikhega, kisi aur ko nahi. 30 minute me khud expire ho jayega.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-4">
          <input
            type="email"
            placeholder="user@example.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="sm:col-span-2 rounded-xl border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white"
          />
          <input
            type="number"
            placeholder="Yearly discount ($)"
            value={userYearlyDiscount}
            onChange={(e) => setUserYearlyDiscount(e.target.value)}
            className="rounded-xl border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white"
          />
          <input
            type="number"
            placeholder="6-month discount ($)"
            value={userHalfYearlyDiscount}
            onChange={(e) => setUserHalfYearlyDiscount(e.target.value)}
            className="rounded-xl border border-zinc-300 dark:border-zinc-600 bg-transparent px-3 py-2 text-sm text-zinc-900 dark:text-white"
          />
        </div>

        <button
          onClick={grantUserOffer}
          disabled={grantingOffer || !userEmail.trim()}
          className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {grantingOffer ? "Granting..." : "Grant Offer (30 min)"}
        </button>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Currently Active User Offers
          </h3>
          {userOffersLoading ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Loading...</p>
          ) : activeUserOffers.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No active offers right now.</p>
          ) : (
            <div className="space-y-2">
              {activeUserOffers.map((offer) => (
                <div
                  key={offer.email}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm"
                >
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">{offer.email}</span>
                    <span className="text-zinc-500 dark:text-zinc-400 ml-2">
                      Yearly -${offer.yearlyDiscount} · 6mo -${offer.halfYearlyDiscount}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-violet-500 dark:text-violet-400">
                      {formatRemaining(offer.expiresAt)}
                    </span>
                    <button
                      onClick={() => revokeUserOffer(offer.email)}
                      className="text-red-500 hover:text-red-600 text-xs font-semibold"
                    >
                      Revoke
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
