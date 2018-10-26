import { INT_TYPE } from "@angular/compiler/src/output/output_ast";

export interface IArgSystem {
  steps: IStep[];
  patternsBase: IPatternsBase;
  objective: Object;
  baseEvidences: Object[];
}

export interface IStep {
  id: string;
  patternId: string;
  supports: Object[];
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
  supports: ISupportType[];
  conclusion: ISupportType;
}

export interface IType {
  classType: string;
  nameType: string;
}

export interface ISupportType{
  name: string;
  type:IType;
}
