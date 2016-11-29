
///<reference path="..\..\node_modules\@types\jquery\index.d.ts" />
///<reference path="..\..\node_modules\@types\backbone\index.d.ts" />
///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />
///<reference path="..\..\node_modules\@types\dagre\index.d.ts" />

import Path = joint.shapes.basic.Path;
import Cell = joint.dia.Cell;
import Graph = joint.dia.Graph;
//import { Injectable } from '@angular/core';

//@Injectable()
class Diagram {

    private static _diagram:Diagram = new Diagram();
    protected static _graph:Graph = null;

    private _score:number = 0;

    public getGraph(){
        return Diagram._graph;
    }

    constructor() {
        if(Diagram._diagram){
            throw new Error("Error: Instantiation failed: Use Diagram.getInstance() instead of new.");
        }
        Diagram._diagram = this;
    }

    public static getInstance():Diagram {
        return Diagram._diagram;
    }


    public showDiagram(elements: DiagramElement[]){
        if(Diagram._graph == null){
            Diagram._graph = new Graph;

            var paper = new joint.dia.Paper({
                el: $('#myholder'),
                width: 1600,
                height: 600,
                model: Diagram._graph,
                gridSize: 1,
                interactive: true
            });
        }

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

        Diagram._graph.resetCells(cells);
        joint.layout.DirectedGraph.layout(Diagram._graph, { rankDir: 'BT', rankSep: 50, edgeSep: 50, nodeSep: 50 });
        Diagram._graph.translate(200,0);
        for (var el of elements) {
            cells.push(el.visualShape);

            for(var artifact of el.artifacts){
                if(artifact.behavior == Behavior.Near){
                    el.visualShape.embed(artifact.visualShape);
                    if(artifact instanceof Actor)
                        artifact.visualShape.position(- artifact.visualShape.prop('size/width') - 50 ,-20, {parentRelative : true});
                    else
                        artifact.visualShape.position(el.visualShape.prop('size/width') + 50 ,0, {parentRelative : true});
                }
            }
        }
    }
}

class DiagramElement {
    visualShape: Cell;
    jsonElement: any;
    name: string;
    description:string;
    type:string;
    artifacts: Array<Artifact>;

    constructor(name: string, jsonElement: any, type: string) {
        this.name = name;
        this.jsonElement = jsonElement;
        this.type = type;
        this.description = "";
        this.artifacts = [];
    }

    makeLinkWithParent(parentElement:DiagramElement) : LinkElement {
        return new LinkElement(this, parentElement);
    }
    makeLinkWithChild(childElement) : LinkElement {
        return new LinkElement(childElement, this);
    }

    public getId() : string {
        if (typeof this.visualShape != 'undefined') {
            return this.visualShape.id;
        }
    }
}

enum Behavior {
    Embeded,
    Near
}

class LinkElement extends DiagramElement {
    constructor(public sourceElement: DiagramElement, public targetElement: DiagramElement) {
        super("", JSON.parse("{}"), "");
        this.visualShape = new joint.dia.Link({
            source: { id: sourceElement.visualShape.id },
            target: { id: targetElement.visualShape.id },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
            }
        });
    }

    public setSource(newElement: DiagramElement) {
        this.sourceElement = newElement;
        this.visualShape.attributes.source.id = newElement.visualShape.id;
    }

    public setTarget(newElement: DiagramElement) {
        this.targetElement = newElement;
        this.visualShape.attributes.target.id = newElement.visualShape.id;
    }
 }
class Support extends DiagramElement {
    artifacts: Array<Artifact>;

    constructor(public conclusion: Conclusion, public evidence: Evidence) {
        super(conclusion.name, conclusion.jsonElement, conclusion.type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(conclusion.name), height: Util.getElementHeightFromTextLength(conclusion.name) },
            attrs: { rect: { fill: '#CCCC00', rx: 5, ry: 10  }, text: { text: conclusion.name, fill: 'white' } }
        });
    }
}

