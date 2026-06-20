"use client";

import { motion } from "framer-motion";
import { FolderOpen, Plus, Image as ImageIcon, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const projects = [
  { id: "1", name: "E-commerce Products", images: 45, updated: "2 hours ago" },
  { id: "2", name: "Marketing Assets", images: 23, updated: "1 day ago" },
  { id: "3", name: "Team Headshots", images: 12, updated: "3 days ago" },
  { id: "4", name: "Social Media", images: 67, updated: "1 week ago" },
  { id: "5", name: "Website Redesign", images: 34, updated: "2 weeks ago" },
  { id: "6", name: "Client Work", images: 8, updated: "3 weeks ago" },
];

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground">
            Organize your images into projects
          </p>
        </div>
        <Button variant="gradient">
          <Plus className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="cursor-pointer transition-all hover:shadow-md hover:border-violet-500/30">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10">
                    <FolderOpen className="h-6 w-6 text-violet-500" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="mt-4 font-semibold">{project.name}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ImageIcon className="h-3 w-3" />
                    {project.images} images
                  </span>
                  <span>Updated {project.updated}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
