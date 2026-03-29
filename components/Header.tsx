"use client";
import { NAV_ITEMS } from "@/constants/nav";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  return (
    <header className="fixed top-[36px] grid w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-[136px] z-50">
      <img
        src="/images/Logo.png"
        className="h-[48px] w-[184px] justify-self-start"
        alt="logo"
      />
      <HeaderNav />
      <div className="header-phone-pill-frame flex h-[48px] justify-self-end overflow-hidden">
        <div className="header-phone-pill-inner flex h-full w-full items-center justify-center gap-[12px] rounded-full px-[24px]">
          <img
            src="/images/phone_icon.png"
            className="h-[24px] w-[24px]"
            alt="phone"
          />
          <p className="font-inter text-[20px] font-normal tracking-[0.02em] text-[#e8d07a]">
            03 9341 5678
          </p>
        </div>
      </div>
    </header>
  );
};
const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <div className="header-phone-pill-frame flex h-[48px] justify-self-end overflow-hidden">
      <div className="header-phone-pill-inner flex h-full w-full items-center justify-center rounded-full overflow-hidden">
        {NAV_ITEMS.map((item) => {
          const isActive = item.href === pathname;
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
export default Header;
