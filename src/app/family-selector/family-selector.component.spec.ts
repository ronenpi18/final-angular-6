import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySelectorComponent } from './family-selector.component';

describe('FamilySelectorComponent', () => {
  let component: FamilySelectorComponent;
  let fixture: ComponentFixture<FamilySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
