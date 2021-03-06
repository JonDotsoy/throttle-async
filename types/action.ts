import { CurrentProcess } from "./current-process";

export type Action =
  | { type: 'EXECUTE_PROCESS', currentProcess: CurrentProcess }
  | { type: 'ADD_PENDING_PROCESS', processPendingArgs: any[] }
  | { type: 'FINISH_PROCESS' }
  | { type: 'EXECUTE_PENDING_PROCESS' }
