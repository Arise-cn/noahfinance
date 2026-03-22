import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <header className="sticky top-[36px] z-10 grid w-full grid-cols-[1fr_auto_1fr] items-center gap-8 px-[136px]">
        <img
          src="/images/Logo.png"
          className="h-[48px] w-[184px] justify-self-start"
          alt="logo"
        />
        <div className="header-phone-pill-frame flex h-[48px] justify-self-end overflow-hidden">
          <div className="header-phone-pill-inner flex h-full w-full items-center justify-center gap-[12px] rounded-full px-[24px]">
            <img
              src="/images/phone_icon.png"
              className="h-[24px] w-[24px]"
              alt="phone"
            />
            <p className="font-inter text-[20px] font-normal tracking-[0.02em] text-[#e8d07a]">
              03 9341 5678
            </p>
          </div>
        </div>
      </header>
    </div>
  );
}
