"use client";

import { useViewport } from "@/hooks/useViewport";
import { cn } from "@/utils/cn";
import Image from "next/image";
import GetInTouchFormCard from "./GetInTouchFormCard";

const GetInTouchSection = () => {
  const { height } = useViewport();

  return (
    <div
      id="get-in-touch-section"
      style={{ minHeight: height ? `${height}px` : "100vh" }}
      className="relative w-full overflow-hidden bg-[#0f0f0f]"
    >
      <div
        className={cn(
          "relative z-10 mx-auto flex min-h-[inherit] w-full max-w-[1920px] flex-col",
          "px-8 py-16 md:px-[136px] xl:pl-[292px] xl:pr-[136px]",
        )}
      >
        <div className="mt-10 flex flex-row gap-[200px] items-center">
          {/* Left: contact info, map, hours */}
          <div className="flex w-full min-w-0 flex-1 flex-col gap-8 lg:max-w-[560px]">
            <div className="flex flex-col gap-6">
              <p className="font-inter text-[18px] font-semibold text-[#fff2ba]">
                CONTACT INFO
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Address
                  </p>
                  <p className="font-inter text-[16px] font-light leading-normal text-white">
                    Suite 603, 21 Ellingworth Parade, Box Hill VIC 3128
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Phone
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    03 9341 5678
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Email
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    info@noahfinance.com.au
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[220px] w-full max-w-[520px] overflow-hidden rounded-[20px] sm:h-[280px] lg:h-[336px]">
              <Image
                src="/images/home_p5_map.webp"
                alt="Office location"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority={false}
              />
            </div>

            <div className="flex flex-col gap-6">
              <p className="font-inter text-[20px] font-semibold text-[#fff2ba]">
                WORKING HOURS
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Mon-Fri
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    9:00am-5:30pm
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-inter text-[14px] font-semibold text-white">
                    Sat-Sun
                  </p>
                  <p className="font-inter text-[16px] font-light text-white">
                    By Appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: title + form */}
          <div className="w-full shrink-0 lg:w-[600px]">
            <h2 className="mb-6 font-misans text-[32px] font-black leading-normal text-white">
              GET IN TOUCH WITH US TODAY
            </h2>
            <GetInTouchFormCard antiAbuseScope="home-get-in-touch" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInTouchSection;
