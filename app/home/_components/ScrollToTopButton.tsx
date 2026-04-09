"use client";

import Image from "next/image";

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      className="group fixed bottom-[130px] right-[136px] z-40 flex items-center justify-center rounded-full"
      aria-label="Scroll to top"
    >
      <span className="relative block h-12 w-12">
        <Image
          src="/images/arrow_up.png"
          alt="arrow up"
          width={48}
          height={48}
          className="absolute inset-0 opacity-100 transition-opacity duration-200 group-hover:opacity-0"
        />
        <Image
          src="/images/arrow_up_hover.png"
          alt="arrow up hover"
          width={48}
          height={48}
          className="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </span>
    </button>
  );
};

export default ScrollToTopButton;
