import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {InputType, OutputType, Pattern, Strategy} from '../../../business/ArgSystem';

@Component({
  selector: 'app-workspace-toolbar',
  templateUrl: './workspace-toolbar.component.html',
  styleUrls: ['./workspace-toolbar.component.css']
})
export class WorkspaceToolbarComponent implements OnInit {

  @Output() onNewDiagram = new EventEmitter<void>();
  @Output() onUploadAs = new EventEmitter<void>();
  @Output() onNewPattern = new EventEmitter<IPattern>();

  @Input() diagramLoaded: boolean;

  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }

  newDiagram() {
    this.onNewDiagram.emit();
  }

  openModal(modal) {
    this.modalService.open(modal, {size: 'lg'});
  }

  onUploadAsFormSubmit(form: NgForm) {
    this.onUploadAs.emit();
  }

  onNewPatternFormSubmit(form: NgForm) {
    console.log('New pattern form submitted');
    console.log('patternId: ' + form.value.patternId);
    console.log('patternName: ' + form.value.patternName);
    console.log('strategyName: ' + form.value.strategyName);
    console.log('InputType: ' + form.value.inputType + ' name: ' + form.value.inputTypeName);
    console.log('outputType: ' + form.value.outputType + ' name: ' + form.value.outputTypeName);
    const strategy: IStrategy = new Strategy('fr.axonic.avek.instance.jenkins.JenkinsStrategy', form.value.strategyName, null, null);

    const inputTypes: IInputType[] = [];
    inputTypes.push(new InputType(form.value.inputType, form.value.inputTypeName));

    const outputType: IOutputType = new OutputType(form.value.outputType);
    const pattern: IPattern = new Pattern(form.value.patternId, form.value.patternName, strategy, inputTypes, outputType);

    this.onNewPattern.emit(pattern);
  }


}
