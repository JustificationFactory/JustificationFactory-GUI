import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {InputType, OutputType, Pattern, Strategy} from '../../../../business/ArgSystem';
import {WsSenderService} from '../../../../services/webServices/ws-sender.service';
import {ConnectorComponent} from '../../../connector/connector.component';

@Component({
  selector: 'app-new-pattern-form',
  templateUrl: './new-pattern-form.component.html',
  styleUrls: ['./new-pattern-form.component.css']
})
export class NewPatternFormComponent implements OnInit {

  public newStepForm: FormGroup;

  @Input() argSystemId: string;
  @Input() connectorComponentOfParent: ConnectorComponent;

  constructor(public activeModal: NgbActiveModal, private senderService: WsSenderService) { }

  ngOnInit() {
    this.newStepForm = new FormGroup({
      patternId: new FormControl(),
      patternName: new FormControl(),
      strategyName: new FormControl(),
      inputType: new FormControl(),
      inputTypeName: new FormControl(),
      outputType: new FormControl(),
      outputTypeName: new FormControl()
    });
  }


  submit() {
    console.log('New pattern form submitted');
    console.log('argSystemId: ' + this.argSystemId);
    console.log('patternId: ' + this.newStepForm.value.patternId);
    console.log('patternName: ' + this.newStepForm.value.patternName);
    console.log('strategyName: ' + this.newStepForm.value.strategyName);
    console.log('InputType: ' + this.newStepForm.value.inputType + ' name: ' + this.newStepForm.value.inputTypeName);
    console.log('outputType: ' + this.newStepForm.value.outputType + ' name: ' + this.newStepForm.value.outputTypeName);

    const strategy: IStrategy = new Strategy('fr.axonic.avek.instance.jenkins.JenkinsStrategy',
      this.newStepForm.value.strategyName, null, null);

    const inputTypes: IInputType[] = [];
    inputTypes.push(new InputType(this.newStepForm.value.inputType, this.newStepForm.value.inputTypeName));

    const outputType: IOutputType = new OutputType(this.newStepForm.value.outputType);
    const pattern: IPattern = new Pattern(this.newStepForm.value.patternId,
      this.newStepForm.value.patternName, strategy, inputTypes, outputType);

    console.log('new Pattern :');
    console.log(JSON.stringify(pattern));

    this.senderService.registerPattern(this.argSystemId, pattern).subscribe(result => {
      this.connectorComponentOfParent.retrievePatternsByArgSystemId(this.argSystemId);
    });
  }
}
