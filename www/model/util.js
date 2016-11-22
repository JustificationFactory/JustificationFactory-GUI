function makeLink(parentElement, childElement) {
    return new joint.dia.Link({
        source: { id: parentElement.label },
        target: { id: childElement.label },
        attrs: { '.marker-target': { d: 'M 4 0 L 0 2 L 4 4 z' } }
    });
}

function makeElement(element, positionX, positionY) {
    var maxLineLength = _.max(element.label.split('\n'), function(l) { return l.length; }).length;
    // Compute width/height of the rectangle based on the number
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    var letterSize = 8;
    var width = 2 * (letterSize * (0.6 * maxLineLength + 1));
    var height = 2 * ((element.label.split('\n').length + 1) * letterSize);
    switch(element.type) {
        case "conclusion":
        case "evidence":
            return new joint.shapes.basic.Rect({
                id: element.label,
                size: { width: width, height: height },
                position: { x: positionX, y: positionY },
                attrs: { rect: { fill: '#CCCC00' }, text: { text: element.label, fill: 'white' } }
            });
            break;
        case "strategy":
            return new joint.shapes.basic.Path({
                id: element.label,
                position: { x: positionX, y: positionY },
                size: { width: width, height: height },
                attrs: {
                    path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                    text: { text: element.label, 'ref-y': .3, fill: 'white' }
                }
            });
        case "limitation":
            return new joint.shapes.basic.Rect({
                id: element.label,
                position: { x: positionX, y: positionY },
                size: { width: width, height: height },
                attrs: { rect: { fill: '#DF0606' }, text: { text: element.label, fill: 'white' } }
            });
            break;
    }
}