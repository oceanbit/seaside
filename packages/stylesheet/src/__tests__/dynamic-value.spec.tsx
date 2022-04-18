import { createDarkModeValue, useDarkModeValue } from "../dynamic-value";
import { Text } from "react-native";
import { act, render } from "@testing-library/react-native";
import { ColorSchemeProvider } from "../color-scheme-context";

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
  const dynamicValue = createDarkModeValue("light", "dark");
  const value = useDarkModeValue(dynamicValue);
  return <Text>{value}</Text>;
};

const TestComponentWithContext = ({ mode }: { mode: "light" | "dark" }) => {
  const SubComp = () => {
    const dynamicValue = createDarkModeValue("light", "dark");
    const value = useDarkModeValue(dynamicValue);
    return <Text>{value}</Text>;
  };

  return (
    <ColorSchemeProvider mode={mode}>
      <SubComp />
    </ColorSchemeProvider>
  );
};

describe("Dynamic value", function () {
  test("Expect light mode default", () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("light")).toBeTruthy();
  });

  test("Expect dark mode when device is dark", () => {
    changeDarkMode("dark");
    const { getByText } = render(<TestComponent />);
    expect(getByText("dark")).toBeTruthy();
  });

  test("Expect light mode when device is light", () => {
    changeDarkMode("light");
    const { getByText } = render(<TestComponent />);
    expect(getByText("light")).toBeTruthy();
  });

  test("Expect light mode when device is dark but context is light", () => {
    changeDarkMode("dark");
    const { getByText } = render(<TestComponentWithContext mode={"light"} />);
    expect(getByText("light")).toBeTruthy();
  });

  test("Expect dark mode when device is light but context is dark", () => {
    changeDarkMode("light");
    const { getByText } = render(<TestComponentWithContext mode={"dark"} />);
    expect(getByText("dark")).toBeTruthy();
  });
});
