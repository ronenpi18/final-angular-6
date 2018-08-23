import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';
import { StoreModule, Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RangeSelectorComponent } from './range-selector.component';
import { IRangeInstance } from '../models/range.model';
import { executeAndDetectChanges } from '../../utils/testing.util';
import * as fromStore from '../state';
import { StateModule } from '../../state/state.module';


describe('RangeSelectorComponent', () => {
  let component: RangeSelectorComponent;
  let fixture: ComponentFixture<RangeSelectorComponent>;
  let element: DebugElement;
  let htmlChange: (fn: (...args) => any) => Observable<any>;
  let store: Store<fromStore.StatisticsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSelectorComponent ],
      imports: [
        HttpClientModule,
        StateModule,
        StoreModule.forFeature('statistics', fromStore.reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature(fromStore.effects),
        ButtonModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSelectorComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    htmlChange = cb => executeAndDetectChanges(fixture, cb);
  });

  beforeEach(() => {
    // get component store from injector
    store = fixture.debugElement.injector.get(Store) as any;
    // set component inputs and detect changes
    component.ranges$ = store.select(fromStore.getRanges);
    component.activeRange$ = store.select(fromStore.getActiveRange);
    // detect dom changes
    fixture.detectChanges();
  });

  it('should show input tabs', () => {
    const oldTabsCount = getTabs().length;
    createRanges(3).subscribe(() => {
      expect(getTabs().length).toBe(oldTabsCount + 3);
    });
  });

  it('should call delete tab output function', () => {
    spyOn(component.rangeRemove, 'emit');
    // create ranges
    createRanges(3).pipe(
      // get all ranges
      flatMap(getRanges)
    ).subscribe(ranges => {
      // emit delete click
      getTabs()[2].querySelector('.close-btn').click();
      // check that output has been called with deleted range
      expect(component.rangeRemove.emit).toHaveBeenCalled();
      expect(component.rangeRemove.emit).toHaveBeenCalledWith(ranges[2]);
    });
  })

  it('should call select tab output function', () => {
    spyOn(component.rangeSelect, 'emit');
    // create tabs
    createRanges(3).pipe(
      // set selected tab
      flatMap(() => selectTab(2)),
      // get all ranges
      flatMap(getRanges)
    ).subscribe(ranges => {
      // check that output has been called with selected range
      expect(component.rangeSelect.emit).toHaveBeenCalled();
      expect(component.rangeSelect.emit).toHaveBeenCalledWith(ranges[2]);
    });
  });

  it('should not be close button on live tab', () => {
    getRanges().subscribe(ranges => {
      const liveTabIndex = ranges.findIndex(range => !range.to);
      const liveTabEl = getTabs()[liveTabIndex];
      const liveTabCloseBtnEl = liveTabEl.querySelector('.close-btn');
      expect(liveTabCloseBtnEl).toBeNull();
    });
  });

  // // we have tabs [0,1,2,3], (2) is selected and we close (1). The indexes change and the selected should be still (2)
  // it('should close unselected tab before selected tab', () => {
  //   let oldRanges;
  //   let oldTabs;
  //   // create tabs
  //   createRanges(3).pipe(
  //     // save state to compare at the end of the test
  //     flatMap(() => {
  //       oldTabs = getTabs();
  //       return getRanges().pipe(tap(ranges => oldRanges = ranges));
  //     }),
  //     // set selected tab
  //     flatMap(() => selectTab(2)),
  //     // delete target tab
  //     flatMap(() => closeTab(1)),
  //   ).subscribe(() => {
  //     // check that target tab has been deleted
  //     expect(countTabs()).toBe(oldTabs.length - 1);
  //     // check that the selected tab is still the same
  //     const expectedActiveTabTitle = component.getRangeLabel(oldRanges[2]);
  //     const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
  //     expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
  //   });
  // });
  
  // // we have tabs [0,1,2,3], (2) is selected and we close (3). The indexes don't change and the selected should be still (2)
  // it('should close unselected tab after selected tab', () => {
  //   let oldRanges;
  //   let oldTabs;
  //   // create tabs
  //   createRanges(3).pipe(
  //     // save state to compare at the end of the test
  //     flatMap(() => {
  //       oldTabs = getTabs();
  //       return getRanges().pipe(tap(ranges => oldRanges = ranges));
  //     }),
  //     // set selected tab
  //     flatMap(() => selectTab(2)),
  //     // delete target tab
  //     flatMap(() => closeTab(3))
  //   ).subscribe(() => {
  //     // check that target tab has been deleted
  //     expect(countTabs()).toBe(oldTabs.length - 1);
  //     // check that the selected tab is still the same
  //     const expectedActiveTabTitle = component.getRangeLabel(oldRanges[2]);
  //     const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
  //     expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
  //   });
  // });
  
  // // we have tabs [0,1,2,3], (2) is selected and we close (2). The selected one should be (1) now
  // it('should close selected tab', () => {
  //   let oldRanges;
  //   let oldTabs;
  //   // create tabs
  //   createRanges(3).pipe(
  //     // save state to compare at the end of the test
  //     flatMap(() => {
  //       oldTabs = getTabs();
  //       return getRanges().pipe(tap(ranges => oldRanges = ranges));
  //     }),
  //     // set selected tab
  //     flatMap(() => selectTab(2)),
  //     // delete target tab
  //     flatMap(() => closeTab(2)),
  //   ).subscribe(() => {
  //     // check that target tab has been deleted
  //     expect(countTabs()).toBe(oldTabs.length - 1);
  //     // check that the selected tab is still the same
  //     const expectedActiveTabTitle = component.getRangeLabel(oldRanges[1]);
  //     const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
  //     expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
  //   });
  // });

  // function closeTab(tabIndex: number): Observable<void> {
  //   return htmlChange(() => getTabs()[tabIndex].querySelector('.close-btn').click());
  // }

  function getRanges(): Observable<IRangeInstance[]> {
    return component.ranges$;
  }

  function getTabs(): any[] {
    return element.nativeElement.querySelectorAll('ul.tabs > li:not(.add-btn)');
  }

  function selectTab(tabIndex: number): Observable<void> {
    return htmlChange(() => getTabs()[tabIndex].click());
  }

  function createRanges(amount: number): Observable<void> {
    return htmlChange(() => {
      const day = 1000 * 60 * 60 * 24;
      const startDate = new Date(2018, 7, 23, 7, 30, 12);
      const ranges: IRangeInstance[] = Array(amount).fill(null).map((take, index) => ({
        from: new Date(startDate.getTime() - (day * 2 - 1) * index),
        to: new Date(startDate.getTime() - day * 2 * index)
      }));

      ranges.forEach(range => {
        store.dispatch(new fromStore.RangeAdd(range));
      });
    });
  }
});
