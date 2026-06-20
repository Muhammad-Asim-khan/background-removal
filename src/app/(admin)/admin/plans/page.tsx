"use client";

import { Edit, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/config/plans";

export default function AdminPlansPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Plans</h1>
          <p className="text-sm text-muted-foreground">Configure subscription plans and pricing</p>
        </div>
        <Button variant="gradient">
          <Plus className="mr-2 h-4 w-4" />
          Create Plan
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-violet-500" : ""}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{plan.name}</h3>
                {plan.popular && (
                  <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[10px]">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="mt-3">
                <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {typeof plan.credits === "number" ? `${plan.credits.toLocaleString()} credits` : "Unlimited credits"}
              </p>
              <div className="mt-4 space-y-2 text-xs text-muted-foreground">
                <p>Annual: ${plan.annualPrice}/yr</p>
                <p>Features: {plan.features.length}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-1 h-3 w-3" /> Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscription Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { plan: "Free", users: 1842, revenue: "$0" },
              { plan: "Starter", users: 312, revenue: "$2,808" },
              { plan: "Pro", users: 156, revenue: "$4,524" },
              { plan: "Business", users: 30, revenue: "$2,970" },
            ].map((stat) => (
              <div key={stat.plan} className="rounded-lg border p-4 text-center">
                <p className="text-sm font-medium">{stat.plan}</p>
                <p className="mt-1 text-2xl font-bold">{stat.users}</p>
                <p className="text-xs text-muted-foreground">users &middot; {stat.revenue}/mo</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
