"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Users,
  CreditCard,
  Image as ImageIcon,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const adminStats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Total Users",
    value: "2,340",
    change: "+8.2%",
    trend: "up",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Active Subscriptions",
    value: "156",
    change: "+23.1%",
    trend: "up",
    icon: CreditCard,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "Images Processed",
    value: "45,892",
    change: "+4.5%",
    trend: "up",
    icon: ImageIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const recentUsers = [
  { name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", joined: "2 hours ago" },
  { name: "Marcus Johnson", email: "marcus@example.com", plan: "Starter", joined: "5 hours ago" },
  { name: "Elena Rodriguez", email: "elena@example.com", plan: "Free", joined: "1 day ago" },
  { name: "David Kim", email: "david@example.com", plan: "Business", joined: "2 days ago" },
  { name: "Priya Patel", email: "priya@example.com", plan: "Pro", joined: "3 days ago" },
];

const recentActivity = [
  { action: "User upgraded to Pro", time: "2 min ago", type: "success" },
  { action: "AI Provider switched to Clipdrop", time: "15 min ago", type: "info" },
  { action: "New user registered", time: "30 min ago", type: "default" },
  { action: "Stripe webhook received", time: "1 hour ago", type: "info" },
  { action: "Batch processing completed", time: "2 hours ago", type: "success" },
  { action: "Rate limit exceeded by API key", time: "3 hours ago", type: "warning" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Overview of your platform metrics
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                  }`}>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Users</CardTitle>
            <Badge variant="secondary">{recentUsers.length} new</Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.email} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs font-medium text-white">
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{user.plan}</Badge>
                    <span className="text-xs text-muted-foreground">{user.joined}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    activity.type === "success" ? "bg-emerald-500" :
                    activity.type === "warning" ? "bg-yellow-500" :
                    activity.type === "info" ? "bg-blue-500" : "bg-muted-foreground"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
