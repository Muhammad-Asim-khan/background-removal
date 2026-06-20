"use client";

import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-border/40 px-6">
          <h2 className="text-sm font-medium text-muted-foreground">
            Admin Panel
          </h2>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-xs text-white">
                AD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
