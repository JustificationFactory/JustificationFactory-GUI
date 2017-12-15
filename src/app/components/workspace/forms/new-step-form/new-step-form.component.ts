import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AbstractControl, FormArray, FormControl, FormGroup, NgForm} from '@angular/forms';
import {DocumentEvidence, FormConclusion, StepToCreate, SupportObject} from '../../../../business/ArgSystem';
import {WsSenderService} from '../../../../services/webServices/ws-sender.service';
import {WsRetrieverService} from '../../../../services/webServices/ws-retriever.service';
import {ConnectorComponent} from '../../../connector/connector.component';
import {InputFormInput} from '../../../../business/form/InputFormInput';
import {AbstractFormInput, DomElement} from '../../../../business/form/AbstractFormInput';
import {IPattern} from '../../../../business/IArgSystem';

@Component({
  selector: 'app-new-step-form',
  templateUrl: './new-step-form.component.html',
  styleUrls: ['./new-step-form.component.css']
})
export class NewStepFormComponent implements OnInit {

  domElement = DomElement; // Must be done otherwise enum is not available inside the tempalte

  public newStepForm: FormGroup;

  private availablePatternsId: string[];
  private pattern: IPattern;

  private dynamicOuputFields: AbstractFormInput[] = [];
  private dynamicInputFields: AbstractFormInput[][] = [];

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
        this.pattern = result;
        console.log('Pattern selectioned:');
        console.log(this.pattern);
        const arrayControl = <FormArray>this.newStepForm.controls['inputTypes'];
        for(let inputTypeIndex = 0; inputTypeIndex < this.pattern.inputTypes.length; inputTypeIndex++) {
          const inputType = this.pattern.inputTypes[inputTypeIndex];
          this.retrieverService.getTypeContent(inputType.type).subscribe(jsonchema => {
            const inputTypes: FormGroup = new FormGroup({});
            inputTypes.addControl('@type', new FormControl(inputType.type));
            const inputFormInputs: AbstractFormInput[] = this.getControlsFromJsonSchema(jsonchema);
            this.dynamicInputFields[inputTypeIndex] = [];
            for(const formInput of inputFormInputs) {
              inputTypes.addControl(formInput.fieldName, new FormControl());
              this.dynamicInputFields[inputTypeIndex].push(formInput);
            }
            arrayControl.push(inputTypes);
          });
        }
        this.retrieverService.getTypeContent(this.pattern.outputType.type).subscribe(jsonschema => {
          const outputType: FormGroup = <FormGroup>this.newStepForm.controls['outputType'];
          outputType.addControl('@type', new FormControl(this.pattern.outputType.type));
          const outputFormInputs: AbstractFormInput[] = this.getControlsFromJsonSchema(jsonschema);
          for(const formInput of outputFormInputs) {
            console.log('Added control: outputType -> ' + formInput.fieldName);
            outputType.addControl(formInput.fieldName, new FormControl());
            this.dynamicOuputFields.push(formInput);
          }
        });
      });
    });
  }

  submit() {
    console.log('New step form submitted');
    console.log('patternId: ' + this.newStepForm.value.patternId);
    console.log(this.newStepForm.value);
    console.log('outputType');
    for(const key in this.newStepForm.value.outputType) {
      const value = this.newStepForm.value.outputType[key];
      console.log('key: ' + key + ' value: ' + value);
    }
    for(let i = 0; i < this.newStepForm.value.inputTypes.length; i++) {
      console.log('inputType n°' + i);
      for(const key in this.newStepForm.value.inputTypes[i]) {
        const value = this.newStepForm.value.inputTypes[i][key];
        console.log('key: ' + key + ' value: ' + value);
      }
    }

    const supports: SupportObject[] = [];
    for(let i = 0; i < this.newStepForm.value.inputTypes.length; i++) {
      const support: Object = {};
      for(const key in this.newStepForm.value.inputTypes[i]) {
        const value = this.newStepForm.value.inputTypes[i][key];
        support[key] = value;
      }
      supports.push(new SupportObject(i.toString(), support));
    }

    const conclusion: Object = {};
    for(const key in this.newStepForm.value.outputType) {
      const value = this.newStepForm.value.outputType[key];
      conclusion[key] = value;
    }

    const stepToCreate: StepToCreate = new StepToCreate(supports, conclusion);
    console.log('new StepToCreate : ');
    console.log(JSON.stringify(stepToCreate));
    this.senderService.constructStep(this.argSystemId, this.newStepForm.value.patternId, stepToCreate).subscribe(result => {
      this.connectorComponentOfParent.refreshDiagram();
    });
  }

  getControlsFromJsonSchema(jsonSchema: any): AbstractFormInput[] {
    const formInputs: AbstractFormInput[] = [];
    for(const key in jsonSchema['properties']) {
      console.log('key:' + key);
      const field = jsonSchema['properties'][key];
      if(field.hasOwnProperty('type') && field['type'] === 'string') {
        formInputs.push(new InputFormInput(key, field['type']));
      }
    }
    return formInputs;
  }
}
