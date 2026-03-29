"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { useMemo, useState } from "react";

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Connor Ardill",
    quote:
      "I received wonderful service from Noah Finance. We were offered professional, balanced and unbiased advice on my questions in applying for the loan. I highly recommend the service for your loan application.",
  },
  {
    id: "t2",
    name: "Linda Collins",
    quote:
      "Noah Finance made refinancing straightforward. Clear communication and tailored options—we felt supported throughout.",
  },
  {
    id: "t3",
    name: "Aaron Lynas",
    quote:
      "Responsive team and access to a broad lender panel. They found a structure that fit our business needs.",
  },
  {
    id: "t4",
    name: "Connor Ardill",
    quote:
      "I received wonderful service from Noah Finance. We were offered professional, balanced and unbiased advice on my questions in applying for the loan. I highly recommend the service for your loan application.",
  },
  {
    id: "t5",
    name: "Connor Ardill",
    quote:
      "I received wonderful service from Noah Finance. We were offered professional, balanced and unbiased advice on my questions in applying for the loan. I highly recommend the service for your loan application.",
  },
] as const;

const LENDER_IMAGES = [
  "/images/home_p6_lender_1.webp",
  "/images/home_p6_lender_2.webp",
  "/images/home_p6_lender_3.webp",
  "/images/home_p6_lender_4.webp",
  "/images/home_p6_lender_5.webp",
  "/images/home_p6_lender_6.webp",
] as const;

function VerticalName({
  name,
  variant,
}: {
  name: string;
  variant: "gold" | "muted";
}) {
  return (
    <span
      className={cn(
        "inline-block text-[20px] tracking-wide",
        variant === "gold"
          ? "font-misans font-black text-[#0d0d0d]"
          : "font-inter font-semibold text-[#fff2ba]",
      )}
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {name}
    </span>
  );
}

function StarRow() {
  return (
    <div
      className="flex gap-1 text-[20px] leading-none text-[#e8d587]"
      aria-hidden
    >
      {"★★★★★".split("").map((s, i) => (
        <span key={i}>{s}</span>
      ))}
    </div>
  );
}

const ClientsPartnersFooterSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ordered = useMemo(() => {
    const rest = TESTIMONIALS.filter((_, i) => i !== activeIndex);
    return [TESTIMONIALS[activeIndex], ...rest];
  }, [activeIndex]);

  return (
    <section className="w-screen overflow-hidden bg-[#0f0f0f]">
      <div
        className={cn(
          "mx-auto w-full max-w-[1920px]",
          "px-8 py-16 md:px-[136px] xl:px-[136px]",
        )}
      >
        <h2 className="text-center font-misans text-[32px] font-black leading-normal text-white">
          WHAT OUR CLIENTS SAY
        </h2>

        <div className="mt-10 flex flex-col items-stretch gap-4 lg:mt-14 lg:flex-row lg:justify-center lg:gap-3 xl:gap-4">
          {ordered.map((item, orderIdx) => {
            const isExpanded = orderIdx === 0;
            if (isExpanded) {
              return (
                <div
                  key={item.id}
                  className="contact-form-metal-frame mx-auto w-full max-w-[424px] shrink-0 overflow-hidden rounded-[36px] lg:mx-0"
                >
                  <div
                    className={cn(
                      "flex h-[min(498px,70vh)] min-h-[420px] w-full overflow-hidden rounded-[35px]",
                      "bg-linear-to-b from-[#0f0f0f] from-[2.4%] via-[#261f01] via-34% to-[#0f0f0f]",
                      "backdrop-blur-[19.4px]",
                    )}
                  >
                    <div
                      className={cn(
                        "flex w-[31px] shrink-0 items-center justify-center rounded-[3px]",
                        "bg-linear-to-b from-[#ffeeaa] via-[#ae9632] via-58% to-[#948132]",
                      )}
                    >
                      <VerticalName name={item.name} variant="gold" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-4 px-5 py-6 sm:px-6">
                      <span
                        className="font-serif text-[48px] leading-none text-[#e8d587]"
                        aria-hidden
                      >
                        &ldquo;
                      </span>
                      <p className="font-inter text-[16px] font-normal leading-[24px] text-[#e8d587]">
                        {item.quote}
                      </p>
                      <div className="mt-auto pt-2">
                        <StarRow />
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const peekIndex = TESTIMONIALS.findIndex((t) => t.id === item.id);

            return (
              <button
                key={`peek-${item.id}`}
                type="button"
                onClick={() => setActiveIndex(peekIndex)}
                className={cn(
                  "mx-auto flex h-[min(498px,70vh)] min-h-[420px] w-full max-w-[141px] shrink-0 cursor-pointer flex-col items-center justify-center rounded-[36px] border-0 transition-opacity hover:opacity-90 lg:mx-0",
                  "bg-[#151515] backdrop-blur-[19.4px]",
                )}
                aria-label={`Show testimonial from ${item.name}`}
              >
                <VerticalName name={item.name} variant="muted" />
              </button>
            );
          })}
        </div>

        <h2 className="mt-20 text-center font-misans text-[32px] font-black leading-normal text-white lg:mt-28">
          PARTNER LENDERS
        </h2>
        <p className="mx-auto mt-4 max-w-[720px] text-center font-inter text-[16px] font-normal leading-[24px] text-white">
          Selecting from our extensive lender network for the mortgage products
          that you need
        </p>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 lg:mt-12 lg:justify-center lg:overflow-visible lg:pb-0">
          {LENDER_IMAGES.map((src, i) => (
            <div
              key={src}
              className="flex h-[160px] w-[280px] shrink-0 items-center justify-center rounded-[12px] bg-white px-4 sm:w-[300px] md:w-[320px]"
            >
              <Image
                src={src}
                alt={`Lender ${i + 1}`}
                width={300}
                height={100}
                className="max-h-[91px] w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-16 bg-[#040404] text-white lg:mt-24">
        <div
          className={cn(
            "mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-8 py-14",
            "md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-12 md:px-[136px] md:py-16",
          )}
        >
          <img
            src="/images/Logo.png"
            className="h-[48px] w-[184px] shrink-0 object-contain object-left"
            alt="Noah Finance"
          />
          <div className="flex flex-col gap-3">
            <p className="font-inter text-[18px] font-semibold">ADDRESS</p>
            <p className="font-inter text-[14px] font-normal leading-normal">
              1/534 Whitehorse Rd Mitcham VIC 3132
            </p>
            <p className="font-inter text-[14px] font-normal leading-normal">
              Melbourne, VIC, Australia
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-inter text-[18px] font-semibold">CONTACT US</p>
            <p className="font-inter text-[14px] font-normal leading-normal">
              info@noahfinance.com.au
            </p>
            <p className="font-inter text-[14px] font-normal leading-normal">
              03 9341 5678
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default ClientsPartnersFooterSection;
