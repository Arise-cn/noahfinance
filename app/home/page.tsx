import AboutSection from "./_components/AboutSection";
import ClientsPartnersSection from "./_components/ClientsPartnersSection";
import HeroSection from "./_components/HeroSection";
import GetInTouchSection from "./_components/GetInTouchSection";
import LendingSolutionsSection from "./_components/LendingSolutionsSection";
import WhatWeDoSection from "./_components/WhatWeDoSection";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col">
      <div className="sticky top-0 z-0 h-svh min-h-dvh w-screen shrink-0">
        <HeroSection />
      </div>
      <AboutSection />
      <WhatWeDoSection />
      <LendingSolutionsSection />
      <GetInTouchSection />
      <ClientsPartnersSection />
    </div>
  );
};

export default HomePage;
