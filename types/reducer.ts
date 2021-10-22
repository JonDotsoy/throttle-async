export interface Reducer<T, A> {
  (state: T, action: A): T;
}
