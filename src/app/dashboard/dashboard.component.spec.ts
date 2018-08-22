import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { reducers, effects } from '../statistics/state';
import { DashboardComponent } from './dashboard.component';
import { FamilySelectorComponent } from '../family-selector/family-selector.component';
import { RealTimeComponent } from '../real-time/real-time.component';
import { StatisticsComponent } from '../statistics/statistics.component';
import { StatisticContainerComponent } from '../statistics/statistic-container/statistic-container.component';
import { DynamicComponentDirective } from '../statistics/dynamic-component/dynamic-component.directive';
import { RangeSelectorComponent } from '../statistics/range-selector/range-selector.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        FamilySelectorComponent,
        RealTimeComponent,
        StatisticsComponent,
        StatisticContainerComponent,
        DynamicComponentDirective,
        RangeSelectorComponent
      ],
      imports: [
        HttpClientModule,
        MatGridListModule,
        MenuModule,
        CardModule,
        StoreModule.forRoot({}, {}), // metaReducers
        StoreModule.forFeature('statistics', reducers),
        EffectsModule.forRoot([]),
        EffectsModule.forFeature(effects),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
