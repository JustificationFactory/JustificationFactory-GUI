import {IArgSystem, IConclusion, IEvidence, IInputType, IOutputType, IPattern, IStep, IStrategy, ISupport} from './IArgSystem';


export class MyArgSystem implements IArgSystem {
  // TODO: uniformiser ce que je reprends de l'interface partout etc (genre typage et tout)
  steps = [];
  // patternsBase;
  // objective;
  // baseEvidences;

  // TODO: serialize and deserialize via implementing an interface? maybe cf stack overflow
  constructor(json: any) {
    for (const step of json.steps) {
      this.steps.push(new Step(step));
    }

    // TODO: la suite les objectifs et tout j'sais meme pas c'est quoi
  }
}

export class Step implements IStep {
  id;
  patternId;
  evidences = [];
  strategy;
  conclusion;

  constructor(json: any) {
    this.id = json.id;
    this.patternId = json.patternId;

    for (const evidence of json.evidenceRoles) {
      this.evidences.push(new Evidence(evidence));
    }

    this.strategy = new Strategy(json.strategy);

    this.conclusion = new Conclusion(json.conclusion);
  }

}

export class Strategy implements IStrategy {
  '@type': string;
  name: string;
  // TODO: artifacts instead of rationale??
  rationale: Object;
  usageDomain: Object;

  constructor(type: string, name: string, rationale: Object, usageDomain: Object) {
    this['@type'] = type;
    this.name = name;
    this.rationale = rationale;
    this.usageDomain = usageDomain;
  }
}

export class Conclusion implements IConclusion {
  name;
  type;

  // TODO: implement les restrictions etc...

  constructor(json: any) {
    this.type = json['@type'];
    this.name = json.name;
  }
}


export class Support implements ISupport {
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

export class Evidence implements IEvidence {
  role;
  support;

  constructor(json: any) {
    this.role = json.role;
    this.support = new Support(json.support);
  }
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
  conclusion: FormConclusion;


  constructor(supports: SupportObject[], conclusion: FormConclusion) {
    this.supports = supports;
    this.conclusion = conclusion;
  }
}

export class SupportObject {
  role: string;
  support: DocumentEvidence;


  constructor(role: string, support: DocumentEvidence) {
    this.role = role;
    this.support = support;
  }
}

export class DocumentEvidence {
  name: string;
  element: Object;
  '@type' = 'fr.axonic.avek.engine.support.evidence.DocumentEvidence';


  constructor(name: string) {
    this.name = name;
    this.element = null;
  }
}

export class FormConclusion {
  '@type' = 'fr.axonic.avek.engine.support.conclusion.FormConclusion';
  name: string;
  element: Object;


  constructor(name: string) {
    this.name = name;
    this.element = {
      '@type': '.Form'
    };
  }
}
