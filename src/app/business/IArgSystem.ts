interface IArgSystem {
  steps: IStep[];
  patternsBase: IPatternsBase;
  objective: Object;
  baseEvidences: Object[];
}

interface IStep {
  id: string;
  patternId: string;
  evidenceRoles: Object[];
  strategy: IStrategy;
  conclusion: Object;
}

// TODO: to verify
interface IConclusion {
  toz: any;
}

interface IStrategy {
  // TODO: type instead of @type, keep in mind
  '@type': string;
  name: string;
  rationale: Object;
  usageDomain: Object;
}

interface IPatternsBase {
  patterns: IPattern[];
}

interface IPattern {
  id: string;
  name: string;
  strategy: IStrategy;
  inputTypes: IInputType[];
  outputType: IOutputType;
}

interface IInputType {
  type: string;
  name: string;
}

interface IOutputType {
  type: string;
}
