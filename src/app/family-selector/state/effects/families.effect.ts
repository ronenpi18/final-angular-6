import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as familiesActions from '../actions/families.action';
import * as fromService from '../../family-selector.service';

@Injectable()
export class FamiliesEffects {
    constructor(
        private actions$: Actions,
        private familySelectorService: fromService.FamilySelectorService
    ) {}

    @Effect()
    loadFamilies$ = this.actions$.ofType(familiesActions.LOAD_FAMILIES).pipe(
        switchMap(() => {
            return this.familySelectorService.getFamilies().pipe(
                map(families => new familiesActions.LoadFamiliesSuccess(families)),
                catchError(error => of(new familiesActions.LoadFamiliesFail(error)))
            );
        })
    );
}