/**
 * This component was originally based off of
 * @see https://github.com/shaggyrec/react-aim-menu/tree/5de4c709495439e2418baa1f320252e6ec33c05b
 * And then ported to React Native for Web, using native React Native APIs.
 */
import React, { createContext, useRef, useState, useMemo } from "react";
import type { ReactNode } from "react";
import {
  getMousePosition,
  getRectangle,
  getTriangleZone,
  isInsideTriangle,
} from "./functions";
import { View, ViewProps } from "react-native";
import { useId } from "@reach/auto-id";
import { useIsomorphicLayoutEffect as useLayoutEffect } from "../utils/use-isomorphic-layout-effect";
import { canUseDOM } from "../utils/can-use-dom";
import { ContextMenuItem } from "./context-menu-item";

interface State {
  pendingExpand: {
    item: string | null;
    timeoutId?: any;
  } | null;
  mouseHistory: any[];
}

const state: State = {
  pendingExpand: {
    item: null,
    timeoutId: null,
  },
  mouseHistory: [],
};

function clearPendingExpand(): void {
  if (state.pendingExpand && state.pendingExpand.timeoutId) {
    clearTimeout(state.pendingExpand.timeoutId);
  }
  state.pendingExpand = null;
}

function checkAim(menuElem: Element): boolean {
  if (state.mouseHistory.length < 2) return false;
  const currentPosition = state.mouseHistory[state.mouseHistory.length - 1];
  const prevPosition = state.mouseHistory[0];
  const menuBox = getRectangle(menuElem);
  const triangle = getTriangleZone(menuBox, prevPosition);

  return isInsideTriangle(triangle, currentPosition);
}

interface ContextState {
  onItemEnter?: (item: string) => void;
  onItemLeave?: () => void;
  expandedItem?: string;
}

const defaultState: ContextState = {};

const DEFAULT_HOVER_DELAY = 450;
const MOUSE_HISTORY_SIZE = 3;

export const MenuContext = createContext(defaultState);

type ContextMenuProps = {
  idPrepend: string;
  hoverDelay?: number;
  children: ReactNode;
} & ViewProps;

export const ContextMenu = ({
  idPrepend,
  hoverDelay = DEFAULT_HOVER_DELAY,
  ...props
}: ContextMenuProps) => {
  const menuRef = useRef(null);

  const _viewId = useId();
  const viewId = useMemo(() => `${idPrepend}${_viewId}`, [idPrepend, _viewId]);

  function updateExpand(): void {
    if (!state.pendingExpand || expandedItem === state.pendingExpand.item) {
      return;
    }
    setExpandedItem(state.pendingExpand.item);
    state.mouseHistory = [];
    clearPendingExpand();
  }

  function onItemEnter(item: string): void {
    clearPendingExpand();
    state.pendingExpand = { item };
    if (!expandedItem || !checkAim(menuRef.current!)) {
      return updateExpand();
    }
    state.pendingExpand.timeoutId = setTimeout(
      () => updateExpand(),
      hoverDelay
    );
  }

  function onItemLeave(): void {
    state.pendingExpand = {
      item: null,
      timeoutId: setTimeout(() => updateExpand(), hoverDelay + 100),
    };
  }

  function onMouseMove(event: MouseEvent): void {
    state.mouseHistory.push(getMousePosition(event));
    if (state.mouseHistory.length > MOUSE_HISTORY_SIZE) {
      state.mouseHistory.shift();
    }
  }

  function handleMenuLeave(event: MouseEvent): void {
    clearPendingExpand();
    setExpandedItem(null);
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

    el.addEventListener("mouseleave", handleMenuLeave);
    el.addEventListener("mousemove", onMouseMove);
    return () => {
      el.removeEventListener("mouseleave", handleMenuLeave);
      el.removeEventListener("mousemove", onMouseMove);
    };
  }, [viewId]);

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <MenuContext.Provider
      value={{ onItemEnter, onItemLeave, expandedItem: expandedItem! }}
    >
      <View {...props} nativeID={viewId}>
        {props.children}
      </View>
    </MenuContext.Provider>
  );
};
