"use client";

import {
  PayPalButtons,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";

type Props = {
  amount: string;
};

export default function PayPalButton({ amount }: Props) {

  return (

    <PayPalScriptProvider
      options={{
        clientId:
          process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
        currency: "USD",
      }}
    >

      <PayPalButtons

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
                  value: amount,
                },
              },
            ],

          });

        }}

        onApprove={async (data, actions) => {

          const details = await actions.order?.capture();

          alert("Payment Successful");

          console.log(details);

        }}

        onError={(err) => {

          console.log(err);

          alert("PayPal Payment Failed");

        }}

      />

    </PayPalScriptProvider>

  );

}