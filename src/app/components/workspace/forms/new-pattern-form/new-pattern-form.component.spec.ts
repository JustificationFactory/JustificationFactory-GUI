import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPatternFormComponent } from './new-pattern-form.component';

describe('NewPatternFormComponent', () => {
  let component: NewPatternFormComponent;
  let fixture: ComponentFixture<NewPatternFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewPatternFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPatternFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
