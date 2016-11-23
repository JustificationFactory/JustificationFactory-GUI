///<reference path="..\..\node_modules\@types\jquery\index.d.ts" />
///<reference path="..\..\node_modules\@types\backbone\index.d.ts" />
///<reference path="..\..\node_modules\@types\jointjs\index.d.ts" />
///<reference path="..\..\node_modules\@types\dagre\index.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Path = joint.shapes.basic.Path;
var DiagramElement = (function () {
    function DiagramElement(name, description, type) {
        this.name = name;
        this.description = description;
        this.type = type;
    }
    DiagramElement.prototype.makeLinkWithParent = function (parentElement) {
        return new joint.dia.Link({
            source: { id: this.name },
            target: { id: parentElement.name },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
        });
    };
    DiagramElement.prototype.makeLinkWithChild = function (childElement) {
        return new joint.dia.Link({
            source: { id: childElement.name },
            target: { id: this.name },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
        });
    };
    return DiagramElement;
}());
var Behavior;
(function (Behavior) {
    Behavior[Behavior["Embeded"] = 0] = "Embeded";
    Behavior[Behavior["Near"] = 1] = "Near";
})(Behavior || (Behavior = {}));
var Support = (function (_super) {
    __extends(Support, _super);
    function Support(name, description, type) {
        _super.call(this, name, description, type);
        this.visualShape = new joint.shapes.basic.Rect({
            id: name,
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
    }
    return Support;
}(DiagramElement));
var Conclusion = (function (_super) {
    __extends(Conclusion, _super);
    function Conclusion(name, description, type) {
        _super.call(this, name, description, type);
    }
    return Conclusion;
}(Support));
var Evidence = (function (_super) {
    __extends(Evidence, _super);
    function Evidence(name, description, type) {
        _super.call(this, name, description, type);
    }
    return Evidence;
}(Support));
var Strategy = (function (_super) {
    __extends(Strategy, _super);
    function Strategy(name, description, type) {
        _super.call(this, name, description, type);
        this.visualShape = new joint.shapes.basic.Path({
            id: name,
            size: { width: 200, height: 30 },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                text: { text: name, 'ref-y': .3, fill: 'white' }
            }
        });
    }
    return Strategy;
}(Support));
var Artifact = (function (_super) {
    __extends(Artifact, _super);
    function Artifact(name, description, type) {
        _super.call(this, name, description, type);
    }
    return Artifact;
}(DiagramElement));
var Limitation = (function (_super) {
    __extends(Limitation, _super);
    function Limitation(name, description, type) {
        _super.call(this, name, description, type);
        this.behavior = Behavior.Embeded;
        this.visualShape = new joint.shapes.basic.Rect({
            id: name,
            //size: { width: width, height: height },
            attrs: { rect: { fill: '#DF0606' }, text: { text: name, fill: 'white' } }
        });
    }
    return Limitation;
}(Artifact));
var Rationale = (function (_super) {
    __extends(Rationale, _super);
    function Rationale(name, description, type) {
        _super.call(this, name, description, type);
        this.behavior = Behavior.Near;
    }
    return Rationale;
}(Artifact));
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor(name, role) {
        _super.call(this, name, "", role);
        this.behavior = Behavior.Near;
        this.visualShape = new joint.shapes.org.Member({
            attrs: {
                '.card': { fill: "#BBBBBB", stroke: 'none' },
                image: { 'xlink:href': 'images/User.ico', opacity: 0.7 },
                '.rank': { text: "test", fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0 },
                '.name': { text: name, fill: "#000", 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
            }
        });
    }
    Actor.prototype.makeLinkWithParent = function (parentElement) {
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
    };
    return Actor;
}(Artifact));
var ForEach = (function (_super) {
    __extends(ForEach, _super);
    function ForEach(name, description, type) {
        _super.call(this, name, description, type);
        this.behavior = Behavior.Embeded;
    }
    return ForEach;
}(Artifact));
var Util = (function () {
    function Util() {
    }
    Util.getElementWidthFromTextLength = function (name) {
        var maxLineLength = _.max(name.split('\n'), function (l) { return l.length; }).length;
        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 8;
        var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
        return width;
    };
    Util.getElementHeightFromTextLength = function (name) {
        var maxLineLength = _.max(name.split('\n'), function (l) { return l.length; }).length;
        // Compute width/height of the rectangle based on the number
        // of lines in the label and the letter size. 0.6 * letterSize is
        // an approximation of the monospace font letter width.
        var letterSize = 8;
        var height = 2 * ((name.split('\n').length + 1) * letterSize);
        return height;
    };
    return Util;
}());