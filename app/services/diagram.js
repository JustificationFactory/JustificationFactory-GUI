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
var Cell = joint.dia.Cell;
var Graph = joint.dia.Graph;
var Diagram = (function () {
    function Diagram() {
        this._score = 0;
        if (Diagram._diagram) {
            throw new Error("Error: Instantiation failed: Use Diagram.getInstance() instead of new.");
        }
        Diagram._diagram = this;
    }
    Diagram.getInstance = function () {
        return Diagram._diagram;
    };
    Diagram.prototype.showDiagram = function (elements) {
        if (Diagram._graph == null) {
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
        var cells = [];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var el = elements_1[_i];
            cells.push(el.visualShape);
            for (var _a = 0, _b = el.artifacts; _a < _b.length; _a++) {
                var artifact = _b[_a];
                cells.push(artifact.visualShape);
                if (artifact.behavior == Behavior.Near) {
                    cells.push(artifact.makeLinkWithParent(el).visualShape);
                }
            }
        }
        Diagram._graph.resetCells(cells);
        joint.layout.DirectedGraph.layout(Diagram._graph, { setLinkVertices: false, rankDir: 'BT', debugLevel: 3, rankSep: 50, edgeSep: 50, nodeSep: 50 });
    };
    return Diagram;
}());
Diagram._diagram = new Diagram();
Diagram._graph = null;
var DiagramElement = (function () {
    function DiagramElement(name, jsonElement, type) {
        this.name = name;
        this.jsonElement = jsonElement;
        this.type = type;
        this.description = "";
        this.artifacts = [];
    }
    DiagramElement.prototype.makeLinkWithParent = function (parentElement) {
        return new LinkElement(this, parentElement);
    };
    DiagramElement.prototype.makeLinkWithChild = function (childElement) {
        return new LinkElement(childElement, this);
    };
    return DiagramElement;
}());
var Behavior;
(function (Behavior) {
    Behavior[Behavior["Embeded"] = 0] = "Embeded";
    Behavior[Behavior["Near"] = 1] = "Near";
})(Behavior || (Behavior = {}));
var LinkElement = (function (_super) {
    __extends(LinkElement, _super);
    function LinkElement(sourceElement, destinationElement) {
        var _this = _super.call(this, "", JSON.parse("{}"), "") || this;
        _this.sourceElement = sourceElement;
        _this.destinationElement = destinationElement;
        _this.visualShape = new joint.dia.Link({
            source: { id: sourceElement.visualShape.id },
            target: { id: destinationElement.visualShape.id },
            attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
            }
        });
        return _this;
    }
    return LinkElement;
}(DiagramElement));
var Support = (function (_super) {
    __extends(Support, _super);
    function Support(conclusion, evidence) {
        var _this = _super.call(this, name, conclusion.jsonElement, conclusion.type) || this;
        _this.conclusion = conclusion;
        _this.evidence = evidence;
        _this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
        return _this;
    }
    return Support;
}(DiagramElement));
var Conclusion = (function (_super) {
    __extends(Conclusion, _super);
    function Conclusion(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } },
            ports: {
                groups: {},
                items: []
            }
        });
        _this.artifacts = new Array();
        if (jsonElement.limits != null) {
            if (jsonElement.limits.length <= 2) {
                var pos = 'down';
                var i = 0;
                for (var _i = 0, _a = jsonElement.limits; _i < _a.length; _i++) {
                    var limit = _a[_i];
                    _this.artifacts.push(new Limitation(limit.code, limit, type));
                    if (i = 2) {
                        pos = "top";
                    }
                    else {
                        i++;
                    }
                    var port = {
                        id: limit.code,
                        group: 'a',
                        args: {},
                        label: {
                            position: {
                                name: pos,
                                args: {}
                            },
                            markup: '<text class="label-text" fill="blue"/>'
                        },
                        attrs: { rect: { fill: '#DF0606' }, text: { text: "text", fill: 'white', position: "center" } },
                        markup: '<rect width="50" height="30" stroke="red"/>'
                    };
                    _this.visualShape.addPort(port);
                }
            }
            else { }
        }
        return _this;
    }
    return Conclusion;
}(DiagramElement));
var Evidence = (function (_super) {
    __extends(Evidence, _super);
    function Evidence(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: { rect: { fill: '#CCCC00' }, text: { text: name, fill: 'white' } }
        });
        return _this;
    }
    return Evidence;
}(DiagramElement));
var Strategy = (function (_super) {
    __extends(Strategy, _super);
    function Strategy(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.visualShape = new joint.shapes.basic.Path({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name) },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                text: { text: name, 'ref-y': .3, fill: 'white' }
            }
        });
        _this.artifacts = _this.createArtifactsFromJson();
        return _this;
    }
    Strategy.prototype.createArtifactsFromJson = function () {
        var actor = new Actor(this.jsonElement.actor[0].name[0], this.jsonElement.actor[0], this.jsonElement.actor[0].role[0]);
        var rationale = new Rationale("", this.jsonElement.rationale[0], "");
        return [actor, rationale];
    };
    return Strategy;
}(DiagramElement));
var Artifact = (function (_super) {
    __extends(Artifact, _super);
    function Artifact(name, jsonElement, type) {
        return _super.call(this, name, jsonElement, type) || this;
    }
    Artifact.prototype.makeLinkWithParent = function (parentElement) {
        var link = new LinkElement(this, parentElement);
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
                '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
            }
        });
        return link;
    };
    return Artifact;
}(DiagramElement));
var Limitation = (function (_super) {
    __extends(Limitation, _super);
    function Limitation(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.behavior = Behavior.Embeded;
        _this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            //size: { width: width, height: height },
            attrs: { rect: { fill: '#DF0606' }, text: { text: name, fill: 'white' } }
        });
        return _this;
    }
    return Limitation;
}(Artifact));
var Rationale = (function (_super) {
    __extends(Rationale, _super);
    function Rationale(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.behavior = Behavior.Near;
        _this.visualShape = new joint.shapes.basic.Rect({
            id: Util.getNewGuid(),
            size: { width: Util.getElementWidthFromTextLength(jsonElement.axonicProject[0].pathology[0]),
                height: Util.getElementHeightFromTextLength(jsonElement.axonicProject[0].pathology[0]) },
            attrs: { rect: { fill: '#FFFFFF' }, text: { text: jsonElement.axonicProject[0].pathology[0], fill: 'black' } }
        });
        return _this;
    }
    return Rationale;
}(Artifact));
var Actor = (function (_super) {
    __extends(Actor, _super);
    function Actor(name, jsonElement, role) {
        var _this = _super.call(this, name, jsonElement, role) || this;
        _this.behavior = Behavior.Near;
        _this.visualShape = new joint.shapes.org.Member({
            attrs: {
                '.card': { fill: "#BBBBBB", stroke: 'none' },
                image: { 'xlink:href': 'images/User.ico', opacity: 0.7 },
                '.rank': { text: role, fill: "#000", 'word-spacing': '-5px', 'letter-spacing': 0 },
                '.name': { text: name, fill: "#000", 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
            },
            size: { width: Util.getElementWidthFromTextLength(role) + 50 }
        });
        return _this;
    }
    Actor.prototype.makeLinkWithParent = function (parentElement) {
        var link = new LinkElement(this, parentElement);
        link.visualShape = new joint.shapes.org.Arrow({
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
                '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' }
            }
        });
        return link;
    };
    return Actor;
}(Artifact));
var ForEach = (function (_super) {
    __extends(ForEach, _super);
    function ForEach(name, jsonElement, type) {
        var _this = _super.call(this, name, jsonElement, type) || this;
        _this.behavior = Behavior.Embeded;
        return _this;
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
    Util.getNewGuid = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        // then to call it, plus stitch in '4' in the third group
        return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    };
    return Util;
}());
//# sourceMappingURL=diagram.js.map