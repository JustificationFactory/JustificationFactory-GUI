import {Component, Input, EventEmitter, Output} from '@angular/core';
import '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'actionstoolbar-view',
    templateUrl: 'app/components/actions.toolbar.component.html',
    //styleUrls: ['./css/app.css']
})
export class ActionsToolbarComponent {
    private currentElement : DiagramElement;
    private nbNewSteps : number = 0;
    private nbNewEvidences : number = 0;
    @Input() selectedElement : DiagramElement = null;
    @Input() _graph : joint.dia.Graph = null;
    @Input() _paper : joint.dia.Paper = null;

    @Input() businessSteps : Array<Step> = null;
    @Output() stepChange : EventEmitter<DiagramElement> = new EventEmitter(); //For two-way binding (ex: prop1Change)

    private disabled : boolean = this.disableRemoveNode();

    public setElement(diagramElement : DiagramElement){
        this.currentElement = diagramElement;
        this.updateButtons();
    }

    private updateButtons(){

    }

    public removeElement(event) {
        if(!this.disableRemoveNode()){

                //console.log("business_steps before remove : " + JSON.stringify(this.businessSteps));

            var confirmDelete = confirm("Do you want to delete this element ?");
            if( confirmDelete == true ){

                this.removeStep(this.selectedElement, this.selectedElement.visualShape.id);

                let evidence = new Evidence(this.selectedElement.name, this.selectedElement.jsonElement, this.selectedElement.type);
                evidence.visualShape = this.selectedElement.visualShape;
                (this._graph.getCell(evidence.visualShape.id) as any).parent = evidence;
                evidence.artifacts = this.selectedElement.artifacts;

                var outboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, { outbound: true });
                var sourceId = outboundLinks[0].get('target').id;
                evidence.stepId = (this._graph.getCell(sourceId) as any).parent.stepId;

                this.selectedElement = evidence;
                //console.log(this.selectedElement.stepId);

                this.stepChange.emit();
                //console.log("business_steps after remove : " + JSON.stringify(this.businessSteps));
            }
        }
    }

    public removeStep(rootElement, rootElementId){
        this.removeFromBusiness(rootElement.name);
        var inboundLinks = this._graph.getConnectedLinks(rootElement.visualShape, { inbound: true });
        var currentComponent = this;
        inboundLinks.forEach(function (inboundLink)
        {
            var sourceId = inboundLink.get('source').id;
            if (sourceId) {
                var source = (currentComponent._graph.getCell(sourceId) as any).parent;
                //currentComponent.removeFromBusiness(source.name);
                currentComponent.removeStep(source , rootElementId);

            }
        });
        if(rootElement.visualShape.parent)
            if(rootElement.visualShape.id != rootElementId)
                rootElement.visualShape.remove();

    }

    public removeFromBusiness(name){

        for (var i = 0; i < this.businessSteps.length; i++){
            var step = this.businessSteps[i];
            elements:
            for (var elementKey in step.items){
                var elementValue = step.items[elementKey];
                if(elementValue.name == name && elementValue.constructor.name == "Conclusion"){
                    this.businessSteps.splice(i,1);
                    break elements;
                }
            }
        }
        var visualShapeSupport;
        var artifactsSupport;
        for (var i = 0; i < this.businessSteps.length; i++){
            var step = this.businessSteps[i];
            elements:
                for (var elementKey in step.items){
                    var elementValue = step.items[elementKey];
                    if(elementValue.name == name && elementValue.constructor.name == "Support"){
                        visualShapeSupport = elementValue.visualShape;
                        artifactsSupport = elementValue.artifacts;
                        delete step.items.splice(step.items.indexOf(elementValue), 1);
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

    public disableRemoveNode() : boolean {
        let disable = (this.selectedElement == null);

        if (!disable) {
            if (!(this.selectedElement instanceof Support))
                disable = true;
        }

        return disable;
    }

    public disableAddSubStep() : boolean {
        let disable = (this.selectedElement == null);

        if (!disable) {
            if (!(this.selectedElement instanceof Evidence))
                disable = true;
        }

        return disable;
    }

    public disableAddEvidence() : boolean {
        let disable = (this.selectedElement == null);

        if (!disable) {
            if (!(this.selectedElement instanceof Strategy))
                disable = true;
        }

        return disable;
    }

    public disableAddRootStep() : boolean {
        let disable = (this.selectedElement == null);

        if (!disable) {
            if (!(this.selectedElement instanceof Conclusion))
                disable = true;
        }

        return disable;
    }
    public addSubStep() {
        if(!this.disableAddSubStep()) {

            if(sessionStorage.getItem("nbNewSteps"))
                this.nbNewSteps = Number(sessionStorage.getItem("nbNewSteps"));

            //***************** CREATE ELEMENTS *******************
            //*****************************************************
            let strategyJsonElement = [{
                "name" : "[Strategy " + this.nbNewSteps + "]",
                "element" : {
                    "type" : "Type",
                }
            }];
            let strategy = new Strategy("[Strategy " + this.nbNewSteps + "]", strategyJsonElement, "Type");
            var link1 = strategy.makeLinkWithParent(this.selectedElement);

            let evidenceJsonElement = [{
                name : "[Evidence " + this.nbNewSteps + "]",
                element : {
                    type : "Type",
                }
            }];
            let evidence = new Evidence("[Evidence " + this.nbNewSteps + "]", evidenceJsonElement, "Type");
            var link2 = evidence.makeLinkWithParent(strategy);

            let actorJsonElement = {
                "name": "Actor",
                "role": "Role",
            };
            let actor = new Actor("Actor", actorJsonElement, "Role");
            actor.behavior = Behavior.Near;
            var link3 = actor.makeLinkWithParent(strategy);

            let rationaleJsonElement = {
                "axonicProject": {
                    "pathology": "pathology",
                    "stimulator": "stimulator"
                }
            };
            let rationale = new Rationale("", rationaleJsonElement, "");
            rationale.behavior = Behavior.Near;
            var link4 = rationale.makeLinkWithParent(strategy);

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

            var outboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {outbound: true});

            var sourceId = outboundLinks[0].get('target').id;
            var currentStrategy = (this._graph.getCell(sourceId) as any).parent;
            console.log("currentStrategy : " + currentStrategy.name);

            //calculer dist = max[dist(strategy, rationale), dist(strategy, actor)]
            let dist = Math.abs((rationale.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x);
            if (dist < Math.abs((actor.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x))
                dist = Math.abs((actor.visualShape as any).attributes.position.x - (strategy.visualShape as any).attributes.position.x);

            // translatepaperwidth sera égale à dist si on translate un sous graphe à droite.
            var translatePaperWidth = 0;

            // récupérer tous les évidences associés à cette strategy
            var inboundLinks = this._graph.getConnectedLinks(currentStrategy.visualShape, {inbound: true});

            var currentComponent = this;
            inboundLinks.forEach(function (inboundLink) {
                //alert(inboundLink.get('source'));
                var sourceId = inboundLink.get('source').id;
                if (sourceId) {
                    var source = (currentComponent._graph.getCell(sourceId) as any).parent;
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

            let conclusion = new Conclusion(this.selectedElement.name, this.selectedElement.jsonElement, this.selectedElement.type);


            //************* SWITCH EVIDENCE TO SUPPORT **************
            //*******************************************************

            let support = new Support(conclusion, this.selectedElement);
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
            sessionStorage.setItem("nbNewSteps", this.nbNewSteps + "");
        }
    }

    public addEvidence(){
        if(!this.disableAddEvidence()) {

            console.log("nbNewEvidences : " + sessionStorage.getItem("nbNewEvidences"));
            if(sessionStorage.getItem("nbNewEvidences"))
                this.nbNewEvidences = Number(sessionStorage.getItem("nbNewEvidences"));

            //***************** CREATE EVIDENCE *******************
            //*****************************************************

            let evidenceJsonElement = [{
                name : "[Evidence " + this.nbNewSteps + "]",
                element : {
                    type : "Type",
                }
            }];
            let evidence = new Evidence("[New Evidence " + this.nbNewEvidences + "]", evidenceJsonElement, "Type");

            //***************** POSITION ELEMENTS *******************
            //*******************************************************

            // récupérer tous les évidences associés à cette strategy
            var inboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {inbound: true});

            var currentComponent = this;
            var leftSupport = null;
            inboundLinks.forEach(function (inboundLink) {
                //alert(inboundLink.get('source'));
                var sourceId = inboundLink.get('source').id;
                if (sourceId) {
                    var source = (currentComponent._graph.getCell(sourceId) as any).parent;
                    if (source instanceof Evidence || source instanceof Support) {
                        if(leftSupport == null)
                            leftSupport = source;
                        // identifier l'évidence à gauche
                        if ((source.visualShape as any).attributes.position.x < (leftSupport.visualShape as any).attributes.position.x) {
                            leftSupport = source;
                        }
                    }
                }
            });

            (evidence.visualShape as any).position((leftSupport.visualShape as any).attributes.position.x - 1, (leftSupport.visualShape as any).attributes.position.y);
            var link = evidence.makeLinkWithParent(this.selectedElement);
            //***************** ADD ELEMENTS TO GRAPH ***************
            //*******************************************************

            this._graph.addCells([evidence.visualShape,
                link.visualShape
            ]);

            //***************** POSITION SUBGRAPH *******************
            //*******************************************************

            // translatepaperwidth sera égale à dist si on translate un sous graphe à droite.
            var translatePaperWidth = 0;

            // récupérer tous les évidences associés à cette strategy
            var inboundLinks = this._graph.getConnectedLinks(this.selectedElement.visualShape, {inbound: true});

            var currentComponent = this;
            var translateTree = false;
            inboundLinks.forEach(function (inboundLink) {
                var sourceId = inboundLink.get('source').id;
                if (sourceId) {
                    var source = (currentComponent._graph.getCell(sourceId) as any).parent;
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

            if(translateTree)
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
            sessionStorage.setItem("nbNewEvidences", this.nbNewEvidences + "");
        }
    }

    public addRootStep(){
        if(!this.disableAddRootStep()) {

            if(sessionStorage.getItem("nbNewSteps"))
                this.nbNewSteps = Number(sessionStorage.getItem("nbNewSteps"));

            //***************** CREATE ELEMENTS *******************
            //*****************************************************

            let conclusionJsonElement = [{
                name : "[Conclusion " + this.nbNewSteps + "]",
                element : {
                    type : "Type",
                }
            }];
            let conclusion = new Conclusion("[Conclusion " + this.nbNewSteps + "]", conclusionJsonElement, "Type");

            let strategyJsonElement = [{
                "name" : "[Strategy " + this.nbNewSteps + "]",
                "element" : {
                    "type" : "Type",
                }
            }];
            let strategy = new Strategy("[Strategy " + this.nbNewSteps + "]", strategyJsonElement, "Type");
            var link1 = strategy.makeLinkWithParent(conclusion);
            var link2 = this.selectedElement.makeLinkWithParent(strategy);

            let actorJsonElement = {
                "name": "Actor",
                "role": "Role",
            };
            let actor = new Actor("Actor", actorJsonElement, "Role");
            actor.behavior = Behavior.Near;
            var link3 = actor.makeLinkWithParent(strategy);

            let rationaleJsonElement = {
                "axonicProject": {
                    "pathology": "pathology",
                    "stimulator": "stimulator"
                }
            };
            let rationale = new Rationale("", rationaleJsonElement, "");
            rationale.behavior = Behavior.Near;
            var link4 = rationale.makeLinkWithParent(strategy);

            strategy.visualShape.embed(actor.visualShape);
            strategy.visualShape.embed(rationale.visualShape);

            //******** TRANSLATE ALL THE GRAPH INTO BOTTOM **********
            //*******************************************************

            for (let g of this._graph.getCells()) {
                if((g as any).parent)
                    (g as any).position((g as any).attributes.position.x, (g as any).attributes.position.y + 160)
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

            let evidence = new Evidence(this.selectedElement.name, this.selectedElement.jsonElement, this.selectedElement.type);
            evidence.artifacts = this.selectedElement.artifacts;
            //************* SWITCH CONCLUSION TO SUPPORT **************
            //*******************************************************

            let support = new Support(this.selectedElement, evidence);
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
            sessionStorage.setItem("nbNewSteps", this.nbNewSteps + "");
        }
    }

    public translateSubGraphToRight(rootElement, distance){
        (rootElement.visualShape as any).position((rootElement.visualShape as any).attributes.position.x + distance, (rootElement.visualShape as any).attributes.position.y);
        var inboundLinks = this._graph.getConnectedLinks(rootElement.visualShape, { inbound: true });
        var currentComponent = this;
        inboundLinks.forEach(function (inboundLink)
        {
            //alert(inboundLink.get('source'));
            var sourceId = inboundLink.get('source').id;
            var source = (currentComponent._graph.getCell(sourceId) as any).parent;
            console.log("name : " + source.name);
            currentComponent.translateSubGraphToRight(source , distance);
        });
    }

    public translateTree(strategyElement, distance){
        //this.translateSubGraphToRight(rootElement, distance);

        // Selectionner le support parent de cette strategy
        var strategyOutboundLinks = this._graph.getConnectedLinks(strategyElement.visualShape, { outbound: true });
        var supportId = strategyOutboundLinks[0].get('target').id;
        var support = (this._graph.getCell(supportId) as any).parent;
        if(!(support instanceof Conclusion)){
            // Selectionner la strategy parent de ce support
            var supportOutboundLinks = this._graph.getConnectedLinks(support.visualShape, { outbound: true });
            var strategyId = supportOutboundLinks[0].get('target').id;
            var strategy = (this._graph.getCell(strategyId) as any).parent;

            var inboundLinks = this._graph.getConnectedLinks(strategy.visualShape, {inbound: true});
            var currentComponent = this;
            inboundLinks.forEach(function (inboundLink) {
                var sourceId = inboundLink.get('source').id;
                if (sourceId) {
                    var source = (currentComponent._graph.getCell(sourceId) as any).parent;
                    if (source instanceof Evidence || source instanceof Support) {

                        // identifier les évidences qui sont à droite de celle choisi (via position)
                        if ((source.visualShape as any).attributes.position.x > (support.visualShape as any).attributes.position.x) {
                            //console.log("name : " + source.name);
                            currentComponent.translateSubGraphToRight(source, distance);
                        }
                    }
                }
            });
            this.translateTree(strategy,distance);
        }
    }
    public addStepToBusiness(conclusion : Conclusion, strategy : Strategy, evidence: Evidence, rationale : Rationale, actoor : Actor, support : Support){
        let businessStep = new Step(undefined);

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

        for(let b of this.businessSteps) {
            console.log("ttest : " + this.selectedElement.stepId + " == " + b.getStepId());
            if (this.selectedElement.stepId == b.getStepId()){
                b.items.push(support);
            }
        }

        this.businessSteps.push(businessStep);

        this.selectedElement = support;
    }

    public addEvidenceToBusiness(evidence : Evidence){
        evidence.stepId = this.selectedElement.stepId;
        for(let b of this.businessSteps) {
            console.log("ttest : " + this.selectedElement.stepId + " == " + b.getStepId());
            if (this.selectedElement.stepId == b.getStepId())
                b.items.push(evidence);
        }
    }
}