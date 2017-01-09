import {ComponentFixture, TestBed, async} from '@angular/core/testing';
import {DiagramComponent} from "../../app/components/diagram.component";
import {PropertiesComponent} from "../../app/components/properties.component";
import {ActionsToolbarComponent} from "../../app/components/actions.toolbar.component";
import {EditToolbarComponent} from "../../app/components/edit.toolbar.component";
import {PaletteComponent} from "../../app/components/palette.component";

describe("diagram.component", () => {

    describe("Initial values", () => {
        let comp:    DiagramComponent;
        let fixture: ComponentFixture<DiagramComponent>;

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

        }));

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

    //Le chargement d'un diagramme fonctionne (myholder + nombre d'éléments)

    //Charque élément à un parent de type Cell

    //La sélection d'un élément fonctionne (deux sélections à la suite)

    //Le zoom fonctionne correctement

    //Le déplacement du diagramme fonctionne correctement (sur clique gauche de la souris)
});