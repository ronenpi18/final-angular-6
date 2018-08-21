import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';

import { StatisticsComponent } from './statistics.component';
import { StatisticContainerComponent } from './statistic-container/statistic-container.component';
import { DynamicComponentDirective } from './dynamic-component/dynamic-component.directive';
import { RangeSelectorComponent } from './range-selector/range-selector.component';

describe('StatisticsComponent', () => {
  let component: StatisticsComponent;
  let fixture: ComponentFixture<StatisticsComponent>;

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
        CardModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
