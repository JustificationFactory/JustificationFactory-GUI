import {ViewStep} from './myDiagram';
import {ArgSystem} from '../ArgSystem';

export class DiagramParser {
  global: ArgSystem;
  private _steps: ViewStep[];

  constructor(global: ArgSystem) {
    this.global = global;
    this._steps = [];
  }

  process() {
    for (const step of this.global.steps) {
      this._steps.push(new ViewStep(step));
    }
  }

  get steps(): ViewStep[] {
    return this._steps;
  }
}
