import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DiagramComponent} from '../diagram/diagram.component';
import {WsRetrieverService} from '../../services/webServices/ws-retriever.service';
import {WsSenderService} from '../../services/webServices/ws-sender.service';
import {IArgSystem, IPattern} from '../../business/IArgSystem';
import {MyArgSystem} from '../../business/ArgSystem';


@Component({
  selector: 'app-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.css']
})
export class ConnectorComponent implements OnInit {

  @Output() onArgSystemChange = new EventEmitter<MyArgSystem>();

  // TODO: déplacer cette logique
  /* System Logic */
  public argSystemIdList: string[];
  public currentArgSystemId: string;
  public currentArgSystem: MyArgSystem;

  /* Patterns logic */
  public patternsIdList: string[];
  public currentPatternId: string;
  public currentPattern: IPattern;

  constructor(private retrieverService: WsRetrieverService,
              private senderService: WsSenderService,
              public diagramComponent: DiagramComponent) {
    this.currentArgSystem = null;
  }

  ngOnInit() {
    this.retrieveAllArgumentationSystemsName();
  }

  /* Business handlers */

  /* Retrievers */
  retrieveAllArgumentationSystemsName(): void {
    console.log('Retrieving ArgSystems Names.');
    this.retrieverService.getAllArgumentationSystemsName()
      .subscribe(result => {
          this.argSystemIdList = result;
        },
        error => {
          console.log(error);
        });
  }

  retrieveArgumentationSystemByCurrentId(id: string): void {
    console.log('Retrieving MyArgSystem by id: ' + id);
    this.retrieverService.getArgumentationSystemByCurrentId(id)
      .subscribe(result => {
          this.currentArgSystem = new MyArgSystem(result);
          console.log('ArgSystem:');
          console.log(this.currentArgSystem);
          // TODO: danger méli-mélo interface ou pas pendant débug
          this.onArgSystemChange.emit(this.currentArgSystem);
        },
        error => {
          console.log(error);
          alert(error.error);
        });
  }

  retrievePatternsByArgSystemId(argSystemId: string): void {
    console.log('Retrieving MyArgSystem Patterns by system id: ' + argSystemId);
    this.retrieverService.getPatternsByArgSystemId(argSystemId)
      .subscribe(result => {
          this.patternsIdList = result;
          console.log(this.patternsIdList);
        },
        error => {
          console.log(error);
        });
  }

  retrievePatternByPatternId(argSystemId: string, patternId: string): void {
    console.log('Retrieving MyArgSystem(' + argSystemId + ') pattern with id: ' + patternId);
    this.retrieverService.getPatternByPatternId(argSystemId, patternId)
      .subscribe(result => {
          this.currentPattern = result;
          console.log(result.name);
          console.log(this.currentPattern.name);
          console.log(this.currentPattern);
        },
        error => {
          console.log(error);
        });
  }

  /* Posters */
  deleteCurrentArgSystem() {
    console.log('Deleting ' + this.currentArgSystemId);
    this.senderService.removeArgumentationSystem(this.currentArgSystemId).subscribe(result => console.log(result));
    this.retrieveAllArgumentationSystemsName();
  }

  registerArgSystem(argSystem: IArgSystem) {
    console.log('Registering new arg system : ' + argSystem);
    this.senderService.registerArgumentationSystem(argSystem).subscribe(result => {
      console.log('RegisterArgSystem returned : ' + result);
    });
  }

  /* Manipulation handlers */
  changeCurrentArgSystem(id: string): void {
    this.currentArgSystemId = id;
    this.retrieveArgumentationSystemByCurrentId(id);
    this.retrievePatternsByArgSystemId(id);
  }

  changeCurrentPattern(id: string): void {
    this.currentPatternId = id;
    this.retrievePatternByPatternId(this.currentArgSystemId, id);
  }

}
