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
    protected static _graph: joint.dia.Graph;
    protected static _paper: joint.dia.Paper;

    constructor(private editToolbarComponent: EditToolbarComponent,
                private actionsToolbarComponent: ActionsToolbarComponent,
                private propertiesComponent: PropertiesComponent) {
        //this.graph = Diagram.getGraph();
        //$('#myholder').on('elementclick', function (e) { alert("hello") }, false);
    }

    public showDiagram(elements: DiagramElement[]){
        if(!DiagramComponent._graph) {
            DiagramComponent._graph = new Graph;
        }

        DiagramComponent._paper = new joint.dia.Paper({
            el: $('#myholder'),
            width: 1600,
            height: 600,
            model: DiagramComponent._graph,
            gridSize: 1,
            interactive: true
        });
        DiagramComponent._paper.on('cell:pointerdown',
            function(cellView, event, x, y) {
                //alert('cell view ' + cellView.model.parent.name + ' was clicked');
                //event.preventDefault();
                //var evt = document.createEvent("elementclick");
                //evt.initEvent("elementclick", true, false);
                //Diagram._paper.dispatchEvent(evt);
                //var e = new Event("elementclick");
                //Diagram._paper.trigger('elementclick');
                //alert("heho");
            }
        );

        //$('#myholder').on('elementclick', function (e) { alert("hello") });


        // construction des artifacts à partir de JSON
        // add artifacts de graph
        var cells : joint.dia.Cell[] = [];
        for (var el of elements) {
            cells.push(el.visualShape);

            for(var artifact of el.artifacts){
                cells.push(artifact.visualShape);
                if(artifact.behavior == Behavior.Near){
                    cells.push(artifact.makeLinkWithParent(el).visualShape);
                }
            }
        }

        DiagramComponent._graph.resetCells(cells);
        joint.layout.DirectedGraph.layout(DiagramComponent._graph, { rankDir: 'BT', rankSep: 50, edgeSep: 50, nodeSep: 50 });
        DiagramComponent._graph.translate(200,0);
        for (var el of elements) {
            cells.push(el.visualShape);

            for(var artifact of el.artifacts){
                if(artifact.behavior == Behavior.Near){
                    el.visualShape.embed(artifact.visualShape);
                    if(artifact instanceof Actor)
                        (artifact.visualShape as any).position(- artifact.visualShape.prop('size/width') - 50 ,-20, {parentRelative : true});
                    else
                        (artifact.visualShape as any).position(el.visualShape.prop('size/width') + 50 ,0, {parentRelative : true});
                }
            }
        }
    }

    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

