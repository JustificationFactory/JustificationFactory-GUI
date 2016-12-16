/**
 * Created by Haifa GHIDHAOUI on 11/12/2016.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';

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
        
        .skin_bouton_OK
        {
            position:absolute;
            top:330px;
            left:220px;
        }
    
    
        .skin_barre  /* on reprend le nom qu'on a mis dans 'class=' */
        {
    
            width:30px;
            height:300px;
            /* on définit la taille du div (celle de l'image) */
    
            top:20px;
            left:23px;
            /* et sa position initiale */
    
            position:absolute;
            /* le div n'est plus fixe mais libre */
    
            background-image:url('../../images/degrade.jpg');
            /* on définit ici l'image à afficher dans le div */
    
            cursor:s-resize;
            /* et enfin on définit le curseur à afficher lorsque la souris passe sur ce div */
        }
    
        /* =====  de même pour les autres  ===== */
    
        .skin_curseur1
        {
            width:45px;
            height:15px;
            position:absolute;
            top:12px;
            left:15px;
            cursor:s-resize;
            background-image:url('../../images/curseur1.png');
        }
    
        .skin_carre
        {
            width:300px;
            height:300px;
            position:absolute;
            top:20px;left:60px;
            cursor:move;
            background-color:red;  /* on définit la couleur initiale du carré */
            background-image:url('../../images/degrade n-b.png');
        }
    
        .skin_curseur2
        {
            width:20px;
            height:20px;
            position:absolute;
            top:10px;
            left:350px;
            cursor:move;
            background-image:url('../../images/curseur2.png');
        }
    
        .skin_resultat
        {
            position:absolute;
            top:330px;
            left:60px;
            border:1px solid black; /* dessine un cadre noir autour du 'input' et d'un pixel d'épaisseur */
            background-color:red;
            text-align:center;  /* on aligne le texte au centre */
        }

    `]

})
export class PaletteComponent {
    dialogXpos=860;
    dialogYpos=120;
    r=255;g=0;b=0;
    r_1=255;g_1=0;b_1=0;
    blanc=0;noir=1;
    x=360;y=30;

    @Input() showDialog = false;
    @Input() selectedColorHex = "#FF0000";
    @Input() selectedColorRgb = "rgb(255,0,0)";
    @Input() carreColorRgb = "rgb(255,0,0)";
    @Input() curseur1TopPosition = "13px";
    @Input() curseur2TopPosition = "10px";
    @Input() curseur2LeftPosition = "350px";

    @Output() colorChanged: EventEmitter<string> = new EventEmitter();

    constructor() {
    }

    openDialogBox() {
        this.showDialog = true;
    }

    onClickedExit() {
        this.showDialog = false;
        this.colorChanged.emit(this.selectedColorHex);
    }

    mouseUpBarre(event: MouseEvent) {
        let yMouse = this.position('y',event);

        if((yMouse<=320) && (yMouse>=20)) {
            this.curseur1TopPosition = yMouse-7+"px";

            if((yMouse-20)<=50) {
                this.r=255;
                this.g=0;
                this.b=Math.round((yMouse-20)*255/50);
            }
            else if((yMouse-20)<=100) {
                this.r=Math.round(255-((yMouse-70)*255/50));
                this.g=0;
                this.b=255;
            }
            else if((yMouse-20)<=150) {
                this.r=0;
                this.g=Math.round((yMouse-120)*255/50);
                this.b=255;
            }
            else if((yMouse-20)<=200) {
                this.r=0;
                this.g=255;
                this.b=Math.round(255-((yMouse-170)*255/50));
            }
            else if((yMouse-20)<=250) {
                this.r=Math.round((yMouse-220)*255/50);
                this.g=255;
                this.b=0;
            }
            else if((yMouse-20)<=300) {
                this.r=255;
                this.g=Math.round(255-((yMouse-270)*255/50));
                this.b=0;
            }

            this.carreColorRgb = "rgb("+this.r+","+this.g+","+this.b+")";
            this.afficher();
        }
    }

    mouseUpCarre(event: MouseEvent) {
        let xMouse = this.position('x',event);
        let yMouse = this.position('y',event);

        if((yMouse>20) && (yMouse<320)){
            this.curseur2TopPosition = (yMouse-10)+"px";
            this.y = yMouse;
        }

        if((xMouse>60) && (xMouse<360)) {
            this.curseur2LeftPosition = (xMouse-10)+"px";
            this.x = xMouse;
        }

        this.afficher();
    }

    public  position(axe,event) {
        if(axe=="x")
            return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) -this.dialogXpos- window.pageXOffset;
        else
            return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) -this.dialogYpos- window.pageYOffset;
    }

    //Display selected color
    public afficher() {
        this.noir=Math.round( (this.x-60)*100/300)/100;
        this.blanc=Math.round((this.y-20)*100/300)/100;

        this.r_1=Math.round((255-this.r)*this.blanc)+this.r;
        this.g_1=Math.round((255-this.g)*this.blanc)+this.g;
        this.b_1=Math.round((255-this.b)*this.blanc)+this.b;

        this.r_1=Math.round(this.r_1*this.noir);
        this.g_1=Math.round(this.g_1*this.noir);
        this.b_1=Math.round(this.b_1*this.noir);

        var r_hexa = this.hexadecimal( Math.floor(this.r_1 /16) ) + this.hexadecimal( this.r_1 % 16 );
        var g_hexa = this.hexadecimal( Math.floor(this.g_1 /16) ) + this.hexadecimal( this.g_1 % 16 );
        var b_hexa = this.hexadecimal( Math.floor(this.b_1 /16) ) + this.hexadecimal( this.b_1 % 16 );

        this.selectedColorHex = "#" + r_hexa + g_hexa + b_hexa;
        this.selectedColorRgb = "rgb("+this.r_1+","+this.g_1+","+this.b_1+")";
    }

    public hexadecimal(nombre) {
        if(nombre < 10) {
            return nombre.toString(); // le nombre en chaîne de caractères.
        }
        else {
            switch (nombre) {
                case 10:
                    return "A";
                case 11:
                    return "B";
                case 12:
                    return "C";
                case 13:
                    return "D";
                case 14:
                    return "E";
                case 15:
                    return "F";
            }
        }
    }
}

