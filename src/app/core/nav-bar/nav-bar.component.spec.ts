import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ButtonModule } from 'primeng/button';
import { timer } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { NavBarComponent } from './nav-bar.component';
import { GlobalsProvider } from '../providers/globals.provider';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let UnmockedDate;

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

    UnmockedDate = Date;
    spyOn(<any>window, 'Date').and.returnValue(
      new UnmockedDate(2018, 7, 15, 8, 35, 15)
    );
  });

  // should show current time in expected format
  it('should show the current time', () => {
    component.timeClock$.pipe(take(1)).subscribe(time => {
      expect(time).toBe('08:35');
    });
  });

  // should show current date in expected format
  it('should show the current date', () => {
    component.dateClock$.pipe(take(1)).subscribe(date => {
      expect(date).toBe('יום רביעי, 15.08.18');
    });
  });

  // if should not call the update function more than twice in 20 seconds
  it('should not update more than twice in 20 seconds', done => {
    let calledTimes = 0;
    component.minute$.pipe(
      takeUntil(timer(3000))
    ).subscribe(
      () => calledTimes++,
      () => null,
      () => {
        expect(calledTimes).toBeLessThanOrEqual(2);
        done();
      }
    );
  });
});
