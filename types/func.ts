export interface Func<A extends any[] = any[]> {
  (...args: A): Promise<any>;
}
