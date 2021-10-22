import { CurrentProcess } from "./current-process";
import { ProcessPending } from "./process-pending";

export type State = {
  currentProcess?: CurrentProcess;
  processPendingArgs?: any[];
};
