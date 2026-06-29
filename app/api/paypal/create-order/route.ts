import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const { amount } = await req.json();

    // VALIDATION

    if (!amount) {

      return NextResponse.json(
        {
          error: "Amount is required",
        },
        {
          status: 400,
        }
      );

    }

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

    // TOKEN ERROR CHECK

    if (!tokenData.access_token) {

      console.log("PayPal Token Error:", tokenData);

      return NextResponse.json(
        {
          error: "Failed to get PayPal access token",
        },
        {
          status: 500,
        }
      );

    }

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
              "https://reviewreply-ai-pi.vercel.app/plans/basic/dashboard",

            cancel_url:
              "https://reviewreply-ai-pi.vercel.app/plans/basic/pricing",

            brand_name: "ReviewReply AI",

            landing_page: "BILLING",

            user_action: "PAY_NOW",

          },

        }),
      }
    );

    const orderData = await orderResponse.json();

    // PAYPAL ORDER ERROR CHECK

    if (!orderData.links) {

      console.log("PayPal Order Error:", orderData);

      return NextResponse.json(
        {
          error: "Failed to create PayPal order",
        },
        {
          status: 500,
        }
      );

    }

    // APPROVE URL

    const approveLink = orderData.links?.find(
      (link: any) => link.rel === "approve"
    );

    if (!approveLink) {

      return NextResponse.json(
        {
          error: "No approval link found",
        },
        {
          status: 500,
        }
      );

    }

    // SUCCESS

    return NextResponse.json({
      url: approveLink.href,
    });

  } catch (error) {

    console.log("PAYPAL ERROR:", error);

    return NextResponse.json(
      {
        error: "PayPal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}
