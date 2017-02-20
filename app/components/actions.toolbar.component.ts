import {Component, Input} from '@angular/core';
import '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'actionstoolbar-view',
    templateUrl: 'app/components/actions.toolbar.component.html',
    //styleUrls: ['./css/app.css']
})
export class ActionsToolbarComponent {
    private currentElement : DiagramElement;
    @Input() selectedElement : DiagramElement = null;
    @Input() _graph : joint.dia.Graph = null;
    @Input() _paper : joint.dia.Paper = null;

    @Input() businessSteps : Array<Step> = null;

    private disabled : boolean = this.disableRemoveNode();

    public setElement(diagramElement : DiagramElement){
        this.currentElement = diagramElement;
        this.updateButtons();
    }

    private updateButtons(){

    }

    public removeElement(event) {
        if(!this.disableRemoveNode()){

            //this.selectedElement.visualShape.remove();


            var confirmDelete = confirm("Do you want to delete this element ?");
            if( confirmDelete == true ){
                this.removeStep(this.selectedElement, this.selectedElement.visualShape.id);
                console.log("NEW : " + JSON.stringify(this.businessSteps));
            }
        }
    }

    public removeStep(rootElement, rootElementId){
        this.removeFromBusiness(rootElement.name);
        var inboundLinks = this._graph.getConnectedLinks(rootElement.visualShape, { inbound: true });
        var currentComponent = this;
        inboundLinks.forEach(function (inboundLink)
        {
            //alert(inboundLink.get('source'));
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

    public addSubStep() {
        if(!this.disableAddSubStep()) {
            let strategy = new Strategy("Strategy", {}, "Type");
            var link1 = strategy.makeLinkWithParent(this.selectedElement);

            let evidence = new Evidence("Evidence", {}, "Type");
            var link2 = evidence.makeLinkWithParent(strategy);

            let actor = new Actor("Actor", {}, "Role");
            var link3 = actor.makeLinkWithParent(strategy);

            let rationale = new Rationale("Rationales", {}, "");
            var link4 = rationale.makeLinkWithParent(strategy);

            (strategy.visualShape as any).position((this.selectedElement.visualShape as any).attributes.position.x, (this.selectedElement.visualShape as any).attributes.position.y + 80);
            (evidence.visualShape as any).position((strategy.visualShape as any).attributes.position.x, (strategy.visualShape as any).attributes.position.y + 80);
            (actor.visualShape as any).position((strategy.visualShape as any).attributes.position.x, (strategy.visualShape as any).attributes.position.y + 80);

            (actor.visualShape as any).position((strategy.visualShape as any).attributes.position.x - actor.visualShape.prop('size/width') - 50,
                (strategy.visualShape as any).attributes.position.y - 20);

            (rationale.visualShape as any).position((strategy.visualShape as any).attributes.position.x + rationale.visualShape.prop('size/width') + 50,
                (strategy.visualShape as any).attributes.position.y);

            this._graph.addCells(strategy.visualShape,
                link1.visualShape,
                evidence.visualShape,
                link2.visualShape,
                actor.visualShape,
                link3.visualShape,
                rationale.visualShape,
                link4.visualShape
            );

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
                        }
                    }
                }
            });

            // augmenter dimenstion paper
            //(this.selectedElement.visualShape as any).parent = new Support(this.selectedElement, null);

            this._paper.setDimensions(this._paper.options.width + translatePaperWidth, this._paper.options.height + 160);
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

}