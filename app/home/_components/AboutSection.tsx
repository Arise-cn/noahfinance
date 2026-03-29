"use client";
import { useViewport } from "@/hooks/useViewport";
import Image from "next/image";
const AboutSection = () => {
  const { height, width } = useViewport();
  return (
    <div
      style={{ height: `${height}px` }}
      className="flex flex-col items-center justify-center bg-[#0F0F0F] w-screen"
    >
      <div className="flex flex-row gap-[164px]">
        <Image
          src="/images/home_p2_show.webp"
          alt="About Section"
          width={588}
          height={712}
        />
        <div className="flex flex-col w-[584px] h-[655px] overflow-hidden self-end gap-[35px] relative">
          <p className="font-misans text-[52px] font-black text-white">
            WHO WE ARE
          </p>
          <span className="font-inter text-[18px] font-normal text-white">
            At Noah Finance, we are a Melbourne-based mortgage and finance
            broking firm,
          </span>
          <span className="font-inter text-[18px] font-normal text-white">
            proudly serving clients across Australia. We are dedicated to
            helping individuals, families, and business owners achieve their
            financial and property goals with confidence and clarity.
          </span>
          <span className="font-inter text-[18px] font-normal text-white">
            We believe that finance should never feel complicated or
            overwhelming. Our role is to simplify the lending process, provide
            clear guidance, and design tailored strategies that suit each
            client’s unique situation. Whether you are buying your first home,
            upgrading, refinancing, or building a long-term investment
            portfolio, we are here to support you at every stage of your
            journey.
          </span>
          <span className="font-inter text-[18px] font-normal text-white">
            With access to a wide panel of major banks and non-bank lenders, we
            provide a full range of lending solutions. Our services cover
            residential home loans, construction and development finance,
            commercial and business lending, personal loans, and car finance.
            From straightforward applications to more complex scenarios such as
            self-employed or low-doc clients, we work to find flexible and
            competitive options that fit your needs.
          </span>
          <span className="font-inter text-[18px] font-normal text-white">
            At Noah Finance, we go beyond interest rates. We focus on long-term
            outcomes, including cash flow, borrowing capacity, and overall
            financial wellbeing. We value trust, transparency, and long-term
            relationships, which is why many of our clients come through
            referrals. We take the time to listen, understand, and act in your
            best interest — because your success is our success.
          </span>
          <div className="absolute bottom-0 left-0 w-full h-[94px] bg-[linear-gradient(0deg,#0F0F0F_0%,rgba(15,15,15,0)_113.19%)]"></div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
