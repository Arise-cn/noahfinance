"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { forwardRef, useCallback, useLayoutEffect, useRef } from "react";

const ABOUT_PARAGRAPHS = [
  "At Noah Finance, we are a Melbourne-based mortgage and finance broking firm,",
  "proudly serving clients across Australia. We are dedicated to helping individuals, families, and business owners achieve their financial and property goals with confidence and clarity.",
  "We believe that finance should never feel complicated or overwhelming. Our role is to simplify the lending process, provide clear guidance, and design tailored strategies that suit each client’s unique situation. Whether you are buying your first home, upgrading, refinancing, or building a long-term investment portfolio, we are here to support you at every stage of your journey.",
  "With access to a wide panel of major banks and non-bank lenders, we provide a full range of lending solutions. Our services cover residential home loans, construction and development finance, commercial and business lending, personal loans, and car finance. From straightforward applications to more complex scenarios such as self-employed or low-doc clients, we work to find flexible and competitive options that fit your needs.",
  "At Noah Finance, we go beyond interest rates. We focus on long-term outcomes, including cash flow, borrowing capacity, and overall financial wellbeing. We value trust, transparency, and long-term relationships, which is why many of our clients come through referrals. We take the time to listen, understand, and act in your best interest — because your success is our success.",
] as const;

const REVEAL_OFFSET_PX = 72;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** 第 index 段：0=白，1=金；与整段 scroll 进度联动，反向滚动对称 */
function fillForParagraph(p: number, index: number, total: number) {
  const n = total;
  const seg = p * n;
  const i = Math.min(Math.floor(seg), n - 1);
  const t = seg - i;
  if (i < index) return 0;
  if (i > index) return 1;
  return easeOutCubic(t);
}

/** 每占 1/n 的全局进度为一屏：整列从「上一段顶对齐」插值到「本段顶对齐」裁剪区顶部 */
function contentTranslateY(
  p: number,
  alignYs: readonly number[],
  reveal: number,
) {
  const n = alignYs.length;
  if (n === 0) return 0;
  p = Math.min(1, Math.max(0, p));
  const seg = p * n;
  const i = Math.min(Math.floor(seg), n - 1);
  const t = easeOutCubic(seg - i);
  const from = i === 0 ? alignYs[0]! + reveal : alignYs[i - 1]!;
  const to = alignYs[i]!;
  return from + (to - from) * t;
}

const AboutParagraph = forwardRef<
  HTMLSpanElement,
  {
    text: string;
    scrollYProgress: MotionValue<number>;
    index: number;
    total: number;
  }
>(function AboutParagraph(
  { text, scrollYProgress, index, total },
  ref,
) {
  const fill = useTransform(scrollYProgress, (p) =>
    fillForParagraph(p, index, total),
  );
  const color = useTransform(fill, [0, 1], ["#ffffff", "#E8D587"]);
  const fontSize = useTransform(fill, [0, 1], ["18px", "24px"]);
  const fontWeight = useTransform(fill, [0, 1], [300, 600]);

  return (
    <motion.span
      ref={ref}
      className="font-inter block shrink-0 leading-normal"
      style={{ color, fontSize, fontWeight }}
    >
      {text}
    </motion.span>
  );
});

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const paraRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const paragraphCount = ABOUT_PARAGRAPHS.length;
  const sectionVh = paragraphCount + 1;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const alignYsRef = useRef<number[]>(ABOUT_PARAGRAPHS.map(() => 0));

  const measureAlignYs = useCallback(() => {
    const root = contentRef.current;
    if (!root) return;
    const rootTop = root.getBoundingClientRect().top;
    alignYsRef.current = ABOUT_PARAGRAPHS.map((_, i) => {
      const el = paraRefs.current[i];
      if (!el) return 0;
      return rootTop - el.getBoundingClientRect().top;
    });
  }, []);

  useLayoutEffect(() => {
    measureAlignYs();
    const ro = new ResizeObserver(() => measureAlignYs());
    const root = contentRef.current;
    if (root) ro.observe(root);
    window.addEventListener("resize", measureAlignYs);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureAlignYs);
    };
  }, [measureAlignYs]);

  const contentY = useTransform(scrollYProgress, (p) =>
    contentTranslateY(p, alignYsRef.current, REVEAL_OFFSET_PX),
  );

  return (
    <div
      ref={sectionRef}
      className="relative z-10 bg-[#0F0F0F] w-screen"
      style={{ height: `${sectionVh * 100}vh` }}
    >
      <div className="sticky top-0 flex h-svh min-h-dvh flex-col items-center justify-center w-screen bg-[#0F0F0F]">
        <div className="flex flex-row gap-[164px]">
          <Image
            src="/images/home_p2_show.webp"
            alt="About Section"
            width={588}
            height={712}
          />
          <div className="flex flex-col w-[584px] h-[655px] shrink-0 self-end overflow-hidden">
            <p className="font-misans text-[52px] font-black text-white shrink-0">
              WHO WE ARE
            </p>
            <div className="relative mt-[35px] min-h-0 flex-1 overflow-hidden">
              <motion.div
                ref={contentRef}
                className="flex flex-col gap-[35px] pb-[94px] will-change-transform"
                style={{ y: contentY }}
              >
                {ABOUT_PARAGRAPHS.map((text, i) => (
                  <AboutParagraph
                    key={i}
                    ref={(el) => {
                      paraRefs.current[i] = el;
                    }}
                    text={text}
                    scrollYProgress={scrollYProgress}
                    index={i}
                    total={paragraphCount}
                  />
                ))}
              </motion.div>
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[94px] bg-[linear-gradient(0deg,#0F0F0F_0%,rgba(15,15,15,0)_113.19%)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
