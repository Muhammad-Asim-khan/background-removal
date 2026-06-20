"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dailyStats = [
  { day: "Mon", images: 1234, revenue: 456 },
  { day: "Tue", images: 1567, revenue: 523 },
  { day: "Wed", images: 1890, revenue: 612 },
  { day: "Thu", images: 1456, revenue: 489 },
  { day: "Fri", images: 2100, revenue: 734 },
  { day: "Sat", images: 890, revenue: 312 },
  { day: "Sun", images: 678, revenue: 234 },
];

const topUsers = [
  { name: "David Kim", images: 1234, plan: "Business" },
  { name: "Priya Patel", images: 456, plan: "Pro" },
  { name: "Sarah Chen", images: 234, plan: "Pro" },
  { name: "Marcus Johnson", images: 89, plan: "Starter" },
  { name: "Alex Thompson", images: 10, plan: "Free" },
];

const providerStats = [
  { name: "Remove.bg", requests: 34567, success: 99.8, avgLatency: "1.2s" },
  { name: "Clipdrop", requests: 1234, success: 98.5, avgLatency: "1.8s" },
  { name: "Photoroom", requests: 567, success: 99.1, avgLatency: "2.1s" },
  { name: "Replicate", requests: 89, success: 97.2, avgLatency: "3.5s" },
];

export default function AdminAnalyticsPage() {
  const maxImages = Math.max(...dailyStats.map((d) => d.images));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Platform usage and performance metrics</p>
        </div>
        <Select defaultValue="7d">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24 hours</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { title: "Total Images", value: "45,892", change: "+12%" },
          { title: "Revenue", value: "$12,450", change: "+8%" },
          { title: "Avg Response Time", value: "1.4s", change: "-5%" },
          { title: "API Calls", value: "23,456", change: "+18%" },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <p className="text-xs text-muted-foreground">{stat.title}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              <span className="text-xs text-emerald-500">{stat.change} vs last period</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Images Processed (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-48">
            {dailyStats.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-medium">{day.images}</span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-indigo-500 transition-all hover:opacity-80"
                  style={{ height: `${(day.images / maxImages) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, i) => (
                <div key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.images.toLocaleString()} images</p>
                    </div>
                  </div>
                  <Badge variant="outline">{user.plan}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI Provider Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {providerStats.map((provider) => (
                <div key={provider.name} className="flex items-center justify-between rounded-lg border p-3">
                  <div>
                    <p className="text-sm font-medium">{provider.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {provider.requests.toLocaleString()} requests
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Success</p>
                      <p className="font-medium text-emerald-500">{provider.success}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="font-medium">{provider.avgLatency}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
