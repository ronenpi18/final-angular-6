import { Action } from '@ngrx/store';

import { IRangeInstance } from '../../models/range.model';

// load range
export const ACTIVE_RANGE_CHANGE = '[Ranges] Active Range Change';
export const RANGE_ADD = '[Ranges] Range add';
export const RANGE_REMOVE = '[Ranges] Range remove';
export const UPDATE_LIVE_RANGE = '[Ranges] Update Live Range';

export class ActiveRangeChange implements Action {
    readonly type = ACTIVE_RANGE_CHANGE;
    constructor(public payload: IRangeInstance) {}
}

export class RangeAdd implements Action {
    readonly type = RANGE_ADD;
    constructor(public payload: IRangeInstance) {}
}

export class RangeRemove implements Action {
    readonly type = RANGE_REMOVE;
    constructor(public payload: IRangeInstance) {}
}

export class UpdateLiveRange implements Action {
    readonly type = UPDATE_LIVE_RANGE;
}

// action types
export type RangesAction = ActiveRangeChange | RangeAdd | RangeRemove | UpdateLiveRange;