import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as alertsActions from '../actions/alerts.action';
import * as fromService from '../../real-time.service';

@Injectable()
export class AlertsEffects {
    constructor(
        private actions$: Actions,
        private realTimeService: fromService.RealTimeService
    ) {}

    @Effect()
    loadAlerts$ = this.actions$.ofType(alertsActions.LOAD_ALERTS).pipe(
        map((action: alertsActions.LoadAlerts) => action.payload),
        switchMap(({ familyId, processId, range }) => {
            return this.realTimeService.getAlerts(familyId, processId, range).pipe(
                map(report => {
                    // todo check how this is gonna be with interface real design
                    const alerts = report.currentAlert.concat(report.earlierAlert);
                    return new alertsActions.LoadAlertsSuccess(alerts);
                }),
                catchError(error => of(new alertsActions.LoadAlertsFail(error)))
            );
        })
    );
}