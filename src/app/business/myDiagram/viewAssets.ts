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
/*
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

} */
