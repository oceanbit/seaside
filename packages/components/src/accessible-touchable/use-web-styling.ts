import { useIsomorphicLayoutEffect as useLayoutEffect } from "../utils/use-isomorphic-layout-effect";
import { useState } from "react";
import { WebStyle } from "./shared";

interface UseConditionalCssProps {
  webStyle?: WebStyle;
  viewId: string;
}

export const useWebStyling = ({ webStyle, viewId }: UseConditionalCssProps) => {
  const [condition, setCondition] = useState(false);
  const onActivate = () => setCondition(true);
  const onDeactivate = () => setCondition(false);

  const [beforeWebStyle, setBeforeWebStyle] = useState<null | string>(null);

  useLayoutEffect(() => {
    const el = document.querySelector<HTMLElement>("#" + viewId);
    if (!el || !webStyle) return;
    if (condition && !beforeWebStyle) {
      setBeforeWebStyle(el.style.cssText);
      Object.assign(el.style, webStyle);
    } else if (!condition && beforeWebStyle) {
      el.style.cssText = beforeWebStyle;
      setBeforeWebStyle(null);
    }
  }, [beforeWebStyle, condition, webStyle, viewId]);

  return [condition, onActivate, onDeactivate] as const;
};
