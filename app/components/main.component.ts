import {Component, OnInit, ViewChild, AfterContentInit} from '@angular/core';
import {DiagramComponent} from "./diagram.component";

@Component({
    //moduleId: module.id,
    selector: 'main-view',
    templateUrl: 'app/components/main.component.html'
    //styleUrls: ['./css/app.css']
})
export class MainComponent  implements OnInit, AfterContentInit {

    public diagramLoaded: boolean = false;
    private importFileReader : FileReader;
    private inputElement : HTMLInputElement;
    public importFileValue: string;

    @ViewChild(DiagramComponent) private diagramComponent : DiagramComponent;

    constructor (diagramComponent : DiagramComponent) {
        this.diagramComponent = diagramComponent;

    }

    ngOnInit(): void {
        this.inputElement = <HTMLInputElement>$("#importFile")[0];

        this.importFileReader = new FileReader();

        this.importFileReader.onload = this.fileReaderLoaded;
        this.inputElement.addEventListener('change', this.inputChanged, false);

    }

    ngAfterContentInit() {
        // Component content has been initialized
        if ((sessionStorage.getItem("state") != null) && (sessionStorage.getItem("state") != "")) {
            //this.diagramComponent.loadDiagramFromJSON(JSON.parse(sessionStorage.getItem("state")));
            this.diagramLoaded = true;
        }
    }

    private inputChanged = (evt: Event) => {
        console.log('File detected');
        this.importFileReader.readAsText(this.inputElement.files[0]);

        this.diagramLoaded = true;
    }

    private fileReaderLoaded = (evt: Event) => {
        
        console.log(this.importFileReader.result.substring(0, 200));
        var json : any = JSON.parse(this.importFileReader.result);

        var parse : ParseJson2DiagramElements = new ParseJson2DiagramElements(json);

        var deResult : ParseDiagramElementsResult = parse.getDiagramElements();

        this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);

    }


    btnCloseClick(event) {
        this.diagramLoaded = false;
        this.diagramComponent.resetEvents();

        ($("#importFile")[0] as any).value = "";
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
