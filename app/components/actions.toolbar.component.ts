import { Component } from '@angular/core';
import { DiagramComponent } from "./diagram.component";

@Component({
    //moduleId: module.id,
    selector: 'actionstoolbar-view',
    templateUrl: 'app/components/actions.toolbar.component.html',
    //styleUrls: ['./css/app.css']
})
export class ActionsToolbarComponent {

    constructor (private diagramComponent: DiagramComponent ) {

    }

    clicked(event) {
        event.preventDefault();

        //new PDFDocument({compress: false}); // It's easier to find bugs with uncompressed files
        //TODO: , margin: 10 ==> Don't work !
        var doc = new PDFDocument({ size: 'A4', layout: 'portrait' });
        var stream = doc.pipe(new blobStream());

        stream.on('finish', function () {
            //TODO: , 'filename=diagram.pdf') ????
            var fileURL = URL.createObjectURL(stream.toBlob('application/pdf'));
            window.open(fileURL);

        });

        SVGtoPDF(doc, this.diagramComponent.getSVGFromDiagram(), 0, 0);

        doc.end();
    }
}