"use client";

import { useState } from "react";
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
    <div className="p-6 bg-[#0B0E14] min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Send Review Request</h1>
      <p className="text-gray-400 mb-6">
        Enter customer details to send a review request.
      </p>

      {!canSend && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-sm text-yellow-400">
          You have view-only access. Only the account owner or a Full Access member can send review requests.
        </div>
      )}

      {/* ✅ Info Message for Place ID */}
      <div className="bg-[#181D27] border border-[#2A303C] rounded-lg p-4 mb-6 text-sm">
        <p className="text-gray-300">
          💡 <span className="font-medium">Tip:</span> Please save your{" "}
          
            href="/plans/standard/dashboard/settings"
            className="text-indigo-400 hover:underline"
          >
            Google Place ID in Settings
          </a>{" "}
          to include a review link in the email.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          If Place ID is not saved, the email will only contain a text message.
        </p>
      </div>

      <fieldset disabled={!canSend} className="max-w-md space-y-4 disabled:opacity-50">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Customer Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Customer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#181D27] border border-[#2A303C] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
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
