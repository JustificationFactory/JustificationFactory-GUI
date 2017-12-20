import {AbstractFormInput, DomElement} from '../inputs/AbstractFormInput';
import {InputFormInput} from '../inputs/InputFormInput';
import {ArrayFormInput} from '../inputs/ArrayFormInput';

export abstract class AbstractTypeInput {

  private _shortName: string;
  private _classifiedName: string;

  private _formFields: AbstractFormInput[];

  constructor(shortName: string, classifiedName: string) {
    this._shortName = shortName;
    this._classifiedName = classifiedName;
    this._formFields = [];
  }

  addFormField(abstractFormInput: AbstractFormInput) {
    this._formFields.push(abstractFormInput);
  }

  get shortName(): string {
    return this._shortName;
  }

  get classifiedName(): string {
    return this._classifiedName;
  }

  get formFields(): AbstractFormInput[] {
    return this._formFields;
  }
}

export class DocumentEvidenceTypeInput extends AbstractTypeInput {
  constructor() {
    super('DocumentEvidence', 'fr.axonic.avek.engine.support.instance.DocumentEvidence');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new InputFormInput('element.url'));
    this.addFormField(new InputFormInput('element.version'));
  }
}

export class FormEvidenceTypeInput extends AbstractTypeInput {
  constructor() {
    super('FormEvidence', 'fr.axonic.avek.engine.support.instance.FormEvidence');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new ArrayFormInput('element.form'));
    this.addFormField(new InputFormInput('element.version'));
  }
}

export class DocumentConclusionTypeInput extends AbstractTypeInput {
  constructor() {
    super('DocumentConclusion', 'fr.axonic.avek.engine.support.instance.DocumentConclusion');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new InputFormInput('element.url'));
    this.addFormField(new InputFormInput('element.version'));
  }
}

export class FormConclusionTypeInput extends AbstractTypeInput {
  constructor() {
    super('FormConclusion', 'fr.axonic.avek.engine.support.instance.FormConclusion');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new ArrayFormInput('element.form'));
    this.addFormField(new InputFormInput('element.version'));
  }
}

export class UnitTestJenkinsConclusion extends AbstractTypeInput {
  constructor() {
    super('UnitTestJenkinsConclusion', 'fr.axonic.avek.instance.jenkins.conclusion.UnitTestJenkinsConclusion');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new InputFormInput('element.version'));
    this.addFormField(new InputFormInput('element.status'));
  }
}

export class IntegrationTestJenkinsConclusion extends AbstractTypeInput {
  constructor() {
    super('IntegrationTestJenkinsConclusion', 'fr.axonic.avek.instance.jenkins.conclusion.IntegrationTestJenkinsConclusion');
    this.addFormField(new InputFormInput('id'));
    this.addFormField(new InputFormInput('name'));
    this.addFormField(new InputFormInput('element.@type'));
    this.addFormField(new InputFormInput('element.version'));
    this.addFormField(new InputFormInput('element.status'));
  }
}
