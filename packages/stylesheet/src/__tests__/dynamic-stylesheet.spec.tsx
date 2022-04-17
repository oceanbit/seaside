import { createDarkModeValue } from "../dynamic-value";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from "../dynamic-style-sheet";

let mockDarkMode = { current: "light" };
beforeAll(() => {
  jest.mock("react-native/Libraries/Utilities/useColorScheme", () => {
    return {
      default: () => mockDarkMode.current,
    };
  });
});

afterAll(() => {
  jest.unmock("react-native/Libraries/Utilities/useColorScheme");
});

const TestComponent = () => {
  const styleSheet = new DynamicStyleSheet(() => ({
    mainStyle: {
      color: createDarkModeValue("#000", "#FFF"),
    },
  }));

  const style = useDynamicStyleSheet(styleSheet);
  return <Text style={style.mainStyle}>Test</Text>;
};

describe("Dynamic Stylesheet", function () {
  test("Expect light mode styling to apply with light mode", () => {
    mockDarkMode.current = "light";
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#000" });
  });

  test("Expect dark mode styling to apply with dark mode", () => {
    mockDarkMode.current = "dark";
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#FFF" });
  });

  test("Expect dark mode toggle to change styling", () => {
    mockDarkMode.current = "dark";
    const { getByText, rerender } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#FFF" });
    mockDarkMode.current = "light";
    rerender(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#000" });
  });
});