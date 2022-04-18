export type Mode = "light" | "dark";
export type ValueOf<T> = T[keyof T];
export type IndexedObject<T> = { [key: string]: T };

export type SimpleRecord = Record<string, any>;
