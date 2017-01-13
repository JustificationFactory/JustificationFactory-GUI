import { Component } from '@angular/core';
import '../services/diagram';
import {PropertiesComponent} from "./properties.component";
import {ActionsToolbarComponent} from "./actions.toolbar.component";

@Component({
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
})
export class DiagramComponent{
    private static _graph: joint.dia.Graph;
    private static _paper: joint.dia.Paper;

    _initialPaperWidth : number = 810 ;
    _initialPaperHeight : number = 610 ;
    private static _graphScale : number = 1 ;
    selectedElement = null;
    diagramWidth = "col-sm-12 col-md-12 col-lg-12";
    businessSteps: Array<Step>;

    constructor(public propertiesComponent: PropertiesComponent, public actionsToolbarComponent: ActionsToolbarComponent) {

    }

    public showDiagram(elements: DiagramElement[], bSteps: Array<Step>){

        this.businessSteps = bSteps;

        if(!DiagramComponent._graph) {
            DiagramComponent._graph = new Graph;
        }

        if (!DiagramComponent._paper) {
            DiagramComponent._paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: this._initialPaperWidth,
                height: this._initialPaperHeight,
                model: DiagramComponent._graph,
                gridSize: 1,
                interactive: true,
                restrictTranslate: true
            });
        }
        this.selectedElement = null;
        this.diagramWidth = "col-sm-12 col-md-12 col-lg-12";
        DiagramComponent._paper.setOrigin(0,0);
        var dragStartPosition = null;

        this.resetEvents();
        DiagramComponent._paper.on('cell:pointerclick', this.cellClick, this);
        DiagramComponent._paper.on('blank:pointerclick', this.blankClick, this);

        DiagramComponent._paper.on('blank:pointerdown',
            function(event, x, y) {
                dragStartPosition = { x: x * DiagramComponent._graphScale , y: y * DiagramComponent._graphScale};
            }
        );

        DiagramComponent._paper.on('cell:pointerup blank:pointerup', function(cellView, x, y) {
             dragStartPosition = null;
        });

        $('#myholder').mousemove(function(event) {
            if (dragStartPosition != null) {
                (event.target as any).style.cursor = 'move';
                DiagramComponent._paper.setOrigin(
                    event.offsetX - dragStartPosition.x,
                    event.offsetY - dragStartPosition.y);
            }
            else {
                (event.target as any).style.cursor = 'default';
            }
        });

        $('#myholder').replaceWith(DiagramComponent._paper.el);

        this.resetZoom();

        let cells : joint.dia.Cell[] = [];

        for (let el of elements) {
            cells.push(el.visualShape);
        }

        DiagramComponent._graph.resetCells(cells);

        joint.layout.DirectedGraph.layout(DiagramComponent._graph, {
            rankDir: 'BT',
            rankSep: 50,
            edgeSep: 50,
            nodeSep: 50 ,
            marginX: 10,
            marginY: 10
        });

        //Replace Actors and Rationales  near strategies
        for (let el of elements) {
            for(let artifact of el.artifacts){
                if(artifact.behavior == Behavior.Near){
                    el.visualShape.embed(artifact.visualShape);

                    if(artifact instanceof Actor) {
                        if ((el.visualShape as any).attributes.position.x >= (artifact.visualShape.prop('size/width') + 50))
                            (artifact.visualShape as any).position(-artifact.visualShape.prop('size/width') - 50, -20, {parentRelative: true});
                        else if ((el.visualShape as any).attributes.position.x >= (artifact.visualShape.prop('size/width') + 10))
                            (artifact.visualShape as any).position(-artifact.visualShape.prop('size/width') - 10, -20, {parentRelative: true});
                        //else : let in his place !

                    }
                    else {
                        if ((el.visualShape as any).attributes.position.x <= (this._initialPaperWidth - el.visualShape.prop('size/width') - 50))
                            (artifact.visualShape as any).position(el.visualShape.prop('size/width') + 50, 0, {parentRelative: true});
                        else if ((el.visualShape as any).attributes.position.x <= (this._initialPaperWidth - el.visualShape.prop('size/width') - 10))
                            (artifact.visualShape as any).position(el.visualShape.prop('size/width') + 10, 0, {parentRelative: true});
                        //else : let in his place !
                    }
                }
            }
        }
    }

    onSelectedElementChange(element: DiagramElement) {
        //We must redraw the graph because for PATH case, if we just set atrributes
        //the origin PATH SVG shape appear (bug !)
        DiagramComponent._graph.resetCells(DiagramComponent._graph.getCells());
        element.visualShape.findView(DiagramComponent._paper).highlight();
    }

    public resetEvents() {
        DiagramComponent._paper.off('cell:pointerclick', this.cellClick, this);
        DiagramComponent._paper.off('blank:pointerclick', this.blankClick, this);
    }

    public blankClick(event, x, y) {
        this.unhighlightAllCells();
        this.selectedElement = null;
        this.diagramWidth = "col-sm-12 col-md-12 col-lg-12";
    }

    public cellClick(cellView : joint.dia.CellView, event, x, y) {
        this.unhighlightAllCells();
        this.diagramWidth = "col-sm-10 col-md-10 col-lg-10";
        if ((cellView.model as any).parent) {
            cellView.highlight();
            this.selectedElement = (cellView.model as any).parent;
        }
    }

    private unhighlightAllCells() {
        DiagramComponent._graph.getCells().forEach(cell => {
            cell.findView(DiagramComponent._paper).unhighlight();
        });
    }

    public resetDiagram() {
        this.unhighlightAllCells();

        this.resetZoom();
    }

    public getSVGFromDiagram() : any {
        this.resetDiagram();

        return $('#myholder').html();
    }


    public refreshPaper() {
        DiagramComponent._paper.scale(DiagramComponent._graphScale,DiagramComponent._graphScale);
        (DiagramComponent._paper.svg as any).width.baseVal.valueInSpecifiedUnits = this._initialPaperWidth * DiagramComponent._graphScale;
        (DiagramComponent._paper.svg as any).height.baseVal.valueInSpecifiedUnits = this._initialPaperHeight * DiagramComponent._graphScale;
    };

    public zoomOut() {
        DiagramComponent._graphScale -= 0.1;
        this.refreshPaper();

    };

    public zoomIn() {
        DiagramComponent._graphScale += 0.1;
        this.refreshPaper();
    };

    public resetZoom() {
        DiagramComponent._graphScale = 1;
        this.refreshPaper();
    }

    public getGraphScale() : number {
        return DiagramComponent._graphScale;
    }

    public getCellsGraph() : Cell[] {
        return DiagramComponent._graph.getCells();
    }

    public getCellViewFromCell(cell : Cell) : joint.dia.CellView
    {
        return DiagramComponent._paper.findViewByModel(cell);
    }
}






