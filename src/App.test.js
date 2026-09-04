import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sound } from "./utils/soundEngine";
import ResumeDownload from "./components/ResumeDownload/ResumeDownload";
import CollaborateTransition from "./components/CollaborateTransition/CollaborateTransition";

beforeAll(() => {
  global.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("Portfolio Application Smoke Tests", () => {
  test("sound engine initializes and provides audio triggers including warp", () => {
    expect(sound).toBeDefined();
    expect(typeof sound.playClick).toBe("function");
    expect(typeof sound.playHover).toBe("function");
    expect(typeof sound.playToggle).toBe("function");
    expect(typeof sound.playWarp).toBe("function");
    expect(typeof sound.toggleMute).toBe("function");
  });

  test("application environment has document defined", () => {
    expect(document).toBeDefined();
  });

  test("ResumeDownload button renders and transitions state on click", () => {
    render(<ResumeDownload resumeUrl="/PritamRauniyarResume.pdf" />);
    const button = screen.getByRole("button", { name: /download pritam rauniyar resume pdf/i });
    expect(button).toBeInTheDocument();
    expect(screen.getByText(/download resume/i)).toBeInTheDocument();

    // Click triggers packaging
    fireEvent.click(button);

    expect(screen.getByText("49KB")).toBeInTheDocument();
    expect(button.classList.contains("packaging")).toBe(true);
  });

  test("CollaborateTransition button renders and triggers quantum warp overlay", () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <CollaborateTransition />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", {
      name: /initiate direct collaboration contact channel/i,
    });
    expect(button).toBeInTheDocument();

    // Click triggers warp overlay
    fireEvent.click(button);

    const overlay = screen.getByRole("dialog", { name: /quantum hyperspace transition/i });
    expect(overlay).toBeInTheDocument();
    expect(screen.getByText(/initiating quantum handshake/i)).toBeInTheDocument();
  });

  test("ImpactMetrics renders distinct high-scale production benchmarks without redundant tenure stats", () => {
    const ImpactMetrics = require("./components/ImpactMetrics/ImpactMetrics").default;
    render(<ImpactMetrics />);
    
    // Checks that high-scale production metrics exist
    expect(screen.getByText(/direct revenue impact/i)).toBeInTheDocument();
    expect(screen.getByText(/sub-second latency acceleration/i)).toBeInTheDocument();
    expect(screen.getByText(/production high-availability sla/i)).toBeInTheDocument();
    expect(screen.getByText(/global engineers empowered/i)).toBeInTheDocument();

    // Verify redundant career metrics are NOT in the impact grid
    expect(screen.queryByText(/years building production systems/i)).toBeNull();
    expect(screen.queryByText(/certifications across cloud platforms/i)).toBeNull();
  });

  test("Navbar renders links in senior engineering hierarchy (Home -> Projects -> About -> Certificates -> Blogs -> Contact)", () => {
    const Navbar = require("./components/Navbar/Navbar").default;
    const { ThemeProvider } = require("./context/ThemeContext");
    render(
      <ThemeProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
        </BrowserRouter>
      </ThemeProvider>
    );

    const desktopLinks = screen.getAllByRole("link").map((l) => l.textContent.trim());
    // Filter to navigation items
    const navItems = desktopLinks.filter((txt) =>
      ["Home", "Projects", "About", "Certificates", "Blogs", "Contact"].includes(txt)
    );

    // Verify Projects and About come before Certificates
    expect(navItems[0]).toBe("Home");
    expect(navItems[1]).toBe("Projects");
    expect(navItems[2]).toBe("About");
    expect(navItems[3]).toBe("Certificates");
    expect(navItems[4]).toBe("Blogs");
    expect(navItems[5]).toBe("Contact");
  });

  test("Contact renders instant Webmail launchers (Gmail, Outlook) and scheduling callout", () => {
    const Contact = require("./pages/Contact/Contact").default;
    render(<Contact />);

    expect(screen.getByText(/compose in gmail/i)).toBeInTheDocument();
    expect(screen.getByText(/compose in outlook/i)).toBeInTheDocument();
    expect(screen.getByText(/quick 15-min intro chat/i)).toBeInTheDocument();
    expect(screen.getByText(/book via linkedin/i)).toBeInTheDocument();
    expect(screen.getByText(/open in gmail/i)).toBeInTheDocument();
    expect(screen.getByText(/copy draft/i)).toBeInTheDocument();
  });

  test("ArchitectureModal renders live beacons, data flow pipes, and contract schema tab", () => {
    const ArchitectureModal = require("./components/ArchitectureModal/ArchitectureModal").default;
    render(
      <ArchitectureModal
        isOpen={true}
        initialSystemId="splithive"
        onClose={() => {}}
      />
    );

    // Verify modal title & SLA metrics
    expect(screen.getByText(/SYSTEM ARCHITECTURE BLUEPRINT/i)).toBeInTheDocument();
    expect(screen.getAllByText(/SplitHive — Distributed Real-Time Expense Ledger/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/ACID GUARANTEED/i)).toBeInTheDocument();

    // Verify Live Beacons & Pipes exist
    const beacons = screen.getAllByText(/LIVE/i);
    expect(beacons.length).toBeGreaterThan(0);

    // Click on a node card to open inspector
    const nodeCard = screen.getByText(/React Native Mobile Client/i);
    fireEvent.click(nodeCard);

    // Inspector should open with Specification and Contract tab
    expect(screen.getByText(/Protocol & Schema Contract ⚡/i)).toBeInTheDocument();

    // Switch to Schema tab
    const contractTab = screen.getByText(/Protocol & Schema Contract ⚡/i);
    fireEvent.click(contractTab);

    // Contract code block should be rendered
    expect(screen.getByText(/payload-contract.ts/i)).toBeInTheDocument();
    expect(screen.getByText(/ExpenseMutationPayload/i)).toBeInTheDocument();
  });

  test("TreeModal renders responsive timeline with accessible company markers and category filters", () => {
    const TreeModal = require("./components/TreeModal/TreeModal").default;
    const { MyContext } = require("./components/MyContext/MyContext");
    const mockJourneyData = require("../public/data/journeyData.json");

    render(
      <MyContext.Provider value={mockJourneyData}>
        <TreeModal />
      </MyContext.Provider>
    );

    // Verify Executive Stats Bar
    expect(screen.getByText(/Technical Ownership/i)).toBeInTheDocument();
    expect(screen.getByText(/4\+ Yrs/i)).toBeInTheDocument();
    expect(screen.getByText(/Direct Revenue Impact/i)).toBeInTheDocument();
    expect(screen.getByText(/\$38M\+/i)).toBeInTheDocument();

    // Verify Filter Tabs with full and short labels
    const tablist = screen.getByRole("tablist", { name: /timeline category filter/i });
    expect(tablist).toBeInTheDocument();
    expect(screen.getByText("All Milestones")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Industry Leadership")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();

    // Verify Milestone Cards rendered
    expect(screen.getByText("Uber")).toBeInTheDocument();
    expect(screen.getByText("Elevate K-12")).toBeInTheDocument();
    expect(screen.getByText("Active Role")).toBeInTheDocument();

    // Verify accordion button has aria-expanded
    const expandButtons = screen.getAllByRole("button", { name: /deliverables/i });
    expect(expandButtons.length).toBeGreaterThan(0);
    expect(expandButtons[0]).toHaveAttribute("aria-expanded");
  });
});


