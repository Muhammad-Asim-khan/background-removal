"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center space-y-6"
      >
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold">BackgroundAI</span>
        </Link>

        <div className="rounded-xl border border-border/50 bg-card p-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/10">
            <Mail className="h-8 w-8 text-violet-500" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Verify your email</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            We&apos;ve sent a verification link to your email. Click the link to activate your account.
          </p>
          <Button variant="gradient" className="mt-6 w-full">
            Resend Verification Email
          </Button>
          <p className="mt-4 text-xs text-muted-foreground">
            Already verified?{" "}
            <Link href="/login" className="text-violet-600 hover:text-violet-500">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
