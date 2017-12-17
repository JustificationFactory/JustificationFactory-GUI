import { Injectable } from '@angular/core';
import {
  AbstractTypeInput, DocumentConclusionTypeInput, DocumentEvidenceTypeInput, FormConclusionTypeInput,
  FormEvidenceTypeInput
} from '../../business/form/types/InputTypes';

@Injectable()
export class IOTypeService {

  constructor() { }

  getDefaultInputTypes(): AbstractTypeInput[] {
    const inputTypes: AbstractTypeInput[] = [
      new DocumentEvidenceTypeInput(),
      new FormEvidenceTypeInput()
    ];
    return inputTypes;
  }

  getDefaultOutputTypes(): AbstractTypeInput[] {
    const outputTypes: AbstractTypeInput[] = [
      new DocumentConclusionTypeInput(),
      new FormConclusionTypeInput()
    ];
    return outputTypes;
  }

}
