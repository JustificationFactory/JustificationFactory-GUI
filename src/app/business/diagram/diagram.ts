import * as _ from 'lodash';

import * as joint from 'jointjs';
import Cell = joint.dia.Cell;

export class DiagramElement {

  public static RectangleShape = 'M 0 0 L 60 0 L 60 30 L 0 30 Z';
  public static RoundedRectangleShape = 'M 0 6 Q 0 0 6 0 L 54 0 Q 60 0 60 6 L 60 24 Q 60 30 54 30 L 6 30 Q 0 30 0 24 Z';
  public static ParallelogramShape = 'M 10 0 L 70 0 L 60 30 L 0 30 Z';

  public static SolidBorder = '';
  public static DashBorder = '5,5';
  public static MixBorder = '10,2,10';

  visualShape: Cell;
  jsonElement: any;
  name: string;
  description: string;
  type: string;
  artifacts: Array<Artifact>;
  stepId: String;




  constructor(name: string, jsonElement: any, type: string) {
    this.name = name;
    this.jsonElement = jsonElement;
    this.type = type;
    this.description = '';
    this.artifacts = [];
  }

  makeLinkWithParent(parentElement: DiagramElement): LinkElement {
    return new LinkElement(this, parentElement);
  }

  public getId(): string {
    if (typeof this.visualShape !== 'undefined') {
      return this.visualShape.id;
    }
  }
}

export enum Behavior {
  Embeded,
  Near
}

export class LinkElement extends DiagramElement {
  constructor(public sourceElement: DiagramElement, public targetElement: DiagramElement) {
    super('', JSON.parse('{}'), '');
    this.visualShape = new joint.dia.Link({
      source: {id: sourceElement.visualShape.id},
      target: {id: targetElement.visualShape.id},
      attrs: {
        '.marker-target': {d: 'M 4 0 L 0 2 L 4 4 z'},
        '.link-tools': {visibility: 'collapse'},
        '.marker-arrowheads': {visibility: 'collapse'},
        '.marker-vertices': {visibility: 'collapse'},
        '.labels': {visibility: 'collapse'},
        '.connection-wrap': {visibility: 'collapse'}
      }
    });
  }

  public setSource(newElement: DiagramElement) {
    this.sourceElement = newElement;
    this.visualShape.attributes.source.id = newElement.visualShape.id;
  }

  public setTarget(newElement: DiagramElement) {
    this.targetElement = newElement;
    this.visualShape.attributes.target.id = newElement.visualShape.id;
  }
}

// DONE (quand je dis done c'est juste ls shape)
export class Support extends DiagramElement {
  artifacts: Array<Artifact>;

  constructor(public conclusion: Conclusion, public evidence: Evidence) {
    super(conclusion.name, conclusion.jsonElement, conclusion.type);

    this.visualShape = new joint.shapes.basic.Path({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(conclusion.name),
        height: Util.getElementHeightFromTextLength(name)
      },
      attrs: {
        path: {d: DiagramElement.RoundedRectangleShape, fill: '#007fcc'},
        text: {text: conclusion.name, 'ref-y': .3, fill: '#ffffff'}
      }
    });

    this.artifacts = Util.getLimitationsFromJson(conclusion.jsonElement, this);
    (this.visualShape as any).parent = this;

    if (this.artifacts.length > 0) {
      this.visualShape.attributes.size.height += Util.HeightToAddIfArtifactEmbeded;
      this.visualShape.attributes.attrs.text.y = 10;
    }
  }
}

// DONE
export class Conclusion extends DiagramElement {
  artifacts: Array<Artifact>;

  constructor(json: any) {
    super(json.name, json, json.element['@type']);
    this.visualShape = new joint.shapes.basic.Path({
      id: Util.getNewGuid(),
      size: {width: Util.getElementWidthFromTextLength(this.name), height: Util.getElementHeightFromTextLength(this.name)},
      attrs: {
        path: {d: DiagramElement.RoundedRectangleShape, fill: '#7fcc00'},
        text: {text: this.name, 'ref-y': .3, fill: '#000000'}
      }
    });

    this.artifacts = Util.getLimitationsFromJson(json, this);
    (this.visualShape as any).parent = this;

    if (this.artifacts.length > 0) {
      // TODO: ????
      this.visualShape.attributes.size.height += Util.HeightToAddIfArtifactEmbeded;
      this.visualShape.attributes.attrs.text.y = 10;
    }
  }
}

