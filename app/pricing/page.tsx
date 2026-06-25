"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black text-black dark:text-white flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8">

        <div className="text-center">

          <h1 className="text-4xl font-bold mb-3">
            Pro Plan
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            Unlock premium AI review reply features
          </p>

          <div className="mb-8">

            <h2 className="text-5xl font-bold">
              $19
              <span className="text-lg text-zinc-500">
                /month
              </span>
            </h2>

          </div>

        </div>

        <div className="space-y-4 mb-8">

          <div className="flex items-center gap-3">
            <span>✔</span>
            <p>Unlimited AI Replies</p>
          </div>

          <div className="flex items-center gap-3">
            <span>✔</span>
            <p>Analytics Dashboard</p>
          </div>

          <div className="flex items-center gap-3">
            <span>✔</span>
            <p>Review Management</p>
          </div>

          <div className="flex items-center gap-3">
            <span>✔</span>
            <p>Business Insights</p>
          </div>

        </div>

        <div className="mt-8">

          <PayPalScriptProvider
            options={{
              clientId:
                process.env
                  .NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
              vault: true,
              intent: "subscription",
            }}
          >

            <PayPalButtons

              style={{
                layout: "vertical",
                shape: "rect",
                label: "subscribe",
              }}

              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: "YOUR_PLAN_ID",
                });
              }}

              onApprove={async () => {
                alert("Subscription Successful 🎉");
              }}

            />

          </PayPalScriptProvider>

        </div>

      </div>

    </div>
  );
}
