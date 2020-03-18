/**
 * The type to make T nullable.
 *
 * @template T - A type to be nullable.
 */
export type Nullable<T> = T | undefined;

/**
 * Sleeps for the given period of time.
 *
 * @param milliSeconds - Amount of time to sleep in milliseconds.
 * @returns a Promise that will be resolved when the given time elapsed.
 */
export const sleep = (milliSeconds: number) =>
  new Promise((resolve) => setTimeout(resolve, milliSeconds));
