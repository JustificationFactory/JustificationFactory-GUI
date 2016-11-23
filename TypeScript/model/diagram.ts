///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />

import Path = joint.shapes.basic.Path;

class DiagramElement {
    visualShape: Path;
    jsonElement: JSON;
    name: string;
    description:string;
    type:string;

    constructor(name: string, description: string, type: string) {
        this.name = name;
        this.description = description;
        this.type = type;
    }

    makeLinkWithParent(parentElement) {
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
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: name,
            size: { width: 200, height: 30 },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
    }
}

class Conclusion extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
    }
}

class Evidence extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
    }
}

class Strategy extends Support {
    artifacts: Array<Artifact>;
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
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
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
    }
}

class Limitation extends Artifact{
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
        this.behavior = Behavior.Embeded;
        this.visualShape = new joint.shapes.basic.Rect({
            id: name,
            //size: { width: width, height: height },
            attrs: { rect: { fill: '#DF0606' }, text: { text: name, fill: 'white' } }
        });
    }
}
class Rationale extends Artifact{
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
        this.behavior = Behavior.Near;
    }
}
class Actor extends Artifact{
    constructor(name: string, role: string) {
        super(name,"",role);
        this.behavior = Behavior.Near;
        this.visualShape = new joint.shapes.basic.Image({
            position : {
                x : 100,
                y : 100
            },
            size : {
                width : 16,
                height : 16
            },
            attrs : {
                image : {
                    "xlink:href" : "User.ico",
                    width : 16,
                    height : 16
                }
            }
        });
    }
}
class ForEach extends Artifact{
    constructor(name: string, description: string, type: string) {
        super(name, description, type);
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
        var height = 2 * ((name.split('\n').length + 1) * letterSize);
    }
}

