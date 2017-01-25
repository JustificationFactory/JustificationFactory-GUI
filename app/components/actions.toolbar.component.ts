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
        //this.selectedElement.visualShape.remove();
        if(this.selectedElement.constructor.name != "Strategy"){
            var confirmDelete = confirm("Do you want to delete this element ?");
            if( confirmDelete == true ){
                this.removeStep(this.selectedElement.visualShape, this.selectedElement.visualShape.id);
            }
        }

        //alert(inboundLinks.length);
        //this.selectedElement.visualShape.get
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

}