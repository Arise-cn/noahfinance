"use client";

import AboutUsPopupMenu from "@/components/AboutUsPopupMenu";
import LoansPopupMenu from "@/components/LoansPopupMenu";
import { NAV_ITEMS } from "@/constants/nav";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import type { PopupActions } from "reactjs-popup/dist/types";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const LOANS_HREF = "/loans";
const ABOUT_US_HREF = "/about-us";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      className={cn(
        "shrink-0 text-current transition-transform duration-200 ease-out",
        className,
      )}
      aria-hidden
    >
      <path
        d="M4 5.5L8 9.5L12 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const Header = () => {
  return (
    <header className="fixed top-[36px] z-50 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-[136px]">
      <img
        src="/images/Logo.png"
        className="h-[36px] w-[136px] justify-self-start"
        alt="logo"
      />
      <HeaderNav />
      <div className="header-phone-pill-frame flex h-[36px] justify-self-end overflow-hidden">
        <div className="header-phone-pill-inner flex h-full w-full items-center justify-center gap-[12px] rounded-full px-[16px]">
          <img
            src="/images/phone_icon.png"
            className="h-[16px] w-[16px]"
            alt="phone"
          />
          <p className="font-inter text-[16px] font-normal tracking-[0.02em] text-[#e8d07a]">
            03 9341 5678
          </p>
        </div>
      </div>
    </header>
  );
};

type NavItem = (typeof NAV_ITEMS)[number];

function LoansHeaderNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const router = useRouter();
  const [popupMounted, setPopupMounted] = useState(false);
  const loansPopupRef = useRef<PopupActions>(null);

  useEffect(() => {
    setPopupMounted(true);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      loansPopupRef.current?.close();
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  if (!popupMounted) {
    return (
      <LoansNavTrigger
        label={item.name}
        menuOpen={false}
        pathname={pathname}
        onClick={() => router.push(LOANS_HREF)}
      />
    );
  }

  return (
    <Popup
      ref={loansPopupRef}
      trigger={(open: boolean) => (
        <LoansNavTrigger
          label={item.name}
          menuOpen={open}
          pathname={pathname}
        />
      )}
      position="bottom center"
      offsetY={10}
      on={["click", "hover"]}
      mouseLeaveDelay={250}
      arrow={false}
      closeOnDocumentClick
      closeOnEscape
      nested
      contentStyle={{
        width: "auto",
        padding: 0,
        background: "transparent",
        border: "none",
        boxShadow: "none",
        zIndex: 100,
      }}
      overlayStyle={{
        background: "transparent",
        zIndex: 99,
      }}
    >
      <LoansPopupMenu popupRef={loansPopupRef} />
    </Popup>
  );
}

function AboutUsHeaderNavItem({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const router = useRouter();
  const [popupMounted, setPopupMounted] = useState(false);
  const aboutUsPopupRef = useRef<PopupActions>(null);

  useEffect(() => {
    setPopupMounted(true);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      aboutUsPopupRef.current?.close();
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  if (!popupMounted) {
    return (
      <LoansNavTrigger
        label={item.name}
        menuOpen={false}
        pathname={pathname}
        baseHref={ABOUT_US_HREF}
        onClick={() => router.push("/about-us/our-team")}
      />
    );
  }

  return (
    <Popup
      ref={aboutUsPopupRef}
      trigger={(open: boolean) => (
        <LoansNavTrigger
          label={item.name}
          menuOpen={open}
          pathname={pathname}
          baseHref={ABOUT_US_HREF}
        />
      )}
      position="bottom center"
      offsetY={10}
      on={["click", "hover"]}
      mouseLeaveDelay={250}
      arrow={false}
      closeOnDocumentClick
      closeOnEscape
      nested
      contentStyle={{
        width: "auto",
        padding: 0,
        background: "transparent",
        border: "none",
        boxShadow: "none",
        zIndex: 100,
      }}
      overlayStyle={{
        background: "transparent",
        zIndex: 99,
      }}
    >
      <AboutUsPopupMenu popupRef={aboutUsPopupRef} />
    </Popup>
  );
}

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <div className="header-phone-pill-frame flex h-[44px] justify-self-end overflow-hidden">
      <div className="header-phone-pill-inner flex h-full w-full items-center justify-center overflow-hidden rounded-full">
        {NAV_ITEMS.map((item) => {
          if (item.href === LOANS_HREF) {
            return (
              <LoansHeaderNavItem
                key={item.href}
                item={item}
                pathname={pathname}
              />
            );
          }
          if (item.href === ABOUT_US_HREF) {
            return (
              <AboutUsHeaderNavItem
                key={item.href}
                item={item}
                pathname={pathname}
              />
            );
          }

          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              className={cn(
                "relative z-0 flex h-[48px] items-center justify-center overflow-hidden rounded-full bg-[#05050580] px-[32px] uppercase",
                "font-inter text-[20px] font-semibold tracking-[0.02em]",
              )}
              href={item.href}
            >
              {isActive ? (
                <motion.span
                  layoutId="header-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[#343434]"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              ) : null}
              <span
                className={cn(
                  "relative z-10",
                  isActive ? "font-bold text-[#FFF2BA]" : "text-[#E8D587]",
                )}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

type LoansNavTriggerProps = {
  label: string;
  menuOpen: boolean;
  pathname: string;
  baseHref?: string;
} & ComponentPropsWithoutRef<"button">;

const LoansNavTrigger = forwardRef<HTMLButtonElement, LoansNavTriggerProps>(
  function LoansNavTrigger(
    { label, menuOpen, pathname, baseHref = LOANS_HREF, className, ...rest },
    ref,
  ) {
    const isActive = pathname.startsWith(baseHref);

    return (
      <button
        ref={ref}
        type="button"
        aria-expanded={menuOpen}
        aria-haspopup="true"
        className={cn(
          "relative z-0 flex h-[48px] items-center justify-center overflow-hidden rounded-full bg-[#05050580] px-[32px] uppercase",
          "font-inter text-[20px] font-semibold tracking-[0.02em]",
          className,
        )}
        {...rest}
      >
        {isActive ? (
          <motion.span
            layoutId="header-nav-active-pill"
            className="absolute inset-0 rounded-full bg-[#343434]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 35,
            }}
          />
        ) : null}
        <span
          className={cn(
            "relative z-10 inline-flex items-center gap-2",
            isActive ? "font-bold text-[#FFF2BA]" : "text-[#E8D587]",
          )}
        >
          {label}
          <ChevronDown className={cn(menuOpen && "rotate-180")} />
        </span>
      </button>
    );
  },
);

export default Header;
