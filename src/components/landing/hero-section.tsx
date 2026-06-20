"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback(() => {
    window.location.href = "/editor";
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
  });

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute top-1/3 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <motion.div
          className="absolute top-20 right-20 h-2 w-2 rounded-full bg-violet-400"
          animate={{ y: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 left-20 h-3 w-3 rounded-full bg-indigo-400"
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 right-40 h-2 w-2 rounded-full bg-purple-400"
          animate={{ y: [0, -15, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 pt-20 text-center sm:px-6 sm:pt-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-400"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Powered by multiple AI providers
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
        >
          Remove backgrounds{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            instantly
          </span>{" "}
          with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          Upload your image, get a clean result in seconds. Professional-grade
          background removal powered by the best AI models.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Button variant="gradient" size="xl" asChild>
            <Link href="/editor">
              Start Removing Backgrounds
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button variant="outline" size="xl" asChild>
            <Link href="/#pricing">View Pricing</Link>
          </Button>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div
            {...getRootProps()}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-12 transition-all duration-300 ${
              isDragging
                ? "border-violet-500 bg-violet-500/10"
                : "border-border/60 hover:border-violet-500/50 hover:bg-violet-500/5"
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-indigo-500/20 transition-transform group-hover:scale-110">
                <Upload className="h-8 w-8 text-violet-500" />
              </div>
              <div>
                <p className="text-lg font-medium">
                  Drop your image here or click to upload
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Supports JPG, PNG, WEBP up to 25MB
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {[
            { icon: ImageIcon, label: "Images Processed", value: "10M+" },
            { icon: Zap, label: "Average Speed", value: "<5s" },
            { icon: Shield, label: "Accuracy Rate", value: "99.9%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <stat.icon className="h-5 w-5 text-violet-500" />
              <span className="text-2xl font-bold sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
