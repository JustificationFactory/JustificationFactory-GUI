import { Component } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'actionstoolbar-view',
    templateUrl: 'app/components/actions.toolbar.component.html',
    //styleUrls: ['./css/app.css']
})
export class ActionsToolbarComponent {
    private currentElement : DiagramElement;

    public setElement(diagramElement : DiagramElement){
        this.currentElement = diagramElement;
        this.updateButtons();
    }

    private updateButtons(){

    }

}