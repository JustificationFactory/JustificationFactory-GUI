import {Component, Input, Renderer, ElementRef, ViewChild, SimpleChanges, OnChanges} from '@angular/core';
import  '../services/diagram';
import { Subject }    from 'rxjs/Subject';

@Component({
    //moduleId: module.id,
    selector: 'properties-view',
    templateUrl: 'app/components/properties.component.html',
    //styleUrls: ['./css/app.css']
/*    host: {
        "(document: click)": "onRefresh( $event )",
        "(document: mousedown)": "onRefresh( $event )",
        "(document: mouseup)": "onRefresh( $event )"
    }*/
})
export class PropertiesComponent implements OnChanges{

    @Input() selectedElement : DiagramElement = null;
    @Input() test: string = "achraf";
    //@ViewChild('refreshProperties') refreshProperties : ElementRef;
    tree : any = this.tree = [{key: "a", value: "b"}];
    nbChanges = 0;

    constructor(private renderer:Renderer){
        this.tree = [{key: "a", value: "b"}];
    }
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
    ngOnChanges(changes: SimpleChanges) {
 /*       if(this.nbChanges < 1){
            this.nbChanges++;
        }
        else{
            this.tree = this.createKeysFromJson(this.json, "json");
        }*/

            this.test = "hoho" + this.nbChanges++;


        //if(changes['selectedElement'])

        //alert("toto")
    }


    public setElement(diagramElement : DiagramElement){
        //PropertiesComponent.currentElement = diagramElement;
        this.test = "youu";
        //this.updatePropertiesPanel();
        /*let event = new MouseEvent('click');
        alert(this.refreshProperties)
        this.renderer.invokeElementMethod(
            this.refreshProperties.nativeElement,'dispatchEvent', [event]
        );*/
    }


    private updateVisualPanel(){

    }

    private updatePropertiesPanel(){
        this.tree = this.createKeysFromJson(this.json, "json");

    }

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
        if(json != null){
            jQuery.each(json, function(i, val) {
                var subKey;
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
        }
        return keys;
    }
}