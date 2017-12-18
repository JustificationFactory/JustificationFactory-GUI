import {
  AbstractTypeInput, DocumentConclusionTypeInput, DocumentEvidenceTypeInput, FormConclusionTypeInput,
  FormEvidenceTypeInput, UnitTestJenkinsConclusion
} from './InputTypes';

export class TypeMapping {
  private typeMap: Map<string, AbstractTypeInput> = new Map();

  constructor() {
    this.typeMap.set('fr.axonic.avek.engine.support.instance.DocumentEvidence', new DocumentEvidenceTypeInput());
    this.typeMap.set('fr.axonic.avek.engine.support.instance.FormEvidence', new FormEvidenceTypeInput());
    this.typeMap.set('fr.axonic.avek.engine.support.instance.DocumentConclusion', new DocumentConclusionTypeInput());
    this.typeMap.set('fr.axonic.avek.engine.support.instance.FormConclusion', new FormConclusionTypeInput());
    this.typeMap.set('fr.axonic.avek.instance.jenkins.conclusion.UnitTestJenkinsConclusion', new UnitTestJenkinsConclusion());
  }

  getAbstractTypeInputFromClassName(classifiedName: string): AbstractTypeInput {
    return this.typeMap.get(classifiedName);
  }
}
