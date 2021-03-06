import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { StatisticsComponent } from './statistics.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { DynamicComponentDirective } from './dynamic-component/dynamic-component.directive';
import { StatisticContainerComponent } from './statistic-container/statistic-container.component';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from './components/status-divisions/status-divisions.component';
import { RangeSelectorComponent } from './range-selector/range-selector.component';
import { reducers, effects } from './state';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    CardModule,
    ButtonModule,
    MenuModule,
    StoreModule.forFeature('statistics', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    StatisticsComponent,
    LatencyGraphComponent,
    EventsTableComponent,
    DynamicComponentDirective,
    StatisticContainerComponent,
    MapComponent,
    StatusTimelineComponent,
    StatusDivisionsComponent,
    RangeSelectorComponent
  ],
  entryComponents: [
    LatencyGraphComponent,
    EventsTableComponent,
    MapComponent,
    StatusTimelineComponent,
    StatusDivisionsComponent
  ],
  exports: [StatisticsComponent]
})
export class StatisticsModule { }
