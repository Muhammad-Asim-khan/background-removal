"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Palette,
  Layers,
  Download,
  Code2,
  Shield,
  Image as ImageIcon,
  Wand2,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Remove backgrounds in under 5 seconds. Our AI processes images faster than any competitor.",
  },
  {
    icon: Wand2,
    title: "AI-Powered Precision",
    description:
      "Advanced AI models handle hair, fur, transparent objects, and complex edges with pixel-perfect accuracy.",
  },
  {
    icon: Palette,
    title: "Background Editor",
    description:
      "Add custom colors, gradients, studio backgrounds, or upload your own. Real-time preview included.",
  },
  {
    icon: Layers,
    title: "Batch Processing",
    description:
      "Process hundreds of images at once. Perfect for e-commerce, marketing teams, and agencies.",
  },
  {
    icon: Download,
    title: "Multiple Formats",
    description:
      "Export in PNG, JPG, or WEBP. Choose transparent backgrounds or any color you need.",
  },
  {
    icon: Code2,
    title: "Developer API",
    description:
      "Integrate background removal into your app with our RESTful API. Full documentation included.",
  },
  {
    icon: ImageIcon,
    title: "Image Upscaler",
    description:
      "Enhance image quality up to 4x. Remove backgrounds and upscale in one workflow.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant. Images are processed securely and deleted after download.",
  },
  {
    icon: Users,
    title: "Team Workspaces",
    description:
      "Collaborate with your team. Shared projects, usage tracking, and centralized billing.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              remove backgrounds
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Professional tools for designers, developers, and businesses.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10 transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6 text-violet-500" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
