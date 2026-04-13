"use client";

import { useViewport } from "@/hooks/useViewport";
import { cn } from "@/utils/cn";
import { motion } from "motion/react";
import Image from "next/image";

const CARD_FOOTER_IMAGES = {
  section1: {
    src: "/images/home_page4_section1.webp",
    width: 852,
    height: 132,
  },
  section2: {
    src: "/images/home_page4_section2.webp",
    width: 924,
    height: 132,
  },
  section3: {
    src: "/images/home_page4_section3.webp",
    width: 924,
    height: 132,
  },
} as const;

function CardFooterArt({
  variant,
}: {
  variant: keyof typeof CARD_FOOTER_IMAGES;
}) {
  const { src, width, height } = CARD_FOOTER_IMAGES[variant];
  return (
    <Image
      src={src}
      alt=""
      width={width}
      height={height}
      className="mx-auto h-auto w-full max-w-full object-contain object-bottom"
    />
  );
}

const LendingSolutionsSection = () => {
  const { height } = useViewport();

  return (
    <div
      style={{ minHeight: height ? `${height}px` : "100vh" }}
      className="relative w-full overflow-hidden bg-[#0f0f0f]"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(613px,90vh)] w-[min(1920px,200vw)] -translate-x-1/2 -translate-y-1/2 transform scale-80"
        aria-hidden
      >
        <Image
          src="/images/home_p4_wave.webp"
          alt=""
          fill
          className="object-cover opacity-90"
          sizes="100vw"
          priority={false}
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex min-h-[inherit] w-full flex-col justify-center",
          "px-8 py-16 md:px-[136px] xl:pl-[292px] xl:pr-[136px] transform scale-80",
        )}
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-2 shrink-0 bg-[#dcc97f]" aria-hidden />
          <h2 className="font-misans text-[52px] font-black leading-normal text-white">
            LENDING SOLUTIONS
          </h2>
        </div>

        <div className="mt-[72px] flex flex-col items-center justify-center gap-10 lg:mt-[88px] lg:flex-row lg:items-start lg:gap-8">
          {/* Card 1 — 与 Figma 左卡一致：金渐变外框 + 内黑底 */}
          <motion.article
            initial={false}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-[360px] lg:mt-8"
          >
            <div className="flex flex-col overflow-hidden rounded-[24px] bg-linear-to-b from-[#cfbf72] to-[#3a290f] pb-1 pt-5">
              <h3 className="px-6 text-center font-inter text-[20px] font-semibold uppercase leading-normal text-[#fff2ba]">
                EXTENSIVE PRODUCT RANGE
              </h3>
              <div className="mx-1 mt-4 flex min-h-[414px] flex-col rounded-[20px] bg-[#0f0f0f] px-6 pb-6 pt-6">
                <p className="font-inter text-[18px] font-normal leading-[32px] text-[#e8d587]">
                  A wide network of lenders with a variety of product ranges
                  allowing for the best solution to your financial needs.
                </p>
                <div className="mt-auto flex justify-center pt-8">
                  <CardFooterArt variant="section1" />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 2 — 中间强调：金描边 + 内渐变内容区（略高） */}
          <motion.article
            initial={false}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-[392px]"
          >
            <div className="flex min-h-[542px] flex-col rounded-[24px] border border-solid border-[#e8d587] bg-[#0f0f0f] px-5 pb-5 pt-6">
              <h3 className="shrink-0 text-center font-inter text-[20px] font-semibold uppercase leading-normal text-[#fff2ba]">
                SPECIALIST EXPERTISE
              </h3>
              <div className="mt-4 flex min-h-[414px] flex-1 flex-col rounded-[20px] bg-linear-to-b from-[#b8a863] to-[#0f0f0f] px-6 pb-6 pt-6">
                <p className="font-inter text-[18px] font-normal leading-[32px] text-[#fff6d0]">
                  Providing professional advice and insights on your financial
                  needs. Offering personalized service focusing on the right
                  outcome for you.
                </p>
                <div className="mt-auto flex justify-center pt-8">
                  <CardFooterArt variant="section2" />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 3 */}
          <motion.article
            initial={false}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="w-full max-w-[360px] lg:mt-8"
          >
            <div className="flex flex-col overflow-hidden rounded-[24px] bg-linear-to-b from-[#cfbf72] to-[#3a290f] pb-1 pt-5">
              <h3 className="px-6 text-center font-inter text-[20px] font-semibold uppercase leading-normal text-[#fff2ba]">
                BEST-IN-CLASS SUPPORT
              </h3>
              <div className="mx-1 mt-4 flex min-h-[414px] flex-col rounded-[20px] bg-[#0f0f0f] px-6 pb-6 pt-6">
                <p className="font-inter text-[18px] font-normal leading-[32px] text-[#e8d587]">
                  A one-stop service centre for your loan applications catering
                  for your financial needs from the beginning to completion.
                </p>
                <div className="mt-auto flex justify-center pt-8">
                  <CardFooterArt variant="section3" />
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </div>
  );
};

export default LendingSolutionsSection;
