import { Text } from "react-native";
import { render } from "@testing-library/react-native";
import { DynamicStyleSheet } from "../dynamic-style-sheet";
import { SheetProps } from "../../dist";
import { useFakeDynamicStyleSheet } from "../fake-dynamic-stylesheet";

const TestComponent = () => {
  const styleSheet = new DynamicStyleSheet(({ theme }: SheetProps<any>) => ({
    mainStyle: {
      color: theme.test.other,
    },
  }));

  const style = useFakeDynamicStyleSheet(styleSheet);
  return <Text>{style.mainStyle.color}</Text>;
};

describe("Fake dynamic stylesheet", () => {
  test('Should convert "theme" values to CSS variables', () => {
    const { getByText } = render(<TestComponent />);
    expect(getByText("var(--test_other)")).not.toBeEmpty();
  });
});
