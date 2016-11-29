/// <reference path=".\diagram.ts" />

class KeyValueEvidence {
    constructor(public conclusionId: string, public evidence: Evidence) {

    }
}

class ParseJson2DiagramElements {
    globalJson: any;

    constructor(globalJson: any) {

        this.globalJson = globalJson;
    }

    public getDiagramElements () : DiagramElement[] {

        var conclusions = new Array<Conclusion>();
        var strategies = new Array<Strategy>();
        var kvevidences = new Array<KeyValueEvidence>();
        var supports = new Array<Support>();
        var links = new Array<LinkElement>();

        for (var step  of this.globalJson.root.steps[0].step) {
            var nameOfConclusion = step.conclusion[0].name[0];
            var typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));

            var conclusionN = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            conclusions.push(conclusionN);

            var nameOfstrategy = step.strategy[0].name[0];
            var typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));

            var strategyN = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            strategies.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));

            for(var evidenceRole of step.evidences[0].evidenceRoles) {
                var nameOfEvidence = evidenceRole.evidence[0].name[0];
                var typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));

                var evidenceN = new Evidence(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }
        }

        //Merge where Conclusion == Evidence. Replace by Support.
        for(var i = conclusions.length -1 ; i >= 0 ; i--) {
            var conclusioni = conclusions[i];

            for(var j = kvevidences.length -1 ; j >= 0 ; j--) {
                var kvevidencej = kvevidences[j];

                if ((kvevidencej.conclusionId !== conclusioni.getId())
                    && (kvevidencej.evidence.name == conclusioni.name)) {

                    //Create Support object
                    var supportl = new Support(conclusioni, kvevidencej.evidence);
                    supports.push(supportl);

                    for(var k = links.length -1 ; k >= 0 ; k--) {
                        var linkk = links[k];

                        if (linkk.sourceElement.getId() === kvevidencej.evidence.getId()) {
                            linkk.setSource(supportl);
                        }
                        else if (linkk.targetElement.getId() === conclusioni.getId()) {
                            linkk.setTarget(supportl);
                        }
                    }

                    //Remove Conclusion and Evidence
                    conclusions.splice(i, 1);
                    kvevidences.splice(j, 1);
                }
            }
        }


        var elementsDiagram: DiagramElement[] = [];

        for(var conclusion of conclusions)
            elementsDiagram.push(conclusion);
        for(var strategy of strategies)
            elementsDiagram.push(strategy);
        for(var kvevidence of kvevidences)
            elementsDiagram.push(kvevidence.evidence);
        for(var support of supports)
            elementsDiagram.push(support);
        for(var link of links)
            elementsDiagram.push(link);

        return elementsDiagram;
    }

    private getTypeFromStringAttributs (strAttributs : string) : string {

        var type = "";

        try {
            var index1 = strAttributs.indexOf('"xsi:type":"') + 12;
            var str1 = strAttributs.substring(index1);
            var index2 = str1.indexOf('"');
            type = str1.substring(0, index2);
        }
        catch (e) {

        }

        return type;
    }
}

class ImportDiagramWebService {

}


