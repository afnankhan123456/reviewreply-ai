import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { amount } = await req.json();

    // PAYPAL ACCESS TOKEN

    const auth = Buffer.from(
      `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`
    ).toString("base64");

    const tokenResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const tokenData = await tokenResponse.json();

    const accessToken = tokenData.access_token;

    // CREATE ORDER

    const orderResponse = await fetch(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },

        body: JSON.stringify({

          intent: "CAPTURE",

          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: amount,
              },
            },
          ],

          application_context: {

            return_url:
              "https://reviewreply-ai-pi.vercel.app/plans/basic/dashbord",

            cancel_url:
              "https://reviewreply-ai-pi.vercel.app/plans/basic/pricing",

            brand_name: "ReviewReply AI",

            landing_page: "LOGIN",

            user_action: "PAY_NOW",

          },

        }),
      }
    );

    const orderData = await orderResponse.json();

    const approveLink = orderData.links.find(
      (link: any) => link.rel === "approve"
    );

    return NextResponse.json({
      url: approveLink.href,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        error: "PayPal Error",
      },
      {
        status: 500,
      }
    );

  }

}