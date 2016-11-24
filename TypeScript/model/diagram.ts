///<reference path="..\..\node_modules\@types\jquery\index.d.ts" />
///<reference path="..\..\node_modules\@types\backbone\index.d.ts" />
///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />
///<reference path="..\..\node_modules\@types\dagre\index.d.ts" />

import Path = joint.shapes.basic.Path;
import Cell = joint.dia.Cell;

class Diagram {

    private static _diagram:Diagram = new Diagram();

    private _score:number = 0;

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
        var graph = new joint.dia.Graph;

        var paper = new joint.dia.Paper({
            el: $('#myholder'),
            width: 1600,
            height: 1500,
            model: graph,
            gridSize: 1,
            interactive: true
        });

        // construction des artifacts à partir de JSON
        // add artifacts de graph
        var cells : joint.dia.Cell[] = [];
        for (var i = 0; i < elements.length ; i++) {
            cells.push(elements[i].visualShape);
        }

        graph.addCells(cells);
        joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false, rankDir: 'BT', debugLevel: 3, rankSep: 50, edgeSep: 50, nodeSep: 50 });
    }
}

class DiagramElement {
    visualShape: Path;
    jsonElement: JSON;
    name: string;
    description:string;
    type:string;

    constructor(name: string, jsonElement: JSON, type: string) {
        this.name = name;
        this.jsonElement = jsonElement;
        this.type = type;
        this.description = "";
    }

    makeLinkWithParent(parentElement:DiagramElement) : LinkElement {
        return new LinkElement(this, parentElement);
    }
    makeLinkWithChild(childElement) : LinkElement {
        return new LinkElement(childElement, this);
    }
}

enum Behavior {
    Embeded,
    Near
}

class LinkElement extends DiagramElement {
    constructor(public sourceElement: DiagramElement, public destinationElement: DiagramElement) {
        super("", JSON.parse("{}"), "");
        this.visualShape = new joint.dia.Link({
            source: { id: sourceElement.visualShape.id },
            target: { id: destinationElement.visualShape.id },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
        });
    }
}
class Support extends DiagramElement {
    artifacts: Array<Artifact>;

    constructor(public conclusion: Conclusion, public evidence: Evidence) {
        super(name, conclusion.jsonElement, conclusion.type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
    }
}

class Conclusion extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } },
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
                    this.visualShape.addPort(port);



                }
            }


                else {} }




    }
}

class Evidence extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
    }
}

class Strategy extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: 200, height: 30 },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                text: { text: name, 'ref-y': .3, fill: 'white' }
            }
        });

    }
}

class Artifact extends DiagramElement {
    behavior: Behavior;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
    }
}

class Limitation extends Artifact{
    constructor(name: string, jsonElement: JSON, type: string) {
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
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Near;
    }
}
class Actor extends Artifact{
    constructor(name: string, role: string) {
        super(name,null,role);
        this.behavior = Behavior.Near;
        this.visualShape = new joint.shapes.org.Member({
            attrs: {
                '.card': { fill: "#BBBBBB", stroke: 'none'},
                image: { 'xlink:href': 'images/User.ico', opacity: 0.7 },
                '.rank': { text: "test", fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0},
                '.name': { text: name, fill: "#000", 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
            }
        });
    }
    makeLinkWithParent(parentElement) {
        return new joint.shapes.org.Arrow({
            source: { id: this.visualShape.id },
            target: { id: parentElement.visualShape.id },
            attrs: {
                '.connection': {
                    'fill': 'none',
                    'stroke-linejoin': 'round',
                    'stroke-width': '2',
                    'stroke': '#4b4a67'
                },
                '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
            }
        });
    }
}
class ForEach extends Artifact{
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Embeded;
    }
}

class Util{
    static getElementWidthFromTextLength(name){
        var maxLineLength = _.max(name.split('\n'), function(l) { return l.length; }).length;
        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 8;
        var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
        return width;
    }

    static getElementHeightFromTextLength(name){
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

