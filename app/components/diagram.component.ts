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
    private static _graph: joint.dia.Graph;
    private static _paper: joint.dia.Paper;
    private static _editToolbarComponent: EditToolbarComponent;
    private static _actionsToolbarComponent: ActionsToolbarComponent;
    private static _propertiesComponent: PropertiesComponent;

    constructor(editToolbarComponent: EditToolbarComponent,
                actionsToolbarComponent: ActionsToolbarComponent,
                propertiesComponent: PropertiesComponent) {

        DiagramComponent._editToolbarComponent = editToolbarComponent;
        DiagramComponent._actionsToolbarComponent = actionsToolbarComponent;
        DiagramComponent._propertiesComponent = propertiesComponent;

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
            interactive: false
        });

        DiagramComponent._paper.on('cell:pointerdown', this.cellClick, this);

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

    private _previousHighlightingCel : joint.dia.CellView;

    private cellClick(cellView : joint.dia.CellView, event, x, y) {
        if (this._previousHighlightingCel)
            this._previousHighlightingCel.unhighlight();

        this._previousHighlightingCel = cellView;

        if ((cellView.model as any).parent) {
            cellView.highlight();
            DiagramComponent._propertiesComponent.setElement((cellView.model as any).parent);
            DiagramComponent._actionsToolbarComponent.setElement((cellView.model as any).parent);
        }
    }

    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }
}

