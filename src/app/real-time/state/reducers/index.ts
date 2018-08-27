import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

import * as fromAlerts from  "./alerts.reducer";

export interface RealTimeState {
    alerts: fromAlerts.AlertsState
}

export const reducers: ActionReducerMap<RealTimeState> = {
    alerts: fromAlerts.reducer
};

export const getRealTimeState = createFeatureSelector<RealTimeState>(
    'realTime'
);
