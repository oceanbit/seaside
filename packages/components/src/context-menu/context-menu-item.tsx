/**
 * This component was originally based off of
 * @see https://github.com/shaggyrec/react-aim-menu/tree/5de4c709495439e2418baa1f320252e6ec33c05b
 * And then ported to React Native for Web, using native React Native APIs.
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { MenuContext } from "./context-menu";
import { View, ViewProps } from "react-native";
import { useId } from "@reach/auto-id";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "../utils/use-isomorphic-layout-effect";
import { canUseDOM } from "../utils/can-use-dom";

type ContextMenuItemProps = {
  idPrepend: string;
  onHover?: () => any;
  onLeave?: () => any;
  children: ReactNode;
} & ViewProps;

export const ContextMenuItem = ({
  onHover,
  onLeave,
  idPrepend,
  ...props
}: ContextMenuItemProps) => {
  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  const [expanded, setExpanded] = useState(false);
  const menu = useContext(MenuContext);

  useEffect(() => {
    if (menu.expandedItem && menu.expandedItem === viewId && !expanded) {
      setExpanded(true);
      onHover && onHover();
    }
    if (menu.expandedItem !== viewId && expanded) {
      setExpanded(false);
      onLeave && onLeave();
    }
  }, [menu.expandedItem]);

  function handleMouseEnter(event: MouseEvent): void {
    menu.onItemEnter?.(viewId!);
  }

  function handleMouseLeave(event: MouseEvent): void {
    menu.onItemLeave?.();
  }

  useLayoutEffect(() => {
    if (!canUseDOM()) {
      console.warn(
        "The ContextMenu component only currently works in the browser"
      );
      console.warn();
      console.warn("Please see the following issue for support in RNW and RNM");
      console.warn(
        "https://github.com/microsoft/react-native-windows/issues/9454"
      );
      return;
    }
    const el = document.querySelector<HTMLElement>("#" + viewId);
    if (!el) return;

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [viewId]);

  return (
    <View {...props} nativeID={viewId}>
      {props.children}
    </View>
  );
};
