///<reference path="..\..\node_modules\@types\jquery\index.d.ts" />
///<reference path="..\..\node_modules\@types\backbone\index.d.ts" />
///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />
///<reference path="..\..\node_modules\@types\dagre\index.d.ts" />

import Path = joint.shapes.basic.Path;

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
    }

    makeLinkWithParent(parentElement:DiagramElement) {
        return new joint.dia.Link({
            source: { id: this.name },
            target: { id: parentElement.name },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
        });
    }
    makeLinkWithChild(childElement) {
        return new joint.dia.Link({
            source: { id: childElement.name },
            target: { id: this.name },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
        });
    }
}

enum Behavior {
    Embeded,
    Near
}

class Support extends DiagramElement {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: name,
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
    }
}

class Conclusion extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
    }
}

class Evidence extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
    }
}

class Strategy extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, jsonElement: JSON, type: string) {
        super(name, jsonElement, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: name,
            size: { width: 200, height: 30 },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                text: { text: name, 'ref-y': .3, fill: 'white' }
            }
        })
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
            id: name,
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
}

