import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import  '../services/diagram';


@Component({
    selector: 'properties-view',
    templateUrl: 'app/components/properties.component.html',
})
export class PropertiesComponent implements OnChanges {

    @Input() selectedElement : DiagramElement = null;
    @Output() selectedElementChange : EventEmitter<DiagramElement> = new EventEmitter(); //For two-way binding (ex: prop1Change)
    @Input() businessTree = [];

    constructor(){

    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.selectedElement){
            this.loadVisualSettings();
            this.businessTree = this.addBusinessGroupsWithElements();
        }
    }

    /*******************************************visual settings*******************************************************/

    @Input() ElementName="";
    @Input() ShapeOfElement = "";
    @Input() BorderOfElement = "";
    @Input() BackgroundColorOfElement = "white";
    @Input() BorderColorOfElement = "white";
    @Input() TextColorOfElement = "white";

    @Input() limitExist=false;
    @Input() ShapeOfLimits = "";
    @Input() BackgroundColorOfLimits = "white";
    @Input() BorderColorOfLimits = "white";
    @Input() TextColorOfLimits = "white";
    @Input() LimitsList = [];

    @Input() actorExist = false;
    @Input() ActorName = "";
    @Input() TypeOfActor = "";

    ACTOR_HUMAN = "Human";
    ACTOR_EXPERT = "Expert";
    ACTOR_COMPUTER = "Computer";
    @Input() ActorTypesList = [this.ACTOR_HUMAN, this.ACTOR_EXPERT, this.ACTOR_COMPUTER];

    @Input() rationaleExist = false;
    @Input() RationalesList = [];

    SHAPE_RECTANGLE = "Rectangle";
    SHAPE_ROUNDEDRECTANGLE = "Rounded rectangle";
    SHAPE_PARALLELOGRAM = "Parallelogram";
    @Input() ShapesList = [this.SHAPE_ROUNDEDRECTANGLE, this.SHAPE_RECTANGLE, this.SHAPE_PARALLELOGRAM];

    BORDER_SOLID = "Solid";
    BORDER_DASH = "Dash";
    BORDER_MIX = "Mix";
    @Input() BordersList = [this.BORDER_SOLID, this.BORDER_DASH, this.BORDER_MIX];

    private  loadVisualSettings() {

        //Initialization of properties
        this.ElementName = this.selectedElement.name;
        this.ShapeOfElement = "";
        this.BorderOfElement = "";
        this.BackgroundColorOfElement = "white";
        this.BorderColorOfElement = "white";
        this.TextColorOfElement = "white";
        this.limitExist = false;
        this.actorExist = false;
        this.rationaleExist = false;
        this.TypeOfActor = "";
        this.ShapeOfLimits = "";
        this.BackgroundColorOfLimits = "white";
        this.BorderColorOfLimits = "white";
        this.TextColorOfLimits = "white";

        this.RationalesList.splice(0);
        this.LimitsList.splice(0);

        //Set visual properties of element
        if(this.selectedElement.visualShape.attributes.attrs.path){
            if(this.selectedElement.visualShape.attributes.attrs.path.d == DiagramElement.RectangleShape)
                this.ShapeOfElement = this.SHAPE_RECTANGLE;
            else if(this.selectedElement.visualShape.attributes.attrs.path.d == DiagramElement.RoundedRectangleShape)
                this.ShapeOfElement = this.SHAPE_ROUNDEDRECTANGLE;
            else if(this.selectedElement.visualShape.attributes.attrs.path.d == DiagramElement.ParallelogramShape)
                this.ShapeOfElement = this.SHAPE_PARALLELOGRAM;
            else
                this.ShapeOfElement = "";

            if(this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] == DiagramElement.SolidBorder)
                this.BorderOfElement = this.BORDER_SOLID;
            else if(this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] == DiagramElement.DashBorder)
                this.BorderOfElement = this.BORDER_DASH;
            else if(this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] == DiagramElement.MixBorder)
                this.BorderOfElement = this.BORDER_MIX;
            else
                this.BorderOfElement = this.BORDER_SOLID;

            this.BackgroundColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.fill;
            this.BorderColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.stroke;
            this.TextColorOfElement = this.selectedElement.visualShape.attributes.attrs.text.fill;
        }

        //Set visual properties of Actor
        let rationalId = 0;
        let limitId = 0;

        for (let i = 0; i < this.selectedElement.artifacts.length; i++) {
            let artifact = this.selectedElement.artifacts[i];

            if (artifact instanceof Actor) {
                this.actorExist = true;

                this.ActorName = artifact.name;

                if (artifact.type.toLowerCase().indexOf(Util.ActorExpert) >= 0)
                    this.TypeOfActor = this.ACTOR_EXPERT;
                else if (artifact.type.toLowerCase().indexOf(Util.ActorComputer) >= 0)
                    this.TypeOfActor = this.ACTOR_COMPUTER;
                else
                    this.TypeOfActor = this.ACTOR_HUMAN;
            }
            else if (artifact instanceof Rationale) {
                this.rationaleExist = true;

                if (artifact.jsonElement.axonicProject) {
                    for (var r of Object.values(artifact.jsonElement.axonicProject)) {
                        this.RationalesList.push({
                            id: rationalId,
                            value: r
                        });
                        rationalId++;
                    }

                }
            }
            else if (artifact instanceof Limitation) {

                //Set visual properties of Limits
                //before : this.limitExist = true;
                if ((!this.limitExist) && ((this.selectedElement.visualShape as any).portData.ports.length > 1)) {
                    if ((this.selectedElement.visualShape as any).portData.ports[0].attrs.rect) {
                        this.ShapeOfLimits = "Rectangle";
                        this.BackgroundColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.fill;
                        this.BorderColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.stroke;
                        this.TextColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.text.fill;
                    }
                }

                this.limitExist = true;
                this.LimitsList.push({
                    id: limitId,
                    value: artifact.name
                });
                limitId++;
            }
        }
    }

    private  updateVisualSettings() {
        var lastwidth=this.selectedElement.visualShape.attributes.size.width;
        if(this.selectedElement.visualShape.attributes.attrs){
            this.selectedElement.visualShape.attributes.attrs.text.text=this.ElementName;
            this.selectedElement.visualShape.attributes.size.width= Util.getElementWidthFromTextLength(this.ElementName)+30;
            this.selectedElement.name = this.ElementName;
            if(this.selectedElement.visualShape.attributes.size.width<145){this.selectedElement.visualShape.attributes.size.width=145;}


            if((this.selectedElement.visualShape as any).portData.ports[1]){
                for(var i=1;i<(this.selectedElement.visualShape as any).portData.ports.length;i++) {
                    (this.selectedElement.visualShape as any).portData.ports[i].attrs.rect.x += (this.selectedElement.visualShape.attributes.size.width - lastwidth) / i;
                    (this.selectedElement.visualShape as any).portData.ports[i].label.position.args.x = (this.selectedElement.visualShape as any).portData.ports[i].attrs.rect.x + 10;
                } }
                else{
            if(this.selectedElement.artifacts[0]){
                this.selectedElement.artifacts[0].visualShape.attributes.position.x+=(this.selectedElement.visualShape.attributes.size.width-lastwidth);
            }}
        }

        //Set visual properties of element
        if(this.selectedElement.visualShape.attributes.attrs.path){

            if(this.ShapeOfElement == this.SHAPE_PARALLELOGRAM)
                this.selectedElement.visualShape.attributes.attrs.path.d = DiagramElement.ParallelogramShape;
            else if(this.ShapeOfElement == this.SHAPE_RECTANGLE)
                this.selectedElement.visualShape.attributes.attrs.path.d = DiagramElement.RectangleShape;
            else
                this.selectedElement.visualShape.attributes.attrs.path.d = DiagramElement.RoundedRectangleShape;

            if(this.BorderOfElement == this.BORDER_DASH)
                this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] = DiagramElement.DashBorder;
            else if(this.BorderOfElement == this.BORDER_MIX)
                this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] = DiagramElement.MixBorder;
            else
                this.selectedElement.visualShape.attributes.attrs.path["stroke-dasharray"] = DiagramElement.SolidBorder;

            this.selectedElement.visualShape.attributes.attrs.path.fill = this.BackgroundColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.path.stroke = this.BorderColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.text.fill = this.TextColorOfElement;

        }

        if (this.limitExist) {
            //Set visual properties of Limits
            for (var port of (this.selectedElement.visualShape as any).portData.ports){
                if (port.attrs.rect) {
                    port.attrs.rect.fill = this.BackgroundColorOfLimits;
                    port.attrs.rect.stroke = this.BorderColorOfLimits;
                    port.attrs.text.fill = this.TextColorOfLimits;
                }
            }
        }

        let rationalId = 0;
        let limitId = 0;

        for (let i = 0; i < this.selectedElement.artifacts.length; i++) {
            let artifact = this.selectedElement.artifacts[i];

            if (artifact instanceof Actor) {
                artifact.visualShape.attributes.attrs.text.text = this.ActorName;
                artifact.name = this.ActorName;

                if (this.selectedElement.jsonElement[0].actor === undefined)
                    this.selectedElement.jsonElement[0].actor = {};
                this.selectedElement.jsonElement[0].actor.name = this.ActorName;

                let changeType = false;

                if (this.TypeOfActor == this.ACTOR_EXPERT) {
                    if (artifact.type.toLowerCase().indexOf(Util.ActorExpert) < 0) {
                        artifact.type = Util.ActorExpert;
                        changeType = true;
                    }
                }
                else if (this.TypeOfActor == this.ACTOR_COMPUTER) {
                    if (artifact.type.toLowerCase().indexOf(Util.ActorComputer) < 0) {
                        artifact.type = Util.ActorComputer;
                        changeType = true;
                    }
                }
                else {
                    if ((artifact.type.toLowerCase().indexOf(Util.ActorExpert) >= 0) || (artifact.type.toLowerCase().indexOf(Util.ActorComputer) >= 0)) {
                        artifact.type = Util.ActorHuman;
                        changeType = true;
                    }
                }
                artifact.visualShape.attributes.markup = Util.getSVGActorImage(artifact.type, this.ActorName);
                this.selectedElement.jsonElement[0].actor.role = artifact.type;
                if (changeType)
                    this.selectedElement.jsonElement[0].type = artifact.type;
            }
            else if (artifact instanceof Rationale) {

                artifact.name = "";

                if (artifact.jsonElement.axonicProject) {
                    for (let i = 0 ; i < this.RationalesList.length ; i++) {
                        artifact.jsonElement.axonicProject[Object.entries(artifact.jsonElement.axonicProject)[i][0]] = this.RationalesList[i].value;
                        this.selectedElement.jsonElement[0].rationale.axonicProject[Object.entries(artifact.jsonElement.axonicProject)[i][0]] = this.RationalesList[i].value;
                        if (artifact.name != "")
                            artifact.name += " & ";
                        artifact.name += this.RationalesList[i].value;
                    }
                }

                artifact.visualShape.attributes.attrs.text.text = artifact.name;

                rationalId++;
            }
            else if (artifact instanceof Limitation) {

                limitId++;
            }
        }

        this.selectedElementChange.emit(this.selectedElement);
        this.businessTree = this.addBusinessGroupsWithElements();
    }

    onShapeOfElementValueChanged(event: any) {
        this.ShapeOfElement = event.target.value;
        this.updateVisualSettings();
    }
    onBorderOfElementValueChanged(event: any) {
        this.BorderOfElement = event.target.value;
        this.updateVisualSettings();
    }
    onNameChanged(event: any) {
        this.ElementName = event.target.value;
        this.updateVisualSettings();
    }
    onActorNameChanged(event: any) {
        this.ActorName = event.target.value;
        this.updateVisualSettings();
    }
    onTypeOfActorValueChanged(event: any) {
        this.TypeOfActor = event.target.value;
        this.updateVisualSettings();
    }
    onRationaleNameChanged(event: any) {
        this.RationalesList[parseInt(event.target.attributes["data-rationale-id"].value)].value = event.target.value;
        this.updateVisualSettings();
    }
    onLimitNameChanged(event: any) {
        this.LimitsList[parseInt(event.target.attributes["data-limit-id"].value)].value = event.target.value;
        this.updateVisualSettings();
    }
    onColorChanged(newColorHexa: string) {
        this.updateVisualSettings();
    }

    /*******************************************business settings*****************************************************/

    private addBusinessGroupsWithElements(){
        let properties = [];
        let keys = this.createKeysFromJson(this.selectedElement.jsonElement[0], "");

        var groupElements = {
            label : "Elements",
            subGroup: [],
            elements : []
        };
        var groupActors = {
            label : "Actors",
            subGroup: [],
            elements : []
        };
        var groupRationales = {
            label : "Rationales",
            subGroup: [],
            elements : []
        };
        var groupLimits = {
            label : "Limits",
            subGroup: [],
            elements : []
        };

        let subGroup = {
            label : "",
            elements : []
        };

        keys.sort((a, b) => { return (a.key > b.key) ? 1 : ((b.key > a.key) ? -1 : 0); })
            .forEach( arrayItem => {
            //remove elements with $
            /*if(arrayItem.key.indexOf("$") !== -1){
                var index = keys.indexOf(arrayItem);
                if (index > -1) {
                    keys.splice(index, 1);
                }
                return;
            }*/
            //remove elements with [n]
            var itemViewKey = arrayItem.key.replace(/\[\w*\]/g,"")
                .replace(/\._/g,"");

            if (itemViewKey.split(".").length > 1) {
                let newSubGroup = false;

                if (itemViewKey.split(".").length > 2) {
                    if (subGroup.label != itemViewKey.split(".")[1]) {
                        subGroup = {
                            label: itemViewKey.split(".")[1],
                            elements: []
                        };
                        newSubGroup = true;
                    }
                }
                else {
                    subGroup = {
                        label : "",
                        elements : []
                    };
                }

                switch (itemViewKey.split(".")[0]) {
                    case "actor":
                        groupActors.elements.push({
                            key: arrayItem.key,
                            viewKey: itemViewKey,
                            value: arrayItem.value
                        });
                        break;
                    case "rationale":
                        groupRationales.elements.push({
                            key: arrayItem.key,
                            viewKey: itemViewKey,
                            value: arrayItem.value
                        });
                        break;
                    case "limits":
                        if (subGroup.label !== "") {
                            subGroup.elements.push({
                                key: arrayItem.key,
                                viewKey: itemViewKey,
                                value: arrayItem.value
                            });

                            if (newSubGroup) {
                                groupLimits.subGroup.push(subGroup);
                            }
                        }
                        else {
                            groupLimits.elements.push({
                                key: arrayItem.key,
                                viewKey: itemViewKey,
                                value: arrayItem.value
                            });
                        }

                        break;
                    default :
                        if (subGroup.label !== "") {
                            subGroup.elements.push({
                                key: arrayItem.key,
                                viewKey: itemViewKey,
                                value: arrayItem.value
                            });

                            if (newSubGroup) {
                                groupElements.subGroup.push(subGroup);
                            }
                        }
                        else {
                            groupElements.elements.push({
                                key: arrayItem.key,
                                viewKey: itemViewKey,
                                value: arrayItem.value
                            });
                        }
                }
            }
            else {
                groupElements.elements.push({
                    key: arrayItem.key,
                    viewKey: itemViewKey,
                    value: arrayItem.value
                });
            }
        });

        if ((groupActors.subGroup.length > 0) || (groupActors.elements.length > 0)) {
            properties.push(groupActors);
        }
        if ((groupRationales.subGroup.length > 0) || (groupRationales.elements.length > 0)) {
            properties.push(groupRationales);
        }
        if ((groupLimits.subGroup.length > 0) || (groupLimits.elements.length > 0)) {
            properties.push(groupLimits);
        }
        if ((groupElements.subGroup.length > 0) || (groupElements.elements.length > 0)) {
            properties.push(groupElements);
        }

        return properties;
    }
    
    private  createKeysFromJson(json : any, key : string) : any[] {
        let keys = [];
        var x = this;

        if(json != null){
            jQuery.each(json, function(i, val) {
                var subKey;
                if(typeof i == 'number')
                    subKey = '[' + i + ']';
                else{
                    if(key != ""){
                        subKey = '.' + i;
                    }
                    else{
                        subKey = i;
                    }
                }
                if(typeof  val === 'object'){
                    keys = keys.concat(x.createKeysFromJson(val, key + subKey))
                }
                else{
                    keys.push({key: key + subKey, value: val})
                }
            });
        }
        return keys;
    }

    public getElementName() : String {
        return this.ElementName;
    }

}