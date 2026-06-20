"use client";

import { motion } from "framer-motion";

const companies = [
  "Google",
  "Microsoft",
  "Amazon",
  "Shopify",
  "Adobe",
  "Figma",
  "Stripe",
  "Vercel",
];

export function TrustedBySection() {
  return (
    <section className="border-y border-border/40 bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground">
          TRUSTED BY TEAMS AT
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company, i) => (
            <motion.div
              key={company}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-lg font-semibold text-muted-foreground/50 transition-colors hover:text-muted-foreground"
            >
              {company}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
