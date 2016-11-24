/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
/// <reference path=".\model\diagram.ts" />
var ParseJson2DiagramElements = (function () {
    function ParseJson2DiagramElements(globalJson) {
        this.globalJson = globalJson;
    }
    ParseJson2DiagramElements.prototype.getDiagramElements = function () {
        var elementsDiagram = [];
        for (var i = 0; i < this.globalJson.root.steps[0].step.length; i++) {
            var step = this.globalJson.root.steps[0].step[i];
            var nameOfConclusion = step.conclusion[0].name[0];
            var typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));
            var conclusion1 = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            elementsDiagram.push(conclusion1);
            var nameOfstrategy = step.strategy[0].name[0];
            var typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));
            var strategy1 = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            elementsDiagram.push(strategy1);
            elementsDiagram.push(strategy1.makeLinkWithParent(conclusion1));
            for (var j = 0; j < step.evidences[0].evidenceRoles.length; j++) {
                var evidenceRole = step.evidences[0].evidenceRoles[j];
                var nameOfEvidence = evidenceRole.evidence[0].name[0];
                var typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));
                var evidence1 = new Strategy(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                elementsDiagram.push(evidence1);
                elementsDiagram.push(evidence1.makeLinkWithParent(strategy1));
            }
        }
        return elementsDiagram;
    };
    ParseJson2DiagramElements.prototype.getTypeFromStringAttributs = function (strAttributs) {
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
    };
    return ParseJson2DiagramElements;
}());
var ImportDiagramWebService = (function () {
    function ImportDiagramWebService() {
    }
    return ImportDiagramWebService;
}());
var ImportDiagramFile = (function () {
    function ImportDiagramFile(input) {
        var _this = this;
        this.inputChanged = function (evt) {
            console.log('File detected');
            _this.importFileReader.readAsText(_this.inputElement.files[0]);
        };
        this.fileReaderLoaded = function (evt) {
            console.log(_this.importFileReader.result.substring(0, 200));
            var json = JSON.parse(_this.importFileReader.result);
            //TODO: Load JointJS diagram
            var parse = new ParseJson2DiagramElements(json);
            var listElements = parse.getDiagramElements();
        };
        this.importFileReader = new FileReader();
        this.inputElement = input;
        this.importFileReader.onload = this.fileReaderLoaded; //.addEventListener('onload', this.fileReaderLoaded, false);
        this.inputElement.addEventListener('change', this.inputChanged, false);
    }
    return ImportDiagramFile;
}());
