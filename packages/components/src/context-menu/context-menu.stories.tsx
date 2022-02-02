import React, { useState } from "react";
import { ContextMenu, ContextMenuItem } from "./index";
import { StyleProp, View, ViewStyle } from "react-native";

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function generateBg(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function renderSubmenus(active: number | null) {
  return items.map((i) => (
    <View
      key={`submenu${i}`}
      style={[
        reactAimMenuSubmenu,
        active === i ? reactAimMenuSubmenuActive : {},
        { backgroundColor: generateBg() },
      ]}
    >
      submenu{i}
    </View>
  ));
}

const SeaSwitchDemo = ({ ...props }: any) => {
  const [active, setActive] = useState<number | null>(null);

  function setActiveElement(index: number | null): void {
    setActive(index);
  }

  function renderMenuItems() {
    return items.map((i) => (
      <ContextMenuItem
        idPrepend={"testing-menu"}
        key={i}
        onHover={() => setActiveElement(i)}
        style={reactAimMenuItem}
      >
        item{i}
      </ContextMenuItem>
    ));
  }

  return (
    <ContextMenu idPrepend={"testing"} style={reactAimMenuStyle}>
      {renderMenuItems()}
      {renderSubmenus(active)}
    </ContextMenu>
  );
};

const reactAimMenuStyle: StyleProp<ViewStyle> = {
  width: 200,
  position: "relative",
};

const reactAimMenuItem: StyleProp<ViewStyle> = {
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  paddingRight: 15,
  borderTopWidth: 0,
  borderBottomWidth: 1,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderStyle: "solid",
  borderColor: "#000",
};

const reactAimMenuSubmenu: StyleProp<ViewStyle> = {
  display: "none",
  position: "absolute",
  left: 200,
  top: 0,
  width: 300,
  height: 500,
  padding: 15,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "#000",
  // color: '#fff',
  minHeight: "100vh",
  // textShadow: 1px 1px 1px rgba(0,0,0,.5),
};

const reactAimMenuSubmenuActive: StyleProp<ViewStyle> = {
  display: "flex",
};

export default { title: "Seaside Components/Context Menu" };

export const DefaultStyling = (args: {}) => <SeaSwitchDemo {...args} />;

DefaultStyling.args = {};
