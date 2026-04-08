"use client";

import { cn } from "@/utils/cn";

const publicAsset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const HeroSection = () => {
  const scrollToGetInTouch = () => {
    const section = document.getElementById("get-in-touch-section");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${publicAsset("/images/pg1_bg.webp")})`,
      }}
    >
      <div className="w-full h-screen bg-[#0000007A] flex items-center">
        <div className="flex flex-col items-center justify-center w-full">
          <p className="font-misans text-[52px] text-white text-center w-full">
            TAILORED WITH A PERSONAL TOUCH TO
            <br />
            MEET YOUR LENDING NEEDS.
          </p>
          <div className="header-phone-pill-frame flex h-[64px] justify-self-end overflow-hidden mt-[48px]">
            <div className="header-phone-pill-inner flex h-full w-full items-center justify-center rounded-full">
              <button
                type="button"
                onClick={scrollToGetInTouch}
                className={cn(
                  "bg-linear-to-r from-[#E8D587] via-[#FFF5C9] to-[#E8D587] bg-clip-text text-transparent uppercase px-[72px]",
                  "font-inter text-[28px] font-semibold cursor-pointer",
                )}
              >
                GOT IN TOUCH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
