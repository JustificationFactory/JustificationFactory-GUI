import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  Actor,
  Behavior,
  Conclusion,
  DiagramElement,
  Evidence,
  Rationale,
  Step,
  Strategy,
  Support
} from '../../../business/diagram/diagram';
import {dia} from "jointjs";

@Component({
  selector: 'actionstoolbar-view',
  templateUrl: './actions.toolbar.component.html'
})
export class ActionsToolbarComponent {
  private currentElement: DiagramElement;
  private nbNewSteps = 0;
  private nbNewEvidences = 0;
  @Input() selectedElement: DiagramElement = null;
  @Input() _graph: joint.dia.Graph = null;
  @Input() _paper: joint.dia.Paper = null;

  @Input() businessSteps: Array<Step> = null;
  @Output() stepChange: EventEmitter<DiagramElement> = new EventEmitter(); // For two-way binding (ex: prop1Change)

  private disabled: boolean = this.disableRemoveNode();
  private inboundLinks: dia.Link[];
  private currentComponent: ActionsToolbarComponent;

  public setElement(diagramElement: DiagramElement) {
    this.currentElement = diagramElement;
    this.updateButtons();
  }

  private updateButtons() {

  }

  public removeElement(event) {
    if (!this.disableRemoveNode()) {

      //console.log("business_steps before remove : " + JSON.stringify(this.businessSteps));

      const confirmDelete = confirm('Do you want to delete this element ?');
      if (confirmDelete == true) {

        this.removeStep(this.selectedElement, this.selectedElement.visualShape.id);

        const evidence = new Evidence(this.selectedElement.name, this.selectedElement.jsonElement, this.selectedElement.type);
        evidence.visualShape = this.selectedElement.visualShape;
        (this._graph.getCell(evidence.visualShape.id) as any).parent = evidence;
        evidence.artifacts = this.selectedElement.artifacts;

        const outboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {outbound: true});
        const sourceId = outboundLinks[0].get('target').id;
        evidence.stepId = (this._graph.getCell(sourceId) as any).parent.stepId;

        this.selectedElement = evidence;
        //console.log(this.selectedElement.stepId);

        this.stepChange.emit();
        //console.log("business_steps after remove : " + JSON.stringify(this.businessSteps));
      }
    }
  }

  public removeStep(rootElement, rootElementId) {
    this.removeFromBusiness(rootElement.name);
    const inboundLinks = this._graph.getConnectedLinks(rootElement.visualShape, {inbound: true});
    const currentComponent = this;
    inboundLinks.forEach(function (inboundLink) {
      const sourceId = inboundLink.get('source').id;
      if (sourceId) {
        const source = (currentComponent._graph.getCell(sourceId) as any).parent;
        //currentComponent.removeFromBusiness(source.name);
        currentComponent.removeStep(source, rootElementId);

      }
    });
    if (rootElement.visualShape.parent)
      if (rootElement.visualShape.id != rootElementId)
        rootElement.visualShape.remove();

  }

  public removeFromBusiness(name) {

    for (let i = 0; i < this.businessSteps.length; i++) {
      const step = this.businessSteps[i];
      elements:
        for (const elementKey in step.items) {
          const elementValue = step.items[elementKey];
          if (elementValue.name == name && elementValue.constructor.name == 'Conclusion') {
            this.businessSteps.splice(i, 1);
            break elements;
          }
        }
    }
    let visualShapeSupport;
    let artifactsSupport;
    for (let i = 0; i < this.businessSteps.length; i++) {
      const step = this.businessSteps[i];
      elements:
        for (const elementKey in step.items) {
          const elementValue = step.items[elementKey];
          if (elementValue.name == name && elementValue.constructor.name == 'Support') {
            visualShapeSupport = elementValue.visualShape;
            artifactsSupport = elementValue.artifacts;
            step.items.splice(step.items.indexOf(elementValue), 1);
            break elements;
          }
        }
    }

    /*        for (var i = 0; i < this.businessSteps.length; i++){
                var step = this.businessSteps[i];
                    for (var elementKey in step.items){
                        var elementValue = step.items[elementKey];
                        if(elementValue.name == name && elementValue.constructor.name == "Evidence"){
                            elementValue.visualShape = visualShapeSupport;
                            elementValue.artifacts = artifactsSupport;
                        }
                    }
            }*/
  }

  public disableRemoveNode(): boolean {
    let disable = (this.selectedElement == null);

    if (!disable) {
      if (!(this.selectedElement instanceof Support))
        disable = true;
    }

    return disable;
  }

  public disableAddSubStep(): boolean {
    let disable = (this.selectedElement == null);

    if (!disable) {
      if (!(this.selectedElement instanceof Evidence))
        disable = true;
    }

    return disable;
  }

  public disableAddEvidence(): boolean {
    let disable = (this.selectedElement == null);

    if (!disable) {
      if (!(this.selectedElement instanceof Strategy))
        disable = true;
    }

    return disable;
  }

  public disableAddRootStep(): boolean {
    let disable = (this.selectedElement == null);

    if (!disable) {
      if (!(this.selectedElement instanceof Conclusion))
        disable = true;
    }

    return disable;
  }

  public disableRemoveEvidence(): boolean {
    let disable = (this.selectedElement == null);

    if (!disable) {
      if ((this.selectedElement instanceof Evidence)) {
        const evidenceOutboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {outbound: true});
        const strategyId = evidenceOutboundLinks[0].get('target').id;
        const strategy = (this._graph.getCell(strategyId) as any).parent;

        const inboundLinks = this._graph.getConnectedLinks(strategy.visualShape, {inbound: true});
        const currentComponent = this;
        let nbEvidences = 0;
        inboundLinks.forEach(function (inboundLink) {
          const sourceId = inboundLink.get('source').id;
          if (sourceId) {
            const source = (currentComponent._graph.getCell(sourceId) as any).parent;
            if (source instanceof Evidence || source instanceof Support) {
              nbEvidences++;
            }
          }
        });
        if (nbEvidences < 2)
          disable = true;
      }
      else {
        disable = true;
      }
    }
    return disable;
  }

  public addSubStep() {
    if (!this.disableAddSubStep()) {

      if (sessionStorage.getItem('nbNewSteps'))
        this.nbNewSteps = Number(sessionStorage.getItem('nbNewSteps'));

      //***************** CREATE ELEMENTS *******************
      //*****************************************************
      const actorJsonElement = {
        'name': 'Actor',
        'role': 'Role',
      };

      const rationaleJsonElement = {
        'axonicProject': {
          'pathology': 'pathology',
          'stimulator': 'stimulator'
        }
      };

      const strategyJsonElement = [{
        'name': '[Strategy ' + this.nbNewSteps + ']',
        'type': 'humanStrategy',
        'rationale': rationaleJsonElement,
        'actor': actorJsonElement

      }];
      const strategy = new Strategy(strategyJsonElement);
      const link1 = strategy.makeLinkWithParent(this.selectedElement);

      const evidenceJsonElement = [{
        name: '[Evidence ' + this.nbNewSteps + ']',
        element: {
          type: 'Type',
        }
      }];
      const evidence = new Evidence('[Evidence ' + this.nbNewSteps + ']', evidenceJsonElement, 'Type');
      const link2 = evidence.makeLinkWithParent(strategy);


      const actor = new Actor('Actor', actorJsonElement, 'Role');
      actor.behavior = Behavior.Near;
      const link3 = actor.makeLinkWithParent(strategy);


      const rationale = new Rationale('', rationaleJsonElement, '');
      rationale.behavior = Behavior.Near;
      const link4 = rationale.makeLinkWithParent(strategy);

      strategy.visualShape.embed(actor.visualShape);
      strategy.visualShape.embed(rationale.visualShape);

      //***************** POSITION ELEMENTS *******************
      //*******************************************************

      (strategy.visualShape as any).position((this.selectedElement.visualShape as any).attributes.position.x, (this.selectedElement.visualShape as any).attributes.position.y + 80);
      (evidence.visualShape as any).position((strategy.visualShape as any).attributes.position.x, (strategy.visualShape as any).attributes.position.y + 80);

      (actor.visualShape as any).position((strategy.visualShape as any).attributes.position.x - actor.visualShape.prop('size/width') - 50,
        (strategy.visualShape as any).attributes.position.y - 20);

      (rationale.visualShape as any).position((strategy.visualShape as any).attributes.position.x + rationale.visualShape.prop('size/width') + 50,
        (strategy.visualShape as any).attributes.position.y);

      //***************** ADD ELEMENTS TO GRAPH ***************
      //*******************************************************

      this._graph.addCells([strategy.visualShape,
        link1.visualShape,
        evidence.visualShape,
        link2.visualShape,
        actor.visualShape,
        link3.visualShape,
        rationale.visualShape,
        link4.visualShape
      ]);

      //***************** POSITION SUBGRAPH *******************
      //*******************************************************

      // récupérer strategy associé au selectedElement

      const outboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {outbound: true});

      const sourceId = outboundLinks[0].get('target').id;
      const currentStrategy = (this._graph.getCell(sourceId) as any).parent;
      console.log('currentStrategy : ' + currentStrategy.name);

      //calculer dist = max[dist(strategy, rationale), dist(strategy, actor)]
      let dist = Math.abs((rationale.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x);
      if (dist < Math.abs((actor.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x))
        dist = Math.abs((actor.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x);

      // translatepaperwidth sera égale à dist si on translate un sous graphe à droite.
      let translatePaperWidth = 0;

      // récupérer tous les évidences associés à cette strategy
      const inboundLinks = this._graph.getConnectedLinks(currentStrategy.visualShape, {inbound: true});

      const currentComponent = this;
      inboundLinks.forEach(function (inboundLink) {
        //alert(inboundLink.get('source'));
        const sourceId = inboundLink.get('source').id;
        if (sourceId) {
          const source = (currentComponent._graph.getCell(sourceId) as any).parent;
          if (source instanceof Evidence || source instanceof Support) {

            // identifier les évidences qui sont à droite de celle choisi (via position)
            if ((source.visualShape as any).attributes.position.x > (currentComponent.selectedElement.visualShape as any).attributes.position.x) {
              //console.log("name : " + source.name);
              translatePaperWidth = dist;
              currentComponent.translateSubGraphToRight(source, dist + rationale.visualShape.prop('size/width'));
              currentComponent.translateTree(currentStrategy, dist + rationale.visualShape.prop('size/width'));
            }
          }
        }
      });

      //********* CREATE CONCLUSION FROM EVIDENCE *************

      const conclusion = new Conclusion(this.selectedElement);


      //************* SWITCH EVIDENCE TO SUPPORT **************
      //*******************************************************

      const support = new Support(conclusion, this.selectedElement);
      support.visualShape = this.selectedElement.visualShape;
      (this._graph.getCell(support.visualShape.id) as any).parent = support;

      //************* INCREASE PAPER DIMENSTION ***************
      //*******************************************************

      this._paper.setDimensions(this._paper.options.width + translatePaperWidth, this._paper.options.height + 160);

      //**************** ADD STEP TO BUSINESS *****************
      //*******************************************************

      this.addStepToBusiness(conclusion, strategy, evidence, rationale, actor, support);
      //console.log("Business steps after add new step : " + JSON.stringify(this.businessSteps));

      //************* EMIT EVENT TO DIAGRAM COMPONENT *********
      //*******************************************************

      this.stepChange.emit(this.selectedElement);

      this.nbNewSteps++;
      sessionStorage.setItem('nbNewSteps', this.nbNewSteps + '');
    }
  }

  public addEvidence() {
    if (!this.disableAddEvidence()) {

      console.log('nbNewEvidences : ' + sessionStorage.getItem('nbNewEvidences'));
      if (sessionStorage.getItem('nbNewEvidences'))
        this.nbNewEvidences = Number(sessionStorage.getItem('nbNewEvidences'));

      //***************** CREATE EVIDENCE *******************
      //*****************************************************

      const evidenceJsonElement = [{
        name: '[New Evidence ' + this.nbNewEvidences + ']',
        element: {
          type: 'Type',
        }
      }];
      const evidence = new Evidence('[New Evidence ' + this.nbNewEvidences + ']', evidenceJsonElement, 'Type');

      //***************** POSITION ELEMENTS *******************
      //*******************************************************

      // récupérer tous les évidences associés à cette strategy
      this.inboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {inbound: true});

      this.currentComponent = this;
      let leftSupport = null;
      this.inboundLinks.forEach(function (inboundLink) {
        //alert(inboundLink.get('source'));
        const sourceId = inboundLink.get('source').id;
        if (sourceId) {
          const source = (currentComponent._graph.getCell(sourceId) as any).parent;
          if (source instanceof Evidence || source instanceof Support) {
            if (leftSupport == null)
              leftSupport = source;
            // identifier l'évidence à gauche
            if ((source.visualShape as any).attributes.position.x < (leftSupport.visualShape as any).attributes.position.x) {
              leftSupport = source;
            }
          }
        }
      });

      (evidence.visualShape as any).position((leftSupport.visualShape as any).attributes.position.x - 1, (leftSupport.visualShape as any).attributes.position.y);
      const link = evidence.makeLinkWithParent(this.selectedElement);
      //***************** ADD ELEMENTS TO GRAPH ***************
      //*******************************************************

      this._graph.addCells([evidence.visualShape,
        link.visualShape
      ]);

      //***************** POSITION SUBGRAPH *******************
      //*******************************************************

      // translatepaperwidth sera égale à dist si on translate un sous graphe à droite.
      let translatePaperWidth = 0;

      // récupérer tous les évidences associés à cette strategy
      const inboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {inbound: true});

      const currentComponent = this;
      let translateTree = false;
      inboundLinks.forEach(function (inboundLink) {
        const sourceId = inboundLink.get('source').id;
        if (sourceId) {
          const source = (currentComponent._graph.getCell(sourceId) as any).parent;
          if (source instanceof Evidence || source instanceof Support) {

            // identifier les évidences qui sont à droite de celle choisi (via position)
            if ((source.visualShape as any).attributes.position.x > (evidence.visualShape as any).attributes.position.x) {
              //console.log("name : " + source.name);
              translatePaperWidth = 100;
              translateTree = true;
              currentComponent.translateSubGraphToRight(source, 35 + evidence.visualShape.prop('size/width'));

            }
          }
        }
      });

      if (translateTree)
        this.translateTree(this.selectedElement, 35 + evidence.visualShape.prop('size/width'));

      //************* INCREASE PAPER DIMENSTION ***************
      //*******************************************************

      this._paper.setDimensions(this._paper.options.width + translatePaperWidth, this._paper.options.height + 160);

      //**************** ADD STEP TO BUSINESS *****************
      //*******************************************************

      this.addEvidenceToBusiness(evidence);
      //console.log("Business steps after add new step : " + JSON.stringify(this.businessSteps));

      //************* EMIT EVENT TO DIAGRAM COMPONENT *********
      //*******************************************************

      this.stepChange.emit(this.selectedElement);

      this.nbNewEvidences++;
      sessionStorage.setItem('nbNewEvidences', this.nbNewEvidences + '');
    }
  }

  public addRootStep() {
    if (!this.disableAddRootStep()) {

      if (sessionStorage.getItem('nbNewSteps'))
        this.nbNewSteps = Number(sessionStorage.getItem('nbNewSteps'));

      //***************** CREATE ELEMENTS *******************
      //*****************************************************

      const conclusionJsonElement = [{
        name: '[Conclusion ' + this.nbNewSteps + ']',
        element: {
          type: 'Type',
        }
      }];
      // TODO: probablement fait n'importe quoi cf screen
      const conclusion = new Conclusion(conclusionJsonElement);

      const actorJsonElement = {
        'name': 'Actor',
        'role': 'Role',
      };

      const rationaleJsonElement = {
        'axonicProject': {
          'pathology': 'pathology',
          'stimulator': 'stimulator'
        }
      };

      const strategyJsonElement = [{
        'name': '[Strategy ' + this.nbNewSteps + ']',
        'type': 'humanStrategy',
        'rationale': rationaleJsonElement,
        'actor': actorJsonElement

      }];
      const strategy = new Strategy(strategyJsonElement);
      const link1 = strategy.makeLinkWithParent(conclusion);
      const link2 = this.selectedElement.makeLinkWithParent(strategy);


      const actor = new Actor('Actor', actorJsonElement, 'Role');
      actor.behavior = Behavior.Near;
      const link3 = actor.makeLinkWithParent(strategy);


      const rationale = new Rationale('', rationaleJsonElement, '');
      rationale.behavior = Behavior.Near;
      const link4 = rationale.makeLinkWithParent(strategy);

      strategy.visualShape.embed(actor.visualShape);
      strategy.visualShape.embed(rationale.visualShape);

      //******** TRANSLATE ALL THE GRAPH INTO BOTTOM **********
      //*******************************************************

      for (const g of this._graph.getCells()) {
        if ((g as any).parent)
          (g as any).position((g as any).attributes.position.x, (g as any).attributes.position.y + 160);
      }

      //***************** POSITION ELEMENTS *******************
      //*******************************************************

      (strategy.visualShape as any).position((this.selectedElement.visualShape as any).attributes.position.x, (this.selectedElement.visualShape as any).attributes.position.y - 80);
      (conclusion.visualShape as any).position((strategy.visualShape as any).attributes.position.x, (strategy.visualShape as any).attributes.position.y - 80);

      (actor.visualShape as any).position((strategy.visualShape as any).attributes.position.x - actor.visualShape.prop('size/width') - 50,
        (strategy.visualShape as any).attributes.position.y - 20);

      (rationale.visualShape as any).position((strategy.visualShape as any).attributes.position.x + rationale.visualShape.prop('size/width') + 50,
        (strategy.visualShape as any).attributes.position.y);

      //***************** ADD ELEMENTS TO GRAPH ***************
      //*******************************************************

      this._graph.addCells([strategy.visualShape,
        conclusion.visualShape,
        link1.visualShape,
        link2.visualShape,
        actor.visualShape,
        link3.visualShape,
        rationale.visualShape,
        link4.visualShape
      ]);

      //********* CREATE EVIDENCE FROM CONCLUSION *************

      const evidence = new Evidence(this.selectedElement.name, this.selectedElement.jsonElement, this.selectedElement.type);
      evidence.artifacts = this.selectedElement.artifacts;
      //************* SWITCH CONCLUSION TO SUPPORT **************
      //*******************************************************

      const support = new Support(this.selectedElement, evidence);
      support.visualShape = this.selectedElement.visualShape;
      (this._graph.getCell(support.visualShape.id) as any).parent = support;
      support.artifacts = this.selectedElement.artifacts;

      //************* INCREASE PAPER DIMENSTION ***************
      //*******************************************************

      this._paper.setDimensions(this._paper.options.width, this._paper.options.height + 160);

      //**************** ADD STEP TO BUSINESS *****************
      //*******************************************************

      this.addStepToBusiness(conclusion, strategy, evidence, rationale, actor, support);
      //console.log("Business steps after add new step : " + JSON.stringify(this.businessSteps));

      //************* EMIT EVENT TO DIAGRAM COMPONENT *********
      //*******************************************************
      this.stepChange.emit(this.selectedElement);

      this.nbNewSteps++;
      sessionStorage.setItem('nbNewSteps', this.nbNewSteps + '');
    }
  }

  public removeEvidence() {
    if (!this.disableRemoveEvidence()) {
      steps:
        for (let i = 0; i < this.businessSteps.length; i++) {
          const step = this.businessSteps[i];
          if (step.getStepId() == this.selectedElement.stepId) {
            for (const elementKey in step.items) {
              const elementValue = step.items[elementKey];
              if (elementValue.name == this.selectedElement.name && elementValue.constructor.name == 'Evidence') {
                step.items.splice(step.items.indexOf(elementValue), 1);
                break steps;
              }
            }
          }

        }
      this.selectedElement.visualShape.remove();
      this.selectedElement = null;
    }
  }

  public translateSubGraphToRight(rootElement, distance) {
    (rootElement.visualShape as any).position((rootElement.visualShape as any).attributes.position.x + distance, (rootElement.visualShape as any).attributes.position.y);
    const inboundLinks = this._graph.getConnectedLinks(rootElement.visualShape, {inbound: true});
    const currentComponent = this;
    inboundLinks.forEach(function (inboundLink) {
      //alert(inboundLink.get('source'));
      const sourceId = inboundLink.get('source').id;
      const source = (currentComponent._graph.getCell(sourceId) as any).parent;
      console.log('name : ' + source.name);
      currentComponent.translateSubGraphToRight(source, distance);
    });
  }

  public translateTree(strategyElement, distance) {
    //this.translateSubGraphToRight(rootElement, distance);

    // Selectionner le support parent de cette strategy
    const strategyOutboundLinks = this._graph.getConnectedLinks(strategyElement.visualShape, {outbound: true});
    const supportId = strategyOutboundLinks[0].get('target').id;
    const support = (this._graph.getCell(supportId) as any).parent;
    if (!(support instanceof Conclusion)) {
      // Selectionner la strategy parent de ce support
      const supportOutboundLinks = this._graph.getConnectedLinks(support.visualShape, {outbound: true});
      const strategyId = supportOutboundLinks[0].get('target').id;
      const strategy = (this._graph.getCell(strategyId) as any).parent;

      const inboundLinks = this._graph.getConnectedLinks(strategy.visualShape, {inbound: true});
      const currentComponent = this;
      inboundLinks.forEach(function (inboundLink) {
        const sourceId = inboundLink.get('source').id;
        if (sourceId) {
          const source = (currentComponent._graph.getCell(sourceId) as any).parent;
          if (source instanceof Evidence || source instanceof Support) {

            // identifier les évidences qui sont à droite de celle choisi (via position)
            if ((source.visualShape as any).attributes.position.x > (support.visualShape as any).attributes.position.x) {
              //console.log("name : " + source.name);
              currentComponent.translateSubGraphToRight(source, distance);
            }
          }
        }
      });
      this.translateTree(strategy, distance);
    }
  }

  public addStepToBusiness(conclusion: Conclusion, strategy: Strategy, evidence: Evidence, rationale: Rationale, actoor: Actor, support: Support) {
    const businessStep = new Step(undefined);

    conclusion.stepId = businessStep.getStepId();
    businessStep.items.push(conclusion);

    strategy.stepId = businessStep.getStepId();
    strategy.artifacts = [];
    if (rationale) {
      strategy.artifacts.push(rationale);
    }
    if (actoor) {
      strategy.artifacts.push(actoor);
    }
    businessStep.items.push(strategy);

    evidence.stepId = businessStep.getStepId();
    businessStep.items.push(evidence);

    support.stepId = businessStep.getStepId();
    businessStep.items.push(support);

    for (const b of this.businessSteps) {
      console.log('ttest : ' + this.selectedElement.stepId + ' == ' + b.getStepId());
      if (this.selectedElement.stepId == b.getStepId()) {
        b.items.push(support);
      }
    }

    this.businessSteps.push(businessStep);

    this.selectedElement = support;
  }

  public addEvidenceToBusiness(evidence: Evidence) {
    evidence.stepId = this.selectedElement.stepId;
    for (const b of this.businessSteps) {
      console.log('ttest : ' + this.selectedElement.stepId + ' == ' + b.getStepId());
      if (this.selectedElement.stepId == b.getStepId())
        b.items.push(evidence);
    }
  }
}
