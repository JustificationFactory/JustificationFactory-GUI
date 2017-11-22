import { Component, OnInit } from '@angular/core';
import {WsConnectorService} from '../../services/connector/ws-connector.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  public argSystemList: string[];
  public currentArgSystem: ArgDiagram;

  constructor(private connectorService: WsConnectorService) {
    this.currentArgSystem = null;
  }

  ngOnInit() {
    this.connectorService.get<string[]>('systems').subscribe(data => this.argSystemList = data);
  }

  retrieveArgumentationSystem(id: string): void {
    this.connectorService.get<IArgDiagram>(id).subscribe(result => this.currentArgSystem = result);
  }

  changeCurrentArgSystem(id: string): void {
    this.retrieveArgumentationSystem(id);
  }

}

class ArgDiagram implements IArgDiagram {
  steps;
  patternsBase;
  objective;
  baseEvidences;
}

interface IArgDiagram {
  steps: Object[];
  patternsBase: Object;
  objective: Object;
  baseEvidences: Object[];
}
