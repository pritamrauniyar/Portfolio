import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Project from "./pages/Project/Project";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Certificates from "./pages/Certificates/Certificates";
import { MyContextProvider } from "./components/MyContext/MyContext";
import ReactGA from "react-ga4";

// Initialize Google Analytics
ReactGA.initialize("G-1SJ51YJ4NT");

function App() {
  return (
    <MyContextProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <AnalyticsWrapper>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project" element={<Project />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/certificates" element={<Certificates />} />
              </Routes>
            </AnalyticsWrapper>
          </main>
          <Footer />
        </div>
      </Router>
    </MyContextProvider>
  );
}

export default App;

// Component to handle Google Analytics page tracking
function AnalyticsWrapper({ children }) {
  const location = useLocation();

  useEffect(() => {
    // Send a pageview to Google Analytics
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return <>{children}</>;
}
