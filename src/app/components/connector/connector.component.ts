import {Component, OnInit} from '@angular/core';
import {WsConnectorService} from '../../services/webServices/ws-connector.service';
import {ParseJson2DiagramElements} from '../../business/diagram/importDiagram';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  public argSystemIdList: string[];
  public currentArgSystem: ArgSystem;

  constructor(private connectorService: WsConnectorService) {
    this.currentArgSystem = null;
  }

  ngOnInit() {
    this.connectorService.get<string[]>('systems').subscribe(data => this.argSystemIdList = data);
  }

  retrieveArgumentationSystem(id: string): void {
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
  }

}
