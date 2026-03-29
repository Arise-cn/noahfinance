"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
};

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        className="flex min-h-0 flex-1 flex-col"
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 34,
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
