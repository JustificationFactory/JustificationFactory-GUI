
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
    stepId : String;

    public static RectangleShape : string = "M 0 0 L 60 0 L 60 30 L 0 30 Z";
    public static RoundedRectangleShape : string = "M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z";
    public static ParallelogramShape : string = "M 10 0 L 70 0 L 60 30 L 0 30 Z";

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

        this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(conclusion.name), height: Util.getElementHeightFromTextLength(name) },
            attrs: {
                path: { d: DiagramElement.RoundedRectangleShape, fill: '#CCCC00'},
                text: { text: conclusion.name, 'ref-y': .3, fill: '#000000' }
            }
        });

        this.artifacts = Util.getLimitationsFromJson(conclusion.jsonElement, this);
        (this.visualShape as any).parent = this;

        if (this.artifacts.length > 0) {
            this.visualShape.attributes.size.height += Util.HeightToAddIfArtifactEmbeded;
            this.visualShape.attributes.attrs.text.y = 5;
        }
    }
}

class Conclusion extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: {
                path: { d: DiagramElement.RoundedRectangleShape, fill: '#CCCC00'},
                text: { text: name, 'ref-y': .3, fill: '#000000' }
            }
        })

        this.artifacts = Util.getLimitationsFromJson(jsonElement, this);
        (this.visualShape as any).parent = this;

        if (this.artifacts.length > 0) {
            this.visualShape.attributes.size.height += Util.HeightToAddIfArtifactEmbeded;
            this.visualShape.attributes.attrs.text.y = 5;
        }
    }
}

