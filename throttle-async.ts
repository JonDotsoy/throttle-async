import { State } from "./types/state";
import { Store } from "./util/store";
import { nextTick } from 'process'
import { setTimeout } from 'timers/promises'
import { reducer } from "./reducer";
import { Func } from "./types/func";

class ThrottleAsync<A extends any[], Fn extends Func<A>> {
  private store = new Store(reducer, {})

  private constructor(private fn: Fn, private wait?: number) {
    this.store.subscribe(() => {
      const { currentProcess, processPendingArgs } = this.store.getState()

      if (!currentProcess && processPendingArgs) {
        nextTick(() => {
          this.store.dispatch(
            {
              type: 'EXECUTE_PENDING_PROCESS',
            },
            {
              type: 'EXECUTE_PROCESS',
              currentProcess: this.prepareExecuteProcess(...processPendingArgs as A),
            }
          )
        })
      }
    })
  }

  subscribe(fn: (state: State) => void) {
    return this.store.subscribe(() => fn(this.store.getState()))
  }

  invoke(...args: A) {
    const { currentProcess, processPendingArgs } = this.store.getState()

    if (!currentProcess && !processPendingArgs) {
      return this.executeProcess(...args);
    }

    return this.addPendingProcess(...args);
  }

  prepareProcess(...args: A) {
    return async () => {

    }
  }

  async prepareExecuteProcess(...args: A) {
    try {
      await this.fn(...args);
      await setTimeout(this.wait ?? 0);
    }
    catch (ex) {
      console.error(ex)
    }
    finally {
      this.store.dispatch({
        type: 'FINISH_PROCESS',
      })
    }
  }


  executeProcess(...args: A) {
    this.store.dispatch({
      type: 'EXECUTE_PROCESS',
      currentProcess: this.prepareExecuteProcess(...args),
    })
  }

  addPendingProcess(...args: A) {
    this.store.dispatch({
      type: 'ADD_PENDING_PROCESS',
      processPendingArgs: args,
    })
  }

  async waitFinish() {
    return new Promise<void>((resolve) => {
      const unsubscribe = this.store.subscribe(() => {
        const { currentProcess, processPendingArgs } = this.store.getState()

        if (!currentProcess && !processPendingArgs) {
          unsubscribe()
          resolve()
        }
      })
    })
  }

  exportInvoke = Object.assign(
    (...args: A) => this.invoke(...args),
    {
      throttleAsync: this as ThrottleAsync<A, Fn>,
      ThrottleAsync: ThrottleAsync,
      waitFinish: () => this.waitFinish(),
    },
  );

  static create<A extends any[], Fn extends Func<A>>(fn: Fn, wait?: number) {
    const throttleAsync = new ThrottleAsync<A, Fn>(fn)

    return throttleAsync.exportInvoke;
  }
}

export function throttleAsync<Fn extends Func>(
  invocationHook: Fn,
  wait: number = 0
) {
  return ThrottleAsync.create(invocationHook, wait)
}
