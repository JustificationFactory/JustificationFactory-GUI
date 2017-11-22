import {Actor, Conclusion, DiagramElement, Evidence, LinkElement, Rationale, Step, Strategy, Support} from './diagram';

export class KeyValueEvidence {
    constructor(public conclusionId: string, public evidence: Evidence) {

    }
}

export class ParseDiagramElementsResult {
    constructor(public listElements: DiagramElement[], public businessSteps: Array<Step>) {

    }
}

export class ParseJson2DiagramElements {
    globalJson: any;
    businessSteps: Array<Step>;

    constructor(globalJson: any) {
        this.globalJson = globalJson;
    }

    public getDiagramElements () : ParseDiagramElementsResult {
        let conclusions = new Array<Conclusion>();
        let strategies = new Array<Strategy>();
        let actors = new Array<Actor>();
        let rationales = new Array<Rationale>();
        let kvevidences = new Array<KeyValueEvidence>();
        let supports = new Array<Support>();
        let links = new Array<LinkElement>();

        this.businessSteps = new Array<Step>();

        for (let step  of this.globalJson.steps.step) {
            let businessStep = new Step(undefined);

            let nameOfConclusion = step.conclusion.name;
            let typeOfConclusion = step.conclusion.element.type;

            let conclusionN = new Conclusion(nameOfConclusion, [step.conclusion], typeOfConclusion);
            conclusions.push(conclusionN);
            conclusionN.stepId = businessStep.getStepId();
            businessStep.items.push(conclusionN);

            let nameOfstrategy = step.strategy.name;
            let typeOfstrategy = step.strategy.type;

            let strategyN = new Strategy(nameOfstrategy, [step.strategy], typeOfstrategy);
            strategies.push(strategyN);
            strategyN.stepId = businessStep.getStepId();
            businessStep.items.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));

            strategyN.artifacts = [];

           if (step.strategy.rationale) {
                let rationale = new Rationale("", [step.strategy.rationale][0], "");
                strategyN.artifacts.push(rationale);
                rationales.push(rationale);
                links.push(rationale.makeLinkWithParent(strategyN));
            }

            for(let evidenceRole of step.evidences.evidenceRoles) {
                let nameOfEvidence = evidenceRole.evidence.name;
                let typeOfEvidence = evidenceRole.evidence.element.type;

                let evidenceN = new Evidence(nameOfEvidence, [evidenceRole.evidence], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
                evidenceN.stepId = businessStep.getStepId();
                businessStep.items.push(evidenceN);
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }

            if ((step.strategy.type !== undefined) && (step.strategy.type.toLowerCase().indexOf('computed') >= 0)) {
                let actor = new Actor((step.strategy.actor !== undefined) ? step.strategy.actor.name : "", step.strategy.type, step.strategy.type);
                strategyN.artifacts.push(actor);
                actors.push(actor);
                links.push(actor.makeLinkWithParent(strategyN));
            }
            else if (step.strategy.actor) {
                let actor = new Actor(step.strategy.actor.name, step.strategy.actor, step.strategy.actor.role);
                strategyN.artifacts.push(actor);
                actors.push(actor);
                links.push(actor.makeLinkWithParent(strategyN));
            }

            this.businessSteps.push(businessStep);
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
                    supportl.stepId = conclusioni.stepId;

                    //Needed for deserialization. DO NOT add this one to graph!
                    let supportl2 = new Support(conclusioni, kvevidencej.evidence);
                    supportl2.visualShape = supportl.visualShape;
                    supportl2.stepId = kvevidencej.evidence.stepId;
                    for(let businessStep of this.businessSteps) {
                        if (supportl.stepId == businessStep.getStepId())
                            businessStep.items.push(supportl);
                        if (supportl2.stepId == businessStep.getStepId())
                            businessStep.items.push(supportl2);
                    }

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

        return new ParseDiagramElementsResult(elementsDiagram, this.businessSteps);
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

export class ImportDiagramWebService {

}


