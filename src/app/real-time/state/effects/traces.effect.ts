import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as tracesActions from '../actions/traces.action';
import * as fromService from '../../real-time.service';

@Injectable()
export class TracesEffects {
    constructor(
        private actions$: Actions,
        private realTimeService: fromService.RealTimeService
    ) {}

    @Effect()
    loadTraces$ = this.actions$.ofType(tracesActions.LOAD_TRACES).pipe(
        map((action: tracesActions.LoadTraces) => action.payload),
        switchMap(({ familyId, processId, range }) => {
            return this.realTimeService.getTraces(familyId, processId, range).pipe(
                map(traces => new tracesActions.LoadTracesSuccess(traces)),
                catchError(error => of(new tracesActions.LoadTracesFail(error)))
            );
        })
    );
}