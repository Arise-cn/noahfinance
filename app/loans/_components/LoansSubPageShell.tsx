import { cn } from "@/utils/cn";
import type { LoanContentSection, LoanSubRoute } from "@/constants/loans";
import Image from "next/image";
import LoansBackToTop from "./LoansBackToTop";

type LoansSubPageShellProps = {
  loan: LoanSubRoute;
};

function SectionDivider() {
  return (
    <div className="flex justify-center py-10 md:py-14" aria-hidden>
      <div
        className={cn(
          "h-[120px] w-px shrink-0 md:h-[200px]",
          "bg-linear-to-b from-[#403f38] via-[#e8d587] via-[52.712%] to-[#403f38]",
        )}
      />
    </div>
  );
}

function LoanSectionBlock({ section }: { section: LoanContentSection }) {
  const imageBlock = (
    <div className="relative mx-auto aspect-520/320 w-full max-w-[640px] overflow-hidden rounded-[24px]">
      <Image
        src={section.imageSrc}
        alt={section.imageAlt}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 45vw"
      />
    </div>
  );

  const copyBlock = (
    <div className="mx-auto flex w-full max-w-[551px] flex-col gap-4 md:gap-5">
      <h2 className="font-inter text-[28px] font-light leading-normal text-[#fff2ba] md:text-[36px]">
        {section.title}
      </h2>
      {section.paragraphs.map((p, i) => (
        <p
          key={`${section.id}-${i}`}
          className="font-inter text-[13px] font-light leading-8 text-white md:text-[14px] md:leading-8"
        >
          {p}
        </p>
      ))}
    </div>
  );

  if (section.imageSide === "left") {
    return (
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
        {imageBlock}
        {copyBlock}
      </div>
    );
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
      {copyBlock}
      {imageBlock}
    </div>
  );
}

export default function LoansSubPageShell({ loan }: LoansSubPageShellProps) {
  return (
    <section className="relative w-full overflow-hidden bg-[#0f0f0f]">
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
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-[min(613px,50vh)] opacity-20"
        aria-hidden
      >
        <div className="relative h-full w-full scale-y-[-1]">
          <Image
            src="/images/home_p4_wave.webp"
            alt=""
            fill
            className="object-cover object-bottom"
            sizes="100vw"
            priority={false}
          />
        </div>
      </div>

      <div
        className={cn(
          "relative z-10 mx-auto w-full max-w-[1920px]",
          "px-8 pb-32 pt-[140px] md:px-[136px] md:pt-[160px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <h1 className="mb-16 text-center font-misans text-[40px] font-black leading-tight text-white md:mb-24 md:text-[52px] md:leading-normal">
          {loan.pageTitle}
        </h1>

        <div className="flex flex-col">
          {loan.sections.map((section, index) => (
            <div key={section.id}>
              <LoanSectionBlock section={section} />
              {index < loan.sections.length - 1 ? <SectionDivider /> : null}
            </div>
          ))}
        </div>

        {/* <div className="mt-20 flex justify-center md:mt-28">
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
        </div> */}
      </div>

      <LoansBackToTop />
    </section>
  );
}
