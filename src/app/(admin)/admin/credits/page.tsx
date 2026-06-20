"use client";

import { Coins, TrendingUp, ArrowUpRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const transactions = [
  { id: "1", user: "Sarah Chen", type: "usage", amount: -1, description: "Background removal", date: "2 min ago" },
  { id: "2", user: "Marcus Johnson", type: "purchase", amount: 500, description: "Starter plan credits", date: "1 hour ago" },
  { id: "3", user: "Elena Rodriguez", type: "usage", amount: -1, description: "Background removal", date: "2 hours ago" },
  { id: "4", user: "David Kim", type: "bonus", amount: 100, description: "Admin bonus", date: "5 hours ago" },
  { id: "5", user: "Priya Patel", type: "usage", amount: -5, description: "Batch processing (5 images)", date: "1 day ago" },
  { id: "6", user: "Alex Thompson", type: "refund", amount: 10, description: "Processing error refund", date: "2 days ago" },
];

export default function AdminCreditsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Credit Management</h1>
        <p className="text-sm text-muted-foreground">Track and manage credit transactions</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { title: "Total Credits Issued", value: "2.4M", change: "+15%", icon: Coins },
          { title: "Credits Used Today", value: "1,234", change: "+8%", icon: TrendingUp },
          { title: "Average Per User", value: "342", change: "+3%", icon: ArrowUpRight },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <stat.icon className="h-5 w-5 text-violet-500" />
                <span className="text-xs text-emerald-500">{stat.change}</span>
              </div>
              <p className="mt-3 text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Recent Transactions</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search transactions..." className="pl-9 h-8 text-sm" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    tx.amount > 0 ? "bg-emerald-500/10" : "bg-orange-500/10"
                  }`}>
                    <Coins className={`h-4 w-4 ${tx.amount > 0 ? "text-emerald-500" : "text-orange-500"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.user}</p>
                    <p className="text-xs text-muted-foreground">{tx.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={
                    tx.type === "usage" ? "secondary" :
                    tx.type === "purchase" ? "default" :
                    tx.type === "bonus" ? "success" : "outline"
                  }>
                    {tx.type}
                  </Badge>
                  <span className={`text-sm font-medium ${tx.amount > 0 ? "text-emerald-500" : "text-orange-500"}`}>
                    {tx.amount > 0 ? "+" : ""}{tx.amount}
                  </span>
                  <span className="text-xs text-muted-foreground w-20 text-right">{tx.date}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="mt-4 w-full" size="sm">Load More</Button>
        </CardContent>
      </Card>
    </div>
  );
}
