import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDivisionsComponent } from './status-divisions.component';

describe('StatusDivisionsComponent', () => {
  let component: StatusDivisionsComponent;
  let fixture: ComponentFixture<StatusDivisionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusDivisionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
