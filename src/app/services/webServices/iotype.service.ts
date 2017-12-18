import { Injectable } from '@angular/core';
import {
  AbstractTypeInput, DocumentConclusionTypeInput, DocumentEvidenceTypeInput, FormConclusionTypeInput,
  FormEvidenceTypeInput
} from '../../business/form/types/InputTypes';

@Injectable()
export class IOTypeService {

  constructor() { }

  getDefaultInputTypes(): AbstractTypeInput[] {
    return [
      new DocumentEvidenceTypeInput(),
      new FormEvidenceTypeInput()
    ];
  }

  getDefaultOutputTypes(): AbstractTypeInput[] {
    return [
      new DocumentConclusionTypeInput(),
      new FormConclusionTypeInput()
    ];
  }

}
