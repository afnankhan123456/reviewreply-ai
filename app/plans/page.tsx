"use client";

import Link from "next/link";

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="text-center mb-14">

        <h1 className="text-6xl font-bold mb-4">
          Choose Your Plan
        </h1>

        <p className="text-zinc-400 text-xl">
          Select the perfect plan for your business
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">

        {/* BASIC */}

        <Link href="/plans/basic">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-violet-500 transition-all cursor-pointer">

            <h2 className="text-4xl font-bold mb-4">
              Basic
            </h2>

            <p className="text-zinc-400 mb-8">
              Perfect for small businesses
            </p>

            <div className="space-y-4 text-zinc-300">

              <div>✓ 1 Business Location</div>
              <div>✓ AI Review Replies</div>
              <div>✓ Review Dashboard</div>
              <div>✓ Basic Analytics</div>

            </div>

          </div>

        </Link>

        {/* STANDARD */}

        <Link href="/plans/standard">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-blue-500 transition-all cursor-pointer">

            <h2 className="text-4xl font-bold mb-4">
              Standard
            </h2>

            <p className="text-zinc-400 mb-8">
              Best for growing businesses
            </p>

            <div className="space-y-4 text-zinc-300">

              <div>✓ Multiple Locations</div>
              <div>✓ Smart AI Replies</div>
              <div>✓ Advanced Analytics</div>
              <div>✓ Templates & Insights</div>

            </div>

          </div>

        </Link>

        {/* PRO */}

        <Link href="/plans/pro">

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-yellow-500 transition-all cursor-pointer">

            <h2 className="text-4xl font-bold mb-4">
              Pro
            </h2>

            <p className="text-zinc-400 mb-8">
              Full power for agencies & brands
            </p>

            <div className="space-y-4 text-zinc-300">

              <div>✓ Unlimited Locations</div>
              <div>✓ Premium AI Features</div>
              <div>✓ Team Access</div>
              <div>✓ Priority Support</div>

            </div>

          </div>

        </Link>

      </div>

    </div>
  );
}
