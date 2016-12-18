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
        let conclusions = new Array<Conclusion>();
        let strategies = new Array<Strategy>();
        let actors = new Array<Actor>();
        let rationales = new Array<Rationale>();
        let kvevidences = new Array<KeyValueEvidence>();
        let supports = new Array<Support>();
        let links = new Array<LinkElement>();

        for (let step  of this.globalJson.root.steps[0].step) {
            let nameOfConclusion = step.conclusion[0].name[0];
            let typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));

            let conclusionN = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            conclusions.push(conclusionN);

            let nameOfstrategy = step.strategy[0].name[0];
            let typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));

            let strategyN = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            strategies.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));

            strategyN.artifacts = [];

            if (step.strategy[0].rationale) {
                let rationale = new Rationale("", step.strategy[0].rationale[0], "");
                strategyN.artifacts.push(rationale);
                rationales.push(rationale);
                links.push(rationale.makeLinkWithParent(strategyN));
            }

            for(let evidenceRole of step.evidences[0].evidenceRoles) {
                let nameOfEvidence = evidenceRole.evidence[0].name[0];
                let typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));

                let evidenceN = new Evidence(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }

            if (step.strategy[0].actor) {
                let actor = new Actor(step.strategy[0].actor[0].name[0], step.strategy[0].actor[0], step.strategy[0].actor[0].role[0]);
                strategyN.artifacts.push(actor);
                actors.push(actor);
                links.push(actor.makeLinkWithParent(strategyN));
            }
        }

        //Merge where Conclusion == Evidence. Replace by Support.
        for(let i = conclusions.length -1 ; i >= 0 ; i--) {
            let conclusioni = conclusions[i];

            for(let j = kvevidences.length -1 ; j >= 0 ; j--) {
                let kvevidencej = kvevidences[j];

                if ((kvevidencej.conclusionId !== conclusioni.getId())
                    && (kvevidencej.evidence.name == conclusioni.name)) {

                    //Create Support object
                    let supportl = new Support(conclusioni, kvevidencej.evidence);
                    supports.push(supportl);

                    for(let k = links.length -1 ; k >= 0 ; k--) {
                        let linkk = links[k];

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


        let elementsDiagram: DiagramElement[] = [];

        //keep the order : rationales then evidences then actor => for alignment

        for(let conclusion of conclusions)
            elementsDiagram.push(conclusion);
        for(let strategy of strategies)
            elementsDiagram.push(strategy);
        for(let rationale of rationales)
            elementsDiagram.push(rationale);
        for(let kvevidence of kvevidences)
            elementsDiagram.push(kvevidence.evidence);
        for(let actor of actors)
            elementsDiagram.push(actor);
        for(let support of supports)
            elementsDiagram.push(support);
        for(let link of links)
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


