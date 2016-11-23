/**
 * Created by dell on 23/11/2016.
 */
/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
function testGraph(idDiv) {
    var graph = new joint.dia.Graph;
    var paper = new joint.dia.Paper({
        el: $(idDiv),
        width: 1600,
        height: 1500,
        model: graph,
        gridSize: 1,
        interactive: false
    });
    var stimulation1 = new Evidence("Stimulation 1");
    var subject1 = new Evidence("Subject 1");
    var treat = new Strategy("Treat");
    var experimentation1 = new Conclusion("Experimentation 1");
    var experimentationResults = new Evidence("Experimentation results");
    var establishEffect = new Strategy("Establish effect");
    var effect1 = new Conclusion("Effect 1");
    var subject1Limitation = new Limitation("Subject 1 ", effect1);
    var stimulation1Limitation = new Limitation("Stimulation 1 ", effect1);
    var user1 = new Member(300, 180, 'Chief surgeon', 'Mr X Y', 'User.ico', '#CCCCCC');
    var user2 = new Member(300, 380, 'Surgeon', 'Mme A B', 'User.ico', '#CCCCCC');
    var link1 = makeLink(stimulation1, treat);
    var link2 = makeLink(subject1, treat);
    var link3 = makeLink(treat, experimentation1);
    var link4 = makeLink(experimentation1, establishEffect);
    var link5 = makeLink(experimentationResults, establishEffect);
    var link6 = makeLink(establishEffect, effect1);
    var link7 = new MemberLink(user1, establishEffect.element);
    var link8 = new MemberLink(user2, treat.element);
    graph.addCells([stimulation1.element,
        subject1.element,
        treat.element,
        experimentation1.element,
        experimentationResults.element,
        establishEffect.element,
        effect1.element,
        subject1Limitation.element,
        stimulation1Limitation.element,
        user1,
        user2,
        link1,
        link2,
        link3,
        link4,
        link5,
        link6,
        link7,
        link8
    ]);
    joint.layout.DirectedGraph.layout(graph, { setLinkVertices: false, rankDir: 'BT', debugLevel: 3, rankSep: 50, edgeSep: 50, nodeSep: 50 });
}
//# sourceMappingURL=test.js.map