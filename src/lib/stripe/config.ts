import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-05-27.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const STRIPE_PLANS = {
  starter: {
    monthly: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID || "",
    annual: process.env.STRIPE_STARTER_ANNUAL_PRICE_ID || "",
  },
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "",
    annual: process.env.STRIPE_PRO_ANNUAL_PRICE_ID || "",
  },
  business: {
    monthly: process.env.STRIPE_BUSINESS_MONTHLY_PRICE_ID || "",
    annual: process.env.STRIPE_BUSINESS_ANNUAL_PRICE_ID || "",
  },
} as const;
