import {AbstractFormInput, DomElement} from './AbstractFormInput';

export class InputFormInput extends AbstractFormInput {


  constructor(fieldName: string) {
    super(fieldName);
    this.domElement = DomElement.INPUT;
  }
}
