import { Action } from '@ngrx/store';

import { IStatisticsInstance } from '../../models/data.model';
import { IRangeInstance } from '../../models/range.model';

// load data
export const LOAD_DATA = '[Data] Load Data';
export const LOAD_DATA_FAIL = '[Data] Load Data Fail';
export const LOAD_DATA_SUCCESS = '[Data] Load Data Success';

export class LoadData implements Action {
    readonly type = LOAD_DATA;
    constructor(public payload: { familyId: string; processId: string; range: IRangeInstance }) {}
}

export class LoadDataFail implements Action {
    readonly type = LOAD_DATA_FAIL;
    constructor(public payload: any) {}
}

export class LoadDataSuccess implements Action {
    readonly type = LOAD_DATA_SUCCESS;
    constructor(public payload: IStatisticsInstance[]) {}
}

// action types
export type DataAction = LoadData | LoadDataFail | LoadDataSuccess;