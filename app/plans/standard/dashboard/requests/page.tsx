"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { sendReviewRequestEmail } from "./actions";

export default function RequestsPage() {
  const { data: authSession } = useSession();
  const teamRole = (authSession?.user as any)?.teamRole || "OWNER";
  const canSend = teamRole !== "VIEW_ONLY";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Theme state
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
    }
  }, []);

  // ✅ Common theme classes
  const bgMain = theme === "light" ? "bg-gray-50" : "bg-[#0B0E14]";
  const textMain = theme === "light" ? "text-gray-900" : "text-white";
  const textSecondary = theme === "light" ? "text-gray-600" : "text-gray-400";
  const textMuted = theme === "light" ? "text-gray-500" : "text-gray-500";
  const cardBg = theme === "light" ? "bg-white border-gray-200" : "bg-[#181D27] border-[#2A303C]";
  const inputBg = theme === "light" ? "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500" : "bg-[#181D27] border-[#2A303C] text-white focus:border-indigo-500";
  const warningBg = theme === "light" ? "bg-yellow-50 border-yellow-200 text-yellow-700" : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    setLoading(true);
    setMessage("");
    const result = await sendReviewRequestEmail(name, email);
    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div className={`p-6 min-h-screen transition-colors duration-300 ${bgMain} ${textMain}`}>
      <h1 className={`text-2xl font-bold ${textMain}`}>Send Review Request</h1>
      <p className={`${textSecondary} mb-6`}>
        Enter customer details to send a review request.
      </p>

      {!canSend && (
        <div className={`border rounded-lg p-4 mb-6 text-sm ${warningBg}`}>
          You have view-only access. Only the account owner or a Full Access member can send review requests.
        </div>
      )}

      <div className={`border rounded-lg p-4 mb-6 text-sm ${cardBg}`}>
        <p className={textSecondary}>
          💡 <span className="font-medium">Tip:</span> Please save your{" "}
          <a href="/plans/standard/dashboard/settings" className="text-indigo-400 hover:underline">Google Place ID in Settings</a>{" "}
          to include a review link in the email.
        </p>
        <p className={`text-xs ${textMuted} mt-1`}>
          If Place ID is not saved, the email will only contain a text message.
        </p>
      </div>

      <fieldset disabled={!canSend} className="max-w-md space-y-4 disabled:opacity-50">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`w-full border rounded-lg px-4 py-2 outline-none ${inputBg}`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className={`block text-sm ${textSecondary} mb-1`}>Customer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full border rounded-lg px-4 py-2 outline-none ${inputBg}`}
              placeholder="customer@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !canSend}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Review Request"}
          </button>

          {message && (
            <p className="text-sm text-green-400 mt-2">{message}</p>
          )}
        </form>
      </fieldset>
    </div>
  );
}
