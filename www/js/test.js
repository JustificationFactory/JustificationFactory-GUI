/**
 * Created by dell on 23/11/2016.
 */
/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
function testGraph(divGraph) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: divGraph,
        width: 1600,
        height: 1500,
        model: graph,
        gridSize: 1,
        interactive: true
    });
    var Conclusion = joint.shapes.basic.Rect.extend({
        defaults: _.defaultsDeep({
            size: { width: 200, height: 30 },
            attrs: { rect: { fill: '#CCCC00' }, text: { fill: 'white' } }
        }, joint.shapes.basic.Rect.prototype.defaults)
    });
    var Strategy = joint.shapes.basic.Path.extend({
        defaults: _.defaultsDeep({
            size: { width: 200, height: 30 },
            attrs: {
                path: { d: 'M 10 0 L 100 0 L 90 150 L 0 150 Z', fill: 'green' },
                text: { 'ref-y': .3, fill: 'white' }
            }
        }, joint.shapes.basic.Path.prototype.defaults)
    });
    var Support = joint.shapes.basic.Rect.extend({
        defaults: _.defaultsDeep({
            size: { width: 200, height: 30 },
            attrs: { rect: { fill: '#0080FF' }, text: { fill: 'white' } }
        }, joint.shapes.basic.Rect.prototype.defaults)
    });
    var tests = new Support({
        //position: { x: 580, y: 400 },
        attrs: { text: { text: 'Support 1' } }
    });
    var sourceCode = new Support({
        //position: { x: 820, y: 400 },
        attrs: { text: { text: 'Support 2' } }
    });
    var executeTests = new Strategy({
        //position: { x: 700, y: 300 },
        attrs: { text: { text: 'Strategy 1' } }
    });
    var testsCoverage = new Conclusion({
        //position: { x: 700, y: 200 },
        attrs: { text: { text: 'Conclusion 1' } }
    });
    var link1 = new joint.dia.Link({
        source: { id: tests.id },
        target: { id: executeTests.id },
        attrs: {
            link: { fill: 'blue' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
        }
    });
    var link2 = new joint.dia.Link({
        source: { id: sourceCode.id },
        target: { id: executeTests.id },
        attrs: {
            link: { fill: 'blue' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
        }
    });
    var link3 = new joint.dia.Link({
        source: { id: executeTests.id },
        target: { id: testsCoverage.id },
        attrs: {
            link: { fill: 'blue' },
            '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }
        }
    });
    graph.resetCells([tests, sourceCode, executeTests, testsCoverage, link1, link2, link3]);
    joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false, rankDir: 'BT', debugLevel: 3, rankSep: 50, edgeSep: 50, nodeSep: 50 });
}
//# sourceMappingURL=test.js.map