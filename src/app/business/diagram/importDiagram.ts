import {Actor, Conclusion, DiagramElement, Evidence, Rationale, Step, Strategy, Support} from './diagram';

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
  conclusions = [];
  strategies = [];
  actors = [];
  rationales = [];
  kvevidences = [];
  supports = [];
  links = [];

  constructor(globalJson: any) {
    this.businessSteps = [];
    this.globalJson = globalJson;
  }

  importStep(step: any): Step {
    const businessStep = new Step(undefined);

    const nameOfConclusion = step.conclusion.name;
    const typeOfConclusion = step.conclusion.element['@type'];

    const conclusionN = new Conclusion(nameOfConclusion, [step.conclusion], typeOfConclusion);
    this.conclusions.push(conclusionN);
    conclusionN.stepId = businessStep.getStepId();
    businessStep.items.push(conclusionN);

    const nameOfstrategy = step.strategy.name;
    const typeOfstrategy = step.strategy.type;
    try {
      const strategyN = new Strategy(nameOfstrategy, [step.strategy], typeOfstrategy);
      // TODO: pourquoi push avant de batîr?
      this.strategies.push(strategyN);
      strategyN.stepId = businessStep.getStepId();
      // TODO: push à deux endroits différents? mhhh..
      businessStep.items.push(strategyN);
      this.links.push(strategyN.makeLinkWithParent(conclusionN));

      strategyN.artifacts = [];

      if (step.strategy.rationale) {
        const rationale = new Rationale('', [step.strategy.rationale][0], '');
        strategyN.artifacts.push(rationale);
        this.rationales.push(rationale);
        this.links.push(rationale.makeLinkWithParent(strategyN));
      }


      for (const evidenceRole of step.evidenceRoles) {
        const nameOfEvidence = evidenceRole.support.name ? evidenceRole.support.name : '';
        const typeOfEvidence = evidenceRole.support.element ? evidenceRole.support.element.type : '';

        const evidenceN = new Evidence(nameOfEvidence, [evidenceRole.evidence], typeOfEvidence);
        this.kvevidences.push(new KeyValueEvidence(conclusionN.getId(), evidenceN));
        evidenceN.stepId = businessStep.getStepId();
        businessStep.items.push(evidenceN);
        this.links.push(evidenceN.makeLinkWithParent(strategyN));
      }

      if ((step.strategy.type !== undefined) && (step.strategy.type.toLowerCase().indexOf('computed') >= 0)) {
        const actor = new Actor((step.strategy.actor !== undefined)
          ? step.strategy.actor.name : '', step.strategy.type, step.strategy.type);
        strategyN.artifacts.push(actor);
        this.actors.push(actor);
        this.links.push(actor.makeLinkWithParent(strategyN));
      } else if (step.strategy.actor) {
        const actor = new Actor(step.strategy.actor.name, step.strategy.actor, step.strategy.actor.role);
        strategyN.artifacts.push(actor);
        this.actors.push(actor);
        this.links.push(actor.makeLinkWithParent(strategyN));
      }
    } catch (e) {
      console.log('Error occured while creating Strategy, aborted.');
      console.log(e);
    }

    return businessStep;
  }


  getDiagramElements(): ParseDiagramElementsResult {


    for (const step  of this.globalJson.steps) {
      this.businessSteps.push(this.importStep(step));
    }

    // Merge where Conclusion == Evidence. Replace by Support.
    for (let i = this.conclusions.length - 1; i >= 0; i--) {
      const conclusioni = this.conclusions[i];

      for (let j = this.kvevidences.length - 1; j >= 0; j--) {
        const kvevidencej = this.kvevidences[j];

        if ((kvevidencej.conclusionId !== conclusioni.getId())
          && (kvevidencej.evidence.name === conclusioni.name)) {

          // Create Support object
          const supportl = new Support(conclusioni, kvevidencej.evidence);
          this.supports.push(supportl);
          supportl.stepId = conclusioni.stepId;

          // Needed for deserialization. DO NOT add this one to graph!
          const supportl2 = new Support(conclusioni, kvevidencej.evidence);
          supportl2.visualShape = supportl.visualShape;
          supportl2.stepId = kvevidencej.evidence.stepId;
          for (const businessStep of this.businessSteps) {
            if (supportl.stepId === businessStep.getStepId()) {
              businessStep.items.push(supportl);
            }
            if (supportl2.stepId === businessStep.getStepId()) {
              businessStep.items.push(supportl2);
            }
          }

          for (let k = this.links.length - 1; k >= 0; k--) {
            const linkk = this.links[k];

            if (linkk.sourceElement.getId() === kvevidencej.evidence.getId()) {
              linkk.setSource(supportl);
            } else if (linkk.targetElement.getId() === conclusioni.getId()) {
              linkk.setTarget(supportl);
            }
          }

          // Remove Conclusion and Evidence
          this.conclusions.splice(i, 1);
          this.kvevidences.splice(j, 1);
        }
      }
    }

    const elementsDiagram: DiagramElement[] = [];

    // Keep the order : rationales then evidences then actor => for alignment

    for (const conclusion of this.conclusions) {
      elementsDiagram.push(conclusion);
    }

    for (const strategy of this.strategies) {
      elementsDiagram.push(strategy);
    }

    for (const rationale of this.rationales) {
      elementsDiagram.push(rationale);
    }

    for (const kvevidence of this.kvevidences) {
      elementsDiagram.push(kvevidence.evidence);
    }

    for (const actor of this.actors) {
      elementsDiagram.push(actor);
    }

    for (const support of this.supports) {
      elementsDiagram.push(support);
    }

    for (const link of this.links) {
      elementsDiagram.push(link);
    }

    return new ParseDiagramElementsResult(elementsDiagram, this.businessSteps);
  }

}
