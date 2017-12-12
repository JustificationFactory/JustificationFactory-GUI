import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagramComponent} from '../../diagram/diagram.component';
import {ConnectorComponent} from '../../connector/connector.component';
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from '../../../business/diagram/importDiagram';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-online-workspace',
  templateUrl: './online-workspace.component.html',
  styleUrls: ['./online-workspace.component.css']
})
export class OnlineWorkspaceComponent implements OnInit {

  public diagramLoaded = false;

  @ViewChild(DiagramComponent) private diagramComponent: DiagramComponent;
  @ViewChild(ConnectorComponent) private connectorComponent: ConnectorComponent;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit() {
  }

  onArgSystemChange(argSystem: IArgSystem) {
    this.diagramLoaded = true;
    // Allows the DOM to render the Child component in time
    /*
    console.log('Let the magic happen!');
      const diagramParser = new DiagramParser(argSystem);
      diagramParser.process();
      console.log(diagramParser);
      this.diagramComponent.myShowDiagram(diagramParser.steps);

     */
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
    /* this.httpClient.get<any>('assets/json/newDiagram.json').subscribe(result => {
      console.log('Let the magic happen!');
      const argSystem = new MyArgSystem(result);
      const diagramParser = new DiagramParser(argSystem);
      diagramParser.process();
      console.log(diagramParser);
      this.diagramComponent.myShowDiagram(diagramParser.steps); */
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
    this.connectorComponent.registerArgSystem(this.diagramComponent.argSystem).subscribe((result)=>{
      this.diagramUploaded=true;
      this.argSystemId = result;
      console.log('Diagram uploaded with id: ' + result);
    });
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

    console.log('new Pattern :');
    console.log(pattern);
    this.connectorComponent.registerPattern(this.argSystemId, pattern);
  }

  openModal(modal) {
    this.modalService.open(modal, {size: 'lg'});
  }

  updateNewStepForm() {
    let currentPattern:IPattern = this.connectorComponent.currentPattern;
  }

  onNewStepFormSubmit(form: NgForm) {
    console.log('New step form submitted');
    console.log('supportName: ' + form.value.supportName);
    console.log('conclusionName: ' + form.value.conclusionName);

    let documentEvidence: DocumentEvidence = new DocumentEvidence(form.value.supportName);

    let supportObject: SupportObject = new SupportObject(form.value.supportName, documentEvidence);

    let supports: SupportObject[] = [];
    supports.push(supportObject);

    let formConclusion: FormConclusion = new FormConclusion(form.value.conclusionName);

    let stepToCreate: StepToCreate = new StepToCreate(supports, formConclusion);
    console.log('new StepToCreate : ');
    console.log(stepToCreate);
    this.connectorComponent.constructStep(this.connectorComponent.currentArgSystemId, this.connectorComponent.currentPatternId, stepToCreate);
  }

}
