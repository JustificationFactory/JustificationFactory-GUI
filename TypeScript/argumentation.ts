/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
/// <reference path="..\TypeScript\model\diagram.ts" />



function testGraph(divGraph : any) {
    var graph = new joint.dia.Graph;

    var paper = new joint.dia.Paper({
        el: $('#myholder'),
        width: 1600,
        height: 1500,
        model: graph,
        gridSize: 1,
        interactive: false
    });

    var stimulation1 = new Evidence("Stimulation 1",null,"");
    var subject1 = new Evidence("Subject 1",null,"");
    var treat = new Strategy("Treat",null,"");
    var experimentation1 = new Conclusion("Experimentation 1",null,"");
    var experimentationResults = new Evidence("Experimentation results",null,"");
    var establishEffect = new Strategy("Establish effect",null,"");
    var effect1 = new Conclusion("Effect 1",null,"");

    var subject1Limitation = new Limitation("Subject 1 ", null,"");
    var stimulation1Limitation = new Limitation("Stimulation 1 ", null,"");

    var user1 = new Actor('Mr X Y', 'expert 1');
    var user2 = new Actor('Mr A B', 'expert 2');

    var link1 = stimulation1.makeLinkWithParent(treat);
    var link2 = subject1.makeLinkWithParent(treat);
    var link3 = treat.makeLinkWithParent(experimentation1);
    var link4 = experimentation1.makeLinkWithParent(establishEffect);
    var link5 = experimentationResults.makeLinkWithParent(establishEffect);
    var link6 = establishEffect.makeLinkWithParent(effect1);
    var link7 = user1.makeLinkWithParent(establishEffect);
    var link8 = user2.makeLinkWithParent(treat);

    graph.addCells([stimulation1.visualShape,
        subject1.visualShape,
        treat.visualShape,
        experimentation1.visualShape,
        experimentationResults.visualShape,
        establishEffect.visualShape,
        effect1.visualShape,
        subject1Limitation.visualShape,
        stimulation1Limitation.visualShape,
        user1.visualShape,
        user2.visualShape,
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
