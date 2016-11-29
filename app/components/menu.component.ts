import { Component, OnInit  } from '@angular/core';
import { DiagramComponent } from "./diagram.component";

@Component({
    //moduleId: module.id,
    selector: 'menu-view',
    templateUrl: 'app/components/menu.component.html',
    //styleUrls: ['./css/app.css']
})
export class MenuComponent  implements OnInit {
    constructor (private diagramComponent: DiagramComponent ) {

    }

    ngOnInit(): void {
        var importFile = new ImportDiagramFile(<HTMLInputElement>$("#importFile")[0]);
    }

    importFileClicked(event) {
        event.preventDefault();

        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        $("#importFile")[0].dispatchEvent(evt);
    }

    printToPdfClicked(event) {
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