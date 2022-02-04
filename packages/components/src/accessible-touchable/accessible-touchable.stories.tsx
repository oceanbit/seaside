import { AccessibleTouchable } from "./accessible-touchable";
import { Text, StyleSheet } from "react-native";

const AccessibleTouchableDemo = ({ ...props }: any) => {
  return (
    <AccessibleTouchable
      style={style.main}
      focusedStyle={{
        outline: "1px solid red",
      }}
      pressedStyle={style.pressedStyle}
      hoveredStyle={{
        backgroundColor: "#f0f0f0",
      }}
      idPrepend={"accessible-touchable-"}
      {...props}
    >
      <Text style={{ color: "inherit" }}>Hello</Text>
    </AccessibleTouchable>
  );
};

const style = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 10,
  },
  pressedStyle: {
    backgroundColor: "black",
    color: "white",
  },
});

export default { title: "Base Components/Accessible Touchable" };

export const DefaultStyling = (args: { disabled: boolean }) => (
  <AccessibleTouchableDemo {...args} />
);

DefaultStyling.args = { disabled: false };
