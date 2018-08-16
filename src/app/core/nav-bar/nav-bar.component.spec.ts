import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';

import { NavBarComponent } from './nav-bar.component';
import { GlobalsProvider } from '../providers/globals.provider';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [ButtonModule],
      providers: [GlobalsProvider]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
