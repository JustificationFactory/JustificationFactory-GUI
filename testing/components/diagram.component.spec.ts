import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {DiagramComponent} from "../../app/components/diagram.component";
import {PropertiesComponent} from "../../app/components/properties.component";
import {ActionsToolbarComponent} from "../../app/components/actions.toolbar.component";
import {EditToolbarComponent} from "../../app/components/edit.toolbar.component";
import {PaletteComponent} from "../../app/components/palette.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

describe("diagram.component.", () => {

    let comp:    DiagramComponent;
    let fixture: ComponentFixture<DiagramComponent>;
    let elements: Array<DiagramElement>;
    let businessSteps: Array<Step>;
    let de: DebugElement;
    let el: HTMLElement;

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


        step = new Step(undefined);

        conclusion = new Conclusion("Experimentation", {}, "experimentation");
        elements.push(conclusion);
        step.items.push(conclusion);

        strategy = new Strategy("Treat", {}, "humanStrategy");
        elements.push(strategy);
        step.items.push(strategy);

        rationale = new Rationale("", {
            "axonicProject": {
                "pathology": "OBESITY",
                "stimulator": "AXIS"
            }
        }, "");
        strategy.artifacts.push(rationale);
        elements.push(rationale);

        evidence = new Evidence("Stimulation 0", {}, "stimulation");
        elements.push(evidence);
        step.items.push(evidence);
        evidence = new Evidence("Subject 0", {}, "subject");
        elements.push(evidence);
        step.items.push(evidence);

        actor = new Actor("Chloé", {}, "INTERMEDIATE_EXPERT");
        strategy.artifacts.push(actor);
        elements.push(actor);

        businessSteps.push(step);

        step = new Step(undefined);

        conclusion = new Conclusion("Establish Effect", {}, "establishedEffect");
        elements.push(conclusion);
        step.items.push(conclusion);

        strategy = new Strategy("Establish Effect", {}, "humanStrategy");
        elements.push(strategy);
        step.items.push(strategy);

        rationale = new Rationale("", {
            "axonicProject": {
                "pathology": "OBESITY",
                "stimulator": "AXIS"
            }
        }, "");
        strategy.artifacts.push(rationale);
        elements.push(rationale);

        evidence = new Evidence("Experimentation", {}, "experimentation");
        elements.push(evidence);
        step.items.push(evidence);

        actor = new Actor("Chloé", {}, "INTERMEDIATE_EXPERT");
        strategy.artifacts.push(actor);
        elements.push(actor);
        businessSteps.push(step);

        /****************************ACTOR: Computer *************************/
        step = new Step(undefined);
        conclusion = new Conclusion("ExperimentationComputed", {}, "experimentationComputed");
        elements.push(conclusion);
        step.items.push(conclusion);
        strategy= new Strategy("TreatComputed", {}, "computedStrategy");
        elements.push(strategy);
        step.items.push(strategy);
        rationale = new Rationale("", {
            "axonicProject": {
                "pathology": "OBESITY",
                "stimulator": "AXIS"
            }
        }, "");

        strategy.artifacts.push(rationale);
        elements.push(rationale);
        evidence = new Evidence("StimulationComputed", {}, "stimulationComputed");
        elements.push(evidence);
        step.items.push(evidence);
        evidence = new Evidence("SubjectComputed 0", {}, "subjectComputed");
        elements.push(evidence);
        step.items.push(evidence);
        actor = new Actor("", {}, "computedStrategy");
        strategy.artifacts.push(actor);
        elements.push(actor);
        businessSteps.push(step);

        /**************************************************/



    }));


    describe("Initial values.", () => {

        it('Graph Scale = 1', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();
            expect(comp.getGraphScale()).toEqual(1);
        });

        it('No element selected by default', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();
            expect(comp.selectedElement).toBeNull();
        });

    });

    describe("Loading diagram.", () => {

        it('myholder tag filled', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            de = fixture.debugElement.query(By.css('#myholder'));
            el = de.nativeElement;

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            expect(el.innerHTML.slice(0, 4)).toEqual("<svg");
        });

        it('Number of elements in the diagram', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            expect(comp.getCellsGraph().length).toEqual(17);
        });

        it('Business list. Number of steps', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            expect(comp.businessSteps.length).toEqual(3);
        });

    });

    describe("Diagram manipulations.", () => {

        it('Select a visual element to change business selected element', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            let cell0 = comp.getCellsGraph()[0];
            let name0 = ((cell0 as any).parent as DiagramElement).name;
            let cellView0 = comp.getCellViewFromCell(cell0);

            var e = new jQuery.Event("click"); // clientX & clientY needed for Firefox browser
            e.clientX = 10;
            e.clientY = 10;
            cellView0.$el.trigger(e);

            fixture.detectChanges();

            expect(comp.selectedElement.name).not.toEqual("");

            expect(comp.selectedElement.name).toEqual(name0);
        });

        it('select and unselect elements => Show and Hide properties components', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('properties-view') === null).toBe(true);

            let cell0 = comp.getCellsGraph()[0];
            let name0 = ((cell0 as any).parent as DiagramElement).name;
            let cellView0 = comp.getCellViewFromCell(cell0);

            var e = new jQuery.Event("click"); // clientX & clientY needed for Firefox browser
            e.clientX = 10;
            e.clientY = 10;
            cellView0.$el.trigger(e);

            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('properties-view') === null).toBe(false);

            var e = new jQuery.Event("click"); // clientX & clientY needed for Firefox browser
            e.clientX = 10;
            e.clientY = 10;
            comp.getPaper().$el.trigger(e);

            fixture.detectChanges();
            expect(fixture.nativeElement.querySelector('properties-view') === null).toBe(true);
        });

        it('Zoom methods change diagram scale', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            de = fixture.debugElement.query(By.css('#myholder'));
            el = de.nativeElement;

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            comp.zoomIn();
            fixture.detectChanges();
            comp.zoomIn();
            fixture.detectChanges();

            expect(comp.getGraphScale().toString().slice(0, 3)).toEqual("1.2");

            expect(el.innerHTML.indexOf('class="joint-viewport" transform="scale(1.2')).not.toEqual(-1);

            comp.resetZoom();
            fixture.detectChanges();

            expect(comp.getGraphScale()).toEqual(1);

            expect(el.innerHTML.indexOf('class="joint-viewport" transform="scale(1,')).not.toEqual(-1);
        });

    });

    //TODO: For one day...! Currently we don't arrive to access sub components!
    // spyOn(comp.propertiesComponent, 'ngOnChanges').and.callThrough();
    // fixture.detectChanges();
    // expect(comp.propertiesComponent.ngOnChanges).toHaveBeenCalled();

});