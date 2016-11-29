import { Component } from '@angular/core';
/*import { DiagramService } from '../services/diagram';*/

@Component({
    //moduleId: module.id,
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
    //styleUrls: ['./css/app.css']
})
export class DiagramComponent {
/*    graph : joint.dia.Graph;
    constructor(private diagramService: DiagramService) {
        this.graph = this.diagramService.getGraph();
        graph.getElements().forEach(function(element) {
            element.on('cell:pointerdown', function() {
                alert("hello");
            })
        });
    }*/


    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

