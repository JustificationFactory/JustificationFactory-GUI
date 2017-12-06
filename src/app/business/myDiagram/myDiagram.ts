import * as joint from 'jointjs';
import {dia, shapes} from 'jointjs';
import {Util} from '../diagram/diagram';
import Cell = dia.Cell;
import Path = shapes.basic.Path;

export enum Shapes {
  RectangleShape = 'M 0 0 L 60 0 L 60 30 L 0 30 Z',
  RoundedRectangleShape = 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z',
  ParallelogramShape = 'M 10 0 L 70 0 L 60 30 L 0 30 Z'
}

export enum Borders {
  SolidBorder = '',
  DashBorder = '5,5',
  MixBorder = '10,2,10'
}

export enum Colors {
  Green = '#7fcc00',
  DarkGreen = '#008000',
  Blue = '#007fcc',
  Yellow = '#CCCC00',
  // TODO: same pour le field fill:
}

export abstract class ViewElement {
  cell: Cell;
  item: Object;
  name: string;

  constructor(item: any) {
    this.item = item;
    this.name = item.name;
  }

  abstract build(): void;
}

export class ViewConclusion extends ViewElement {

  build() {
    this.cell = new Path({
      id: Util.getNewGuid(),
      size: {width: Util.getElementWidthFromTextLength(this.name), height: Util.getElementHeightFromTextLength(this.name)},
      attrs: {
        path: {d: Shapes.RoundedRectangleShape, fill: Colors.Green},
        text: {text: this.name, 'ref-y': .3, fill: '#000000'}
      }
    });

  }

}

export class ViewStrategy extends ViewElement {

  build() {
    this.cell = new Path({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(this.name),
        height: Util.getElementHeightFromTextLength(this.name)
      },
      attrs: {
        path: {d: Shapes.ParallelogramShape, fill: Colors.DarkGreen},
        text: {text: this.name, 'ref-y': .3, fill: '#FFFFFF'}
      }
    });
  }

}

export class ViewSupport extends ViewElement {

  build() {
    this.cell = new Path({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(this.name),
        height: Util.getElementHeightFromTextLength(this.name)
      },
      attrs: {
        // TODO: fix text was conclusion.name
        path: {d: Shapes.RoundedRectangleShape, fill: Colors.Blue},
        text: {text: this.name, 'ref-y': .3, fill: '#ffffff'}
      }
    });
  }

}

export class ViewEvidence extends ViewElement {

  build() {
    this.cell = new joint.shapes.basic.Path({
      id: Util.getNewGuid(),
      size: {width: Util.getElementWidthFromTextLength(this.name), height: Util.getElementHeightFromTextLength(this.name)},
      attrs: {
        path: {d: Shapes.RoundedRectangleShape, fill: Colors.Yellow},
        text: {text: this.name, 'ref-y': .3, fill: '#000000'}
      }
    });
  }

}


