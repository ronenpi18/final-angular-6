import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, startWith, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromStore from './state';
import { IStatisticsInstance } from './models/data.model';

import { EventsTableComponent } from './components/events-table/events-table.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import { GridStatistic } from './grid-statistic.model';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from './components/status-divisions/status-divisions.component';
import { IRangeInstance } from './models/range.model';

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
export class StatisticsComponent implements OnInit {

  data$: Observable<IStatisticsInstance[]>;
  ranges$: Observable<IRangeInstance[]>;
  activeRange$: Observable<IRangeInstance>;

  preset: GridStatistic[];
  gutterSize: number;

  constructor(private store: Store<fromStore.StatisticsState>) {
    this.preset = mockPreset;
    this.updateGutterSizeOnResize();
  }

  ngOnInit() {    
    this.data$ = this.store.select(fromStore.getAllData);
    this.ranges$ = this.store.select(fromStore.getRanges);
    this.activeRange$ = this.store.select(fromStore.getActiveRange);

    this.store.dispatch(new fromStore.LoadData());
  }

  onRangeAdd(range: IRangeInstance) {
    this.store.dispatch(new fromStore.RangeAdd(range));
  }

  onRangeRemove(range: IRangeInstance) {
    this.store.dispatch(new fromStore.RangeRemove(range));
  }

  onRangeSelect(range: IRangeInstance) {
    this.store.dispatch(new fromStore.ActiveRangeChange(range));
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
