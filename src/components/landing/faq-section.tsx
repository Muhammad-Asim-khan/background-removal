"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does BackgroundAI remove backgrounds?",
    a: "BackgroundAI uses advanced AI models from multiple providers including Remove.bg, Clipdrop, Photoroom, and Replicate. Our provider abstraction layer automatically selects the best model for your image, ensuring the highest quality results.",
  },
  {
    q: "What image formats are supported?",
    a: "We support JPG, PNG, and WEBP formats for both upload and download. You can upload images up to 25MB and export in any of these formats with full transparency support.",
  },
  {
    q: "How does the credit system work?",
    a: "Each image processed consumes 1 credit. Free accounts receive 10 credits. Paid plans include monthly credit allocations: Starter (500), Pro (5,000), and Business (unlimited). Unused credits don't roll over.",
  },
  {
    q: "Can I integrate BackgroundAI into my application?",
    a: "Yes! We provide a full REST API with endpoints for background removal, image upscaling, and background replacement. API keys can be generated from your dashboard. We offer SDKs for JavaScript, Python, and other languages.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. All images are transmitted over HTTPS and processed in secure, isolated environments. Images are automatically deleted after processing unless saved to your project. We never share or use your images for training.",
  },
  {
    q: "Can I switch between AI providers?",
    a: "Yes, our unique provider abstraction layer allows admins to switch AI providers without any frontend code changes. This ensures you always get the best results and can adapt to new AI models as they become available.",
  },
  {
    q: "Do you support batch processing?",
    a: "Yes! Pro and Business plans include batch processing support. You can upload and process hundreds of images simultaneously through the dashboard or API.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards through Stripe. We support monthly and annual billing, with a 20% discount on annual plans. Enterprise customers can also pay by invoice.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="border-t border-border/40 bg-muted/20 py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Got questions? We have answers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
