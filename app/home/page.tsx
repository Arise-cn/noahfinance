import AboutSection from "./_components/AboutSection";
import ClientsPartnersSection from "./_components/ClientsPartnersSection";
import HeroSection from "./_components/HeroSection";
import GetInTouchSection from "./_components/GetInTouchSection";
import LendingSolutionsSection from "./_components/LendingSolutionsSection";
import ScrollToTopButton from "./_components/ScrollToTopButton";
import WhatWeDoSection from "./_components/WhatWeDoSection";
import { getPartnerImageSrcs } from "./_lib/getPartnerImageSrcs";

const HomePage = async () => {
  const partnerImageSrcs = await getPartnerImageSrcs();

  return (
    <div className="w-screen flex flex-col">
      <div className="sticky top-0 z-0 h-svh min-h-dvh w-screen shrink-0">
        <HeroSection />
      </div>
      <AboutSection />
      <WhatWeDoSection />
      <LendingSolutionsSection />
      <GetInTouchSection />
      <ClientsPartnersSection partnerImageSrcs={partnerImageSrcs} />
      <ScrollToTopButton />
    </div>
  );
};

export default HomePage;
