import { Component, OnInit  } from '@angular/core';
import {DiagramComponent} from "./diagram.component";

@Component({
    //moduleId: module.id,
    selector: 'loaddiagram-view',
    templateUrl: 'app/components/load.diagram.component.html',
    //styleUrls: ['./css/app.css']
})
export class LoadDiagramComponent implements OnInit {

    ngOnInit(): void {
        var importFile = new ImportDiagramFile(<HTMLInputElement>$("#importFile")[0]);
    }

}