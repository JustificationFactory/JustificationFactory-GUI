class ArgSystem implements IArgSystem {
  steps;
  patternsBase;
  objective;
  baseEvidences;
}

class Step implements IStep {
  id;
  patternId;
  evidenceRoles: Object[];
  strategy: Strategy;
  conclusion: Object;
}

class Strategy implements IStrategy {
  type: string;
  name: string;
  rationale: Object;
  usageDomain: Object;
}

class PatternsBase implements IPatternsBase {
  patterns: IPattern[];
}

class Pattern implements IPattern {
  id;
  name;
  string;
  strategy: IStrategy;
  inputTypes: IInputType[];
  outputType: IOutputType;
}

class InputType implements IInputType {
  type: string;
  name: string;
}

class OutputType implements IOutputType {
  type;
}
