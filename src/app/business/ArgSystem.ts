import {IArgSystem, IType, ISupportType, IPattern, IPatternsBase, IStep, IStrategy} from './IArgSystem';

export class ArgSystem implements IArgSystem {
  steps;
  patternsBase;
  objective;
  baseEvidences;
}

export class Step implements IStep {
  id;
  patternId;
  supports: Object[];
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
  supports: ISupportType[];
  conclusion: ISupportType;


  constructor(id: string, name: string, strategy: IStrategy, inputTypes: ISupportType[], outputType: ISupportType) {
    this.id = id;
    this.name = name;
    this.strategy = strategy;
    this.supports = inputTypes;
    this.conclusion = outputType;
  }
}

export class Type implements IType {
  classType: string;
  nameType: string;

  constructor(type: string, name: string) {
    this.classType = type;
    this.nameType = name;
  }
}

export class SupportType implements ISupportType {
  name : string;
  type : IType;

  constructor(type: IType, name: string) {
    this.type = type;
    this.name = name;
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
  support: Object;


  constructor(support: Object) {
    this.support = support;
  }
}

export class DocumentEvidence {
  name: string;
  element: Object;
  '@type' = 'fr.axonic.jf.engine.support.instance.DocumentEvidence';


  constructor(name: string) {
    this.name = name;
    this.element = null;
  }
}

export class FormConclusion {
  '@type' = 'fr.axonic.jf.engine.support.instance.FormConclusion';
  name: string;
  element: Object;


  constructor(name: string) {
    this.name = name;
    this.element = {
      '@type': '.Form'
    };
  }
}
