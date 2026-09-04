import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { sound } from "./utils/soundEngine";
import ResumeDownload from "./components/ResumeDownload/ResumeDownload";
import CollaborateTransition from "./components/CollaborateTransition/CollaborateTransition";

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
    act(() => {
      fireEvent.click(button);
    });

    expect(screen.getByText("49KB")).toBeInTheDocument();
    expect(button.classList.contains("packaging")).toBe(true);
  });

  test("CollaborateTransition button renders and triggers quantum warp overlay", () => {
    render(
      <BrowserRouter>
        <CollaborateTransition />
      </BrowserRouter>
    );
    const button = screen.getByRole("button", {
      name: /initiate direct collaboration contact channel/i,
    });
    expect(button).toBeInTheDocument();

    // Click triggers warp overlay
    act(() => {
      fireEvent.click(button);
    });

    const overlay = screen.getByRole("dialog", { name: /quantum hyperspace transition/i });
    expect(overlay).toBeInTheDocument();
    expect(screen.getByText(/initiating quantum handshake/i)).toBeInTheDocument();
  });
});

