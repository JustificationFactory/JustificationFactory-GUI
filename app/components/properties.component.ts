import {Component, Input, SimpleChanges, OnChanges, EventEmitter, Output} from '@angular/core';
import  '../services/diagram';


@Component({
    selector: 'properties-view',
    templateUrl: 'app/components/properties.component.html',
})
export class PropertiesComponent implements OnChanges {

    @Input() selectedElement : DiagramElement = null;
    @Output() selectedElementChange : EventEmitter<DiagramElement> = new EventEmitter(); //For two-way binding (ex: prop1Change)
    tree = [];

    constructor(){

    }

    ngOnChanges(changes: SimpleChanges) {
        if(this.selectedElement){
            this.getNodeSettings();
            this.tree = this.addGroups(this.createKeysFromJson(this.selectedElement.jsonElement, ""));
        }
    }

    /*******************************************visual settings******************************************************************************/
    @Input() ElementName="";
    @Input() ShapeOfElement = "";
    @Input() BackgroundColorOfElement = "white";
    @Input() BorderColorOfElement = "white";
    @Input() limitExist=false;
    @Input() ShapeOfLimits = "";
    @Input() BackgroundColorOfLimits = "white";
    @Input() BorderColorOfLimits = "white";

    private  getNodeSettings() {

        //Initialization of properties
        this.ElementName = this.selectedElement.name;
        this.ShapeOfElement = "";
        this.BackgroundColorOfElement = "white";
        this.BorderColorOfElement = "white";
        this.limitExist = false;
        this.ShapeOfLimits = "";
        this.BackgroundColorOfLimits = "white";
        this.BorderColorOfLimits = "white";

        //Set visual properties of element
        if(this.selectedElement.visualShape.attributes.type == "basic.Rect"){
            this.ShapeOfElement = "Rectangle";

            this.BackgroundColorOfElement = this.selectedElement.visualShape.attributes.attrs.rect.fill;
            this.BorderColorOfElement = this.selectedElement.visualShape.attributes.attrs.rect.stroke;
        }
        else if(this.selectedElement.visualShape.attributes.type == "basic.Path"){
            if(this.selectedElement.visualShape.attributes.attrs.path.d == DiagramElement.ParallelogramShape)
                this.ShapeOfElement = "Parallelogram";
            else
                this.ShapeOfElement = this.selectedElement.visualShape.attributes.attrs.path.d;

            this.BackgroundColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.fill;
            this.BorderColorOfElement = this.selectedElement.visualShape.attributes.attrs.path.stroke;
        }

        //Set visual properties of Limits
        if((Object.keys((this.selectedElement.visualShape as any).portData.ports)).length>1){
            this.limitExist = true;
            if ((this.selectedElement.visualShape as any).portData.ports[0].attrs.rect) {
                this.ShapeOfLimits = "Rectangle";
                this.BackgroundColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.fill;
                this.BorderColorOfLimits = (this.selectedElement.visualShape as any).portData.ports[0].attrs.rect.stroke;
            }
        }
    }

    private  setNodeSettings() {

        //Set visual properties of element
        if(this.selectedElement.visualShape.attributes.type == "basic.Rect"){

            this.selectedElement.visualShape.attributes.attrs.rect.fill = this.BackgroundColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.rect.stroke = this.BorderColorOfElement;
        }
        else if(this.selectedElement.visualShape.attributes.type == "basic.Path"){

            this.selectedElement.visualShape.attributes.attrs.path.fill = this.BackgroundColorOfElement;
            this.selectedElement.visualShape.attributes.attrs.path.stroke = this.BorderColorOfElement;
        }

        //Set visual properties of Limits
        for (var port of (this.selectedElement.visualShape as any).portData.ports){
            if (port.attrs.rect) {
                port.attrs.rect.fill = this.BackgroundColorOfLimits;
                port.attrs.rect.stroke = this.BorderColorOfLimits;
            }
        }

        this.selectedElementChange.emit(this.selectedElement);
    }

    onColorChanged(newColorHexa: string) {
        this.setNodeSettings();
    }

    /*********************************************************Business Properties****************************************************************************/

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
                //alert(i + " : " + val);
            });
        }
        return keys;
    }

    private removeUnusedKeys(keys : any){
        keys.forEach( function (arrayItem)
        {
            //remove array numbers
            arrayItem.key = arrayItem.key.replace(/\[\w*\]/g,"");

            //remove elements with $
            if(arrayItem.key.indexOf("$") !== -1){
                var index = keys.indexOf(arrayItem);
                if (index > -1) {
                    keys.splice(index, 1);
                }
            }
        });
        return keys;
    }

    private addGroups(keys : any){
        let properties = [];

        var i=0;
        var group1 = {
            label : "Group1",
            elements : []
        };
        var group2 = {
            label : "Group2",
            elements : []
        };
        keys.forEach( function (arrayItem)
        {
            //remove elements with $
            if(arrayItem.key.indexOf("$") !== -1){
                var index = keys.indexOf(arrayItem);
                if (index > -1) {
                    keys.splice(index, 1);
                }
                return;
            }
            var itemViewKey = arrayItem.key.replace(/\[\w*\]/g,"")
                                            .replace(/\._/g,"");
            //group is Mock
            if(i< keys.length / 2)
                group1.elements.push({
                    key: arrayItem.key,
                    viewKey: itemViewKey,
                    value: arrayItem.value
                });
            else
                group2.elements.push({
                    key: arrayItem.key,
                    viewKey: itemViewKey,
                    value: arrayItem.value
                });
            i = i + 1;
        });
        properties.push(group1,group2);
        return properties;
    }
}