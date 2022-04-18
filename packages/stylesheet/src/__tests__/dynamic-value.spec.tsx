import { createDarkModeValue, useDarkModeValue } from "../dynamic-value";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { ColorSchemeProvider } from "../color-scheme-context";

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
    mockDarkMode.current = "dark";
    const { getByText } = render(<TestComponent />);
    expect(getByText("dark")).toBeTruthy();
  });

  test("Expect light mode when device is light", () => {
    mockDarkMode.current = "light";
    const { getByText } = render(<TestComponent />);
    expect(getByText("light")).toBeTruthy();
  });

  test("Expect light mode when device is dark but context is light", () => {
    mockDarkMode.current = "dark";
    const { getByText } = render(<TestComponentWithContext mode={"light"} />);
    expect(getByText("light")).toBeTruthy();
  });

  test("Expect dark mode when device is light but context is dark", () => {
    mockDarkMode.current = "light";
    const { getByText } = render(<TestComponentWithContext mode={"dark"} />);
    expect(getByText("dark")).toBeTruthy();
  });
});
