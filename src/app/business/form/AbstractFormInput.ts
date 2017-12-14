export abstract class AbstractFormInput {
  fieldName: string;
  fieldType: string;
  domElement: DomElement;

  constructor(fieldName: string, fieldType: string) {
    this.fieldName = fieldName;
    this.fieldType = fieldType;
  }
}

export enum DomElement {
  INPUT,
  SELECT
}
