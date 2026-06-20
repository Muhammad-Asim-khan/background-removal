"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-16 text-center sm:px-16"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to remove backgrounds?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Start for free. No credit card required. Process your first 10
              images today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="xl"
                className="bg-white text-violet-600 hover:bg-white/90"
                asChild
              >
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/#pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
