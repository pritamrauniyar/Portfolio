import { sound } from "./utils/soundEngine";

describe("Portfolio Application Smoke Tests", () => {
  test("sound engine initializes and provides audio triggers", () => {
    expect(sound).toBeDefined();
    expect(typeof sound.playClick).toBe("function");
    expect(typeof sound.playHover).toBe("function");
    expect(typeof sound.playToggle).toBe("function");
    expect(typeof sound.toggleMute).toBe("function");
  });

  test("application environment has document defined", () => {
    expect(document).toBeDefined();
  });
});

