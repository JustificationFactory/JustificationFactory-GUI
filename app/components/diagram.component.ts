import {Component, AfterContentInit} from '@angular/core';
import '../services/diagram';
import {PropertiesComponent} from "./properties.component";
import {ActionsToolbarComponent} from "./actions.toolbar.component";

@Component({
    selector: 'diagram-view',
    templateUrl: 'app/components/diagram.component.html',
})
export class DiagramComponent implements AfterContentInit{
    private _graph: joint.dia.Graph;
    private _paper: joint.dia.Paper;
    private window : Window;
    private _initialPaperWidth : number = window.innerWidth; // 810
    private _initialPaperHeight : number = window.innerHeight; // 610
    private _graphScale : number = 1 ;
    private _dragStartPosition = null;
    public stateSessionName = "state";

    selectedElement = null;
    diagramWidth = "col-sm-12 col-md-12 col-lg-12";
    businessSteps: Array<Step>;


    constructor(public propertiesComponent: PropertiesComponent, public actionsToolbarComponent: ActionsToolbarComponent) {

    }

    ngAfterContentInit() {
        // Component content has been initialized
        this.undo_redo_graphState(false, 0);
    }

    public undoDiagram() {
        this.undo_redo_graphState(true, undefined);
    }

    public redoDiagram() {
        this.undo_redo_graphState(false, undefined);
    }

    private diagram_keypress(event) {
        if (event.charCode !== undefined) {
            let isCtrlZ = false;

            if ((event.charCode === 26) || (event.charCode === 23)) // why "23" ? I don't know... The mystery of computer science!
                isCtrlZ = true;

            if ((event.ctrlKey === true) && (event.shiftKey === false) && isCtrlZ)
                event.data.undoDiagram();
            else if ((event.ctrlKey === true) && (event.shiftKey === true) && isCtrlZ)
                event.data.redoDiagram();
        }
    }

    public loadDiagramStateFromJson(stateToLoad) {
        let states : any = {};

        states.currentIndex = 0;
        states.previous = [];

        states.previous.push({
            changeDate: new Date(),
            businessSteps: stateToLoad.businessSteps,
            graph: stateToLoad.graph
        });

        sessionStorage.setItem(this.stateSessionName, JSON.stringify(states));

        this.undo_redo_graphState(false, 0);
    }

    public currentBusinessStepsToJson() {
        let result : any;

        if ((this.businessSteps !== undefined) && (this.businessSteps.length > 0)) {

            result = {
                steps: {
                    step: []
                }
            };

            for (let bstep of this.businessSteps) {
                let newJsonStep : any = {};

                newJsonStep["conclusion"] = {};
                newJsonStep["evidences"] = { evidenceRoles: [] };
                newJsonStep["strategy"] = {};

                for (let bitem of bstep.items) {
                    if (bitem instanceof Conclusion)
                        newJsonStep.conclusion = bitem.jsonElement[0];
                    else if (bitem instanceof Evidence)
                        newJsonStep.evidences.evidenceRoles.push({ evidence: bitem.jsonElement[0] });
                    else if (bitem instanceof Strategy)
                        newJsonStep.strategy = bitem.jsonElement[0];
                }

                result.steps.step.push(newJsonStep);
            }
        }
        else
            result = {};

        return result;
    }

    public currentDiagramStateToJson() {
        let result : any;

        if ((sessionStorage.getItem(this.stateSessionName) != null) && (sessionStorage.getItem(this.stateSessionName) != "")) {
            let states = JSON.parse(sessionStorage.getItem(this.stateSessionName));
            let tmpresult = {
                changeDate: new Date(),
                jsonBusinessSteps: {},
                businessSteps: {},
                graph: {}
            };

            Util.stateFromJSON(states, tmpresult, states.currentIndex);

            result = {
                changeDate: tmpresult.changeDate,
                businessSteps: tmpresult.jsonBusinessSteps,
                graph: tmpresult.graph
            };
        }
        else
            result = {};

        return result;
    }

    private undo_redo_graphState(undo: boolean, specificIndex: number) {
        if ((sessionStorage.getItem(this.stateSessionName) != null) && (sessionStorage.getItem(this.stateSessionName) != "")) {
            let states = JSON.parse(sessionStorage.getItem(this.stateSessionName));
            let result = {
                changeDate: new Date(),
                jsonBusinessSteps: {},
                businessSteps: {},
                graph: {}
            };

            if (specificIndex === undefined) {
               if (states !== undefined) {
                   if (states.currentIndex !== undefined) {
                       if ((undo !== undefined) && (undo === false))
                           specificIndex = states.currentIndex - 1;
                       else
                           specificIndex = states.currentIndex + 1;
                   }
                   else
                       specificIndex = 0;
               }
            }

            Util.stateFromJSON(states, result, specificIndex);
            sessionStorage.setItem(this.stateSessionName, JSON.stringify(states));

            this.initializeGraph();

            this._graph.fromJSON(result.graph);
            for (let g of this._graph.getCells()) {
                if (((g as any).portData !== undefined) && ((g as any).portData.ports !== undefined) && ((g as any).portData.ports.length > 0))
                    Limitation.reorganizePorts(g);
            }
            this._graph.resetCells(this._graph.getCells());
            this._startGraphChanged = false;

            Util.businessStepsFromJSON(result.jsonBusinessSteps, this._graph.getCells(), result);
            this.businessSteps = (result.businessSteps as any);
        }
    }

