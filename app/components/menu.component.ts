import {Component, OnInit, ViewChild, ElementRef, Renderer, AfterViewInit, ReflectiveInjector} from '@angular/core';
 import { DiagramComponent } from "./diagram.component";
// import { EditToolbarComponent } from "./edit.toolbar.component";
// import { ActionsToolbarComponent } from "./actions.toolbar.component";


@Component({
    //moduleId: module.id,
    selector: 'menu-view',
    templateUrl: 'app/components/menu.component.html',
    //styleUrls: ['./css/app.css']
    // providers: [DiagramComponent, EditToolbarComponent, ActionsToolbarComponent]
})
export class MenuComponent  implements OnInit, AfterViewInit {

    diagramLoaded: boolean = false;

    constructor (private diagramComponent: DiagramComponent  ) {

    }

    ngOnInit(): void {
        var importFile = new ImportDiagramFile(<HTMLInputElement>$("#importFile")[0]);
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.btnClose.nativeElement, 'hide');
        // this.renderer.invokeElementMethod(this.pnlHome.nativeElement, 'show');
    }

    btnCloseClick(event) {
        this.diagramLoaded = false;
    }

    importFileClicked(event) {
        event.preventDefault();

        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, false);
        $("#importFile")[0].dispatchEvent(evt);

        this.diagramLoaded = true;
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