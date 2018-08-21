import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, timer } from 'rxjs';
import { flatMap, tap, timeout } from 'rxjs/operators';

import { RangeSelectorComponent, IRange } from './range-selector.component';
import { DebugElement } from '../../../../node_modules/@angular/core';
import { executeAndDetectChanges } from '../../utils/testing.util';

describe('RangeSelectorComponent', () => {
  let component: RangeSelectorComponent;
  let fixture: ComponentFixture<RangeSelectorComponent>;
  let element: DebugElement;
  let htmlChange: (fn: (...args) => any) => Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeSelectorComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
    htmlChange = cb => executeAndDetectChanges(fixture, cb);
  });

  it('should create new tab', () => {
    const oldTabsCount = getTabs().length;
    // create tabs
    createRanges(1).subscribe(() => {
      expect(getTabs().length).toBe(oldTabsCount + 1);
    });
  });

  it('should select tab', () => {
    // create tabs
    createRanges(3).pipe(
      // set selected tab
      flatMap(() => selectTab(2))
    ).subscribe(() => {
      // check that the selected tab is still the same
      const expectedActiveTabTitle = component.getRangeLabel(getRanges()[2]);
      const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
      expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
    });
  });

  // we have tabs [0,1,2,3], (2) is selected and we close (1). The indexes change and the selected should be still (2)
  it('should close unselected tab before selected tab', () => {
    let oldRanges;
    let oldTabs;
    // create tabs
    createRanges(3).pipe(
      // save state to compare at the end of the test
      tap(() => {
        oldRanges = getRanges();
        oldTabs = getTabs();
      }),
      // set selected tab
      flatMap(() => selectTab(2)),
      // delete target tab
      flatMap(() => closeTab(1)),
    ).subscribe(() => {
      // check that target tab has been deleted
      expect(countTabs()).toBe(oldTabs.length - 1);
      // check that the selected tab is still the same
      const expectedActiveTabTitle = component.getRangeLabel(oldRanges[2]);
      const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
      expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
    });
  });
  
  // we have tabs [0,1,2,3], (2) is selected and we close (3). The indexes don't change and the selected should be still (2)
  it('should close unselected tab after selected tab', () => {
    let oldRanges;
    let oldTabs;
    // create tabs
    createRanges(3).pipe(
      // save state to compare at the end of the test
      tap(() => {
        oldRanges = getRanges();
        oldTabs = getTabs();
      }),
      // set selected tab
      flatMap(() => selectTab(2)),
      // delete target tab
      flatMap(() => closeTab(3))
    ).subscribe(() => {
      // check that target tab has been deleted
      expect(countTabs()).toBe(oldTabs.length - 1);
      // check that the selected tab is still the same
      const expectedActiveTabTitle = component.getRangeLabel(oldRanges[2]);
      const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
      expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
    });
  });
  
  // we have tabs [0,1,2,3], (2) is selected and we close (2). The selected one should be (1) now
  it('should close selected tab', () => {
    let oldRanges;
    let oldTabs;
    // create tabs
    createRanges(3).pipe(
      // save state to compare at the end of the test
      tap(() => {
        oldRanges = getRanges();
        oldTabs = getTabs();
      }),
      // set selected tab
      flatMap(() => selectTab(2)),
      // delete target tab
      flatMap(() => closeTab(2)),
    ).subscribe(() => {
      // check that target tab has been deleted
      expect(countTabs()).toBe(oldTabs.length - 1);
      // check that the selected tab is still the same
      const expectedActiveTabTitle = component.getRangeLabel(oldRanges[1]);
      const activeTabEl = element.nativeElement.querySelector('ul.tabs > li.active');
      expect(activeTabEl.textContent).toBe(expectedActiveTabTitle);
    });
  });

  it('should not be close button on live tab', () => {
    const liveTabIndex = getRanges().findIndex(range => !range.to);
    const liveTabEl = getTabs()[liveTabIndex];
    const liveTabCloseBtnEl = liveTabEl.querySelector('.close-btn');
    expect(liveTabCloseBtnEl).toBeNull();
  });

  function getRanges(): IRange[] {
    return component.ranges;
  }

  function getTabs(): any[] {
    return element.nativeElement.querySelectorAll('ul.tabs > li:not(.add-btn)');
  }

  function countTabs(): number {
    return getTabs().length;
  }

  function closeTab(tabIndex: number): Observable<void> {
    return htmlChange(() => getTabs()[tabIndex].querySelector('.close-btn').click());
  }

  function selectTab(tabIndex: number): Observable<void> {
    return htmlChange(() => getTabs()[tabIndex].click());
  }

  function createRanges(amount: number): Observable<void> {
    return htmlChange(() => {
      const day = 1000 * 60 * 60 * 24;
      const startDate = new Date(2018, 7, 23, 7, 30, 12);
      const tabs: IRange[] = Array(amount).fill(null).map((take, index) => ({
        from: new Date(startDate.getTime() - (day * 2 - 1) * index),
        to: new Date(startDate.getTime() - day * 2 * index)
      }));

      component.ranges = component.ranges.concat(tabs);
    });
  }
});
