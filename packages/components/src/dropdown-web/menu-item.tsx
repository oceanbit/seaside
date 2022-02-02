/**
 * This component was originally based off of
 * @see https://github.com/shaggyrec/react-aim-menu/tree/5de4c709495439e2418baa1f320252e6ec33c05b
 */
import React, { useContext, useEffect, useState } from "react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { MenuContext } from "./menu";
import { generateId } from "./functions";

type MenuItemProps = {
  onHover?: () => any;
  onLeave?: () => any;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const MenuItem = React.forwardRef(function MenuItem(
  { onHover, onLeave, ...props }: MenuItemProps,
  ref: Ref<HTMLDivElement>
) {
  const [id, setId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const menu = useContext(MenuContext);

  useEffect(() => {
    setId(generateId());
  }, []);

  useEffect(() => {
    if (menu.expandedItem && menu.expandedItem === id && !expanded) {
      setExpanded(true);
      onHover && onHover();
    }
    if (menu.expandedItem !== id && expanded) {
      setExpanded(false);
      onLeave && onLeave();
    }
  }, [menu.expandedItem]);

  function handleMouseEnter(event: React.MouseEvent<HTMLDivElement>): void {
    menu.onItemEnter?.(id!);
    props.onMouseEnter && props.onMouseEnter(event);
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLDivElement>): void {
    menu.onItemLeave?.();
    props.onMouseLeave && props.onMouseLeave(event);
  }

  return (
    <div
      {...props}
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.children}
    </div>
  );
});
