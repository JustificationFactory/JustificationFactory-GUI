import { Component, OnInit } from '@angular/core';
import {WsConnectorService} from '../../services/connector/ws-connector.service';

@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  public argSystems: string[];

  constructor(private connectorService: WsConnectorService) { }

  ngOnInit() {
    this.connectorService.get('systems/').subscribe(data => this.argSystems = data);
  }


}
