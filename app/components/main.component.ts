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

    undoDiagram(event) {
        this.diagramComponent.undoDiagram();
    }

    redoDiagram(event) {
        this.diagramComponent.redoDiagram();
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

    datetimeToString(date: Date) : string {
        var mm = date.getMonth() + 1; // getMonth() is zero-based
        var dd = date.getDate();
        var hh = date.getHours();
        var MM = date.getMinutes();
        var ss = date.getSeconds();

        return [date.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd,
            (hh>9 ? '' : '0') + hh,
            (MM>9 ? '' : '0') + MM,
            (ss>9 ? '' : '0') + ss,
        ].join('');
    }

    exportJsonToTextFile(data: any) {
        let a : HTMLAnchorElement = document.getElementById("toExport") as HTMLAnchorElement;
        let fileName : string;

        fileName = "adm_" + this.datetimeToString(new Date()) + ".json";

        let json = JSON.stringify(data),
            blob = new Blob([json], {type: "octet/stream"}),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;

        a.click();

        window.URL.revokeObjectURL(url);
    }

    exportFullDiagram(event) {
        this.exportJsonToTextFile(this.diagramComponent.currentDiagramStateToJson());
    }

    exportBusinessSteps(event) {
        this.exportJsonToTextFile({ name: "exportBusinessSteps" });
    }
}
