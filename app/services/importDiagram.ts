/// <reference path=".\diagram.ts" />

class KeyValueEvidence {
    constructor(public conclusionId: string, public evidence: Evidence) {

    }
}

class ParseJson2DiagramElements {
    globalJson: any;

    constructor(globalJson: any) {

        this.globalJson = globalJson;
    }

    public getDiagramElements () : DiagramElement[] {

        var conclusions = new Array<Conclusion>();
        var strategies = new Array<Strategy>();
        var kvevidences = new Array<KeyValueEvidence>();
        var links = new Array<LinkElement>();

        for (var step  of this.globalJson.root.steps[0].step) {
            var nameOfConclusion = step.conclusion[0].name[0];
            var typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));

            var conclusionN = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            conclusions.push(conclusionN);

            var nameOfstrategy = step.strategy[0].name[0];
            var typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));

            var strategyN = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            strategies.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));

            for(var evidenceRole of step.evidences[0].evidenceRoles) {
                var nameOfEvidence = evidenceRole.evidence[0].name[0];
                var typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));

                var evidenceN = new Evidence(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.visualShape.id, evidenceN));
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }
        }

        //Merge where Conclusion == Evidence
        for(var i = conclusions.length -1 ; i >= 0 ; i--) {
            var conclusioni = conclusions[i];

            for(var i = kvevidences.length -1 ; i >= 0 ; i--) {
                var kvevidencei = kvevidences[i];

                if ((kvevidencei.conclusionId !== conclusioni.visualShape.id)
                    && (kvevidencei.evidence.name == conclusioni.name)) {

                    //TODO: Create Support object

                    for(var i = links.length -1 ; i >= 0 ; i--) {
                        var link = links[i];

                        if (i == 1) {
                            //TODO: Create Support link from source conclusion

                            //TODO: Delete link from list
                        }
                        else if (i == 2) {
                            //TODO: Create Support link to destination evidence

                            //TODO: Delete link from list
                        }
                    }

                    //TODO: Delete Evidence from list
                    //TODO: Delete Conclusion from list
                }
            }
        }


        var elementsDiagram: DiagramElement[] = [];

        for(var conclusion of conclusions)
            elementsDiagram.push(conclusion);
        for(var strategy of strategies)
            elementsDiagram.push(strategy);
        for(var kvevidence of kvevidences)
            elementsDiagram.push(kvevidence.evidence);
        for(var link of links)
            elementsDiagram.push(link);

        return elementsDiagram;
    }

    private getTypeFromStringAttributs (strAttributs : string) : string {

        var type = "";

        try {
            var index1 = strAttributs.indexOf('"xsi:type":"') + 12;
            var str1 = strAttributs.substring(index1);
            var index2 = str1.indexOf('"');
            type = str1.substring(0, index2);
        }
        catch (e) {

        }

        return type;
    }
}

class ImportDiagramWebService {

}

class ImportDiagramFile {
    importFileReader : FileReader;
    inputElement: HTMLInputElement;

    constructor(input: HTMLInputElement) {

        this.importFileReader = new FileReader();
        this.inputElement = input;

        this.importFileReader.onload = this.fileReaderLoaded;  //.addEventListener('onload', this.fileReaderLoaded, false);
        this.inputElement.addEventListener('change', this.inputChanged, false);
    }

    private inputChanged = (evt:Event) => {
        console.log('File detected');
        this.importFileReader.readAsText(this.inputElement.files[0]);
    }

    private fileReaderLoaded = (evt:Event) => {
        console.log(this.importFileReader.result.substring(0, 200));
        var json : any = JSON.parse(this.importFileReader.result);

        //TODO: Load JointJS diagram
        var parse : ParseJson2DiagramElements = new ParseJson2DiagramElements(json);

        var listElements = parse.getDiagramElements();

        var d = Diagram.getInstance();
        d.showDiagram(listElements);
    }


}


