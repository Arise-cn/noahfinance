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
      className="fixed bottom-[130px] right-[136px] z-40 flex items-center justify-center rounded-full"
      aria-label="Scroll to top"
    >
      <Image src="/images/arrow_up.png" alt="arrow up" width={48} height={48} />
    </button>
  );
};

export default ScrollToTopButton;
