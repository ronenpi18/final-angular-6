import { Component } from '@angular/core';

import { EventsTableComponent } from './components/events-table/events-table.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import { GridStatistic } from './grid-statistic.model';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from './components/status-divisions/status-divisions.component';
import { fromEvent } from 'rxjs';
import { debounceTime, startWith, map } from '../../../node_modules/rxjs/operators';

const mockPreset: GridStatistic[] = [
  new GridStatistic(StatusTimelineComponent, 1, 1),
  new GridStatistic(MapComponent, 1, 2),
  new GridStatistic(StatusDivisionsComponent, 1, 1),
  new GridStatistic(LatencyGraphComponent, 1, 1),
  new GridStatistic(EventsTableComponent, 1, 1)
];

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent {

  preset: GridStatistic[];
  gutterSize: number;

  constructor() {
    this.preset = mockPreset;
    this.updateGutterSizeOnResize();
  }
  
  // set gutter size based on viewport width and update on resize
  private updateGutterSizeOnResize() {
    fromEvent(window, 'resize').pipe(
      debounceTime(100),
      map((event: any) => event.target.innerWidth),
      startWith(window.innerWidth)
    ).subscribe((vw: number) => {
      this.gutterSize = 1.04 / 100 * vw;
    });
  }

}
