import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, timer, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, take, flatMap, filter, switchMap } from 'rxjs/operators';

import * as fromStatsStore from './state';
import * as fromRoot from '../state';
import { IStatisticsInstance } from './models/data.model';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { LatencyGraphComponent } from './components/latency-graph/latency-graph.component';
import { GridStatistic } from './grid-statistic.model';
import { MapComponent } from './components/map/map.component';
import { StatusTimelineComponent } from './components/status-timeline/status-timeline.component';
import { StatusDivisionsComponent } from './components/status-divisions/status-divisions.component';
import { IRangeInstance } from './models/range.model';
import { GlobalsProvider } from '../core/providers/globals.provider';

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
export class StatisticsComponent implements OnInit, OnDestroy {

  data$: Observable<IStatisticsInstance[]>;
  ranges$: Observable<IRangeInstance[]>;
  activeRange$: Observable<IRangeInstance>;
  
  dataLoaderSubs: Subscription;
  updateLiveRangeSubs: Subscription;

  preset: GridStatistic[];
  gutterSize: number;

  constructor(
    private store: Store<fromStatsStore.StatisticsState>,
    private globals: GlobalsProvider
  ) {
    this.preset = mockPreset;
  }

  ngOnInit() {   
    this.data$ = this.store.select(fromStatsStore.getAllData);
    this.ranges$ = this.store.select(fromStatsStore.getRanges);
    this.activeRange$ = this.store.select(fromStatsStore.getActiveRange);
    
    this.updateLiveRangeSubs = this.getLiveRangeUpdater();
    this.dataLoaderSubs = this.getDataLoader();
  }

  ngOnDestroy() {
    this.dataLoaderSubs.unsubscribe();
    this.updateLiveRangeSubs.unsubscribe();
  }

  onRangeAdd(range: IRangeInstance) {
    this.store.dispatch(new fromStatsStore.RangeAdd(range));
  }

  onRangeRemove(range: IRangeInstance) {
    this.store.dispatch(new fromStatsStore.RangeRemove(range));
  }

  onRangeSelect(range: IRangeInstance) {
    this.store.dispatch(new fromStatsStore.ActiveRangeChange(range));
  }

  private getDataLoader(): Subscription {
    // load data every time there is a change in the active range and update if live
    return this.activeRange$.pipe(
      map(range => ({ range })),
      // get selected family and selected process by looking at the current url
      flatMap(args => {
        return this.store.select(fromRoot.getRouterState).pipe(
          take(1),
          map(router => ({
            ...args,
            familyId: router.state && router.state.params.familyId,
            processId: router.state && router.state.params.processId
          }))
        )
      }),
      filter(args => !!(args.familyId && args.processId && args.range))
    ).subscribe(args => {
      // dispatch load data method
      this.store.dispatch(new fromStatsStore.LoadData(args));
    });
  }

  private getLiveRangeUpdater(): Subscription {
    return this.activeRange$.pipe(
      filter(range => !range.to),
      switchMap(() => timer(this.globals.updateStatisticsInterval))
    ).subscribe(() => {
      this.store.dispatch(new fromStatsStore.UpdateLiveRange());
    });
  }

}
