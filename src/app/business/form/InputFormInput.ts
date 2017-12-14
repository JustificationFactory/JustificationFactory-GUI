import {AbstractFormInput, DomElement} from './AbstractFormInput';

export class InputFormInput extends AbstractFormInput {


  constructor(fieldName: string, fieldType: string) {
    super(fieldName, fieldType);
    this.domElement = DomElement.INPUT;
  }
}
