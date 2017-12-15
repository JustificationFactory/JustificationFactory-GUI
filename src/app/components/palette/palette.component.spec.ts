import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {DiagramComponent} from '../diagram/diagram.component';
import {PropertiesComponent} from '../properties/properties.component';
import {PaletteComponent} from './palette.component';

describe('palette.component', () => {

    let comp:    PaletteComponent;
    let fixture: ComponentFixture<PaletteComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PaletteComponent, DiagramComponent, PropertiesComponent], // declare the test component
            providers: [
                DiagramComponent,
                PropertiesComponent
            ]
        });

        // Overrides here, if you need them
        TestBed.overrideComponent(PaletteComponent, {
            set: {
                templateUrl: './palette.component.html'
            }
        });
        TestBed.overrideComponent(DiagramComponent, {
            set: {
                templateUrl: '../diagram/diagram.component.html'
            }
        });
        TestBed.overrideComponent(PropertiesComponent, {
            set: {
                templateUrl: '../properties/properties.component.html'
            }
        });
        TestBed.compileComponents().then(() => {
            // compilation succeed (async needed)
        }).catch(function(e) {
            console.log(e); // "zut !"
        });

    }));


    describe('save color', () => {

        it('save clicked', () => {
            fixture = TestBed.createComponent(PaletteComponent);
            fixture.detectChanges();

            let compiled = fixture.debugElement.nativeElement;
            comp = fixture.componentInstance;
            comp.openDialogBox();
            fixture.detectChanges();
            comp.showDialog = true;
            fixture.detectChanges();
            comp.onClickedSave();
            fixture.detectChanges();
            expect(comp.showDialog).toEqual(false);
        });


    });

    describe('close palette', () => {

        it('close clicked', () => {
            fixture = TestBed.createComponent(PaletteComponent);
            fixture.detectChanges();

            let compiled = fixture.debugElement.nativeElement;
            comp = fixture.componentInstance;
            comp.openDialogBox();
            comp.showDialog = true;
            fixture.detectChanges();
            comp.onClickedExit();
            fixture.detectChanges();
            expect(comp.showDialog).toEqual(false);
        });


    });

});
