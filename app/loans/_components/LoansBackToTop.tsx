"use client";

import { cn } from "@/utils/cn";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M12 5v14M12 5l-5 5M12 5l5 5"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoansBackToTop() {
  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-10 right-6 z-40 flex size-12 items-center justify-center rounded-full md:right-10",
        "border border-solid border-[#e8d587] bg-[rgba(5,5,5,0.2)] p-3 backdrop-blur-[19.4px]",
        "[-webkit-backdrop-filter:blur(19.4px)]",
        "text-[#e8d587] transition-opacity hover:opacity-90",
      )}
    >
      <ArrowUpIcon className="text-[#e8d587]" />
    </button>
  );
}
