import { cn } from "@/utils/cn";

export default function SiteFooter() {
  return (
    <footer className="bg-[#040404] text-white">
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1920px] flex-col gap-10 px-8 py-14",
          "md:flex-row md:flex-wrap md:items-start md:justify-between md:gap-12 md:px-[136px] md:py-16",
        )}
      >
        <img
          src="/images/text_logo.png"
          className="h-[28px] w-[214px] shrink-0 object-contain object-left"
          alt="Noah Finance"
        />
        <div className="flex flex-col gap-3">
          <p className="font-inter text-[18px] font-semibold">ADDRESS</p>
          <p className="font-inter text-[14px] font-normal leading-normal">
            Suite 603, 21 Ellingworth Parade, Box Hill VIC 3128
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
  );
}
