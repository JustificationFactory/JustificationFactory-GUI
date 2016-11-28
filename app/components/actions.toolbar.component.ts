import { Component } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'actionstoolbar-view',
    templateUrl: 'app/components/actions.toolbar.component.html',
    //styleUrls: ['./css/app.css']
})
export class ActionsToolbarComponent {
    clicked(event) {
        event.preventDefault();

        var doc = new PDFDocument({ size: 'A4', layout: 'portrait' });
        var stream = doc.pipe(blobStream());

        stream.on('finish', function () {
            //TODO: , 'filename=diagram.pdf') ????
            var fileURL = URL.createObjectURL(stream.toBlob('application/pdf');
            window.open(fileURL);

        });

        doc.text('Hello World!', 100, 100);

        doc.end();
    }
}