"use client";

import Link from "next/link";

export default function ReferEarnPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black px-6 py-10">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            Refer & Earn
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Invite friends and earn rewards from every successful signup
          </p>
        </div>

        <Link
          href="/plans"
          className="bg-white border border-gray-200 hover:border-indigo-400 px-5 py-3 rounded-2xl shadow-sm transition font-medium w-fit"
        >
          Back
        </Link>

      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="xl:col-span-2 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">

          {/* TOP */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div>

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                ₹
              </div>

              <h2 className="text-3xl font-bold mt-6">
                Earn ₹100 Per Referral
              </h2>

              <p className="text-gray-500 mt-3 max-w-xl leading-7">
                Share your referral link with friends and earn rewards every time someone joins ReviewReply AI using your link.
              </p>

            </div>

            {/* MINI STATS */}
            <div className="grid grid-cols-2 gap-4 w-full md:w-[320px]">

              <div className="bg-[#f7f8fc] border border-gray-200 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Referrals
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  0
                </h3>

              </div>

              <div className="bg-[#f7f8fc] border border-gray-200 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Earnings
                </p>

                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  ₹0
                </h3>

              </div>

              <div className="bg-[#f7f8fc] border border-gray-200 rounded-2xl p-5">

                <p className="text-gray-500 text-sm">
                  Active Users
                </p>

                <h3 className="text-3xl font-bold text-indigo-600 mt-2">
                  0
                </h3>

              </div>

              <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl p-5 text-white">

                <p className="text-sm opacity-80">
                  Reward Rate
                </p>

                <h3 className="text-3xl font-bold mt-2">
                  ₹100
                </h3>

              </div>

            </div>

          </div>

          {/* REFERRAL BOX */}
          <div className="mt-10">

            <label className="text-sm text-gray-500 mb-3 block font-medium">
              Your Referral Link
            </label>

            <div className="flex flex-col md:flex-row gap-4">

              <input
                type="text"
                value="https://reviewreply-ai.vercel.app/ref/afnan"
                readOnly
                className="flex-1 bg-[#f7f8fc] border border-gray-200 rounded-2xl px-5 py-4 text-gray-700 outline-none"
              />

              <button className="bg-gradient-to-r from-indigo-500 to-violet-500 hover:opacity-90 px-8 py-4 rounded-2xl font-semibold text-white transition shadow-lg">
                Copy Link
              </button>

            </div>

          </div>

          {/* TABLE */}
          <div className="mt-12">

            <div className="flex items-center justify-between mb-5">

              <h3 className="text-2xl font-bold">
                Referral Performance
              </h3>

              <button className="text-indigo-600 font-medium">
                View All
              </button>

            </div>

            <div className="overflow-x-auto border border-gray-200 rounded-3xl">

              <table className="w-full">

                <thead className="bg-[#f7f8fc]">

                  <tr className="text-left">

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      User
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Earnings
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-gray-500">
                      Joined
                    </th>

                  </tr>

                </thead>

                <tbody>

                  <tr className="border-t border-gray-100">

                    <td className="px-6 py-5">
                      No referrals yet
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      —
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      —
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      —
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-sm">

            <h3 className="text-2xl font-bold">
              Withdraw Earnings
            </h3>

            <p className="text-gray-500 mt-3 leading-7">
              Withdraw your referral rewards directly to your account once you reach minimum payout.
            </p>

            <button className="w-full mt-6 bg-black text-white py-4 rounded-2xl font-semibold hover:opacity-90 transition">
              Withdraw Now
            </button>

          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-violet-500 rounded-3xl p-7 text-white shadow-lg">

            <p className="opacity-80">
              Bonus Program
            </p>

            <h3 className="text-3xl font-bold mt-3 leading-tight">
              Invite 10 friends and unlock bonus rewards
            </h3>

            <button className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold">
              Learn More
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
