import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InputType, OutputType, Pattern, Strategy} from '../../../../business/ArgSystem';
import {WsSenderService} from '../../../../services/webServices/ws-sender.service';
import {ConnectorComponent} from '../../../connector/connector.component';
import {WsRetrieverService} from '../../../../services/webServices/ws-retriever.service';
import {IInputType, IOutputType, IPattern, IStrategy} from '../../../../business/IArgSystem';
import {AbstractTypeInput} from '../../../../business/form/types/InputTypes';
import {IOTypeService} from '../../../../services/webServices/iotype.service';
import {DomElement} from '../../../../business/form/inputs/AbstractFormInput';

@Component({
  selector: 'app-new-pattern-form',
  templateUrl: './new-pattern-form.component.html',
  styleUrls: ['./new-pattern-form.component.css']
})
export class NewPatternFormComponent implements OnInit {

  domElement = DomElement; // Must be done otherwise enum is not available inside the template

  public newStepForm: FormGroup;

  private availableEvidenceTypes: AbstractTypeInput[];
  private availableConclusionTypes: AbstractTypeInput[];

  private selectedInputTypes: AbstractTypeInput[];
  private selectedOutputType: AbstractTypeInput;

  @Input() argSystemId: string;
  @Input() connectorComponentOfParent: ConnectorComponent;

  constructor(public activeModal: NgbActiveModal, private senderService: WsSenderService, private retrieverService: WsRetrieverService, private ioTypeService: IOTypeService) { }

  ngOnInit() {

    this.availableEvidenceTypes = this.ioTypeService.getDefaultInputTypes();
    this.availableConclusionTypes = this.ioTypeService.getDefaultOutputTypes();

    this.selectedInputTypes = [null];

    this.newStepForm = new FormGroup({
      patternId: new FormControl(),
      patternName: new FormControl(),
      strategyName: new FormControl(),
      inputTypes: new FormArray([]),
      outputType: new FormGroup({
        outputType: new FormControl(),
        outputTypeName: new FormControl()
      })
    });

    const arrayControl = <FormArray>this.newStepForm.controls['inputTypes'];
    const newGroup = new FormGroup({
      inputType: new FormControl(),
      inputTypeName: new FormControl()
    });
    arrayControl.push(newGroup);
  }

  addInputType() {
    const arrayControl = <FormArray>this.newStepForm.controls['inputTypes'];
    const newGroup = new FormGroup({
      inputType: new FormControl(),
      inputTypeName: new FormControl()
    });
    arrayControl.push(newGroup);
    this.selectedInputTypes.push(null);
  }

  removeInputType(i: number) {
    const arrayControl = <FormArray>this.newStepForm.controls['inputTypes'];
    arrayControl.removeAt(i);
    this.selectedInputTypes.splice(i, 1);
  }

  submit() {
    console.log('New pattern form submitted');
    console.log('argSystemId: ' + this.argSystemId);
    console.log('patternId: ' + this.newStepForm.value.patternId);
    console.log('patternName: ' + this.newStepForm.value.patternName);
    console.log('strategyName: ' + this.newStepForm.value.strategyName);
    console.log('InputTypes: ');
    const arrayControl = <FormArray>this.newStepForm.controls['inputTypes'];
    for(let i = 0; i < arrayControl.controls.length; i++) {
      const control = arrayControl.controls[i]['controls'];
      console.log('inputType n°' + i + ' ' + control.inputType.value + ' ' + control.inputTypeName.value);
    }

    console.log('outputType: ' + this.newStepForm.value.outputType + ' name: ' + this.newStepForm.value.outputTypeName);

    const strategy: IStrategy = new Strategy('fr.axonic.avek.instance.jenkins.JenkinsStrategy',
      this.newStepForm.value.strategyName, null, null);

    const inputTypes: IInputType[] = [];
    for(let i = 0; i < arrayControl.controls.length; i++) {
      const control = arrayControl.controls[i]['controls'];
      inputTypes.push(new InputType((<AbstractTypeInput>control.inputType.value).classifiedName, control.inputTypeName.value));
    }

    const selectedOutputType = <AbstractTypeInput>(<FormGroup>this.newStepForm.controls['outputType']).controls['outputType'].value;
    const outputType: IOutputType = new OutputType(selectedOutputType.classifiedName);
    const pattern: IPattern = new Pattern(this.newStepForm.value.patternId,
      this.newStepForm.value.patternName, strategy, inputTypes, outputType);

    console.log('new Pattern :');
    console.log(JSON.stringify(pattern));

    this.senderService.registerPattern(this.argSystemId, pattern).subscribe(result => {
      this.connectorComponentOfParent.retrievePatternsByArgSystemId(this.argSystemId);
    });
  }
}
