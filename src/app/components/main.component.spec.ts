import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MainComponent} from "../../app/components/main.component";
import {DiagramComponent} from "./diagram/diagram.component";
import {PropertiesComponent} from "./properties/properties.component";
import {ActionsToolbarComponent} from "./toolbars/actions/actions.toolbar.component";
import {EditToolbarComponent} from "./toolbars/edit/edit.toolbar.component";
import {PaletteComponent} from "./palette/palette.component";

describe("main.component", () => {

    let comp:    MainComponent;
    let fixture: ComponentFixture<MainComponent>;
    let DigaramComp : DiagramComponent ;
    let DiagramFixture : ComponentFixture<DiagramComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MainComponent, DiagramComponent, PropertiesComponent, ActionsToolbarComponent, EditToolbarComponent, PaletteComponent ], // declare the test component
            providers: [
                DiagramComponent,
                ActionsToolbarComponent,
                PropertiesComponent
            ]
        });

        // Overrides here, if you need them
        TestBed.overrideComponent(MainComponent, {
            set: {
                templateUrl: 'main.component.html'
            }
        });
        TestBed.overrideComponent(DiagramComponent, {
            set: {
                templateUrl: 'diagram/diagram.component.html'
            }
        });
        TestBed.overrideComponent(PropertiesComponent, {
            set: {
                templateUrl: 'properties/properties.component.html'
            }
        });
        TestBed.overrideComponent(ActionsToolbarComponent, {
            set: {
                templateUrl: 'toolbars/actions/actions.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(EditToolbarComponent, {
            set: {
                templateUrl: 'toolbars/edit/edit.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(PaletteComponent, {
            set: {
                templateUrl: 'palette/palette.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            //compilation succeed (async needed)
        }).catch(function(e) {
            console.log(e); // "zut !"
        });

    }));



    describe("close diagram", () => {

        it('close clicked', () => {
            fixture = TestBed.createComponent(MainComponent);
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;
            comp = fixture.componentInstance;
            comp.diagramLoaded = true;
            fixture.detectChanges();
            compiled.querySelector('#btnCloseLink').click();

            fixture.detectChanges();
            expect(comp.diagramLoaded).toEqual(false);
        });

    });
    describe("add step entiere", () => {

        it('new diagram click', () => {
            fixture = TestBed.createComponent(MainComponent);
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;
            comp = fixture.componentInstance;
            comp.diagramLoaded = false;
            fixture.detectChanges();
            compiled.querySelector('#newDiagramLink').click();
            fixture.detectChanges();
            expect(comp.diagramLoaded).toEqual(true);

        });


    });
});
