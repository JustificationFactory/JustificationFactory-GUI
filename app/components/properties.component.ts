import { Component } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: 'properties-view',
    templateUrl: 'app/components/properties.component.html',

    //styleUrls: ['./css/app.css']
})
export class PropertiesComponent {
    tree = [
        {
            text: "Parent 1",
            nodes: [
                {
                    text: "Child 1",
                    nodes: [
                        {
                            text: "Grandchild 1"
                        },
                        {
                            text: "Grandchild 2"
                        }
                    ]
                },
                {
                    text: "Child 2"
                }
            ]
        },
        {
            text: "Parent 2"
        },
        {
            text: "Parent 3"
        },
        {
            text: "Parent 4"
        },
        {
            text: "Parent 5"
        }
    ];
    tree2 = ["a","b","c"];
}