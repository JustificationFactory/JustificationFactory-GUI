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
                this.removeStep(this.selectedElement.visualShape, this.selectedElement.visualShape.id);
            }
        }
    }

    public removeStep(rootElement, rootElementId){
        var inboundLinks = this._graph.getConnectedLinks(rootElement, { inbound: true });
        var currentComponent = this;
        inboundLinks.forEach(function (inboundLink)
        {
            //alert(inboundLink.get('source'));
            var sourceId = inboundLink.get('source').id;
            if (sourceId) {
                var source = currentComponent._graph.getCell(sourceId)
                currentComponent.removeStep(source , rootElementId);
            }
        });
        if(rootElement.parent)
            if(rootElement.id != rootElementId)
                rootElement.remove();

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