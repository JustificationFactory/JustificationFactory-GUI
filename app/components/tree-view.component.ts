import {Component, Input} from '@angular/core';

@Component ({
    selector: 'tree-view',
    template: `<tr *ngFor="let node of treeData">
                  {{node.text}}
                </tr>
                <tree-view [treeData]="node.subnodes"></tree-view>
                `
})
export class TreeViewComponent {
    @Input() treeData: JSON;
}


