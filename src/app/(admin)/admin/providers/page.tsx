"use client";

import { useState } from "react";
import { Cpu, CheckCircle2, XCircle, Settings, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const providers = [
  {
    id: "removebg",
    name: "Remove.bg",
    description: "Industry-leading background removal API",
    active: true,
    priority: 1,
    status: "connected",
    usage: "12,345 requests this month",
    latency: "1.2s avg",
  },
  {
    id: "clipdrop",
    name: "Clipdrop",
    description: "AI-powered image editing by Stability AI",
    active: false,
    priority: 2,
    status: "configured",
    usage: "0 requests this month",
    latency: "N/A",
  },
  {
    id: "photoroom",
    name: "Photoroom",
    description: "Professional product photo editing",
    active: false,
    priority: 3,
    status: "configured",
    usage: "0 requests this month",
    latency: "N/A",
  },
  {
    id: "replicate",
    name: "Replicate",
    description: "Open-source AI models on demand",
    active: false,
    priority: 4,
    status: "not_configured",
    usage: "0 requests this month",
    latency: "N/A",
  },
  {
    id: "custom",
    name: "Custom Model",
    description: "Self-hosted or custom AI model endpoint",
    active: false,
    priority: 5,
    status: "not_configured",
    usage: "0 requests this month",
    latency: "N/A",
  },
];

export default function AdminProvidersPage() {
  const [providerList, setProviderList] = useState(providers);

  function toggleProvider(id: string) {
    setProviderList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Providers</h1>
        <p className="text-sm text-muted-foreground">
          Configure and manage AI background removal providers. The system uses the
          highest-priority active provider.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Provider Priority</CardTitle>
          <CardDescription>
            Active providers are tried in priority order. If the primary fails, the
            next active provider is used automatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {providerList.map((provider) => (
              <div
                key={provider.id}
                className={`flex items-center justify-between rounded-lg border p-4 transition-all ${
                  provider.active
                    ? "border-violet-500/30 bg-violet-500/5"
                    : "border-border/50"
                }`}
              >
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-grab">
                    <ArrowUpDown className="h-3 w-3" />
                  </Button>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Cpu className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{provider.name}</p>
                      {provider.status === "connected" ? (
                        <Badge variant="success" className="text-[10px]">
                          <CheckCircle2 className="mr-1 h-2.5 w-2.5" />
                          Connected
                        </Badge>
                      ) : provider.status === "configured" ? (
                        <Badge variant="outline" className="text-[10px]">Configured</Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          <XCircle className="mr-1 h-2.5 w-2.5" />
                          Not Configured
                        </Badge>
                      )}
                      {provider.active && provider.priority === 1 && (
                        <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] text-white">
                          Primary
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{provider.description}</p>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{provider.usage}</span>
                      <span>Latency: {provider.latency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-3 w-3" />
                        Configure
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Configure {provider.name}</DialogTitle>
                        <DialogDescription>
                          Enter your API credentials for {provider.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>API Key</Label>
                          <Input type="password" placeholder="Enter API key..." />
                        </div>
                        {provider.id === "custom" && (
                          <div className="space-y-2">
                            <Label>Base URL</Label>
                            <Input placeholder="https://your-model.api.com" />
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button variant="gradient">Save Configuration</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Switch
                    checked={provider.active}
                    onCheckedChange={() => toggleProvider(provider.id)}
                    disabled={provider.status === "not_configured"}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
