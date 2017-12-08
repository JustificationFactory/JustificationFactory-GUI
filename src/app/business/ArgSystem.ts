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

export class Strategy implements IStrategy {
  '@type': string;
  name: string;
  rationale: Object;
  usageDomain: Object;

  constructor(type: string, name: string, rationale: Object, usageDomain: Object) {
    this['@type'] = type;
    this.name = name;
    this.rationale = rationale;
    this.usageDomain = usageDomain;
  }
}

class PatternsBase implements IPatternsBase {
  patterns: IPattern[];
}

export class Pattern implements IPattern {
  id: string;
  name: string;
  strategy: IStrategy;
  inputTypes: IInputType[];
  outputType: IOutputType;


  constructor(id: string, name: string, strategy: IStrategy, inputTypes: IInputType[], outputType: IOutputType) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
    this.inputTypes = inputTypes;
    this.outputType = outputType;
  }
}

export class InputType implements IInputType {
  type: string;
  name: string;

  constructor(type: string, name: string) {
    this.type = type;
    this.name = name;
  }
}

export class OutputType implements IOutputType {
  type;

  constructor(type) {
    this.type = type;
  }
}
