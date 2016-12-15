/**
 * Created by Haifa GHIDHAOUI on 11/12/2016.
 */
import { Component ,EventEmitter} from '@angular/core';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PropertiesComponent} from './properties.component'


@Component({

    selector: 'paletteColor',

    templateUrl: 'app/components/palette.component.html',

    styles: [`
        .dialog {
            width: 400px;
            position: absolute;
            border: 1px solid black;
            border-radius: 5px;
            overflow: hidden;
            position: fixed;
            left: 860px;
            top: 120px;
            height:380px;
            status:0; 
            scrollbars:0;
            menubar:0
        }
        .dialog p {
            text-align: center;
        }
        .dialog header {
            border-bottom: 1px solid black;
            font-size: 12px;
            padding: 5px;
            display: flex;
        }
        .dialog header .title {
            flex-grow: 1;
            cursor: default;
        }
        .dialog header .exit-button {
            cursor: pointer;
            padding: 0 5px;
        }
    `]



})
export class PaletteComponent {
 posX=860;
 posY=120;


    close = new EventEmitter();

    onClickedExit() {
        this.close.emit('event');
    }

    constructor() {

        document.addEventListener("mousedown", this.mouseDown);
        document.addEventListener("mouseup", this.mouseUp);
/*
        document.addEventListener("mousemove", this.mouseMove);
*/
    }
    mouseDown = (ev: MouseEvent) => {
        this.calcul(ev);

    }
    mouseUp = (ev: MouseEvent) => {
        this.clic=false;this.clic2=false;
    }
/*    mouseMove = (ev: MouseEvent) => {
        this.calcul(ev);
    }*/


 test=1;
    champ="";
    formulaire="";



    valid_couleur(couleur)
    {

        document.forms[formulaire].elements[champ].value=couleur;

    }


    clic=false;

    clic2=false;


    r=255;g=0;b=0;


    r_1=255;g_1=0;b_1=0;


    blanc=0;noir=1;
    x=360;y=30;
    docOnMouseMove(){
        document.onmousemove=this.calcul;}
    docOnMouseDown(){
        document.onmousedown=this.calcul;}
    docOnMouseUp(){
        if( document.onmouseup) { this.clic=false;this.clic2=false; }
    }


    public  position(axe,event)
    {


        var e = event || window.event;

        if(axe=="x")
        {
            /*var rep=e.clientX;*/
            return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -this.posX- window.pageXOffset;

        }
        else
        {
          /*  var rep=e.clientY;*/
            return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -this.posY- window.pageYOffset;

        }

      /*  return rep;*/

    }

    public clique(objet : string)
    {

        if(objet=="barre")
        {
            this.clic=true;
        }
        else
        {
            this.clic2=true;
        }

    }
    public calcul(event)
    {

        if(this.clic && this.position('y',event)<=320 && this.position('y',event)>=20)
        {

            document.getElementById("curseur1").style.top=this.position('y',event)-7+"px";
            if((this.position('y',event)-20)<=50)
            {

                this.r=255;
                this.g=0;
                this.b=Math.round((this.position('y',event)-20)*255/50);

            }
            else if((this.position('y',event)-20)<=100)
            {

                this.r=Math.round(255-((this.position('y',event)-70)*255/50));
                this.g=0;
                this.b=255;

            }
            else if((this.position('y',event)-20)<=150)
            {

                this.r=0;
                this.g=Math.round((this.position('y',event)-120)*255/50);
                this.b=255;

            }
            else if((this.position('y',event)-20)<=200)
            {

                this.r=0;
                this.g=255;
                this.b=Math.round(255-((this.position('y',event)-170)*255/50));

            }
            else if((this.position('y',event)-20)<=250)
            {

                this.r=Math.round((this.position('y',event)-220)*255/50);
                this.g=255;
                this.b=0;

            }
            else if((this.position('y',event)-20)<=300)
            {

                this.r=255;
                this.g=Math.round(255-((this.position('y',event)-270)*255/50));
                this.b=0;

            }

            document.getElementById("carre").style.backgroundColor="rgb("+this.r+","+this.g+","+this.b+")";
            this.afficher();
        }

        if(this.clic2)
        {

            if(this.position('y',event)>20 && this.position('y',event)<320)
            {
                document.getElementById("curseur2").style.top=(this.position('y',event)-10)+"px";
                this.y=this.position('y',event);

            }

            if(this.position('x',event)>60 && this.position('x',event)<360)
            {
                document.getElementById("curseur2").style.left=(this.position('x',event)-10)+"px";

                this.x=this.position('x',event);

            }

            this.afficher();
        }

    }



    public afficher() // ici on gère l'affichage de la couleur
    {

        this.noir=Math.round( (this.x-60)*100/300)/100;
        this.blanc=Math.round((this.y-20)*100/300)/100;

        this.r_1=Math.round((255-this.r)*this.blanc)+this.r;
        this.g_1=Math.round((255-this.g)*this.blanc)+this.g;
        this.b_1=Math.round((255-this.b)*this.blanc)+this.b;

        this.r_1=Math.round(this.r_1*this.noir);
        this.g_1=Math.round(this.g_1*this.noir);
        this.b_1=Math.round(this.b_1*this.noir);



        var r_hexa = this.hexadecimal( Math.floor(this.r_1 /16) ) + this.hexadecimal( this.r_1 % 16 );
        var  g_hexa = this.hexadecimal( Math.floor(this.g_1 /16) ) + this.hexadecimal( this.g_1 % 16 );
        var b_hexa = this.hexadecimal( Math.floor(this.b_1 /16) ) + this.hexadecimal( this.b_1 % 16 );

        document.getElementById("resultat").value = "#" + r_hexa + g_hexa + b_hexa;


        document.getElementById('resultat').style.backgroundColor="rgb("+this.r_1+","+this.g_1+","+this.b_1+")";
        document.getElementById('recolor').style.backgroundColor="rgb("+this.r_1+","+this.g_1+","+this.b_1+")";
        document.getElementById('res').style.backgroundColor="rgb("+this.r_1+","+this.g_1+","+this.b_1+")";
    }

    public hexadecimal(nombre)
    {

        if(nombre < 10)
        {
            return nombre.toString(); // le nombre en chaîne de caractères.
        }
        else
        {

            switch (nombre)
            {
                case 10:
                    return "A";
                    break;
                case 11:
                    return "B";
                    break;
                case 12:
                    return "C";
                    break;
                case 13:
                    return "D";
                    break;
                case 14:
                    return "E";
                    break;
                case 15:
                    return "F";
                    break;

            }
        }

    }


    public valider()
    {


        window.opener.valid_couleur(document.getElementById("resultat").value);

        window.close();


    }



}

window.onload = () => {
    var palette=new PaletteComponent()

    var obj = <HTMLImageElement>document.getElementById("dialog");
    obj.addEventListener("mousedown", palette.mouseDown);
    obj.addEventListener("mouseup", palette.mouseUp);
  /*  obj.addEventListener("mousemove", palette.mouseMove);*/

};
