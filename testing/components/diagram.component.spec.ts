import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { DiagramComponent } from '../../app/components/diagram.component';

describe("diagram.component", () => {

    describe("Initial values", () => {
        let comp:    DiagramComponent;
        let fixture: ComponentFixture<DiagramComponent>;

        beforeEach(() => {
            // TestBed.configureTestingModule({
            //     declarations: [ DiagramComponent ], // declare the test component
            // });

            //fixture = TestBed.createComponent(DiagramComponent);
            //
            // comp = fixture.componentInstance; // BannerComponent test instance
        });

        it('Graph Scale = 1', () => {
            // fixture.detectChanges();
            // expect(comp.getGraphScale()).toEqual(1);
        });
    });
});