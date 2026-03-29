import AboutSection from "./_components/AboutSection";
import HeroSection from "./_components/HeroSection";

const HomePage = () => {
  return (
    <div className="w-screen flex flex-col overflow-y-scroll">
      <HeroSection />
      <AboutSection />
    </div>
  );
};

export default HomePage;
