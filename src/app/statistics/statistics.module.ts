import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { StatisticsComponent } from './statistics.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { DynamicComponentDirective } from './dynamic-component/dynamic-component.directive';
import { BaseComponentComponent } from './base-component/base-component.component';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    MatGridListModule,
    ButtonModule,
    MenuModule
  ],
  declarations: [
    StatisticsComponent,
    LatencyGraphComponent,
    EventsTableComponent,
    DynamicComponentDirective,
    BaseComponentComponent,
    MapComponent,
    StatusTimelineComponent
  ],
  entryComponents: [
    LatencyGraphComponent,
    EventsTableComponent,
    MapComponent,
    StatusTimelineComponent
  ],
  exports: [StatisticsComponent]
})
export class StatisticsModule { }
