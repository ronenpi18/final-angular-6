import { Action } from '@ngrx/store';

import { IRangeInstance } from '../../../statistics/models/range.model';
import { IAlertInstance } from '../../models/alert.model';

// load alerts
export const LOAD_ALERTS = '[Alerts] Load Alerts';
export const LOAD_ALERTS_FAIL = '[Alerts] Load Alerts Fail';
export const LOAD_ALERTS_SUCCESS = '[Alerts] Load Alerts Success';

export class LoadAlerts implements Action {
    readonly type = LOAD_ALERTS;
    constructor(public payload: { familyId: string; processId: string; range: IRangeInstance }) {}
}

export class LoadAlertsFail implements Action {
    readonly type = LOAD_ALERTS_FAIL;
    constructor(public payload: any) {}
}

export class LoadAlertsSuccess implements Action {
    readonly type = LOAD_ALERTS_SUCCESS;
    constructor(public payload: IAlertInstance[]) {}
}

// action types
export type AlertsAction = LoadAlerts | LoadAlertsFail | LoadAlertsSuccess;