class Conclusion extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00', rx: 5, ry: 10  }, text: { text: name, fill: 'white' } },
            ports: {
                groups: {},
                items: [  ]
            }
        });

 this.artifacts = new Array<Artifact>();

        if(jsonElement.limits != null ){

            if(jsonElement.limits.length<=2){
              var  pos='down';
                var i=0;
                for(var limit of jsonElement.limits) {
                    this.artifacts.push(new Limitation(limit.code, limit, type))
                    if(i=2){pos="top"}
                    else{ i++;}
                    var port = {
                        id: limit.code,
                        group: 'a',
                        args: {},
                        label: {
                            position: {
                                name:pos ,
                                args: {}
                            },
                            markup: '<text class="label-text" fill="blue"/>'
                        },
                        attrs: {rect: {fill: '#DF0606'}, text: {text: "text", fill: 'white', position: "center"}},
                        markup: '<rect width="50" height="30" stroke="red"/>'
                    };
                    (this.visualShape as any).addPort(port);



                }
            }
            else {}
        }
    }
}

class Evidence extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00', rx: 5, ry: 10 }, text: { text: name, fill: 'white' } }
        });
    }
}

class Strategy extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green'},
                text: { text: name, 'ref-y': .3, fill: 'white' }
            }
        });
        this.artifacts = this.createArtifactsFromJson();
    }

    private createArtifactsFromJson(){
        var actor = new Actor(this.jsonElement.actor[0].name[0],this.jsonElement.actor[0], this.jsonElement.actor[0].role[0]);
        var rationale = new Rationale("",this.jsonElement.rationale[0],"");

        return [actor, rationale];
    }
}

class Artifact extends DiagramElement {
    behavior: Behavior;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
    }
    makeLinkWithParent(parentElement) {
        var link = new LinkElement(this,parentElement);
        link.visualShape = new joint.dia.Link({
            source: { id: this.visualShape.id },
            target: { id: parentElement.visualShape.id },
            attrs: {
                '.connection': {
                    'fill': 'none',
                    'stroke-linejoin': 'round',
                    'stroke-width': '2',
                    'stroke': '#4b4a67',
                    'stroke-dasharray': '1.5'
                },
                '.marker-target': { fill : 'none' }
            }
        });
        return link;
    }
}

class Limitation extends Artifact{
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Embeded;
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            //size: { width: width, height: height },
            attrs: { rect: { fill: '#DF0606' }, text: { text: name, fill: 'white' } }
        });
    }
}
class Rationale extends Artifact{
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Near;
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(jsonElement.axonicProject[0].pathology[0]),
                height: Util.getElementHeightFromTextLength(jsonElement.axonicProject[0].pathology[0]) },
            attrs: { rect: { fill: '#FFFFFF' }, text: { text: jsonElement.axonicProject[0].pathology[0], fill: 'black' } }
        });
    }
}
class Actor extends Artifact{
    constructor(name: string, jsonElement: any, role: string) {
        super(name, jsonElement, role);
        this.behavior = Behavior.Near;
        this.visualShape = new (joint.shapes as any).org.Member({
            attrs: {
                '.card': { fill: "#BBBBBB", stroke: 'none'},
                image: { 'xlink:href': 'images/User.ico', opacity: 0.7 },
                '.rank': { text: role, fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0},
                '.name': { text: name, fill: "#000", 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
            },
            size: { width: Util.getElementWidthFromTextLength(role) + 50 }
        });
    }
    makeLinkWithParent(parentElement) {
        var link = new LinkElement(this,parentElement);
        link.visualShape = new (joint.shapes as any).org.Arrow({
            source: { id: this.visualShape.id },
            target: { id: parentElement.visualShape.id },
            attrs: {
                '.connection': {
                    'fill': 'none',
                    'stroke-linejoin': 'round',
                    'stroke-width': '2',
                    'stroke': '#4b4a67',
                    'stroke-dasharray': '1.5'
                },
                '.marker-target': { fill : 'none' }
            }
        });
        return link;
    }
}
class ForEach extends Artifact{
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Embeded;
    }
}

class Util{
    static getElementWidthFromTextLength(name: string){
        var maxLineLength = _.max(name.split('\n'), function(l) { return l.length; }).length;
        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 8;
        var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
        return width;
    }

    static getElementHeightFromTextLength(name: string){
        var maxLineLength = _.max(name.split('\n'), function(l) { return l.length; }).length;
        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 8;
        var height = 2 * ((name.split('\n').length + 1) * letterSize);
        return height;
    }

    static getNewGuid() : String {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }

        // then to call it, plus stitch in '4' in the third group
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    }
}

