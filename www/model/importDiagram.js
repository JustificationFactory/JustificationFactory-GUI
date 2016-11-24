/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
/// <reference path=".\model\diagram.ts" />
var KeyValueEvidence = (function () {
    function KeyValueEvidence(conclusionId, evidence) {
        this.conclusionId = conclusionId;
        this.evidence = evidence;
    }
    return KeyValueEvidence;
}());
var ParseJson2DiagramElements = (function () {
    function ParseJson2DiagramElements(globalJson) {
        this.globalJson = globalJson;
    }
    ParseJson2DiagramElements.prototype.getDiagramElements = function () {
        var conclusions = new Array();
        var strategies = new Array();
        var kvevidences = new Array();
        var links = new Array();
        for (var _i = 0, _a = this.globalJson.root.steps[0].step; _i < _a.length; _i++) {
            var step = _a[_i];
            var nameOfConclusion = step.conclusion[0].name[0];
            var typeOfConclusion = this.getTypeFromStringAttributs(JSON.stringify(step.conclusion[0].element[0].$));
            var conclusionN = new Conclusion(nameOfConclusion, step.conclusion[0], typeOfConclusion);
            conclusions.push(conclusionN);
            var nameOfstrategy = step.strategy[0].name[0];
            var typeOfstrategy = this.getTypeFromStringAttributs(JSON.stringify(step.strategy[0].$));
            var strategyN = new Strategy(nameOfstrategy, step.strategy[0], typeOfstrategy);
            strategies.push(strategyN);
            links.push(strategyN.makeLinkWithParent(conclusionN));
            for (var _b = 0, _c = step.evidences[0].evidenceRoles; _b < _c.length; _b++) {
                var evidenceRole = _c[_b];
                var nameOfEvidence = evidenceRole.evidence[0].name[0];
                var typeOfEvidence = this.getTypeFromStringAttributs(JSON.stringify(evidenceRole.evidence[0].element[0].$));
                var evidenceN = new Evidence(nameOfEvidence, evidenceRole.evidence[0], typeOfEvidence);
                kvevidences.push(new KeyValueEvidence(conclusionN.visualShape.id, evidenceN));
                links.push(evidenceN.makeLinkWithParent(strategyN));
            }
        }
        //Merge where Conclusion == Evidence
        for (var i = conclusions.length - 1; i >= 0; i--) {
            var conclusioni = conclusions[i];
            for (var i = kvevidences.length - 1; i >= 0; i--) {
                var kvevidencei = kvevidences[i];
                if ((kvevidencei.conclusionId !== conclusioni.visualShape.id)
                    && (kvevidencei.evidence.name == conclusioni.name)) {
                    //TODO: Create Support object
                    for (var i = links.length - 1; i >= 0; i--) {
                        var link = links[i];
                        if (true) {
                        }
                        else if (true) {
                        }
                    }
                }
            }
        }
        var elementsDiagram = [];
        for (var _d = 0, conclusions_1 = conclusions; _d < conclusions_1.length; _d++) {
            var conclusion = conclusions_1[_d];
            elementsDiagram.push(conclusion);
        }
        for (var _e = 0, strategies_1 = strategies; _e < strategies_1.length; _e++) {
            var strategy = strategies_1[_e];
            elementsDiagram.push(strategy);
        }
        for (var _f = 0, kvevidences_1 = kvevidences; _f < kvevidences_1.length; _f++) {
            var kvevidence = kvevidences_1[_f];
            elementsDiagram.push(kvevidence.evidence);
        }
        for (var _g = 0, links_1 = links; _g < links_1.length; _g++) {
            var link = links_1[_g];
            elementsDiagram.push(link);
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
            var d = Diagram.getInstance();
            d.showDiagram(listElements);
        };
        this.importFileReader = new FileReader();
        this.inputElement = input;
        this.importFileReader.onload = this.fileReaderLoaded; //.addEventListener('onload', this.fileReaderLoaded, false);
        this.inputElement.addEventListener('change', this.inputChanged, false);
    }
    return ImportDiagramFile;
}());
