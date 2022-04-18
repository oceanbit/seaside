import { Switch } from "./switch";
import { render, fireEvent } from "@testing-library/react-native";
import { ComponentProps, ReactNode, useState } from "react";
import { StorybookProvider } from "../storybook-provider";

const renderSwitch = (children: ReactNode) => {
  return render(<StorybookProvider>{children}</StorybookProvider>);
};

describe("Switch", function () {
  test("Should render enabled", () => {
    const { getByTestId } = renderSwitch(
      <Switch enabled={false} onToggle={() => {}} disabled={false} />
    );
    expect(getByTestId("switch")).not.toBeDisabled();
  });

  test("Should render disabled", () => {
    const { getByTestId } = renderSwitch(
      <Switch enabled={false} onToggle={() => {}} disabled={true} />
    );
    expect(getByTestId("switch")).toBeDisabled();
  });

  test("Should toggle when enabled", () => {
    const DisabledSwitch = () => {
      const [enabled, setEnabled] = useState(false);
      return (
        <Switch enabled={enabled} onToggle={setEnabled} disabled={false} />
      );
    };

    const { getByTestId } = renderSwitch(<DisabledSwitch />);
    const switchInstance = getByTestId("switch");
    expect(switchInstance).toHaveProp("accessibilityState", {
      disabled: false,
      selected: false,
    });
    fireEvent(switchInstance, "press");
    expect(getByTestId("switch")).toHaveProp("accessibilityState", {
      disabled: false,
      selected: true,
    });
  });

  test("Should not toggle when disabled", () => {
    const DisabledSwitch = () => {
      const [enabled, setEnabled] = useState(false);
      return <Switch enabled={enabled} onToggle={setEnabled} disabled={true} />;
    };

    const { getByTestId } = renderSwitch(<DisabledSwitch />);
    const switchInstance = getByTestId("switch");
    expect(switchInstance).toHaveProp("accessibilityState", {
      disabled: true,
      selected: false,
    });
    fireEvent(switchInstance, "press");
    expect(switchInstance).toHaveProp("accessibilityState", {
      disabled: true,
      selected: false,
    });
  });

  test.todo("Should toggle for web components");
});
