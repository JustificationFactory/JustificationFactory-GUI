
///<reference path="..\..\node_modules\@types\jquery\index.d.ts" />
///<reference path="..\..\node_modules\@types\backbone\index.d.ts" />
///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />
///<reference path="..\..\node_modules\@types\dagre\index.d.ts" />

import Path = joint.shapes.basic.Path;
import Cell = joint.dia.Cell;
import Graph = joint.dia.Graph;

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
            attrs: {
                '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z'},
                '.link-tools': { visibility: "collapse" },
                '.marker-arrowheads': { visibility: "collapse" },
                '.marker-vertices': { visibility: "collapse" },
                '.labels': { visibility: "collapse" },
                '.connection-wrap': { visibility: "collapse" }
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
            attrs: { rect: { fill: '#CCCC00 ', rx: 5, ry: 10  }, text: { text: conclusion.name, fill: 'black' } }

        });
        (this.visualShape as any).parent = this;

        if(this.jsonElement.hasOwnProperty("limits")){

            if((Object.keys(this.jsonElement.limits[0])).length<= 2){
                var x=this.visualShape.attributes.position.x;
                var w=Util.getElementWidthFromTextLength(conclusion.name);
                var h=this.visualShape.attributes.height;
                var y=this.visualShape.attributes.position.y;
                var i=0;
                var ports;
                for(var limit of (Object.keys(this.jsonElement.limits[0]))) {
                    x=(this.visualShape.attributes.position.x-Util.getElementWidthFromTextLength(limit)/2)-4;
                    this.artifacts.push(new Limitation(limit, this.jsonElement.limits[0][limit], "type"))
                    if(i>0){
                        x=x+w*1.4;
                        i++;}
                    else{ i++;}
                    var x1=x-15
                    var   y1=y-15
                    var wlimit=Util.getElementWidthFromTextLength(limit)-10
                    var rect= '<rect width="'+wlimit.toString()+'" height="25" stroke="black" fill="red" x="'+ x1.toString()+'" y="'+y1.toString()+'" >'+' </rect>'
                    var port = {
                        id: limit,
                        group: 'a',
                        args: {},
                        label: {
                            position: {
                                name : 'manual',
                                args: {
                                    x: x,
                                    y: y,
                                    angle: 0,
                                    attrs: { }
                                }
                            }
                        },
                        attrs: { rect: { fill: '#DF0606 ', rx: 5, ry: 10}, text: { text: limit, fill: 'white' }},
                        markup: rect
                    };

                    if(i==1){
                        ports=[port];}
                    else{ ports.push(port);}

                };

                (this.visualShape as any).addPorts(ports);
            }
        } else {}
    }


}
class Conclusion extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);

        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00', rx: 5, ry: 10  }, text: { text: name, fill: 'black' } },
            ports: {

            }
        })
        this.artifacts = new Array<Artifact>();
        (this.visualShape as any).parent = this;

        if(this.jsonElement.hasOwnProperty("limits")){

            if((Object.keys(this.jsonElement.limits[0])).length<= 2){
                var x=this.visualShape.attributes.position.x;
                var w=Util.getElementWidthFromTextLength(name);
                var h=this.visualShape.attributes.height;
                var y=this.visualShape.attributes.position.y;
                var i=0;
                var ports;
                for(var limit of (Object.keys(this.jsonElement.limits[0]))) {
                    x=(this.visualShape.attributes.position.x-Util.getElementWidthFromTextLength(limit)/2)-4;
                    this.artifacts.push(new Limitation(limit, this.jsonElement.limits[0][limit], "type"))
                    if(i>0){
                        x=x+w*1.4;
                        i++;}
                    else{ i++;}
                    var x1=x-15
                    var   y1=y-15
                    var wlimit=Util.getElementWidthFromTextLength(limit)-10
                    var rect= '<rect width="'+wlimit.toString()+'" height="25" stroke="black" fill="red" x="'+ x1.toString()+'" y="'+y1.toString()+'" >'+' </rect>'
                    var port = {
                        id: limit,
                        group: 'a',
                        args: {},
                        label: {
                            position: {
                                name : 'manual',
                                args: {
                                    x: x,
                                    y: y,
                                    angle: 0,
                                    attrs: { }
                                }
                            }
                        },
                        attrs: { rect: { fill: '#DF0606', rx: 5, ry: 10}, text: { text: limit, fill: 'white' }},
                        markup: rect
                    };

                    if(i==1){
                        ports=[port];}
                    else{ ports.push(port);}

                };

                (this.visualShape as any).addPorts(ports);
            }
        } else {}
    }

}


class Evidence extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00', rx: 5, ry: 10 }, text: { text: name, fill: 'black' } }
        });
        (this.visualShape as any).parent = this;
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
        (this.visualShape as any).parent = this;
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
                '.marker-target': { fill : 'none' },
                '.link-tools': { visibility: "collapse" },
                '.marker-arrowheads': { visibility: "collapse" },
                '.marker-vertices': { visibility: "collapse" },
                '.labels': { visibility: "collapse" },
                '.connection-wrap': { visibility: "collapse" }
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
        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name),
                height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#FFFFFF' }, text: { text: name, fill: 'black' } },
            markup: Util.getSVGActorImage(role)
        });
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

    static getSVGActorImage(actorType: string) : string {
        var result =  '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" tooltipPlacement="top" tooltip="'+ actorType +'" width="40pt" height="40pt"  viewBox="0 0 300 300"  preserveAspectRatio="xMidYMid meet">';

        if (actorType.toLowerCase().indexOf('expert') >= 0) {
            result += `<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">
                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360
                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103
                        374 -235 721 -615 629z"></path>
                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119
                        -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22
                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395
                        20 -302 0 -323 -2 -395 -23z m549 -100 c5 -22 -75 -194 -98 -213 -9 -8 -10
                        -12 -3 -13 13 0 13 -1 57 -620 4 -51 1 -60 -43 -127 -25 -40 -51 -75 -57 -77
                        -6 -2 -31 30 -56 72 l-45 77 13 225 c17 289 32 443 45 451 6 3 3 11 -7 19 -9
                        8 -36 56 -60 108 -59 125 -60 123 115 120 125 -3 136 -4 139 -22z"></path>
                        </g>
                        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#9E9E9E" stroke="none">
                        
                        <path class="node" id="node4" d="M1511 1526 c-9 -11 -2 -33 33 -108 24 -52 51 -100 60 -108 10 -8 13
                        -16 7 -19 -13 -8 -28 -162 -45 -451 l-13 -225 45 -77 c25 -42 50 -74 56 -72 6
                        2 32 37 57 77 44 67 47 76 43 127 -44 619 -44 620 -57 620 -7 1 -6 5 3 13 23
                        19 103 191 98 213 -3 18 -14 19 -139 22 -108 2 -139 0 -148 -12z"></path>
                        </g>`;
        }
        else {
            result += `<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">
                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360
                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103
                        374 -235 721 -615 629z"></path>
                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119
                            -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22
                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395
                        20 -302 0 -323 -2 -395 -23z"></path>
                        </g>`;
        }

        result += '</svg> <text x="0" y="100" font-size="14"></text>'; //this works like a template for actor name !

        return result;
    }
}

