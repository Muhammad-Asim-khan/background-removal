"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer at Figma",
    content:
      "BackgroundAI has transformed our design workflow. What used to take 15 minutes per image now takes seconds. The quality is indistinguishable from manual work.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "E-commerce Manager",
    content:
      "We process thousands of product images monthly. BackgroundAI's batch processing and API have cut our costs by 80%. The consistency is remarkable.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Freelance Photographer",
    content:
      "The edge detection is incredible - it handles hair and transparent objects perfectly. My clients are always impressed with the results.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "CTO at StartupXYZ",
    content:
      "The API integration took less than an hour. Rock-solid reliability and the provider abstraction means we're never locked into one AI model.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Marketing Director",
    content:
      "Our social media content production speed increased 5x. The background editor with gradient and studio options is a game changer.",
    rating: 5,
  },
  {
    name: "Alex Thompson",
    role: "Agency Owner",
    content:
      "Finally, a background removal tool that meets enterprise standards. Team workspaces, API access, and the quality all make this our go-to solution.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by thousands of users
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our customers are saying about BackgroundAI
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-indigo-500 text-sm text-white">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
