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
                templateUrl: 'base/app/components/diagram.component.html'
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
        let conclusion

        step = new Step();
        conclusion = new Conclusion("Establish Effect", {}, "experimentation");
        elements.push(conclusion);
        step.push(conclusion);

        businessSteps.push(step);

        //TODO: ...
    }));


    describe("Initial values.", () => {
        it('myholder tag empty', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            de = fixture.debugElement.query(By.css('#myholder'));
            el = de.nativeElement;

            fixture.detectChanges();

            expect(el.innerHTML).toEqual("");
        });

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

            expect(el.innerHTML).not.toEqual("");
        });

        it('Number of elements in the diagram', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            //TODO: ...
            expect(comp.getCellsGraph().length).toEqual(1);
        });

        it('Business list. Number of steps', () => {
            fixture = TestBed.createComponent(DiagramComponent);
            comp = fixture.componentInstance; // DiagramComponent test instance

            fixture.detectChanges();

            comp.showDiagram(elements, businessSteps);

            fixture.detectChanges();

            expect(comp.businessSteps.length).toEqual(1);
        });

    });

    describe("Diagram manipulations.", () => {

        it('We can select an element two times and have correct property label each time', () => {
            //TODO: ...
            expect(true).toEqual(true);
        });

        it('Zoom method change diagram scale', () => {
            //TODO: ...
            expect(true).toEqual(true);
        });

        it('The diagram move correctly when we mode the cursor with left click down', () => {
            //TODO: ...
            expect(true).toEqual(true);
        });

    });

});