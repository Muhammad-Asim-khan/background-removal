"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, CreditCard, Receipt, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PLANS } from "@/config/plans";

const invoices = [
  { id: "INV-001", date: "Jun 1, 2026", amount: "$0.00", status: "Free Plan" },
  { id: "INV-002", date: "May 1, 2026", amount: "$0.00", status: "Free Plan" },
  { id: "INV-003", date: "Apr 1, 2026", amount: "$0.00", status: "Free Plan" },
];

export default function BillingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Current Plan</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You are currently on the <Badge variant="secondary">Free</Badge> plan
              </p>
            </div>
            <Button variant="outline">
              Manage Subscription <ArrowUpRight className="ml-2 h-3 w-3" />
            </Button>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Credits</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-medium">8 / 10 remaining</span>
              </div>
              <Progress value={80} className="mt-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Billing Period</p>
              <p className="mt-2 font-medium">Jun 1 - Jun 30, 2026</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Upgrade Plan</h2>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background p-1">
            <button
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                !annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                annual ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
              onClick={() => setAnnual(true)}
            >
              Annual (-20%)
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className={plan.popular ? "border-violet-500 shadow-lg shadow-violet-500/10" : ""}>
                <CardContent className="p-6">
                  {plan.popular && (
                    <Badge className="mb-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                      Popular
                    </Badge>
                  )}
                  <h3 className="font-semibold">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      ${annual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="text-sm text-muted-foreground">/mo</span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {plan.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Check className="h-3 w-3 text-violet-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.popular ? "gradient" : "outline"}
                    className="mt-4 w-full"
                    size="sm"
                    disabled={plan.plan === "free"}
                  >
                    {plan.plan === "free" ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Receipt className="h-4 w-4" />
            Invoice History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{invoice.id}</p>
                    <p className="text-xs text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{invoice.amount}</span>
                  <Badge variant="outline">{invoice.status}</Badge>
                  <Button variant="ghost" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
