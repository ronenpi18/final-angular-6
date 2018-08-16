import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusTimelineComponent } from './status-timeline.component';

describe('StatusTimelineComponent', () => {
  let component: StatusTimelineComponent;
  let fixture: ComponentFixture<StatusTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});