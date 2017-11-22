import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {MainComponent} from "../../app/components/main.component";
import {DiagramComponent} from "../../app/components/diagram.component";
import {PropertiesComponent} from "../../app/components/properties.component";
import {ActionsToolbarComponent} from "../../app/components/actions.toolbar.component";
import {EditToolbarComponent} from "../../app/components/edit.toolbar.component";
import {PaletteComponent} from "../../app/components/palette.component";
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http} from "@angular/http";

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
                templateUrl: 'diagram.component.html'
            }
        });
        TestBed.overrideComponent(PropertiesComponent, {
            set: {
                templateUrl: 'properties.component.html'
            }
        });
        TestBed.overrideComponent(ActionsToolbarComponent, {
            set: {
                templateUrl: 'actions.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(EditToolbarComponent, {
            set: {
                templateUrl: 'edit.toolbar.component.html'
            }
        });
        TestBed.overrideComponent(PaletteComponent, {
            set: {
                templateUrl: 'palette.component.html'
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
