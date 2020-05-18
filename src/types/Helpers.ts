export type Nullable<T> = T | undefined;
export type NullablePromise<T> = Promise<T | undefined>;
export type OmitFrom<T, K extends keyof T> = Omit<T, K>;
export type Override<T, U> = Omit<T, keyof U> & U;
