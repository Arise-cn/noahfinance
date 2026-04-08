import { cn } from "@/utils/cn";
import Image from "next/image";
import type { ReactNode } from "react";

type AboutSubPageShellProps = {
  children: ReactNode;
};

export default function AboutSubPageShell({
  children,
}: AboutSubPageShellProps) {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#0f0f0f]">
      <div
        className="pointer-events-none absolute left-0 right-0 top-0 z-0 h-[min(613px,50vh)] opacity-20"
        aria-hidden
      >
        <Image
          src="/images/home_p4_wave.webp"
          alt=""
          fill
          className="object-cover object-top"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1920px]",
          "px-8 pb-24 pt-[168px] md:px-[136px] md:pt-[176px] xl:pt-[180px]",
        )}
      >
        <div className="mx-auto w-full max-w-[1083px]">{children}</div>
      </div>
    </section>
  );
}
