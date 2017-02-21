import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {DiagramComponent} from "../../app/components/diagram.component";
import {PropertiesComponent} from "../../app/components/properties.component";
import {ActionsToolbarComponent} from "../../app/components/actions.toolbar.component";
import {EditToolbarComponent} from "../../app/components/edit.toolbar.component";
import {PaletteComponent} from "../../app/components/palette.component";
import {DebugElement} from "@angular/core";


describe("actions.toolbar.component.", () => {

    let comp:    DiagramComponent;
    let fixture: ComponentFixture<DiagramComponent>;

    let actionsToolbarComp:    ActionsToolbarComponent;
    let actionsToolbarFixture: ComponentFixture<ActionsToolbarComponent>;

    let elements: Array<DiagramElement>;
    let businessSteps: Array<Step>;
    let de: DebugElement;
    let el: HTMLElement;

    let nbElements : number;
    let nbElementsThatMustBeDeletedInThisTest : number;
    let selectedElement : DiagramElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DiagramComponent, PropertiesComponent, ActionsToolbarComponent, EditToolbarComponent, PaletteComponent ], // declare the test component
        });

        // Overrides here, if you need them
        TestBed.overrideComponent(DiagramComponent, {
            set: {
                templateUrl: 'base/app/components/diagram.component.html',
                providers: [
                    ActionsToolbarComponent,
                    PropertiesComponent
                ]
            }
        })
        TestBed.overrideComponent(PropertiesComponent, {
            set: {
                templateUrl: 'base/app/components/properties.component.html'
            }
        });
        TestBed.overrideComponent(ActionsToolbarComponent, {
            set: {
                templateUrl: 'base/app/components/actions.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(EditToolbarComponent, {
            set: {
                templateUrl: 'base/app/components/edit.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(PaletteComponent, {
            set: {
                templateUrl: 'base/app/components/palette.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            //compilation succeed (async needed)
        }).catch(function(e) {
            console.log(e); // "zut !"
        });

        elements = new Array<DiagramElement>();
        businessSteps = new Array<Step>();
        let step;
        let conclusion, strategy, evidence, rationale, actor;

        //TODO: Links & Supports are not created currently

        nbElements = 0;
        nbElementsThatMustBeDeletedInThisTest = 0;

        step = new Step(undefined);



        conclusion = new Conclusion("Experimentation", {}, "experimentation");
        selectedElement = conclusion;

        elements.push(conclusion);
        nbElements++;
        step.items.push(conclusion);

        strategy = new Strategy("Treat", {}, "humanStrategy");
        elements.push(strategy);
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        elements.push(strategy.makeLinkWithParent(conclusion));
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        step.items.push(strategy);

        rationale = new Rationale("", {
            "axonicProject": {
                "pathology": "OBESITY",
                "stimulator": "AXIS"
            }
        }, "");
        strategy.artifacts.push(rationale);
        elements.push(rationale);
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;

        evidence = new Evidence("Stimulation 0", {}, "stimulation");
        elements.push(evidence);
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        elements.push(evidence.makeLinkWithParent(strategy));
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        step.items.push(evidence);
        evidence = new Evidence("Subject 0", {}, "subject");
        elements.push(evidence);
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        elements.push(evidence.makeLinkWithParent(strategy));
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        step.items.push(evidence);

        actor = new Actor("Chloé", {}, "INTERMEDIATE_EXPERT");
        strategy.artifacts.push(actor);
        elements.push(actor);
        nbElementsThatMustBeDeletedInThisTest++;
        nbElements++;

        businessSteps.push(step);

        step = new Step(undefined);

        conclusion = new Conclusion("Establish Effect", {}, "establishedEffect");
        elements.push(conclusion);
        nbElements++;
        step.items.push(conclusion);

        strategy = new Strategy("Establish Effect", {}, "humanStrategy");
        elements.push(strategy);
        nbElements++;
        elements.push(strategy.makeLinkWithParent(conclusion));
        nbElements++;
        step.items.push(strategy);

        rationale = new Rationale("", {
            "axonicProject": {
                "pathology": "OBESITY",
                "stimulator": "AXIS"
            }
        }, "");
        strategy.artifacts.push(rationale);
        elements.push(rationale);
        nbElements++;

        //evidence = new Evidence("Experimentation", {}, "experimentation");
        elements.push(selectedElement.makeLinkWithParent(strategy));
        nbElements++;
        step.items.push(selectedElement);

        actor = new Actor("Chloé", {}, "INTERMEDIATE_EXPERT");
        strategy.artifacts.push(actor);
        elements.push(actor);
        nbElements++;
        businessSteps.push(step);

    }));



    describe("Diagram manipulations.", () => {

        it('remove steps', () => {

            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            actionsToolbarFixture = TestBed.createComponent(ActionsToolbarComponent);
            actionsToolbarComp = actionsToolbarFixture.componentInstance; // DiagramComponent test instance
            actionsToolbarComp.businessSteps = businessSteps;
            actionsToolbarComp._graph = comp.getGraph();

            expect(comp.getCellsGraph().length).toEqual(nbElements);

            actionsToolbarComp.removeStep(selectedElement, selectedElement.visualShape.id);

            actionsToolbarFixture.detectChanges();
            fixture.detectChanges();

            expect(comp.getCellsGraph().length).toEqual(nbElements - nbElementsThatMustBeDeletedInThisTest);
            expect(comp.businessSteps.length).toEqual(1);

        });

    });

});