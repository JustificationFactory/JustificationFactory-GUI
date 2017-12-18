export abstract class AbstractFormInput {
  fieldName: string;
  fieldType: string;
  domElement: DomElement;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
  }
}

export enum DomElement {
  INPUT,
  SELECT,
  ARRAY_PREPROCESS_DIRECTIVE
}
