import React, { useState } from "react";
import { ContextMenu, ContextMenuItem } from "./index";
import { StyleProp, Text, View, ViewStyle } from "react-native";

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
      <Text>submenu{i}</Text>
    </View>
  ));
}

const SeaSwitchDemo = ({ ...props }: any) => {
  const [active, setActive] = useState<number | null>(null);

  function setActiveElement(index: number | null): void {
    setActive(index);
  }

  function renderMenuItems() {
    return items.map((i, ii, arr) => (
      <ContextMenuItem
        idPrepend={"testing-menu"}
        key={i}
        onHover={() => setActiveElement(i)}
        style={[
          reactAimMenuItem,
          i === active ? reactAimMenuItemActive : {},
          ii === 0 ? reactAimMenuItemFirst : {},
          ii === arr.length - 1 ? reactAimMenuItemLast : {},
        ]}
      >
        <Text>item{i}</Text>
      </ContextMenuItem>
    ));
  }

  return (
    <ContextMenu
      idPrepend={"testing"}
      style={reactAimMenuStyle}
      onLeave={() => setActiveElement(null)}
    >
      {renderMenuItems()}
      {renderSubmenus(active)}
    </ContextMenu>
  );
};

const reactAimMenuStyle: StyleProp<ViewStyle> = {
  marginTop: 20,
  width: 200,
  borderRadius: 16,
  position: "relative",
  ...({ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" } as {}),
};

const reactAimMenuItemFirst: StyleProp<ViewStyle> = {
  borderTopWidth: 1,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
};

const reactAimMenuItemLast: StyleProp<ViewStyle> = {
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
};

const reactAimMenuItemActive: StyleProp<ViewStyle> = {
  backgroundColor: "#f0f0f0",
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
  // textShadow: 1px 1px 1px rgba(0,0,0,.5),
};

const reactAimMenuSubmenuActive: StyleProp<ViewStyle> = {
  display: "block" as any,
};

export default { title: "Seaside Components/Context Menu" };

export const DefaultStyling = (args: {}) => <SeaSwitchDemo {...args} />;

DefaultStyling.args = {};
