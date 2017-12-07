import {ViewStep} from './myDiagram';
import {MyArgSystem} from '../ArgSystem';

export class DiagramParser {
  global: MyArgSystem;
  private _steps: ViewStep[];

  constructor(global: MyArgSystem) {
    this.global = global;
    // TODO: link view et elements elements à base d'id
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
