import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Type, Pattern, Strategy} from '../../../business/ArgSystem';
import {ConnectorComponent} from '../../connector/connector.component';

@Component({
  selector: 'app-workspace-toolbar',
  templateUrl: './workspace-toolbar.component.html',
  styleUrls: ['./workspace-toolbar.component.css']
})
export class WorkspaceToolbarComponent implements OnInit {

  @Output() onNewDiagram = new EventEmitter<void>();
  @Output() onUploadAs = new EventEmitter<void>();
  @Output() onNewPattern = new EventEmitter<void>();
  @Output() onNewStep = new EventEmitter<void>();
  @Output() onDeleteArgSystem = new EventEmitter<void>();

  @Input() diagramLoaded: boolean;

  constructor() { }

  ngOnInit() {
  }

  newDiagram() {
    this.onNewDiagram.emit();
  }

  uploadAs() {
    this.onUploadAs.emit();
  }

  deleteArgSystem() {
    this.onDeleteArgSystem.emit();
  }

  newPattern() {
    this.onNewPattern.emit();
  }

  newStep() {
    this.onNewStep.emit();
  }

}
