import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineWorkspaceComponent } from './online-workspace.component';

describe('OnlineWorkspaceComponent', () => {
  let component: OnlineWorkspaceComponent;
  let fixture: ComponentFixture<OnlineWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
