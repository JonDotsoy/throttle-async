import { Reducer } from "./types/reducer";
import { Subscription } from "./types/subscription";

export class Store<T, A extends { type: string }> {
  private subscriptions: Subscription[] = [];

  constructor(private reducer: Reducer<T, A>, private state: T) { }

  getState() {
    return this.state;
  }

  subscribe(subscription: Subscription) {
    this.subscriptions.push(subscription);
    return () => {
      this.subscriptions = this.subscriptions.filter((sub) => sub !== subscription);
    };
  }

  dispatch(...actions: A[]) {
    const nextState = actions.reduce((state, action) => this.reducer(state, action), this.getState());

    if (nextState === this.state) return;

    this.state = nextState;
    this.subscriptions.forEach((subscription) => subscription());
  }
}
