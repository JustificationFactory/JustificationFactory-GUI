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

    @Input() businessSteps : Array<Step> = null;

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
}