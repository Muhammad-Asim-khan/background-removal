"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const codeExample = `// Remove background with one API call
const response = await fetch('https://api.backgroundai.com/v1/remove-background', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    image_url: 'https://example.com/photo.jpg',
    format: 'png',
    background: 'transparent',
  }),
});

const result = await response.json();
console.log(result.output_url);`;

export function APISection() {
  return (
    <section className="border-t border-border/40 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Powerful{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                API
              </span>{" "}
              for developers
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Integrate background removal into your app with just a few lines
              of code. Full REST API with webhooks, rate limiting, and usage
              analytics.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "RESTful API with JSON responses",
                "Webhook support for async processing",
                "Rate limiting and usage analytics",
                "SDKs for JavaScript, Python, and more",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <Button variant="gradient" size="lg" className="mt-8" asChild>
              <Link href="/api-docs">
                View API Docs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-hidden rounded-xl border border-border/50 bg-zinc-950 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-white/40">api-example.ts</span>
              </div>
              <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
                <code className="text-emerald-400">{codeExample}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
