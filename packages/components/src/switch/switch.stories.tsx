import React from "react";
import { Switch } from "./switch";
import { StorybookProvider } from "../storybook-provider";

const SeaSwitchDemo = ({ ...props }: any) => {
  const [value, setValue] = React.useState(false);
  return <Switch enabled={value} onToggle={setValue} {...props} />;
};

export default { title: "Seaside Components/Switch" };

export const DefaultStyling = (args: { disabled: boolean }) => (
  <StorybookProvider>
    <SeaSwitchDemo {...args} />
  </StorybookProvider>
);

DefaultStyling.args = { disabled: false };
