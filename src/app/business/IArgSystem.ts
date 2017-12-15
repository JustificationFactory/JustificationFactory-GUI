export interface IArgSystem {
  steps: IStep[];
  patternsBase: IPatternsBase;
  objective: Object;
  baseEvidences: Object[];
}

export interface IStep {
  id: string;
  patternId: string;
  evidenceRoles: Object[];
  strategy: IStrategy;
  conclusion: Object;
}

// TODO: to verify
export interface IConclusion {
  toz: any;
}

export interface IStrategy {
  // TODO: type instead of @type, keep in mind
  '@type': string;
  name: string;
  rationale: Object;
  usageDomain: Object;
}

export interface IPatternsBase {
  patterns: IPattern[];
}

export interface IPattern {
  id: string;
  name: string;
  strategy: IStrategy;
  inputTypes: IInputType[];
  outputType: IOutputType;
}

export interface IInputType {
  type: string;
  name: string;
}

export interface IOutputType {
  type: string;
}
