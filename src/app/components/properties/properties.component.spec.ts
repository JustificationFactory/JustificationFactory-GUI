import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DiagramComponent} from '../diagram/diagram.component';
import {PropertiesComponent} from './properties.component';
import {PaletteComponent} from '../palette/palette.component';
import {DebugElement, SimpleChange} from '@angular/core';
import {By} from '@angular/platform-browser';
import {Actor, Conclusion, DiagramElement, Evidence, Rationale, Step, Strategy} from '../../business/diagram/diagram';

describe('properties.component.', () => {

    let comp:    PropertiesComponent;
    let fixture: ComponentFixture<PropertiesComponent>;
    let elements: Array<DiagramElement>;
    let businessSteps: Array<Step>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DiagramComponent, PropertiesComponent, PaletteComponent ], // declare the test component
        });

        // Overrides here, if you need them
        TestBed.overrideComponent(DiagramComponent, {
            set: {
                templateUrl: '../diagram/diagram.component.html',
                providers: [
                    PropertiesComponent
                ]
            }
        });
        TestBed.overrideComponent(PropertiesComponent, {
            set: {
                templateUrl: './properties.component.html'
            }
        });
        TestBed.overrideComponent(PaletteComponent, {
            set: {
                templateUrl: '../palette/palette.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            // compilation succeed (async needed)
        }).catch(function(e) {
            console.log(e); // "zut !"
        });

        elements = new Array<DiagramElement>();
        businessSteps = new Array<Step>();
        let step;
        let conclusion, strategy, evidence, rationale, actor;

        // TODO: Links & Supports are not created currently


        step = new Step(undefined);

        conclusion = new Conclusion({name: 'Experimentation', type: 'experimentation'});
        elements.push(conclusion);
        step.items.push(conclusion);

        strategy = new Strategy({name: 'Treat', type: 'humanStrategy'});
        elements.push(strategy);
        step.items.push(strategy);

        rationale = new Rationale('', {
            'axonicProject': {
                'pathology': 'OBESITY',
                'stimulator': 'AXIS'
            }
        }, '');
        strategy.artifacts.push(rationale);
        elements.push(rationale);

        evidence = new Evidence('Stimulation 0', {}, 'stimulation');
        elements.push(evidence);
        step.items.push(evidence);
        evidence = new Evidence('Subject 0', {}, 'subject');
        elements.push(evidence);
        step.items.push(evidence);

        actor = new Actor('Chloé', {}, 'INTERMEDIATE_EXPERT');
        strategy.artifacts.push(actor);
        elements.push(actor);

        businessSteps.push(step);

        step = new Step(undefined);

        conclusion = new Conclusion({name: 'Establish Effect', type: 'establishedEffect'});
        elements.push(conclusion);
        step.items.push(conclusion);

        strategy = new Strategy({name: 'Establish Effect', type: 'humanStrategy'});
        elements.push(strategy);
        step.items.push(strategy);

        rationale = new Rationale('', {
            'axonicProject': {
                'pathology': 'OBESITY',
                'stimulator': 'AXIS'
            }
        }, '');
        strategy.artifacts.push(rationale);
        elements.push(rationale);

        evidence = new Evidence('Experimentation', {}, 'experimentation');
        elements.push(evidence);
        step.items.push(evidence);

        actor = new Actor('Chloé', {}, 'INTERMEDIATE_EXPERT');
        strategy.artifacts.push(actor);
        elements.push(actor);
        businessSteps.push(step);

        /****************************ACTOR: Computer *************************/
        step = new Step(undefined);
        conclusion = new Conclusion({name: 'ExperimentationComputed', type: 'experimentationComputed'});
        elements.push(conclusion);
        step.items.push(conclusion);
        strategy = new Strategy({name: 'TreatComputed', type: 'computedStrategy'});
        elements.push(strategy);
        step.items.push(strategy);
        rationale = new Rationale('', {
            'axonicProject': {
                'pathology': 'OBESITY',
                'stimulator': 'AXIS'
            }
        }, '');

        strategy.artifacts.push(rationale);
        elements.push(rationale);
        evidence = new Evidence('StimulationComputed', {}, 'stimulationComputed');
        elements.push(evidence);
        step.items.push(evidence);
        evidence = new Evidence('SubjectComputed 0', {}, 'subjectComputed');
        elements.push(evidence);
        step.items.push(evidence);
        actor = new Actor('', {}, 'computedStrategy');
        strategy.artifacts.push(actor);
        elements.push(actor);
        businessSteps.push(step);

        /**************************************************/



    }));


    describe('Load an element.', () => {
        it('check name', () => {
            fixture = TestBed.createComponent(PropertiesComponent);
            comp = fixture.componentInstance; // PropertiesComponent test instance

            fixture.detectChanges();

            expect(comp.getElementName()).toEqual('');

            comp.selectedElement = businessSteps[0].items[2];

            const cs = new SimpleChange('', 'Stimulation 0', true);
            comp.ngOnChanges({ 'selectedElement': cs });

            expect(comp.getElementName()).toEqual('Stimulation 0');

            de = fixture.debugElement.query(By.css('.properties-header'));
            el = de.nativeElement;

            fixture.detectChanges();

            expect(el.innerHTML).toEqual('Stimulation 0');
        });

        it('check view values', () => {
            fixture = TestBed.createComponent(PropertiesComponent);
            comp = fixture.componentInstance; // PropertiesComponent test instance

            comp.selectedElement = businessSteps[0].items[2];

            const cs = new SimpleChange('', 'Stimulation 0', true);
            comp.ngOnChanges({ 'selectedElement': cs });

            fixture.detectChanges();

            de = fixture.debugElement.query(By.css('.testing-element-shape'));
            el = de.nativeElement;

            expect((el as any).value).toEqual('Rounded rectangle');

            de = fixture.debugElement.query(By.css('.testing-border-color'));
            el = de.nativeElement;

            expect((el as any).attributes['ng-reflect-selected-color-hex'].value).toEqual('#000000');
        });
    });

    describe('Properties manipulations.', () => {
        it('change name', () => {
            fixture = TestBed.createComponent(PropertiesComponent);
            comp = fixture.componentInstance; // PropertiesComponent test instance

            comp.selectedElement = businessSteps[0].items[2];

            const cs = new SimpleChange('', 'Stimulation 0', true);
            comp.ngOnChanges({ 'selectedElement': cs });

            fixture.detectChanges();

            de = fixture.debugElement.query(By.css('.testing-element-name'));
            (de.nativeElement as any).value = 'Test change name!';
            (de as any).triggerEventHandler('change', {'target': de.nativeElement});

            fixture.detectChanges();

            expect(comp.getElementName()).toEqual('Test change name!');
            expect(comp.selectedElement.name).toEqual('Test change name!');
        });

        it('change view values', () => {
            fixture = TestBed.createComponent(PropertiesComponent);
            comp = fixture.componentInstance; // PropertiesComponent test instance

            comp.selectedElement = businessSteps[0].items[2];

            const cs = new SimpleChange('', 'Stimulation 0', true);
            comp.ngOnChanges({ 'selectedElement': cs });

            fixture.detectChanges();

            de = fixture.debugElement.query(By.css('.testing-element-shape'));
            (de.nativeElement as any).value = comp.SHAPE_PARALLELOGRAM;
            (de as any).triggerEventHandler('change', {'target': de.nativeElement});

            de = fixture.debugElement.query(By.css('.testing-border-color'));
            (de.nativeElement as any).attributes['ng-reflect-selected-color-hex'].value = '#111111';
            (de as any).triggerEventHandler('selectedColorHexChange', '#111111');

            de = fixture.debugElement.query(By.css('.testing-element-borderType'));
            (de.nativeElement as any).value = comp.BORDER_DASH;
            (de as any).triggerEventHandler('change', {'target': de.nativeElement});

            fixture.detectChanges();

            expect(comp.selectedElement.visualShape.attributes.attrs.path.d).toEqual(DiagramElement.ParallelogramShape);
            expect(comp.BorderColorOfElement).toEqual('#111111');
            expect(comp.selectedElement.visualShape.attributes.attrs.path.stroke).toEqual('#111111');
            expect(comp.selectedElement.visualShape.attributes.attrs.path['stroke-dasharray'] ).toEqual(DiagramElement.DashBorder);

        });
    });

});
