"use client";

import { useState } from "react";
import { sendReviewRequestEmail } from "./actions";

export default function RequestsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
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
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Review Request"}
        </button>

        {message && (
          <p className="text-sm text-green-400 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
