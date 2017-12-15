import * as joint from 'jointjs';
import {dia, shapes} from 'jointjs';
import {Colors, Shapes} from './viewAssets';
import {Step} from '../ArgSystem';
import {Util} from '../diagram/diagram';
import Cell = dia.Cell;
import Path = shapes.basic.Path;
import Link = dia.Link;

export abstract class ViewElement {
  private _cell: Cell;
  private _item: Object;
  private _name: string;
  private _id: string;

  constructor(item: any) {
    this._item = item;
    if (item.name === null) {
      this._name = 'GENERATED_NAME_CAUSE_NULL';
    } else {
      this._name = item.name;
    }
    if (item.id === undefined) {
      this._id = Util.getNewGuid() as string;
    } else {
      this._id = item.id;
    }
  }

  public abstract build(): void;

  get cell(): dia.Cell {
    return this._cell;
  }

  get item(): Object {
    return this._item;
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }

  set cell(value: dia.Cell) {
    this._cell = value;
  }

}

export class ViewLink {
  private _sourceId;
  private _targetid;
  private _link: Link;

  constructor(parent: ViewElement, child: ViewElement) {
    const link = new Link();
    link.attributes = {
      source: {
        id: parent.id
      },
      target: {
        id: child.id
      },
      attrs: {
        '.marker-target': {d: 'M 4 0 L 0 2 L 4 4 z'},
        '.link-tools': {visibility: 'collapse'},
        '.marker-arrowheads': {visibility: 'collapse'},
        '.marker-vertices': {visibility: 'collapse'},
        '.labels': {visibility: 'collapse'},
        '.connection-wrap': {visibility: 'collapse'}
      }
    };
    this._link = link;

    this._sourceId = parent.id;
    this._targetid = child.id;
  }

  get sourceId() {
    return this._sourceId;
  }

  get targetid() {
    return this._targetid;
  }

  get link(): dia.Link {
    return this._link;
  }

// TODO: implement modifiers
}

export class ViewStep {
// TODO: privatiser et tout dans les classes, faire ça bien
  private viewStrategy: ViewStrategy;
  private viewConclusion: ViewConclusion;
  private viewEvidences: ViewEvidence[];
  private viewSupports: ViewSupport[];
  private viewLinks: ViewLink[];

  constructor(step: Step) {
    this.viewEvidences = [];
    this.viewSupports = [];
    this.viewLinks = [];
    this.build(step);
  }

  private build(step: Step) {
    // TODO: insert test to make sure the field is actually here
    this.viewConclusion = new ViewConclusion(step.conclusion);
    this.viewConclusion.build();
    this.viewStrategy = new ViewStrategy(step.strategy);
    this.viewStrategy.build();
    this.viewLinks.push(new ViewLink(this.viewConclusion, this.viewStrategy));

    for (const evidence of step.evidences) {
      const viewEvidence = new ViewEvidence(evidence);
      const viewSupport = new ViewSupport(evidence.support);
      viewEvidence.build();
      viewSupport.build();
      this.viewEvidences.push(viewEvidence);
      this.viewSupports.push(viewSupport);

      this.viewLinks.push(new ViewLink(viewEvidence, viewSupport));
      this.viewLinks.push(new ViewLink(this.viewStrategy, viewEvidence));
    }
  }

  public getViewElements() {
    const result: ViewElement[] = [];
    result.push(this.viewStrategy, this.viewConclusion);
    result.concat(this.viewEvidences, this.viewSupports);

    return result;
  }

  public getViewLinks() {
    return this.viewLinks;
  }

  public getCells() {
    const result: Cell[] = [];

    for (const ve of this.getViewElements()) {
      result.push(ve.cell);
    }
/*
    for (const vl of this.getViewLinks()) {
      result.push(vl.cell);
    }*/

    return result;
  }

  public getLinks() {
    const result: Link[] = [];
    for (const vl of this.getViewLinks()) {
      result.push(vl.link);
    }

    return result;
  }

}

export class ViewConclusion extends ViewElement {

  build() {
    this.cell = new Path({
      id: this.id,
      size: {width: Util.getElementWidthFromTextLength(this.name), height: Util.getElementHeightFromTextLength(this.name)},
      attrs: {
        path: {d: Shapes.RoundedRectangleShape, fill: Colors.Green},
        text: {text: this.name, 'ref-y': .3, fill: '#000000'}
      }
    });
    console.log('Conclusion id: ' + this.id);
  }

}

export class ViewStrategy extends ViewElement {

  build() {
    this.cell = new Path({
      id: this.id,
      size: {
        // TODO: généralisable potentiellement à voir comment réagi joint
        width: Util.getElementWidthFromTextLength(this.name),
        height: Util.getElementHeightFromTextLength(this.name)
      },
      attrs: {
        path: {d: Shapes.ParallelogramShape, fill: Colors.DarkGreen},
        text: {text: this.name, 'ref-y': .3, fill: '#FFFFFF'}
      }
    });
    console.log('Strategy id: ' + this.id);
  }

}

export class ViewSupport extends ViewElement {

  build() {
    this.cell = new Path({
      id: this.id,
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
    console.log('Support id: ' + this.id);
  }

}

export class ViewEvidence extends ViewElement {
  role: string;

  constructor(item: any) {
    super(item);
    this.role = item.role;
  }

  build() {
    this.cell = new joint.shapes.basic.Path({
      id: this.id,
      size: {
        width: Util.getElementWidthFromTextLength(this.role),
        height: Util.getElementHeightFromTextLength(this.role)
      },
      attrs: {
        path: {d: Shapes.RoundedRectangleShape, fill: Colors.Yellow},
        text: {text: this.name, 'ref-y': .3, fill: '#000000'}
      }
    });
    console.log('Evidence id: ' + this.id);
  }

}


