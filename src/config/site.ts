export const siteConfig = {
  name: "BackgroundAI",
  tagline: "Remove backgrounds instantly with AI.",
  description:
    "Remove image backgrounds instantly with AI. Upload your image, get a clean result in seconds. Supports transparent, colored, gradient, and custom backgrounds.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og.png",
  links: {
    twitter: "https://twitter.com/backgroundai",
    github: "https://github.com/backgroundai",
  },
  creator: "BackgroundAI",
};

export const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/api-docs", label: "API" },
];

export const dashboardLinks = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/images", label: "My Images", icon: "Image" },
  { href: "/dashboard/projects", label: "Projects", icon: "FolderOpen" },
  { href: "/dashboard/billing", label: "Billing", icon: "CreditCard" },
  { href: "/dashboard/api-keys", label: "API Keys", icon: "Key" },
  { href: "/dashboard/settings", label: "Settings", icon: "Settings" },
];

export const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/users", label: "Users", icon: "Users" },
  { href: "/admin/plans", label: "Plans", icon: "CreditCard" },
  { href: "/admin/credits", label: "Credits", icon: "Coins" },
  { href: "/admin/providers", label: "AI Providers", icon: "Cpu" },
  { href: "/admin/logs", label: "System Logs", icon: "FileText" },
  { href: "/admin/analytics", label: "Analytics", icon: "BarChart3" },
];
