function Conclusion(label, posX, posY){
    this.label = label;
    this.type = "conclusion";
    this.element = makeElement(this, posX, posY);
    this.element.parent = this;
}

function Evidence(label, posX, posY){
    this.label = label;
    this.type = "evidence";
    this.element = makeElement(this, posX, posY);
    this.element.parent = this;
}

function Strategy(label, posX, posY){
    this.label = label;
    this.type = "strategy";
    this.element = makeElement(this, posX, posY);
    this.element.parent = this;
}

function Limitation(label, parent){
    this.label = label;
    this.type = "limitation";

    var parentPosX = parent.element.attributes.position.x;
    var parentPosY = parent.element.attributes.position.y;

    this.element = makeElement(this);
    this.element.parent = this;
}

function Member(x, y, rank, name, image, background, textColor) {
    textColor = textColor || "#000";
    var cell = new joint.shapes.org.Member({
        position: { x: x, y: y },
        attrs: {
            '.card': { fill: background, stroke: 'none'},
            image: { 'xlink:href': 'images/'+ image, opacity: 0.7 },
            '.rank': { text: rank, fill: textColor, 'word-spacing': '-5px', 'letter-spacing': 0},
            '.name': { text: name, fill: textColor, 'font-size': 13, 'font-family': 'Arial', 'letter-spacing': 0 }
        }
    });
    return cell;
};

function MemberLink(source, target, breakpoints) {

    var cell = new joint.shapes.org.Arrow({
        source: { id: source.id },
        target: { id: target.id },
        vertices: breakpoints,
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
    return cell;
}

