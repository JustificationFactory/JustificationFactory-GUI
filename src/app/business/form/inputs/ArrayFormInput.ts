import {AbstractFormInput, DomElement} from './AbstractFormInput';

export class ArrayFormInput extends AbstractFormInput {
  constructor(fieldName: string) {
    super(fieldName);
    this.domElement = DomElement.ARRAY_PREPROCESS_DIRECTIVE;
  }
}
