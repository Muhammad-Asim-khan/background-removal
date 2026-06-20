"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Coins,
  Cpu,
  FileText,
  BarChart3,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";

const adminItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/plans", label: "Plans", icon: CreditCard },
  { href: "/admin/credits", label: "Credits", icon: Coins },
  { href: "/admin/providers", label: "AI Providers", icon: Cpu },
  { href: "/admin/logs", label: "System Logs", icon: FileText },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border/40 bg-background">
      <div className="flex h-14 items-center gap-2 border-b border-border/40 px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <span className="font-semibold text-sm">BackgroundAI</span>
          <span className="ml-2 rounded bg-orange-500/10 px-1.5 py-0.5 text-[10px] font-medium text-orange-500">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {adminItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/40 p-2">
        <Button variant="ghost" className="w-full justify-start gap-3" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    </aside>
  );
}
