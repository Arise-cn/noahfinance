"use client";

import { useViewport } from "@/hooks/useViewport";
import { cn } from "@/utils/cn";
import { LayoutGroup, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

const SERVICES = [
  {
    id: "residential",
    title: "RESIDENTIAL LOAN",
    body:
      "For buying new home, refinancing existing home loan or investing in any residential properties, Noah Finance designs the personalized loan package tailored to your needs with professional advice. Making it simple for you. Contact our specialists today.",
  },
  {
    id: "commercial",
    title: "COMMERCIAL LOAN",
    body:
      "Whether you are acquiring owner-occupied premises, refinancing, or funding growth, we structure commercial lending with clarity and efficiency. We work across banks and specialist lenders to match your business goals and cash flow.",
  },
  {
    id: "asset",
    title: "ASSET FINANCE",
    body:
      "From vehicles to equipment, we help you preserve cash flow with structured asset finance. Competitive options, transparent terms, and guidance through approval and settlement so you can focus on running your business.",
  },
] as const;

type ServiceId = (typeof SERVICES)[number]["id"];
type ServiceItem = (typeof SERVICES)[number];

function ServiceRowButton({
  service,
  isOpen,
  onSelect,
  figmaPadding = false,
}: {
  service: ServiceItem;
  isOpen: boolean;
  onSelect: () => void;
  figmaPadding?: boolean;
}) {
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      className={cn(
        "flex w-full text-left transition-colors hover:bg-white/3",
        isOpen
          ? cn(
              "flex-col gap-8 sm:flex-row sm:items-center sm:gap-12",
              figmaPadding
                ? "px-[48px] py-[34px]"
                : "px-8 py-[34px]",
            )
          : "h-full items-center px-12",
      )}
      onClick={onSelect}
    >
      <span className="shrink-0 font-inter text-[28px] font-semibold leading-normal text-[#fff2ba]">
        {service.title}
      </span>
      {isOpen ? (
        <>
          <span
            className="hidden h-[136px] w-px shrink-0 bg-[#e8d587]/70 sm:block"
            aria-hidden
          />
          <p className="max-w-[800px] font-inter text-[18px] font-light leading-[32px] text-white">
            {service.body}
          </p>
        </>
      ) : null}
    </button>
  );
}

const WhatWeDoSection = () => {
  const { height } = useViewport();
  const [openId, setOpenId] = useState<ServiceId>("residential");

  return (
    <div
      style={{ minHeight: height ? `${height}px` : "100vh" }}
      className="relative w-screen overflow-hidden bg-[#0f0f0f]"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/home_p3_bg.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div
          className="absolute inset-0 bg-[rgba(15,15,15,0.9)]"
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "relative z-10 flex min-h-[inherit] w-full flex-col justify-center",
          "px-8 py-16 md:px-[136px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <h2 className="font-misans text-[52px] font-black leading-normal text-white">
          WHAT CAN WE DO FOR YOU
        </h2>

        <LayoutGroup id="home-services">
          <ul className="mt-[48px] flex w-full max-w-[1336px] flex-col gap-6">
            {SERVICES.map((service) => {
              const isOpen = openId === service.id;
              const isMetalExpanded =
                isOpen && service.id === "residential";

              return (
                <li key={service.id}>
                  <motion.div
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 34,
                    }}
                    className={cn(
                      "w-full overflow-hidden rounded-[24px]",
                      !isMetalExpanded &&
                        "backdrop-blur-[19.4px] bg-[rgba(15,15,15,0.3)]",
                      isOpen &&
                        !isMetalExpanded &&
                        "border border-solid border-[#e8d587]",
                      !isOpen && "h-[96px]",
                    )}
                  >
                    {isMetalExpanded ? (
                      <div className="home-service-expanded-frame">
                        <div className="home-service-expanded-inner overflow-hidden">
                          <ServiceRowButton
                            service={service}
                            isOpen={isOpen}
                            onSelect={() => setOpenId(service.id)}
                            figmaPadding
                          />
                        </div>
                      </div>
                    ) : (
                      <ServiceRowButton
                        service={service}
                        isOpen={isOpen}
                        onSelect={() => setOpenId(service.id)}
                      />
                    )}
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default WhatWeDoSection;
