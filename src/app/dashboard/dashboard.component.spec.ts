import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';

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
        MatGridListModule,
        MenuModule,
        CardModule
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
