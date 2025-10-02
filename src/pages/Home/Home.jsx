import HeroSection from "../../components/HeroSection/HeroSection";
import Journey from "../../components/Journey/Journey";

import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <HeroSection />
      <Journey />
    </div>
  );
};

export default Home;
