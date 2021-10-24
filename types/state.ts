import { CurrentProcess } from "./current-process";

export type State = {
  currentProcess?: CurrentProcess;
  processPendingArgs?: any[];
};