    private initializeGraph() {
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
        this._graph.on('change', this.graphChanged, this);
        $('#myholder').on('mousemove', this, this.myholderMouseMove);
        $('#myholder').on("wheel", this,  this.MouseWheelHandler);
        $('#myholder').on("keypress", this,  this.diagram_keypress);


        $('#myholder').replaceWith(this._paper.el);

        this.resetZoom();

    }

    public showDiagram(elements: DiagramElement[], bSteps: Array<Step>){
        this.businessSteps = bSteps;

        this.initializeGraph();

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
        this._startGraphChanged = false;

        sessionStorage.setItem(this.stateSessionName, "");
        this.saveGraphState();
        if(bSteps.length >3){
            for(var i=1;i<=(bSteps.length-3);i++){this.zoomOut();
                this.zoomOut();
                this.zoomOut();}}
    }

    public saveGraphState() {
        let states : any;

        if ((sessionStorage.getItem(this.stateSessionName) != null) && (sessionStorage.getItem(this.stateSessionName) != ""))
            states = JSON.parse(sessionStorage.getItem(this.stateSessionName));

        sessionStorage.setItem(this.stateSessionName, JSON.stringify(Util.stateToJSON(this.businessSteps, this._graph.toJSON(), states)));
    }

    onSelectedElementChange(element: DiagramElement) {
        
        if (element.jsonElement.name !== undefined)
            element.jsonElement.name = element.name;
        else if (element.jsonElement[0] !== undefined)
            element.jsonElement[0].name = element.name;

        if (element instanceof Support) {
            element.conclusion.jsonElement[0].name = element.name;
            element.evidence.jsonElement[0].name = element.name;
        }

        //We must redraw the graph because for PATH case, if we just set atrributes
        //the origin PATH SVG shape appear (bug !)
        this._graph.resetCells(this._graph.getCells());
        this.saveGraphState();
        element.visualShape.findView(this._paper).highlight();
    }

    onStepChange(element: DiagramElement) {
        //We must redraw the graph because for PATH case, if we just set atrributes
        //the origin PATH SVG shape appear (bug !)
        this._graph.resetCells(this._graph.getCells());
        this.saveGraphState();
    }

    public resetEvents() {
        this._paper.off('cell:pointerclick', this.cellClick, this);
        this._paper.off('blank:pointerclick', this.blankClick, this);
        this._paper.off('blank:pointerdown', this.pointerDown, this);
        this._paper.off('cell:pointerup blank:pointerup', this.pointerUp, this);
        this._graph.off('change', this.graphChanged, this);
        $('#myholder').off('mousemove', "", this.myholderMouseMove);
        $('#myholder').off("wheel", "",  this.MouseWheelHandler);
        $('#myholder').off("keypress", "",  this.diagram_keypress);
    }

    public blankClick(event, x, y) {
        $('#myholder').focus();
        this.unhighlightAllCells();
        this.selectedElement = null;
        this.diagramWidth = "col-sm-12 col-md-12 col-lg-12";
    }

    public cellClick(cellView : joint.dia.CellView, event, x, y) {
        $('#myholder').focus();
        this.unhighlightAllCells();

        let belement = (cellView.model as any).parent;
        if ((belement !== undefined) && (!(belement instanceof Artifact))) {
            this.diagramWidth = "col-sm-10 col-md-10 col-lg-10";
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
        //this.resetDiagram();

        return $('#myholder').html();
    }


    public refreshPaper() {
        this._paper.scale(this._graphScale,this._graphScale);
        (this._paper.svg as any).width.baseVal.valueInSpecifiedUnits = this._initialPaperWidth * this._graphScale;
        (this._paper.svg as any).height.baseVal.valueInSpecifiedUnits = this._initialPaperHeight * this._graphScale;
        this._paper.setDimensions(this._initialPaperWidth, this._initialPaperHeight);
    };

    public zoomOut() {
        if (this._graphScale < 0.1)
            this._graphScale = 0;
        else
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

    private pointerUp(event, x, y) {
        this._dragStartPosition = null;

        if (this._startGraphChanged) {
            this._startGraphChanged = false;
            this.saveGraphState();
        }
    }

    private _startGraphChanged : Boolean = false;

    private graphChanged(cell) {
        this._startGraphChanged = true;
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






