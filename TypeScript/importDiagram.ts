/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
/// <reference path=".\model\diagram.ts" />



class ParseJson2DiagramElements {
    globalJson: JSON;

    constructor(globalJson: JSON) {

        this.globalJson = globalJson;
    }


    public getDiagramElements () : any[] {

        var elementsDiagram: any[] = [];

        for (var i = 0; i < this.globalJson.root.steps[0].step.length ; i++) {
            var step  = this.globalJson.root.steps[0].step[i];
            var nameOfConclusion = step.conclusion[0].name[0];
            var typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));

            var conclusion1 = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            elementsDiagram.push(conclusion1);

            var nameOfstrategy = step.strategy[0].name[0];
            var typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));

            var strategy1 = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            elementsDiagram.push(strategy1);
            elementsDiagram.push(strategy1.makeLinkWithParent(conclusion1));

            for(var j = 0 ; j < step.evidences[0].evidenceRoles.length ; j++) {
                var evidenceRole = step.evidences[0].evidenceRoles[j];
                var nameOfEvidence = evidenceRole.evidence[0].name[0];
                var typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));

                var evidence1 = new Strategy(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                elementsDiagram.push(evidence1);
                elementsDiagram.push(evidence1.makeLinkWithParent(strategy1));
            }
        }

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
        var json : JSON = JSON.parse(this.importFileReader.result);

        //TODO: Load JointJS diagram
        var parse : ParseJson2DiagramElements = new ParseJson2DiagramElements(json);

        var listElements = parse.getDiagramElements();

    }


}


