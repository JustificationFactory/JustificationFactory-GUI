/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />
var ParseJson2DiagramElements = (function () {
    function ParseJson2DiagramElements(globalJson) {
        this.getDiagramElements = {};
        this.globalJson = globalJson;
    }
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
        };
        this.importFileReader = new FileReader();
        this.inputElement = input;
        this.importFileReader.onload = this.fileReaderLoaded; //.addEventListener('onload', this.fileReaderLoaded, false);
        this.inputElement.addEventListener('change', this.inputChanged, false);
    }
    return ImportDiagramFile;
}());
