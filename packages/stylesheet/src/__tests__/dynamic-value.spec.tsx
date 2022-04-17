import { useDynamicValue } from "../dynamic-value";
import { Text } from "react-native";
import { render } from "@testing-library/react-native";

const TestComponent = () => {
  const value = useDynamicValue({ light: "light", dark: "dark" });
  return <Text>{value}</Text>;
};

test("Expect light mode default", () => {
  const { getByText } = render(<TestComponent />);
  expect(getByText("light")).toBeTruthy();
});

test("Expect dark mode when device is dark", () => {
  jest.mock("react-native/Libraries/Utilities/useColorScheme", () => {
    return {
      default: () => "dark",
    };
  });
  const { getByText } = render(<TestComponent />);
  expect(getByText("dark")).toBeTruthy();
  jest.requireMock("react-native/Libraries/Utilities/useColorScheme");
});
