import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";
import LendingSolutionsSection from "./_components/LendingSolutionsSection";
import WhatWeDoSection from "./_components/WhatWeDoSection";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col overflow-y-scroll">
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <LendingSolutionsSection />
    </div>
  );
};

export default HomePage;