// DONE
export class Evidence extends DiagramElement {
  artifacts: Array<Artifact>;

  constructor(name: string, jsonElement: any, type: string) {
    super(name, jsonElement, type);
    this.visualShape = new joint.shapes.basic.Path({
      id: Util.getNewGuid(),
      size: {width: Util.getElementWidthFromTextLength(name), height: Util.getElementHeightFromTextLength(name)},
      attrs: {
        path: {d: DiagramElement.RoundedRectangleShape, fill: '#CCCC00'},
        text: {text: name, 'ref-y': .3, fill: '#000000'}
      }

    });
    (this.visualShape as any).parent = this;
  }

}

// DONE
export class Strategy extends DiagramElement {
  artifacts: Array<Artifact>;

  constructor(json: any) {
    super(json.name, json, json.type);

    this.visualShape = new joint.shapes.basic.Path({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(this.name),
        height: Util.getElementHeightFromTextLength(this.name)
      },
      attrs: {
        path: {d: DiagramElement.ParallelogramShape, fill: '#008000'},
        text: {text: this.name, 'ref-y': .3, fill: '#FFFFFF'}
      }

    });

    (this.visualShape as any).parent = this;
  }
}

export class Artifact extends DiagramElement {
  behavior: Behavior;

  constructor(name: string, jsonElement: any, type: string) {
    super(name, jsonElement, type);
  }

  makeLinkWithParent(parentElement) {
    const link = new LinkElement(this, parentElement);
    link.visualShape = new joint.dia.Link({
      source: {id: this.visualShape.id},
      target: {id: parentElement.visualShape.id},
      attrs: {
        '.connection': {
          'fill': 'none',
          'stroke-linejoin': 'round',
          'stroke-width': '2',
          'stroke': '#4b4a67',
          'stroke-dasharray': '1.5'
        },
        '.marker-target': {fill: 'none'},
        '.link-tools': {visibility: 'collapse'},
        '.marker-arrowheads': {visibility: 'collapse'},
        '.marker-vertices': {visibility: 'collapse'},
        '.labels': {visibility: 'collapse'},
        '.connection-wrap': {visibility: 'collapse'}
      }
    });
    return link;
  }
}

