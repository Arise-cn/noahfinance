import AboutSection from "./_components/AboutSection";
import ClientsPartnersFooterSection from "./_components/ClientsPartnersFooterSection";
import HeroSection from "./_components/HeroSection";
import GetInTouchSection from "./_components/GetInTouchSection";
import LendingSolutionsSection from "./_components/LendingSolutionsSection";
import WhatWeDoSection from "./_components/WhatWeDoSection";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col overflow-y-scroll">
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
      <LendingSolutionsSection />
      <GetInTouchSection />
      <ClientsPartnersFooterSection />
    </div>
  );
};

export default HomePage;
