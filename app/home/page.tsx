import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";
import WhatWeDoSection from "./_components/WhatWeDoSection";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col overflow-y-scroll">
      <HeroSection />
      <AboutSection />
      <WhatWeDoSection />
    </div>
  );
};

export default HomePage;
