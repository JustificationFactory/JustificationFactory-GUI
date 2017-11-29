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

  public getDiagramElements(): ParseDiagramElementsResult {
    const conclusions = new Array<Conclusion>();
    const strategies = new Array<Strategy>();
    const actors = new Array<Actor>();
    const rationales = new Array<Rationale>();
    const kvevidences = new Array<KeyValueEvidence>();
    const supports = new Array<Support>();
    const links = new Array<LinkElement>();

    this.businessSteps = new Array<Step>();

    for (const step  of this.globalJson.steps) {
      const businessStep = new Step(undefined);

      const nameOfConclusion = step.conclusion.name;
      const typeOfConclusion = step.conclusion.element["@type"];

      const conclusionN = new Conclusion(nameOfConclusion, [step.conclusion], typeOfConclusion);
      conclusions.push(conclusionN);
      conclusionN.stepId = businessStep.getStepId();
      businessStep.items.push(conclusionN);

      const nameOfstrategy = step.strategy.name;
      const typeOfstrategy = step.strategy.type;
      try {
        const strategyN = new Strategy(nameOfstrategy, [step.strategy], typeOfstrategy);
        // TODO: pourquoi push avant de batîr?
        strategies.push(strategyN);
        strategyN.stepId = businessStep.getStepId();
        // TODO: push à deux endroits différents? mhhh..
        businessStep.items.push(strategyN);
        links.push(strategyN.makeLinkWithParent(conclusionN));

        strategyN.artifacts = [];

        if (step.strategy.rationale) {
          const rationale = new Rationale('', [step.strategy.rationale][0], '');
          strategyN.artifacts.push(rationale);
          rationales.push(rationale);
          links.push(rationale.makeLinkWithParent(strategyN));
        }


        for (const evidenceRole of step.evidenceRoles) {
          const nameOfEvidence = evidenceRole.support.name ? evidenceRole.support.name : "" ;
          const typeOfEvidence = evidenceRole.support.element ? evidenceRole.support.element.type : "";

          const evidenceN = new Evidence(nameOfEvidence, [evidenceRole.evidence], typeOfEvidence);
          kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
          evidenceN.stepId = businessStep.getStepId();
          businessStep.items.push(evidenceN);
          links.push(evidenceN.makeLinkWithParent(strategyN));
        }

        if ((step.strategy.type !== undefined) && (step.strategy.type.toLowerCase().indexOf('computed') >= 0)) {
          const actor = new Actor((step.strategy.actor !== undefined) ? step.strategy.actor.name : '', step.strategy.type, step.strategy.type);
          strategyN.artifacts.push(actor);
          actors.push(actor);
          links.push(actor.makeLinkWithParent(strategyN));
        }
        else if (step.strategy.actor) {
          const actor = new Actor(step.strategy.actor.name, step.strategy.actor, step.strategy.actor.role);
          strategyN.artifacts.push(actor);
          actors.push(actor);
          links.push(actor.makeLinkWithParent(strategyN));
        }
      } catch (e) {
        console.log('Error occured while creating Strategy, aborted.');
        console.log(e);
      }

      this.businessSteps.push(businessStep);
    }

    //Merge where Conclusion == Evidence. Replace by Support.
    for (let i = conclusions.length - 1; i >= 0; i--) {
      const conclusioni = conclusions[i];

      for (let j = kvevidences.length - 1; j >= 0; j--) {
        const kvevidencej = kvevidences[j];

        if ((kvevidencej.conclusionId !== conclusioni.getId())
          && (kvevidencej.evidence.name === conclusioni.name)) {

          //Create Support object
          const supportl = new Support(conclusioni, kvevidencej.evidence);
          supports.push(supportl);
          supportl.stepId = conclusioni.stepId;

          //Needed for deserialization. DO NOT add this one to graph!
          const supportl2 = new Support(conclusioni, kvevidencej.evidence);
          supportl2.visualShape = supportl.visualShape;
          supportl2.stepId = kvevidencej.evidence.stepId;
          for (const businessStep of this.businessSteps) {
            if (supportl.stepId === businessStep.getStepId())
              businessStep.items.push(supportl);
            if (supportl2.stepId === businessStep.getStepId())
              businessStep.items.push(supportl2);
          }

          for (let k = links.length - 1; k >= 0; k--) {
            const linkk = links[k];

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


    const elementsDiagram: DiagramElement[] = [];

    //keep the order : rationales then evidences then actor => for alignment

    for (const conclusion of conclusions)
      elementsDiagram.push(conclusion);
    for (const strategy of strategies)
      elementsDiagram.push(strategy);
    for (const rationale of rationales)
      elementsDiagram.push(rationale);
    for (const kvevidence of kvevidences)
      elementsDiagram.push(kvevidence.evidence);
    for (const actor of actors)
      elementsDiagram.push(actor);
    for (const support of supports)
      elementsDiagram.push(support);
    for (const link of links)
      elementsDiagram.push(link);

    return new ParseDiagramElementsResult(elementsDiagram, this.businessSteps);
  }

  // TODO: unused
  private getTypeFromStringAttributs(strAttributs: string): string {

    let type = '';

    try {
      const index1 = strAttributs.indexOf('"xsi:type":"') + 12;
      const str1 = strAttributs.substring(index1);
      const index2 = str1.indexOf('"');
      type = str1.substring(0, index2);
    }
    catch (e) {

    }

    return type;
  }
}

// TODO: unused
export class ImportDiagramWebService {

}


