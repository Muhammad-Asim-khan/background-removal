"use client";

import { Search, Filter, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const logs = [
  { id: "1", level: "info", message: "User sarah@example.com upgraded to Pro plan", timestamp: "2026-06-20 13:15:42", source: "billing" },
  { id: "2", level: "info", message: "AI provider switched: removebg -> clipdrop (fallback)", timestamp: "2026-06-20 13:10:18", source: "ai-engine" },
  { id: "3", level: "warn", message: "Rate limit reached for API key bgai_prod_***8f2a", timestamp: "2026-06-20 12:45:33", source: "api" },
  { id: "4", level: "error", message: "Stripe webhook signature verification failed", timestamp: "2026-06-20 12:30:01", source: "webhook" },
  { id: "5", level: "info", message: "Batch processing completed: 50 images in 45s", timestamp: "2026-06-20 12:15:22", source: "processing" },
  { id: "6", level: "info", message: "New user registered: marcus@example.com", timestamp: "2026-06-20 11:50:10", source: "auth" },
  { id: "7", level: "warn", message: "Storage usage at 85% for user david@example.com", timestamp: "2026-06-20 11:30:44", source: "storage" },
  { id: "8", level: "error", message: "Remove.bg API timeout after 30s", timestamp: "2026-06-20 11:15:02", source: "ai-engine" },
  { id: "9", level: "info", message: "Scheduled credit reset completed for 156 users", timestamp: "2026-06-20 10:00:00", source: "cron" },
  { id: "10", level: "info", message: "System backup completed successfully", timestamp: "2026-06-20 06:00:00", source: "system" },
];

function getLevelColor(level: string) {
  switch (level) {
    case "error": return "destructive";
    case "warn": return "outline";
    case "info": return "secondary";
    default: return "secondary" as const;
  }
}

export default function AdminLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">System Logs</h1>
          <p className="text-sm text-muted-foreground">Monitor system activity and errors</p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="mr-2 h-3 w-3" />
          Refresh
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-32">
            <Filter className="mr-2 h-3 w-3" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warn">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            <SelectItem value="api">API</SelectItem>
            <SelectItem value="auth">Auth</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="ai-engine">AI Engine</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 px-4 py-3 hover:bg-muted/50 transition-colors">
                <Badge variant={getLevelColor(log.level)} className="mt-0.5 shrink-0 text-[10px] uppercase w-14 justify-center">
                  {log.level}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-mono">{log.message}</p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{log.timestamp}</span>
                    <Badge variant="outline" className="text-[10px]">{log.source}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
