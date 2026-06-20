"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Palette, Download } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Image",
    description:
      "Drag & drop or click to upload. We support JPG, PNG, and WEBP formats up to 25MB.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Removes Background",
    description:
      "Our AI processes your image in seconds, precisely detecting and removing the background.",
  },
  {
    icon: Palette,
    step: "03",
    title: "Customize Result",
    description:
      "Choose transparent, colored, gradient, or custom backgrounds. Preview changes in real-time.",
  },
  {
    icon: Download,
    step: "04",
    title: "Download & Share",
    description:
      "Download in your preferred format. Use directly in your designs, e-commerce, or social media.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border/40 bg-muted/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps to perfect background removal
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-full bg-gradient-to-r from-violet-500/50 to-transparent lg:block" />
              )}
              <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/10 to-indigo-500/10" />
                <step.icon className="h-10 w-10 text-violet-500" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-xs font-bold text-white">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
