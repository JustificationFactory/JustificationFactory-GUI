import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {DocumentEvidence, FormConclusion, StepToCreate, SupportObject} from '../../../../business/ArgSystem';
import {WsSenderService} from '../../../../services/webServices/ws-sender.service';
import {WsRetrieverService} from '../../../../services/webServices/ws-retriever.service';
import {ConnectorComponent} from '../../../connector/connector.component';

@Component({
  selector: 'app-new-step-form',
  templateUrl: './new-step-form.component.html',
  styleUrls: ['./new-step-form.component.css']
})
export class NewStepFormComponent implements OnInit {

  public newStepForm: FormGroup;

  private availablePatternsId: string[];

  @Input() argSystemId: string;
  @Input() connectorComponentOfParent: ConnectorComponent;

  constructor(public activeModal: NgbActiveModal, private senderService: WsSenderService, private retrieverService: WsRetrieverService) { }

  ngOnInit() {
    this.retrieverService.getPatternsByArgSystemId(this.argSystemId).subscribe(result => {
      this.availablePatternsId = result;
    });

    this.newStepForm = new FormGroup({
      patternId: new FormControl(),
      supportName: new FormControl(),
      conclusionName: new FormControl()
    });
  }

  submit() {
    console.log('New step form submitted');
    console.log('patternId: ' + this.newStepForm.value.patternId);
    console.log('supportName: ' + this.newStepForm.value.supportName);
    console.log('conclusionName: ' + this.newStepForm.value.conclusionName);

    const documentEvidence: DocumentEvidence = new DocumentEvidence(this.newStepForm.value.supportName);

    const supportObject: SupportObject = new SupportObject(this.newStepForm.value.supportName, documentEvidence);

    const supports: SupportObject[] = [];
    supports.push(supportObject);

    const formConclusion: FormConclusion = new FormConclusion(this.newStepForm.value.conclusionName);

    const stepToCreate: StepToCreate = new StepToCreate(supports, formConclusion);
    console.log('new StepToCreate : ');
    console.log(stepToCreate);
    this.senderService.constructStep(this.argSystemId, this.newStepForm.value.patternId, stepToCreate).subscribe(result => {
      this.connectorComponentOfParent.refreshDiagram();
    });
  }

}
