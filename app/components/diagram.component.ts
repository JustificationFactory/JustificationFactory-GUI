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
export class DiagramComponent{
    private static _graph: joint.dia.Graph;
    private static _paper: joint.dia.Paper;
    private static _editToolbarComponent: EditToolbarComponent;
    private static _actionsToolbarComponent: ActionsToolbarComponent;
    private static _propertiesComponent: PropertiesComponent;

    _graphScale : number =1 ;
    selectedElement = null;

    constructor(editToolbarComponent: EditToolbarComponent,
                actionsToolbarComponent: ActionsToolbarComponent,
                propertiesComponent: PropertiesComponent
                ) {

        DiagramComponent._editToolbarComponent = editToolbarComponent;
        DiagramComponent._actionsToolbarComponent = actionsToolbarComponent;
        DiagramComponent._propertiesComponent = propertiesComponent;
    }

    public showDiagram(elements: DiagramElement[]){
        if(!DiagramComponent._graph) {
            DiagramComponent._graph = new Graph;
        }

        if (!DiagramComponent._paper) {
            DiagramComponent._paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: 850,
                height: 620,
                model: DiagramComponent._graph,
                gridSize: 1,
                interactive: true
            });

            DiagramComponent._paper.on('cell:pointerdown', this.cellClick, this);
        }

        $('#myholder').replaceWith(DiagramComponent._paper.el);

        // construction des artifacts à partir de JSON
        // add artifacts de graph
        var cells : joint.dia.Cell[] = [];
        for (var el of elements) {
            cells.push(el.visualShape);

            for(var artifact of el.artifacts){
                if(artifact.behavior == Behavior.Near){
                    cells.push(artifact.visualShape);
                    cells.push(artifact.makeLinkWithParent(el).visualShape);
                }
            }
        }

        DiagramComponent._graph.resetCells(cells);

        joint.layout.DirectedGraph.layout(DiagramComponent._graph, {
            rankDir: 'BT',
            rankSep: 50,
            edgeSep: 50,
            nodeSep: 50 ,
            marginX: 50,
            marginY: 20
        });

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

    public cellClick(cellView : joint.dia.CellView, event, x, y) {
        if (this._previousHighlightingCel)
            this._previousHighlightingCel.unhighlight();

        this._previousHighlightingCel = cellView;

        if ((cellView.model as any).parent) {
            cellView.highlight();
            this.selectedElement = (cellView.model as any).parent;
        }
    }

    public getSVGFromDiagram() : any {

        if (this._previousHighlightingCel)
            this._previousHighlightingCel.unhighlight();

        return $('#myholder').html();
    }


    public zoom(a,b) {
        DiagramComponent._paper.scale(a,b);
    };

    public zoomOut() {
        this._graphScale -= 0.1;
        this.zoom(this._graphScale, this._graphScale);
    };

    public zoomIn() {
        this._graphScale += 0.1;
        this.zoom(this._graphScale, this._graphScale);
    };
}






