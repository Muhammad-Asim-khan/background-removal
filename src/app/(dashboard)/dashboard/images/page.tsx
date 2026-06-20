"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Download,
  Trash2,
  Filter,
  Grid,
  List,
  Search,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

const demoImages = Array.from({ length: 12 }, (_, i) => ({
  id: `img-${i + 1}`,
  name: `image-${i + 1}.${["jpg", "png", "webp"][i % 3]}`,
  date: `${i + 1} day${i > 0 ? "s" : ""} ago`,
  size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
  status: "completed" as const,
  format: ["jpg", "png", "webp"][i % 3],
}));

export default function ImagesPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  function toggleSelect(id: string) {
    setSelectedImages((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Images</h1>
          <p className="text-sm text-muted-foreground">
            Manage your uploaded and processed images
          </p>
        </div>
        <Button variant="gradient" asChild>
          <Link href="/editor">
            <Plus className="mr-2 h-4 w-4" />
            Upload New
          </Link>
        </Button>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search images..." className="pl-9" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-36">
              <Filter className="mr-2 h-3 w-3" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Images</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          {selectedImages.length > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{selectedImages.length} selected</Badge>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-3 w-3" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="text-destructive">
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </Button>
            </div>
          )}
          <div className="flex rounded-lg border border-border">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setView("grid")}
            >
              <Grid className="h-3 w-3" />
            </Button>
            <Button
              variant={view === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setView("list")}
            >
              <List className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {demoImages.map((image, i) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedImages.includes(image.id)
                    ? "ring-2 ring-violet-500"
                    : ""
                }`}
                onClick={() => toggleSelect(image.id)}
              >
                <CardContent className="p-0">
                  <div className="flex aspect-square items-center justify-center bg-muted rounded-t-xl">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium">{image.name}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{image.date}</span>
                      <Badge variant="outline" className="text-[10px]">
                        {image.format.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {demoImages.map((image) => (
                <div
                  key={image.id}
                  className={`flex items-center justify-between p-4 transition-colors hover:bg-muted/50 cursor-pointer ${
                    selectedImages.includes(image.id) ? "bg-violet-500/5" : ""
                  }`}
                  onClick={() => toggleSelect(image.id)}
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
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{image.size}</span>
                    <Badge variant="success">Completed</Badge>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
