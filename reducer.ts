import { Action } from "./types/action";
import { State } from "./types/state";

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'EXECUTE_PROCESS':
      if (!!state.currentProcess)
        throw new Error('Process already running');
      return {
        ...state,
        currentProcess: action.currentProcess,
      };
    case 'ADD_PENDING_PROCESS': return {
      ...state,
      processPendingArgs: action.processPendingArgs,
    };
    case 'FINISH_PROCESS': return {
      ...state,
      currentProcess: undefined,
    };
    case 'EXECUTE_PENDING_PROCESS': return {
      ...state,
      processPendingArgs: undefined,
    };
    default: return state;
  }
};
