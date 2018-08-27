import { Action } from '@ngrx/store';

import { IRangeInstance } from '../../../statistics/models/range.model';
import { ITrace } from '../../models/trace.model';

// load traces
export const LOAD_TRACES = '[Traces] Load Traces';
export const LOAD_TRACES_FAIL = '[Traces] Load Traces Fail';
export const LOAD_TRACES_SUCCESS = '[Traces] Load Traces Success';

export class LoadTraces implements Action {
    readonly type = LOAD_TRACES;
    constructor(public payload: { familyId: string; processId: string; range: IRangeInstance }) {}
}

export class LoadTracesFail implements Action {
    readonly type = LOAD_TRACES_FAIL;
    constructor(public payload: any) {}
}

export class LoadTracesSuccess implements Action {
    readonly type = LOAD_TRACES_SUCCESS;
    constructor(public payload: ITrace[]) {}
}

// action types
export type TracesAction = LoadTraces | LoadTracesFail | LoadTracesSuccess;