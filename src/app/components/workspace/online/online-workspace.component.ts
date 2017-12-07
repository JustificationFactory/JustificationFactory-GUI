import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DiagramComponent} from '../../diagram/diagram.component';
import {ConnectorComponent} from '../../connector/connector.component';
import {DiagramParser} from '../../../business/myDiagram/myImportDiagram';
import {MyArgSystem} from '../../../business/ArgSystem';

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

  onArgSystemChange(argSystem: MyArgSystem) {
    this.diagramLoaded = true;
    // Allows the DOM to render the Child component in time
    setTimeout(() => {

      console.log('Let the magic happen!');
      const diagramParser = new DiagramParser(argSystem);
      diagramParser.process();
      console.log(diagramParser);
      this.diagramComponent.myShowDiagram(diagramParser.steps);
      /*
      const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(argSystem);
      const deResult: ParseDiagramElementsResult = parse.getDiagramElements();
      this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
      this.diagramComponent.argSystem = argSystem;
      */
    }, 50);
  }

  onNewDiagram() {
    // Check if a diagram is currently loaded and ask for confirmation before creating a new one
    if (this.diagramLoaded) {
      // TODO Modal
    }
    this.diagramLoaded = true;
    this.httpClient.get<any>('assets/json/newDiagram.json').subscribe(result => {
      console.log('Let the magic happen!');
      const argSystem = new MyArgSystem(result);
      const diagramParser = new DiagramParser(argSystem);
      diagramParser.process();
      console.log(diagramParser);
      this.diagramComponent.myShowDiagram(diagramParser.steps);
     // const argSystem: IArgSystem = result;
        setTimeout(() => {

          /*TODO: uncomment
          const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(argSystem);
          const deResult: ParseDiagramElementsResult = parse.getDiagramElements();
          this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
          this.diagramComponent.argSystem = argSystem;
          */
        }, 50);
    });
  }

  uploadArgSystem() {
    console.log('Uploading arg system...');
    this.connectorComponent.registerArgSystem(this.diagramComponent.argSystem);
  }

}
