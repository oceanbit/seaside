export interface Wat {
  [key: string]: Wat & { toString(): string };
}

function removeCSSVarPrepend(str: String) {
  if (str.startsWith("var(--") && str.endsWith(")")) {
    return str.substring("var(--".length, str.length - 1);
  }
  return str;
}

export const createParrotProxy = (obj = {}): Wat => {
  return new Proxy(obj, {
    get: (target, property, receiver) => {
      const val = Reflect.get(target, property, receiver);
      if (val instanceof Function) return val.bind(target);
      return (
        val ??
        createParrotProxy(
          new String(
            target instanceof String
              ? `var(--${removeCSSVarPrepend(target)}_${String(property)})`
              : `var(--${String(property)})`
          )
        )
      );
    },
  });
};
