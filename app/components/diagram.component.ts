<<<<<<< HEAD
import { Component } from '@angular/core';
/*import { DiagramService } from '../services/diagram';*/
=======
import { Component  } from '@angular/core';
>>>>>>> afcc5459c945fa18fccf8da009d919c721dc1eda

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
    }

<<<<<<< HEAD
*/
}
=======
    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}
>>>>>>> afcc5459c945fa18fccf8da009d919c721dc1eda
