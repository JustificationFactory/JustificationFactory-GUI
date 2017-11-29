import {Component, OnInit, ViewChild} from '@angular/core';
import {DiagramComponent} from "../../diagram/diagram.component";
import {ConnectorComponent} from "../../connector/connector.component";
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from "../../../business/diagram/importDiagram";

@Component({
  selector: 'app-online-workspace',
  templateUrl: './online-workspace.component.html',
  styleUrls: ['./online-workspace.component.css']
})
export class OnlineWorkspaceComponent implements OnInit {

  public diagramLoaded = false;

  @ViewChild(DiagramComponent) private diagramComponent: DiagramComponent;
  @ViewChild(ConnectorComponent) private connectorComponent: ConnectorComponent;

  constructor() { }

  ngOnInit() {
  }

  onArgSystemChange(argSystem: IArgSystem) {
    this.diagramLoaded=true;
    let parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(argSystem);
    let deResult: ParseDiagramElementsResult = parse.getDiagramElements();
    this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
  }

}
