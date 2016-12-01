import { Component, Input, Output } from '@angular/core';

import { EditToolbarComponent } from './edit.toolbar.component';
import { ActionsToolbarComponent } from './actions.toolbar.component';
import { PropertiesComponent } from './properties.component';
import '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
    //styleUrls: ['./css/app.css']
/*    host: {
        "(document: click)": "handleEvent( $event )",
        "(document: mousedown)": "handleEvent( $event )",
        "(document: mouseup)": "handleEvent( $event )"
    }*/
})
export class DiagramComponent{
    private static _graph: joint.dia.Graph;
    private static _paper: joint.dia.Paper;
    private static _editToolbarComponent: EditToolbarComponent;
    private static _actionsToolbarComponent: ActionsToolbarComponent;
    private static _propertiesComponent: PropertiesComponent;
    private static _graphScale : number =1 ;

    selectedElement = null;
    @Input() diagramLoaded;
    test = "achraf";
    //selectedElement = null;


/*    notifyChildren() {
        this.parentSubject.next('some value');
    }

    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
        alert("change");
    }*/


    constructor(editToolbarComponent: EditToolbarComponent,
                actionsToolbarComponent: ActionsToolbarComponent,
                propertiesComponent: PropertiesComponent
                ) {

        DiagramComponent._editToolbarComponent = editToolbarComponent;
        DiagramComponent._actionsToolbarComponent = actionsToolbarComponent;
        DiagramComponent._propertiesComponent = propertiesComponent;
    }
    
    /*public handleEvent($event){
        this.test = "you";
    }*/

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


        $('#myholder').replaceWith(DiagramComponent._paper.el);

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
            this.test = "allo";
            /*alert("hello");*/
            //DiagramComponent._propertiesComponent.setElement((cellView.model as any).parent);
            //DiagramComponent._actionsToolbarComponent.setElement((cellView.model as any).parent);
        }
    }

    public getSVGFromDiagram() : any {
        return $('#myholder').html();
    }


    public zoom(a,b) {
        DiagramComponent._paper.scale(a,b);
    };

    public zoomOut() {

        DiagramComponent._graphScale -= 0.1;
        this.zoom(DiagramComponent._graphScale, DiagramComponent._graphScale);
    };

    public zoomIn() {

        DiagramComponent._graphScale += 0.1;
        this.zoom(DiagramComponent._graphScale, DiagramComponent._graphScale);
    };
}






