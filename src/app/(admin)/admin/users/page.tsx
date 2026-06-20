"use client";

import { Search, Filter, MoreHorizontal, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const users = [
  { id: "1", name: "Sarah Chen", email: "sarah@example.com", plan: "Pro", credits: 4500, images: 234, role: "user", status: "active", joined: "Jan 15, 2026" },
  { id: "2", name: "Marcus Johnson", email: "marcus@example.com", plan: "Starter", credits: 300, images: 89, role: "user", status: "active", joined: "Feb 20, 2026" },
  { id: "3", name: "Elena Rodriguez", email: "elena@example.com", plan: "Free", credits: 3, images: 7, role: "user", status: "active", joined: "Mar 5, 2026" },
  { id: "4", name: "David Kim", email: "david@example.com", plan: "Business", credits: -1, images: 1234, role: "admin", status: "active", joined: "Dec 1, 2025" },
  { id: "5", name: "Priya Patel", email: "priya@example.com", plan: "Pro", credits: 2100, images: 456, role: "user", status: "active", joined: "Apr 10, 2026" },
  { id: "6", name: "Alex Thompson", email: "alex@example.com", plan: "Free", credits: 0, images: 10, role: "user", status: "suspended", joined: "May 20, 2026" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <p className="text-sm text-muted-foreground">
          View and manage all registered users
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-36">
            <Filter className="mr-2 h-3 w-3" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Plan</th>
                  <th className="px-4 py-3 font-medium">Credits</th>
                  <th className="px-4 py-3 font-medium">Images</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-xs text-white">
                          {user.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-medium">{user.name}</p>
                            {user.role === "admin" && <Shield className="h-3 w-3 text-orange-500" />}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{user.plan}</Badge>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {user.credits === -1 ? "Unlimited" : user.credits.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm">{user.images.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <Badge variant={user.status === "active" ? "success" : "destructive"}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-3 w-3" /> Send Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit Plan</DropdownMenuItem>
                          <DropdownMenuItem>Add Credits</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
