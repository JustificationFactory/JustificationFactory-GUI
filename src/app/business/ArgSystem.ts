import {IArgSystem, IInputType, IOutputType, IPattern, IPatternsBase, IStep, IStrategy} from './IArgSystem';

export class ArgSystem implements IArgSystem {
  steps;
  patternsBase;
  objective;
  baseEvidences;
}

export class Step implements IStep {
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

export class PatternsBase implements IPatternsBase {
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

export class StepToCreate {
  supports: SupportObject[];
  conclusion: Object;


  constructor(supports: SupportObject[], conclusion: Object) {
    this.supports = supports;
    this.conclusion = conclusion;
  }
}

export class SupportObject {
  role: string;
  support: Object;


  constructor(role: string, support: Object) {
    this.role = role;
    this.support = support;
  }
}

export class DocumentEvidence {
  name: string;
  element: Object;
  '@type' = 'fr.axonic.avek.engine.support.instance.DocumentEvidence';


  constructor(name: string) {
    this.name = name;
    this.element = null;
  }
}

export class FormConclusion {
  '@type' = 'fr.axonic.avek.engine.support.instance.FormConclusion';
  name: string;
  element: Object;


  constructor(name: string) {
    this.name = name;
    this.element = {
      '@type': '.Form'
    };
  }
}
