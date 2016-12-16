import { Component } from '@angular/core';
import '../services/diagram';

@Component({
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
})
export class DiagramComponent{
    private static _graph: joint.dia.Graph;
    private static _paper: joint.dia.Paper;

    _initialPaperWidth : number = 810 ;
    _initialPaperHeight : number = 610 ;
    _graphScale : number = 1 ;
    selectedElement = null;

    constructor() {

    }

    public showDiagram(elements: DiagramElement[]){
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

        DiagramComponent._paper.off('cell:pointerdown', this.cellClick, this);
        DiagramComponent._paper.on('cell:pointerdown', this.cellClick, this);

        $('#myholder').replaceWith(DiagramComponent._paper.el);

        this.resetZoom();

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
            marginX: 10,
            marginY: 10
        });

        for (var el of elements) {
            cells.push(el.visualShape);

            for(var artifact of el.artifacts){
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
        let newAttrs = element.visualShape.attributes.attrs;
        //To generate a update of the element view
        //A re-initilization of 1 attribut is needed
        element.visualShape.attr({
            text: {
                fill: '?'
            }
        });
        //And after we can put again all correct attributes
        element.visualShape.attr(newAttrs);
    }

    public resetEvents() {
        DiagramComponent._paper.off('cell:pointerdown', this.cellClick, this);
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

        this.resetZoom();

        return $('#myholder').html();
    }


    public refreshPaper() {
        DiagramComponent._paper.scale(this._graphScale,this._graphScale);
        (DiagramComponent._paper.svg as any).width.baseVal.valueInSpecifiedUnits = this._initialPaperWidth * this._graphScale;
        (DiagramComponent._paper.svg as any).height.baseVal.valueInSpecifiedUnits = this._initialPaperHeight * this._graphScale;
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
}