class Evidence extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: {
                path: { d: DiagramElement.RoundedRectangleShape, fill: '#CCCC00'},
                text: { text: name, 'ref-y': .3, fill: '#000000' }
            }

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
                size: {
                    width: Util.getElementWidthFromTextLength(name),
                    height: Util.getElementHeightFromTextLength(name)
                },
                attrs: {
                    path: {d: DiagramElement.ParallelogramShape, fill: '#008000'},
                    text: {text: name, 'ref-y': .3, fill: '#FFFFFF'}
                }

            });

        (this.visualShape as any).parent = this;
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
    constructor(name: string, jsonElement: any, type: string, parentElement: DiagramElement, index: number) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Embeded;

        // A port haven't got a "visual shape"

        var widthRect = Util.getElementWidthFromTextLength(name);
        var xRect = 0;
        var yRect = 0;
        var xEcartFromMiddle = 18;
        var yLabel = 0;

        //TODO: Find how to remove port transformation (matrix...)
        // "y" of rectangle must be 25 after transformation
        // "y" of rectangle's label must be 42 after transformation

        switch (index) {
            case 0:
                //For the first limitation
                //transformation applies to the port:
                //      Limitation #1 : transform="matrix(1 0 0 1 0 22)" => y : + 22

                //We end the first limitation's rectangle just before the middle of the conclusion
                if (widthRect > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
                    //if rectangle of the first port is greater than the half of the conclusion
                    //x position shift to the left
                    xRect = -(widthRect - (parentElement.visualShape.attributes.size.width / 2) + xEcartFromMiddle);
                }
                else
                    xRect = (parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle - widthRect;

                yRect = 3; // 22 + 3 = 25
                yLabel = 20; // 22 + 20 = 42
                break;

            case 1 :
                //For the second limitation
                //transformation applies to the port:
                //      Limitation #1 : transform="matrix(1 0 0 1 0 11)" => y : + 11
                //      Limitation #2 : transform="matrix(1 0 0 1 0 33)" => y : + 33

                //We begin the second limitation's rectangle just after the middle of the conclusion
                if ((parentElement.visualShape as any).portData.ports[0].attrs.rect.width > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
                    //if rectangle of the first port is greater than the half of the conclusion
                    //x position shift to the left
                    xRect = (parentElement.visualShape as any).portData.ports[0].attrs.rect.x
                        + (parentElement.visualShape as any).portData.ports[0].attrs.rect.width
                        + (xEcartFromMiddle * 2);
                }
                else
                    xRect = (parentElement.visualShape.attributes.size.width / 2) + xEcartFromMiddle;

                yRect = -8; // 33 - 8 = 25
                yLabel = 9; // 33 + 9 = 42
                break;

            case 2 :
                //For the third limitation (and so on...)
                //transformation applies to the port:
                //      Limitation #1 : transform="matrix(1 0 0 1 0 7)"  => y : + 7
                //      Limitation #2 : transform="matrix(1 0 0 1 0 22)" => y : + 22
                //      Limitation #3 : transform="matrix(1 0 0 1 0 37)" => y : + 37

                //just show '...' instead of the real name, to indicate there are more than 2 limitations
                name = '...';
                widthRect = 30;
                var xMargeOtherLimitations = 3;

                //We put the third limitation's rectangle at the middle middle of the conclusion
                if ((parentElement.visualShape as any).portData.ports[0].attrs.rect.width > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
                    //if rectangle of the first port is greater than the half of the conclusion
                    //x position shift to the left
                    xRect = (parentElement.visualShape as any).portData.ports[0].attrs.rect.x
                        + (parentElement.visualShape as any).portData.ports[0].attrs.rect.width
                        + xMargeOtherLimitations;
                }
                else
                    xRect = (parentElement.visualShape.attributes.size.width / 2) - (xEcartFromMiddle - xMargeOtherLimitations);

                yRect = -12; // 37 - 12 = 25
                yLabel = 2; // 37 + 2 = 39 (42 - 3 => for vertical alignment of "...")
                break;

            default :
            //no more limitations are accepted
        }

        var nameLength = $('#ruler').html(name).width();
        var xLabel = xRect + ((widthRect - nameLength) / 2);

        if (index < 3) {
            var port = {
                id: Util.getNewGuid(),
                label: {
                    position: {
                        name: 'manual',
                        args: {
                            x: xLabel,
                            y: yLabel,
                        }
                    }
                },
                markup: 'rect',
                attrs: {
                    rect: {
                        fill: '#DF0606',
                        rx: 5,
                        ry: 10,
                        x: xRect,
                        y: yRect,
                        width: widthRect,
                        height: 25,
                        stroke: '#000000'
                    },
                    text: {
                        text: name,
                        fill: '#FFFFFF',
                    }
                }
            };

            (parentElement.visualShape as any).addPorts([port]);

            Limitation.reorganizePorts(parentElement.visualShape);
        }
    }

    static reorganizePorts(visual_shape : any) {
        //we must change "y" of previous ports after addPort, otherwise "y" re-switch to previous value
        if (visual_shape.portData.ports.length == 2) {
            visual_shape.portData.ports[0].attrs.rect.y = 14; // 11 + 14 = 25
            visual_shape.portData.ports[0].label.position.args.y = 31; // 11 + 31 = 42
        }
        else if (visual_shape.portData.ports.length == 3) {
            visual_shape.portData.ports[0].attrs.rect.y = 18; // 7 + 18 = 25
            visual_shape.portData.ports[0].label.position.args.y = 35; // 7 + 35 = 42
            visual_shape.portData.ports[1].attrs.rect.y = 3; // 22 + 3 = 25
            visual_shape.portData.ports[1].label.position.args.y = 20; // 22 + 20 = 42
        }
    }
}

class Rationale extends Artifact{
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Near;

        this.name = name;

        if (jsonElement.axonicProject) {
            for (var r of Object.values(jsonElement.axonicProject)) {
                if (this.name != "")
                    this.name += " & ";
                this.name += r;
            }
        }

        this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(this.name),
                height: Util.getElementHeightFromTextLength(this.name) },
            attrs: { rect: { fill: '#FFFFFF' }, text: { text: this.name, fill: '#000000' } }
        });
        (this.visualShape as any).parent = this;
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
            attrs: { rect: { fill: '#FFFFFF' }, text: { text: name, fill: '#000000' } },
            markup: Util.getSVGActorImage(role)
        });
        (this.visualShape as any).parent = this;
    }
}

class ForEach extends Artifact{
    constructor(name: string, jsonElement: any, type: string) {
        super(name, jsonElement, type);
        this.behavior = Behavior.Embeded;
    }
}

class Step  {
    private stepId : String;
    public items : Array<DiagramElement>;

    constructor (id: String) {
        if ((id === undefined) || (id == ""))
            this.stepId = Util.getNewGuid();
        else
            this.stepId = id;

        this.items = new Array<DiagramElement>();
    }

    public getStepId() : String {
        return this.stepId;
    }
}


class Util{
    static HeightToAddIfArtifactEmbeded : number = 12;
    static MaxUndo : number = 20;

