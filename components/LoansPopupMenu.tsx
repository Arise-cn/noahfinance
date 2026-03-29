"use client";

import { LOAN_SUB_ROUTES } from "@/constants/loans";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import type { PopupActions } from "reactjs-popup/dist/types";

type LoansPopupMenuProps = {
  popupRef: RefObject<PopupActions | null>;
};

export default function LoansPopupMenu({ popupRef }: LoansPopupMenuProps) {
  const pathname = usePathname();

  const onNavigate = () => {
    popupRef.current?.close();
  };

  return (
    <nav
      className="w-full max-w-[312px] rounded-[24px] border border-solid border-[#e8d587] bg-[rgba(5,5,5,0.7)] px-4 py-10 backdrop-blur-[19.4px] [-webkit-backdrop-filter:blur(19.4px)]"
      aria-label="Loan categories"
    >
      <ul className="mx-auto flex w-[280px] max-w-full list-none flex-col gap-3 p-0">
        {LOAN_SUB_ROUTES.map((route) => {
          const href = `/loans/${route.slug}`;
          const isActive = pathname === href;
          return (
            <li key={route.slug}>
              <Link
                href={href}
                onClick={onNavigate}
                className={cn(
                  "flex h-12 w-full items-center rounded-[12px] px-4 py-3 font-inter text-[20px] font-semibold leading-normal transition-colors",
                  isActive
                    ? "bg-[#161718] text-[#e7d487]"
                    : "bg-transparent text-white hover:bg-[#161718]/80 hover:text-[#e7d487]",
                )}
              >
                {route.navLabel}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
