import { Component } from '@angular/core';

import { EventsTableComponent } from './components/events-table/events-table.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import Statistic from './base-component/base-statistic.model';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from './components/status-divisions/status-divisions.component';

const mockPreset: Statistic[] = [
  new Statistic(StatusTimelineComponent, 1, 1),
  new Statistic(MapComponent, 1, 2),
  new Statistic(StatusDivisionsComponent, 1, 1),
  new Statistic(LatencyGraphComponent, 1, 1),
  new Statistic(EventsTableComponent, 1, 1)
];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  preset: Statistic[];

  constructor() {
    this.preset = mockPreset;
    this.preset[0].component$.subscribe(component => {
      console.log(component.title);
    });
  }

}
