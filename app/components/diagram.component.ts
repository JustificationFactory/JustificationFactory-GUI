import { Component } from '@angular/core';

import { PropertiesComponent } from './properties.component';
import { Diagram } from '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
    providers: [PropertiesComponent, Diagram]
    //styleUrls: ['./css/app.css']
})
export class DiagramComponent {
    graph : any;
    constructor(private propertiesComponent: PropertiesComponent) {
        this.graph = Diagram.getGraph();
        //$('#myholder').on('elementclick', function (e) { alert("hello") }, false);
    }

    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

