import { Component } from '@angular/core';
import '../services/diagram';
import {PropertiesComponent} from "./properties.component";
import {ActionsToolbarComponent} from "./actions.toolbar.component";

@Component({
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
})
export class DiagramComponent{
    private _graph: joint.dia.Graph;
    private _paper: joint.dia.Paper;

    private _initialPaperWidth : number = 810 ;
    private _initialPaperHeight : number = 610 ;
    private _graphScale : number = 1 ;
    private _dragStartPosition = null;

    selectedElement = null;
    diagramWidth = "col-sm-12 col-md-12 col-lg-12";
    businessSteps: Array<Step>;

    constructor(public propertiesComponent: PropertiesComponent, public actionsToolbarComponent: ActionsToolbarComponent) {

    }

    public showDiagram(elements: DiagramElement[], bSteps: Array<Step>){

        this.businessSteps = bSteps;
        console.log(JSON.stringify(this.businessSteps));

        if(!this._graph) {
            this._graph = new Graph;
        }

        if (!this._paper) {
            this._paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: this._initialPaperWidth,
                height: this._initialPaperHeight,
                model: this._graph,
                gridSize: 1,
                interactive: true,
                restrictTranslate: true
            });
        }
        this.selectedElement = null;
        this.diagramWidth = "col-sm-12 col-md-12 col-lg-12";
        this._paper.setOrigin(0,0);

        this.resetEvents();
        this._paper.on('cell:pointerclick', this.cellClick, this);
        this._paper.on('blank:pointerclick', this.blankClick, this);
        this._paper.on('blank:pointerdown', this.pointerDown, this);
        this._paper.on('cell:pointerup blank:pointerup', this.pointerUp, this);
        $('#myholder').on('mousemove', this, this.myholderMouseMove);
        $('#myholder').on("wheel", this,  this.MouseWheelHandler);

        $('#myholder').replaceWith(this._paper.el);

        this.resetZoom();

        let cells : joint.dia.Cell[] = [];

        for (let el of elements) {
            cells.push(el.visualShape);
        }

        this._graph.resetCells(cells);

        joint.layout.DirectedGraph.layout(this._graph, {
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
        this._graph.resetCells(this._graph.getCells());
        element.visualShape.findView(this._paper).highlight();
    }

    public resetEvents() {
        this._paper.off('cell:pointerclick', this.cellClick, this);
        this._paper.off('blank:pointerclick', this.blankClick, this);
        this._paper.off('blank:pointerdown', this.pointerDown, this);
        this._paper.off('cell:pointerup blank:pointerup', this.pointerUp, this);
        $('#myholder').off('mousemove', "", this.myholderMouseMove);
        $('#myholder').off("wheel", "",  this.MouseWheelHandler);
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
        this._graph.getCells().forEach(cell => {
            cell.findView(this._paper).unhighlight();
        });
    }

    public resetDiagram() {
        this.unhighlightAllCells();
        if (this._paper)
            this._paper.setOrigin(0, 0);
        this.resetZoom();
    }

    public getSVGFromDiagram() : any {
        this.resetDiagram();

        return $('#myholder').html();
    }


    public refreshPaper() {
        this._paper.scale(this._graphScale,this._graphScale);
        (this._paper.svg as any).width.baseVal.valueInSpecifiedUnits = this._initialPaperWidth * this._graphScale;
        (this._paper.svg as any).height.baseVal.valueInSpecifiedUnits = this._initialPaperHeight * this._graphScale;
    };

    public zoomOut() {
        this._graphScale -= 0.1;
        this.refreshPaper();

    };

    public zoomIn() {
        this._graphScale += 0.1;
        this.refreshPaper();
    };

    public resetZoom() {
        this._graphScale = 1;
        this.refreshPaper();
    }

    public getGraphScale() : number {
        return this._graphScale;
    }

    public getCellsGraph() : Cell[] {
        return this._graph.getCells();
    }

    public getCellViewFromCell(cell : Cell) : joint.dia.CellView
    {
        return this._paper.findViewByModel(cell);
    }

    private pointerDown(event, x, y) {
        this._dragStartPosition = { x: x * this._graphScale , y: y * this._graphScale};
    }

    private pointerUp(cellView, x, y) {
        this._dragStartPosition = null;
    }

    private myholderMouseMove(event) {
        if (event.data._dragStartPosition != null) {
            (event.target as any).style.cursor = 'move';
            event.data._paper.setOrigin(
                event.offsetX - event.data._dragStartPosition.x,
                event.offsetY - event.data._dragStartPosition.y);
        }
        else {
            (event.target as any).style.cursor = 'default';
        }
    }

    private MouseWheelHandler(event) {
        if (event.originalEvent && event.originalEvent.ctrlKey) {
            let delta = event.originalEvent.wheelDelta || -event.originalEvent.deltaY;

            if (delta > 0)
                event.data.zoomIn();
            else
                event.data.zoomOut();

            return false;
        }
        else
            return true;
    }

    public getPaper() {
        return this._paper;
    }

    public getGraph() {
        return this._graph;
    }
}






