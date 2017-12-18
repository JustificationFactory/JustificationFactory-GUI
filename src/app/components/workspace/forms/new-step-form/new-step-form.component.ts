import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormArray, FormControl, FormGroup, NgForm} from '@angular/forms';
import {DocumentEvidence, FormConclusion, StepToCreate, SupportObject} from '../../../../business/ArgSystem';
import {WsSenderService} from '../../../../services/webServices/ws-sender.service';
import {WsRetrieverService} from '../../../../services/webServices/ws-retriever.service';
import {ConnectorComponent} from '../../../connector/connector.component';
import {InputFormInput} from '../../../../business/form/inputs/InputFormInput';
import {AbstractFormInput, DomElement} from '../../../../business/form/inputs/AbstractFormInput';
import {IPattern} from '../../../../business/IArgSystem';
import {TypeMapping} from '../../../../business/form/types/TypeMapping';
import {AbstractTypeInput} from '../../../../business/form/types/InputTypes';

@Component({
  selector: 'app-new-step-form',
  templateUrl: './new-step-form.component.html',
  styleUrls: ['./new-step-form.component.css']
})
export class NewStepFormComponent implements OnInit {

  domElement = DomElement; // Must be done otherwise enum is not available inside the template

  public newStepForm: FormGroup;

  private availablePatternsId: string[];
  private pattern: IPattern;

  private dynamicOuputFields: AbstractFormInput[] = [];
  private dynamicInputFields: AbstractFormInput[][] = [];

  private typeMapping: TypeMapping = new TypeMapping();

  @Input() argSystemId: string;
  @Input() connectorComponentOfParent: ConnectorComponent;

  constructor(public activeModal: NgbActiveModal, private senderService: WsSenderService, private retrieverService: WsRetrieverService) { }

  ngOnInit() {
    this.retrieverService.getPatternsByArgSystemId(this.argSystemId).subscribe(result => {
      this.availablePatternsId = result;
    });

    this.newStepForm = new FormGroup({
      patternId: new FormControl(),
      inputTypes: new FormArray([]),
      outputType: new FormGroup({})
    });

    this.newStepForm.controls['patternId'].valueChanges.subscribe(value => {
      this.retrieverService.getPatternByPatternId(this.argSystemId, value).subscribe(result => {
        this.pattern = null;
        const pattern: IPattern = <IPattern>result;

        // Inputs
        this.newStepForm.controls['inputTypes'] = new FormArray([]);
        this.dynamicInputFields = [];
        for(let inputTypeIndex = 0; inputTypeIndex<pattern.inputTypes.length; inputTypeIndex++) {
          const inputTypeFormGroup: FormGroup = new FormGroup({});
          inputTypeFormGroup.addControl('@type', new FormControl(pattern.inputTypes[inputTypeIndex].type));
          const abstractInputs: AbstractTypeInput = this.typeMapping.getAbstractTypeInputFromClassName(pattern.inputTypes[inputTypeIndex].type);
          if(!abstractInputs) {
            throw new Error('No class mapping exist for type: ' + pattern.inputTypes[inputTypeIndex].type);
          }
          for(const formField of abstractInputs.formFields) {
            inputTypeFormGroup.addControl(formField.fieldName, new FormControl());
          }
          (<FormArray>this.newStepForm.controls['inputTypes']).push(inputTypeFormGroup);
          this.dynamicInputFields[inputTypeIndex] = abstractInputs.formFields;
        }

        // Output
        this.newStepForm.controls['outputType'] = new FormGroup({});
        this.dynamicOuputFields = [];
        const outputType: FormGroup = <FormGroup>this.newStepForm.controls['outputType'];
        outputType.addControl('@type', new FormControl(pattern.outputType.type));
        const abstractOutput: AbstractTypeInput = this.typeMapping.getAbstractTypeInputFromClassName(pattern.outputType.type);
        if(!abstractOutput) {
          throw new Error('No class mapping exist for type: ' + pattern.outputType.type);
        }
        for(const formField of abstractOutput.formFields) {
          outputType.addControl(formField.fieldName, new FormControl());
        }
        this.dynamicOuputFields = abstractOutput.formFields;

        this.pattern = pattern;
      });
    });
  }

  submit() {
    console.log('New step form submitted');
    console.log('patternId: ' + this.newStepForm.value.patternId);
    console.log(this.newStepForm);
    console.log('outputType');
    for(const key in this.newStepForm.controls['outputType'].value) {
      const value = this.newStepForm.controls['outputType'].value[key];
      console.log('key: ' + key + ' value: ' + value);
    }
    const inputTypesArray = <FormArray>this.newStepForm.controls['inputTypes'];
    for(let i = 0; i < inputTypesArray.length; i++) {
      console.log('inputType n°' + i);
      for(const key in inputTypesArray.controls[i].value) {
        const value = inputTypesArray.controls[i].value[key];
        console.log('key: ' + key + ' value: ' + value);
      }
    }

    const supports: SupportObject[] = [];
    for(let i = 0; i < inputTypesArray.length; i++) {
      let support: Object = {};
      for(const key in inputTypesArray.controls[i].value) {
        const value = inputTypesArray.controls[i].value[key];
        support[key] = value;
      }
      support = this.unflatten(support);
      supports.push(new SupportObject(i.toString(), support));
    }

    let conclusion: Object = {};
    for(const key in this.newStepForm.controls['outputType'].value) {
      const value = this.newStepForm.controls['outputType'].value[key];
      conclusion[key] = value;
    }
    conclusion = this.unflatten(conclusion);

    const stepToCreate: StepToCreate = new StepToCreate(supports, conclusion);
    console.log('new StepToCreate : ');
    console.log(JSON.stringify(stepToCreate));
    this.senderService.constructStep(this.argSystemId, this.newStepForm.value.patternId, stepToCreate).subscribe(result => {
      this.connectorComponentOfParent.refreshDiagram();
    });
  }

  unflatten(data: any): Object {
    const result = {}
    for (var i in data) {
      const keys = i.split('.')
      keys.reduce(function(r, e, j) {
        return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 === j ? data[i] : {}) : []);
      }, result);
    }
    return result;
  }
}
