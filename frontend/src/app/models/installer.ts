export class Installer {
  title: string;
  steps: Step[];
  conditions: Condition[];
  texts: Texts;
  status: Status;
  mustReadAllConditions: boolean;
}

export interface Step {
  processing: boolean;
  done: boolean;
  description: string;
}

export interface Condition {
  title: string;
  body: string;
}

export interface Texts {
  acceptButton: string;
  fail: string;
  success: string;
  completedSteps: string;
  readAllConditionsTooltip: string;
}

export enum Status {
  NotAccepted = 0,
  Processing = 1,
  DoneWithoutError = 2,
  DoneWithError = 3,
}
