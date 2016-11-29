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
/*    graph : joint.dia.Graph;
    constructor(private propertiesComponent: PropertiesComponent) {
        this.graph = Diagram.getGraph();
        graph.getElements().forEach(function(element) {
            element.on('cell:pointerdown', function() {
                propertiesComponent.setElement(element.parent);
            })
        });
    }*/


    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

