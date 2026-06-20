"use client";

import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  CreditCard,
  TrendingUp,
  HardDrive,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const stats = [
  {
    title: "Images Processed",
    value: "142",
    change: "+12%",
    icon: ImageIcon,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Credits Remaining",
    value: "8",
    change: "of 10",
    icon: CreditCard,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    title: "This Month",
    value: "23",
    change: "+5%",
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Storage Used",
    value: "1.2 GB",
    change: "of 5 GB",
    icon: HardDrive,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const recentImages = [
  { id: 1, name: "product-photo.jpg", date: "2 hours ago", status: "completed" },
  { id: 2, name: "headshot.png", date: "5 hours ago", status: "completed" },
  { id: 3, name: "team-photo.webp", date: "1 day ago", status: "completed" },
  { id: 4, name: "banner-image.jpg", date: "2 days ago", status: "completed" },
  { id: 5, name: "logo-transparent.png", date: "3 days ago", status: "completed" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Welcome back! Here&apos;s an overview of your account.
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/editor">
            <Plus className="mr-2 h-4 w-4" />
            New Image
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
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
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
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

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Images</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/images">
                View all <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentImages.map((image) => (
                <div
                  key={image.id}
                  className="flex items-center justify-between rounded-lg border border-border/50 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <ImageIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{image.name}</p>
                      <p className="text-xs text-muted-foreground">{image.date}</p>
                    </div>
                  </div>
                  <Badge variant="success">{image.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Free Plan</span>
                <Badge variant="secondary">Current</Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                10 credits per month
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Credits used</span>
                <span className="font-medium">2 / 10</span>
              </div>
              <Progress value={20} className="mt-2" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span>Storage</span>
                <span className="font-medium">1.2 / 5 GB</span>
              </div>
              <Progress value={24} className="mt-2" />
            </div>

            <Button variant="gradient" className="w-full" asChild>
              <Link href="/dashboard/billing">Upgrade Plan</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
