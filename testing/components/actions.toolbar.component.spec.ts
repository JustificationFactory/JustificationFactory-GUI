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
    let nbElementsThatMustBeAddedInThisTest : number;
    let selectedElement : DiagramElement;
    let selectedElementAddRootStep : DiagramElement;
    let selectedElementAddSubStep : DiagramElement;
    let selectedElementAddEvidence : DiagramElement;
    let selectedElementRemoveEvidence : DiagramElement;
    let itemsLengthAddEvidence : number;

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
        let conclusion, strategy, evidence, rationale, actor, support;

        //TODO: Links & Supports are not created currently

        nbElements = 0;
        nbElementsThatMustBeDeletedInThisTest = 0;
        nbElementsThatMustBeAddedInThisTest = 8;

        step = new Step(undefined);


        let conclusionSupport = new Conclusion("Experimentation", {}, "experimentation");
        let evidenceSupport = new Evidence("Experimentation", {}, "experimentation");
        support = new Support(conclusionSupport, evidenceSupport);
        selectedElement = support;

        elements.push(support);
        nbElements++;
        step.items.push(support);
        support.stepId = step.getStepId();
        step.items.push(conclusionSupport);

        strategy = new Strategy("Treat", {}, "humanStrategy");
        selectedElementAddEvidence = strategy;
        selectedElementAddEvidence.stepId = step.getStepId();
        elements.push(strategy);
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        elements.push(strategy.makeLinkWithParent(support));
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
        selectedElementRemoveEvidence = evidence;
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        elements.push(evidence.makeLinkWithParent(strategy));
        nbElements++;
        nbElementsThatMustBeDeletedInThisTest++;
        step.items.push(evidence);
        evidence = new Evidence("Subject 0", {}, "subject");
        selectedElementAddSubStep = evidence;
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

        itemsLengthAddEvidence = step.items.length;
        businessSteps.push(step);

        step = new Step(undefined);

        conclusion = new Conclusion("Establish Effect", {}, "establishedEffect");
        selectedElementAddRootStep = conclusion;
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
        step.items.push(evidenceSupport);

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

        it('add root step', () => {

            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            actionsToolbarFixture = TestBed.createComponent(ActionsToolbarComponent);
            actionsToolbarComp = actionsToolbarFixture.componentInstance; // DiagramComponent test instance
            actionsToolbarComp.businessSteps = businessSteps;
            actionsToolbarComp.selectedElement = selectedElementAddRootStep;
            actionsToolbarComp._paper = comp.getPaper();
            actionsToolbarComp._graph = comp.getGraph();

            expect(comp.getCellsGraph().length).toEqual(nbElements);

            actionsToolbarComp.addRootStep();

            actionsToolbarFixture.detectChanges();
            fixture.detectChanges();

            expect(comp.getCellsGraph().length).toEqual(nbElements + nbElementsThatMustBeAddedInThisTest);
            expect(comp.businessSteps.length).toEqual(3);
            // 4 correspond to conclusion, evidence, strategy and support
            expect(comp.businessSteps[comp.businessSteps.length-1].items.length).toEqual(4);

        });

        it('add sub step', () => {

            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            actionsToolbarFixture = TestBed.createComponent(ActionsToolbarComponent);
            actionsToolbarComp = actionsToolbarFixture.componentInstance; // DiagramComponent test instance
            actionsToolbarComp.businessSteps = businessSteps;
            actionsToolbarComp.selectedElement = selectedElementAddSubStep;
            actionsToolbarComp._paper = comp.getPaper();
            actionsToolbarComp._graph = comp.getGraph();

            expect(comp.getCellsGraph().length).toEqual(nbElements);

            actionsToolbarComp.addSubStep();

            actionsToolbarFixture.detectChanges();
            fixture.detectChanges();

            expect(comp.getCellsGraph().length).toEqual(nbElements + nbElementsThatMustBeAddedInThisTest);
            expect(comp.businessSteps.length).toEqual(3);
            // 4 correspond to conclusion, evidence, strategy and support
            expect(comp.businessSteps[comp.businessSteps.length-1].items.length).toEqual(4);
        });

        it('add evidence', () => {

            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            actionsToolbarFixture = TestBed.createComponent(ActionsToolbarComponent);
            actionsToolbarComp = actionsToolbarFixture.componentInstance; // DiagramComponent test instance
            actionsToolbarComp.businessSteps = businessSteps;
            actionsToolbarComp.selectedElement = selectedElementAddEvidence;
            actionsToolbarComp._paper = comp.getPaper();
            actionsToolbarComp._graph = comp.getGraph();

            expect(comp.getCellsGraph().length).toEqual(nbElements);

            actionsToolbarComp.addEvidence();

            actionsToolbarFixture.detectChanges();
            fixture.detectChanges();

            // + 2 correspond to element + link
            expect(comp.getCellsGraph().length).toEqual(nbElements + 2);
            expect(comp.businessSteps.length).toEqual(2);

            expect(comp.businessSteps[0].items.length).toEqual(itemsLengthAddEvidence + 1);

        });

        it('remove evidence', () => {

            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            actionsToolbarFixture = TestBed.createComponent(ActionsToolbarComponent);
            actionsToolbarComp = actionsToolbarFixture.componentInstance; // DiagramComponent test instance
            actionsToolbarComp.businessSteps = businessSteps;
            actionsToolbarComp.selectedElement = selectedElementRemoveEvidence;
            actionsToolbarComp._paper = comp.getPaper();
            actionsToolbarComp._graph = comp.getGraph();

            expect(comp.getCellsGraph().length).toEqual(nbElements);

            actionsToolbarComp.removeEvidence();

            actionsToolbarFixture.detectChanges();
            fixture.detectChanges();

            // - 2 correspond to element + link
            expect(comp.getCellsGraph().length).toEqual(nbElements - 2);
            expect(comp.businessSteps.length).toEqual(2);

            expect(comp.businessSteps[1].items.length).toEqual(itemsLengthAddEvidence - 1);

        });

    });

});