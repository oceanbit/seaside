import React from "react";
import { Switch } from "./switch";

const SeaSwitchDemo = ({ ...props }: any) => {
  const [value, setValue] = React.useState(false);
  return <Switch enabled={value} onToggle={setValue} {...props} />;
};

export default { title: "Seaside Components/Switch" };

export const DefaultStyling = (args: { disabled: boolean }) => (
  <SeaSwitchDemo {...args} />
);

DefaultStyling.args = { disabled: false };
