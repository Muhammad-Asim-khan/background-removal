"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Key, Plus, Copy, Eye, EyeOff, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const demoKeys = [
  { id: "1", name: "Production App", key: "bgai_prod_***************8f2a", lastUsed: "2 hours ago", created: "Jan 15, 2026", active: true },
  { id: "2", name: "Development", key: "bgai_dev_***************3c1b", lastUsed: "1 day ago", created: "Mar 1, 2026", active: true },
  { id: "3", name: "Testing", key: "bgai_test_***************9d4e", lastUsed: "Never", created: "Jun 10, 2026", active: false },
];

export default function APIKeysPage() {
  const [showKey, setShowKey] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">API Keys</h1>
          <p className="text-sm text-muted-foreground">
            Manage your API keys for programmatic access
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Give your API key a descriptive name to identify it later.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="key-name">Key Name</Label>
                <Input id="key-name" placeholder="e.g., Production App" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Cancel</Button>
              <Button variant="gradient">Create Key</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Usage</CardTitle>
          <CardDescription>
            Use your API key in the Authorization header: <code className="rounded bg-muted px-1.5 py-0.5 text-xs">Bearer YOUR_API_KEY</code>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-zinc-950 p-4">
            <pre className="text-sm text-emerald-400">
{`curl -X POST https://api.backgroundai.com/v1/remove-background \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg"`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {demoKeys.map((apiKey, i) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
                      <Key className="h-5 w-5 text-violet-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{apiKey.name}</p>
                        <Badge variant={apiKey.active ? "success" : "secondary"}>
                          {apiKey.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Created {apiKey.created}</span>
                        <span>Last used {apiKey.lastUsed}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                      {showKey === apiKey.id ? "bgai_prod_abc123def456gh789" : apiKey.key}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setShowKey(showKey === apiKey.id ? null : apiKey.id)}
                    >
                      {showKey === apiKey.id ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
