import { Component } from '@angular/core';

import { EditToolbarComponent } from './edit.toolbar.component';
import { ActionsToolbarComponent } from './actions.toolbar.component';
import { PropertiesComponent } from './properties.component';
import '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
    //styleUrls: ['./css/app.css']
})
export class DiagramComponent {
    graph : any;
    constructor(private editToolbarComponent: EditToolbarComponent,
                private actionsToolbarComponent: ActionsToolbarComponent,
                private propertiesComponent: PropertiesComponent) {
        this.graph = Diagram.getGraph();
        //$('#myholder').on('elementclick', function (e) { alert("hello") }, false);
    }

    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

