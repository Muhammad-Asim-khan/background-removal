"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600">
          500
        </h1>
        <h2 className="mt-4 text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