export class Limitation extends Artifact {
  constructor(name: string, jsonElement: any, type: string, parentElement: DiagramElement, index: number) {
    super(name, jsonElement, type);
    this.behavior = Behavior.Embeded;

    // A port haven't got a "visual shape"

    let widthRect = Util.getElementWidthFromTextLength(name);
    let xRect = 0;
    let yRect = 0;
    const xEcartFromMiddle = 18;
    let yLabel = 0;

    // TODO: Find how to remove port transformation (matrix...)
    // "y" of rectangle must be 25 after transformation
    // "y" of rectangle's label must be 42 after transformation

    switch (index) {
      case 0:
        // For the first limitation
        // transformation applies to the port:
        //      Limitation #1 : transform="matrix(1 0 0 1 0 22)" => y : + 22

        // We end the first limitation's rectangle just before the middle of the conclusion
        if (widthRect > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
          // if rectangle of the first port is greater than the half of the conclusion
          // x position shift to the left
          xRect = -(widthRect - (parentElement.visualShape.attributes.size.width / 2) + xEcartFromMiddle);
        }
        else
          xRect = (parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle - widthRect;

        yRect = 3; //  22 + 3 = 25
        yLabel = 20; //  22 + 20 = 42
        break;

      case 1 :
        // For the second limitation
        // transformation applies to the port:
        //      Limitation #1 : transform="matrix(1 0 0 1 0 11)" => y : + 11
        //      Limitation #2 : transform="matrix(1 0 0 1 0 33)" => y : + 33

        // We begin the second limitation's rectangle just after the middle of the conclusion
        if ((parentElement.visualShape as any).portData.ports[0].attrs.rect.width > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
          // if rectangle of the first port is greater than the half of the conclusion
          // x position shift to the left
          xRect = (parentElement.visualShape as any).portData.ports[0].attrs.rect.x
            + (parentElement.visualShape as any).portData.ports[0].attrs.rect.width
            + (xEcartFromMiddle * 2);
        }
        else
          xRect = (parentElement.visualShape.attributes.size.width / 2) + xEcartFromMiddle;

        yRect = -8; // 33 - 8 = 25
        yLabel = 9; // 33 + 9 = 42
        break;

      case 2 :
        // For the third limitation (and so on...)
        // transformation applies to the port:
        //      Limitation #1 : transform="matrix(1 0 0 1 0 7)"  => y : + 7
        //      Limitation #2 : transform="matrix(1 0 0 1 0 22)" => y : + 22
        //      Limitation #3 : transform="matrix(1 0 0 1 0 37)" => y : + 37

        // just show '...' instead of the real name, to indicate there are more than 2 limitations
        name = '...';
        widthRect = 30;
        const xMargeOtherLimitations = 3;

        // We put the third limitation's rectangle at the middle middle of the conclusion
        if ((parentElement.visualShape as any).portData.ports[0].attrs.rect.width > ((parentElement.visualShape.attributes.size.width / 2) - xEcartFromMiddle)) {
          // if rectangle of the first port is greater than the half of the conclusion
          // x position shift to the left
          xRect = (parentElement.visualShape as any).portData.ports[0].attrs.rect.x
            + (parentElement.visualShape as any).portData.ports[0].attrs.rect.width
            + xMargeOtherLimitations;
        }
        else
          xRect = (parentElement.visualShape.attributes.size.width / 2) - (xEcartFromMiddle - xMargeOtherLimitations);

        yRect = -12; // 37 - 12 = 25
        yLabel = 2; // 37 + 2 = 39 (42 - 3 => for vertical alignment of "...")
        break;

      default :
      // no more limitations are accepted
    }
    yRect += 5; // 37 - 12 = 25
    yLabel += 5;
    const nameLength = $('#ruler').html(name).width();
    const xLabel = xRect + ((widthRect - nameLength) / 2);

    if (index < 3) {
      const port = {
        id: Util.getNewGuid(),
        label: {
          position: {
            name: 'manual',
            args: {
              x: xLabel,
              y: yLabel,
            }
          }
        },
        markup: 'rect',
        attrs: {
          rect: {
            fill: '#DF0606',
            rx: 5,
            ry: 10,
            x: xRect,
            y: yRect,
            width: widthRect,
            height: 25,
            stroke: '#000000'
          },
          text: {
            text: name,
            fill: '#FFFFFF',
          }
        }
      };

      (parentElement.visualShape as any).addPorts([port]);

      Limitation.reorganizePorts(parentElement.visualShape);
    }
  }

  static reorganizePorts(visual_shape: any) {
    // we must change "y" of previous ports after addPort, otherwise "y" re-switch to previous value
    if (visual_shape.portData.ports.length === 2) {
      visual_shape.portData.ports[0].attrs.rect.y = 19; // 11 + 14 = 25
      visual_shape.portData.ports[0].label.position.args.y = 36; // 11 + 31 = 42
    }
    else if (visual_shape.portData.ports.length === 3) {
      visual_shape.portData.ports[0].attrs.rect.y = 23; // 7 + 18 = 25
      visual_shape.portData.ports[0].label.position.args.y = 40; // 7 + 35 = 42
      visual_shape.portData.ports[1].attrs.rect.y = 8; // 22 + 3 = 25
      visual_shape.portData.ports[1].label.position.args.y = 25; // 22 + 20 = 42
    }
  }
}

export class Rationale extends Artifact {
  constructor(name: string, jsonElement: any, type: string) {
    super(name, jsonElement, type);
    this.behavior = Behavior.Near;

    this.name = name;

    if (jsonElement.axonicProject) {
      for (const r of Object.values(jsonElement.axonicProject)) {
        if (this.name !== '')
          this.name += ' & ';
        this.name += r;
      }
    }

    this.visualShape = new joint.shapes.basic.Rect({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(this.name),
        height: Util.getElementHeightFromTextLength(this.name)
      },
      attrs: {rect: {fill: '#FFFFFF'}, text: {text: this.name, fill: '#000000'}}
    });
    (this.visualShape as any).parent = this;
  }
}

export class Actor extends Artifact {
  constructor(name: string, jsonElement: any, role: string) {
    super(name, jsonElement, role);
    this.behavior = Behavior.Near;
    name = ((name === undefined) || (name === '')) ? ' ' : name;
    this.visualShape = new joint.shapes.basic.Rect({
      id: Util.getNewGuid(),
      size: {
        width: Util.getElementWidthFromTextLength(name),
        height: Util.getElementHeightFromTextLength(name)
      },
      attrs: {rect: {fill: '#FFFFFF'}, text: {text: name, fill: '#000000'}},
      markup: Util.getSVGActorImage(role, name)
    });
    (this.visualShape as any).parent = this;
  }
}

