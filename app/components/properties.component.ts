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
    @Input() BackgroundColorOfElement = "white";
    @Input() BorderColorOfElement = "white";
    @Input() TextColorOfElement = "white";
    @Input() limitExist=false;
    @Input() ShapeOfLimits = "";
    @Input() BackgroundColorOfLimits = "white";
    @Input() BorderColorOfLimits = "white";
    @Input() TextColorOfLimits = "white";

    SHAPE_RECTANGLE = "Rectangle";
    SHAPE_ROUNDEDRECTANGLE = "Rounded rectangle";
    SHAPE_PARALLELOGRAM = "Parallelogram";
    @Input() ShapesList = [this.SHAPE_ROUNDEDRECTANGLE, this.SHAPE_RECTANGLE, this.SHAPE_PARALLELOGRAM];

    private  loadVisualSettings() {

        //Initialization of properties
        this.ElementName = this.selectedElement.name;
        this.ShapeOfElement = "";
        this.BackgroundColorOfElement = "white";
        this.BorderColorOfElement = "white";
        this.TextColorOfElement = "white";
        this.limitExist = false;
        this.ShapeOfLimits = "";
        this.BackgroundColorOfLimits = "white";
        this.BorderColorOfLimits = "white";
        this.TextColorOfLimits = "white";

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

            this.BackgroundColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.fill;
            this.BorderColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.stroke;
            this.TextColorOfElement = this.selectedElement.visualShape.attributes.attrs.text.fill;
        }

        //Set visual properties of Limits
        if((Object.keys((this.selectedElement.visualShape as any).portData.ports)).length>1){
            this.limitExist = true;
            if ((this.selectedElement.visualShape as any).portData.ports[0].attrs.rect) {
                this.ShapeOfLimits = "Rectangle";
                this.BackgroundColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.fill;
                this.BorderColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.stroke;
                this.TextColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.text.fill;
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

            this.selectedElement.visualShape.attributes.attrs.path.fill = this.BackgroundColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.path.stroke = this.BorderColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.text.fill = this.TextColorOfElement;

        }

        //Set visual properties of Limits
        for (var port of (this.selectedElement.visualShape as any).portData.ports){
            if (port.attrs.rect) {
                port.attrs.rect.fill = this.BackgroundColorOfLimits;
                port.attrs.rect.stroke = this.BorderColorOfLimits;
                port.attrs.text.fill = this.TextColorOfLimits;
            }
        }

        this.selectedElementChange.emit(this.selectedElement);
    }

    onShapeOfElementValueChanged(event: any) {
        this.ShapeOfElement = event.target.value;
        this.updateVisualSettings();
    }
    onNameChanged(event: any) {
        this.ElementName = event.target.value;
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