    static getElementWidthFromTextLength(name: string){
        var maxLine = _.max(name.split('\n'), function(l) { return l.length; });
        var maxLineWidth = $('#ruler').html(maxLine).width();
        return maxLineWidth + 40;
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

    static getLimitationsFromJson(jsonElement: any, parentElement: DiagramElement) : Array<Artifact> {
        var artifacts = new Array<Artifact>();
        var index = 0;

        if(jsonElement[0] && jsonElement[0].hasOwnProperty("limits")){
            for(var limit of Object.keys(jsonElement[0].limits)) {
                artifacts.push(new Limitation(limit, [jsonElement[0].limits[limit]], "", parentElement, index++))
            };
        }

        return artifacts;
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
        else {if(actorType.toLowerCase().indexOf('computed')>=0 ){


          result += `<g transform="translate(0.000000,300.000000)  scale(0.400000,-0.400000)" fill="#030303" stroke="none">
	<path   d="M128,80H32C14.313,80,0,94.344,0,112v352c0,17.688,14.313,32,32,32h96c17.688,0,32-14.313,32-32V112
		C160,94.344,145.688,80,128,80z M48,400c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S56.844,400,48,400z M128,208H32
		v-32h96V208z M128,144H32v-32h96V144z"/>
	
	<path  d="M480,16H96c-17.688,0-32,14.344-32,32h32h96h288v256H192v64h288c17.688,0,32-14.313,32-32V48C512,30.344,497.688,16,480,16
		z M288,352c-8.844,0-16-7.156-16-16s7.156-16,16-16s16,7.156,16,16S296.844,352,288,352z"/>
		      

</g>`;
        }else

        {
            result += `<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">
                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360
                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103
                        374 -235 721 -615 629z"></path>
                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119
                            -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22
                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395
                        20 -302 0 -323 -2 -395 -23z"></path>
                        </g>`;
        }}

        result += '</svg> <text x="-10" y="100" font-size="14"></text>'; //this works like a template for actor name !

        return result;
    }

    static roundedRectangleSvg(x, y, w, h, r1, r2, r3, r4) : string {
        let result = [];

        result = result.concat(["M",x,r1+y, "Q",x,y, x+r1,y]); //A
        result = result.concat(["L",x+w-r2,y, "Q",x+w,y, x+w,y+r2]); //B
        result = result.concat(["L",x+w,y+h-r3, "Q",x+w,y+h, x+w-r3,y+h]); //C
        result = result.concat(["L",x+r4,y+h, "Q",x,y+h, x,y+h-r4, "Z"]); //D

        return result.toString().replace(/,/g, " ");
    }

    static stateToJSON(businessSteps : Array<Step>, jsonGraph : any, states: any)  {
        let jsonBusinessSteps = [];

        for (let businessStep of businessSteps) {
            let businessElements = [];

            for (let item of businessStep.items) {
                let artifactElements = [];

                for (let artifactElement of item.artifacts) {
                    artifactElements.push({
                        elementType: artifactElement.constructor.name,
                        name: artifactElement.name,
                        description: artifactElement.description,
                        type: artifactElement.type,
                        visualShapeId: (artifactElement.visualShape !== undefined) ? artifactElement.visualShape.id : undefined,
                        jsonElement: item.jsonElement,
                    });
                }

                let jsonSupport : any;

                if (item instanceof Support) {
                    jsonSupport = {
                        stepId_conclusion: (item as Support).conclusion.stepId,
                        stepId_evidence: (item as Support).evidence.stepId
                    };
                }

                businessElements.push({
                    elementType: item.constructor.name,
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    visualShapeId: item.visualShape.id,
                    jsonElement: item.jsonElement,
                    artifacts: artifactElements,
                    support: jsonSupport
                });
            }

            jsonBusinessSteps.push({
                id: businessStep.getStepId(),
                elements: businessElements
            });
        }

        if (states === undefined)
            states = {};

        if (states.previous === undefined)
            states.previous = [];

        if ((states.currentIndex !== undefined) && (states.currentIndex > 0) && (states.previous.length >= states.currentIndex))
            states.previous.splice(states.previous.length - states.currentIndex);

        states.currentIndex = 0;
        if (states.previous.length > Util.MaxUndo)
            states.previous.splice(0, 1);
        
        states.previous.push({
            changeDate: new Date(),
            businessSteps: jsonBusinessSteps,
            graph: jsonGraph
        });

        return states;
    }

    static stateFromJSON(states: any, result : any, indexState: number)  {

        if ((indexState === undefined) || (indexState < 0))
            states.currentIndex = 0;
        else if ((indexState === undefined) || (indexState > Util.MaxUndo))
            states.currentIndex = Util.MaxUndo;
        else if ((indexState !== undefined) && (states.previous !== undefined) && (indexState > states.previous.length))
            states.currentIndex = states.previous.length;
        else
            states.currentIndex = indexState;

        if ((states.previous !== undefined) && (states.previous.length >= (states.currentIndex + 1))) {
            let state = states.previous[states.previous.length - 1 - states.currentIndex];

            result.changeDate = state.changeDate;
            result.jsonBusinessSteps = state.businessSteps;
            result.graph = state.graph;
        }

        return states;

    }

    static businessStepsFromJSON(jsonBusinessSteps: any, cells: Array<Cell>, result : any)  {

        result.businessSteps = new Array<Step>();

        for (let step of jsonBusinessSteps) {
            let businessStep = new Step(step.id);

            for (let element of step.elements) {
                let businessElement : DiagramElement;

                switch (element.elementType) {
                    case "Conclusion":
                        businessElement = new Conclusion(element.name, element.jsonElement, element.type);
                        break;
                    case "Strategy":
                        businessElement = new Strategy(element.name, element.jsonElement, element.type);
                        break;
                    case "Evidence":
                        businessElement = new Evidence(element.name, element.jsonElement, element.type);
                        break;
                    case "Support":
                        //Intermediate step (not correct Conclusion and Evidence! cf. stateRebuildVisualShapeAssociation function)
                        businessElement = new Support(new Conclusion(element.name, element.jsonElement, element.type), new Evidence(element.name, element.jsonElement, element.type));
                        break;
                }

                if (businessElement !== undefined) {
                    businessElement.stepId = businessStep.getStepId();
                    businessElement.description = element.description;

                    //VisualShape association
                    for (let cell of cells) {
                        if (element.visualShapeId === cell.id) {
                            businessElement.visualShape = cell;
                            (cell as any).parent = businessElement;
                            break;
                        }
                    }

                    if (businessElement.artifacts === undefined)
                        businessElement.artifacts = new Array<Artifact>();

                    //Artifact association
                    if (element.artifacts !== undefined) {
                        for (let artifact of element.artifacts) {
                            let businessArtifact: Artifact;

                            switch (artifact.elementType) {
                                case "Limitation":
                                    //Not necessary: Creation into Conclusion constructor
                                    break;
                                case "Actor":
                                    businessArtifact = new Actor(artifact.name, artifact.jsonElement, artifact.type);
                                    break;
                                case "Rationale":
                                    businessArtifact = new Rationale(artifact.name, artifact.jsonElement, artifact.type);
                                    break;
                            }

                            if (businessArtifact !== undefined) {
                                //VisualShape association
                                for (let cell of cells) {
                                    if (artifact.visualShapeId === cell.id) {
                                        artifact.visualShape = cell;
                                        (cell as any).parent = artifact;
                                        break;
                                    }
                                }

                                businessElement.artifacts.push(businessArtifact);
                            }
                        }
                    }

                    businessStep.items.push(businessElement);
                }
            }

            result.businessSteps.push(businessStep);
        }

        //Associate correct business element (Conclusion / Evidence) to Support element
        let supportIds = new Array<String>();
        for (let step of jsonBusinessSteps) {
            for (let element of step.elements) {
                if ((element.elementType == "Support") && (!supportIds.find((s) => { return s === element.visualShapeId})) ) {
                    supportIds.push(element.visualShapeId);
                    let support_conclusion: DiagramElement;
                    let support_evidence: DiagramElement;

                    for (let bStep of result.businessSteps) {
                        for (let bElement of bStep.items) {
                            //Find correct Conclusion
                            if ((element.support.stepId_conclusion === bStep.stepId) && (bElement instanceof Conclusion)) {
                                support_conclusion = bElement;
                                break;
                            }

                            //Find correct Evidence
                            if ((element.support.stepId_evidence === bStep.stepId) && (bElement instanceof Evidence) && (bElement.name == element.name)) {
                                support_evidence = bElement;
                                break;
                            }
                        }
                    }

                    //Find Supports and replace Conclusion and Evidence
                    for (let bStep of result.businessSteps) {
                        for (let bElement of bStep.items) {
                            if (element.visualShapeId === bElement.visualShape.id) {
                                bElement.conclusion = support_conclusion;
                                bElement.evidence = support_evidence;
                            }
                        }
                    }
                }
            }
        }
    }

}

