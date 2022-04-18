import { createDarkModeValue } from "../dynamic-value";
import { Text } from "react-native";
import { act, render } from "@testing-library/react-native";
import {
  DynamicStyleSheet,
  useDynamicStyleSheet,
} from "../dynamic-style-sheet";

let mockCurrentMode: { current: "light" | "dark" | null } = { current: null };
type ChangeListenerFn = (p: { colorScheme: "light" | "dark" }) => void;
let mockFunctions = [] as ChangeListenerFn[];
const changeDarkMode = (mode: "light" | "dark") => {
  mockCurrentMode.current = mode;
  act(() => mockFunctions.forEach((fn) => fn({ colorScheme: mode })));
};
beforeAll(() => {
  jest.mock("react-native/Libraries/Utilities/Appearance", () => {
    return {
      addChangeListener(fn: ChangeListenerFn) {
        mockFunctions.push(fn);
        return {
          remove() {
            mockFunctions = mockFunctions.filter((f) => f !== fn);
          },
        };
      },
      getColorScheme() {
        return mockCurrentMode.current;
      },
    };
  });
});

afterAll(() => {
  jest.unmock("react-native/Libraries/Utilities/Appearance");
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
    changeDarkMode("light");
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#000" });
  });

  test("Expect dark mode styling to apply with dark mode", () => {
    changeDarkMode("dark");
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#FFF" });
  });

  test("Expect dark mode toggle to change styling", () => {
    changeDarkMode("dark");
    const { getByText } = render(<TestComponent />);
    expect(getByText("Test")).toHaveStyle({ color: "#FFF" });
    changeDarkMode("light");
    expect(getByText("Test")).toHaveStyle({ color: "#000" });
  });
});
