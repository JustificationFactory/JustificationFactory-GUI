import {AfterContentInit, Component, OnInit, ViewChild} from '@angular/core';
import {DiagramComponent} from '../../diagram/diagram.component';
import {ParseDiagramElementsResult, ParseJson2DiagramElements} from '../../../business/diagram/importDiagram';

@Component({
    //moduleId: module.id,
    selector: 'offline-view',
    templateUrl: 'offline-workspace.component.html'
    //styleUrls: ['./css/app.css']
})
export class OfflineWorkspaceComponent  implements OnInit, AfterContentInit {

    public diagramLoaded = false;
    private importFileReader: FileReader;
    private inputElement: HTMLInputElement;
    public importFileValue: string;

    @ViewChild(DiagramComponent) private diagramComponent: DiagramComponent;

    constructor (diagramComponent: DiagramComponent) {
        this.diagramComponent = diagramComponent;

    }

    ngOnInit(): void {
        this.inputElement = <HTMLInputElement>$('#importFile')[0];

        this.importFileReader = new FileReader();

        this.importFileReader.onload = this.fileReaderLoaded;
        this.inputElement.addEventListener('change', this.inputChanged, false);

        jQuery(document).bind(' keydown', this, this.documentOnKeyPress);
    }

    documentOnKeyPress (event) {
        if (event.charCode !== undefined) {
            if (event.ctrlKey && event.keyCode == 80){
                event.data.printToPdfClicked({ data: event.data });
                return false;
            }
            if (event.ctrlKey && event.keyCode == 81){
                event.data.btnCloseClick({ data: event.data });
                return false;
            }
        }
    }

    ngAfterContentInit() {
        // Component content has been initialized
        if ((sessionStorage.getItem('state') != null) && (sessionStorage.getItem('state') != '')) {
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
        const json: any = JSON.parse(this.importFileReader.result);

        if (json.steps !== undefined) {
            const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements(json);

            const deResult: ParseDiagramElementsResult = parse.getDiagramElements();

            this.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);
        }
        else if (json.graph !== undefined) {
            this.diagramComponent.loadDiagramStateFromJson(json);
        }

    }

    newDiagram(event) {
        ($('#importFile')[0] as any).value = '';
        this.diagramLoaded = true;

        //mandatory! We wait for appearance of DiagramComponent...
        setTimeout(this.showNewDiagram.bind(null, this), 100);
    }

    showNewDiagram(event) {

        const parse: ParseJson2DiagramElements = new ParseJson2DiagramElements({
            steps: {
                step: [{
                    'conclusion' : {
                        'element' : {
                            'type' : 'experimentation'
                        },
                        'name' : 'Conclusion 1'
                    },
                    'evidences' : {
                        'evidenceRoles' : [ {
                            'evidence' : {
                                'element' : {
                                    'type' : 'stimulation',
                                },
                                'name' : 'Evidence 1'
                            },
                            'role' : 'stimulation'
                        }]
                    },
                    'strategy' : {
                        'type' : 'humanStrategy',
                        'name' : 'Treat',
                        'rationale' : {
                            'axonicProject' : {
                                'pathology' : 'RATIONALE 1'
                            }
                        },
                        'actor' : {
                            'name' : 'ACTOR 1',
                            'role' : 'INTERMEDIATE_EXPERT'
                        },
                    }
                }]
            }
        });

        const deResult: ParseDiagramElementsResult = parse.getDiagramElements();

        event.diagramComponent.showDiagram(deResult.listElements, deResult.businessSteps);

    }

    btnCloseClick(event) {
        let menu = this;
        if ((menu === null) && (event !== undefined))
            menu = event.data;

        if (menu.diagramLoaded) {
            sessionStorage.setItem(menu.diagramComponent.stateSessionName, '');
            menu.diagramLoaded = false;
            menu.diagramComponent.resetEvents();

            ($('#importFile')[0] as any).value = '';
        }
    }

    importFileClicked(event) {
        event.preventDefault();

        const evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, false);
        $('#importFile')[0].dispatchEvent(evt);
    }

    undoDiagram(event) {
        this.diagramComponent.undoDiagram();
    }

    redoDiagram(event) {
        this.diagramComponent.redoDiagram();
    }

    printToPdfClicked(event) {
        if ((event !== undefined) && (event.preventDefault !== undefined))
            event.preventDefault();

        let menu = this;
        if ((menu === null) && (event !== undefined))
            menu = event.data;

        if (menu.diagramLoaded) {
            //new PDFDocument({compress: false}); // It's easier to find bugs with uncompressed files
            const doc = new PDFDocument({size: 'A4', layout: 'portrait'});
            const stream = doc.pipe(new blobStream());

            stream.on('finish', function () {
              // TODO du TODO: wtf sans déconner?
                // TODO: , 'filename=diagram.pdf') ????
                const fileURL = URL.createObjectURL(stream.toBlob('application/pdf'));
                if (fileURL != undefined)
                    window.open(fileURL);

            });

            SVGtoPDF(doc, menu.diagramComponent.getSVGFromDiagram(), 0, 0);

            doc.end();
        }
    }

    datetimeToString(date: Date): string {
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();
        const hh = date.getHours();
        const MM = date.getMinutes();
        const ss = date.getSeconds();

        return [date.getFullYear(),
            (mm > 9 ? '' : '0') + mm,
            (dd > 9 ? '' : '0') + dd,
            (hh > 9 ? '' : '0') + hh,
            (MM > 9 ? '' : '0') + MM,
            (ss > 9 ? '' : '0') + ss,
        ].join('');
    }

    exportJsonToTextFile(data: any) {
        const a: HTMLAnchorElement = document.getElementById('toExport') as HTMLAnchorElement;
        let fileName: string;

        fileName = 'adm_' + this.datetimeToString(new Date()) + '.json';

        const json = JSON.stringify(data),
            blob = new Blob([json], {type: 'octet/stream'}),
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
        this.exportJsonToTextFile(this.diagramComponent.currentBusinessStepsToJson());
    }

}