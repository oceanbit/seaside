import React from "react";
import { TextInput } from "./text-input";
import { StorybookProvider } from "../storybook-provider";

const SeaInputDemo = ({ ...props }: any) => {
  const [value, setValue] = React.useState("");
  return (
    <TextInput
      value={value}
      onChangeText={setValue}
      endIcon={"copy"}
      {...props}
    />
  );
};

export default { title: "Seaside Components/Text Input" };

export const DefaultStyling = (args: { disabled: boolean }) => (
  <StorybookProvider>
    <SeaInputDemo {...args} />
  </StorybookProvider>
);

DefaultStyling.args = { disabled: false };
