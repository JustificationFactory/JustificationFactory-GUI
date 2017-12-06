import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-workspace-toolbar',
  templateUrl: './workspace-toolbar.component.html',
  styleUrls: ['./workspace-toolbar.component.css']
})
export class WorkspaceToolbarComponent implements OnInit {

  @Output() onNewDiagram = new EventEmitter<void>();
  @Output() onUploadAs = new EventEmitter<void>();

  @Input() diagramLoaded: boolean;

  constructor( private modalService: NgbModal) { }

  ngOnInit() {
  }

  newDiagram() {
    this.onNewDiagram.emit();
  }

  open(content) {
    this.modalService.open(content);
  }

  onUploadAsFormSubmit(form: NgForm) {
    this.onUploadAs.emit();
  }
}
