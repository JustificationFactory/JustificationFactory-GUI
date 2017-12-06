export interface IArgSystem {
  steps: IStep[];
  // TODO: je sais pas où tot ça s'est barré mais ca s'est barré des data
  // patternsBase: IPatternsBase;
  // objective: Object;
  // baseEvidences: Object[];
}

export interface IStep {
  id: string;
  patternId: string;
  evidences: IEvidence[];
  strategy: IStrategy;
  conclusion: Object;
}

// TODO: to verify
export interface IConclusion {
  name: string;
  type: string;
}

export interface IStrategy {
  // TODO: type instead of @type, keep in mind
  type: string;
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

export interface ISupport {
  type: string;
  id: string;
  name: string;
  element: Object;
}

export interface IEvidence {
  role: string;
  support: ISupport;
}
