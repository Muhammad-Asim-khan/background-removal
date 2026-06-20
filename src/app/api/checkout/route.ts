import { NextRequest } from "next/server";
import { stripe, STRIPE_PLANS } from "@/lib/stripe/config";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { plan, interval } = body as {
      plan: keyof typeof STRIPE_PLANS;
      interval: "monthly" | "annual";
    };

    if (!plan || !interval) {
      return Response.json(
        { error: "Plan and interval are required" },
        { status: 400 }
      );
    }

    const stripePlan = STRIPE_PLANS[plan];
    if (!stripePlan) {
      return Response.json({ error: "Invalid plan" }, { status: 400 });
    }

    const priceId = stripePlan[interval];
    if (!priceId) {
      return Response.json(
        { error: "Invalid interval for plan" },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard/billing?success=true`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Checkout failed";
    return Response.json({ error: message }, { status: 500 });
  }
}
