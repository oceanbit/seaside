/**
 * This component was originally based off of
 * @see https://github.com/shaggyrec/react-aim-menu/tree/5de4c709495439e2418baa1f320252e6ec33c05b
 */
import React, { forwardRef, createContext, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import {
  getMousePosition,
  getRectangle,
  getTriangleZone,
  isInsideTriangle,
} from "./functions";
import { useForkRef } from "../utils/use-fork-ref";

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

type MenuProps = {
  hoverDelay?: number;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Menu = forwardRef(function Menu(
  { hoverDelay = DEFAULT_HOVER_DELAY, ...props }: MenuProps,
  ref: Ref<HTMLDivElement>
) {
  const menuRef = useRef(null);
  const forkedRef = useForkRef(ref as never, menuRef);

  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>): void {
    props.onMouseMove && props.onMouseMove(event);
    state.mouseHistory.push(getMousePosition(event.nativeEvent));
    if (state.mouseHistory.length > MOUSE_HISTORY_SIZE) {
      state.mouseHistory.shift();
    }
  }

  function handleMenuLeave(event: React.MouseEvent<HTMLDivElement>): void {
    props.onMouseLeave && props.onMouseLeave(event);
    clearPendingExpand();
    setExpandedItem(null);
  }

  return (
    <MenuContext.Provider
      value={{ onItemEnter, onItemLeave, expandedItem: expandedItem! }}
    >
      <div
        {...props}
        ref={forkedRef}
        onMouseLeave={handleMenuLeave}
        onMouseMove={onMouseMove}
      >
        {props.children}
      </div>
    </MenuContext.Provider>
  );
});
