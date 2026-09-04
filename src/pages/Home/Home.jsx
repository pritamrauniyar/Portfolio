import HeroSection from "../../components/HeroSection/HeroSection";
import Journey from "../../components/Journey/Journey";
import TechMarquee from "../../components/TechMarquee/TechMarquee";
import ImpactMetrics from "../../components/ImpactMetrics/ImpactMetrics";

import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <TechMarquee />
      <ImpactMetrics />
      <Journey />
    </div>
  );
};

export default Home;
