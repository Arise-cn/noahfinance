"use client";

import { CONTACT_US_SUB_ROUTES } from "@/constants/contact-us";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RefObject } from "react";
import type { PopupActions } from "reactjs-popup/dist/types";

type ContactUsPopupMenuProps = {
  popupRef: RefObject<PopupActions | null>;
};

export default function ContactUsPopupMenu({
  popupRef,
}: ContactUsPopupMenuProps) {
  const pathname = usePathname();

  const onNavigate = () => {
    popupRef.current?.close();
  };

  return (
    <div className="home-service-expanded-frame w-full max-w-[240px] overflow-hidden rounded-[24px]">
      <nav
        className="home-service-expanded-inner bg-[#0f0f0f] px-3 py-5"
        aria-label="Contact us sections"
      >
        <ul className="mx-auto flex w-[216px] max-w-full list-none flex-col gap-2 p-0">
          {CONTACT_US_SUB_ROUTES.map((route) => {
            const href = route.slug
              ? `/contact-us/${route.slug}`
              : "/contact-us";
            const isActive = pathname === href;
            return (
              <li key={route.navLabel}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "flex h-9 w-full items-center rounded-[8px] px-3 py-2 font-inter text-[14px] font-semibold leading-normal transition-colors",
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
    </div>
  );
}
