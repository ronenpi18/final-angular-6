import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { StoreModule, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ButtonModule } from 'primeng/button';

import { StatisticsComponent } from './statistics.component';
import { StatisticContainerComponent } from './statistic-container/statistic-container.component';
import { DynamicComponentDirective } from './dynamic-component/dynamic-component.directive';
import { RangeSelectorComponent } from './range-selector/range-selector.component';
import { StateModule } from '../state/state.module';
import * as fromStore from './state';
import { IRangeInstance } from './models/range.model';
import { randomInt } from '../utils/math.util';

describe('StatisticsComponent', () => {

  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;
  let store: Store<fromStore.StatisticsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StatisticsComponent,
        StatisticContainerComponent,
        DynamicComponentDirective,
        RangeSelectorComponent
      ],
      imports: [
        MatGridListModule,
        MenuModule,
        CardModule,
        ButtonModule,
        StateModule,
        StoreModule.forFeature('statistics', fromStore.reducers),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    store = fixture.debugElement.injector.get(Store) as any;
    fixture.detectChanges();
  });

  it('should add ranges', () => {
    const mocks = addRanges(3);
    
    getRanges().subscribe(ranges => {
      expect(ranges.length).toBe(4);
      expect(ranges.slice(1).find(range => mocks.indexOf(range) === -1)).toBeUndefined();
    });
  });

  it('should remove ranges', () => {
    const mocks = addRanges(3);
    
    getRanges().subscribe(ranges => {
      expect(ranges.length).toBe(4);
    });
    
    component.onRangeRemove(mocks[1]);
    
    getRanges().subscribe(ranges => {
      expect(ranges.length).toBe(3);
      expect(ranges.find(range => range === mocks[1])).toBeUndefined();
    });
  });

  it('should change active range', () => {
    const mocks = addRanges(3);

    component.onRangeSelect(mocks[2]);

    getActiveRange().subscribe(activeRange => {
      expect(activeRange).toBe(mocks[2]);
    })
  });

  function getMockRange(): IRangeInstance {
    const from = new Date(randomInt(2000, 2018), randomInt(0, 11), randomInt(1, 26), 8, 30);
    return {
      from: from,
      to: new Date(from.getTime() - 1000 * 60 * 60 * 24)
    };
  }

  function getRanges(): Observable<IRangeInstance[]> {
    return store.select(fromStore.getRanges).pipe(
      take(1)
    );
  }

  function getActiveRange(): Observable<IRangeInstance> {
    return store.select(fromStore.getActiveRange).pipe(
      take(1)
    );
  }

  function addRanges(amount: number): IRangeInstance[] {
    const ranges = Array(amount).fill(null).map(getMockRange);
    ranges.forEach(range => component.onRangeAdd(range));
    return ranges;
  }
});
