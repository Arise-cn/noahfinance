import { cn } from "@/utils/cn";
import type { LoanSubRoute } from "@/constants/loans";
import Image from "next/image";
import Link from "next/link";

type LoansSubPageShellProps = {
  loan: LoanSubRoute;
};

export default function LoansSubPageShell({ loan }: LoansSubPageShellProps) {
  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-[#0f0f0f]">
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[min(610px,55vh)] opacity-25"
        aria-hidden
      >
        <Image
          src="/images/home_p4_wave.webp"
          alt=""
          fill
          className="object-cover object-bottom"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1920px]",
          "px-8 pb-24 pt-[140px] md:px-[136px] md:pt-[160px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <div className="flex max-w-[900px] flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-2 shrink-0 bg-[#dcc97f]" aria-hidden />
            <h1 className="font-misans text-[40px] font-black leading-tight text-white md:text-[52px] md:leading-normal">
              {loan.heading}
            </h1>
          </div>
          <p className="font-inter text-[16px] font-light leading-[28px] text-white md:text-[18px] md:leading-[32px]">
            {loan.body}
          </p>
          <div className="pt-4">
            <Link href="/contact-us" className="inline-flex">
              <div className="header-phone-pill-frame flex h-[56px] overflow-hidden md:h-[64px]">
                <div className="header-phone-pill-inner flex h-full w-full items-center justify-center rounded-full px-10 md:px-[72px]">
                  <span
                    className={cn(
                      "bg-linear-to-r from-[#E8D587] via-[#FFF5C9] to-[#E8D587] bg-clip-text text-transparent",
                      "font-inter text-[20px] font-semibold uppercase tracking-wide md:text-[24px]",
                    )}
                  >
                    Get in touch
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