export class Step {
  private stepId: String;
  public items: Array<DiagramElement>;

  constructor(id: String) {
    // TODO: mouais, à vocation à disparaitre je pense
    if ((id === undefined) || (id === ''))
      this.stepId = Util.getNewGuid();
    else
      this.stepId = id;

    this.items = [];
  }

  public getStepId(): String {
    return this.stepId;
  }
}

export class Util {
  static HeightToAddIfArtifactEmbeded = 12;
  static MaxUndo = 20;
  static ActorHuman = 'human';
  static ActorExpert = 'expert';
  static ActorComputer = 'computed';

  static getElementWidthFromTextLength(name: string) {
    const maxLine = _.max(name.split('\n'), function (l) {
      return l.length;
    });
    const maxLineWidth = $('#ruler').html(maxLine).width();
    return maxLineWidth + 40;
  }

  static getElementHeightFromTextLength(name: string) {
    const maxLineLength = _.max(name.split('\n'), function (l) {
      return l.length;
    }).length;
    // Compute width/height of the rectangle based on the number
    // of lines in the label and the letter size. 0.6 * letterSize is
    // an approximation of the monospace font letter width.
    const letterSize = 8;
    const height = 2 * ((name.split('\n').length + 1) * letterSize);
    return height;
  }

  static getNewGuid(): String {
    function S4() {
      // TODO: waow tout ca pour un id
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    // then to call it, plus stitch in '4' in the third group
    return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
  }

  // TODO: don't know how this is useful
  static getLimitationsFromJson(jsonElement: any, parentElement: DiagramElement): Array<Artifact> {
    const artifacts = [];
    let index = 0;

    if (jsonElement[0] && jsonElement[0].hasOwnProperty('limits')) {
      for (const limit of Object.keys(jsonElement[0].limits)) {
        artifacts.push(new Limitation(limit, [jsonElement[0].limits[limit]], '', parentElement, index++));
      }
    }

    return artifacts;
  }

  static getSVGActorImage(actorType: string, name: string): string {
    const width = Util.getElementWidthFromTextLength(name) - 40;
    let result = '<svg version="1.0" xmlns="http://www.w3.org/2000/svg" tooltipPlacement="top" tooltip="' + actorType + '"'
      + ' width="40pt" height="40pt"  viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" >';
    // + ((width > 60) ? 'x="' + ((width / 2) - 10).toString() + '"' : '') +'>';

    if (actorType.toLowerCase().indexOf(Util.ActorExpert) >= 0) {
      result += `<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">
                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360
                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103
                        374 -235 721 -615 629z"></path>
                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119
                        -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22
                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395
                        20 -302 0 -323 -2 -395 -23z m549 -100 c5 -22 -75 -194 -98 -213 -9 -8 -10
                        -12 -3 -13 13 0 13 -1 57 -620 4 -51 1 -60 -43 -127 -25 -40 -51 -75 -57 -77
                        -6 -2 -31 30 -56 72 l-45 77 13 225 c17 289 32 443 45 451 6 3 3 11 -7 19 -9
                        8 -36 56 -60 108 -59 125 -60 123 115 120 125 -3 136 -4 139 -22z"></path>
                        </g>
                        <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#9E9E9E" stroke="none">

                        <path class="node" id="node4" d="M1511 1526 c-9 -11 -2 -33 33 -108 24 -52 51 -100 60 -108 10 -8 13
                        -16 7 -19 -13 -8 -28 -162 -45 -451 l-13 -225 45 -77 c25 -42 50 -74 56 -72 6
                        2 32 37 57 77 44 67 47 76 43 127 -44 619 -44 620 -57 620 -7 1 -6 5 3 13 23
                        19 103 191 98 213 -3 18 -14 19 -139 22 -108 2 -139 0 -148 -12z"></path>
                        </g>`;
    }
    else if (actorType.toLowerCase().indexOf(Util.ActorComputer) >= 0) {
      result += `<g transform="translate(0.000000,270.000000)  scale(0.400000,-0.400000)" fill="#030303" stroke="none">
                        <path d="M61.2,341.538c4.9,16.8,11.7,33,20.3,48.2l-24.5,30.9c-8,10.1-7.1,24.5,1.9,33.6l42.2,42.2c9.1,9.1,23.5,9.899,33.6,1.899
                        l30.7-24.3c15.8,9.101,32.6,16.2,50.1,21.2l4.6,39.5c1.5,12.8,12.3,22.4,25.1,22.4h59.7c12.8,0,23.6-9.601,25.1-22.4l4.4-38.1
                        c18.8-4.9,36.8-12.2,53.7-21.7l29.7,23.5c10.1,8,24.5,7.1,33.6-1.9l42.2-42.2c9.1-9.1,9.9-23.5,1.9-33.6l-23.1-29.3
                        c9.6-16.601,17.1-34.3,22.1-52.8l35.6-4.1c12.801-1.5,22.4-12.3,22.4-25.1v-59.7c0-12.8-9.6-23.6-22.4-25.1l-35.1-4.1
                        c-4.801-18.3-12-35.8-21.199-52.2l21.6-27.3c8-10.1,7.1-24.5-1.9-33.6l-42.1-42.1c-9.1-9.1-23.5-9.9-33.6-1.9l-26.5,21
                        c-17.2-10.1-35.601-17.8-54.9-23l-4-34.3c-1.5-12.8-12.3-22.4-25.1-22.4h-59.7c-12.8,0-23.6,9.6-25.1,22.4l-4,34.3
                        c-19.8,5.3-38.7,13.3-56.3,23.8l-27.5-21.8c-10.1-8-24.5-7.1-33.6,1.9l-42.2,42.2c-9.1,9.1-9.9,23.5-1.9,33.6l23,29.1
                        c-9.2,16.6-16.2,34.3-20.8,52.7l-36.8,4.2c-12.8,1.5-22.4,12.3-22.4,25.1v59.7c0,12.8,9.6,23.6,22.4,25.1L61.2,341.538z
                         M277.5,180.038c54.4,0,98.7,44.3,98.7,98.7s-44.3,98.7-98.7,98.7c-54.399,0-98.7-44.3-98.7-98.7S223.1,180.038,277.5,180.038z"/>
                        </g>`;
    }
    else {
      result += `<g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="#030303" stroke="none">
                        <path class="node" id="node1" d="M1526 2694 c-223 -54 -386 -263 -386 -494 0 -140 50 -262 149 -360
                        102 -102 218 -150 357 -150 146 0 258 46 359 145 72 70 109 133 136 230 103
                        374 -235 721 -615 629z"></path>
                        <path class="node" id="node2" d="M1249 1616 c-150 -45 -278 -138 -360 -263 -101 -152 -119 -249 -119
                            -636 l0 -267 23 -9 c192 -77 639 -151 911 -151 276 0 610 62 776 143 l45 22
                        -1 320 c-1 316 -1 321 -27 400 -73 223 -237 382 -458 444 -70 19 -98 21 -395
                        20 -302 0 -323 -2 -395 -23z"></path>
                        </g>`;
    }

    result += '</svg> <text x="-10" y="100" font-size="14"></text>'; // this works like a template for actor name !

    return result;
  }

  static stateToJSON(businessSteps: Array<Step>, jsonGraph: any, states: any) {
    const jsonBusinessSteps = [];

    for (const businessStep of businessSteps) {
      const businessElements = [];

      for (const item of businessStep.items) {
        const artifactElements = [];

        for (const artifactElement of item.artifacts) {
          artifactElements.push({
            elementType: artifactElement.constructor.name,
            name: artifactElement.name,
            description: artifactElement.description,
            type: artifactElement.type,
            visualShapeId: (artifactElement.visualShape !== undefined) ? artifactElement.visualShape.id : undefined,
            jsonElement: artifactElement.jsonElement,
          });
        }

        let jsonSupport: any;

        if (item instanceof Support) {
          jsonSupport = {
            stepId_conclusion: (item as Support).conclusion.stepId,
            stepId_evidence: (item as Support).evidence.stepId
          };
        }

        businessElements.push({
          elementType: item.constructor.name,
          name: item.name,
          description: item.description,
          type: item.type,
          visualShapeId: item.visualShape.id,
          jsonElement: item.jsonElement,
          artifacts: artifactElements,
          support: jsonSupport
        });
      }

      jsonBusinessSteps.push({
        id: businessStep.getStepId(),
        elements: businessElements
      });
    }

    if (states === undefined)
      states = {};

    if (states.previous === undefined)
      states.previous = [];

    if ((states.currentIndex !== undefined) && (states.currentIndex > 0) && (states.previous.length >= states.currentIndex))
      states.previous.splice(states.previous.length - states.currentIndex);

    states.currentIndex = 0;
    if (states.previous.length > Util.MaxUndo)
      states.previous.splice(0, 1);

    states.previous.push({
      changeDate: new Date(),
      businessSteps: jsonBusinessSteps,
      graph: jsonGraph
    });

    return states;
  }

  static stateFromJSON(states: any, result: any, indexState: number) {

    if ((indexState === undefined) || (indexState < 0))
      states.currentIndex = 0;
    else if ((indexState === undefined) || (indexState > Util.MaxUndo))
      states.currentIndex = Util.MaxUndo;
    else if ((indexState !== undefined) && (states.previous !== undefined) && (indexState > states.previous.length))
      states.currentIndex = states.previous.length;
    else
      states.currentIndex = indexState;

    if ((states.previous !== undefined) && (states.previous.length >= states.currentIndex)) {
      const state = states.previous[states.previous.length - 1 - states.currentIndex];

      result.changeDate = state.changeDate;
      result.jsonBusinessSteps = state.businessSteps;
      result.graph = state.graph;
    }

    return states;

  }

  static businessStepsFromJSON(jsonBusinessSteps: any, cells: Array<Cell>, result: any) {

    result.businessSteps = new Array<Step>();

    for (const step of jsonBusinessSteps) {
      const businessStep = new Step(step.id);

      for (const element of step.elements) {
        let businessElement: DiagramElement;

        switch (element.elementType) {
          case 'Conclusion':
            businessElement = new Conclusion(element);
            break;
          case 'Strategy':
            businessElement = new Strategy(element);
            break;
          case 'Evidence':
            businessElement = new Evidence(element.name, element.jsonElement, element.type);
            break;
          case 'Support':
            // Intermediate step (not correct Conclusion and Evidence! cf. stateRebuildVisualShapeAssociation function)
            businessElement = new Support(new Conclusion(element), new Evidence(element.name, element.jsonElement, element.type));
            break;
        }

        if (businessElement !== undefined) {
          businessElement.stepId = businessStep.getStepId();
          businessElement.description = element.description;

          // VisualShape association
          for (const cell of cells) {
            if (element.visualShapeId === cell.id) {
              businessElement.visualShape = cell;
              (cell as any).parent = businessElement;
              break;
            }
          }

          if (businessElement.artifacts === undefined)
            businessElement.artifacts = new Array<Artifact>();

          // Artifact association
          if (element.artifacts !== undefined) {
            for (const artifact of element.artifacts) {
              let businessArtifact: Artifact;

              switch (artifact.elementType) {
                case 'Limitation':
                  // Not necessary: Creation into Conclusion constructor
                  break;
                case 'Actor':
                  businessArtifact = new Actor(artifact.name, artifact.jsonElement, artifact.type);
                  break;
                case 'Rationale':
                  businessArtifact = new Rationale(artifact.name, artifact.jsonElement, artifact.type);
                  break;
              }

              if (businessArtifact !== undefined) {
                // VisualShape association
                for (const cell of cells) {
                  if (artifact.visualShapeId === cell.id) {
                    businessArtifact.visualShape = cell;
                    (cell as any).parent = businessArtifact;
                    break;
                  }
                }

                businessElement.artifacts.push(businessArtifact);
              }
            }
          }

          businessStep.items.push(businessElement);
        }
      }

      result.businessSteps.push(businessStep);
    }

    // Associate correct business element (Conclusion / Evidence) to Support element
    const supportIds = new Array<String>();
    for (const step of jsonBusinessSteps) {
      for (const element of step.elements) {
        if ((element.elementType === 'Support') && (!supportIds.find((s) => s === element.visualShapeId))) {
          supportIds.push(element.visualShapeId);
          let support_conclusion: DiagramElement;
          let support_evidence: DiagramElement;

          for (const bStep of result.businessSteps) {
            for (const bElement of bStep.items) {
              // Find correct Conclusion
              if ((element.support.stepId_conclusion === bStep.stepId) && (bElement instanceof Conclusion)) {
                support_conclusion = bElement;
                break;
              }

              // Find correct Evidence
              if ((element.support.stepId_evidence === bStep.stepId) && (bElement instanceof Evidence) && (bElement.name === element.name)) {
                support_evidence = bElement;
                break;
              }
            }
          }

          // Find Supports and replace Conclusion and Evidence
          for (const bStep of result.businessSteps) {
            for (const bElement of bStep.items) {
              if (element.visualShapeId === bElement.visualShape.id) {
                bElement.conclusion = support_conclusion;
                bElement.evidence = support_evidence;
              }
            }
          }
        }
      }
    }
  }

}
