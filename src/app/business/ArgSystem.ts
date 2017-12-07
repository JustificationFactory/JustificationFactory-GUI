import {
  IArgSystem,
  IConclusion,
  IEvidence,
  IInputType,
  IOutputType,
  IPattern,
  IPatternsBase,
  IStep,
  IStrategy,
  ISupport
} from './IArgSystem';


export class MyArgSystem implements IArgSystem {
  // TODO: uniformiser ce que je reprends de l'interface partout etc (genre typage et tout)
  steps = [];
  // patternsBase;
  // objective;
  // baseEvidences;

  // TODO: serialize and deserialize via implementing an interface? maybe cf stack overflow
  constructor(json: any) {
    for (const step of json.steps) {
      this.steps.push(new MyStep(step));
    }

    // TODO: la suite les objectifs et tout j'sais meme pas c'est quoi
  }
}

export class MyStep implements IStep {
  id;
  patternId;
  evidences = [];
  strategy;
  conclusion;

  constructor(json: any) {
    this.id = json.id;
    this.patternId = json.patternId;

    for (const evidence of json.evidenceRoles) {
      this.evidences.push(new MyEvidence(evidence));
    }

    this.strategy = new MyStrategy(json.strategy);

    this.conclusion = new MyConclusion(json.conclusion);
  }
}

export class MyStrategy implements IStrategy {
  type;
  name;
  // TODO: artifacts instead of rationale ??
  rationale;
  usageDomain;

  constructor(json: any) {
    this.type = json['@type'];
    this.name = json.name;
    this.rationale = json.rationale;
    this.usageDomain = json.usageDomain;
  }
}



export class Pattern implements IPattern {
  id;
  name;
  string;
  strategy;
  inputTypes = [];
  outputType;
}


export class MyConclusion implements IConclusion {
  name;
  type;
  // TODO: implement les restrictions etc...

  constructor(json: any) {
    this.type = json['@type'];
    this.name = json.name;
  }
}


export class MySupport implements ISupport {
  type;
  id;
  // restrictions TODO: dunno what that is
  name;
  element;

  constructor(json: any) {
    this.type = json['@type'];
    this.id = json.id;
    this.name = json.name;
    this.element = json['element'];
  }
}

export class MyEvidence implements IEvidence {
  role;
  support;

  constructor(json: any) {
    this.role = json.role;
    this.support = new MySupport(json.support);
  }
}


export class OutputType implements IOutputType {
  type;
}


export class InputType implements IInputType {
  type;
  name;
}
export class PatternsBase implements IPatternsBase {
  patterns = [];
}
