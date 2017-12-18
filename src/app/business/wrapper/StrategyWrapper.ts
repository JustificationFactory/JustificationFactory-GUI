export class StrategyWrapper {
  private _classifiedName: string;
  private _shortName: string;

  constructor(classifiedName: string) {
    this._classifiedName = classifiedName;
    const nameArray = classifiedName.split('.');
    this._shortName = nameArray.length > 0 ? nameArray[nameArray.length - 1] : this._classifiedName;
  }


  get classifiedName(): string {
    return this._classifiedName;
  }

  get shortName(): string {
    return this._shortName;
  }
}
