import { nextTick } from "process";

/**
 * A nextTick function that replace the callback function by every time called.
 */
export function createNextTickCallback() {
  let callback: Function | null = null;

  return (cb: Function) => {
    if (!callback) {
      nextTick(() => {
        if (callback) {
          const cb = callback;
          callback = null;
          cb();
        }
      });
    }
    
    callback = cb;
  };
}
