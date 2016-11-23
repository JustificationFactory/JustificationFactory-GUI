/// <reference path="..\node_modules\@types\jointjs\index.d.ts" />


class ParseJson2DiagramElements {
    globalJson: JSON;

    constructor(globalJson: JSON) {

        this.globalJson = globalJson;
    }

    public getDiagramElements = {

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

    }


}


