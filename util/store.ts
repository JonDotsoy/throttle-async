import { Reducer } from "../types/reducer";
import { Subscription } from "../types/subscription";
import { State } from "./types/state";
import { Action } from "./types/action";
import { createNextTickCallback } from "./create-next-tick-callback";

export class Store<S extends State, A extends Action> {
  private subscriptions: Subscription[] = [];
  private nextTickCallback = createNextTickCallback();

  constructor(private reducer: Reducer<S, A>, private state: S) { }

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
    this.nextTickCallback(() => {
      this.subscriptions.forEach((subscription) => subscription());
    });
  }
}
