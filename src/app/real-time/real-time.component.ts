import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, timer, Subscription } from 'rxjs';

import * as fromRealTimeState from './state';
import * as fromRoot from '../state';
import * as fromFamiliesState from '../family-selector/state';
import { IProcessInstance } from '../family-selector/models/family.model';
import { IAlertInstance } from './models/alert.model';
import { switchMap, map } from '../../../node_modules/rxjs/operators';
import { GlobalsProvider } from '../core/providers/globals.provider';

type IRouterInfo = Observable<{ familyId: string; processId: string}>;

@Component({
  selector: 'app-real-time',
  templateUrl: './real-time.component.html',
  styleUrls: ['./real-time.component.scss']
})
export class RealTimeComponent implements OnInit, OnDestroy {

  process$: Observable<IProcessInstance>;
  alerts$: Observable<IAlertInstance[]>;

  alertsLoaderSubs: Subscription;

  constructor(
    private store: Store<fromFamiliesState.FamiliesState>,
    private globals: GlobalsProvider
  ) { }

  ngOnInit() {
    this.process$ = this.store.select(fromFamiliesState.getSelectedProcess);
    this.alerts$ = this.store.select(fromRealTimeState.getAllAlerts).pipe(
      // todo take out this slice
      map(alerts => alerts.slice(0, 3)) 
    );
    
    const router$ = this.getRouterInfo();
    this.alertsLoaderSubs = this.getAlertsLoader(router$);
  }

  ngOnDestroy() {
    this.alertsLoaderSubs.unsubscribe();
  }

  private getRouterInfo(): IRouterInfo {
    return this.store.select(fromRoot.getRouterState).pipe(
      map(router => ({
        familyId: router.state && router.state.params.familyId,
        processId: router.state && router.state.params.processId
      }))
    );
  }

  private getAlertsLoader(router$: IRouterInfo): Subscription {
    // load alerts every time there is a change in the route and update every n seconds
    return router$.pipe(
      switchMap(args => timer(0, this.globals.updateRealTimeAlertsInterval).pipe(
        map(() => args)
      ))
    ).subscribe(({ familyId, processId }) => {
      // dispatch load alerts method
      this.store.dispatch(new fromRealTimeState.LoadAlerts({
        familyId,
        processId,
        range: {
          from: new Date(Date.now() - this.globals.realTimeRange)
        }
      }));
    });
  }

}
