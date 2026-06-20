"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Image as ImageIcon,
  FolderOpen,
  CreditCard,
  Key,
  Settings,
  Sparkles,
  LogOut,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sidebarItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/images", label: "My Images", icon: ImageIcon },
  { href: "/dashboard/projects", label: "Projects", icon: FolderOpen },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "/dashboard/api-keys", label: "API Keys", icon: Key },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

interface DashboardSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function DashboardSidebar({ collapsed, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border/40 bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-14 items-center justify-between border-b border-border/40 px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-violet-600 to-indigo-600">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-semibold">BackgroundAI</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={onToggle} className="h-8 w-8">
          <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {sidebarItems.map((item) => {
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
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/40 p-2">
        {!collapsed && (
          <div className="mb-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-indigo-500/10 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Credits</span>
              <Badge variant="secondary" className="text-xs">Free</Badge>
            </div>
            <p className="mt-1 text-2xl font-bold">8 <span className="text-sm font-normal text-muted-foreground">/ 10</span></p>
            <Button variant="gradient" size="sm" className="mt-2 w-full" asChild>
              <Link href="/dashboard/billing">Upgrade</Link>
            </Button>
          </div>
        )}
        <Button variant="ghost" className={cn("w-full justify-start gap-3", collapsed && "justify-center")}>
          <LogOut className="h-4 w-4" />
          {!collapsed && "Log out"}
        </Button>
      </div>
    </aside>
  );
}
