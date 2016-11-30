import { Component } from '@angular/core';
import  '../services/diagram';

@Component({
    //moduleId: module.id,
    selector: 'properties-view',
    templateUrl: 'app/components/properties.component.html',
    //styleUrls: ['./css/app.css']
})
export class PropertiesComponent {
    private element : DiagramElement;
    public setElement(currentElement : DiagramElement){
        this.element = currentElement;
        this.updateVisualPanel();
        this.updatePropertiesPanel();
        alert("hello");
    }

    private updateVisualPanel(){

    }

    private updatePropertiesPanel(){

    }
/*    tree = [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        },
        {
            text: "Parent 3"
        },
        {
            text: "Parent 4"
        },
        {
            text: "Parent 5"
        }
    ];
    tree2 = ["a","b","c"];*/
    private json : any = {
         a : "a",
         b : "b",
         c : [{
            d : {
                e: "e1",
                f: "f1"
            }
        }]
    }


    tree = this.createKeysFromJson(this.json, "json");


    private static createMapFromJson(json : any) : any[] {
        let keys = [];
        keys.push({key: "a", value: json.a});
        keys.push({key: "b", value: json.b});
        for (var element  of json.c){
            keys.push({key: "c.d.e", value: json.c[0].d.e});
            keys.push({key: "c.d.f", value: json.c[0].d.f});
        }
        return keys;
    }

    private  createKeysFromJson(json : any, key : string) : any[] {
        let keys = [];
        var x = this;

        jQuery.each(json, function(i, val) {
            var subKey
            if(typeof i == 'number')
                subKey = '[' + i + ']';
            else{
                subKey = '.' + i;
            }

            if(typeof  val === 'object'){
                keys = keys.concat(x.createKeysFromJson(val, key + subKey))
            }
            else{
                keys.push({key: key + subKey, value: val})
            }
            //alert(i + " : " + val);
        });

        return keys;
    }
}