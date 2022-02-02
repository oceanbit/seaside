/**
 * @see https://react-hooks.org/docs/useForkRef
 * @see https://github.com/mui-org/material-ui/blob/49b3469442d45329df59e524fd31a2ce6ff311cc/packages/mui-utils/src/useForkRef.ts
 */
import { useMemo, MutableRefObject } from "react";
type HTMLElementOrNull = HTMLElement | null;
type CallbackRef = (node: HTMLElementOrNull) => any;
type AnyRef = CallbackRef | MutableRefObject<HTMLElementOrNull>;

function setRef(ref: AnyRef, value: HTMLElementOrNull): void {
  if (!ref) return;
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    (ref as MutableRefObject<any>).current = value;
  }
}

/**
 * useForkRef
 * Joins refs together and returns a combination of the two as a new ref
 *
 * @param refA
 * @param refB
 */
function useForkRef(refA: AnyRef, refB: AnyRef): CallbackRef | null {
  /**
   * This will create a new function if the ref props change and are defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior
   */
  return useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }

    return (refValue: HTMLElementOrNull) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}

export { useForkRef };
