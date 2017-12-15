import {Component, ContentChild, ContentChildren, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagramComponent} from '../../diagram/diagram.component';
import {ConnectorComponent} from '../../connector/connector.component';
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from '../../../business/diagram/importDiagram';
import 'rxjs/add/operator/map';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, NgForm} from '@angular/forms';
import {
  DocumentEvidence, FormConclusion, InputType, OutputType, Pattern, StepToCreate, Strategy,
  SupportObject
} from '../../../business/ArgSystem';
import {NewPatternFormComponent} from '../forms/new-pattern-form/new-pattern-form.component';
import {NewStepFormComponent} from '../forms/new-step-form/new-step-form.component';
import {IArgSystem, IPattern} from '../../../business/IArgSystem';

@Component({
  selector: 'app-online-workspace',
  templateUrl: './online-workspace.component.html',
  styleUrls: ['./online-workspace.component.css']
})
export class OnlineWorkspaceComponent implements OnInit {

  // Is a diagram currently loaded ?
  public diagramLoaded = false;

  // Is the currently loaded diagram saved on the remote factory
  public diagramUploaded = false;

  public argSystemId: string;

  @ViewChild(DiagramComponent) private diagramComponent: DiagramComponent;
  @ViewChild(ConnectorComponent) private connectorComponent: ConnectorComponent;

  constructor(private httpClient: HttpClient, private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  onArgSystemChange(argSystem: IArgSystem) {
    this.diagramLoaded = true;
    // Allows the DOM to render the Child component in time
    setTimeout(() => {
      const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(argSystem);
      const deResult: ParseDiagramElementsResult = parse.getDiagramElements();
      this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
      this.diagramComponent.argSystem = argSystem;
    }, 50);
  }

  onNewDiagram() {
    // Check if a diagram is currently loaded and ask for confirmation before creating a new one
    if (this.diagramLoaded) {
      // TODO Modal
    }
    this.diagramLoaded = true;
    this.diagramUploaded = false;
    this.connectorComponent.resetArgSystem();
    this.httpClient.get<IArgSystem>('assets/json/newDiagram.json').subscribe(result => {
      const argSystem: IArgSystem = result;
        setTimeout(() => {
          const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(argSystem);
          const deResult: ParseDiagramElementsResult = parse.getDiagramElements();
          this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
          this.diagramComponent.argSystem = argSystem;
        }, 50);
    });
  }

  uploadArgSystem() {
    console.log('Uploading arg system');
    this.connectorComponent.registerArgSystem(this.diagramComponent.argSystem).subscribe((result) => {
      this.diagramUploaded = true;
      this.argSystemId = result;
      console.log('Diagram uploaded with id: ' + result);
      this.connectorComponent.retrieveAllArgumentationSystemsName().subscribe(empty => {
        this.connectorComponent.currentArgSystemId = result;
        this.connectorComponent.changeCurrentArgSystem(result);
      });
    });
  }

  openModal(modal) {
    this.modalService.open(modal, {size: 'lg'});
  }

  openPatternModal() {
    const newPatternModal = this.modalService.open(NewPatternFormComponent, {size: 'lg'});
    newPatternModal.componentInstance.argSystemId = this.connectorComponent.currentArgSystemId;
    newPatternModal.componentInstance.connectorComponentOfParent = this.connectorComponent;
  }

  openNewStepModal() {
    const newStepModal = this.modalService.open(NewStepFormComponent, {size: 'lg'});
    newStepModal.componentInstance.argSystemId = this.connectorComponent.currentArgSystemId;
    newStepModal.componentInstance.connectorComponentOfParent = this.connectorComponent;
  }

  updateNewStepForm() {
    const currentPattern: IPattern = this.connectorComponent.currentPattern;
  }

}
