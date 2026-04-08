"use client";

import { cn } from "@/utils/cn";
import Image from "next/image";
import { type PointerEvent, useEffect, useMemo, useRef, useState } from "react";

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

function PartnerTrack({ images }: { images: readonly string[] }) {
  const loopImages = [...images, ...images];
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const halfWidthRef = useRef(0);
  const hoverRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const normalizeOffset = (rawOffset: number) => {
    const halfWidth = halfWidthRef.current;
    if (halfWidth <= 0) return rawOffset;
    let normalized = rawOffset % halfWidth;
    if (normalized > 0) normalized -= halfWidth;
    return normalized;
  };

  const applyTransform = (offset: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  useEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      if (!trackRef.current) return;
      halfWidthRef.current = trackRef.current.scrollWidth / 2;
      offsetRef.current = normalizeOffset(offsetRef.current);
      applyTransform(offsetRef.current);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    return () => observer.disconnect();
  }, [loopImages.length]);

  useEffect(() => {
    const speedPxPerSecond = 56;

    const tick = (ts: number) => {
      if (lastTsRef.current == null) {
        lastTsRef.current = ts;
      }
      const deltaMs = ts - lastTsRef.current;
      lastTsRef.current = ts;

      if (!isPaused && !draggingRef.current) {
        offsetRef.current = normalizeOffset(
          offsetRef.current - (speedPxPerSecond * deltaMs) / 1000,
        );
        applyTransform(offsetRef.current);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [isPaused]);

  const onPointerEnter = () => {
    hoverRef.current = true;
    setIsPaused(true);
  };

  const onPointerLeave = () => {
    hoverRef.current = false;
    if (!draggingRef.current) {
      setIsPaused(false);
    }
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    containerRef.current.setPointerCapture(event.pointerId);
    draggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = event.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    setIsPaused(true);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const deltaX = event.clientX - dragStartXRef.current;
    offsetRef.current = normalizeOffset(dragStartOffsetRef.current + deltaX);
    applyTransform(offsetRef.current);
  };

  const onPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (
      containerRef.current &&
      containerRef.current.hasPointerCapture(event.pointerId)
    ) {
      containerRef.current.releasePointerCapture(event.pointerId);
    }
    draggingRef.current = false;
    setIsDragging(false);
    setIsPaused(hoverRef.current);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative m-0 w-full max-w-none overflow-hidden p-0 select-none touch-pan-y",
        isDragging ? "cursor-grabbing" : "cursor-grab",
      )}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {loopImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="mr-6 flex h-[140px] w-[250px] shrink-0 items-center justify-center rounded-[12px] bg-white px-4 sm:h-[150px] sm:w-[280px] md:h-[160px] md:w-[320px]"
          >
            <Image
              src={src}
              alt={`Partner lender ${(i % images.length) + 1}`}
              width={320}
              height={160}
              className="max-h-[91px] w-auto max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type ClientsPartnersSectionProps = {
  partnerImageSrcs: string[];
};

const ClientsPartnersSection = ({
  partnerImageSrcs,
}: ClientsPartnersSectionProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const ordered = useMemo(() => {
    const rest = TESTIMONIALS.filter((_, i) => i !== activeIndex);
    return [TESTIMONIALS[activeIndex], ...rest];
  }, [activeIndex]);

  return (
    <section
      className={cn(
        "relative z-10 w-screen flex flex-col overflow-hidden bg-[#0F0F0F]",
        "pb-16 md:pb-20",
      )}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-[1920px]",
          "px-8 pt-16 md:px-[136px] xl:px-[136px]",
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
        <p
          className={cn(
            "mx-auto mt-4 max-w-[720px] text-center font-inter text-[16px] font-normal leading-[24px] text-white",
            partnerImageSrcs.length > 0 ? "mb-10 lg:mb-12" : null,
          )}
        >
          Selecting from our extensive lender network for the mortgage products
          that you need
        </p>
      </div>

      {partnerImageSrcs.length > 0 ? (
        <div className="m-0 w-full max-w-none shrink-0 p-0">
          <PartnerTrack images={partnerImageSrcs} />
        </div>
      ) : null}
    </section>
  );
};

export default ClientsPartnersSection;
