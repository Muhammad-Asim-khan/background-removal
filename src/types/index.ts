export type Plan = "free" | "starter" | "pro" | "business";

export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing" | "inactive";

export type ImageFormat = "png" | "jpg" | "webp";

export type BackgroundType =
  | "transparent"
  | "white"
  | "color"
  | "gradient"
  | "custom"
  | "blur"
  | "studio"
  | "office"
  | "nature"
  | "ecommerce";

export type AIProviderType =
  | "removebg"
  | "clipdrop"
  | "photoroom"
  | "replicate"
  | "custom";

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  plan: Plan;
  credits: number;
  role: "user" | "admin";
  createdAt: Date;
}

export interface ProcessedImage {
  id: string;
  userId: string;
  originalUrl: string;
  processedUrl: string;
  thumbnailUrl?: string;
  fileName: string;
  fileSize: number;
  width: number;
  height: number;
  format: ImageFormat;
  backgroundType: BackgroundType;
  provider: AIProviderType;
  creditsUsed: number;
  createdAt: Date;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export interface APIKey {
  id: string;
  userId: string;
  name: string;
  key: string;
  lastUsed?: Date;
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: "usage" | "purchase" | "bonus" | "refund";
  description: string;
  createdAt: Date;
}

export interface PricingPlan {
  id: string;
  name: string;
  plan: Plan;
  credits: number | "unlimited";
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  popular?: boolean;
  stripePriceIdMonthly?: string;
  stripePriceIdAnnual?: string;
}

export interface AIProviderConfig {
  id: string;
  provider: AIProviderType;
  name: string;
  apiKey?: string;
  baseUrl?: string;
  isActive: boolean;
  priority: number;
  settings: Record<string, unknown>;
}
