"use client";

import Link from "next/link";

export default function ReferEarnPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-6 mb-10">

        <div>
          <h1 className="text-4xl font-bold">
            Refer & Earn
          </h1>

          <p className="text-zinc-400 mt-2">
            Invite friends and earn rewards
          </p>
        </div>

        <Link
          href="/plans"
          className="bg-zinc-900 border border-zinc-700 hover:border-violet-500 px-5 py-2 rounded-xl transition"
        >
          Back
        </Link>

      </div>

      {/* MAIN CARD */}
      <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="flex flex-col items-center text-center">

          <div className="w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center text-4xl font-bold mb-6">
            ₹
          </div>

          <h2 className="text-3xl font-bold mb-3">
            Earn ₹100 Per Referral
          </h2>

          <p className="text-zinc-400 max-w-xl">
            Share your referral link with friends and earn rewards when they join ReviewReply AI.
          </p>

        </div>

        {/* REFERRAL BOX */}
        <div className="mt-10">

          <label className="text-sm text-zinc-400 mb-2 block">
            Your Referral Link
          </label>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              type="text"
              value="https://reviewreply-ai.vercel.app/ref/afnan"
              readOnly
              className="flex-1 bg-black border border-zinc-700 rounded-2xl px-5 py-4 text-zinc-300 outline-none"
            />

            <button className="bg-violet-600 hover:bg-violet-700 px-6 py-4 rounded-2xl font-semibold transition">
              Copy Link
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">

          <div className="bg-black border border-zinc-800 rounded-2xl p-5 text-center">

            <h3 className="text-3xl font-bold text-violet-400">
              0
            </h3>

            <p className="text-zinc-400 mt-2">
              Total Referrals
            </p>

          </div>

          <div className="bg-black border border-zinc-800 rounded-2xl p-5 text-center">

            <h3 className="text-3xl font-bold text-green-400">
              ₹0
            </h3>

            <p className="text-zinc-400 mt-2">
              Total Earnings
            </p>

          </div>

          <div className="bg-black border border-zinc-800 rounded-2xl p-5 text-center">

            <h3 className="text-3xl font-bold text-yellow-400">
              0
            </h3>

            <p className="text-zinc-400 mt-2">
              Active Users
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
