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
    /*******************************************visual settings******************************************************************************/
    @Input() node="test"
    @Input() map=[{key: "a", val: "b"}]
    @Input() limitList=[{key: "a", val: "b"}]
    @Input() limitProp=[{key: "a", val: "b"}]
    private  getNodeSettings()
    {this.map=[]
        this.node=[]
        this.limitList=[]
        this.limitProp=[]
        this.node=this.selectedElement.name;
        if(this.selectedElement.visualShape.attributes.type=="basic.Rect"){
            this.map.push({key:"Shape",val:"Rectangle"})
            this.map.push({key:"Background",val:this.selectedElement.visualShape.attributes.attrs.rect.fill})
            this.map.push({key:"Border color",val:this.selectedElement.visualShape.attributes.attrs.rect.stroke})


        }
        else if(this.selectedElement.visualShape.attributes.type=="basic.Path"){
            if(this.selectedElement.visualShape.attributes.attrs.path.d=="M 10 0 L 100 0 L 90 150 L 0 150 Z"){
                this.map.push({key:"Shape",val:"parallélogramme"})
            }
            else{
            this.map.push({key:"Shape",val:this.selectedElement.visualShape.attributes.attrs.path.d})}
            this.map.push({key:"Background",val:this.selectedElement.visualShape.attributes.attrs.path.fill})
            this.map.push({key:"Border color",val:this.selectedElement.visualShape.attributes.attrs.path.stroke})
        }
if((Object.keys(this.selectedElement.visualShape.portData.ports)).length>1){
      for(var _j = 0; _j < (Object.keys(this.selectedElement.visualShape.portData.ports)).length; _j++ ){
            this.limitList.push({key:"Limit["+_j.toString()+"]",val:this.selectedElement.visualShape.portData.ports[_j].id})
            }

        var limit_markup=this.selectedElement.visualShape.portData.ports[0].markup.split(' ');
        for(var _i = 0; _i< limit_markup.length; _i++ ){
            if (limit_markup[_i].includes("rect")) { this.limitProp.push({key:"Shape",val:"Rectangle"})}
            if (limit_markup[_i].includes("fill")) {
                var backgd=limit_markup[_i].split("=")[1].replace(new RegExp("[^(a-zA-Z)]", "g"), '');
                this.limitProp.push({key:"Background",val:backgd})

            }

        }

}

        }



    /******************************************* used by visual settings && Properties******************************************************************************/

    @Input() selectedElement : DiagramElement = null;
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

        /*********haifa :p *****/
        if(this.selectedElement){

            this.test =this.selectedElement.name;
            this.getNodeSettings();
            this.tree = this.createKeysFromJson(this.selectedElement.jsonElement, "");
        }





    }
    /**************************************************************Properties****************************************************************************/
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
        },
            {
                d : {
                    e: "e2",
                    f: "f2"
                }
            }]
    }



/*    public setElement(diagramElement : DiagramElement){
        //PropertiesComponent.currentElement = diagramElement;
        this.test = "youu";
        //this.updatePropertiesPanel();
        /*let event = new MouseEvent('click');
         alert(this.refreshProperties)
         this.renderer.invokeElementMethod(
         this.refreshProperties.nativeElement,'dispatchEvent', [event]
         );
    }*/



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
}