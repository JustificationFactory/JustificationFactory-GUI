import {Component, OnInit} from '@angular/core';
import {WsConnectorService} from '../../services/webServices/ws-connector.service';
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from '../../business/diagram/importDiagram';
import {DiagramComponent} from "../diagram/diagram.component";

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  public argSystemIdList: string[];
  public currentArgSystem: ArgSystem;

  constructor(private connectorService: WsConnectorService, public diagramComponent: DiagramComponent) {
    this.currentArgSystem = null;
  }

  ngOnInit() {
    this.connectorService.get<string[]>('systems').subscribe(data => this.argSystemIdList = data);
    console.log(this.currentArgSystem);
  }

  retrieveArgumentationSystem(id: string): void {
    console.log('id: ' + id);
    this.connectorService.get<IArgSystem>(id).subscribe(result => this.currentArgSystem = result);
  }

  changeCurrentArgSystem(id: string): void {
    this.retrieveArgumentationSystem(id);
  }

  // TODO: move that code to a service away
  construct() {
    console.log('CONSTRUCTION MAYDAY');
    const temp: ParseJson2DiagramElements = new ParseJson2DiagramElements(this.currentArgSystem);
    console.log('Constructed...');
    temp.getDiagramElements();
    console.log('Suspens...');
    console.log('Steps:');
    console.log(temp.businessSteps);

    const deResult: ParseDiagramElementsResult = temp.getDiagramElements();

    console.log("DERESULT");
    console.log(deResult);
    this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
  }

}
