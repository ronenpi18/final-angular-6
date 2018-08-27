import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as dataActions from '../actions/data.action';
import * as fromService from '../../statistics.service';

@Injectable()
export class DataEffects {
    constructor(
        private actions$: Actions,
        private statisticsService: fromService.StatisticsService
    ) {}

    @Effect()
    loadData$ = this.actions$.ofType(dataActions.LOAD_DATA).pipe(
        map((action: dataActions.LoadData) => action.payload),
        switchMap(({ familyId, processId, range }) => {
            return this.statisticsService.getData(familyId, processId, range).pipe(
                map(data => new dataActions.LoadDataSuccess(data)),
                catchError(error => of(new dataActions.LoadDataFail(error)))
            );
        })
    );
}