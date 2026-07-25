"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

type Props = {
  amount: string;
  planType: string;
  tier: "basic" | "standard";
  disabled?: boolean;
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
};

export default function PayPalButton({
  amount,
  planType,
  tier,
  disabled,
  onSuccess,
  onFailure,
}: Props) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
        locale: "en_IN", // ✅ India target — form India/+91 default dikhega
      }}
    >
      <PayPalButtons
        disabled={disabled}
        style={{
          layout: "vertical",
          color: "blue",
          shape: "rect",
          label: "paypal",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            // Pehle PayPal se payment capture karo
            await actions.order?.capture();

            // Ab apne server se confirm karwao aur plan activate/queue karwao
            const res = await fetch("/api/paypal/verify-and-activate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderID: data.orderID,
                planType,
                tier,
              }),
            });

            const result = await res.json();

            if (result.success) {
              onSuccess?.();
            } else {
              onFailure?.(result.error || "Payment verify nahi ho paya");
            }
          } catch (err) {
            onFailure?.("Kuch galat ho gaya payment verify karte waqt");
          }
        }}
        onError={(err) => {
          console.log(err);
          onFailure?.("PayPal Payment Failed");
        }}
      />
    </PayPalScriptProvider>
  );
}
