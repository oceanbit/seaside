interface Wat {
  [key: string]: Wat & { toString(): string };
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
              ? `${target}_${String(property)}`
              : property
          )
        )
      );
    },
  });
};
