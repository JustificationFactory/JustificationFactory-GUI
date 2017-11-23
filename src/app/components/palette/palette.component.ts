import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({

    selector: 'paletteColor',

    templateUrl: './palette.component.html',

    styleUrls: ['./palette.component.css']

})
export class PaletteComponent {
    dialogXpos= 860;
    dialogYpos= 120;
    r= 255; g= 0; b= 0;
    r_1= 255; g_1= 0; b_1= 0;
    blanc= 0; noir= 1;
    x= 360; y= 30;

    @Input() showDialog = false;
    @Input() selectedColorHex = '#FF0000';
    @Output() selectedColorHexChange: EventEmitter<string> = new EventEmitter(); //For two-way binding (ex: prop1Change)
    @Input() selectedColorRgb = 'rgb(255,0,0)';
    @Input() carreColorRgb = 'rgb(255,0,0)';
    @Input() curseur1TopPosition = '13px';
    @Input() curseur2TopPosition = '10px';
    @Input() curseur2LeftPosition = '350px';

    selectedColorHexOldValue = '';

    constructor() {
    }

    openDialogBox() {
        this.selectedColorHexOldValue = this.selectedColorHex;
        const rgbObj = this.hexToRgb(this.selectedColorHex);

        if (rgbObj)
            this.selectedColorRgb = 'rgb(' + rgbObj.r + ',' + rgbObj.g + ',' + rgbObj.b + ')';
        else
            this.selectedColorRgb = this.selectedColorHex;

        this.showDialog = true;
    }

    onClickedExit() {
        this.selectedColorHex = this.selectedColorHexOldValue;
        this.showDialog = false;
    }

    onClickedSave() {
        this.showDialog = false;
        this.selectedColorHexChange.emit(this.selectedColorHex);
    }

    mouseUpBarre(event: MouseEvent) {
        const yMouse = this.position('y', event);

        if ((yMouse <= 320) && (yMouse >= 20)) {
            this.curseur1TopPosition = yMouse - 7 + 'px';

            if ((yMouse - 20) <= 50) {
                this.r = 255;
                this.g = 0;
                this.b = Math.round((yMouse - 20) * 255 / 50);
            }
            else if ((yMouse - 20) <= 100) {
                this.r = Math.round(255 - ((yMouse - 70) * 255 / 50));
                this.g = 0;
                this.b = 255;
            }
            else if ((yMouse - 20) <= 150) {
                this.r = 0;
                this.g = Math.round((yMouse - 120) * 255 / 50);
                this.b = 255;
            }
            else if ((yMouse - 20) <= 200) {
                this.r = 0;
                this.g = 255;
                this.b = Math.round(255 - ((yMouse - 170) * 255 / 50));
            }
            else if ((yMouse - 20) <= 250) {
                this.r = Math.round((yMouse - 220) * 255 / 50);
                this.g = 255;
                this.b = 0;
            }
            else if ((yMouse - 20) <= 300) {
                this.r = 255;
                this.g = Math.round(255 - ((yMouse - 270) * 255 / 50));
                this.b = 0;
            }

            this.carreColorRgb = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
            this.afficher();
        }
    }

    mouseUpCarre(event: MouseEvent) {
        const xMouse = this.position('x', event);
        const yMouse = this.position('y', event);

        if ((yMouse > 20) && (yMouse < 320)){
            this.curseur2TopPosition = (yMouse - 10) + 'px';
            this.y = yMouse;
        }

        if ((xMouse > 60) && (xMouse < 360)) {
            this.curseur2LeftPosition = (xMouse - 10) + 'px';
            this.x = xMouse;
        }

        this.afficher();
    }

    public  position(axe, event) {
        if (axe == 'x')
            return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.dialogXpos - window.pageXOffset;
        else
            return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.dialogYpos - window.pageYOffset;
    }

    //Display selected color
    public afficher() {
        this.noir = Math.round( (this.x - 60) * 100 / 300) / 100;
        this.blanc = Math.round((this.y - 20) * 100 / 300) / 100;

        this.r_1 = Math.round((255 - this.r) * this.blanc) + this.r;
        this.g_1 = Math.round((255 - this.g) * this.blanc) + this.g;
        this.b_1 = Math.round((255 - this.b) * this.blanc) + this.b;

        this.r_1 = Math.round(this.r_1 * this.noir);
        this.g_1 = Math.round(this.g_1 * this.noir);
        this.b_1 = Math.round(this.b_1 * this.noir);

        const r_hexa = this.hexadecimal( Math.floor(this.r_1 / 16) ) + this.hexadecimal( this.r_1 % 16 );
        const g_hexa = this.hexadecimal( Math.floor(this.g_1 / 16) ) + this.hexadecimal( this.g_1 % 16 );
        const b_hexa = this.hexadecimal( Math.floor(this.b_1 / 16) ) + this.hexadecimal( this.b_1 % 16 );

        this.selectedColorHex = '#' + r_hexa + g_hexa + b_hexa;
        this.selectedColorRgb = 'rgb(' + this.r_1 + ',' + this.g_1 + ',' + this.b_1 + ')';
    }

    public hexadecimal(nombre) {
        if (nombre < 10) {
            return nombre.toString(); // le nombre en chaîne de caractères.
        }
        else {
            switch (nombre) {
                case 10:
                    return 'A';
                case 11:
                    return 'B';
                case 12:
                    return 'C';
                case 13:
                    return 'D';
                case 14:
                    return 'E';
                case 15:
                    return 'F';
            }
        }
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
                    r: parseInt(result[1], 16),
                    g: parseInt(result[2], 16),
                    b: parseInt(result[3], 16)
                } : null;
    }
}

